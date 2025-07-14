import { Message } from "ai";
import Markdown from "@/components/ui/markdown";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div key={message.id} className="w-full">
      { message.role === 'user' ? 
      <h2 className="text-foreground text-5xl font-medium tracking-tight border-b border-primary/50 pb-2 w-full">
        {message.content}
      </h2> : <div className="w-full text-lg">
        <Markdown>{message.content}</Markdown>
      </div>
      }
    </div>
  );
}