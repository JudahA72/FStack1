// Mock data for dashboard functionality
export interface UserProfile {
  id: string
  email: string
  fullName: string
  age: number
  gender: 'male' | 'female'
  phone: string
  membershipType: 'basic' | 'premium'
  membershipStatus: 'active' | 'inactive' | 'cancelled'
  joinDate: string
  nextBillingDate: string
  profileImage?: string
}

export interface ClassBooking {
  id: string
  classId: string
  className: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  bookedAt: string
  capacity: number
  currentBookings: number
}

export interface PaymentHistory {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  description: string
  method: 'card' | 'bank' | 'cash'
  invoice?: string
}

export interface GymCheckIn {
  id: string
  facility: 'class' | 'downstairs'
  checkInTime: string
  checkOutTime?: string
  duration?: number
}

export interface UserStats {
  totalCheckIns: number
  thisMonthCheckIns: number
  favoriteClass: string
  longestStreak: number
  currentStreak: number
  totalHours: number
}

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: 'user-123',
  email: 'john.doe@example.com',
  fullName: 'John Doe',
  age: 28,
  gender: 'male',
  phone: '(555) 123-4567',
  membershipType: 'premium',
  membershipStatus: 'active',
  joinDate: '2024-01-15',
  nextBillingDate: '2024-08-15',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
}

// Mock class bookings
export const mockBookings: ClassBooking[] = [
  {
    id: 'booking-1',
    classId: 'class-1',
    className: 'Morning HIIT',
    instructor: 'Sarah Johnson',
    date: '2024-07-03',
    startTime: '07:00',
    endTime: '08:00',
    status: 'confirmed',
    bookedAt: '2024-07-01T10:30:00Z',
    capacity: 12,
    currentBookings: 8
  },
  {
    id: 'booking-2',
    classId: 'class-2',
    className: 'Yoga Flow',
    instructor: 'Maria Garcia',
    date: '2024-07-03',
    startTime: '18:00',
    endTime: '19:00',
    status: 'confirmed',
    bookedAt: '2024-07-01T15:20:00Z',
    capacity: 12,
    currentBookings: 12
  },
  {
    id: 'booking-3',
    classId: 'class-3',
    className: 'Strength Training',
    instructor: 'Alex Thompson',
    date: '2024-07-04',
    startTime: '16:00',
    endTime: '17:00',
    status: 'waitlist',
    bookedAt: '2024-07-02T09:15:00Z',
    capacity: 12,
    currentBookings: 12
  }
]

// Mock payment history
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'payment-1',
    date: '2024-07-01',
    amount: 49.99,
    status: 'completed',
    description: 'Premium Membership - July 2024',
    method: 'card',
    invoice: 'INV-2024-001'
  },
  {
    id: 'payment-2',
    date: '2024-06-01',
    amount: 49.99,
    status: 'completed',
    description: 'Premium Membership - June 2024',
    method: 'card',
    invoice: 'INV-2024-002'
  },
  {
    id: 'payment-3',
    date: '2024-05-01',
    amount: 49.99,
    status: 'completed',
    description: 'Premium Membership - May 2024',
    method: 'card',
    invoice: 'INV-2024-003'
  },
  {
    id: 'payment-4',
    date: '2024-04-01',
    amount: 29.99,
    status: 'completed',
    description: 'Basic Membership - April 2024',
    method: 'card',
    invoice: 'INV-2024-004'
  }
]

// Mock check-in history
export const mockCheckIns: GymCheckIn[] = [
  {
    id: 'checkin-1',
    facility: 'class',
    checkInTime: '2024-07-02T07:00:00Z',
    checkOutTime: '2024-07-02T08:00:00Z',
    duration: 60
  },
  {
    id: 'checkin-2',
    facility: 'downstairs',
    checkInTime: '2024-07-01T15:30:00Z',
    checkOutTime: '2024-07-01T17:00:00Z',
    duration: 90
  },
  {
    id: 'checkin-3',
    facility: 'class',
    checkInTime: '2024-06-30T18:00:00Z',
    checkOutTime: '2024-06-30T19:00:00Z',
    duration: 60
  }
]

// Mock user statistics
export const mockUserStats: UserStats = {
  totalCheckIns: 45,
  thisMonthCheckIns: 12,
  favoriteClass: 'Morning HIIT',
  longestStreak: 14,
  currentStreak: 5,
  totalHours: 67.5
}

// Utility functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${period}`
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
    case 'completed':
    case 'active':
      return 'text-green-600 bg-green-50'
    case 'waitlist':
    case 'pending':
      return 'text-yellow-600 bg-yellow-50'
    case 'cancelled':
    case 'failed':
    case 'inactive':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
} 