import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Books = () => {
    const [books, setBooks] = useState("")
    
    useEffect(() => {
        axios.get("http://localhost:3004/book")
            .then(res => setBooks(res.data))
            .catch(err => console.log(err.response))
    }, [])
    
    if (books === "") return null
    

    return (
        <div className="container mt-5">
            <div className="row">
                {
                    books.map(book => (
                        <div className="col-md-3 col-sm-6" key={book._id}>
                            <div className="card" >
                                <img src={book.img} className="card-img-top" alt={book.name} style={{height:"20rem"}}/>
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">{ book.name}</h5>
                                    <p className="card-text">{ book.author}</p>
                                    <a href="#" class="btn btn-primary">Details</a>
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
