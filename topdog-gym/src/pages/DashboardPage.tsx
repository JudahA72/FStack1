import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  mockUserProfile,
  mockBookings,
  mockPaymentHistory,
  mockUserStats,
  UserProfile,
  ClassBooking,
  PaymentHistory as PaymentHistoryType,
  UserStats
} from '../utils/mockData'

// Dashboard Components
import ProfileHeader from '../components/dashboard/ProfileHeader'
import StatsOverview from '../components/dashboard/StatsOverview'
import CurrentBookings from '../components/dashboard/CurrentBookings'
import PaymentHistory from '../components/dashboard/PaymentHistory'
import QuickActions from '../components/dashboard/QuickActions'

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  
  // State for dashboard data
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [bookings, setBookings] = useState<ClassBooking[]>(mockBookings)
  const [payments, setPayments] = useState<PaymentHistoryType[]>(mockPaymentHistory)
  const [stats, setStats] = useState<UserStats>(mockUserStats)
  const [dashboardLoading, setDashboardLoading] = useState(true)

  // Initialize dashboard data
  useEffect(() => {
    if (user) {
      // Update profile with user data
      setProfile(prev => ({
        ...prev,
        email: user.email || prev.email,
        fullName: user.user_metadata?.full_name || prev.fullName
      }))
    }
    
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardLoading(false)
    }, 500)
  }, [user])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  // Event handlers
  const handleEditProfile = () => {
    alert('Edit Profile feature coming soon!')
    // navigate('/profile/edit')
  }

  const handleCancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find(b => b.id === bookingId)
    if (bookingToCancel && window.confirm(`Are you sure you want to cancel "${bookingToCancel.className}"?`)) {
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ))
      alert('Booking cancelled successfully!')
    }
  }

  const handleViewAllBookings = () => {
    alert('View All Bookings feature coming soon!')
    // navigate('/bookings')
  }

  const handleViewAllPayments = () => {
    alert('View All Payments feature coming soon!')
    // navigate('/payments')
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading invoice ${invoiceId}...`)
    // Implement invoice download logic
  }

  const handleBookClass = () => {
    navigate('/classes')
  }

  const handleUpdateProfile = () => {
    handleEditProfile()
  }

  const handleManagePayment = () => {
    alert('Payment management feature coming soon!')
    // navigate('/payment-settings')
  }

  const handleCheckGymCapacity = () => {
    alert('Real-time gym capacity: Downstairs gym 8/16 members currently checked in')
    // Implement real-time capacity check
  }

  // Loading state
  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader 
          profile={profile}
          onEditProfile={handleEditProfile}
        />

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings and Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            <CurrentBookings
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onViewAllBookings={handleViewAllBookings}
            />

            <QuickActions
              onBookClass={handleBookClass}
              onUpdateProfile={handleUpdateProfile}
              onManagePayment={handleManagePayment}
              onCheckGymCapacity={handleCheckGymCapacity}
            />
          </div>

          {/* Right Column - Payment History */}
          <div className="lg:col-span-1">
            <PaymentHistory
              payments={payments}
              onViewAllPayments={handleViewAllPayments}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </div>
        </div>

        {/* Additional Features Coming Soon */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">More Features Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're working on additional dashboard features including real-time notifications, 
              workout tracking, and social features.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">Goal Tracking</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Social Feed</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Progress Photos</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Nutrition Log</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 