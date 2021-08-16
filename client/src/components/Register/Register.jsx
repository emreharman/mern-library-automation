import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import "./Register.css"

const Register = () => {
    const history=useHistory()
    const [name, setName] = useState("")
    const [nameError,setNameError]=useState(false)
    const [surname, setSurname] = useState("")
    const [surnameError,setSurnameError]=useState(false)
    const [email, setEmail] = useState("")
    const [emailError,setEmailError]=useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name === "") {
            setNameError(true)
            setErrorMessage("Name field is required")
            setTimeout(() => {
                setNameError(false)
            }, 1500);
            return
        }
        if (surname === "") {
            setSurnameError(true)
            setErrorMessage("Surname field is required")
            setTimeout(() => {
                setSurnameError(false)
            }, 1500);
            return
        }
        if (email === "") {
            setEmailError(true)
            setErrorMessage("Email field is required")
            setTimeout(() => {
                setEmailError(false)
            }, 1500);
            return
        }
        if (password === "") {
            setPasswordError(true)
            setErrorMessage("Password can't be empty")
            setTimeout(() => {
                setPasswordError(false)
            }, 1500);
            return
        }
        if (password.length < 6) {
            setPasswordError(true)
            setErrorMessage("Password must be at least 6 characters")
            setTimeout(() => {
                setPasswordError(false)
            }, 1500);
            return
        }
        const newUser = {
            name,surname,email,password
        }
        axios.post(`http://localhost:3004/user/register`, newUser)
            .then(res => {
                //console.log(res)
                history.push("/login")
            })
            .catch(err => console.log(err.response))
    }
    return (
        <div className="register-container" onSubmit={handleSubmit}>
            <form>
                <div className="register-form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="James" value={name} onChange={ (e)=>setName(e.target.value)}/>
                </div>
                {nameError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div className="register-form-control">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" placeholder="Vardy" value={surname} onChange={ (e)=>setSurname(e.target.value)}/>
                </div>
                {surnameError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div className="register-form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="abc@abc.com" value={email} onChange={ (e)=>setEmail(e.target.value)}/>
                </div>
                {emailError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div className="register-form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="At least 6 characters" value={password} onChange={ (e)=>setPassword(e.target.value)}/>
                </div>
                {passwordError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
