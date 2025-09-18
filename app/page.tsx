import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        My AI-Powered To-do List
      </h1>
      <div className="grid gap-8">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}
