import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  // Loading data on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  // local storage save on todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: uuidv4(), ...todo }, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  // Logic for a dynamic "Completion" stats header
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      {/* 2026 Background: Deep Mesh Gradient */}
      <div className='min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 py-12 px-4 selection:bg-indigo-500/30'>
        
        <div className='w-full max-w-2xl mx-auto'>
          
          {/* Header Section with Micro-Stats */}
          <header className="mb-10 text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4 shadow-xl shadow-indigo-500/10">
              <FontAwesomeIcon icon={faCheckDouble} className="text-3xl text-indigo-400" />
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-white'>
              Focus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Flow</span>
            </h1>
            <p className="text-slate-400 font-medium">
              {todos.length > 0 
                ? `${completedCount} of ${todos.length} tasks completed` 
                : "Your day is a blank canvas."}
            </p>
          </header>

     
          <main className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-2xl'>
            <div className='mb-8'>
              <TodoForm />
            </div>

            <div className="space-y-1">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                   <p className="text-slate-500">No tasks yet. Add one to get started!</p>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App;