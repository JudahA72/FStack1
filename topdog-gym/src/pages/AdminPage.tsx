import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AdminDashboard } from '../components/admin/AdminDashboard'

export const AdminPage: React.FC = () => {
  const { user, isAdmin, signOut } = useAuth()

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">
                You don't have permission to access the admin dashboard.
              </p>
              <div className="text-sm text-gray-500">
                <p>Admin access is required for this section.</p>
                <p className="mt-2">
                  Demo admin accounts: 
                  <br />
                  <code className="bg-gray-100 px-1 rounded">admin@topdoggym.com</code>
                  <br />
                  <code className="bg-gray-100 px-1 rounded">manager@topdoggym.com</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={signOut} />
} 