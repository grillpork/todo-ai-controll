import { create } from "zustand";

// Define Todo interface
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Store state interface
interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

// Create Zustand store
export const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  // Fetch all todos from backend
  fetchTodos: async () => {
    const response = await fetch("http://localhost:8000/todos/");
    const data = await response.json();

    // Map object entries to array and include 'id'
    const todosArray = Object.entries(data).map(([id, todo]) => ({
      id: Number(id),
      ...(todo as Omit<Todo, "id">),
    }));

    set({ todos: todosArray });
  },

  // Add a new todo
  addTodo: async (title, description) => {
    const response = await fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const newTodo = await response.json();
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },

  // Update an existing todo
  updateTodo: async (id, updatedTodo) => {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    const updatedData = await response.json();
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? updatedData : todo)),
    }));
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" });
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
}));
