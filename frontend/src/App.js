import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Backend is not reachable. Start backend port-forward to enable tasks.");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${API}/tasks`, { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Cannot add task because backend is not reachable.");
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(`${API}/tasks/${id}/done`);
      fetchTasks();
    } catch (err) {
      setError("Cannot update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Cannot delete task.");
    }
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
            <p className="subtitle">A task manager deployed with Docker, Kubernetes, GitHub Actions and ArgoCD.</p>
          </div>
          <div className="badge">CI/CD Ready</div>
        </div>

        {error && <p className="empty">{error}</p>}

        <div className="stats">
          <div><span>{tasks.length}</span><p>Total tasks</p></div>
          <div><span>{completed}</span><p>Completed</p></div>
          <div><span>{tasks.length - completed}</span><p>Pending</p></div>
        </div>

        <div className="form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="taskList">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet.</p>
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
