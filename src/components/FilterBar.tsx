import React from 'react'
import type { FilterType } from '@/types/todo'

interface Props {
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  completedCount: number
  onClearCompleted: () => void
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function FilterBar({ filter, onFilterChange, completedCount, onClearCompleted }: Props): React.JSX.Element {
  return (
    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
      <div className="flex gap-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-violet-600 text-white shadow'
                : 'bg-white text-gray-600 hover:bg-violet-100 border border-violet-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  )
}

export default FilterBar
