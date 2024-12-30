import React, { useState, KeyboardEvent } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Todo } from '../types/todo.ts';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdate: (text: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-800 group transition-colors ${todo.completed ? 'bg-opacity-50' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="w-4 h-4 border-gray-600 rounded bg-transparent checked:bg-blue-500"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-gray-200 focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          onClick={() => !todo.completed && setIsEditing(true)}
          className={`flex-1 text-gray-200 cursor-text ${todo.completed ? 'line-through text-gray-500' : 'hover:text-gray-100'}`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className={`p-1 opacity-0 group-hover:opacity-100 transition-opacity ${isFirst ? 'text-gray-600' : 'text-gray-400 hover:text-gray-200'}`}
          title="Move up"
        >
          <ArrowUp size={16} />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className={`p-1 opacity-0 group-hover:opacity-100 transition-opacity ${isLast ? 'text-gray-600' : 'text-gray-400 hover:text-gray-200'}`}
          title="Move down"
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </div>
  );
};
