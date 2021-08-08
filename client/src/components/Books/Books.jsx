import React,{useEffect} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios';

const Books = ({ isAuth }) => {
    const history = useHistory();
    useEffect(() => {
        if (isAuth) {
            axios.get("http://localhost:3004/books")
            .then(res => console.log(res)).catch(err => console.log(err))
        } else {
            history.push("/login")
        }
    })
    return (
        <div>
            <h1>books page</h1>
        </div>
    )
}

export default Books
