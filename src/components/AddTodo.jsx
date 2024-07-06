import React, { useState } from 'react'

const AddTodo = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false)
  const [newTodo, setNewTodo] = useState({
    userId: '',
    title: '',
    completed: false,
  })

  const handleChange = (e) => {

    if(!newTodo){
        return;
    }
    
    const { name, value } = e.target
    setNewTodo({
      ...newTodo,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!newTodo){
        return;
    }
    onAdd(newTodo)
    setNewTodo({
      userId: '',
      title: '',
      completed: false,
    })
    setShowForm(false)
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div className=" p-3 ">
      {!showForm ? (
         
        <button
          onClick={toggleForm}
          className="bg-gray-900 text-white hover:scale-110 transition-all transform duration-500 ease-in-out hover:bg-black hover:text-white  border-2 font-bold border-gray-600 p-4 rounded-md"
        >
          Add Todo
          
        </button>
       
      ) : (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <button
              onClick={toggleForm}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userId"
                value={newTodo.userId}
                onChange={handleChange}
                placeholder="User ID"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="title"
                value={newTodo.title}
                onChange={handleChange}
                placeholder="Title"
                className="mb-2 p-2 border rounded w-full"
              />
              <select
                name="completed"
                value={newTodo.completed}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTodo
