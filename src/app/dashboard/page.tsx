"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import ChatInterface from "@/components/chat/ChatInterface"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("chat")
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  if (session?.user?.role === "ADMIN" || session?.user?.role === "TEACHER") {
    redirect("/admin/dashboard")
  }

  const tabs = [
    { id: "chat", name: "AI Chat", icon: "💬" },
    { id: "lessons", name: "Lessons", icon: "📚" },
    { id: "progress", name: "Progress", icon: "📊" },
    { id: "profile", name: "Profile", icon: "👤" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Fluento AI
              </h1>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-medium text-gray-900">
                Welcome back, {session?.user?.name}!
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Plan: {session?.user?.subscriptionType || "Free"}
                </span>
                {session?.user?.subscriptionType === "FREE" && (
                  <button className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Conversations</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Lessons Complete</span>
                    <span className="font-medium">8/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: "53%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Weekly Goal</span>
                    <span className="font-medium">3/5 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "chat" && (
              <div className="h-[calc(100vh-200px)]">
                <ChatInterface 
                  sessionId={currentSessionId}
                  onSessionCreate={setCurrentSessionId}
                />
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Spanish Lessons</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Lesson cards would go here */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Lessons coming soon!</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-sm text-gray-600">Messages Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">18</div>
                        <div className="text-sm text-gray-600">New Words Learned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">45</div>
                        <div className="text-sm text-gray-600">Minutes Practiced</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={session?.user?.name || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={session?.user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Level
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}