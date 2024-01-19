import { useEffect, useState } from 'react';
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTodos();
      const result = await response.data;
      setTodos(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      toast.success('Removed successfully');
      await getTodoList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    console.log('click');
    try {
      if (status) {
        await inCompleteTodo(id);
      } else {
        await completeTodo(id);
      }
      await getTodoList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container body-container mt-3">
        <p className="text-center alert alert-info">Fetching data...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container body-container mt-3">
        <p className="text-center alert alert-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container body-container">
      <h2 className="text-center">List of Todos</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigator('/add-todo')}
      >
        <i className="bi bi-plus-circle"></i> Add todo
      </button>
      <div>
        <table className="table table-light table-striped">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn"
                        onClick={() => updateStatus(todo.id, todo.completed)}
                      >
                        {todo.completed ? (
                          <i className="bi bi-check-square"></i>
                        ) : (
                          <i className="bi bi-square"></i>
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-info"
                        onClick={() => navigator(`/update-todo/${todo.id}`)}
                      >
                        <i className="bi bi-pencil-square"></i>{' '}
                        <span className="d-none d-md-inline">Update</span>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeTodo(todo.id)}
                      >
                        <i className="bi bi-trash"></i>{' '}
                        <span className="d-none d-md-inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TodoList;
