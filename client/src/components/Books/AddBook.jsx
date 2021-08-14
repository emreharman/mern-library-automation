import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import "./AddBook.css"

const AddBook = () => {
    const history=useHistory()
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [author, setAuthor] = useState("")
    const [authorError, setAuthorError] = useState(false)
    const [publisher, setPublisher] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [isbn, setIsbn] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [saveError,setSaveError]=useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name === "") {
            setNameError(true)
            setErrorMessage("Name field is required")
            setTimeout(() => {
                setNameError(false)
                setErrorMessage("")
            }, 1500);
            return
        }
        if (author === "") {
            setAuthorError(true)
            setErrorMessage("Author field is required")
            setTimeout(() => {
                setAuthorError(false)
                setErrorMessage("")
            }, 1500);
            return
        }
        const newBook = {
            name,author,publisher,publishDate,isbn
        }
        console.table(newBook)
        axios.post("http://localhost:3004/books/add",newBook)
            .then(res => history.push("/books"))
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 400) {
                    setSaveError(true)
                    setErrorMessage(err.response.data.message)
                }
            })
    }

    return (
        <div>
            <Helmet title="Add Book" />
            <div className="add-book-form-container">
                <form className="add-book-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter book name" value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    {
                        nameError && (<small style={{ color: "red" }}>{ errorMessage}</small>)
                    }
                    <div>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" placeholder="Enter author" value={author}
                            onChange={(e)=> setAuthor(e.target.value)}
                        />
                    </div>
                    {
                        authorError && (<small style={{ color: "red" }}>{ errorMessage}</small>)
                    }
                    <div>
                        <label htmlFor="publisher">Publisher</label>
                        <input type="text" id="publisher" placeholder="Enter publisher" value={publisher}
                            onChange={(e)=>setPublisher(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="publishDate">Publish Date</label>
                        <input type="text" id="publishDate" placeholder="Enter publish date" value={publishDate}
                            onChange={(e)=>setPublishDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" id="isbn" placeholder="Enter ISBN" value={isbn}
                            onChange={(e)=>setIsbn(e.target.value)}
                        />
                    </div>
                    <div className="add-book-button-container">
                        <button type="submit">Save</button>
                    </div>
                    {
                        saveError && (<small style={{ color: "red" }}>{ errorMessage}</small>)
                    }
                </form>
            </div>
            
        </div>
    )
}

export default AddBook
