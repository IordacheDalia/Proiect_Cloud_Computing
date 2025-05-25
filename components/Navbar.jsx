import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">Task Tracker</h1>
        <div className="space-x-4">
          <Link href="/tasks">Tasks</Link>
          <Link href="/tasks/create">Create</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
