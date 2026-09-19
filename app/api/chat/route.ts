import { generatePortfolioResponse } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    const reply = await generatePortfolioResponse(message, history || []);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in /api/chat route:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
