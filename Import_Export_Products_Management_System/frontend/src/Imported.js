import React, {useState, useEffect} from "react";
import axios from "axios";

function Imported (){
    const [stock_name, setStock_name] = useState('');
    const [purchase_date, setPurchase_date] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [Imports, setImports] = useState([]);
    const [editId, setEditId] = useState(null);


    useEffect(() =>{
        loadImport();
    }, []);

    const loadImport = async () =>{
        const res = await axios.get('http://localhost:3000')
        setImports(res.data);
    };

    const loggedInUser = {
        id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username')
    };

    const save = async (e) =>{
        e.preventDefault();
        if(!stock_name || !purchase_date || !quantity || !amount){
            alert('fill all fields');
            return;
        }

        if(!loggedInUser.id || loggedInUser.id === "undefined"){
            alert("User not logged in properly");
            return;
        }

        if(editId === null){
            await axios.post('http://localhost:3000/api/insert', {
                user_id: loggedInUser.id,
                stock_name:stock_name,
                purchase_date:purchase_date,
                quantity:quantity,
                amount:amount
            });
            alert('product purchase added');
        }
        else{
            await axios.put('http://localhost:3000/api/update/'+editId, {
                stock_name:stock_name,
                purchase_date:purchase_date,
                quantity:quantity,
                amount:amount
            });
            alert('product purchased updated');
            setEditId(null);
        };
        setStock_name('');
        setPurchase_date('');
        setQuantity('');
        setAmount('');
        loadImport();
    };

    const deleteImported = async (p_id) =>{
        await axios.delete('http://localhost:3000/api/delete/'+p_id)
        loadImport();
    };
    const editImported = (item) =>{
        setStock_name(item.stock_name);
        setPurchase_date(item.purchase_date.split("T")[0]);
        setQuantity(item.quantity);
        setAmount(item.amount);
        setEditId(item.p_id);
    }

    return (
        <div className="p-6 bg-gray-100">
            <div className=" mx-auto bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold font-bold text-left mb-6">Add or Update Purchase Stock</h2>
                <form className="grid md:grid-cols-4 gap-4">
                    <label htmlFor="stock_name">Stock_Name:</label>
                    <input 
                    className="border p-2 rounded focus:ring-black-400"
                    type="text"
                    name="stock_name"
                    value={stock_name}
                    onChange={(e) =>setStock_name(e.target.value)}
                    />

                    <label htmlFor="purchase_date">Purchase:</label>
                    <input
                    className="border p-2 rounded focus:ring-black-400"
                    type="date"
                    name="purchase_date"
                    value={purchase_date}
                    onChange={(e) =>setPurchase_date(e.target.value)}
                    />

                    <label htmlFor="quantity">Quantity:</label>
                    <input 
                    className="border p-2 rounded focus:ring-black-400"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) =>setQuantity(e.target.value)}
                    />

                    <label htmlFor="amount">Amount:</label>
                    <input 
                    className="border p-2 rounded focus:ring-black-400"
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) =>setAmount(e.target.value)}
                    />

                    <button onClick={save} className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700">Save</button>
                </form>

                <h2 className="text-lg font-bold mb-4">Product Purchased Lists</h2>
                <table className="mt-10 bg-white p-6 rounded-lg   w-full border">
                    <thead className="bg-gray-500 text-white">
                        <tr>
                            <th className="p-2">Product_id</th>
                            <th className="p-2">User_id</th>
                            <th className="p-2">User_name</th>
                            <th className="p-2">Stock_Name</th>
                            <th className="p-2">Purchase_date</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Imports.map((item) =>(
                            <tr key={item.p_id}>
                                <td>{item.p_id}</td>
                                <td>{item.user_id}</td>
                                <td>{item.username}</td>
                                <td>{item.stock_name}</td>
                                <td>{item.purchase_date}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() =>editImported(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                                    <button onClick={() =>deleteImported(item.p_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default Imported; 

