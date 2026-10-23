
const filters = ["All", "Pending", "Completed"];

function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)}
          aria-pressed={activeFilter === filter}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeFilter === filter
              ? "bg-indigo-600 text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
