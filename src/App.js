import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  console.log(registered);
  const changeRegister = (event) => {
    setRegistered(event.target.checked);
  };
  const getForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      setError("Password Must Contain number,special Character,uppercase");
      return;
    }

    setValidated(true);
    setError("");
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail(" ");
          setPassword(" ");
          verifyEmail();
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() =>
      console.log("Emaail Sent")
    );
  };
  return (
    <div className="App">
      <div className="w-50 mx-auto">
        <h2 className="text-primary">
          Please {registered ? "LogIn" : "Register"}
        </h2>
        <Form noValidate validated={validated} onSubmit={getForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={getEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="error">
              Please type a valid Email.
            </Form.Control.Feedback>
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
              required
            />
            <Form.Control.Feedback type="error">
              Please type a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={changeRegister}
              type="checkbox"
              label="Already Registered?"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? "Log In" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
