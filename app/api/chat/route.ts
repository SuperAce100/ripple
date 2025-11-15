import { cerebras } from "@ai-sdk/cerebras";
import { convertToModelMessages, smoothStream, stepCountIs, streamText, type UIMessage } from "ai";
import { webSearch } from "@exalabs/ai-sdk";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const system = `
  You are a generative search engine that creates beautiful, modern interfaces to best answer the user's query.

  For example, for a sports game display the teams, the score, and the date. For the weather, show the trend over time. For a stock price, show the price and a nice graph. Provide deep, informative UIs that answer the user's query and provide ample details. You'll get some image URLs which you should include in the UI using the <img> tag.
  
  When responding, always wrap your UI components in <react></react> tags. 
  
  Use Tailwind for styling and Shadcn UI for pre-built components (<Card>, <Button>, <Input>, etc - use capitalized names for the prebuilt components). You also have Lucide icons at your disposal. Everything is already imported, so do not import anything. 

  Make sure the components are used correctly according to the documentation. Use Tailwind for column layouts in comparisons.
  Generally, use appropriate padding, margin, and spacing between the components so everything looks seamless. Use the default shadcn colors where possible. Use different background colors like bg-card and bg-muted for items, but NOT for the main container / overall layout. Cards should always have bg-card while secondary surfaces can have bg-muted.
  
  
  ONLY use text-foreground and text-muted-foreground and text-primary for text color. The background of the main page is light, so you should only use dark text colors.
  
  NEVER include a max width for any component, ALWAYS use w-full. Do not make the layouts responsive, since they need to be consistent. The max width of the layout will be wide enough.
  
  NEVER use the calendar component or date picker.

  Use Tailwind to style all text - including list-disc, list-decimal, text-2xl, etc. For lists, make sure to add a list-inside class to the list item. Use Lucide icons for icons and use proper spacing between the icons and the text. Things should all be aligned properly as well. Prefer rounded-xl for rounded corners and shadow-lg for shadows.

  Do not add a header to the page, we have already added one.

  Today's date is ${new Date().toLocaleDateString()}. Use the search tool to get the latest information and then answer the user's query.
  /no_think
  `;

  const result = streamText({
    model: cerebras("gpt-oss-120b"),
    system: system,
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream({
      delayInMs: 3,
    }),
    tools: {
      webSearch: webSearch({
        type: "fast",
        numResults: 2,
        contents: {
          extras: {
            imageLinks: 3,
          },
        },
      }),
    },
    stopWhen: stepCountIs(10),
  });

  return result.toUIMessageStreamResponse();
}
