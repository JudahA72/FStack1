# FStack1

# TopDog Gym Management System

A comprehensive web application for TopDog Gym in Tallahassee, Florida. Built with React, TypeScript, Tailwind CSS, and Supabase.

##  Current Status

This project has evolved significantly with a fully functional admin dashboard system, user authentication, and responsive UI components. The application now supports complete gym management workflows. With progress being updated daily

##  Completed Features

###  Authentication System
- **Complete User Authentication**: Login, signup, and session management with Supabase Auth
- **Role-based Access Control**: Admin and member role detection
- **Protected Routes**: Secure routing for admin and user areas
- **Session Persistence**: Automatic login state management

###  User Dashboard
- **Member Profile Management**: View and edit personal information
- **Class Booking Interface**: Book and manage class reservations
- **Subscription Status**: View current membership and billing
- **Responsive Design**: Mobile-first approach for all devices

###  Admin Dashboard System
- **AdminOverview**: Comprehensive statistics dashboard with key metrics
  - Total members, active subscriptions, revenue analytics
  - Recent activity feed and system health indicators
  - Quick action buttons for common tasks

- **MemberManagement**: Complete member administration
  - View all members with detailed profiles
  - Edit member information and membership status
  - Manage subscriptions and billing information
  - Member activity tracking and analytics

- **ClassManagement**: Full class scheduling system
  - Create and edit classes with instructors and schedules
  - Manage class capacity and waitlists
  - Track class attendance and popularity
  - Bulk scheduling and recurring class setup

- **InstructorManagement**: Instructor administration
  - Add, edit, and manage instructor profiles
  - Assign classes and track instructor performance
  - Manage instructor schedules and availability
  - Performance analytics and feedback tracking

- **FinancialOverview**: Revenue and financial analytics
  - Monthly and yearly revenue tracking
  - Subscription analytics and churn rates
  - Payment processing and refund management
  - Financial reporting and insights

- **AdminDashboard**: Central navigation and management hub
  - Intuitive tabbed interface for all admin functions
  - Real-time notifications and alerts
  - Quick access to critical gym metrics
  - Responsive admin interface

### UI Components
- **Modern Design System**: Consistent, accessible components
- **Responsive Navigation**: Mobile-friendly navbar with user context
- **Card Components**: Flexible, reusable card layouts
- **Button System**: Comprehensive button variants and states
- **Form Components**: Accessible form inputs and validation

###  Data Management
- **Mock Data System**: Comprehensive test data for all features
- **Type Safety**: Full TypeScript implementation
- **State Management**: React Context for global state
- **Performance Optimization**: Efficient rendering and updates

##  Architecture

### Frontend Architecture
```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Navbar)
│   ├── auth/            # Authentication components
│   ├── dashboard/       # User dashboard components
│   ├── classes/         # Class-related components
│   └── admin/           # Complete admin panel system
│       ├── AdminDashboard.tsx    # Main admin interface
│       ├── AdminOverview.tsx     # Statistics dashboard
│       ├── MemberManagement.tsx  # Member admin tools
│       ├── ClassManagement.tsx   # Class scheduling
│       ├── InstructorManagement.tsx # Instructor management
│       └── FinancialOverview.tsx # Financial analytics
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   └── AdminPage.tsx    # Admin page wrapper
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication and user state
├── utils/               # Utility functions
│   └── adminMockData.ts # Comprehensive mock data
└── lib/                 # External service configurations
    ├── supabase.ts      # Supabase client and types
    └── stripe.ts        # Stripe configuration
```

##  Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Icons**: Lucide React
- **Backend**: Supabase (Database, Auth, Real-time)
- **Payments**: Stripe (configured)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Deployment**: Vercel/Netlify ready

## 

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- Stripe account





### For Members
1. **Registration/Login**: Secure authentication via Supabase
2. **Dashboard Access**: Personal dashboard with class booking
3. **Class Management**: Book classes, manage schedule, view history
4. **Profile Management**: Update personal information and preferences

### For Administrators
1. **Admin Login**: Role-based authentication
2. **Dashboard Overview**: Real-time gym statistics and metrics
3. **Member Management**: Complete member administration tools
4. **Class Administration**: Full class scheduling and management
5. **Instructor Management**: Instructor profiles and scheduling
6. **Financial Analytics**: Revenue tracking and business insights

##  Business Logic

### User Types
- **Female Members**: Access to hourly classes (7 AM - 7 PM) + optional downstairs gym
- **Male Members**: Access to downstairs gym only
- **Administrators**: Full system access and management capabilities

### Capacity Management
- **Classes**: 12 members maximum with automatic waitlist
- **Downstairs Gym**: 16 members maximum with automatic waitlist



##  Key Achievements

- **Complete Admin System**: Fully functional admin dashboard with all management tools
- **Type Safety**: 100% TypeScript implementation with proper type definitions
- **Modern UI**: Responsive design with Tailwind CSS and modern React patterns
- **Scalable Architecture**: Clean component structure ready for future enhancements
- **Mock Data Integration**: Comprehensive test data for all features
- **Authentication Ready**: Complete user and admin authentication system

---

 
