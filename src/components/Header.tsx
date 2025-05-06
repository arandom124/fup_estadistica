
import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-10 py-4 px-6 neo-blur">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-400" />
          <h1 className="text-1xl md:text-1xl font-bold text-gradient">
           ESTADISTICA
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full glass-card hover:bg-white/10 transition-all duration-200 flex items-center gap-2 glow"
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {isDark ? (
            <>
              <Sun size={18} className="text-yellow-300" />
            </>
          ) : (
            <>
              <Moon size={18} className="text-blue-300" />
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
