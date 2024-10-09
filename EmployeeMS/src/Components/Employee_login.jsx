import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.css";

const Employee_login = () => {
  // handling the login values with a hooke//
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // creating instance of useNavigate
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // configuration for cookies //
  axios.defaults.withCredentials = true;

  // submitting the value on the form with this function//
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/employee/employee_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/employee_detail/"+ result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm text-white">
        <div className="text-danger">{error && <p>{error}</p>}</div>

        <h2>Employee Login</h2>
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

export default Employee_login;
