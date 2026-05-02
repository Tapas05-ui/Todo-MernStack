import { useState } from "react";

const PRIORITIES = ["low", "medium", "high"];

const priorityColors = {
  low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  high: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");

    setLoading(true);
    setError("");
    const result = await onAdd({ title: title.trim(), description: description.trim(), priority });
    setLoading(false);

    if (result.success) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4 animate-fade-in">
      <h2 className="font-display text-xl text-amber-400">Add a new task</h2>

      {error && (
        <p className="text-rose-400 text-sm bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-base"
        maxLength={200}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-base resize-none h-20"
        maxLength={1000}
      />

      {/* Priority selector */}
      <div className="flex gap-2 items-center">
        <span className="text-stone-400 text-sm font-medium">Priority:</span>
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border capitalize transition-all duration-150 ${
                priority === p
                  ? priorityColors[p]
                  : "text-stone-500 border-stone-700 bg-transparent hover:border-stone-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner /> Adding...
          </span>
        ) : (
          "+ Add Task"
        )}
      </button>
    </form>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
