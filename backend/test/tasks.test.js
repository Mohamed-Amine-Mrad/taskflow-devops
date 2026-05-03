const request = require("supertest");
const app = require("../src/index");

test("GET /health returns OK", async () => {
  const res = await request(app).get("/health");

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("OK");
});

test("POST /tasks creates a task", async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ title: "Prepare DevOps project" });

  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe("Prepare DevOps project");
  expect(res.body.done).toBe(false);
});

test("GET /tasks returns tasks", async () => {
  const res = await request(app).get("/tasks");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("GET /metrics exposes Prometheus metrics", async () => {
  const res = await request(app).get("/metrics");

  expect(res.statusCode).toBe(200);
  expect(res.text).toContain("process_cpu_user_seconds_total");
});
