import React, { useState } from 'react'
import { useHistory } from 'react-router'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import "../Register/Register.css"
import "./addBook.css"

const AddBook = ({ setIsAuth, setUserId, setRole }) => {
    const history = useHistory()
    const token = localStorage.getItem("token")
    if (token === null) {
        setIsAuth(false)
        setUserId("")
        setRole("")
        history.push("/login")
    }
    const decoded = jwt_decode(token)
    const userId = decoded.user._id
    setRole(decoded.user.role)
    setUserId(userId)
    setIsAuth(true)

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [author, setAuthor] = useState("")
    const [authorError, setAuthorError] = useState(false)
    const [publisher, setPublisher] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [isbn, setIsbn] = useState("")
    const [img, setImg] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    

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
        if (author === "") {
            setAuthorError(true)
            setErrorMessage("Author field is required")
            setTimeout(() => {
                setAuthorError(false)
            }, 1500);
            return
        }
        const newBook = {
            name,author,publisher,publishDate,isbn,img,userId,token
        }
        axios.post("http://localhost:3004/book/add", newBook)
            .then(res => history.push("/books"))
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 400) {
                    setNameError(true)
                    setErrorMessage(err.response.data.message)
                    setTimeout(() => {
                        setNameError(false)
                    }, 1500);
                }
                if (err.response.status === 401) {
                    history.push("/login")
                }
            })
    }
    
    return (
        <div className="register-container">
            <form className="add-book-form" onSubmit={handleSubmit}>
                <div className="register-form-control ">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Book's name..."
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                {nameError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div className="register-form-control">
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" placeholder="Book's author"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                    />
                </div>
                {authorError && (<small style={{color:"#ff6961"}}>{ errorMessage}</small>)}
                <div className="register-form-control">
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" id="publisher" placeholder="Name of publisher"
                        value={publisher}
                        onChange={(e)=>setPublisher(e.target.value)}
                    />
                </div>
                
                <div className="register-form-control">
                    <label htmlFor="publishDate">Publish Date</label>
                    <input type="text" id="publishDate" placeholder="Year of publish"
                        value={publishDate}
                        onChange={(e)=>setPublishDate(e.target.value)}
                    />
                </div>

                <div className="register-form-control">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" id="isbn" placeholder="Book's ISBN"
                        value={isbn}
                        onChange={(e)=>setIsbn(e.target.value)}
                    />
                </div>
                
                <div className="register-form-control">
                    <label htmlFor="img">Image</label>
                    <input type="text" id="img" placeholder="The image URL for this version"
                        value={img}
                        onChange={(e)=>setImg(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook
