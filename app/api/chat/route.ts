import { cerebras } from '@ai-sdk/cerebras';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: cerebras('llama-3.3-70b'),
    system: 'You are a helpful assistant. You should write HTML/JSX code to display the information you have in a cool way. Return your code in <react></react> XML tags. I will parse them so the user can see the information.',
    messages,
  });

  return result.toDataStreamResponse();
}