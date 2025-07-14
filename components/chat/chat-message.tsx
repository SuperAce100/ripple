import { Message } from "ai";
import Markdown from "@/components/ui/markdown";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div key={message.id} className="w-full">
      { message.role === 'user' ? 
      <h2 className="text-foreground text-4xl font-bold tracking-tight border-b border-primary pb-2 w-full">
        {message.content}
      </h2> : <div className="w-full text-md">
        <Markdown>{message.content}</Markdown>
      </div>
      }
    </div>
  );
}