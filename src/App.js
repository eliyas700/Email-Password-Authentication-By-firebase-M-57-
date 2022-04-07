import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  const getForm = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };
  return (
    <div className="App">
      <div className="w-50 mx-auto">
        <h2 className="text-primary">Please Register</h2>
        <Form onSubmit={getForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={getEmail}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={getPassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
