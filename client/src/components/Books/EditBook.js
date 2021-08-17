import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "../Modal/Modal";

const EditBook = () => {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState(false);
  const [publisher, setPublisher] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [img, setImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    //console.log(tokenFromLS)
    if (!tokenFromLS) history.push("/login");
    const decoded = jwt_decode(tokenFromLS);
    setRole(decoded.user.role);
    setToken(tokenFromLS);
    setUserId(decoded.user._id);
    axios
      .get(`http://localhost:3004/book/${id}`)
      .then((res) => {
        setBook(res.data);
        setName(res.data.name);
        setAuthor(res.data.author);
        setPublisher(res.data.publisher);
        setPublishDate(res.data.publishDate);
        setIsbn(res.data.isbn);
        setImg(res.data.img);
      })
      .catch((err) => console.log(err.response));
  }, []);

  if (book === "") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError(true);
      setErrorMessage("Name field is required");
      setTimeout(() => {
        setNameError(false);
      }, 1500);
      return;
    }
    if (author === "") {
      setAuthorError(true);
      setErrorMessage("Author field is required");
      setTimeout(() => {
        setAuthorError(false);
      }, 1500);
      return;
    }
    const updatedBook = {
      name,
      author,
      publisher,
      publishDate,
      isbn,
      img,
      userId,
      token,
    };
    console.table(updatedBook);
    axios
      .put(`http://localhost:3004/book/${id}`, updatedBook)
      .then((res) => history.push("/books"))
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400) {
          setNameError(true);
          setErrorMessage(err.response.data.message);
          setTimeout(() => {
            setNameError(false);
          }, 1500);
        }
        if (err.response.status === 401) {
          history.push("/login");
        }
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3004/book/${id}/${token}`)
      .then((res) => history.push("/books"))
      .catch((err) => console.log(err));
    setShowModal(false);
  };
  return (
    <div className="register-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <Link to="/books" className="btn btn-outline-warning w-25">
          Back
        </Link>
        <div className="register-form-control ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Book's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>
        {nameError && (
          <small style={{ color: "#ff6961" }}>{errorMessage}</small>
        )}
        <div className="register-form-control">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Book's author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>
        {authorError && (
          <small style={{ color: "#ff6961" }}>{errorMessage}</small>
        )}
        <div className="register-form-control">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            placeholder="Name of publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>

        <div className="register-form-control">
          <label htmlFor="publishDate">Publish Date</label>
          <input
            type="text"
            id="publishDate"
            placeholder="Year of publish"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>

        <div className="register-form-control">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            placeholder="Book's ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>

        <div className="register-form-control">
          <label htmlFor="img">Image</label>
          <input
            type="text"
            id="img"
            placeholder="The image URL for this version"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            disabled={role === "student" ? true : false}
          />
        </div>

        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {role === "manager" && (
            <>
              <button
                type="button"
                className="btn btn-danger pt-2 w-50"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </>
          )}
        </div>
      </form>
      {showModal && (
        <Modal
          title={book.name}
          message="Are you sure to delete?"
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default EditBook;
