import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
})

export const PRICE_IDS = {
  MONTHLY: process.env.STRIPE_MONTHLY_PRICE_ID || "price_monthly",
  YEARLY: process.env.STRIPE_YEARLY_PRICE_ID || "price_yearly",
}

export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    priceId: PRICE_IDS.MONTHLY,
    price: 9.99,
    interval: "month" as const,
    name: "Monthly Plan",
    features: [
      "Unlimited conversations",
      "AI feedback and corrections",
      "Progress tracking",
      "All learning modules",
    ],
  },
  YEARLY: {
    priceId: PRICE_IDS.YEARLY,
    price: 99.99,
    interval: "year" as const,
    name: "Yearly Plan",
    features: [
      "Unlimited conversations",
      "AI feedback and corrections",
      "Progress tracking",
      "All learning modules",
      "2 months free",
      "Priority support",
    ],
  },
}