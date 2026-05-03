const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

client.collectDefaultMetrics();

const tasks = [];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "taskflow-backend" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const task = {
    id: tasks.length + 1,
    title,
    done: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id/done", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.done = true;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TaskFlow backend running on port ${PORT}`);
  });
}

module.exports = app;
