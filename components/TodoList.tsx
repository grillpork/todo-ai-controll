'use client';

import { useEffect } from 'react';
import { useTodoStore } from '@/store/todoStore';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (!todos) {
    return <div>Loading todos...</div>;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">
          No tasks found. Add a new one!
        </p>
      )}
    </div>
  );
}
