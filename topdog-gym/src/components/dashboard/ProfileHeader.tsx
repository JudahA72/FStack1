import React from 'react'
import { UserProfile } from '../../utils/mockData'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface ProfileHeaderProps {
  profile: UserProfile
  onEditProfile: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditProfile }) => {
  const membershipTypeDisplay = profile.membershipType === 'premium' ? 'Premium' : 'Basic'
  const nextBilling = new Date(profile.nextBillingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <Card className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                profile.membershipStatus === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {profile.membershipStatus === 'active' ? '● Active' : '● Inactive'}
              </span>
              <span className="text-sm text-gray-500">
                {membershipTypeDisplay} Member
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" onClick={onEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Membership Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Member since</span>
            <p className="font-medium text-gray-900">
              {new Date(profile.joinDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Membership Type</span>
            <p className="font-medium text-gray-900">
              {membershipTypeDisplay} - ${profile.membershipType === 'premium' ? '49.99' : '29.99'}/month
            </p>
          </div>
          <div>
            <span className="text-gray-500">Next billing</span>
            <p className="font-medium text-gray-900">{nextBilling}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProfileHeader 