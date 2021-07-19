import React from 'react'
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import "./Header.css";

const Header = ({isAuth,setIsAuth,role,setRole}) => {
    const history = useHistory();
    console.log(role);
    return (
        <header>
            <div className="logo">
                <Link to="/" className="link-nav">My Site</Link>
            </div>
            <nav>
                <ul>
                    {
                        isAuth === false && (
                            <>
                                <li>
                                    <Link to="/login" className="link-nav">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="link-nav">Register</Link>
                                </li>
                            </>
                        )
                    }
                    {
                        role === "student" || role === "manager" ? (
                            <>
                                <li>
                                    <Link to="/books" className="link-nav">Books</Link>
                                </li>
                            </>
                        ):(null)
                    }
                    {
                        role === "manager" && (
                            <>
                                <li>
                                    <Link to="/admin" className="link-nav">Admin Panel</Link>
                                </li>
                            </>
                        )
                    }
                    {
                        isAuth === true && (
                            <>
                                <li>
                                    <button className="logout" onClick={() => {
                                        axios.get("http://localhost:3004/user/logout")
                                            .then(res => {
                                                setIsAuth(false);
                                                setRole("");
                                                history.push("/login");
                                            })
                                            .catch(err => console.log(err));
                                    }}>Logout</button>
                                </li>
                            </>    
                        )
                    }
                   
                </ul>
            </nav>
        </header>
    )
}

export default Header
