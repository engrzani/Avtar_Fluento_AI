"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Play, Users } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: number
  enrolledCount: number
  isPublished: boolean
}

interface Exercise {
  id: string
  title: string
  type: "MULTIPLE_CHOICE" | "FILL_BLANK" | "SPEAKING" | "LISTENING"
  difficulty: "EASY" | "MEDIUM" | "HARD"
  lessonId: string
}

export default function LessonManagement() {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "Basic Greetings",
      description: "Learn how to greet people in Spanish",
      level: "BEGINNER",
      duration: 15,
      enrolledCount: 24,
      isPublished: true,
    },
    {
      id: "2",
      title: "Present Tense Verbs",
      description: "Master regular and irregular verbs in present tense",
      level: "INTERMEDIATE",
      duration: 25,
      enrolledCount: 18,
      isPublished: true,
    },
    {
      id: "3",
      title: "Subjunctive Mood",
      description: "Understanding and using the subjunctive mood",
      level: "ADVANCED",
      duration: 35,
      enrolledCount: 7,
      isPublished: false,
    },
  ])

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      title: "Greeting Vocabulary",
      type: "MULTIPLE_CHOICE",
      difficulty: "EASY",
      lessonId: "1",
    },
    {
      id: "2",
      title: "Pronunciation Practice",
      type: "SPEAKING",
      difficulty: "EASY",
      lessonId: "1",
    },
    {
      id: "3",
      title: "Verb Conjugation",
      type: "FILL_BLANK",
      difficulty: "MEDIUM",
      lessonId: "2",
    },
  ])

  const [showLessonModal, setShowLessonModal] = useState(false)
  const [showExerciseModal, setShowExerciseModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-green-100 text-green-800"
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-800"
      case "ADVANCED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "MULTIPLE_CHOICE":
        return "bg-blue-100 text-blue-800"
      case "FILL_BLANK":
        return "bg-purple-100 text-purple-800"
      case "SPEAKING":
        return "bg-orange-100 text-orange-800"
      case "LISTENING":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const LessonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedLesson ? "Edit Lesson" : "Create New Lesson"}
          </h2>
          <button
            onClick={() => {
              setShowLessonModal(false)
              setSelectedLesson(null)
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              defaultValue={selectedLesson?.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter lesson title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              defaultValue={selectedLesson?.description}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter lesson description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                defaultValue={selectedLesson?.level || "BEGINNER"}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                defaultValue={selectedLesson?.duration || 15}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={selectedLesson?.isPublished}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Publish lesson immediately
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => {
              setShowLessonModal(false)
              setSelectedLesson(null)
            }}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors">
            {selectedLesson ? "Update Lesson" : "Create Lesson"}
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lesson Management</h1>
          <p className="text-gray-600 mt-1">Create and manage Spanish learning lessons</p>
        </div>
        <button
          onClick={() => setShowLessonModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Lesson</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lessons</p>
              <p className="text-3xl font-bold text-gray-900">{lessons.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-gray-900">
                {lessons.filter(l => l.isPublished).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exercises</p>
              <p className="text-3xl font-bold text-gray-900">{exercises.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-3xl font-bold text-gray-900">
                {lessons.reduce((sum, lesson) => sum + lesson.enrolledCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Lessons</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                      <p className="text-sm text-gray-500">{lesson.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor(lesson.level)}`}>
                      {lesson.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {lesson.duration} min
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {lesson.enrolledCount} students
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lesson.isPublished 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {lesson.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setShowLessonModal(true)
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exercises Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Exercises</h2>
          <button
            onClick={() => setShowExerciseModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Exercise</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lesson
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exercises.map((exercise) => {
                const lesson = lessons.find(l => l.id === exercise.lessonId)
                return (
                  <tr key={exercise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {exercise.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(exercise.type)}`}>
                        {exercise.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        exercise.difficulty === "EASY" 
                          ? "bg-green-100 text-green-800"
                          : exercise.difficulty === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lesson?.title || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedExercise(exercise)
                          setShowExerciseModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showLessonModal && <LessonModal />}
    </div>
  )
}