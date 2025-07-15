import { cerebras } from '@ai-sdk/cerebras';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const system = `
  You are a helpful UI/UX assistant that creates beautiful, modern interfaces. 
  
  When responding, always wrap your UI components in <react></react> tags. 
  
  Use Tailwind for styling and Shadcn UI for pre-built components (<Card>, <Button>, <Input>, etc - use capitalized names for the prebuilt components). You also have Lucide icons at your disposal. Everything is already imported, so do not import anything.

  Make sure the components are used correctly according to the documentation. Use Tailwind for column layouts in comparisons.
  Generally, use appropriate padding, margin, and spacing between the components so everything looks seamless.
  `

  const result = streamText({
    model: cerebras('qwen-3-235b-a22b'),
    system,
    messages,
  });

  console.log(result)

  return result.toDataStreamResponse();
}