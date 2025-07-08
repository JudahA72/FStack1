import { UserProfile, ClassBooking, PaymentHistory, GymCheckIn, UserStats } from './mockData'

// Admin-specific interfaces
export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'instructor' | 'member'
  isAdmin: boolean
}

export interface Instructor {
  id: string
  name: string
  email: string
  specialties: string[]
  bio: string
  profileImage?: string
  experience: number
  rating: number
  totalClasses: number
  joinDate: string
  status: 'active' | 'inactive'
}

export interface GymClass {
  id: string
  name: string
  description: string
  instructorId: string
  instructorName: string
  duration: number
  capacity: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  equipment: string[]
  tags: string[]
  price: number
  isActive: boolean
  schedule: ClassSchedule[]
}

export interface ClassSchedule {
  id: string
  classId: string
  dayOfWeek: string
  startTime: string
  endTime: string
  isRecurring: boolean
  date?: string
}

export interface AdminStats {
  totalMembers: number
  activeMemberships: number
  totalRevenue: number
  monthlyRevenue: number
  totalClasses: number
  totalInstructors: number
  averageCapacity: number
  memberRetentionRate: number
  popularClassType: string
  peakHours: string
}

export interface RevenueData {
  month: string
  revenue: number
  members: number
  classes: number
}

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    email: 'admin@topdoggym.com',
    role: 'admin',
    isAdmin: true
  },
  {
    id: 'admin-2',
    email: 'manager@topdoggym.com',
    role: 'admin',
    isAdmin: true
  }
]

// Mock all members data
export const mockAllMembers: UserProfile[] = [
  {
    id: 'member-1',
    email: 'sarah.johnson@email.com',
    fullName: 'Sarah Johnson',
    age: 28,
    gender: 'female',
    phone: '(555) 123-4567',
    membershipType: 'premium',
    membershipStatus: 'active',
    joinDate: '2024-01-15',
    nextBillingDate: '2024-08-15',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-2',
    email: 'mike.chen@email.com',
    fullName: 'Mike Chen',
    age: 32,
    gender: 'male',
    phone: '(555) 234-5678',
    membershipType: 'basic',
    membershipStatus: 'active',
    joinDate: '2024-02-20',
    nextBillingDate: '2024-08-20',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-3',
    email: 'emily.rodriguez@email.com',
    fullName: 'Emily Rodriguez',
    age: 25,
    gender: 'female',
    phone: '(555) 345-6789',
    membershipType: 'premium',
    membershipStatus: 'active',
    joinDate: '2024-03-10',
    nextBillingDate: '2024-08-10',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-4',
    email: 'david.wilson@email.com',
    fullName: 'David Wilson',
    age: 35,
    gender: 'male',
    phone: '(555) 456-7890',
    membershipType: 'basic',
    membershipStatus: 'inactive',
    joinDate: '2023-11-05',
    nextBillingDate: '2024-08-05',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-5',
    email: 'lisa.thompson@email.com',
    fullName: 'Lisa Thompson',
    age: 29,
    gender: 'female',
    phone: '(555) 567-8901',
    membershipType: 'premium',
    membershipStatus: 'active',
    joinDate: '2024-04-15',
    nextBillingDate: '2024-08-15',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-6',
    email: 'james.brown@email.com',
    fullName: 'James Brown',
    age: 41,
    gender: 'male',
    phone: '(555) 678-9012',
    membershipType: 'basic',
    membershipStatus: 'cancelled',
    joinDate: '2023-08-20',
    nextBillingDate: '2024-08-20',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-7',
    email: 'maria.garcia@email.com',
    fullName: 'Maria Garcia',
    age: 26,
    gender: 'female',
    phone: '(555) 789-0123',
    membershipType: 'premium',
    membershipStatus: 'active',
    joinDate: '2024-05-01',
    nextBillingDate: '2024-08-01',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'member-8',
    email: 'robert.lee@email.com',
    fullName: 'Robert Lee',
    age: 38,
    gender: 'male',
    phone: '(555) 890-1234',
    membershipType: 'basic',
    membershipStatus: 'active',
    joinDate: '2024-01-30',
    nextBillingDate: '2024-08-30',
    profileImage: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
  }
]

// Mock instructors
export const mockInstructors: Instructor[] = [
  {
    id: 'instructor-1',
    name: 'Sarah Johnson',
    email: 'sarah.instructor@topdoggym.com',
    specialties: ['HIIT', 'Strength Training', 'Functional Fitness'],
    bio: 'Certified personal trainer with 8 years of experience. Specializes in high-intensity workouts and strength building.',
    profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    experience: 8,
    rating: 4.9,
    totalClasses: 245,
    joinDate: '2023-06-15',
    status: 'active'
  },
  {
    id: 'instructor-2',
    name: 'Maria Garcia',
    email: 'maria.instructor@topdoggym.com',
    specialties: ['Yoga', 'Pilates', 'Flexibility'],
    bio: 'Yoga instructor with 200-hour certification. Focuses on mind-body connection and flexibility.',
    profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    experience: 5,
    rating: 4.8,
    totalClasses: 180,
    joinDate: '2023-09-01',
    status: 'active'
  },
  {
    id: 'instructor-3',
    name: 'Alex Thompson',
    email: 'alex.instructor@topdoggym.com',
    specialties: ['Strength Training', 'Powerlifting', 'Bodybuilding'],
    bio: 'Former competitive powerlifter with expertise in strength training and muscle building.',
    profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    experience: 6,
    rating: 4.7,
    totalClasses: 165,
    joinDate: '2023-07-20',
    status: 'active'
  },
  {
    id: 'instructor-4',
    name: 'Jessica Martinez',
    email: 'jessica.instructor@topdoggym.com',
    specialties: ['Cardio', 'Dance Fitness', 'Zumba'],
    bio: 'High-energy fitness instructor specializing in cardio and dance-based workouts.',
    profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    experience: 4,
    rating: 4.6,
    totalClasses: 120,
    joinDate: '2024-01-10',
    status: 'active'
  }
]

// Mock gym classes
export const mockGymClasses: GymClass[] = [
  {
    id: 'class-1',
    name: 'Morning HIIT',
    description: 'High-intensity interval training to kickstart your day. Perfect for burning calories and building endurance.',
    instructorId: 'instructor-1',
    instructorName: 'Sarah Johnson',
    duration: 60,
    capacity: 12,
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Resistance Bands', 'Kettlebells'],
    tags: ['HIIT', 'Cardio', 'Strength'],
    price: 0, // Included in membership
    isActive: true,
    schedule: [
      {
        id: 'schedule-1',
        classId: 'class-1',
        dayOfWeek: 'Monday',
        startTime: '07:00',
        endTime: '08:00',
        isRecurring: true
      },
      {
        id: 'schedule-2',
        classId: 'class-1',
        dayOfWeek: 'Wednesday',
        startTime: '07:00',
        endTime: '08:00',
        isRecurring: true
      },
      {
        id: 'schedule-3',
        classId: 'class-1',
        dayOfWeek: 'Friday',
        startTime: '07:00',
        endTime: '08:00',
        isRecurring: true
      }
    ]
  },
  {
    id: 'class-2',
    name: 'Yoga Flow',
    description: 'Gentle yoga practice focusing on breath and movement. Suitable for all levels.',
    instructorId: 'instructor-2',
    instructorName: 'Maria Garcia',
    duration: 60,
    capacity: 12,
    difficulty: 'beginner',
    equipment: ['Yoga Mats', 'Blocks', 'Straps'],
    tags: ['Yoga', 'Flexibility', 'Mindfulness'],
    price: 0,
    isActive: true,
    schedule: [
      {
        id: 'schedule-4',
        classId: 'class-2',
        dayOfWeek: 'Tuesday',
        startTime: '18:00',
        endTime: '19:00',
        isRecurring: true
      },
      {
        id: 'schedule-5',
        classId: 'class-2',
        dayOfWeek: 'Thursday',
        startTime: '18:00',
        endTime: '19:00',
        isRecurring: true
      }
    ]
  },
  {
    id: 'class-3',
    name: 'Strength Training',
    description: 'Build muscle and increase strength with guided weightlifting sessions.',
    instructorId: 'instructor-3',
    instructorName: 'Alex Thompson',
    duration: 75,
    capacity: 10,
    difficulty: 'intermediate',
    equipment: ['Barbells', 'Dumbbells', 'Bench', 'Squat Rack'],
    tags: ['Strength', 'Muscle Building', 'Powerlifting'],
    price: 0,
    isActive: true,
    schedule: [
      {
        id: 'schedule-6',
        classId: 'class-3',
        dayOfWeek: 'Monday',
        startTime: '16:00',
        endTime: '17:15',
        isRecurring: true
      },
      {
        id: 'schedule-7',
        classId: 'class-3',
        dayOfWeek: 'Thursday',
        startTime: '16:00',
        endTime: '17:15',
        isRecurring: true
      }
    ]
  },
  {
    id: 'class-4',
    name: 'Cardio Dance',
    description: 'Fun, high-energy dance workout that combines cardio with popular music.',
    instructorId: 'instructor-4',
    instructorName: 'Jessica Martinez',
    duration: 45,
    capacity: 15,
    difficulty: 'beginner',
    equipment: ['None'],
    tags: ['Cardio', 'Dance', 'Fun'],
    price: 0,
    isActive: true,
    schedule: [
      {
        id: 'schedule-8',
        classId: 'class-4',
        dayOfWeek: 'Saturday',
        startTime: '10:00',
        endTime: '10:45',
        isRecurring: true
      },
      {
        id: 'schedule-9',
        classId: 'class-4',
        dayOfWeek: 'Sunday',
        startTime: '10:00',
        endTime: '10:45',
        isRecurring: true
      }
    ]
  }
]

// Mock admin statistics
export const mockAdminStats: AdminStats = {
  totalMembers: 156,
  activeMemberships: 142,
  totalRevenue: 142850,
  monthlyRevenue: 6895,
  totalClasses: 4,
  totalInstructors: 4,
  averageCapacity: 78,
  memberRetentionRate: 89.5,
  popularClassType: 'HIIT',
  peakHours: '6:00 AM - 8:00 AM'
}

// Mock revenue data for charts
export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 5200, members: 120, classes: 48 },
  { month: 'Feb', revenue: 5800, members: 135, classes: 52 },
  { month: 'Mar', revenue: 6100, members: 142, classes: 56 },
  { month: 'Apr', revenue: 6450, members: 148, classes: 58 },
  { month: 'May', revenue: 6650, members: 152, classes: 60 },
  { month: 'Jun', revenue: 6750, members: 154, classes: 62 },
  { month: 'Jul', revenue: 6895, members: 156, classes: 64 }
]

// Helper functions for generating random values with correct types
const getRandomStatus = (): 'completed' | 'pending' | 'failed' => {
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed']
  const random = Math.random()
  if (random > 0.8) return 'completed'
  if (random > 0.1) return 'completed' // Most should be completed
  return random > 0.5 ? 'pending' : 'failed'
}

const getRandomMethod = (): 'card' | 'bank' | 'cash' => {
  const methods: ('card' | 'bank' | 'cash')[] = ['card', 'bank', 'cash']
  const random = Math.random()
  if (random > 0.7) return 'card'
  if (random > 0.5) return 'bank'
  return 'cash'
}

// Mock all payment history for admin view
export const mockAllPaymentHistory: PaymentHistory[] = [
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `payment-${i + 1}`,
    date: new Date(2024, 6 - Math.floor(i / 10), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    amount: Math.random() > 0.6 ? 49.99 : 29.99,
    status: getRandomStatus(),
    description: `${Math.random() > 0.6 ? 'Premium' : 'Basic'} Membership`,
    method: getRandomMethod(),
    invoice: `INV-2024-${String(i + 1).padStart(3, '0')}`
  }))
]

// Utility functions for admin
export const isUserAdmin = (email: string): boolean => {
  return mockAdminUsers.some(admin => admin.email === email)
}

export const getMembershipStats = () => {
  const total = mockAllMembers.length
  const active = mockAllMembers.filter(m => m.membershipStatus === 'active').length
  const premium = mockAllMembers.filter(m => m.membershipType === 'premium').length
  const basic = mockAllMembers.filter(m => m.membershipType === 'basic').length
  
  return {
    total,
    active,
    inactive: total - active,
    premium,
    basic,
    retention: Math.round((active / total) * 100)
  }
}

export const getClassStats = () => {
  const totalClasses = mockGymClasses.length
  const activeClasses = mockGymClasses.filter(c => c.isActive).length
  const totalCapacity = mockGymClasses.reduce((sum, c) => sum + c.capacity, 0)
  const avgCapacity = Math.round(totalCapacity / totalClasses)
  
  return {
    totalClasses,
    activeClasses,
    totalCapacity,
    avgCapacity,
    totalInstructors: mockInstructors.length
  }
}

export const getRevenueStats = () => {
  const currentMonth = mockRevenueData[mockRevenueData.length - 1]
  const previousMonth = mockRevenueData[mockRevenueData.length - 2]
  const growth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
  
  return {
    currentMonth: currentMonth.revenue,
    previousMonth: previousMonth.revenue,
    growth: Math.round(growth * 100) / 100,
    totalRevenue: mockRevenueData.reduce((sum, d) => sum + d.revenue, 0)
  }
} 