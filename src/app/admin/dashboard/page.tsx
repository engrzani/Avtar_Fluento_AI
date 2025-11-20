"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

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

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "TEACHER") {
    redirect("/dashboard")
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "lessons", name: "Lessons", icon: "📚" },
    { id: "analytics", name: "Analytics", icon: "📈" },
  ]

  const stats = [
    { title: "Total Students", value: "1,234", change: "+12%", color: "blue" },
    { title: "Active Lessons", value: "89", change: "+5%", color: "green" },
    { title: "Conversations Today", value: "456", change: "+23%", color: "purple" },
    { title: "Average Score", value: "87%", change: "+3%", color: "orange" },
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
                {session?.user?.role === "ADMIN" ? "Admin" : "Teacher"} Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {session?.user?.name}
              </span>
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">JS</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">John Smith</p>
                        <p className="text-sm text-gray-600">Started lesson: Basic Greetings</p>
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">MJ</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Maria Johnson</p>
                        <p className="text-sm text-gray-600">Completed AI conversation session</p>
                      </div>
                      <span className="text-sm text-gray-500">5 min ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">AB</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Alex Brown</p>
                        <p className="text-sm text-gray-600">Achieved 90% score in pronunciation</p>
                      </div>
                      <span className="text-sm text-gray-500">12 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <p className="text-gray-600 mt-1">Manage student accounts and progress</p>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Subscription</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">John Smith</td>
                          <td className="py-3 px-4">john@example.com</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Student
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Lesson Management</h2>
                      <p className="text-gray-600 mt-1">Create and manage Spanish lessons</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
                      Create New Lesson
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Published
                        </span>
                        <span className="text-sm text-gray-500">Beginner</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Greetings</h3>
                      <p className="text-gray-600 text-sm mb-4">Learn essential Spanish greetings and introductions</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">45 students</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Create new lesson</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Detailed analytics and reporting features coming soon. Track student progress, lesson effectiveness, and platform usage.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}