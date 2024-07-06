import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { motion, useAnimation, useInView } from "framer-motion";
import AnimatedSpin from "./animation/AnimatedSpin";

import TodoCard from "./components/TodoCard";
import AddTodo from "./components/AddTodo";
import TodoView from "./pages/TodoView";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 12;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async newTodo => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
      );
      const newTodoWithId = {
        ...response.data,
        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      };
      setTodos([newTodoWithId, ...todos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async updatedTodo => {

    try {
     
      if (updatedTodo.id > 200) { 
  
        setTodos(
          todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
        console.log("Todo updated locally:", updatedTodo);
      } else {
  
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
          updatedTodo
        );
        setTodos(
          todos.map(todo => (todo.id === updatedTodo.id ? response.data : todo))
        );
      }
    } catch (error) {
      console.error(
        "Error updating todo:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  const handleDeleteTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="mx-1 px-3 py-1 border cursor-pointer hover:scale-105 rounded bg-white text-blue-500"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className="mx-1 px-3 py-1 border rounded cursor-pointer hover:scale-105 bg-white text-blue-500"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-slate-100 to-teal-500">
      <div className="flex-grow container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AnimatedSpin>
                  <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl  rounded p-2 bg-gradient-to-l from-white to-amber-500">
                    {" "}
                    Todo List using{" "}
                    <span className="text-blue-600 dark:text-blue-500">
                      #REST_API
                    </span>{" "}
                  </h1>
                </AnimatedSpin>
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="flex justify-end  mb-2"
                >
                 
                  <div>
                    <AddTodo onAdd={handleAddTodo} />
                  </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTodos.map(todo => (
                    <motion.div
                      key={todo.id}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <TodoCard todo={todo} onDelete={handleDeleteTodo} />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">{renderPaginationButtons()}</div>
              </>
            }
          />
          <Route
            path="/todo/:id"
            element={<TodoView todos={todos} onUpdate={handleUpdateTodo} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
