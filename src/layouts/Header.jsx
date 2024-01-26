import { NavLink } from "react-router-dom";
import {
  getLoggedInUser,
  isUserLoggedIn,
  logout,
} from "../services/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();
  const handleLogout = () => {
    logout();
    navigator("/login");
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            To-do Tasks
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!isAuth && (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Log in
                    </NavLink>
                  </li>{" "}
                </>
              )}
              {isAuth && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Log out
                    </NavLink>
                  </li>
                  <li className="nav-item text-warning d-flex justify-content-center align-items-center">
                    Hi {getLoggedInUser()}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
