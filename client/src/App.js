import React,{useState} from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import Books from "./components/Books/Books"
import Admin from "./components/Admin/Admin"
import AddBook from "./components/Books/AddBook"
import EditBook from "./components/Books/EditBook";
import "./general.css"

function App() {
  const [role, setRole] = useState("")
  const [userId, setUserId] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  
  
  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} setUserId={setUserId} setRole={setRole} role={ role}/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login setRole={setRole} setUserId={setUserId} setIsAuth={ setIsAuth}/>
        </Route>
        <Route path="/books" exact>
          {
            role === "student" || role === "manager" ? (<Books/>):(<Redirect to="/login"/>)
          }
        </Route>
        <Route path="/admin-panel">
          {
            role === "manager" ? (<Admin/>):(<Redirect to="/login"/>)
          }
        </Route>
        <Route path="/books/add" exact>
          {
            role === "manager" ? (<AddBook setIsAuth={setIsAuth} setUserId={setUserId} setRole={setRole}/>):(<Redirect to="/login"/>)
          }
        </Route>
        <Route path="/books/edit/:id">
          {
            role === "manager" || role === "student" ? (<EditBook />):(<Redirect to="/login" />)
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
