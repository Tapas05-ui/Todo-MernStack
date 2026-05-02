import { useState } from "react";

const priorityDot = {
  low: "bg-emerald-400",
  medium: "bg-amber-400",
  high: "bg-rose-400",
};

const priorityLabel = {
  low: "text-emerald-400",
  medium: "text-amber-400",
  high: "text-rose-400",
};

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    await onUpdate(todo._id, { title: editTitle.trim(), description: editDesc.trim() });
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(todo._id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === "Escape") { setEditing(false); setEditTitle(todo.title); setEditDesc(todo.description); }
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div
      className={`card p-4 transition-all duration-300 animate-slide-in group ${
        deleting ? "opacity-0 scale-95" : ""
      } ${todo.completed ? "opacity-60" : ""}`}
    >
      {editing ? (
        // ─── Edit Mode ───────────────────────────────────────
        <div className="space-y-3">
          <input
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-base text-sm"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-base text-sm resize-none h-16"
            placeholder="Description..."
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary text-sm py-1.5 px-4">
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setEditTitle(todo.title); setEditDesc(todo.description); }}
              className="btn-ghost text-sm py-1.5 px-4"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // ─── View Mode ───────────────────────────────────────
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo._id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              todo.completed
                ? "bg-amber-500 border-amber-500"
                : "border-stone-600 hover:border-amber-500"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-medium text-sm leading-snug ${
                  todo.completed ? "line-through text-stone-500" : "text-stone-100"
                }`}
              >
                {todo.title}
              </span>
              {/* Priority badge */}
              <span className={`flex items-center gap-1 text-xs font-semibold capitalize ${priorityLabel[todo.priority]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[todo.priority]}`} />
                {todo.priority}
              </span>
            </div>
            {todo.description && (
              <p className="text-stone-500 text-xs mt-1 leading-relaxed">{todo.description}</p>
            )}
            <p className="text-stone-600 text-xs mt-1.5">{timeAgo(todo.createdAt)}</p>
          </div>

          {/* Action buttons — visible on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-500 hover:text-amber-400 transition-colors"
              title="Edit"
            >
              <PencilIcon />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-500 hover:text-rose-400 transition-colors"
              title="Delete"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const PencilIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" />
  </svg>
);
