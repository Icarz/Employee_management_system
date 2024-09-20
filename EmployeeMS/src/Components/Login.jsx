import { useState } from "react";
import "./Style.css";
import axios from "axios";

export const Login = () => {
  // handling the login values with a hooke//
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // submitting the value on the form with this function//
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm text-white">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-white">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              name="email"
              autoCapitalize="off"
              placeholder="please enter your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              name="password"
              autoCapitalize="off"
              placeholder="please enter your password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Log in</button>
          <div className="mt-3">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password" className="text-white">
              Agree with our terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
