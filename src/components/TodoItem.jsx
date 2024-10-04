import { useState } from "react";
import {useTodo} from "../contexts/ToDoContext"
export default function TodoItem({todo}) {
const [isEditable, setIsEditable] =  useState(false);
  const {updateTodo, deleteTodo, toggleComplete} = useTodo();
  const [todoMessage, setTodoMessage] = useState(todo.todo)


  const edit = ()=>{
    updateTodo(todo.id, {...todo, todo:todoMessage});
    setIsEditable(false)
  }

  const toggle = ()=>{
    toggleComplete(todo.id)
  }

  // const deleteTodo = ()=>{
  //   updateTodo(todo.id, {...todo, todo:todoMessage});
  //   setIsEditable(false)
  // }
  return (
    <div class="flex items-center justify-between p-4 bg-[#172842] border border-gray-200 rounded-lg mb-2">
    <div class="flex items-center">
        <input type="checkbox" class="mr-2" />
        <span class={`${toggleComplete && "line-through" }text-gray-100`}>{todo.todo}</span>
    </div>
    <div className="flex ">
        <button class="hover:underline mr-2 bg-blue-500 px-3 text-gray-50 rounded ">Edit</button>
        <button class=" hover:underline  bg-red-500 px-3 text-gray-50 rounded" >Delete</button>
    </div>
</div>
  )
}
