import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev => [{ id: uuidv4(), ...todo }, ...prev]));
  }

  const deleteTodo = (id) => {
    setTodos((prev => prev.filter((prevTodo) => { return prevTodo.id !== id })));
  }

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, ...updatedTodo } : prevTodo));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo));
  };

  // useEffect(()=>{
  //   const todos = JSON.parse(localStorage.getItem("todos"))

  //   if(todos && todos.length >0){
  //     setTodos(todos)
  //   }
  // }, [todos])

  
  // useEffect(()=>{
  // localStorage.setItem("todos", JSON.stringify(todos))
  // }, [todos])
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='bg-[#172842] min-h-screen py-8 px-2'>
        <div className='w-full max-w-2xl mx-auto  shadow-md rounded-lg px-4 py-3 text-white bg-[#060c16]' >
          <h2 className='text-2xl font-semibold text-center mb-8 mt-2'><FontAwesomeIcon icon={faList}/> Manage Your Todos </h2>
          <div className='mb-4'>
           <TodoForm/>
          </div>

          <div>
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </TodoProvider>
  )
}

export default App
