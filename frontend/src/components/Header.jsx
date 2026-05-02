export default function Header({ stats }) {
  const percent =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="space-y-4 text-center">
      {/* Title */}
      <div>
        <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">
          Your workspace
        </p>
        <h1 className="font-display text-4xl text-stone-100 mt-1">
          Todo<span className="text-amber-400">Flow</span>
        </h1>
      </div>

      {/* Progress bar */}
      {/* {stats.total > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Progress</span>
            <span className="text-amber-400 font-semibold">{percent}%</span>
          </div>
          <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-stone-600 text-xs">
            {stats.completed} of {stats.total} tasks completed
          </p>
        </div>
      )} */}
    </div>
  );
}
