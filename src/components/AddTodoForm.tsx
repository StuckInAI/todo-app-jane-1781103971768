import React, { useState } from 'react'
import type { Priority } from '@/types/todo'

interface Props {
  onAdd: (text: string, priority: Priority) => void
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-red-600' },
]

function AddTodoForm({ onAdd }: Props): React.JSX.Element {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAdd(text, priority)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task…"
        className="flex-1 px-4 py-3 rounded-xl border border-violet-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800 placeholder-gray-400"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
        className="px-3 py-3 rounded-xl border border-violet-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-700 cursor-pointer"
      >
        {priorities.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white font-semibold shadow transition-colors"
      >
        Add
      </button>
    </form>
  )
}

export default AddTodoForm
