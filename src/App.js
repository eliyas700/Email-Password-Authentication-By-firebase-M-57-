import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
const auth = getAuth(app);
function App() {
  const getEmail = (event) => {
    console.log(event.target.value);
  };
  const getPassword = (event) => {
    console.log(event.target.value);
  };
  const getForm = (event) => {
    console.log("Form submited");
    event.preventDefault();
  };
  return (
    <div className="App">
      <form onSubmit={getForm}>
        <input
          onBlur={getEmail}
          type="email"
          name=""
          placeholder="Type Your Email"
          id=""
        />
        <br />
        <input
          onBlur={getPassword}
          type="password"
          name=""
          id=""
          placeholder="Type your Password"
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default App;
