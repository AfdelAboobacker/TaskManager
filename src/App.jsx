import { useMemo, useState } from "react";
import {
  ListTodo,
  CircleCheck,
  Clock,
  ChartNoAxesCombined,
  ClipboardList,
} from "lucide-react";

import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import useLocalStorage from "./hooks/useLocalStorage";
import SortTasks from "./components/SortTasks";

function App() {
  const [tasks, setTasks] = useLocalStorage("taskManager-tasks", []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  function handleAddTask() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function handleSaveTask(formData) {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task,
        ),
      );
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        completed: false,
      };

      setTasks((previousTasks) => [newTask, ...previousTasks]);
    }

    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleToggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }
  function handleClearCompleted() {
    const hasCompletedTasks = tasks.some((task) => task.completed);

    if (!hasCompletedTasks) return;

    const confirmed = window.confirm("Delete all completed tasks?");

    if (confirmed) {
      setTasks((previousTasks) =>
        previousTasks.filter((task) => !task.completed),
      );
    }
  }
  function handleDeleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id),
      );
    }
  }

  // Calculate dashboard statistics.
  const statsData = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return {
      total,
      completed,
      pending,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [tasks]);

  // Search tasks and apply the selected status filter.

  const visibleTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Completed" && task.completed) ||
        (activeFilter === "Pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });

    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return [...filtered].sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }

      if (sortBy === "priority") {
        return (
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        );
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return b.id - a.id;
    });
  }, [tasks, searchQuery, activeFilter, sortBy]);

  const stats = [
    {
      title: "Total Tasks",
      value: statsData.total,
      icon: <ListTodo size={22} />,
      color: "bg-indigo-100 text-indigo-600",
      description: "All your tasks",
    },
    {
      title: "Completed",
      value: statsData.completed,
      icon: <CircleCheck size={22} />,
      color: "bg-emerald-100 text-emerald-600",
      description: "Tasks finished",
    },
    {
      title: "Pending",
      value: statsData.pending,
      icon: <Clock size={22} />,
      color: "bg-amber-100 text-amber-600",
      description: "Tasks remaining",
    },
    {
      title: "Completion Rate",
      value: `${statsData.completionRate}%`,
      icon: <ChartNoAxesCombined size={22} />,
      color: "bg-purple-100 text-purple-600",
      description: "Overall progress",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddTask={handleAddTask} />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="mt-2 text-slate-500">
            Manage your tasks and stay productive.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">My Tasks</h2>
            <p className="mt-1 text-sm text-slate-500">
              {statsData.total} {statsData.total === 1 ? "task" : "tasks"} in
              total
            </p>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={handleClearCompleted}
              disabled={!tasks.some((task) => task.completed)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear Completed
            </button>
          </div>

          <div className="mb-5 flex flex-col gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />

              <SortTasks value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {visibleTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <ClipboardList size={42} className="mx-auto text-slate-400" />

              <h3 className="mt-4 font-semibold text-slate-800">
                {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {tasks.length === 0
                  ? "Create your first task to get started."
                  : "Try another search or change the selected filter."}
              </p>

              {tasks.length === 0 && (
                <button
                  onClick={handleAddTask}
                  className="mt-5 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700"
                >
                  Create a Task
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {isFormOpen && (
        <TaskForm
          key={editingTask?.id ?? "new-task"}
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
