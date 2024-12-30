import { useState } from 'react';
import { TodoItem } from './components/TodoItem.tsx';
import { TodoInput } from './components/TodoInput';
import { Todo } from './types/todo.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      order: todos.length
    }]);
  };

  const handleDeleteTodo = (id: string) => {
      const updateTodo = todos.filter(todo => todo.id != id)
      setTodos(updateTodo)
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodoText = (id: string, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const moveTodoUp = (index: number) => {
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  const moveTodoDown = (index: number) => {
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

        <TodoInput onAdd={addTodo} />

        <h2 className="text-xl font-bold mb-4">Today Tasks</h2>
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
