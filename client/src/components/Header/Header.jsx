import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Header.css";

const Header = ({ isAuth, setIsAuth, setUserId, setRole, role }) => {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) history.push("/login");
    else {
      const decodedJwt = jwt_decode(token);
      console.log(decodedJwt);
      setUserId(decodedJwt.user._id);
      setRole(decodedJwt.user.role);
      setIsAuth(true);
    }
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUserId("");
    setRole("");
    history.push("/login");
  };
  return (
    <header>
      <div className="logo">
        <Link to="/">Library</Link>
      </div>
      <nav>
        {role === "manager" && (
          <>
            <Link to="/books">Books</Link>
          </>
        )}
        {role === "student" && <Link to="/books">Books</Link>}
        {!isAuth ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
