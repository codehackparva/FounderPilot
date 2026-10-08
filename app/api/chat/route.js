import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is available
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
  try {
    if (!genAI) {
      return Response.json(
        { text: "Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();
    
    // Use gemini-3.8-flash for fast, high-quality responses (avoids 503 on latest)
    const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
    
    // Format previous messages for context
    const chatHistory = (history || []).map(msg => 
      `${msg.role === 'ai' ? 'Copilot' : 'User'}: ${msg.text}`
    ).join('\n');

    const prompt = `You are the FounderPilot Copilot, an advanced AI assistant embedded within a small business workspace dashboard. 
Your job is to help the business owner manage their workspace, analyze their sales/inventory data, draft content, and answer questions.
Keep your responses highly professional, concise, and formatted clearly (use short paragraphs or bullet points if necessary). Do not use markdown headers unnecessarily.

Here is the conversation history:
${chatHistory}

User's new message: ${message}
Copilot:`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return Response.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      { text: `Gemini Error: ${error.message || "Unknown error occurred."}` }, 
      { status: 500 }
    );
  }
}
