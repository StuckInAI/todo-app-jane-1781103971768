import React, { useState, useRef, useEffect } from 'react'
import type { Todo, Priority } from '@/types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onChangePriority: (id: string, priority: Priority) => void
}

const priorityConfig: Record<Priority, { label: string; classes: string; dot: string }> = {
  low: { label: 'Low', classes: 'bg-green-50 border-green-200', dot: 'bg-green-400' },
  medium: { label: 'Medium', classes: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-400' },
  high: { label: 'High', classes: 'bg-red-50 border-red-200', dot: 'bg-red-400' },
}

function TodoItem({ todo, onToggle, onDelete, onEdit, onChangePriority }: Props): React.JSX.Element {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  function handleEditSubmit() {
    if (editText.trim()) {
      onEdit(todo.id, editText)
    } else {
      setEditText(todo.text)
    }
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleEditSubmit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  const cfg = priorityConfig[todo.priority]

  return (
    <li
      className={`flex items-center gap-3 p-4 rounded-2xl border shadow-sm transition-all ${
        todo.completed ? 'bg-gray-50 border-gray-200 opacity-70' : cfg.classes
      }`}
    >
      {/* Priority dot */}
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${todo.completed ? 'bg-gray-300' : cfg.dot}`} />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-gray-400 hover:border-violet-400'
        }`}
        aria-label="Toggle todo"
      >
        {todo.completed && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text or edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800"
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setEditing(true)}
            className={`block truncate text-base ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
            title={todo.completed ? undefined : 'Double-click to edit'}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority selector */}
      {!editing && !todo.completed && (
        <select
          value={todo.priority}
          onChange={e => onChangePriority(todo.id, e.target.value as Priority)}
          className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-violet-300 cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
      )}

      {/* Edit button */}
      {!todo.completed && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-100 transition-colors"
          aria-label="Edit todo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m-6 6l-1.5 4.5L12 16l-3-3z" />
          </svg>
        </button>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Delete todo"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  )
}

export default TodoItem
