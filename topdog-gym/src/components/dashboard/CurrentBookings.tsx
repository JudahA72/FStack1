import React from 'react'
import { ClassBooking, formatDate, formatTime, getStatusColor } from '../../utils/mockData'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface CurrentBookingsProps {
  bookings: ClassBooking[]
  onCancelBooking: (bookingId: string) => void
  onViewAllBookings: () => void
}

const CurrentBookings: React.FC<CurrentBookingsProps> = ({ 
  bookings, 
  onCancelBooking, 
  onViewAllBookings 
}) => {
  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(`${booking.date}T${booking.startTime}`)
    return bookingDate > new Date()
  }).slice(0, 3) // Show only next 3 bookings

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
        <Button variant="outline" size="sm" onClick={onViewAllBookings}>
          View All
        </Button>
      </div>

      {upcomingBookings.length === 0 ? (
        <Card className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming classes</h3>
          <p className="text-gray-600 mb-4">Book your next class to get started!</p>
          <Button>Browse Classes</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.className}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 
                       booking.status === 'waitlist' ? 'Waitlisted' : 'Cancelled'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{booking.instructor}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{booking.currentBookings}/{booking.capacity}</span>
                    </div>
                  </div>
                  
                  {booking.status === 'waitlist' && (
                    <div className="mt-2 text-sm text-yellow-600">
                      You're #{booking.currentBookings - booking.capacity + 1} on the waitlist
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Cancel
                    </Button>
                  )}
                  {booking.status === 'waitlist' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-gray-600"
                    >
                      Leave Waitlist
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrentBookings 