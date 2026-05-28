import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({onLoginSuccess}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const res = await axios.post('http://localhost:3000/api/login', {username, password})

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('user_id', res.data.user.id);

            if(onLoginSuccess){
                onLoginSuccess(res.data.token, res.data.user.username);
            }
            navigate('/home');
        } catch (err){
            const message = err.response?.data?.error || 'login error'
            setError(message);
            console.error(err);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="m-3 font-bold text-2xl text-center text-blue-700"><u>User Login Page</u></h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label htmlFor="username" className="block font-semibold">Username:</label> <br></br>
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
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                {loading ? "Loggingin...": "Submit"}
                            </button>
                        </form>
                        <p className="text-center mt-4">You do not have an acount?<Link to="/signup" className="text-blue-600 font-semibold hover:underline">Register</Link></p>
                    </div>
                </div>
    );
}
export default Login; 