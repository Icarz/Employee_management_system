
import "./Style.css";
export const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm text-white">
        <h2>Login Page</h2>
        <form>
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
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Log in</button>
          <div className="mt-3">
            <input type="checkbox" name="tick" id="tick" className="me-2"/>
            <label htmlFor="password" className="text-white">Agree with our terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};
