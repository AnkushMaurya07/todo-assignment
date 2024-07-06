import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data);
      } catch (err) {
        setError('Error fetching todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Error adding todo');
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === updatedTodo.id ? response.data : todo)));
    } catch (err) {
      setError('Error updating todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Error deleting todo');
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};
