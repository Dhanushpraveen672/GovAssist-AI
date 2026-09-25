import React, { useState, useEffect, useRef } from 'react';
import { Scheme } from '../types/schemes';
import { useLanguage } from '../context/LanguageContext';
import { Bot, Send, X, Sparkles, User, RefreshCw, MessageSquare, ExternalLink, FileCheck } from 'lucide-react';

interface GovBotChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialScheme?: Scheme | null;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  documentList?: string[];
  officialUrl?: string;
}

export const GovBotChat: React.FC<GovBotChatProps> = ({
  isOpen,
  onClose,
  initialScheme,
}) => {
  const { currentLang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (initialScheme) {
        setMessages([
          {
            id: 'init-1',
            sender: 'bot',
            text: `Hello! I am **GovBot**, your AI Assistant. How can I help you regarding **${initialScheme.title}**?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            documentList: initialScheme.requiredDocuments,
            officialUrl: initialScheme.officialPortalUrl,
          }
        ]);
      } else {
        setMessages([
          {
            id: 'init-0',
            sender: 'bot',
            text: "Hello! I am **GovBot**, your multilingual AI Welfare Assistant. Ask me anything about Indian government welfare schemes, eligibility rules, required documents, or application steps!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
  }, [isOpen, initialScheme]);

  // ESC key handler to close chat drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: initialScheme?.id || null,
          message: userText,
          language: currentLang,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        const botData = resData.data;

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botData.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          documentList: botData.documents,
          officialUrl: botData.officialUrl,
        };

        setMessages(prev => [...prev, botMsg]);
      } else {
        fallbackLocalBot(userText);
      }
    } catch (error) {
      fallbackLocalBot(userText);
    } finally {
      setIsTyping(false);
    }
  };

  const fallbackLocalBot = (userText: string) => {
    let replyText = "GovBot AI recommends exploring verified central and state schemes tailored to your occupation and income level. You can check your eligibility in 60 seconds.";
    const lower = userText.toLowerCase();

    if (lower.includes('document') || lower.includes('proof')) {
      replyText = "The standard required documents for government welfare schemes include:\n• Aadhaar Card linked with Mobile Number\n• Income & Caste Certificate\n• Land Ownership Record (7/12 extract) or BPL Ration Card\n• Active Bank Account Passbook.";
    } else if (lower.includes('farmer') || lower.includes('agriculture')) {
      replyText = "Farmers can apply for PM-KISAN (₹6,000/yr), PM Fasal Bima Yojana (Crop Insurance), and Solar Pump Subsidies via the Krishi portal.";
    }

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:right-6 z-50 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-teal-100/90 overflow-hidden flex flex-col h-[560px] animate-in slide-in-from-bottom-5 duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="govbot-title"
    >
      
      {/* Drawer Header */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600/60 border border-teal-400/40 flex items-center justify-center text-white shadow-soft">
            <Bot className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="govbot-title" className="text-base font-black tracking-tight">
              {t('aiAssistantTitle', 'GovBot AI Assistant')}
            </h2>
            <div className="flex items-center space-x-1 text-[11px] text-teal-200 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online • Multilingual Voice & AI Engine</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-teal-900/80 hover:bg-teal-800 text-teal-200 hover:text-white transition-colors focus:ring-2 focus:ring-teal-400 focus:outline-none"
          aria-label="Close GovBot Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-4 h-4" aria-hidden="true" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-teal-800 text-white font-medium rounded-tr-none shadow-soft'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-xs'
              }`}
            >
              <div className="whitespace-pre-line font-medium leading-relaxed">
                {msg.text}
              </div>

              {msg.documentList && msg.documentList.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                  <div className="font-extrabold text-slate-900 flex items-center space-x-1 text-[11px]">
                    <FileCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>Checklist Documents Needed:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                    {msg.documentList.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {msg.officialUrl && (
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <a
                    href={msg.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-teal-800 font-extrabold hover:underline text-[11px]"
                  >
                    <span>Visit Official Application Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div
                className={`text-[9px] text-right font-mono ${
                  msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-teal-800 font-extrabold text-xs p-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>GovBot is formulating personalized guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Footer */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t('chatPlaceholder', 'Ask a question about government schemes...')}
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white placeholder-slate-400"
          aria-label="Type message for GovBot"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="bg-teal-800 hover:bg-teal-900 disabled:opacity-40 text-white p-3 rounded-2xl shadow-soft transition-all shrink-0 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          aria-label="Send Message"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>

    </div>
  );
};
