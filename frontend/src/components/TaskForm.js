import React, { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [title, setTitle] = useState("");

  const submitTask = () => {
    axios.post("http://localhost:5000/api/tasks", { title })
      .then(res => {
        alert("Task added!");
        setTitle("");
      });
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={submitTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;
