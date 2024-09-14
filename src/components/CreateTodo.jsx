import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTodo, editTodo } from '../redux/slice/todoSlice';

const CreateTodo = ({editData, editId, onClose}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: editData ? editData.name : "",
        class:editData ? editData.class : "",
        subject: editData ? editData.subject :  ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('fulldata', data)

        // const editData = {editId,...data};

        if (editData) {
            dispatch(editTodo({ id: editId, ...data }));
        } else {
            dispatch(addTodo(data));
        }
        setData({
            name: "",
            class: "",
            subject: ""
        })
        onClose();
    }


  return (
    <div>
    {/* <h1 className='text-2xl mb-5'>Todo Form</h1> */}
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" placeholder='name' value={data.name} onChange={(e) => setData((prev) => ({...prev, name:e.target.value}))} />
            </label>
            <label>
                <input type="text" placeholder='class' value={data.class} onChange={(e) => setData((prev) => ({...prev, class:e.target.value}))} />
            </label>
            <label>
                <input type="text" placeholder='subject' value={data.subject} onChange={(e) => setData((prev) => ({...prev, subject:e.target.value}))} />
            </label>

            <button className='' type="submit">{editData ? "save" : "Submit"}</button>
        </form>


        <button onClick={() => navigate('/list')}>Go to Lists</button>
    </div>
  )
}

export default CreateTodo