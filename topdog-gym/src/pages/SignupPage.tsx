import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Card from '../components/ui/Card'

interface SignupForm {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  age: string
  gender: string
  occupation: string
  phone: string
  membershipType: string
  waiverAccepted: boolean
}

interface FormErrors {
  [key: string]: string | undefined
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    age: '',
    gender: '',
    occupation: '',
    phone: '',
    membershipType: '',
    waiverAccepted: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ]

  const membershipOptions = [
    { value: 'basic', label: 'Basic Membership - $29.99/month (Downstairs gym access)' },
    { value: 'premium', label: 'Premium Membership - $49.99/month (All features + classes)' }
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Full name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Age validation
    if (!form.age) {
      newErrors.age = 'Age is required'
    } else {
      const ageNum = parseInt(form.age)
      if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
        newErrors.age = 'Age must be between 16 and 100'
      }
    }

    // Gender validation
    if (!form.gender) {
      newErrors.gender = 'Gender selection is required'
    }

    // Phone validation
    if (!form.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Membership validation
    if (!form.membershipType) {
      newErrors.membershipType = 'Please select a membership type'
    }

    // Waiver validation
    if (!form.waiverAccepted) {
      newErrors.waiverAccepted = 'You must accept the waiver to continue'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      const userData = {
        full_name: form.fullName,
        age: parseInt(form.age),
        gender: form.gender,
        occupation: form.occupation,
        phone: form.phone,
        membership_type: form.membershipType,
        waiver_signed: form.waiverAccepted
      }

      const { error } = await signUp(form.email, form.password, userData)

      if (error) {
        setErrors({
          general: error.message || 'Signup failed. Please try again.'
        })
      } else {
        // Show success message and redirect
        if (isSupabaseConfigured()) {
          alert('Account created successfully! Please check your email to verify your account.')
        } else {
          alert('Account created successfully! (Demo Mode)')
        }
        navigate('/login')
      }
    } catch (error: any) {
      setErrors({
        general: error.message || 'Signup failed. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">TopDog Gym</h1>
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{errors.general}</div>
              </div>
            )}

            {/* Demo Mode Notice */}
            {!isSupabaseConfigured() && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="text-sm text-blue-700">
                  <strong>Demo Mode:</strong> Account creation is simulated. Use any valid information.
                </div>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  placeholder="Enter your full name"
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />

                <Input
                  label="Age"
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  error={errors.age}
                  placeholder="Enter your age"
                  min="16"
                  max="100"
                  required
                />

                <Select
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  error={errors.gender}
                  options={genderOptions}
                  placeholder="Select your gender"
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="(555) 123-4567"
                  required
                />

                <Input
                  label="Occupation"
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  error={errors.occupation}
                  placeholder="Your occupation"
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Account Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Create a strong password"
                  required
                  helperText="Must contain uppercase, lowercase, and number"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Membership Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Membership Plan
              </h3>

              <Select
                label="Choose Your Membership"
                name="membershipType"
                value={form.membershipType}
                onChange={handleChange}
                error={errors.membershipType}
                options={membershipOptions}
                placeholder="Select a membership plan"
                required
              />

              {/* Membership Benefits */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Basic Membership</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Downstairs gym access</li>
                    <li>• Real-time capacity tracking</li>
                    <li>• Standard equipment</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Premium Membership</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• All Basic features</li>
                    <li>• Access to women's classes</li>
                    <li>• Priority booking</li>
                    <li>• Premium support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Waiver Agreement */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Waiver Agreement
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                <p className="mb-2">
                  By checking the box below, you acknowledge that you have read and agree to the TopDog Gym waiver and liability release. This includes:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Assumption of risk for physical activities</li>
                  <li>Release of liability claims</li>
                  <li>Agreement to follow gym rules and policies</li>
                </ul>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="waiverAccepted"
                  checked={form.waiverAccepted}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  I acknowledge that I have read and agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">waiver and liability release</a>
                </label>
              </div>
              {errors.waiverAccepted && (
                <p className="text-sm text-red-600">{errors.waiverAccepted}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default SignupPage 