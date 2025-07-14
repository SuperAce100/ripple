'use client';

import { useChat } from '@ai-sdk/react';
import ChatMessage from '@/components/chat/chat-message';
import ChatInput from '@/components/chat/chat-input';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 max-w-2xl mx-auto py-8">
      <div className="flex flex-col items-start justify-start h-full w-full gap-4 overflow-y-auto">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <ChatInput handleSubmit={handleSubmit} input={input} handleInputChange={handleInputChange} />
    </div>
  );
}