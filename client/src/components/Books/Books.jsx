import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios';

const Books = ({ isAuth }) => {
    const history = useHistory();
    const [books,setBooks]=useState("")
    useEffect(() => {
        if (isAuth) {
            axios.get("http://localhost:3004/books")
                .then(res => {
                    console.log(res.data)
                    setBooks(res.data)
                }).catch(err => history.push("/logout"))
        } else {
            history.push("/login")
        }
    },[])

    if(books === "") return null

    return (
        <div className="container pt-5">
            <div className="row">
                {
                    books.map(book => (
                        <div className="col-md-3 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    Name : {book.name}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Author : { book.author}</li>
                                    <li className="list-group-item">Publisher : { book.publisher}</li>
                                    <li className="list-group-item">Publish Date : {book.publishDate}</li>
                                    <li className="list-group-item">ISBN : { book.isbn}</li>
                                </ul>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            
        </div>
    )
}

export default Books
