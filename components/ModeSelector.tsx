import React from 'react';
import { MODES } from '../constants';
import { getIcon } from './IconMap';

interface ModeSelectorProps {
  currentModeId: string;
  onSelectMode: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentModeId, onSelectMode, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-6 animate-[fadeIn_0.2s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display text-white font-bold tracking-wider">
          SYSTEM <span className="text-[#ff0050]">MODES</span>
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          CLOSE_
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto pb-20">
        {MODES.map((mode) => {
          const isSelected = currentModeId === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                onSelectMode(mode.id);
                onClose();
              }}
              className={`
                relative group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300
                ${isSelected 
                  ? 'bg-[#ff0050]/20 border-[#ff0050] shadow-[0_0_15px_rgba(255,0,80,0.3)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              <div 
                className={`mb-3 p-3 rounded-full transition-transform group-hover:scale-110 ${isSelected ? 'bg-[#ff0050] text-white' : 'bg-black/40 text-gray-300'}`}
                style={{ color: isSelected ? 'white' : mode.color }}
              >
                {getIcon(mode.icon, { size: 24 })}
              </div>
              <span className="font-display font-bold text-sm text-white mb-1 tracking-wide">{mode.name.toUpperCase()}</span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">{mode.description}</span>
              
              {isSelected && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
