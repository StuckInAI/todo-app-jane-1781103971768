import React from 'react'
import { useTodos } from '@/hooks/useTodos'
import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'
import FilterBar from '@/components/FilterBar'
import StatsBar from '@/components/StatsBar'

function TodoPage(): React.JSX.Element {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    changePriority,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-violet-700 tracking-tight drop-shadow">✅ Todo App</h1>
        <p className="text-gray-500 mt-2 text-lg">Stay organised, one task at a time.</p>
      </div>

      {/* Add form */}
      <AddTodoForm onAdd={addTodo} />

      {/* Stats */}
      <StatsBar activeCount={activeCount} completedCount={completedCount} />

      {/* Filter */}
      <FilterBar filter={filter} onFilterChange={setFilter} completedCount={completedCount} onClearCompleted={clearCompleted} />

      {/* List */}
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onChangePriority={changePriority}
      />
    </div>
  )
}

export default TodoPage
