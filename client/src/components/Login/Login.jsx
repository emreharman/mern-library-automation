import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import "./Login.css";
const Login = ({setIsAuth,setRole}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError(true);
            setMessage("Please enter all the fields.");
            setTimeout(() => {
                setError(false);
            }, 1000);
            return;
        }
        if (password.length < 6) {
            setError(true);
            setMessage("Password must be at least 6 characters.");
            setTimeout(() => {
                setError(false);
            }, 1000);
            return;
        }
        const user = {
            email,
            password
        }
        const response = await axios.post("http://localhost:3004/user/login", user);
        if (response.status === 200) {
            setIsAuth(true);
            setRole(response.data.role);
            history.push("/");
        }
    }
    return (
        <div className="form-container">
            <form onSubmit={ handleSubmit}>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="example@example.com"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                {
                    error && (
                        <div className="error-line">
                            <small>{ message}</small>
                        </div>
                    )
                }
                
                <div className="form-button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
