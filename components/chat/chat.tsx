'use client';

import { useChat } from '@ai-sdk/react';
import ChatMessage from '@/components/chat/chat-message';
import ChatInput from '@/components/chat/chat-input';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 max-w-2xl mx-auto py-8 relative">
      <div className="flex flex-col w-full relative h-full">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-2">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-8xl font-light mb-6 mr-12 tracking-tight flex flex-row items-center"
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Image src="/logo.png" alt="Ripple" width={120} height={120} className="rounded-full" />
                    Ripple
                  </motion.h1>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4 pb-12 pt-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
      <motion.div
              initial={
                messages.length === 0
                  ? { y: 'calc(-50vh + 100px)', x: 'calc(30vw)', opacity: 0, width: '40%' }
                  : { y: 0, opacity: 0, width: '0%' }
              }
              animate={{
                y: messages.length === 0 ? 'calc(-50vh + 100px)' : 0,
                x: messages.length === 0 ? 'calc(10%)' : 0,
                width: messages.length === 0 ? '80%' : '100%',
                opacity: 1
              }}
              transition={{
                duration: 0.3,
                delay: messages.length === 0 ? 0.3 : 0,
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              className="absolute bottom-4 left-0 right-0 w-full bg-gradient-to-t from-background to-transparent"
            >
        <ChatInput handleSubmit={handleSubmit} input={input} handleInputChange={handleInputChange} placeholder={messages.length === 0 ? 'Ask anything' : 'Ask a follow-up'} />
      </motion.div>
    </div>
  );
}