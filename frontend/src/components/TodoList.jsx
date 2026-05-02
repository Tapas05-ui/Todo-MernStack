import TodoItem from "./TodoItem";

export default function TodoList({ todos, loading, error, onToggle, onUpdate, onDelete }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="flex gap-3 items-center">
              <div className="w-5 h-5 rounded-full bg-stone-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-stone-800 rounded-full w-3/4" />
                <div className="h-2 bg-stone-800 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 text-center border-rose-900/50">
        <p className="text-rose-400 text-sm">{error}</p>
        <p className="text-stone-500 text-xs mt-1">Check your backend connection</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="card p-10 text-center animate-fade-in">
        <div className="text-5xl mb-3">✦</div>
        <p className="text-stone-400 font-medium">No tasks here</p>
        <p className="text-stone-600 text-sm mt-1">Add one above to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
