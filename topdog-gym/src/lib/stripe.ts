import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || process.env.STRIPE_KEY!)

export default stripePromise

// Payment types
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripe_price_id: string
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    price: 29.99,
    interval: 'month',
    features: [
      'Access to downstairs gym (Male members)',
      'Basic equipment access',
      'Standard support'
    ],
    stripe_price_id: 'price_basic_monthly' // To be replaced with actual Stripe price ID
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    price: 49.99,
    interval: 'month',
    features: [
      'Access to all classes (Female members)',
      'Access to downstairs gym',
      'Priority booking',
      'Premium support'
    ],
    stripe_price_id: 'price_premium_monthly' // To be replaced with actual Stripe price ID
  }
] 