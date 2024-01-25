import SaveTodo from "./components/SaveTodo";
import TodoList from "./components/TodoList";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/add-todo" element={<SaveTodo />}></Route>
          <Route path="/update-todo/:id" element={<SaveTodo />}></Route>
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
