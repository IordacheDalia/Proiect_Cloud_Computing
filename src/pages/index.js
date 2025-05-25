import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Tracker</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        This application helps you manage tasks with ease. You can track statuses, set due dates, prioritize tasks, and filter by what matters most.
      </p>
      <button
        onClick={() => router.push("/tasks")}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
      >
        Go to Tasks
      </button>
    </div>
  );
}
