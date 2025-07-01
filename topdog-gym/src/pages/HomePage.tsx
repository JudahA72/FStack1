import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to TopDog Gym
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premier fitness facility in Tallahassee, Florida. 
              Join our community and achieve your fitness goals.
            </p>
            <div className="space-x-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Join Now
                </Button>
              </Link>
              <Link to="/classes">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Classes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TopDog Gym?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer specialized programs and facilities designed for different fitness needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card title="Women's Classes" subtitle="7 AM - 7 PM Daily">
              <p className="text-gray-600 mb-4">
                Specialized hourly fitness classes designed for women. 
                Limited to 12 participants per class with automatic waitlist management.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Professional instructors</li>
                <li>• Small class sizes</li>
                <li>• Variety of fitness programs</li>
                <li>• Optional downstairs gym access</li>
              </ul>
            </Card>

            <Card title="Downstairs Gym" subtitle="Open Access">
              <p className="text-gray-600 mb-4">
                Full equipment gym facility with capacity for 16 members. 
                Perfect for strength training and cardio workouts.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Modern equipment</li>
                <li>• Real-time capacity tracking</li>
                <li>• Automatic waitlist system</li>
                <li>• Flexible access hours</li>
              </ul>
            </Card>

            <Card title="Real-Time Updates" subtitle="Stay Connected">
              <p className="text-gray-600 mb-4">
                Live updates on class availability, gym capacity, and waitlist status. 
                Never miss your workout opportunity.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instant notifications</li>
                <li>• Live capacity updates</li>
                <li>• Easy booking system</li>
                <li>• Mobile-friendly interface</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Membership Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your fitness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card title="Basic Membership" subtitle="$29.99/month">
              <div className="space-y-4">
                <ul className="text-gray-600 space-y-2">
                  <li>• Access to downstairs gym facility</li>
                  <li>• Real-time capacity tracking</li>
                  <li>• Basic equipment access</li>
                  <li>• Standard support</li>
                </ul>
                <Link to="/signup" className="block">
                  <Button className="w-full">Choose Basic</Button>
                </Link>
              </div>
            </Card>

            <Card title="Premium Membership" subtitle="$49.99/month" className="border-2 border-blue-500">
              <div className="space-y-4">
                <ul className="text-gray-600 space-y-2">
                  <li>• All Basic features</li>
                  <li>• Access to women's classes</li>
                  <li>• Priority booking</li>
                  <li>• Premium support</li>
                </ul>
                <Link to="/signup" className="block">
                  <Button className="w-full">Choose Premium</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join TopDog Gym today and become part of Tallahassee's premier fitness community.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage 