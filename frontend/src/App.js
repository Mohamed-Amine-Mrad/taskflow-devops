import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`${API}/tasks/${id}/done`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completed = tasks.filter((task) => task.done).length;

  return (
    <main className="page">
      <section className="card">
        <div className="header">
          <div>
            <p className="eyebrow">DevOps Mini Project</p>
            <h1>TaskFlow</h1>
            <p className="subtitle">A simple task manager deployed through a complete DevOps pipeline.</p>
          </div>
          <div className="badge">CI/CD Ready</div>
        </div>

        <div className="stats">
          <div>
            <span>{tasks.length}</span>
            <p>Total tasks</p>
          </div>
          <div>
            <span>{completed}</span>
            <p>Completed</p>
          </div>
          <div>
            <span>{tasks.length - completed}</span>
            <p>Pending</p>
          </div>
        </div>

        <div className="form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="taskList">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add your first one.</p>
          ) : (
            tasks.map((task) => (
              <div className={task.done ? "task done" : "task"} key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.done ? "Completed" : "In progress"}</p>
                </div>
                <div className="actions">
                  <button onClick={() => completeTask(task.id)}>Done</button>
                  <button className="danger" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
