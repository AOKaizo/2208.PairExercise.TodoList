import React, { useState } from 'react';
import { createTodo } from '../store/todosSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const dispatch = useDispatch("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: created } = await axios.post('/api/todos', {
      taskName,
      assignee
    });
    dispatch(createTodo(created))
    navigate('/');
  }

  const handleTaskChange = (e) => setTaskName(e.target.value);
  const handleAssigneeChange = (e) => setAssignee(e.target.value)

  return (
    <>
    <Link to='/todos/create'>Create A New Todo</Link>
    <form id='todo-form' onSubmit={handleSubmit}>
      <label htmlFor='taskName'>Task Name:</label>
      <input onChange={handleTaskChange} name='taskName' value={taskName} />

      <label htmlFor='assignee'>Assign To:</label>
      <input onChange={handleAssigneeChange} name='assignee' value={assignee} />

      <button type='submit'>Submit</button>
      <Link to='/'>Cancel</Link>
    </form>
    </>
  );
};

export default CreateTodo;