import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await request.headers
  const sig = headersList.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      
      if (session.mode === "subscription") {
        const userId = session.metadata?.userId
        
        if (!userId) {
          console.error("No userId in session metadata")
          break
        }

        // Update user subscription status
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: "ACTIVE",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionType: "MONTHLY",
          },
        })

        console.log(`✅ Subscription activated for user ${userId}`)
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      
      const user = await prisma.user.findFirst({
        where: { stripeSubscriptionId: subscription.id },
      })

      if (!user) {
        console.error(`No user found for subscription ${subscription.id}`)
        break
      }

      const status = subscription.status === "active" ? "ACTIVE" : "INACTIVE"

      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: status,
        },
      })

      console.log(`✅ Subscription updated for user ${user.id}: ${status}`)
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      
      const user = await prisma.user.findFirst({
        where: { stripeSubscriptionId: subscription.id },
      })

      if (!user) {
        console.error(`No user found for subscription ${subscription.id}`)
        break
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: "INACTIVE" as const,
          subscriptionType: "FREE" as const,
        },
      })

      console.log(`✅ Subscription canceled for user ${user.id}`)
      break
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice
      console.log(`✅ Payment succeeded for invoice ${invoice.id}`)
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      console.log(`❌ Payment failed for invoice ${invoice.id}`)
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}