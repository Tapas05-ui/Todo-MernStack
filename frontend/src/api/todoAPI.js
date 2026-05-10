import axios from "axios";

// This reads from your .env file (VITE_ prefix required for Vite)
const API = axios.create({
  baseURL: "https://todo-mernstack-bcon.onrender.com" || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const todoAPI = {
  getAll: (params) => API.get("/api/todos", { params }),
  getById: (id) => API.get(`/api/todos/${id}`),
  create: (data) => API.post("/api/todos", data),
  update: (id, data) => API.put(`/api/todos/${id}`, data),
  toggle: (id) => API.patch(`/api/todos/${id}/toggle`),
  delete: (id) => API.delete(`/api/todos/${id}`),
};
