import { useRouter } from "next/router";
import { useState } from "react";

const TaskForm = ({ entry, onSubmit }) => {
  const [data, setData] = useState(entry);
  const router = useRouter();

  const handleCancelButton = () => {
    router.push(`/tasks`);
  };

  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-2xl font-bold text-center text-gray-900">
            {entry?._id ? "Update Task" : "Create Task"}
          </div>

          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900"
              placeholder="Title"
              required
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900"
              placeholder="Description"
              required
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900"
              value={data.dueDate?.substring(0, 10) || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>

          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900"
              value={data.priority || "medium"}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900"
              value={data.status || "pending"}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
