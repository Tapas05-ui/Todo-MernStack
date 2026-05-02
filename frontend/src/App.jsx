import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const {
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-stone-950 py-12 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative max-w-xl mx-auto space-y-6">
        <Header stats={stats} />
        <TodoForm onAdd={addTodo} />
        <FilterBar current={filter} onChange={setFilter} stats={stats} />
        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        {/* Footer */}
        {/* <p className="text-center text-stone-700 text-xs pb-4">
          MERN Stack · React + Express + MongoDB
        </p> */}
      </div>
    </div>
  );
}
