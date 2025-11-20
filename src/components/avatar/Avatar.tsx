"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface AvatarProps {
  isListening?: boolean
  isSpeaking?: boolean
  isThinking?: boolean
  name?: string
}

export default function Avatar({ 
  isListening = false, 
  isSpeaking = false, 
  isThinking = false, 
  name = "Sofia" 
}: AvatarProps) {
  const [blinkAnimation, setBlinkAnimation] = useState(false)

  // Blinking animation
  useEffect(() => {
    if (!isSpeaking) {
      const blinkInterval = setInterval(() => {
        setBlinkAnimation(true)
        setTimeout(() => setBlinkAnimation(false), 150)
      }, Math.random() * 3000 + 2000) // Random blink between 2-5 seconds

      return () => clearInterval(blinkInterval)
    }
  }, [isSpeaking])

  const getAvatarState = () => {
    if (isThinking) return "thinking"
    if (isSpeaking) return "speaking"
    if (isListening) return "listening"
    return "idle"
  }

  const avatarState = getAvatarState()

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Container */}
      <div className="relative">
        {/* Main Avatar Circle */}
        <motion.div
          className={`w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden ${
            avatarState === "listening" ? "bg-gradient-to-br from-red-400 to-red-600" :
            avatarState === "speaking" ? "bg-gradient-to-br from-green-400 to-green-600" :
            avatarState === "thinking" ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
            "bg-gradient-to-br from-blue-500 to-purple-600"
          }`}
          animate={{
            scale: isSpeaking ? [1, 1.05, 1] : isListening ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: isSpeaking ? 0.5 : isListening ? 1.5 : 0.3,
            repeat: (isSpeaking || isListening) ? Infinity : 0,
          }}
        >
          {/* Face */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-6 flex space-x-3">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scaleY: blinkAnimation ? 0.1 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scaleY: blinkAnimation ? 0.1 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Mouth */}
            <div className="absolute bottom-6">
              {avatarState === "speaking" ? (
                <motion.div
                  className="w-4 h-3 bg-white rounded-full"
                  animate={{
                    scaleX: [1, 1.3, 0.8, 1.2, 1],
                    scaleY: [1, 0.8, 1.2, 0.9, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : avatarState === "thinking" ? (
                <div className="w-3 h-2 bg-white rounded-full" />
              ) : (
                <div className="w-4 h-1 bg-white rounded-full" />
              )}
            </div>

            {/* Nose */}
            <div className="absolute top-1/2 w-1 h-1 bg-white/60 rounded-full" />
          </div>

          {/* Audio Wave Animation (when speaking) */}
          {isSpeaking && (
            <div className="absolute -right-8 flex items-center space-x-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-green-400 rounded-full"
                  animate={{
                    height: [8, 16, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Listening Indicator */}
          {isListening && (
            <div className="absolute -left-8 flex items-center">
              <motion.div
                className="w-3 h-3 bg-red-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
          )}

          {/* Thinking Dots */}
          {isThinking && (
            <div className="absolute -top-8 flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl -z-10 ${
            avatarState === "listening" ? "bg-red-400/30" :
            avatarState === "speaking" ? "bg-green-400/30" :
            avatarState === "thinking" ? "bg-yellow-400/30" :
            "bg-blue-500/20"
          }`}
          animate={{
            scale: isSpeaking ? [1, 1.2, 1] : isListening ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: isSpeaking ? 0.5 : 2,
            repeat: (isSpeaking || isListening) ? Infinity : 0,
          }}
        />
      </div>

      {/* Name and Status */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className={`text-sm ${
          avatarState === "listening" ? "text-red-600" :
          avatarState === "speaking" ? "text-green-600" :
          avatarState === "thinking" ? "text-yellow-600" :
          "text-gray-500"
        }`}>
          {avatarState === "listening" ? "Listening..." :
           avatarState === "speaking" ? "Speaking..." :
           avatarState === "thinking" ? "Thinking..." :
           "Ready to chat"}
        </p>
      </div>
    </div>
  )
}