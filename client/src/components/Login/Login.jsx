import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import "./Login.css"
import "../Register/Register.css"

const Login = ({setRole,setUserId,setIsAuth}) => {
    const history=useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setError(true)
            setErrorMessage("All fields are required")
            setTimeout(() => {
                setError(false)
            }, 1500);
            return
        }
        const loginUser={email,password}
        axios.post("http://localhost:3004/user/login", loginUser)
            .then(res => {
                console.log(res)
                setRole(res.data.role)
                setUserId(res.data.userId)
                localStorage.setItem("token",res.data.token)
                setIsAuth(true)
                history.push("/")
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <div className="register-form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={ (e)=>setEmail(e.target.value)}/>
                </div>
                <div className="register-form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={ (e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                {error && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
            </form>
        </div>
    )
}

export default Login
