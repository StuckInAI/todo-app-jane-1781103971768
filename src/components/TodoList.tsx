import React from 'react'
import type { Todo, Priority } from '@/types/todo'
import TodoItem from '@/components/TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onChangePriority: (id: string, priority: Priority) => void
}

function TodoList({ todos, onToggle, onDelete, onEdit, onChangePriority }: Props): React.JSX.Element {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-xl font-medium">Nothing here!</p>
        <p className="text-sm mt-1">Add a task above to get started.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangePriority={onChangePriority}
        />
      ))}
    </ul>
  )
}

export default TodoList
