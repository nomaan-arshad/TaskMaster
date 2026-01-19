const pool = require("../db");

const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM Tasks ORDER BY id ASC");
    res.json(tasks.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addTask = async (req, res) => {
  const { title, description, status, due_date } = req.body;
  try {
    const newTask = await pool.query(
      "INSERT INTO Tasks (title, description, status, due_date) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, status || "pending", due_date]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const updatedTask = await pool.query(
      "UPDATE Tasks SET title=$1, description=$2, status=$3, due_date=$4 WHERE id=$5 RETURNING *",
      [title, description, status, due_date, id]
    );
    res.json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Tasks WHERE id=$1", [id]);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
