import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#050505]"></div>
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* RedMagic Cyber Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0050] rounded-full blur-[150px] opacity-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00f0ff] rounded-full blur-[120px] opacity-10 animate-pulse" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] border border-white/5 rounded-3xl opacity-30" />
    </div>
  );
};

export default ParticleBackground;
