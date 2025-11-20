import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      subscriptionType: string
      subscriptionEnds?: Date
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    subscriptionType: string
    subscriptionEnds?: Date
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    subscriptionType?: string
    subscriptionEnds?: Date
  }
}