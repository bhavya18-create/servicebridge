import { useState, useEffect, useRef, useCallback } from 'react';
import { getBotReply } from '../lib/getBotReply';

const INITIAL_MESSAGES = [
  { role: 'bot', text: 'Hello! I’m your service assistant. How can I help today?' },
  { role: 'bot', text: 'Ask me to compare quotes, schedule service, or request emergency support.' },
];

export function useChat() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  const handleSendMessage = useCallback(() => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');
    setIsBotTyping(true);
    const reply = getBotReply(trimmed);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsBotTyping(false);
    }, 700);
  }, [chatInput]);

  const focusInput = useCallback(() => {
    setTimeout(() => chatInputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping]);

  return {
    chatInput,
    setChatInput,
    chatMessages,
    isBotTyping,
    chatContainerRef,
    chatInputRef,
    handleSendMessage,
    focusInput,
  };
}
