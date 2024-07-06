import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TodoView = ({ todos, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = () => {
      const foundTodo = todos.find(todo => todo.id === parseInt(id));
      if (foundTodo) {
        setTodo(foundTodo);
        setLoading(false);
      } else {
        setError('Todo not found');
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: name === 'completed' ? value === 'true' : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo) {
      await onUpdate(todo); 
      navigate('/');
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='flex justify-center items-center bg-gray-200'>
      <div className="w-full max-w-md bg-white  my-2  rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">User ID</label>
            <input type="text" value={todo.userId} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">ID</label>
            <input type="text" value={todo.id} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Completed</label>
            <select
              name="completed"
              value={todo.completed ? 'true' : 'false'}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
            Update Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoView;
