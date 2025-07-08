import React, { useState, useMemo } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { mockInstructors, mockGymClasses } from '../../utils/adminMockData'
import { Instructor, GymClass } from '../../utils/adminMockData'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  Star,
  Users,
  Clock,
  BookOpen,
  Activity
} from 'lucide-react'

interface InstructorCardProps {
  instructor: Instructor
  classes: GymClass[]
  onEdit: (instructor: Instructor) => void
  onDelete: (instructorId: string) => void
  onSendEmail: (instructor: Instructor) => void
  onViewClasses: (instructor: Instructor) => void
}

const InstructorCard: React.FC<InstructorCardProps> = ({ 
  instructor, 
  classes, 
  onEdit, 
  onDelete, 
  onSendEmail, 
  onViewClasses 
}) => {
  const instructorClasses = classes.filter(c => c.instructorId === instructor.id)
  const activeClasses = instructorClasses.filter(c => c.isActive)

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    )
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
            <p className="text-sm text-gray-600">{instructor.email}</p>
          </div>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(instructor.status)}`}>
          {instructor.status.charAt(0).toUpperCase() + instructor.status.slice(1)}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Rating</span>
          {renderRating(instructor.rating)}
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Experience</span>
          <span className="text-sm font-medium text-gray-900">{instructor.experience} years</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Classes</span>
          <span className="text-sm font-medium text-gray-900">{instructor.totalClasses}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Active Classes</span>
          <span className="text-sm font-medium text-gray-900">{activeClasses.length}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
        <div className="flex flex-wrap gap-1">
          {instructor.specialties.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{instructor.bio}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(instructor)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded"
            title="Edit instructor"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSendEmail(instructor)}
            className="text-green-600 hover:text-green-900 p-1 rounded"
            title="Send email"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewClasses(instructor)}
            className="text-purple-600 hover:text-purple-900 p-1 rounded"
            title="View classes"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(instructor.id)}
            className="text-red-600 hover:text-red-900 p-1 rounded"
            title="Delete instructor"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Since {new Date(instructor.joinDate).toLocaleDateString()}
        </div>
      </div>
    </Card>
  )
}

interface InstructorStatsProps {
  instructors: Instructor[]
  classes: GymClass[]
}

const InstructorStats: React.FC<InstructorStatsProps> = ({ instructors, classes }) => {
  const stats = useMemo(() => {
    const totalInstructors = instructors.length
    const activeInstructors = instructors.filter(i => i.status === 'active').length
    const averageRating = instructors.reduce((sum, i) => sum + i.rating, 0) / totalInstructors
    const totalExperience = instructors.reduce((sum, i) => sum + i.experience, 0)
    const averageExperience = totalExperience / totalInstructors

    return {
      totalInstructors,
      activeInstructors,
      averageRating: Math.round(averageRating * 10) / 10,
      averageExperience: Math.round(averageExperience * 10) / 10,
      totalClasses: classes.length
    }
  }, [instructors, classes])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Instructors</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalInstructors}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Activity className="w-8 h-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Active Instructors</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeInstructors}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Star className="w-8 h-8 text-yellow-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-purple-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Avg Experience</p>
            <p className="text-2xl font-bold text-gray-900">{stats.averageExperience}y</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface InstructorClassesModalProps {
  instructor: Instructor
  classes: GymClass[]
  onClose: () => void
}

const InstructorClassesModal: React.FC<InstructorClassesModalProps> = ({ 
  instructor, 
  classes, 
  onClose 
}) => {
  const instructorClasses = classes.filter(c => c.instructorId === instructor.id)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{instructor.name}'s Classes</h3>
              <p className="text-sm text-gray-600">{instructorClasses.length} classes assigned</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {instructorClasses.map(gymClass => (
              <div key={gymClass.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{gymClass.name}</h4>
                    <p className="text-sm text-gray-600">{gymClass.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      gymClass.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gymClass.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {gymClass.difficulty}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2 text-gray-900">{gymClass.duration} min</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity:</span>
                    <span className="ml-2 text-gray-900">{gymClass.capacity}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sessions:</span>
                    <span className="ml-2 text-gray-900">{gymClass.schedule.length}/week</span>
                  </div>
                </div>
              </div>
            ))}
            {instructorClasses.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No classes assigned to this instructor</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const InstructorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [specialtyFilter, setSpecialtyFilter] = useState('all')
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)
  const [showClasses, setShowClasses] = useState(false)

  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>()
    mockInstructors.forEach(instructor => {
      instructor.specialties.forEach(specialty => specialties.add(specialty))
    })
    return Array.from(specialties).sort()
  }, [])

  const filteredInstructors = useMemo(() => {
    return mockInstructors.filter(instructor => {
      const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           instructor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || instructor.status === statusFilter
      const matchesSpecialty = specialtyFilter === 'all' || instructor.specialties.includes(specialtyFilter)

      return matchesSearch && matchesStatus && matchesSpecialty
    })
  }, [searchTerm, statusFilter, specialtyFilter])

  const handleEdit = (instructor: Instructor) => {
    console.log('Edit instructor:', instructor)
    // TODO: Open edit modal
  }

  const handleDelete = (instructorId: string) => {
    console.log('Delete instructor:', instructorId)
    // TODO: Show confirmation dialog
  }

  const handleSendEmail = (instructor: Instructor) => {
    console.log('Send email to:', instructor.email)
    // TODO: Open email composer
  }

  const handleViewClasses = (instructor: Instructor) => {
    setSelectedInstructor(instructor)
    setShowClasses(true)
  }

  const handleAddInstructor = () => {
    console.log('Add new instructor')
    // TODO: Open add instructor modal
  }

  const handleExport = () => {
    console.log('Export instructors')
    // TODO: Export to CSV/Excel
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Instructor Management</h2>
          <p className="text-gray-600">Manage fitness instructors and their classes</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={handleExport}
            className="flex items-center space-x-2"
          >
            <span>Export</span>
          </Button>
          <Button
            onClick={handleAddInstructor}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Instructor</span>
          </Button>
        </div>
      </div>

      <InstructorStats instructors={filteredInstructors} classes={mockGymClasses} />

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search instructors by name, email, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Specialties</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredInstructors.length} of {mockInstructors.length} instructors
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map(instructor => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              classes={mockGymClasses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSendEmail={handleSendEmail}
              onViewClasses={handleViewClasses}
            />
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No instructors found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Classes Modal */}
      {showClasses && selectedInstructor && (
        <InstructorClassesModal
          instructor={selectedInstructor}
          classes={mockGymClasses}
          onClose={() => {
            setShowClasses(false)
            setSelectedInstructor(null)
          }}
        />
      )}
    </div>
  )
} 