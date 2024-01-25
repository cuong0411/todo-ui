import React, { useState } from "react";
import { loginApiCall } from "../services/AuthService.jsx";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (user) => {
    try {
      const response = await loginApiCall(user);
      const data = await response.data;
      const status = response.status;
      if (status === 200) {
        toast.success(data);
      }
    } catch (e) {
      toast.error("Login failed");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ usernameOrEmail, password });
  };

  return (
    <div className="container body-container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-info-emphasis fw-bold">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usernameOrEmail" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                name="usernameOrEmail"
                id="usernameOrEmail"
                className="form-control"
                placeholder="Enter your username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-outline-primary">Log in</button>
              <p>
                Not a member yet! Register an account{" "}
                <NavLink to="/register">here</NavLink>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
