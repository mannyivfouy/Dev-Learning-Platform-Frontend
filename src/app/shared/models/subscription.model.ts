export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  billing_cycle: 'monthly' | 'yearly';
  stripe_price_id: string;
  status: 'active' | 'inactive';
}

export interface Subscription {
  id: string;
  student_id: string;
  plan_id: string;
  provider: 'stripe' | 'paypal' | 'bakong';
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
  status: 'pending' | 'active' | 'past_due' | 'cancelled' | 'expired';
  cancel_at_period_end: boolean;
  start_date: string;
  end_date: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  plan: SubscriptionPlan;
}
