import { useEffect, useState } from 'react';
import { deleteTodo, getAllTodos } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SingleTodo from './SingleTodo.jsx';
import { isAdminUser } from '../services/AuthService.jsx';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const isAdmin = isAdminUser();

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
      <h2 className="text-center my-3">List of Todos</h2>
      {isAdmin && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigator('/add-todo')}
        >
          <i className="bi bi-plus-circle"></i> Add todo
        </button>
      )}
      <div>
        <table className="table table-bordered table_custom">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <SingleTodo
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  isAdmin={isAdmin}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TodoList;
