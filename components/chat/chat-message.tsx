import { type UIMessage } from "ai";
import GenerativeMessage from "./generative-message";

function getTextFromMessage(message: UIMessage) {
  return message.parts
    .map((part) => {
      if (part.type === "text") {
        return part.text;
      }
      return "";
    })
    .join("")
    .trim();
}

export default function ChatMessage({ message }: { message: UIMessage }) {
  const messageText = getTextFromMessage(message);

  return (
    <div key={message.id} className="w-full">
      {message.role === "user" ? (
        <h2 className="text-foreground text-4xl font-medium tracking-tight px-2 mt-4 w-full">
          {messageText}
        </h2>
      ) : (
        <GenerativeMessage message={messageText} />
      )}
    </div>
  );
}