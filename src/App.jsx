import SaveTodo from './components/SaveTodo';
import TodoList from './components/TodoList';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/add-todo" element={<SaveTodo />}></Route>
          <Route path="/update-todo/:id" element={<SaveTodo />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" closeOnClick />
    </>
  );
}

export default App;
