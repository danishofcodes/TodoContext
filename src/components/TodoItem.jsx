import { useState, useRef, useEffect } from "react";
import { useTodo } from "../contexts/ToDoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [todoMessage, setTodoMessage] = useState(todo.todo);
  const textAreaRef = useRef(null);

  
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [todoMessage]);

  const edit_todo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMessage });
    setIsEditable(false);
  };

  return (
    <div 
      className={`group flex items-start justify-between p-4 rounded-2xl mb-3 transition-all duration-300 border ${
        todo.completed 
        ? "bg-white/5 border-white/5 opacity-60" 
        : "bg-white/10 border-white/10 hover:bg-white/15 shadow-sm"
      }`}
    >
      <div className="flex items-start grow gap-4 min-w-0">
 
        <input 
          type="checkbox" 
          className="mt-1.5 w-5 h-5 min-w-[20px] rounded-full border-2 border-indigo-500 appearance-none checked:bg-indigo-500 checked:border-transparent transition-all cursor-pointer relative after:content-['✓'] after:absolute after:text-white after:text-xs after:left-1 after:top-0 after:hidden checked:after:block"
          checked={todo.completed} 
          onChange={() => toggleComplete(todo.id)} 
          disabled={isEditable}
        />

     
        <textarea
          ref={textAreaRef}
          rows="1"
          onChange={(e) => setTodoMessage(e.target.value)}
          readOnly={!isEditable}
          className={`bg-transparent outline-none w-full text-lg resize-none overflow-hidden transition-all py-0.5 ${
            isEditable ? "border-b border-indigo-400 text-white" : "text-gray-100"
          } ${todo.completed ? "line-through text-gray-500" : ""}`}
          value={todoMessage}
        />
      </div>


      <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
        <button
          onClick={() => {
            if (todo.completed) return;
            if (isEditable) edit_todo();
            setIsEditable(!isEditable);
          }}
          className={`p-2.5 rounded-xl transition-colors ${
            isEditable ? "text-green-400 hover:bg-green-400/10" : "text-gray-400 hover:bg-white/10"
          } ${todo.completed ? "hidden" : "block"}`}
        >
          <FontAwesomeIcon icon={isEditable ? faSave : faPencil} />
        </button>
        
        <button 
          onClick={() => deleteTodo(todo.id)} 
          className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}