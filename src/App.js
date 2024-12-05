import React, { useState, useEffect } from "react";
import "./App.css";

// Importing a calendar library for task visualization
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName, dueDate) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      dueDate,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const sortTasksByDate = () => {
    setTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all' filter
  });

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTaskForm onAdd={addTask} />
      <div className="filters">
        <button onClick={() => setFilter("all")}>All Tasks</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={sortTasksByDate}>Sort by Due Date</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTaskCompletion}
        onDelete={deleteTask}
      />
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) =>
          tasks.some((task) => task.dueDate === date.toISOString().split("T")[0]) ? (
            <span className="calendar-task-indicator">*</span>
          ) : null
        }
      />
    </div>
  );
}

function AddTaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) return alert("Both fields are required!");
    onAdd(taskName, dueDate);
    setTaskName("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          <span onClick={() => onToggle(task.id)} style={{ cursor: "pointer" }}>
            {task.name} (Due: {task.dueDate})
          </span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
