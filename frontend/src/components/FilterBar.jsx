const filters = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export default function FilterBar({ current, onChange, stats }) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex gap-1 bg-stone-900 rounded-xl p-1 border border-stone-800">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              current === key
                ? "bg-amber-500 text-stone-950"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 text-sm text-stone-500">
        <span>
          <span className="text-stone-200 font-semibold">{stats.active}</span> remaining
        </span>
        <span>
          <span className="text-stone-200 font-semibold">{stats.completed}</span> done
        </span>
      </div>
    </div>
  );
}
