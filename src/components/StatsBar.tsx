import React from 'react'

interface Props {
  activeCount: number
  completedCount: number
}

function StatsBar({ activeCount, completedCount }: Props): React.JSX.Element {
  const total = activeCount + completedCount
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{completedCount} of {total} completed</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-violet-100 rounded-full h-2.5">
        <div
          className="bg-violet-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default StatsBar
