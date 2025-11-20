"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SUBSCRIPTION_PLANS } from "@/lib/stripe"

interface PricingCardProps {
  plan: typeof SUBSCRIPTION_PLANS.MONTHLY | typeof SUBSCRIPTION_PLANS.YEARLY
  isPopular?: boolean
  onSelect: (priceId: string) => void
  loading: boolean
}

function PricingCard({ plan, isPopular, onSelect, loading }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
        isPopular ? "border-blue-500" : "border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
        
        <div className="mb-6">
          <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-600 ml-2">
            /{plan.interval}
          </span>
          {plan.interval === "year" && (
            <div className="text-sm text-green-600 font-medium">
              Save $19.89 annually!
            </div>
          )}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(plan.priceId)}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
            isPopular
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Processing..." : "Get Started"}
        </button>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscription = async (priceId: string) => {
    try {
      setLoading(true)
      setSelectedPlan(priceId)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }

    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Unlock your Spanish learning potential with our AI-powered platform. 
            Start your journey to fluency today.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <PricingCard
            plan={SUBSCRIPTION_PLANS.MONTHLY}
            onSelect={handleSubscription}
            loading={loading && selectedPlan === SUBSCRIPTION_PLANS.MONTHLY.priceId}
          />
          
          <PricingCard
            plan={SUBSCRIPTION_PLANS.YEARLY}
            isPopular
            onSelect={handleSubscription}
            loading={loading && selectedPlan === SUBSCRIPTION_PLANS.YEARLY.priceId}
          />
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription at any time?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You&apos;ll continue to have access 
                to all features until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                We offer a limited free version that includes basic chat functionality. 
                Upgrade to premium for unlimited access and advanced features.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards through Stripe, our secure payment processor.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}