"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, Zap, Book, Bot, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const subscriptionPlans = [
  {
    name: "Free",
    price: "0",
    features: ["1 book free to read a month", "Access to community forums"],
    icon: Book,
    color: "bg-gray-100 dark:bg-gray-800",
  },
  {
    name: "Basic",
    price: "99",
    features: ["50 books free to read a month", "Personalized recommendations", "Ad-free reading experience"],
    icon: Zap,
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    name: "Deluxe",
    price: "179",
    features: ["Unlimited books access", "Moody AI book companion", "Exclusive author interviews"],
    icon: Bot,
    color: "bg-amber-100 dark:bg-amber-900",
  },
  {
    name: "Supreme",
    price: "399",
    features: ["Unlimited books access", "Advanced AI writing assistant", "Early access to new releases", "Monthly book box delivery"],
    icon: Gift,
    color: "bg-orange-100 dark:bg-orange-900",
    bestDeal: true,
  },
]

const SubscriptionCard = ({ plan, isSelected, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      whileHover={{ scale: 1.05, rotate: isSelected ? [0, -1, 1, -1, 0] : 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Card 
        className={`relative overflow-hidden cursor-pointer ${plan.color} ${isSelected ? 'ring-4 ring-yellow-400 dark:ring-yellow-600' : ''}`}
        onClick={() => onSelect(plan.name)}
      >
        {plan.bestDeal && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">Best Deal</Badge>
        )}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <plan.icon className="w-8 h-8" />
            </motion.div>
          </div>
          <CardDescription>
            <span className="text-3xl font-bold">₹{plan.price}</span>
            {plan.price !== "0" && <span className="text-sm">/month</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <Check className="w-5 h-5 text-green-500" />
                </motion.div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 hover:bg-yellow-100 dark:hover:bg-yellow-900"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <motion.h1 
            className="text-3xl font-bold text-yellow-900 dark:text-yellow-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Reading Adventure
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionCard
                key={plan.name}
                plan={plan}
                isSelected={selectedPlan === plan.name}
                onSelect={setSelectedPlan}
              />
            ))}
          </AnimatePresence>
        </div>
        <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(selectedPlan?.price || 1),
          currency: "inr",
        }}
      >
        <CheckoutPage amount={selectedPlan?.price || 1} />
      </Elements>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700 text-white transition-colors duration-300"
            onClick={() => alert(`You selected the ${selectedPlan || 'Free'} plan!`)}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Start Your Journey
            </motion.span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-yellow-900 dark:text-yellow-100"
        >
          <p>All plans come with a 7-day free trial. Cancel anytime.</p>
        </motion.div>
      </div>
    </div>
  )
}