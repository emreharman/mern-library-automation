//import dependencies
import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

//import components
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Books from "./components/Books/Books";
import Admin from "./components/Admin/Admin";
import NotLoggedin from "./components/NotLoggedin/NotLoggedin";
import AddBook from "./components/Books/AddBook";
//import css files
import "./general.css";

axios.defaults.withCredentials = true;//This is for reading and sending cookies
function App() {
  const [isAuth, setIsAuth] = useState(undefined);
  const [role, setRole] = useState("");
 

  useEffect(() => {
    axios.get("http://localhost:3004/user/is-auth")
      .then(res => setIsAuth(res.data))
      .catch(err => console.log(err));
  },[])
  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} role={role} setRole={ setRole}/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login">
          <Login setIsAuth={setIsAuth} setRole={ setRole}/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        {
          role === "student" || role ==="manager" && (
            <Route path="/books">
              <Books isAuth={ isAuth}/>
            </Route>
          )
        }
        {
          role === "manager" && (
            <>
              <Route path="/admin" exact>
                <Admin/>
              </Route>
              <Route path="/admin/add-book" exact>
                <AddBook/>
              </Route>
            </>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
