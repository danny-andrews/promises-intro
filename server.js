import express from "express";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: "postgres://localhost/gradebook",
});

const server = express();

server.use(express.json());

server.get("/students", async (_, res, next) => {
  try {
    const result = await pool.query("SLECT * FROM student");
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});

server.get("/students/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("SELECT * FROM student WHERE id = $1", [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

server.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM student WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

server.post("/students", (req, res) => {
  const { email, name } = req.body;

  pool
    .query("INSERT INTO student (email, name) VALUES ($1, $2) RETURNING *", [
      email,
      name,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

server.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  pool
    .query(
      "UPDATE student SET email = COALESCE($1, email), name = COALESCE($2, name) WHERE id = $3 RETURNING *",
      [email, name, id]
    )
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

server.get("/projects", (_, res, next) => {
  pool
    .query("SELECT * FROM project")
    .then((result) => {
      res.send(result.rows);
    })
    .catch(next);
});

server.use((err, req, res, next) => {
  console.error(err.message);
  res.sendStatus(500);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
