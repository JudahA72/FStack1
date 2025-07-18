import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY || 'placeholder-key'

// Create client with error handling for development
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
}

// Database Types (to be updated when we create the schema)
export interface User {
  id: string
  email: string
  full_name: string
  age: number
  gender: 'male' | 'female'
  occupation: string
  phone: string
  waiver_signed: boolean
  membership_type: 'basic' | 'premium'
  membership_status: 'active' | 'inactive' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface GymClass {
  id: string
  name: string
  description: string
  start_time: string
  end_time: string
  capacity: number
  current_bookings: number
  instructor: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  class_id: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  booked_at: string
  created_at: string
  updated_at: string
}

export interface CheckIn {
  id: string
  user_id: string
  facility: 'class' | 'downstairs'
  check_in_time: string
  check_out_time?: string
  created_at: string
} 