import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "../../../../components/TaskForm";
import Spinner from "../../../../components/Spinner";
import { defaultTaskValues } from "../../../../utils/constants";
import { getTask, updateTask } from "../../../../utils/tasksFunctions";

const EditTask = () => {
  const router = useRouter();
  const [entry, setEntry] = useState(defaultTaskValues);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      getTask(id)
        .then((res) => {
          if (res) setEntry(res);
          else setNotFound(true);
        })
        .catch(() => setNotFound(true))
        .finally(() => setIsLoading(false));
    }
  }, [router.isReady]);

  const onSubmit = async (data) => {
    try {
      await updateTask(entry._id, data);
      router.push(`/tasks/${entry._id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) return <Spinner />;

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Task not found</h2>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => router.push("/tasks")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <TaskForm onSubmit={onSubmit} entry={entry} />
    </div>
  );
};

export default EditTask;
