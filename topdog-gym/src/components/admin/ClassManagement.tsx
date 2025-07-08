import React, { useState, useMemo } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { mockGymClasses, mockInstructors } from '../../utils/adminMockData'
import { GymClass, Instructor } from '../../utils/adminMockData'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock,
  Users,
  Target,
  Settings,
  Eye,
  Play,
  Pause
} from 'lucide-react'

interface ClassCardProps {
  gymClass: GymClass
  onEdit: (gymClass: GymClass) => void
  onDelete: (classId: string) => void
  onToggleStatus: (classId: string) => void
  onViewSchedule: (gymClass: GymClass) => void
}

const ClassCard: React.FC<ClassCardProps> = ({ 
  gymClass, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onViewSchedule 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{gymClass.name}</h3>
          <p className="text-sm text-gray-600">with {gymClass.instructorName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(gymClass.difficulty)}`}>
            {gymClass.difficulty.charAt(0).toUpperCase() + gymClass.difficulty.slice(1)}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            gymClass.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {gymClass.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{gymClass.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{gymClass.duration} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{gymClass.capacity} capacity</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{gymClass.schedule.length} sessions/week</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{gymClass.tags.join(', ')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(gymClass)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded"
            title="Edit class"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewSchedule(gymClass)}
            className="text-purple-600 hover:text-purple-900 p-1 rounded"
            title="View schedule"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleStatus(gymClass.id)}
            className={`p-1 rounded ${
              gymClass.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'
            }`}
            title={gymClass.isActive ? 'Deactivate class' : 'Activate class'}
          >
            {gymClass.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDelete(gymClass.id)}
            className="text-red-600 hover:text-red-900 p-1 rounded"
            title="Delete class"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Equipment: {gymClass.equipment.join(', ')}
        </div>
      </div>
    </Card>
  )
}

interface ClassStatsProps {
  classes: GymClass[]
  instructors: Instructor[]
}

const ClassStats: React.FC<ClassStatsProps> = ({ classes, instructors }) => {
  const stats = useMemo(() => {
    const totalClasses = classes.length
    const activeClasses = classes.filter(c => c.isActive).length
    const totalCapacity = classes.reduce((sum, c) => sum + c.capacity, 0)
    const averageCapacity = totalClasses > 0 ? Math.round(totalCapacity / totalClasses) : 0
    const totalSessions = classes.reduce((sum, c) => sum + c.schedule.length, 0)

    return {
      totalClasses,
      activeClasses,
      totalCapacity,
      averageCapacity,
      totalSessions,
      totalInstructors: instructors.length
    }
  }, [classes, instructors])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Classes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Play className="w-8 h-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Active Classes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeClasses}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-purple-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Capacity</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCapacity}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-orange-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Weekly Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface ScheduleViewProps {
  gymClass: GymClass
  onClose: () => void
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ gymClass, onClose }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{gymClass.name} Schedule</h3>
              <p className="text-sm text-gray-600">Instructor: {gymClass.instructorName}</p>
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
            <h4 className="font-medium text-gray-900">Weekly Schedule</h4>
            {daysOfWeek.map(day => {
              const daySchedule = gymClass.schedule.filter(s => s.dayOfWeek === day)
              return (
                <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 w-20">{day}</div>
                  <div className="flex-1 ml-4">
                    {daySchedule.length > 0 ? (
                      <div className="space-y-1">
                        {daySchedule.map(schedule => (
                          <div key={schedule.id} className="text-sm text-gray-600">
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">No classes</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Duration:</span>
                <span className="ml-2 text-gray-600">{gymClass.duration} minutes</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Capacity:</span>
                <span className="ml-2 text-gray-600">{gymClass.capacity} people</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Difficulty:</span>
                <span className="ml-2 text-gray-600">{gymClass.difficulty}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Equipment:</span>
                <span className="ml-2 text-gray-600">{gymClass.equipment.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ClassManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [instructorFilter, setInstructorFilter] = useState('all')
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null)
  const [showSchedule, setShowSchedule] = useState(false)

  const filteredClasses = useMemo(() => {
    return mockGymClasses.filter(gymClass => {
      const matchesSearch = gymClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gymClass.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gymClass.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = difficultyFilter === 'all' || gymClass.difficulty === difficultyFilter
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && gymClass.isActive) ||
                           (statusFilter === 'inactive' && !gymClass.isActive)
      const matchesInstructor = instructorFilter === 'all' || gymClass.instructorId === instructorFilter

      return matchesSearch && matchesDifficulty && matchesStatus && matchesInstructor
    })
  }, [searchTerm, difficultyFilter, statusFilter, instructorFilter])

  const handleEdit = (gymClass: GymClass) => {
    console.log('Edit class:', gymClass)
    // TODO: Open edit modal
  }

  const handleDelete = (classId: string) => {
    console.log('Delete class:', classId)
    // TODO: Show confirmation dialog
  }

  const handleToggleStatus = (classId: string) => {
    console.log('Toggle status for class:', classId)
    // TODO: Update class status
  }

  const handleViewSchedule = (gymClass: GymClass) => {
    setSelectedClass(gymClass)
    setShowSchedule(true)
  }

  const handleAddClass = () => {
    console.log('Add new class')
    // TODO: Open add class modal
  }

  const handleBulkSchedule = () => {
    console.log('Bulk schedule management')
    // TODO: Open bulk schedule modal
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Class Management</h2>
          <p className="text-gray-600">Manage fitness classes and schedules</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={handleBulkSchedule}
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Bulk Schedule</span>
          </Button>
          <Button
            onClick={handleAddClass}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class</span>
          </Button>
        </div>
      </div>

      <ClassStats classes={filteredClasses} instructors={mockInstructors} />

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search classes by name, instructor, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
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
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Instructors</option>
              {mockInstructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredClasses.length} of {mockGymClasses.length} classes
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(gymClass => (
            <ClassCard
              key={gymClass.id}
              gymClass={gymClass}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onViewSchedule={handleViewSchedule}
            />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No classes found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Schedule Modal */}
      {showSchedule && selectedClass && (
        <ScheduleView
          gymClass={selectedClass}
          onClose={() => {
            setShowSchedule(false)
            setSelectedClass(null)
          }}
        />
      )}
    </div>
  )
} 