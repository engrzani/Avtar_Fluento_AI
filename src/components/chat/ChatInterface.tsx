"use client"

import { useState, useRef, useEffect } from "react"
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit"
import { motion, AnimatePresence } from "framer-motion"
import Avatar from "@/components/avatar/Avatar"

interface Message {
  id: string
  role: "USER" | "ASSISTANT"
  content: string
  timestamp: Date
  audioUrl?: string
}

interface ChatInterfaceProps {
  sessionId?: string
  onSessionCreate?: (sessionId: string) => void
}

export default function ChatInterface({ sessionId, onSessionCreate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(sessionId)
  const [avatarState, setAvatarState] = useState<"idle" | "listening" | "speaking" | "thinking">("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech synthesis
  const { speak, cancel, speaking, supported: speechSupported } = useSpeechSynthesis({
    onEnd: () => setAvatarState("idle")
  })

  // Speech recognition
  const {
    listen,
    listening,
    stop,
    supported: recognitionSupported
  } = useSpeechRecognition({
    onResult: (result: string) => {
      setInput(result)
      setAvatarState("idle")
    },
  })

  useEffect(() => {
    setAvatarState(listening ? "listening" : "idle")
  }, [listening])

  useEffect(() => {
    setAvatarState(speaking ? "speaking" : "idle")
  }, [speaking])

  useEffect(() => {
    setAvatarState(isLoading ? "thinking" : "idle")
  }, [isLoading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "USER",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setAvatarState("thinking")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: currentSessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      if (!currentSessionId && data.sessionId) {
        setCurrentSessionId(data.sessionId)
        onSessionCreate?.(data.sessionId)
      }

      const aiMessage: Message = {
        id: data.messageId || Date.now().toString(),
        role: "ASSISTANT",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])

      // Auto-speak AI response if speech is supported
      if (speechSupported) {
        setAvatarState("speaking")
        speak({
          text: data.message,
          voice: getSpanishVoice(),
        })
      }

    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "ASSISTANT",
        content: "Lo siento, hubo un error. Por favor, inténtalo de nuevo. (Sorry, there was an error. Please try again.)",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getSpanishVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    return voices.find(voice => 
      voice.lang.startsWith('es') || voice.name.includes('Spanish')
    ) || voices[0]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const speakMessage = (text: string) => {
    if (speaking) {
      cancel()
    }
    setAvatarState("speaking")
    speak({
      text,
      voice: getSpanishVoice(),
    })
  }

  const toggleListening = () => {
    if (listening) {
      stop()
      setAvatarState("idle")
    } else {
      listen({ continuous: true, interimResults: false })
      setAvatarState("listening")
    }
  }

  return (
    <div className="flex h-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Avatar Section */}
      <div className="w-80 bg-gradient-to-b from-blue-50 to-purple-50 p-8 flex flex-col items-center justify-center border-r border-gray-200">
        <Avatar 
          isListening={avatarState === "listening"}
          isSpeaking={avatarState === "speaking"}
          isThinking={avatarState === "thinking"}
          name="Sofia"
        />
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            ¡Hola! I&apos;m here to help you practice Spanish.
          </p>
          <div className="flex space-x-2">
            {recognitionSupported && (
              <button
                onClick={toggleListening}
                className={`p-3 rounded-full transition-colors ${
                  listening
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={listening ? "Stop listening" : "Start voice input"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            )}
            {speaking && (
              <button
                onClick={cancel}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Stop speaking"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Spanish Practice Chat</h2>
          <p className="text-sm text-gray-500">Practice your Spanish with Sofia</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¡Hola! I&apos;m Sofia 👋
                </h3>
                <p className="text-gray-600 mb-4">
                  Let&apos;s start a conversation in Spanish!
                </p>
                <p className="text-sm text-gray-500">
                  Try saying: &ldquo;Hola Sofia, ¿cómo estás?&rdquo;
                </p>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "USER" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.role === "USER"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.role === "ASSISTANT" && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 9v6l4-3-4-3z" />
                      </svg>
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message in Spanish or English..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
          
          {listening && (
            <div className="mt-2 text-sm text-red-600 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}