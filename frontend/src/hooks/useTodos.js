import { useState, useEffect, useCallback } from "react";
import { todoAPI } from "../api/todoAPI";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | active | completed

  // ─── Fetch all todos ─────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filter === "active") params.completed = false;
      if (filter === "completed") params.completed = true;
      const res = await todoAPI.getAll(params);
      setTodos(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ─── Create ──────────────────────────────────────────────────
  const addTodo = async (data) => {
    try {
      const res = await todoAPI.create(data);
      setTodos((prev) => [res.data.data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to create" };
    }
  };

  // ─── Toggle ──────────────────────────────────────────────────
  const toggleTodo = async (id) => {
    try {
      const res = await todoAPI.toggle(id);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  // ─── Update ──────────────────────────────────────────────────
  const updateTodo = async (id, data) => {
    try {
      const res = await todoAPI.update(id, data);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update" };
    }
  };

  // ─── Delete ──────────────────────────────────────────────────
  const deleteTodo = async (id) => {
    try {
      await todoAPI.delete(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  return {
    todos,
    loading,
    error,
    filter,
    setFilter,
    stats,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
};
