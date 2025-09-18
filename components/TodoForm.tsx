'use client';

import { useState, FormEvent } from 'react';
import { useTodoStore } from '@/store/todoStore';

export default function TodoForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchTodos } = useTodoStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/ai-prompt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (response.ok) {
        await fetchTodos();
        setPrompt('');
      } else {
        console.error('AI agent failed:', await response.text());
      }
    } catch (error) {
      console.error('Failed to submit prompt to AI agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-inner">
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-gray-700 font-semibold mb-2">
          Tell AI what you need:
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="e.g. Create a 10-step plan for a trip to Japan."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {isLoading ? 'Thinking...' : 'Generate Tasks'}
      </button>
    </form>
  );
}
