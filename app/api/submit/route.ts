import { NextRequest } from "next/server";

interface Speaker {
  id: string;
  name: string;
  info: string;
}

interface SpeechTranslationRequestBody {
  speakers: Speaker[];
  url: string;
  context?: string;
  topicName: string;
  topicId: string[];
}

interface SubmitResponse {
  message: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: SpeechTranslationRequestBody = await request.json();
    console.log("received :" + JSON.stringify(body));
    return new Response(
      JSON.stringify({ message: "Good job!" } as SubmitResponse),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request" } as SubmitResponse),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
}
