import { useState } from "react";
import { useTodo } from "../contexts/ToDoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faDumpster, faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [todoMessage, setTodoMessage] = useState(todo.todo)


  const edit_todo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMessage });
    setIsEditable(false);
    console.log("can edit")
  }

  const toggler = () => {
    toggleComplete(todo.id)
  }

  const delete_todo = () => {
    deleteTodo(todo.id);
  }

  // const save_todo = ()=>{
  //   setIsEditable(true)
  // }


  return (
    <div class={`flex items-center justify-between p-4  border border-gray-200 rounded-lg mb-2 ${todo.completed ? "bg-[#3f3f3f]" : "bg-[#172842]"}`} id={todo.id}>
      <div class="flex items-center grow">
        <input type="checkbox" class="mr-2" checked={todo.completed} onChange={toggler} disabled={isEditable}/>

        <input type="text"
          onChange={(e) => setTodoMessage(e.target.value)}
          className={` w-full mr-3 bg-transparent ${isEditable ? "bg-white text-gray-800 p-2" : ""} ${todo.completed ? "line-through text-gray-400" : "undefined text-gray-100"}`} value={todoMessage} readOnly={!isEditable} />
      </div>

      <div className="flex ">
        <button
          onClick={() => {
            if (todo.completed) return;
            if (isEditable) {
              edit_todo(); 
            }
            setIsEditable(!isEditable); 
          }}
          className={`hover:underline mr-2 px-3 text-gray-50 rounded-full ${todo.completed ? "bg-slate-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-400 cursor-pointer"}`}
          disabled={todo.completed}
        >
          {isEditable ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPencil} />}
        </button>
        <button onClick={delete_todo} class="hover:underline   px-3 text-gray-50 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" ><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  )
}
