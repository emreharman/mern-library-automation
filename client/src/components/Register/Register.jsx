import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "../Login/Login.css";

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "" || name === "" || surname === "") {
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
            name,
            surname,
            email,
            password
        }
        
        const response = await axios.post("http://localhost:3004/user/register", user);
        if (response.status === 200) {
            history.push("/login");
        }
        
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                 <div className="form-element">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" 
                        value={surname}
                        onChange={(e)=>setSurname(e.target.value)}
                    />
                </div>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
