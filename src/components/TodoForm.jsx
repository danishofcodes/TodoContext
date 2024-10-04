import { useEffect, useState } from "react"
import {useTodo} from "../contexts/ToDoContext"
import { faAdd, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoForm() {
const {addTodo} = useTodo();

  const [todo, setTodo] = useState("");

  const add = (e)=>{
    e.preventDefault();
    if(!todo)return;
    addTodo({ todo:todo, completed:false})
    setTodo("")
  }

  useEffect(()=>{
    console.log(todo)
  },[todo])
  return (
    <form onSubmit={add}>
    <div class="flex">
    <input type="text" placeholder="Add a new todo" class="border border-gray-300 rounded-l-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-950" onChange={(e)=>{setTodo(e.target.value)}} value={todo}/>
    <button class="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600 focus:outline-none" >Add Todo <FontAwesomeIcon icon={faPlusCircle}/></button>
</div>
</form>
  )
}
