import Markdown from "@/components/ui/markdown";
import { JSXPreview } from "@/components/ui/jsx-preview";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain } from "lucide-react";

function Thinking({ children }: { children: React.ReactNode }) {

    return <div className="w-full"></div>

    return <Accordion type="single" collapsible className="w-full px-4 rounded-2xl border-primary/20 border hover:border-primary/60">
      <AccordionItem
        value="thinking" >
      <AccordionTrigger className="w-full">
        <div className="flex items-center gap-2 w-full text-md">
          <Brain className="w-5 h-5 text-primary" />
          <span className="">Thinking...</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="max-h-96 overflow-y-auto pb-4">
        {children}
      </AccordionContent>
      </AccordionItem>
    </Accordion>
  }


export default function GenerativeMessage({ message }: { message: string }) {
  // Split the message into parts: text and JSX blocks
  // Split the message into parts: text, JSX blocks, and thinking blocks
  const parts = message.split(/(<react>.*?<\/react>|<think>.*?<\/think>)/s);
  
  return (
      <div className="w-full text-lg relative flex flex-col gap-4 items-center justify-center">
        {parts.map((part, index) => {
          if (part.match(/<react>/)) {
            // Extract JSX content from <react> tags (handle both closed and unclosed)
            const jsx = part.includes('</react>') 
              ? part.replace(/<react>(.*?)<\/react>/s, "$1")
              : part.replace(/<react>(.*)$/s, "$1");
            return (
              <JSXPreview 
                key={index} 
                jsx={jsx} 
                isStreaming={true}
                className="w-full max-w-2xl my-4"
              />
            );
          } else if (part.match(/<think>/)) {
            // Extract thinking content from <think> tags
            const thinkingContent = part.includes('</think>') 
              ? part.replace(/<think>(.*?)<\/think>/s, "$1")
              : part.replace(/<think>(.*)$/s, "$1");
            return (
              <Thinking key={index}>
                <Markdown>{thinkingContent}</Markdown>
              </Thinking>
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