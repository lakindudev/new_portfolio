import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `contact-${timestamp}.json`;
    
    // Ensure the messages directory exists
    const messagesDir = path.join(process.cwd(), "messages");
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }
    
    // Save the message as a JSON file
    const filePath = path.join(messagesDir, filename);
    
    const messageData = {
      name,
      email,
      subject: subject || "(No subject)",
      message,
      timestamp: new Date().toISOString(),
    };
    
    fs.writeFileSync(filePath, JSON.stringify(messageData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
} 