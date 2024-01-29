import { NavLink } from 'react-router-dom';
import { getLoggedInUser, isUserLoggedIn } from '../services/AuthService';

export const HomePage = () => {
  const isAuth = isUserLoggedIn();

  return (
    <div className="container body-container">
      <div className="px-4 py-5 my-5 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          className="bi bi-list-check"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
          />
        </svg>
        <h1 className="display-5 fw-bold text-body-emphasis">To-do Tasks</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-2">
            A simple to-do project with two types of user:{' '}
            <span className="fw-bold">USER</span> and{' '}
            <span className="fw-bold">ADMIN</span>.
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li>Admin account can CRUD the to-do item</li>
            <li>
              User account can update the status of a to-do item (completed or
              not)
            </li>
          </ul>

          <table className="table table-bordered table_custom">
            <thead>
              <tr>
                <th>username</th>
                <th>password</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ana</td>
                <td>test@123</td>
                <td>USER</td>
              </tr>
              <tr>
                <td>topson</td>
                <td>test@123</td>
                <td>ADMIN</td>
              </tr>
            </tbody>
          </table>
          {!isAuth && (
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <NavLink
                to="/login"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-secondary btn-lg px-4">
                Register
              </NavLink>
            </div>
          )}
          {isAuth && (
            <p className="alert alert-primary">
              Hi {getLoggedInUser()}. Check your to-do list{' '}
              <NavLink to="/todos" className="text-success">
                Here
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
