/*import React, {useState, useEffect} from "react";
import axios from "axios";

function Exported(){
  const [stock_name, setStock_name] = useState('');
  const [sale_date, setSale_date] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [Exported, setExported] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() =>{
    loadExported();
  }, []);

  const loadExported = async () =>{
   const res = await axios.get('http://localhost:3000/sold')
   setExported(res.data);
  };

  const loggedInUser = {
        id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username')
    };

  const save = async (e) =>{
    e.preventDefault();
    if(!stock_name || !sale_date || !quantity || !amount){
      alert('fill all fields');
      return;
    }

    if(!loggedInUser.id || loggedInUser.id === "undefined"){
            alert("User not logged in properly");
            return;
    }

    if(editId === null){
      await axios.post('http://localhost:3000/api/sold', {
        user_id: loggedInUser.id,
        stock_name:stock_name,
        sale_date:sale_date,
        quantity:quantity,
        amount:amount
      });
      alert('product exported');
    }
    else{
      await axios.put('http://localhost:3000/solds/'+editId, {
        stock_name:stock_name,
        sale_date:sale_date,
        quantity:quantity,
        amount:amount
      });
      alert('product updated');
      setEditId(null);
    };
    setStock_name("");
    setSale_date("");
    setQuantity("");
    setAmount("");
    loadExported();
  };

  const deleteExported = async (s_id) =>{
    await axios.delete('http://localhost:3000/api/sold/'+s_id)
    loadExported();
  };

  const editExported = (item) =>{
    setStock_name(item.stock_name);
    setSale_date(item.sale_date.split("T")[0]);
    setQuantity(item.quantity);
    setAmount(item.amount);
    setEditId(item.s_id);
  };

  return (
    <div>
      <h2>Add or Update Student</h2>
      <form>
        <label htmlFor="stock_name">stock_name</label>
        <input 
        type="text"
        name="stock_name"
        value={stock_name}
        onChange={(e) =>setStock_name(e.target.value)}
        />

        <label htmlFor="sale_date">sale_date</label>
        <input 
        type="date"
        name="sale_date"
        value={sale_date}
        onChange={(e) =>setSale_date(e.target.value)}
        />

        <label htmlFor="quantity">quantity:</label>
        <input 
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) =>setQuantity(e.target.value)}
        />

        <label htmlFor="amount">Amount:</label>
        <input 
        type="number"
        name="amount"
        value={amount}
        onChange={(e) =>setAmount(e.target.value)}
        />

        <button onClick={save}>
          {editId === null ? "save" : "update"}
        </button>
      </form>
      <h2>Product Exported List</h2>
      <table>
        <thead>
            <tr>
                <th>Product_Id</th>
                <th>User_id</th>
                <th>Username</th>
                <th>Stock_Name</th>
                <th>sale_date</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {Exported.map((item) => (
            <tr key={item.s_id}>
              <td>{item.s_id}</td>
              <td>{item.user_id}</td>
              <td>{item.username}</td>
              <td>{item.stock_name}</td>
              <td>{item.sale_date}</td>
              <td>{item.quantity}</td>
              <td>{item.amount}</td>
              <td>
                <button onClick={() =>editExported(item)}>Edit</button>
                <button onClick={() =>deleteExported(item.s_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Exported;  */



import React, {useState, useEffect} from "react";
import axios from "axios";

function Exported(){
  const [stock_name, setStock_name] = useState('');
  const [sale_date, setSale_date] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [imports, setImports] = useState([]);
  const [Exported, setExported] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() =>{
    loadExported();
    loadImports();
  }, []);

  const loadExported = async () =>{
   const res = await axios.get('http://localhost:3000/sold')
   setExported(res.data);
  };

  /*const loadImports = async () =>{
    const res = await axios.get('http://localhost:3000');
    setImports(res.data);
  }; */

  const loadImports = async () =>{
  const res = await axios.get(
    'http://localhost:3000/api/available-products'
  );

  setImports(res.data);
};

  const loggedInUser = {
        id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username')
    };

  const save = async (e) =>{
    e.preventDefault();
    if(!stock_name || !sale_date || !quantity || !amount){
      alert('fill all fields');
      return;
    }

    if(!loggedInUser.id || loggedInUser.id === "undefined"){
            alert("User not logged in properly");
            return;
    }

    if(editId === null){
      await axios.post('http://localhost:3000/api/sold', {
        user_id: loggedInUser.id,
        stock_name:stock_name,
        sale_date:sale_date,
        quantity:quantity,
        amount:amount
      });
      alert('product exported');
    }
    else{
      await axios.put('http://localhost:3000/solds/'+editId, {
        stock_name:stock_name,
        sale_date:sale_date,
        quantity:quantity,
        amount:amount
      });
      alert('product updated');
      setEditId(null);
    };
    setStock_name("");
    setSale_date("");
    setQuantity("");
    setAmount("");
    loadExported();
  };

  const deleteExported = async (s_id) =>{
    await axios.delete('http://localhost:3000/api/sold/'+s_id)
    loadExported();
  };

  const editExported = (item) =>{
    setStock_name(item.stock_name);
    setSale_date(item.sale_date.split("T")[0]);
    setQuantity(item.quantity);
    setAmount(item.amount);
    setEditId(item.s_id);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold text-left mb-6">Add or Update Student</h2>

        <form className="grid md:grid-cols-4 gap-4">
          <label htmlFor="stock_name">stock_name</label>
<select
className="border p-2 rounded focus:ring-black-400"
name="stock_name"
value={stock_name}
onChange={(e) =>setStock_name(e.target.value)}
>
  <option value="">Select Product</option>

  {imports.map((item) =>(
    <option key={item.p_id} value={item.stock_name}>
      {item.stock_name}
    </option>
  ))}
</select>

          <label htmlFor="sale_date">sale_date</label>
          <input 
          className="border p-2 rounded focus:ring-black-400"
          type="date"
          name="sale_date"
          value={sale_date}
          onChange={(e) =>setSale_date(e.target.value)}
          />

          <label htmlFor="quantity">quantity:</label>
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

          <button 
          onClick={save}
          className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
            {editId === null ? "save" : "update"}
          </button>
        </form>

        <h2 className="text-lg font-bold mb-4 mt-10">Product Exported List</h2>

        <table className="bg-white p-6 rounded-lg w-full border">
          <thead className="bg-gray-500 text-white">
              <tr>
                  <th className="p-2">Product_Id</th>
                  <th className="p-2">User_id</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Stock_Name</th>
                  <th className="p-2">sale_date</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Action</th>
              </tr>
          </thead>

          <tbody>
            {Exported.map((item) => (
              <tr key={item.s_id}>
                <td>{item.s_id}</td>
                <td>{item.user_id}</td>
                <td>{item.username}</td>
                <td>{item.stock_name}</td>
                <td>{item.sale_date}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td className="p-2 space-x-2">
                  <button 
                  onClick={() =>editExported(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>

                  <button 
                  onClick={() =>deleteExported(item.s_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exported;


