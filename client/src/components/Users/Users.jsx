import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState("");
  const [modal, setModal] = useState(false);
  const [secilenUser, setSecilenUser] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [rerender, setRerender] = useState(false);
  const [operation, setOperation] = useState("");

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    //if (!token) history.push("/login");
    axios
      .get(`http://localhost:3004/user/${token}`)
      .then((res) => {
        const decoded = jwt_decode(token);
        const _users = res.data.filter((item) => {
          if (item._id === decoded.user._id) return false;
          else return true;
        });
        setUsers(_users);
      })
      .catch((err) => console.log(err.response));
  }, [rerender]);

  if (users === "") return null;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (name === "" || surname === "" || email === "" || role === "") return;
    const updatedUser = {
      ...secilenUser,
      name,
      surname,
      email,
      role,
    };
    console.log(updatedUser);
    axios
      .put(
        `http://localhost:3004/user/update/${
          updatedUser._id
        }/${localStorage.getItem("token")}`,
        updatedUser
      )
      .then((res) => {
        toggle();
        setRerender(!rerender);
        //history.push("/users");
        //window.location.reload();
      })
      .catch((err) => console.log(err.response));
  };
  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3004/user/delete/${
          secilenUser._id
        }/${localStorage.getItem("token")}`
      )
      .then((res) => {
        toggle();
        setRerender(!rerender);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="container">
      <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    setOperation("Delete");
                    setSecilenUser(user);
                    toggle();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm ml-1"
                  onClick={() => {
                    setOperation("Edit");
                    setSecilenUser(user);
                    setName(user.name);
                    setSurname(user.surname);
                    setEmail(user.email);
                    setRole(user.role);
                    toggle();
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{operation} User</ModalHeader>
        {operation === "Edit" && (
          <Form onSubmit={handleEditSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Don't change if it's not necessary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="surname">Surname</Label>
                <Input
                  type="text"
                  id="surname"
                  placeholder="Don't change if it's not necessary"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Don't change if it's not necessary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Select</Label>
                <Input
                  type="select"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option
                    value="manager"
                    selected={role === "manager" ? true : false}
                  >
                    Manager
                  </option>
                  <option
                    value="student"
                    selected={role === "student" ? true : false}
                  >
                    Student
                  </option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Edit
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
        {operation === "Delete" && (
          <>
            <ModalBody>
              <p>Are you sure to delete {secilenUser.name}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Users;
