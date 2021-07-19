import React, { useEffect } from 'react'
import axios from "axios";
import { useHistory } from 'react-router';
import "./NotLoggedIn.css";

const NotLoggedin = ({ setIsAuth, setRole }) => {
    const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:3004/user/logout")
            .then(res => {
                setIsAuth(false);
                setRole("");
                setTimeout(() => {
                    history.push("/login");    
                }, 2000);
                
            })
            .catch(err => console.log(err));
    },[])
    return (
        <div className="not-logged-main">
            <h1>Please use links on web page. Don't try to access on url.</h1>
            <iframe src="https://giphy.com/embed/PkFYci8BUkmdA7K1qa" width="480" height="329" frameBorder="0"></iframe>
        </div>
    )
}

export default NotLoggedin
