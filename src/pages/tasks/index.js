import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTasks, deleteTask, updateTask } from "../../../utils/tasksFunctions";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.status === "completed" ? task.previousStatus || "pending" : "completed";

    const updated = await updateTask(task._id, {
      ...task,
      previousStatus: task.status !== "completed" ? task.status : task.previousStatus,
      status: newStatus,
    });

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: updated.data.status } : t))
    );
  };

  const getPriorityBadge = (priority) => {
    const base = "px-2 py-1 rounded text-xs font-semibold capitalize";
    switch (priority) {
      case "high":
        return base + " bg-red-100 text-red-700";
      case "medium":
        return base + " bg-yellow-100 text-yellow-800";
      case "low":
        return base + " bg-green-100 text-green-700";
      default:
        return base + " bg-gray-200 text-gray-800";
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-semibold capitalize";
    switch (status) {
      case "pending":
        return base + " bg-orange-100 text-orange-700";
      case "in progress":
        return base + " bg-blue-100 text-blue-700";
      case "completed":
        return base + " bg-green-100 text-green-700";
      default:
        return base + " bg-gray-200 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    const matchPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Tasks</h1>
        <button
          onClick={() => router.push("/tasks/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          + Create Task
        </button>
      </div>

      
      <div className="flex gap-4 mb-6">
        <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-400 rounded px-3 py-2 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
        </select>

        <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="border border-gray-400 rounded px-3 py-2 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        </select>

      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border rounded p-4 shadow hover:bg-gray-50 transition relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task._id);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                title="Delete Task"
              >
                🗑️
              </button>

              <div
                className="cursor-pointer"
                onClick={() => router.push(`/tasks/${task._id}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(task);
                      }}
                      className="w-4 h-4 text-green-600"
                    />
                    <h2
                      className={`text-lg font-semibold ${
                        task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </h2>
                  </div>
                  <span className={getStatusBadge(task.status)}>{task.status}</span>
                </div>

                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Due: {task.dueDate?.substring(0, 10) || "N/A"}</span>
                  <span className={getPriorityBadge(task.priority)}>{task.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
