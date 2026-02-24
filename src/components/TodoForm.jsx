import { useEffect, useState } from "react"
import {useTodo} from "../contexts/ToDoContext"
import { faAdd, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoForm() {
  const { addTodo } = useTodo();
  const [todo, setTodo] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo: todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="w-full mb-8 group">
      <div className="flex flex-row items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/50">
        
        <input
          type="text"
          placeholder="What's on your mind?..."
          // Added min-w-0 to prevent the input from pushing the button off-screen
          className="bg-transparent flex-1 min-w-0 px-3 md:px-4 py-3 text-white placeholder-gray-400 outline-none text-base md:text-lg"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />

        <button 
          type="submit"
          // Using shrink-0 to ensure the button never loses its shape
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 md:px-5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 shrink-0"
        >
          {/* Label hidden on very small screens to save space, visible on medium+ */}
          <span className="hidden sm:block font-semibold text-sm md:text-base">Add Task</span>
          <FontAwesomeIcon icon={faPlusCircle} className="text-xl sm:text-lg" />
        </button>
        
      </div>
    </form>
  );
}