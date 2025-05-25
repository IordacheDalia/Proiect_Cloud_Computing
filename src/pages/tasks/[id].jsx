import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTask } from "../../../utils/tasksFunctions";
import Spinner from "../../../components/Spinner";

const ViewTask = () => {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      getTask(id)
        .then((res) => {
          if (res) setTask(res);
          else setNotFound(true);
        })
        .catch(() => setNotFound(true))
        .finally(() => setIsLoading(false));
    }
  }, [router.isReady]);

  if (isLoading) return <Spinner />;

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl text-gray-800 mb-4">Task not found</h2>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => router.push("/tasks")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white text-gray-900 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">{task.title}</h2>

        <p className="mb-2">
          <span className="font-semibold">Description:</span> {task.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Due Date:</span>{" "}
          {task.dueDate?.substring(0, 10) || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Priority:</span> {task.priority}
        </p>
        <p className="mb-6">
          <span className="font-semibold">Status:</span> {task.status}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/tasks/${task._id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
          >
            Edit
          </button>
          <button
            onClick={() => router.push("/tasks")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
