import { Check, Circle, Pencil, Trash2, CalendarDays } from "lucide-react";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priorityStyles = {
    Low: "bg-emerald-50 text-emerald-700",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-red-50 text-red-700",
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed ? "Mark task pending" : "Mark task completed"
          }
          className={`mt-0.5 rounded-full ${
            task.completed ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {task.completed ? <Check size={22} /> : <Circle size={22} />}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`break-words font-semibold ${
              task.completed ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-500">
              {task.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                priorityStyles[task.priority] || priorityStyles.Medium
              }`}
            >
              {task.priority} Priority
            </span>

            {task.dueDate && (
              <span className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
                <CalendarDays size={14} />
                {task.dueDate}

                {!task.completed &&
                  task.dueDate < new Date().toLocaleDateString("en-CA") && (
                    <span className="ml-1 rounded-full bg-red-50 px-2 py-1 font-medium text-red-600">
                      Overdue
                    </span>
                  )}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
