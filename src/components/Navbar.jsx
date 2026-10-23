
import { CheckSquare, Plus } from "lucide-react";

function Navbar({ onAddTask }) {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <CheckSquare size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              TaskManager
            </h1>
            <p className="text-xs text-slate-500">
              Organize your day
            </p>
          </div>
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
