import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTodo, editTodo } from '../redux/slice/todoSlice';

const CreateTodo = ({ editData, editId, onClose }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: editData ? editData.name : "",
        class: editData ? editData.class : "",
        subject: editData ? editData.subject : "",
        timeFrame: editData ? editData.timeFrame : ""
    })

 
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('fulldata', data);

        if (editData) {
            dispatch(editTodo({ id: editId, ...data }));
        } else {
            dispatch(addTodo(data));
        }
        setData({
            name: "",
            class: "",
            subject: "",
            timeFrame: ""
        });
        if (editData) {
            onClose();
        }
    }, [dispatch, editData, editId, data, onClose]);


    return (
        <div>
            {/* <h1 className='text-2xl mb-5'>Todo Form</h1> */}
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder='name' value={data.name} onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))} />
                </label>
                <label>
                    <input type="text" placeholder='class' value={data.class} onChange={(e) => setData((prev) => ({ ...prev, class: e.target.value }))} />
                </label>
                <label>
                    <input type="text" placeholder='subject' value={data.subject} onChange={(e) => setData((prev) => ({ ...prev, subject: e.target.value }))} />
                </label>

                <label>
                    <select
                        value={data.timeFrame}
                        onChange={(e) => setData((prev) => ({ ...prev, timeFrame: e.target.value }))}
                    >
                        <option value="">Select Time Frame</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </label>

                <button className='' type="submit">{editData ? "save" : "Submit"}</button>
            </form>


            <button onClick={() => navigate('/list')}>Go to Lists</button>
        </div>
    )
}

export default CreateTodo