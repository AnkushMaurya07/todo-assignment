import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoCard = ({ todo, onDelete }) => {
  const [openView, setOpenView] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/todo/${todo.id}`);
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setDeletePage(false);
    setOpenView(false); 
  };

  return (
    <div>
      <div
        className={`border text-left hover:scale-105 cursor-pointer p-4 rounded ${
          todo.completed ? "bg-green-500" : "bg-red-500"
        }`}
        onClick={() => setOpenView(true)}
      >
        <h2 className="text-xl font-bold">{todo.title}</h2>
        <p>User ID: {todo.userId}</p>
        <p>ID: {todo.id}</p>
        <p>Completed: {todo.completed ? "True" : "False"}</p>
      </div>

      {openView && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-55 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-full max-w-md">
            <h3 className="text-xl p-2 border border-green-700 bg-amber-500 rounded-xl  font-bold mb-4">About Todo</h3>
            <div className="text-left pl-2 leading-9">
              <div className="flex">
             <p className="font-semibold"> User ID:</p>
              <p className="pl-2"> {todo.userId}</p>
              </div>
              <div className="flex">
           
              <p className="font-semibold">ID:</p>
              <p className="pl-2 "> {todo.id}</p>

              </div>
              <div className="flex">
              <p className="font-semibold"> Title:</p>
             
              <h2 className="text-xl font-semibold pl-2 ">"{todo.title}"</h2>
              </div>
              <div className="flex">
        
              <p className="font-semibold"> Completed:</p>
              <p className="pl-2"> {todo.completed ? "True" : "False"}</p>

              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletePage(true)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:scale-105"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenView(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deletePage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this todo ID: {todo.id}?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setDeletePage(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
