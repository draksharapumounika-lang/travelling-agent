import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  ArrowRight,
  Loader2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { TripPlan, ChatMessage } from '../types/travel';

interface AgentChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripPlan | null;
}

const DEFAULT_PROMPTS = [
  'What should I pack for evening dinners?',
  'Suggest romantic sunset viewpoints for this trip',
  'What local scams or tourist traps should I avoid?',
  'How do I buy transit passes or train tickets in advance?',
  'Recommend authentic souvenirs locals actually buy',
];

export const AgentChatDrawer: React.FC<AgentChatDrawerProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when drawer is opened or trip changes
  useEffect(() => {
    if (trip && messages.length === 0) {
      setMessages([
        {
          id: 'welcome_1',
          role: 'agent',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: `Hello! I'm your dedicated AI Travel Agent for your upcoming trip to **${trip.destination}**. 

I have your full ${trip.daysCount}-day itinerary loaded with all activities, reservations, and neighborhood logistics.

How may I assist you today? You can ask me to swap activities, find dietary-specific restaurants, check local transit secrets, or suggest rainy-day backups!`,
          actionSuggestions: [
            'Suggest rainy day alternatives',
            'Recommend sunset spots',
            'Find authentic local sweets & snacks',
          ],
        },
      ]);
    }
  }, [trip]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/travel-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory,
          tripContext: trip,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from travel agent');
      }

      const data = await response.json();
      const agentMsg: ChatMessage = {
        id: 'agent_' + Date.now(),
        role: 'agent',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: data.actionSuggestions,
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: 'agent_err_' + Date.now(),
        role: 'agent',
        content: `I'm having a brief connection hitch, but here is my quick advice for ${trip?.destination || 'your destination'}: Be sure to reserve popular museum and landmark tickets at least 2 weeks in advance, and carry local cash for small artisan markets! Let me know if you want me to retry.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: ['What are the best street food spots?', 'Transit pass tips'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end no-print">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-md shadow-rose-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">AI Travel Concierge</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                {trip ? `${trip.destination} (${trip.daysCount}d)` : 'Ready to assist'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-rose-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                {/* Formatted Message Content */}
                <div className="whitespace-pre-wrap">{msg.content}</div>

                <span
                  className={`text-[10px] block mt-1.5 ${
                    msg.role === 'user' ? 'text-rose-200 text-right' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {/* Action Suggestions Chips for agent messages */}
              {msg.role === 'agent' && msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                  {msg.actionSuggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(suggestion)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 text-amber-300 transition-all text-left flex items-center gap-1"
                    >
                      <span>💡</span>
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-2xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
              <span>Checking itinerary details & local insights...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions when messages list is short */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/60">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              <span>Suggested Inquiries:</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {DEFAULT_PROMPTS.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about restaurants, changes, packing..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-rose-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
