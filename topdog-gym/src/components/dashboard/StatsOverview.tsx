import React from 'react'
import { UserStats } from '../../utils/mockData'
import Card from '../ui/Card'

interface StatsOverviewProps {
  stats: UserStats
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Check-ins',
      value: stats.totalCheckIns,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'This Month',
      value: stats.thisMonthCheckIns,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      color: 'text-orange-600 bg-orange-100'
    },
    {
      label: 'Total Hours',
      value: `${stats.totalHours}h`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-purple-600 bg-purple-100'
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <Card key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.color} mb-3`}>
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600">
              {item.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Favorite Class</h3>
              <p className="text-lg font-semibold text-blue-600">{stats.favoriteClass}</p>
            </div>
            <div className="text-blue-600 bg-blue-100 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Longest Streak</h3>
              <p className="text-lg font-semibold text-green-600">{stats.longestStreak} days</p>
            </div>
            <div className="text-green-600 bg-green-100 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StatsOverview 