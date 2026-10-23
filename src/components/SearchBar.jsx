
import { Search, X } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search your tasks..."
        aria-label="Search tasks"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
