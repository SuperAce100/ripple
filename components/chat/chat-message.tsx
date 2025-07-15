import { Message } from "ai";
import GenerativeMessage from "./generative-message";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div key={message.id} className="w-full">
      { message.role === 'user' ? 
      <h2 className="text-foreground text-4xl font-medium tracking-tight px-2 mt-4 w-full">
        {message.content}
      </h2> : <GenerativeMessage message={message.content} />
      }
    </div>
  );
}