import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Todos from './Todos';
import CreateTodo from './CreateTodo';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../store/todosSlice';
import axios from 'axios';
import EditTodo from './EditTodo';

const App = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    const { data: todos } = await axios.get('/api/todos');
    dispatch(setTodos(todos))
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <div id='main' >
      <h1>
        <Link to='/'>Todos ({todos.length})</Link>
      </h1>
      <Routes>
        <Route path='/todos/create' element={<CreateTodo />} />
        <Route path='/' element={<Todos />} />
        <Route path="/todos/:id" element={<EditTodo todos={todos}/>} />
      </Routes>
    </div>
  );
}

export default App;
