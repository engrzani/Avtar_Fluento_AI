"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Redirect authenticated users to their dashboard
      if (session.user.role === "ADMIN" || session.user.role === "TEACHER") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Fluento AI
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left lg:text-left">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 text-blue-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Learning
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Spanish with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Sofia, Your AI Tutor
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Master Spanish through natural conversations with our AI tutor Sofia. Practice speaking, 
              get instant feedback, and accelerate your language learning journey with personalized lessons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
              <Link
                href="#demo"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </Link>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <span>10k+ learners</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Visual */}
          <div className="relative">
            {/* Main Character Illustration */}
            <div className="relative z-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                {/* Sofia Avatar */}
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 relative overflow-hidden shadow-lg">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-4xl">👩‍🏫</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Hola! I'm Sofia</h3>
                <p className="text-gray-600 text-sm mb-4">Your AI Spanish teacher</p>
              </div>
              
              {/* Chat Bubble */}
              <div className="bg-white rounded-2xl p-4 shadow-lg relative">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
                <div className="text-gray-800 text-sm mb-2">
                  "¡Hola! ¿Cómo estás? Let's practice Spanish together!"
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Speaking...</span>
                  <div className="flex space-x-1 ml-2">
                    <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 -left-4 w-20 h-20 bg-yellow-200 rounded-2xl flex items-center justify-center text-2xl transform -rotate-12 shadow-lg">
              🇪🇸
            </div>
            <div className="absolute bottom-4 -right-4 w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center text-xl transform rotate-12 shadow-lg">
              🎯
            </div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-lg transform rotate-6 shadow-lg">
              💬
            </div>
          </div>
        </div>

        {/* App Preview Section */}
        <div id="demo" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Fluento AI in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven Spanish learning
            </p>
          </div>
          
          {/* App Screenshot Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
              <div className="bg-gray-800 rounded-2xl p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-700 rounded-lg h-6 ml-4 flex items-center px-3">
                    <span className="text-gray-400 text-xs">fluento-ai.com/dashboard</span>
                  </div>
                </div>
                
                {/* Dashboard Preview */}
                <div className="bg-white rounded-xl p-6 grid md:grid-cols-3 gap-6">
                  {/* Chat Interface Preview */}
                  <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Sofia - AI Tutor</div>
                        <div className="text-xs text-green-500">● Online</div>
                      </div>
                    </div>
                    
                    {/* Sample Messages */}
                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm max-w-xs">
                          Hola Sofia, ¿cómo estás?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white px-3 py-2 rounded-lg text-sm max-w-xs shadow-sm">
                          ¡Hola! Estoy muy bien, gracias. Your pronunciation is excellent! 🎉
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm max-w-xs">
                          ¿Puedes enseñarme más verbos?
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Sidebar */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-3 text-white">
                      <div className="text-xs font-semibold mb-1">Daily Streak</div>
                      <div className="text-2xl font-bold">7 days</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs font-semibold text-gray-600 mb-2">Progress</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Speaking</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Fluento AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven language learning methods
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl text-white">🤖</div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">AI-Powered Conversations</h3>
              <p className="text-gray-600 mb-4">
                Practice speaking Spanish with Sofia, our intelligent AI tutor that adapts to your learning style and provides personalized feedback.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span>Try it now</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl text-white">🎤</div>
                </div>
                <div className="absolute -top-1 -right-1 flex space-x-1">
                  <div className="w-2 h-6 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-8 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-4 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Voice Recognition</h3>
              <p className="text-gray-600 mb-4">
                Perfect your pronunciation with advanced speech recognition technology that provides instant feedback on your speaking skills.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <span>Start speaking</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl text-white">📊</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="text-xs">📈</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Progress Tracking</h3>
              <p className="text-gray-600 mb-4">
                Monitor your learning journey with detailed analytics, streaks, and personalized lesson recommendations.
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Current Level</span>
                  <span>Intermediate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <span>View progress</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Lessons</h4>
              <p className="text-sm text-gray-600">Adaptive curriculum based on your progress</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Feedback</h4>
              <p className="text-sm text-gray-600">Real-time corrections and suggestions</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-3xl mb-3">🌟</div>
              <h4 className="font-semibold text-gray-900 mb-2">Gamification</h4>
              <p className="text-sm text-gray-600">Earn points, streaks, and achievements</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-semibold text-gray-900 mb-2">Cultural Context</h4>
              <p className="text-sm text-gray-600">Learn about Spanish-speaking cultures</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to speak Spanish fluently?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners who are already improving their Spanish with Fluento AI
            </p>
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Fluento AI</h3>
            <p className="text-gray-400 mb-4">
              The future of language learning is here.
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Fluento AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
