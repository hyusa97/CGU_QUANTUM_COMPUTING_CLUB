import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, conversationHistory } = await req.json()

    const hasApiKey = !!process.env.OPENAI_API_KEY

    if (hasApiKey) {
      // Use AI SDK with OpenAI when API key is available
      const clubContext = `You are an AI assistant for the Quantum Computing Club at CV Raman Global University in Bhubaneswar, Odisha. 

Club Information:
- Founded by Hyusa and team
- Located at CV Raman Global University, Bhubaneswar, Odisha, 752054
- Contact: hyusa97@gmail.com, Phone: +91 9748338780
- Social Media: Instagram @quantumclub_cgu, LinkedIn: Quantum Computing Club
- 50+ active members, 25+ workshops conducted, 10+ research projects

Recent Achievements:
- Won IBM Qiskit Global Challenge 2024
- New quantum lab with IBM Quantum Network access
- Partnership with Google Quantum AI
- Student research published in Nature Quantum

Upcoming Events:
- Quantum Algorithms Workshop (Feb 20, 2024)
- IBM Qiskit Certification Prep (Feb 25, 2024)
- Quantum Career Panel (Mar 5, 2024)

Club Activities:
- Weekly workshops on quantum algorithms
- Hands-on Qiskit programming sessions
- Research projects and publications
- Industry networking events
- Interactive quantum games (Quantum Tic Tac Toe)

Resources:
- IBM Qiskit tutorials
- Microsoft Quantum Development Kit
- Access to real quantum computers via IBM Quantum Network
- Curated learning materials and research papers

Be helpful, knowledgeable about quantum computing concepts, and enthusiastic about the club. Provide specific information when asked about events, joining procedures, or club activities. Keep responses concise but informative.`

      const conversationContext = conversationHistory
        .map((msg: any) => `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n")

      const prompt = `${clubContext}

Previous conversation:
${conversationContext}

User: ${message}

Please provide a helpful response about the Quantum Computing Club or quantum computing in general.`

      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: prompt,
        maxTokens: 150,
        temperature: 0.7,
      })

      return new Response(JSON.stringify({ response: text }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      const lowerMessage = message.toLowerCase()
      let response = ""

      if (lowerMessage.includes("quantum computing") || lowerMessage.includes("what is quantum")) {
        response =
          "Quantum computing uses quantum mechanical phenomena like superposition and entanglement to process information. Our club explores these concepts through hands-on workshops and research projects!"
      } else if (lowerMessage.includes("join") || lowerMessage.includes("membership")) {
        response =
          "To join the Quantum Computing Club, contact us at hyusa97@gmail.com or call +91 9748338780. We welcome students interested in quantum computing and related technologies!"
      } else if (lowerMessage.includes("events") || lowerMessage.includes("workshop")) {
        response =
          "We have exciting upcoming events: Quantum Algorithms Workshop (Feb 20), IBM Qiskit Certification Prep (Feb 25), and Quantum Career Panel (Mar 5). Check our club activity page for registration!"
      } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
        response =
          "You can reach us at hyusa97@gmail.com, call +91 9748338780, or follow us on Instagram @quantumclub_cgu. We're located at CV Raman Global University, Bhubaneswar, Odisha."
      } else if (lowerMessage.includes("games") || lowerMessage.includes("tic tac toe")) {
        response =
          "Try our Quantum Tic Tac Toe game! It demonstrates quantum concepts like superposition where moves can exist in multiple states until measured. Check out our games section!"
      } else if (lowerMessage.includes("achievements") || lowerMessage.includes("awards")) {
        response =
          "We're proud of our achievements: Won IBM Qiskit Global Challenge 2024, established a quantum lab with IBM Quantum Network access, and partnered with Google Quantum AI!"
      } else {
        response =
          "Hello! I'm here to help with questions about the Quantum Computing Club. Ask me about joining, events, quantum computing concepts, or our achievements. How can I assist you today?"
      }

      return new Response(JSON.stringify({ response }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
