import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";


const loadState = () => {
    try{
        const serializedState = localStorage.getItem("todos")
    if(serializedState === null) return undefined

    return JSON.parse(serializedState)
}
catch(err){
    console.log('err', err)
}
}

const saveState = (state) => {
    try{
        const serializedState =  JSON.stringify(state);
        localStorage.setItem("todos", serializedState)
    }
    catch(err){
        console.log('err',err)
    }
}

const initialState  =  loadState() || {
    todos : [],
    completedTasks: [],
    deletedTask: []
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{

        addTodo: (state,action) => {
            const data = action.payload
            const newData = { id: uuid(), ...data, isCompleted: false, isDeleted: false};

            console.log('add not called')

            state.todos.push(newData);
            saveState(state);
            toast.success("todo success")
        },

        editTodo: (state,action) => {
            console.log('editAction', action.payload)
            const newData = action.payload

            const index = state.todos.findIndex((el) => el?.id === newData?.id);

            if (index !== -1) {
                state.todos[index] = { ...state.todos[index], ...newData };
                saveState(state);
                toast.success("Edit successful");
            }
          
        },

        
        completeTodo: (state,action) => {
            const id = action.payload
            const index = state.todos.findIndex((el) => el.id === id)

            if(index !== -1) {
                
                const task = state.todos[index];

                task.isCompleted = true;
                
                state.completedTasks.push(task)

                state.todos = state.todos.filter((el) => el.id !== id)

                saveState(state)
                
            }


        },

        deleteTodo:(state,action) => {
            const id = action.payload
            const index = state.todos.findIndex((el) => el.id === id)

            console.log('ndex', index)
            if(index !== -1) {
                const task = state.todos[index];

                task.isDeleted = true;
                
                state.deletedTask.push(task)

                state.todos = state.todos.filter((el) => el.id !== id)

                saveState(state)
                
            }
        },

    }
})

export  const {addTodo, editTodo, completeTodo, deleteTodo} = todoSlice.actions

export default todoSlice.reducer    