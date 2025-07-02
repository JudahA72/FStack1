import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface QuickActionsProps {
  onBookClass: () => void
  onUpdateProfile: () => void
  onManagePayment: () => void
  onCheckGymCapacity: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onBookClass,
  onUpdateProfile,
  onManagePayment,
  onCheckGymCapacity
}) => {
  const actions = [
    {
      title: 'Book a Class',
      description: 'Reserve your spot in upcoming classes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      action: onBookClass,
      color: 'text-blue-600 bg-blue-100',
      buttonText: 'Browse Classes'
    },
    {
      title: 'Update Profile',
      description: 'Manage your personal information',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      action: onUpdateProfile,
      color: 'text-green-600 bg-green-100',
      buttonText: 'Edit Profile'
    },
    {
      title: 'Manage Payment',
      description: 'Update payment method and billing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      action: onManagePayment,
      color: 'text-purple-600 bg-purple-100',
      buttonText: 'Manage'
    },
    {
      title: 'Check Gym Capacity',
      description: 'See real-time gym availability',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      action: onCheckGymCapacity,
      color: 'text-orange-600 bg-orange-100',
      buttonText: 'Check Now'
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 p-3 rounded-lg ${action.color}`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {action.description}
                </p>
                <Button
                  size="sm"
                  onClick={action.action}
                  className="w-full"
                >
                  {action.buttonText}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QuickActions 