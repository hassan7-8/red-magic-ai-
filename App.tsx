import React, { useState, useRef, useEffect } from 'react';
import { MODES } from './constants';
import { Message, AICapability } from './types';
import { generateResponse } from './services/geminiService';
import ParticleBackground from './components/ParticleBackground';
import ModeSelector from './components/ModeSelector';
import ChatMessage from './components/ChatMessage';
import { getIcon } from './components/IconMap';
import { 
  Send, 
  Menu, 
  Fan, 
  Battery, 
  Wifi, 
  Signal, 
  MoreVertical, 
  Image as ImageIcon,
  Loader2,
  Cpu
} from 'lucide-react';

const App: React.FC = () => {
  const [currentModeId, setCurrentModeId] = useState('gaming');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMode = MODES.find(m => m.id === currentModeId) || MODES[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting based on mode
  useEffect(() => {
    setMessages([{
      id: 'init',
      role: 'model',
      type: 'text',
      content: `**${currentMode.name.toUpperCase()} ACTIVATED**\n\n${currentMode.description}\n\nSystem Ready. Waiting for input...`,
      timestamp: Date.now()
    }]);
    setSelectedImage(null);
  }, [currentModeId]);

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: selectedImage ? `[Image Uploaded] ${inputText}` : inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Deep Thinking UI State
    if (currentMode.capability === AICapability.DEEP_THINKING) {
       // Optional: Add a temporary "Thinking" message or just use the loading state
    }

    try {
      const response = await generateResponse(currentModeId, userMsg.content, selectedImage || undefined);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        type: response.image ? 'image' : 'text',
        content: response.image || response.text,
        timestamp: Date.now(),
        isThinking: currentMode.capability === AICapability.DEEP_THINKING
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black text-white font-sans overflow-hidden">
      <ParticleBackground />

      {/* Phone Container */}
      <div className="relative w-full h-full md:h-[85vh] md:w-[450px] md:rounded-[3rem] bg-[#0a0a0c] md:border-[6px] md:border-[#1a1a1d] shadow-2xl flex flex-col overflow-hidden animate-[fadeIn_0.5s_ease-out]">
        
        {/* RGB Border Effect (Desktop only mostly) */}
        <div className="absolute inset-0 pointer-events-none md:rounded-[2.5rem] border-2 border-transparent animate-rgb opacity-50 hidden md:block" />

        {/* Status Bar */}
        <div className="h-8 w-full flex justify-between items-center px-6 pt-2 select-none z-20 bg-gradient-to-b from-black/80 to-transparent">
          <span className="text-xs font-mono font-bold tracking-widest text-gray-400">11:11</span>
          {/* Notch area placeholder if needed, RedMagic usually no notch or under display */}
          <div className="flex items-center gap-2 text-gray-400">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 z-20 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#ff0050]">
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col items-center">
              <h1 className="font-display font-bold text-lg tracking-wider flex items-center gap-2">
                 <span style={{ color: currentMode.color }}>REDMAGIC</span>
                 <span className="text-xs bg-white/10 px-1 rounded text-gray-300">OS 11</span>
              </h1>
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                 <Cpu size={10} /> 
                 <span>{currentMode.name.toUpperCase()}</span>
              </div>
            </div>

            <div className="p-2 hover:bg-white/5 rounded-full transition-colors relative group">
              <Fan size={20} className="text-[#00f0ff] animate-fan" />
              <div className="absolute -bottom-8 -right-2 bg-black/80 text-[10px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity w-max">
                Fan: 20000 RPM
              </div>
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 relative z-10 scroll-smooth">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} accentColor={currentMode.color} />
          ))}
          
          {isLoading && (
             <div className="flex items-center gap-3 text-gray-500 text-xs font-mono p-4 animate-pulse">
                <Loader2 size={16} className="animate-spin" style={{ color: currentMode.color }} />
                <span>
                   {currentMode.capability === AICapability.DEEP_THINKING 
                      ? 'PERFORMING DEEP RESEARCH & STRATEGIC ANALYSIS...' 
                      : 'PROCESSING NEURAL DATA...'}
                </span>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0a0a0c] z-20 border-t border-white/5">
          {selectedImage && (
             <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg mb-2 text-xs">
                <span className="truncate max-w-[200px]">{selectedImage.name}</span>
                <button onClick={() => setSelectedImage(null)} className="text-[#ff0050] font-bold">X</button>
             </div>
          )}
          
          <div className="relative flex items-center gap-2">
            {currentMode.capability === AICapability.MULTIMODAL && (
              <>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-[#00f0ff] transition-colors"
                >
                  <ImageIcon size={20} />
                </button>
              </>
            )}
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentMode.capability === AICapability.DEEP_THINKING ? "Ask a complex question..." : "Type a command..."}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff0050] transition-colors font-mono placeholder-gray-600"
              style={{ caretColor: currentMode.color }}
            />
            
            <button
              onClick={handleSend}
              disabled={isLoading || (!inputText && !selectedImage)}
              className="p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              style={{ 
                backgroundColor: currentMode.color,
                boxShadow: `0 0 15px ${currentMode.color}40`
              }}
            >
              <Send size={20} className="text-black fill-current" />
            </button>
          </div>
        </div>

        {/* Mode Selector Overlay */}
        <ModeSelector 
          currentModeId={currentModeId} 
          onSelectMode={setCurrentModeId} 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
        
      </div>
    </div>
  );
};

export default App;
