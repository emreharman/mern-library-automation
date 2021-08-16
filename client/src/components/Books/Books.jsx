import React,{useEffect,useState} from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useHistory,Link } from 'react-router-dom'

const Books = () => {
    const history=useHistory()
    const [books, setBooks] = useState("")
    const [role,setRole]=useState("")
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) history.push("/login")
        const decoded = jwt_decode(token)
        setRole(decoded.user.role)
        axios.get("http://localhost:3004/book")
            .then(res => setBooks(res.data))
            .catch(err => console.log(err.response))
    }, [])
    
    if (books === "") return null
    

    return (
        <div className="container mt-5">
            {
                role === "manager" && (
                    <div className="row mb-4">
                        <div className="col-md-4 col-sm-6">
                            <Link to="/books/add" className="btn btn-outline-primary" style={{width:"100%"}}>Add Book</Link>
                        </div>
                    </div>
                )
            }
            
            <div className="row">
                {
                    books.map(book => (
                        <div className="col-md-3 col-sm-6" key={book._id}>
                            <div className="card" >
                                <img src={book.img} className="card-img-top" alt={book.name} style={{height:"20rem"}}/>
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">{ book.name}</h5>
                                    <p className="card-text">{ book.author}</p>
                                    <Link to={`/books/edit/${book._id}`} className="btn btn-primary">{ role === "manager" ? ("Edit"):("Details")}</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Books
