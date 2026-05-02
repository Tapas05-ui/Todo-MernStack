const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todoController");

// GET    /api/todos          → get all todos (supports ?completed=true&priority=high)
// POST   /api/todos          → create a new todo
router.route("/").get(getAllTodos).post(createTodo);

// GET    /api/todos/:id      → get single todo
// PUT    /api/todos/:id      → update todo fully
// DELETE /api/todos/:id      → delete todo
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);

// PATCH  /api/todos/:id/toggle  → toggle completed status
router.patch("/:id/toggle", toggleTodo);

module.exports = router;
