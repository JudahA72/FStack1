import React from 'react'
import { Card } from '../ui/Card'
import { 
  mockAdminStats, 
  mockRevenueData, 
  getMembershipStats, 
  getClassStats, 
  getRevenueStats 
} from '../../utils/adminMockData'
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Activity, 
  Clock,
  Target,
  Calendar,
  Award
} from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  )
}

interface RevenueChartProps {
  data: typeof mockRevenueData
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.month} className="flex items-center space-x-3">
            <div className="w-12 text-sm font-medium text-gray-600">
              {item.month}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            <div className="text-sm font-medium text-gray-900 w-20 text-right">
              ${item.revenue.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

interface QuickActionProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, onClick }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  )
}

export const AdminOverview: React.FC = () => {
  const memberStats = getMembershipStats()
  const classStats = getClassStats()
  const revenueStats = getRevenueStats()
  
  const quickActions = [
    {
      title: 'Add New Member',
      description: 'Register a new gym member',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      onClick: () => console.log('Add member')
    },
    {
      title: 'Create Class',
      description: 'Schedule a new fitness class',
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      onClick: () => console.log('Create class')
    },
    {
      title: 'Add Instructor',
      description: 'Onboard new fitness instructor',
      icon: <Award className="w-5 h-5 text-blue-600" />,
      onClick: () => console.log('Add instructor')
    },
    {
      title: 'View Reports',
      description: 'Generate detailed analytics',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      onClick: () => console.log('View reports')
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">Welcome to TopDog Gym Management System</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={memberStats.total}
          change={`${memberStats.retention}% retention`}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend="up"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${revenueStats.currentMonth.toLocaleString()}`}
          change={`+${revenueStats.growth}% from last month`}
          icon={<CreditCard className="w-6 h-6 text-blue-600" />}
          trend="up"
        />
        <StatCard
          title="Active Classes"
          value={classStats.activeClasses}
          change={`${classStats.totalInstructors} instructors`}
          icon={<Activity className="w-6 h-6 text-blue-600" />}
          trend="neutral"
        />
        <StatCard
          title="Peak Hours"
          value={mockAdminStats.peakHours}
          change={`${mockAdminStats.averageCapacity}% avg capacity`}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          trend="neutral"
        />
      </div>

      {/* Revenue Chart and Membership Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={mockRevenueData} />
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Members</span>
              <span className="font-semibold text-green-600">{memberStats.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Premium Members</span>
              <span className="font-semibold text-blue-600">{memberStats.premium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Basic Members</span>
              <span className="font-semibold text-gray-600">{memberStats.basic}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inactive Members</span>
              <span className="font-semibold text-red-600">{memberStats.inactive}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total Revenue</span>
                <span className="font-bold text-gray-900">${revenueStats.totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickAction
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New member registration</p>
              <p className="text-xs text-gray-600">Emily Rodriguez joined with Premium membership</p>
            </div>
            <div className="text-xs text-gray-500">2 hours ago</div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New class scheduled</p>
              <p className="text-xs text-gray-600">Morning HIIT class added for Friday</p>
            </div>
            <div className="text-xs text-gray-500">5 hours ago</div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Payment processed</p>
              <p className="text-xs text-gray-600">$1,247.50 in membership fees collected</p>
            </div>
            <div className="text-xs text-gray-500">1 day ago</div>
          </div>
        </div>
      </Card>
    </div>
  )
} 