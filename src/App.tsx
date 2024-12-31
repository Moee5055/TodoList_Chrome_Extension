import { useState, useEffect } from 'react';
import { TodoItem } from './components/TodoItem.tsx';
import { TodoInput } from './components/TodoInput';
import { Todo } from './types/todo.ts';
import { saveTodosToStorage } from './utils/saveTodoToChromeStorage.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add this at the start of your App component
useEffect(() => {
  chrome.storage?.local?.get(['todos'], (result) => {
    if (result.todos) {
      setTodos(result.todos);
    }
  });
}, []);

  const addTodo = (text: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      order: todos.length
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const updateTodoText = (id: string, text: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const moveTodoUp = (index: number) => {
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
      setTodos(newTodos);
      saveTodosToStorage(newTodos);
    }
  };

  const moveTodoDown = (index: number) => {
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
      setTodos(newTodos);
      saveTodosToStorage(newTodos);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

        <TodoInput onAdd={addTodo} />
        <div className='flex justify-between items-center pr-2 mb-4'>
          <h2 className="text-xl font-bold">Today Tasks</h2>
          <button
            className="px-2 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300" onClick={() => {
              setTodos([])
              saveTodosToStorage([])
            }
            }>
            Remove All
          </button>
        </div>
        <div className="space-y-1">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => handleDeleteTodo(todo.id)}
              onToggle={() => toggleTodo(todo.id)}
              onUpdate={(text) => updateTodoText(todo.id, text)}
              onMoveUp={() => moveTodoUp(index)}
              onMoveDown={() => moveTodoDown(index)}
              isFirst={index === 0}
              isLast={index === todos.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
