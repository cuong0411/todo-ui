import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, createTodo, updateTodo } from '../services/TodoService';
import { toast } from 'react-toastify';

const SaveTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigator = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Title is blank');
      return;
    }
    const newTodo = { title, description, completed };

    try {
      const response = id
        ? await updateTodo(id, newTodo)
        : await createTodo(newTodo);
      const status = response.status;
      if (status === 201 || status === 200) {
        toast.success(`todo is ${id ? 'updated' : 'created'} successfully`);
        navigator('/todos');
      }
    } catch (error) {
      toast.error('Can not save the todo item!');
    }
  };

  const getTodoById = async (id) => {
    try {
      const response = await getTodo(id);
      const result = response.data;
      setTitle(result.title);
      setDescription(result.description);
      setCompleted(result.completed);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (id) {
      getTodoById(id);
    }
  }, [id]);
  return (
    <div className="container body-container my-3">
      <div className="row">
        <div className="col col-md-8 offset-md-2">
          <h2 className="text-center">{id ? 'Update' : 'Add'} Todo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Enter description"
              ></textarea>
            </div>
            {id && (
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  className="form-check-input"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <label htmlFor="completed" className="form-check-label">
                  Is the task completed?
                </label>
              </div>
            )}
            <div className="d-grid gap-3 d-md-flex justify-content-md-start">
              <button className="btn btn-success">
                <i className="bi bi-arrow-down-square"></i> Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigator('/todos')}
              >
                <i className="bi bi-box-arrow-left"></i> Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SaveTodo;
