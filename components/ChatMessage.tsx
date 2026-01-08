import React from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  accentColor: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, accentColor }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div 
          className={`
            w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
            ${isUser ? 'bg-gray-800 border-gray-700' : 'bg-black border-[#ff0050]'}
          `}
          style={!isUser ? { borderColor: accentColor, boxShadow: `0 0 5px ${accentColor}40` } : {}}
        >
          {isUser ? <User size={14} className="text-gray-300" /> : <Bot size={14} style={{ color: accentColor }} />}
        </div>

        {/* Bubble */}
        <div 
          className={`
            relative p-4 rounded-2xl text-sm leading-relaxed overflow-hidden
            ${isUser 
              ? 'bg-[#1a1a1e] text-gray-100 rounded-tr-none border border-white/5' 
              : 'bg-[#ff0050]/5 text-gray-200 rounded-tl-none border border-[#ff0050]/20'
            }
          `}
          style={!isUser ? { backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` } : {}}
        >
           {/* Image Content */}
           {message.type === 'image' && (
            <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
              <img src={message.content} alt="Generated" className="w-full h-auto" />
            </div>
           )}

           {/* Text Content */}
           {message.type === 'text' && (
             <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:text-white prose-a:text-[#00f0ff]">
               <ReactMarkdown>{message.content}</ReactMarkdown>
             </div>
           )}

           {/* Timestamp/Footer */}
           <div className="mt-2 text-[10px] opacity-40 font-mono flex items-center gap-1">
             {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             {!isUser && message.isThinking && <span className="ml-2 animate-pulse text-[#00f0ff]">DEEP_RESEARCH_COMPLETE</span>}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
