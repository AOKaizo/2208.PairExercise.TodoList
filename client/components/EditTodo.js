import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todosSlice";
import axios from "axios";

const EditTodo = () => {
  const todos = useSelector((state) => state.todos.todos);
  const { id } = useParams();
  const todo = todos.find((element) => element.id == id);
  const [taskName, setTaskName] = useState(todo?.taskName ?? "Task not found.");
  const [assignee, setAssignee] = useState(
    todo?.assignee ?? "Assignee not found."
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: created } = await axios.put(`/api/todos/${id}`, {
      taskName,
      assignee,
    });
    dispatch(updateTodo(created));
    navigate("/");
  };

  const handleTaskChange = (e) => setTaskName(e.target.value);
  const handleAssigneeChange = (e) => setAssignee(e.target.value);

  const handleDelete = async () => {
    const { data: deleted } = await axios.delete(`/api/todos/${id}`);
    dispatch(deleteTodo(deleted));
    navigate("/");
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    placeContent: "center",
  };
  const titleStyle = {
    placeSelf: "center",
  };
  const buttonStyle = {
    placeSelf: "center",
    width: "30vw",
    height: "auto",
  };

  return (
    <div style={divStyle}>
      <button style={buttonStyle} onClick={handleDelete}>
        Delete: Task {id}
      </button>
      <form id="todo-form" onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Edit</h2>
        <label htmlFor="taskName">Task Name:</label>
        <input onChange={handleTaskChange} name="taskName" value={taskName} />
        <label htmlFor="assignee">Assign To:</label>
        <input
          onChange={handleAssigneeChange}
          name="assignee"
          value={assignee}
        />
        <button type="submit">Submit</button>
        <Link style={titleStyle} to="/">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditTodo;
