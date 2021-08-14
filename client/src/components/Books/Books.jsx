import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios';

const Books = ({ isAuth }) => {
    const history = useHistory();
    const [books,setBooks]=useState("")
    useEffect(() => {
        if (isAuth) {
            axios.get("http://localhost:3004/books")
            .then(res => setBooks(res.data)).catch(err => history.push("/logout"))
        } else {
            history.push("/login")
        }
    })

    if(books === "") return null

    return (
        <div>
            <h1>books page</h1>
            {
                books.map(book => (<p>{book.name} { book.author}</p>))
            }
        </div>
    )
}

export default Books
