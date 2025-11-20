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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Fluento AI
                </h1>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👋</span>
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                  ¡Hola, {session?.user?.name?.split(' ')[0]}!
                </h2>
              </div>
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
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center">
                      <span className="text-blue-500 mr-1">💬</span>
                      Conversations
                    </span>
                    <span className="font-bold text-blue-600">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-sm" style={{ width: "60%" }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Great progress!</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center">
                      <span className="text-green-500 mr-1">📚</span>
                      Lessons Complete
                    </span>
                    <span className="font-bold text-green-600">8/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full shadow-sm" style={{ width: "53%" }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Keep it up!</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center">
                      <span className="text-purple-500 mr-1">🎯</span>
                      Weekly Goal
                    </span>
                    <span className="font-bold text-purple-600">3/5 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full shadow-sm" style={{ width: "60%" }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Almost there!</div>
                </div>
              </div>
              
              {/* Streak Counter */}
              <div className="mt-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium opacity-90">Daily Streak</div>
                    <div className="text-2xl font-bold">7 days</div>
                  </div>
                  <div className="text-2xl">🔥</div>
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
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Spanish Lessons</h2>
                </div>
                
                {/* Coming Soon Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Structured Lessons Coming Soon!</h3>
                      <p className="text-gray-600">For now, practice your Spanish with Sofia in the AI Chat tab.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Preview Lesson Cards */}
                  {[
                    { title: "Basic Greetings", level: "Beginner", icon: "👋", color: "from-green-400 to-green-500", status: "Coming Soon" },
                    { title: "Present Tense", level: "Intermediate", icon: "⏰", color: "from-blue-400 to-blue-500", status: "Coming Soon" },
                    { title: "Food & Dining", level: "Beginner", icon: "🍽️", color: "from-orange-400 to-orange-500", status: "Coming Soon" },
                    { title: "Travel Phrases", level: "Intermediate", icon: "✈️", color: "from-purple-400 to-purple-500", status: "Coming Soon" },
                    { title: "Business Spanish", level: "Advanced", icon: "💼", color: "from-red-400 to-red-500", status: "Coming Soon" },
                    { title: "Cultural Context", level: "All Levels", icon: "🌎", color: "from-indigo-400 to-indigo-500", status: "Coming Soon" }
                  ].map((lesson, index) => (
                    <div key={index} className="relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-not-allowed opacity-75">
                      <div className="absolute top-4 right-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          {lesson.status}
                        </span>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${lesson.color} rounded-xl flex items-center justify-center mb-4`}>
                        <span className="text-white text-xl">{lesson.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{lesson.level}</p>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
                </div>
                <div className="space-y-6">
                  {/* Weekly Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-600 mr-2">📈</span>
                      Weekly Summary
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-blue-600 mb-1">24</div>
                        <div className="text-sm text-gray-600">Messages Sent</div>
                        <div className="text-xs text-green-600 mt-1">↑ 12% from last week</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                        <div className="text-sm text-gray-600">New Words Learned</div>
                        <div className="text-xs text-green-600 mt-1">↑ 8% from last week</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-purple-600 mb-1">45</div>
                        <div className="text-sm text-gray-600">Minutes Practiced</div>
                        <div className="text-xs text-green-600 mt-1">↑ 25% from last week</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Breakdown */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-600 mr-2">🎯</span>
                      Skills Breakdown
                    </h3>
                    <div className="space-y-4">
                      {[
                        { skill: "Speaking", level: 78, color: "from-blue-500 to-blue-600", icon: "🎤" },
                        { skill: "Listening", level: 65, color: "from-green-500 to-green-600", icon: "👂" },
                        { skill: "Vocabulary", level: 82, color: "from-purple-500 to-purple-600", icon: "📖" },
                        { skill: "Grammar", level: 71, color: "from-orange-500 to-orange-600", icon: "✏️" }
                      ].map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 flex items-center">
                              <span className="mr-2">{item.icon}</span>
                              {item.skill}
                            </span>
                            <span className="text-sm font-bold text-gray-900">{item.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-sm transition-all duration-500`} 
                              style={{ width: `${item.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-yellow-600 mr-2">🏆</span>
                      Recent Achievements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: "First Conversation", desc: "Completed your first AI chat session", icon: "💬", earned: true },
                        { title: "Week Warrior", desc: "Practiced 5 days in a row", icon: "🔥", earned: true },
                        { title: "Vocabulary Master", desc: "Learn 50 new words", icon: "📚", earned: false },
                        { title: "Grammar Guru", desc: "Perfect grammar score", icon: "✅", earned: false }
                      ].map((achievement, index) => (
                        <div key={index} className={`bg-white rounded-lg p-4 flex items-center space-x-3 ${achievement.earned ? 'shadow-sm' : 'opacity-50'}`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                            <span className="text-lg">{achievement.icon}</span>
                          </div>
                          <div>
                            <div className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>{achievement.title}</div>
                            <div className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>{achievement.desc}</div>
                          </div>
                        </div>
                      ))}
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