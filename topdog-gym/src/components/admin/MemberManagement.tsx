import React, { useState, useMemo } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { mockAllMembers } from '../../utils/adminMockData'
import { UserProfile } from '../../utils/mockData'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  Users,
  MoreHorizontal
} from 'lucide-react'

interface MemberTableProps {
  members: UserProfile[]
  onEdit: (member: UserProfile) => void
  onDelete: (memberId: string) => void
  onSendEmail: (member: UserProfile) => void
}

const MemberTable: React.FC<MemberTableProps> = ({ members, onEdit, onDelete, onSendEmail }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMembershipColor = (type: string) => {
    return type === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Join Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Billing
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={member.profileImage || `https://ui-avatars.com/api/?name=${member.fullName}&background=3B82F6&color=fff`}
                      alt={member.fullName}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(member.membershipType)}`}>
                  {member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.membershipStatus)}`}>
                  {member.membershipStatus.charAt(0).toUpperCase() + member.membershipStatus.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(member.joinDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(member.nextBillingDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(member)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                    title="Edit member"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSendEmail(member)}
                    className="text-green-600 hover:text-green-900 p-1 rounded"
                    title="Send email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded"
                    title="Delete member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface MemberStatsProps {
  members: UserProfile[]
}

const MemberStats: React.FC<MemberStatsProps> = ({ members }) => {
  const stats = useMemo(() => {
    const total = members.length
    const active = members.filter(m => m.membershipStatus === 'active').length
    const premium = members.filter(m => m.membershipType === 'premium').length
    const thisMonth = members.filter(m => {
      const joinDate = new Date(m.joinDate)
      const now = new Date()
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
    }).length

    return { total, active, premium, thisMonth }
  }, [members])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Active Members</p>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 text-purple-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Premium Members</p>
            <p className="text-2xl font-bold text-gray-900">{stats.premium}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-orange-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">New This Month</p>
            <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export const MemberManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [genderFilter, setGenderFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    return mockAllMembers.filter(member => {
      const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || member.membershipStatus === statusFilter
      const matchesMembership = membershipFilter === 'all' || member.membershipType === membershipFilter
      const matchesGender = genderFilter === 'all' || member.gender === genderFilter

      return matchesSearch && matchesStatus && matchesMembership && matchesGender
    })
  }, [searchTerm, statusFilter, membershipFilter, genderFilter])

  const handleEdit = (member: UserProfile) => {
    console.log('Edit member:', member)
    // TODO: Open edit modal
  }

  const handleDelete = (memberId: string) => {
    console.log('Delete member:', memberId)
    // TODO: Show confirmation dialog
  }

  const handleSendEmail = (member: UserProfile) => {
    console.log('Send email to:', member.email)
    // TODO: Open email composer
  }

  const handleAddMember = () => {
    console.log('Add new member')
    // TODO: Open add member modal
  }

  const handleExport = () => {
    console.log('Export members')
    // TODO: Export to CSV/Excel
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
          <p className="text-gray-600">Manage all gym members and their memberships</p>
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
            onClick={handleAddMember}
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Add Member</span>
          </Button>
        </div>
      </div>

      <MemberStats members={filteredMembers} />

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members by name or email..."
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
              <option value="cancelled">Cancelled</option>
            </Select>
            <Select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Membership</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </Select>
            <Select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredMembers.length} of {mockAllMembers.length} members
          </p>
        </div>

        {/* Members Table */}
        <MemberTable
          members={filteredMembers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSendEmail={handleSendEmail}
        />
      </Card>
    </div>
  )
} 