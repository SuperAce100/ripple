import Markdown from "@/components/ui/markdown";
import { JSXPreview } from "@/components/ui/jsx-preview";

export default function GenerativeMessage({ message }: { message: string }) {
  // Split the message into parts: text and JSX blocks
  const parts = message.split(/(<react>.*?<\/react>)/gs);
  
  return (
      <div className="w-full text-lg relative flex flex-col gap-4 items-center justify-center">
        {parts.map((part, index) => {
          if (part.match(/<react>/)) {
            // Extract JSX content from <react> tags (handle both closed and unclosed)
            const jsx = part.includes('</react>') 
              ? part.replace(/<react>(.*?)<\/react>/gs, "$1")
              : part.replace(/<react>(.*)$/gs, "$1");
            return (
              <JSXPreview 
                key={index} 
                jsx={jsx} 
                isStreaming={true}
              />
            );
          } else if (part.trim()) {
            // Render non-JSX parts with Markdown
            return <Markdown key={index}>{part}</Markdown>;
          }
          return null;
        })}
      </div>
  )
}