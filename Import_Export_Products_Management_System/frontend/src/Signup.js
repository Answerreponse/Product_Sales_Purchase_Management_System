import React, {useState, useEffect, use} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');

        if(!username || !password) {
            alert('fill all fileds');
            return;
        }

        setLoading(true);

        try{
            await axios.post('http://localhost:3000/api/signup', {username, password})
            alert('Register Success you can login now');
            navigate('/');
        } catch (err){
            const message = err.response?.data?.error || 'register error'
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="m-3 font-bold text-2xl text-center text-blue-700"><u>User Registration Page</u></h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="username" className="block mb-2 font-semibold">Username:</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) =>setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <label htmlFor="password" className="block mb-2 font-semibold">Password:</label>
                    <input 
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) =>setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {loading ? "Loggingin....":'Register'}
                    </button>
                </form>
                <p className="text-center mt-4">Already have an acount?<Link to="/" className="text-blue-600 font-semibold hover:underline">Login</Link></p>
            </div>
        </div>
    );
}
export default Signup;
