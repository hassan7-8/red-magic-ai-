import { AICapability, AIMode } from './types';
import { 
  Gamepad2, 
  Zap, 
  Brain, 
  Code, 
  Palette, 
  Camera, 
  Swords, 
  Newspaper, 
  Cpu, 
  MessageSquare, 
  Bot 
} from 'lucide-react';
import React from 'react';

// Using a Function to return the component to avoid storing React Nodes in pure objects if possible, 
// but for simplicity in UI mapping, we'll map ID to Icon component in the component layer.

export const MODES: AIMode[] = [
  {
    id: 'gaming',
    name: 'Gaming Mode',
    icon: 'Gamepad2',
    description: 'Deep research on mechanics, lore, and strategies.',
    color: '#ff0050',
    model: 'gemini-3-pro-preview', // Strong reasoning
    capability: AICapability.DEEP_THINKING,
    systemInstruction: 'You are RedMagic Gaming OS, an elite gaming AI. You specialize in analyzing game mechanics, lore, speedrun strategies, and competitive metas. Use deep reasoning to deconstruct complex gaming questions. Be enthusiastic, technical, and gamer-centric.',
  },
  {
    id: 'simple',
    name: 'Simple Mode',
    icon: 'MessageSquare',
    description: 'Fast, concise answers for everyday questions.',
    color: '#00f0ff',
    model: 'gemini-3-flash-preview',
    capability: AICapability.TEXT_ONLY,
    systemInstruction: 'You are RedMagic Lite. Provide short, accurate, and helpful answers without jargon.',
  },
  {
    id: 'turbo',
    name: 'Turbo Mode',
    icon: 'Zap',
    description: 'Maximum speed for quick queries.',
    color: '#fbbf24',
    model: 'gemini-flash-lite-latest',
    capability: AICapability.TEXT_ONLY,
    systemInstruction: 'You are RedMagic Turbo. Speed is your priority. Answer immediately and briefly.',
  },
  {
    id: 'coding',
    name: 'Dev Core',
    icon: 'Code',
    description: 'Specialized in code generation and debugging.',
    color: '#10b981',
    model: 'gemini-3-pro-preview',
    capability: AICapability.TEXT_ONLY,
    systemInstruction: 'You are the RedMagic Dev Core. You write clean, efficient, and well-documented code. You prefer TypeScript and modern stacks.',
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    icon: 'Palette',
    description: 'Brainstorming, storytelling, and ideas.',
    color: '#d946ef',
    model: 'gemini-3-flash-preview',
    capability: AICapability.TEXT_ONLY,
    systemInstruction: 'You are the RedMagic Creative Studio. Be imaginative, vivid, and inspiring.',
  },
  {
    id: 'strategy',
    name: 'Tactician',
    icon: 'Swords',
    description: 'Advanced logical reasoning and planning.',
    color: '#f97316',
    model: 'gemini-3-pro-preview',
    capability: AICapability.DEEP_THINKING,
    systemInstruction: 'You are the RedMagic Tactician. Analyze situations logically and provide step-by-step strategic advice.',
  },
  {
    id: 'vision',
    name: 'Optical Lens',
    icon: 'Camera',
    description: 'Analyze images and scenes.',
    color: '#8b5cf6',
    model: 'gemini-2.5-flash-image', // Good for describing images
    capability: AICapability.MULTIMODAL,
    systemInstruction: 'You are the RedMagic Lens. Analyze the provided images with high precision.',
  },
  {
    id: 'artist',
    name: 'Art Generator',
    icon: 'Bot',
    description: 'Generate high-quality AI art.',
    color: '#ec4899',
    model: 'gemini-2.5-flash-image', // Standard generation
    capability: AICapability.IMAGE_GENERATION,
  },
  {
    id: 'tech',
    name: 'Tech Specs',
    icon: 'Cpu',
    description: 'Hardware analysis and specs comparison.',
    color: '#3b82f6',
    model: 'gemini-3-flash-preview',
    capability: AICapability.SEARCH, // Uses grounding
    systemInstruction: 'You are the RedMagic Hardware Specialist. Focus on specs, benchmarks, and thermal performance.',
  },
  {
    id: 'news',
    name: 'News Feed',
    icon: 'Newspaper',
    description: 'Latest updates from the web.',
    color: '#ef4444',
    model: 'gemini-3-flash-preview',
    capability: AICapability.SEARCH,
  },
  {
    id: 'pro',
    name: 'Pro Mode',
    icon: 'Brain',
    description: 'Maximum intelligence, unconstrained.',
    color: '#ffffff',
    model: 'gemini-3-pro-preview',
    capability: AICapability.TEXT_ONLY,
  }
];
