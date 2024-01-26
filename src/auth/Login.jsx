import React, { useState } from "react";
import {
  loginApiCall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService.jsx";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = new useNavigate();

  const login = async (user) => {
    try {
      const response = await loginApiCall(user);
      const data = await response.data;
      const status = response.status;
      if (status === 200) {
        toast.success("Welcome back, " + user.usernameOrEmail + "!");
        // const token = "Basic " + window.btoa(user.usernameOrEmail + ":" + user.password);
        const token = "Bearer " + data.accessToken;
        storeToken(token);
        saveLoggedInUser(user.usernameOrEmail);
        navigator("/");
        window.location.reload(false);
      }
    } catch (e) {
      toast.error(e.response.data);
      console.log(e.message);
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
