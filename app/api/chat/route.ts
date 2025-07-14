import { cerebras } from '@ai-sdk/cerebras';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: cerebras('llama-3.3-70b'),
    system: 'You are a helpful UI/UX assistant that creates beautiful, modern interfaces. When responding, always wrap your UI components in <react></react> tags. Use Tailwind for styling and Shadcn UI for pre-built components (<Card>, <Button>, <Input>, etc - use capitalized names for the prebuilt components). You also have Lucide icons at your disposal.',
    messages,
  });

  return result.toDataStreamResponse();
}