import { createContext, useContext } from "react";

export const TodoContext =  createContext({
    todos : [
        {
            id:1,
            todo: "todo msg",
            completed: false, 
        }
    ],
    addTodo: (todo) => {},
    updateToDo: (id, todo)=> {},
    deleteToDo: (id)=> {},
    toggleComplete :(id)=>{}
})

export const useTodo = () =>{
    return useContext(TodoContext);
}



export const TodoProvider =  TodoContext.Provider