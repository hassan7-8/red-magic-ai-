import React from 'react';
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

export const IconMap: Record<string, React.FC<any>> = {
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
};

export const getIcon = (iconName: string, props: any) => {
  const Icon = IconMap[iconName] || MessageSquare;
  return <Icon {...props} />;
};
