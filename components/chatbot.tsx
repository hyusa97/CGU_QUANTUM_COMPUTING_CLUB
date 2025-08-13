"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hi! I'm your Quantum Computing Club assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions = [
    "What is quantum computing?",
    "How can I join the club?",
    "Tell me about upcoming events",
    "What resources do you recommend?",
  ]

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const newMessages = [...messages, { type: "user", content: message }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationHistory: newMessages.slice(1), // Exclude initial bot message
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages((prev) => [...prev, { type: "bot", content: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "Sorry, I'm having trouble responding right now. Please try again later." },
        ])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Sorry, I'm having trouble responding right now. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-slate-800/95 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
              QC Club Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-4">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "bot"
                      ? "bg-blue-500/20 text-blue-100 mr-4"
                      : "bg-purple-500/20 text-purple-100 ml-4"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-blue-500/20 text-blue-100 mr-4 p-3 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-gray-400">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:border-purple-500"
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage(input)}
                disabled={isLoading}
              />
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600"
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
