import React, { useState } from "react";
import { registerApiCall } from "../services/AuthService.jsx";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setUser({ ...user, [nameInput]: valueInput });
  };

  const register = async (obj) => {
    try {
      const response = await registerApiCall(obj);
      const status = response.status;
      const data = await response.data;
      if (status === 201) {
        toast.success(data);
      } else {
        toast.error(data);
      }
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.username.trim() ||
      user.password.trim()
    ) {
      setError("Please fill out all the fields");
      return;
    }
    register(user);
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="container body-container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-info-emphasis fw-bold">
            Register Form
          </h2>
          {error && <p className="alert alert-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={handleInputChange}
                value={user.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                onChange={handleInputChange}
                value={user.username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleInputChange}
                value={user.email}
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
                onChange={handleInputChange}
                value={user.password}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-outline-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
