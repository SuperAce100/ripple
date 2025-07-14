import { Message } from "ai";
import Markdown from "@/components/ui/markdown";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div key={message.id} className="w-full">
      { message.role === 'user' ? 
      <div className="ml-auto bg-primary text-primary-foreground p-4 rounded-2xl w-fit border border-primary shadow-sm max-w-xl">
        <div className="text-xs text-muted-foreground">User</div>
        <div className="text-md">{message.content}</div>
      </div> : <div className="mr-auto bg-gray-100 p-4 rounded-2xl w-fit border border-gray-300 shadow-sm">
        <div className="text-xs text-muted-foreground">Speedy AI</div>
        <div className="text-md"><Markdown>{message.content}</Markdown></div>
      </div>
      }
    </div>
  );
}