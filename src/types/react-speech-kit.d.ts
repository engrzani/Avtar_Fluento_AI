declare module 'react-speech-kit' {
  export interface UseSpeechSynthesisOptions {
    onEnd?: () => void
  }

  export interface SpeechSynthesisHook {
    speak: (options: { text: string; voice?: SpeechSynthesisVoice }) => void
    cancel: () => void
    speaking: boolean
    supported: boolean
  }

  export interface UseSpeechRecognitionOptions {
    onResult: (result: string) => void
    onEnd?: () => void
    onError?: (error: any) => void
  }

  export interface SpeechRecognitionHook {
    listen: (options?: { continuous?: boolean; interimResults?: boolean }) => void
    listening: boolean
    stop: () => void
    supported: boolean
  }

  export function useSpeechSynthesis(options?: UseSpeechSynthesisOptions): SpeechSynthesisHook
  export function useSpeechRecognition(options: UseSpeechRecognitionOptions): SpeechRecognitionHook
}