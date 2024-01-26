import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeTodo, inCompleteTodo } from "../services/TodoService.js";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const SingleTodo = ({ todo, removeTodo, isAdmin }) => {
  const [todoItem, setTodoItem] = useState(todo);
  const navigator = useNavigate();

  const updateStatus = async (id, status) => {
    try {
      if (status) {
        const response = await inCompleteTodo(id);
        const result = await response.data;
        setTodoItem(result);
      } else {
        const response = await completeTodo(id);
        const result = await response.data;
        setTodoItem(result);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr>
      <td>{todoItem.title}</td>
      <td>{todoItem.description}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn"
            onClick={() => updateStatus(todoItem.id, todoItem.completed)}
          >
            {todoItem.completed ? (
              <i className="bi bi-check-square"></i>
            ) : (
              <i className="bi bi-square"></i>
            )}
          </button>
        </div>
      </td>
      {isAdmin && (
        <td>
          <div className="d-grid gap-2">
            <button
              className="btn btn-info"
              onClick={() => navigator(`/update-todo/${todoItem.id}`)}
            >
              <i className="bi bi-pencil-square"></i>{" "}
              <span className="d-none d-md-inline">Update</span>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeTodo(todoItem.id)}
            >
              <i className="bi bi-trash"></i>{" "}
              <span className="d-none d-md-inline">Delete</span>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default SingleTodo;
