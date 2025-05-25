import { useRouter } from "next/router";
import TaskForm from "../../../components/TaskForm";
import { createTask } from "../../../utils/tasksFunctions";
import { defaultTaskValues } from "../../../utils/constants";

const CreateTaskPage = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await createTask(data);
      console.log("API response:", response);
      const task = response.data;

      if (task && task._id) {
        router.push(`/tasks/${task._id}`);
      } else {
        console.error("Task creation failed or no _id returned:", response);
      }
    } catch (error) {
      console.error("Error during task creation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TaskForm onSubmit={onSubmit} entry={defaultTaskValues} />
    </div>
  );
};

export default CreateTaskPage;
