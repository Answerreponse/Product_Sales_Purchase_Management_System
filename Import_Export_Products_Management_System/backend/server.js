const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'purchase_sales_ms'
});

db.connect((err) =>{
    if(err) {
        console.error('error connecting to the database', err);
        return;
    }
    console.log('database connected');
});

app.post('/api/signup', async (req, res) =>{
    try{
        const {username, password} = req.body;

        db.query('SELECT*FROM user WHERE username=?', [username], async(err, results) =>{
            if(err){
                console.error('database error', err);
                return res.status(500).json({error:'internal server error'});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO user (username, password) VALUES(?,?)';

            db.query(query, [username, hashedPassword], (err, results) =>{
                if(err){
                    console.error('database error', err);
                    return res.status(400).json({error:'registration failed'});
                }
                return res.status(201).json({message:'register success'});
            });
        });
    } catch(err){
        console.error('databse error', err);
        return res.status(400).json({error:'register failed'});
    }
});


app.post('/api/login', async (req, res) =>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({error:'fill both username and password'});
        }
        
        db.query('SELECT*FROM user WHERE username=?', [username], async (err, results) =>{
            if(err){
                console.error('database error', err);
                return res.status(500).json({error:'internal server error'});
            }

            if (results.length === 0)
                return res.status(400).json({ error: 'invalid login' });

            const user = results[0];
            const isPasswordValid  = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({error:'invalid inputs'});
            }

            const token = jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET || 'default_secret',
                {expiresIn: '1h'}
            )

            res.status(200).json({
                message:'login success',
                token,
                user : {
                    id: user.id,
                    username: user.username
                }
            });
        });
    } catch (err) {
        console.error('database error', err);
        return res.status(500).json({error:'internal server error'});
    }
}); 


app.get('/', (req, res)=>{
    db.query(` SELECT p.p_id, p.user_id, u.username, p.stock_name, p.purchase_date, p.quantity, p.amount
        FROM purchased_stock p LEFT JOIN user u ON p.user_id = u.id`, (err, results) => {
        if(err) return res.send(err);
        res.send(results);
    });
});

app.post('/api/insert', (req, res) =>{
    db.query(`INSERT INTO purchased_stock(user_id, stock_name, purchase_date, quantity, amount) VALUES(?,?,?,?,?)`,
        [req.body.user_id, req.body.stock_name, req.body.purchase_date, req.body.quantity, req.body.amount],
        (err, result)=>{
            if(err) return res.send(err);
            res.send(result);
        }
    );
});

app.put('/api/update/:p_id', (req, res) => {
    db.query(`UPDATE purchased_stock SET stock_name=?, purchase_date=?, quantity=?, amount=? WHERE p_id=?`,
        [req.body.stock_name, req.body.purchase_date, req.body.quantity, req.body.amount, req.params.p_id],
        (err, result)=>{
            if(err) return res.send(err);
            res.send(result);
        }
    );
});

app.delete('/api/delete/:p_id', (req, res) => {
    db.query(`DELETE FROM purchased_stock WHERE p_id=?`, [req.params.p_id], (err, result) => {
            if(err) return res.send(err);
            res.send(result);
        }
    );
});
//sold stock

app.get('/sold', (req, res) =>{
    db.query(`SELECT s.s_id, s.user_id, u.username, s.stock_name, s.sale_date, s.quantity, s.amount 
    FROM sold_stock s LEFT JOIN user u ON s.user_id = u.id`, (err, results) =>{
        if(err) return res.send(err);
        res.send(results);
    });
});

app.post('/api/sold', (req, res) =>{
    db.query(`INSERT INTO sold_stock(user_id, stock_name, sale_date, quantity, amount) VALUES(?,?,?,?,?)`,
    [req.body.user_id, req.body.stock_name, req.body.sale_date, req.body.quantity, req.body.amount], (err, results) =>{
        if(err) return res.send(err);
        res.send(results);
    });
});

app.put('/solds/:s_id', (req, res) =>{
    db.query(`UPDATE sold_stock SET stock_name=?, sale_date=?, quantity=?, amount=? WHERE s_id=?`,
    [req.body.stock_name, req.body.sale_date, req.body.quantity, req.body.amount, req.params.s_id], (err, results) =>{
        if(err) return res.send(err);
        res.send(results);
    });
});


app.delete('/api/sold/:s_id', (req, res) =>{
    db.query(`DELETE FROM sold_stock WHERE s_id = ?`,
    [req.params.s_id], (err, results) =>{
        if(err) return res.send(err);
        res.send(results);
    });
});


app.get('/api/report', (req, res) =>{
    const query = `
        SELECT 
            i.stock_name,

            IFNULL(SUM(i.quantity), 0) AS imported_quantity,
            IFNULL(SUM(i.amount), 0) AS imported_amount,

            IFNULL((
                SELECT SUM(s.quantity)
                FROM sold_stock s
                WHERE s.stock_name = i.stock_name
            ), 0) AS exported_quantity,

            IFNULL((
                SELECT SUM(s.amount)
                FROM sold_stock s
                WHERE s.stock_name = i.stock_name
            ), 0) AS exported_amount

        FROM purchased_stock i
        GROUP BY i.stock_name
    `;

    db.query(query, (err, results) =>{
        if(err) return res.send(err);

        const report = results.map(item =>({
            ...item,
            remaining_stock:
                item.imported_quantity - item.exported_quantity,

            profit:
                item.exported_amount - item.imported_amount
        }));

        res.send(report);
    });
});


app.get('/api/available-products', (req, res) =>{

    const query = `
        SELECT 
            p.stock_name,

            SUM(p.quantity) -
            IFNULL((
                SELECT SUM(s.quantity)
                FROM sold_stock s
                WHERE s.stock_name = p.stock_name
            ), 0) AS remaining_quantity

        FROM purchased_stock p

        GROUP BY p.stock_name

        HAVING remaining_quantity > 0
    `;

    db.query(query, (err, results) =>{

        if(err) return res.send(err);

        res.send(results);

    });

});

app.listen(3000, () =>{
    console.log('server listening');
});