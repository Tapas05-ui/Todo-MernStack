import axios from "axios";

// This reads from your .env file (VITE_ prefix required for Vite)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const todoAPI = {
  getAll: (params) => API.get("/todos", { params }),
  getById: (id) => API.get(`/todos/${id}`),
  create: (data) => API.post("/todos", data),
  update: (id, data) => API.put(`/todos/${id}`, data),
  toggle: (id) => API.patch(`/todos/${id}/toggle`),
  delete: (id) => API.delete(`/todos/${id}`),
};
