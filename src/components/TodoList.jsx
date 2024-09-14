import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeTodo, deleteTodo, editTodo } from '../redux/slice/todoSlice';
import CreateTodo from './CreateTodo';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { todos, completedTasks, deletedTask } = useSelector((state) => state.todo);

  console.log('todos', todos)
  const [type, setType] = useState("all")
  const [selectIds, setSelectIds] = useState([]);
  const [isEdit, setIsEdit] = useState({
    data: {},
    edit: false
  })

  const filteredTodos = useMemo(() => {
    switch (type) {
      case 'completed': {
        return completedTasks
      }
      case 'deleted': {
        return deletedTask
      }
      case 'all': {
        return [...todos, ...completedTasks]
      }
      default: {
        return [...todos, ...completedTasks]
      }
    }
  }, [type, todos, completedTasks, deletedTask])

  const handleTask = (type, el) => {
    if (type === "edit") {
      setIsEdit({ edit: !isEdit.edit, data: el });
      dispatch(editTodo(el.id))
    }
    if (type === "complete") {
      dispatch(completeTodo(el.id))
    }
    if (type == "delete") {
      dispatch(deleteTodo(el.id))
    }
  }

  const handleMultiple = (type, ids) => {

    if (type === "completeMultiple") {
      console.log('Completeids', ids)

      ids.forEach((id) => dispatch(completeTodo(id)))

    }

    if (type === "deleteMultiple") {
      console.log('Delteids', ids)
      ids.forEach((id) => dispatch(deleteTodo(id)))

    }
  }

  const handleCloseEdit = () => {
    setIsEdit({ data: {}, edit: false });
};

  return (
    <div>
      <h1 className='text-2xl'>Todo List</h1> 

      <button className='mb-5' onClick={() => navigate("/")}>Back</button>

      <div className='flex flex-wrap justify-center space-x-8 mt-8 mb-8'>
        <button onClick={() => setType('all')}>All Task</button>
        <button onClick={() => setType('completed')}>Completed Tasks</button>
        <button onClick={() => setType('deleted')} >Deleted Tasks</button>

      </div>

      <div>
        <button onClick={() => handleMultiple("completeMultiple", selectIds)}>Complete Multiple</button>
        <button onClick={() => handleMultiple("deleteMultiple", selectIds)}>Delete Multiple</button>
      </div>

      {
        isEdit.edit &&
         <CreateTodo
          editData={isEdit.data}
           editId={isEdit?.data?.id} 
           onClose={handleCloseEdit} />
      }


      <div className='m-8'>
        {
          filteredTodos.map((el) => {
            return (
              <div key={el.id} className='flex  mt-10  space-x-4'>
                <div className='mt-5'>
                  <input disabled={el.isCompleted || el.isDeleted} type="checkbox" onChange={(e) => setSelectIds((prev) => [...prev, el.id])} />

                  {el.name}: {el.class}: {el.subject}

                  <button disabled={el?.isCompleted || el.isDeleted} onClick={() => handleTask("edit", el)}>Edit</button>
                  <button disabled={el?.isCompleted || el.isDeleted} onClick={() => handleTask("complete", el)}>{el.isCompleted ? "Completed" : "Complete"}</button>
                  <button disabled={el.isCompleted || el.isDeleted} onClick={() => handleTask("delete", el)}>{el.isDeleted ? "Deleted" : "Delete"}</button>
                </div>

              </div>
            )
          })
        }

      </div>


    </div>
  )
}

export default TodoList