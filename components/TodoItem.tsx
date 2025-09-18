'use client';

import { useState } from 'react';
import { useTodoStore, Todo } from '@/store/todoStore';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const { updateTodo, deleteTodo } = useTodoStore();
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggle = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    updateTodo(todo.id, { completed: newCompletedState });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={todo.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 50, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between p-4 text-black bg-white rounded-lg shadow mb-2"
      >
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggle}
            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 transition duration-300"
          />
          <div>
            <h3
              className={`text-lg font-semibold transition-all duration-300 ${
                isCompleted ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </h3>
            <p
              className={`text-sm text-gray-500 transition-all duration-300 ${
                isCompleted ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.description}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200 transition-colors duration-300"
        >
          Delete
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
