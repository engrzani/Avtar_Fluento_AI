import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, sessionId } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create or get chat session
    let chatSession
    if (sessionId) {
      chatSession = await prisma.chatSession.findFirst({
        where: {
          id: sessionId,
          userId: session.user.id,
        },
        include: {
          messages: {
            orderBy: { timestamp: "asc" },
            take: 10, // Get last 10 messages for context
          },
        },
      })
    }

    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          userId: session.user.id,
          title: `Chat ${new Date().toLocaleDateString()}`,
        },
        include: {
          messages: true,
        },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        role: "USER",
        content: message,
      },
    })

    // Create conversation context for Spanish learning
    const systemPrompt = `You are Sofia, a friendly and enthusiastic Spanish tutor AI. Your role is to help users learn Spanish through natural conversation. 

Guidelines:
- Always respond in a mix of Spanish and English, gradually increasing Spanish as the user improves
- Provide gentle corrections when users make mistakes
- Ask engaging questions to keep the conversation flowing
- Focus on practical, everyday Spanish
- Be encouraging and supportive
- If the user seems to be a beginner, speak more in English with simple Spanish phrases
- If the user is advanced, speak mostly in Spanish
- Always provide translations for new Spanish words or phrases
- Make learning fun and interactive

Current conversation context: This is a Spanish learning session. Help the user practice Spanish conversation naturally.`

    // Prepare messages for OpenAI
    const messages = [
      { role: "system", content: systemPrompt },
      ...chatSession.messages.map((msg) => ({
        role: msg.role === "USER" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      max_tokens: 300,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || "Lo siento, no pude entender. (Sorry, I couldn't understand.)"

    // Save AI response
    const savedMessage = await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        role: "ASSISTANT",
        content: aiResponse,
      },
    })

    return NextResponse.json({
      message: aiResponse,
      sessionId: chatSession.id,
      messageId: savedMessage.id,
    })

  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}