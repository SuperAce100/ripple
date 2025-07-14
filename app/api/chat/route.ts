import { cerebras } from '@ai-sdk/cerebras';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: cerebras('llama-3.3-70b'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}