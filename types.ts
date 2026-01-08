export enum AICapability {
  TEXT_ONLY = 'TEXT_ONLY',
  MULTIMODAL = 'MULTIMODAL', // Can accept images
  IMAGE_GENERATION = 'IMAGE_GENERATION',
  SEARCH = 'SEARCH',
  DEEP_THINKING = 'DEEP_THINKING'
}

export interface AIMode {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  color: string;
  model: string;
  capability: AICapability;
  systemInstruction?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string; // Text content or Image URL
  type: 'text' | 'image';
  timestamp: number;
  isThinking?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentModeId: string;
}