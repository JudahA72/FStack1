import React, { useState } from 'react'
import { AdminOverview } from './AdminOverview'
import { MemberManagement } from './MemberManagement'
import { ClassManagement } from './ClassManagement'
import { InstructorManagement } from './InstructorManagement'
import { FinancialOverview } from './FinancialOverview'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Award,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

type AdminTab = 'overview' | 'members' | 'classes' | 'instructors' | 'financial' | 'settings'

interface NavigationItem {
  id: AdminTab
  label: string
  icon: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    id: 'members',
    label: 'Members',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'classes',
    label: 'Classes',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: 'instructors',
    label: 'Instructors',
    icon: <Award className="w-5 h-5" />
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />
  }
]

interface SidebarProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
  onLogout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isMobileMenuOpen, 
  onMobileMenuToggle,
  onLogout
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileMenuToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">TopDog Admin</span>
          </div>
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

interface HeaderProps {
  activeTab: AdminTab
  onMobileMenuToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ activeTab, onMobileMenuToggle }) => {
  const activeItem = navigationItems.find(item => item.id === activeTab)
  
  return (
    <header className="bg-white shadow-sm border-b lg:pl-64">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            {activeItem?.icon}
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              {activeItem?.label}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Admin Dashboard
          </div>
        </div>
      </div>
    </header>
  )
}

const SettingsPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage gym settings and configurations</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gym Name
            </label>
            <input
              type="text"
              defaultValue="TopDog Gym"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              defaultValue="123 Fitness Street, Tallahassee, FL 32301"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="(850) 555-0123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Basic Membership Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                defaultValue="29.99"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Premium Membership Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                defaultValue="49.99"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Class Duration (minutes)
            </label>
            <input
              type="number"
              defaultValue="60"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Class Capacity
            </label>
            <input
              type="number"
              defaultValue="12"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface AdminDashboardProps {
  onLogout: () => void
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false) // Close mobile menu when tab changes
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />
      case 'members':
        return <MemberManagement />
      case 'classes':
        return <ClassManagement />
      case 'instructors':
        return <InstructorManagement />
      case 'financial':
        return <FinancialOverview />
      case 'settings':
        return <SettingsPanel />
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        onLogout={onLogout}
      />
      
      <div className="lg:pl-64">
        <Header
          activeTab={activeTab}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        
        <main className="p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  )
} 