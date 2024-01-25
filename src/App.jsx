import SaveTodo from "./components/SaveTodo";
import TodoList from "./components/TodoList";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import { isUserLoggedIn } from "./services/AuthService.jsx";

function App() {
  // eslint-disable-next-line react/prop-types
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();
    return isAuth ? children : <Navigate to="/login" />;
  };
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatedRoute>
                <TodoList />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <SaveTodo />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/update-todo/:id"
            element={
              <AuthenticatedRoute>
                <SaveTodo />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" closeOnClick />
    </>
  );
}

export default App;
