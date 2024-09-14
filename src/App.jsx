import { useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import { Route, Routes } from 'react-router-dom'
import TodoForm from './pages/TodoForm'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TodoList from './components/TodoList'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div>

{/* create todo */}

    <Routes>
      <Route path="/"  element={<TodoForm />} />
      <Route path="/list"  element={<TodoList />} />

    </Routes>

    <ToastContainer />
   </div>
  )
}

export default App
