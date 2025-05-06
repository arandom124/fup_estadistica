
import React from 'react';

interface RMarkdownSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  alternateBackground?: boolean;
}

const RMarkdownSection: React.FC<RMarkdownSectionProps> = ({ 
  id, 
  title, 
  children, 
  alternateBackground = false 
}) => {
  return (
    <>
    
    <section 
      id={id} 
      className={`py-10 ${alternateBackground ? 'bg-black/30' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient flex items-center gap-2">
          <div className="h-6 w-1 bg-gradient-to-b from-blue-400 to-cyan-300"></div>
          {title}
        </h2>
        <div className="glass-card rounded-lg p-6">
          {children}
        </div>
      </div>
    </section>
    </>
  );
};

export default RMarkdownSection;
