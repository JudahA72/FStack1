# TopDog Gym Management System

A responsive web application for TopDog Gym in Tallahassee, Florida. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Gender-based Access Control**: Female members can book classes, male members access downstairs gym
- **Real-time Capacity Management**: Live updates for class and gym capacity with automatic waitlists
- **User Authentication**: Secure login/signup with Supabase Auth
- **Subscription Management**: Stripe integration for recurring payments
- **Admin Dashboard**: Complete control over users, classes, and facility settings
- **Responsive Design**: Mobile-first design for future React Native migration

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Payments**: Stripe
- **Routing**: React Router v6
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd topdog-gym
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Fill in your environment variables:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
STRIPE_KEY=your_stripe_publishable_key
GYM_NAME=TopDog
GYM_LOCATION=Tallahassee
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── classes/         # Class-related components
│   └── admin/           # Admin panel components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── contexts/            # React contexts
└── lib/                 # External service configurations
    ├── supabase.ts      # Supabase client and types
    └── stripe.ts        # Stripe configuration
```

## Business Logic

### User Types
- **Female Members**: Access to hourly classes (7 AM - 7 PM) + optional downstairs gym
- **Male Members**: Access to downstairs gym only

### Capacity Management
- **Classes**: 12 members maximum with automatic waitlist
- **Downstairs Gym**: 16 members maximum with automatic waitlist

### Membership Plans
- **Basic ($29.99/month)**: Downstairs gym access
- **Premium ($49.99/month)**: All features including classes

## Development Roadmap

- [x] Project setup and basic structure
- [x] UI components and navigation
- [x] Home page design
- [ ] Authentication system
- [ ] Database schema setup
- [ ] Class booking system
- [ ] Real-time capacity management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Testing and deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to TopDog Gym.
