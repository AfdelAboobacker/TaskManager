
import { ArrowDownUp } from "lucide-react";

function SortTasks({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowDownUp
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Sort tasks"
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-indigo-500 sm:w-auto"
      >
        <option value="newest">Newest first</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority: High to Low</option>
        <option value="title">Title: A to Z</option>
      </select>
    </div>
  );
}

export default SortTasks;
