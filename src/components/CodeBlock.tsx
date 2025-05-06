
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  isDark: boolean;
  editable?: boolean;
  storageKey?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code: initialCode, 
  language, 
  isDark, 
  editable = false,
  storageKey
}) => {
  const [code, setCode] = useState<string>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      return saved || initialCode;
    }
    return initialCode;
  });
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (storageKey) {
      localStorage.setItem(storageKey, newCode);
    }
  };

  const toggleEditing = () => {
    if (editable) {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="w-full mb-2">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full p-4 font-mono text-sm border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
            spellCheck="false"
          />
          <button
            onClick={toggleEditing}
            className="mt-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Guardar
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-1 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copiar código"
          >
            {copied ? 'Copiado!' : <Copy size={16} />}
          </button>
          <SyntaxHighlighter 
            language={language} 
            style={isDark ? atomDark : tomorrow}
            customStyle={{
              borderRadius: '0.375rem',
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            onClick={editable ? toggleEditing : undefined}
            className={editable ? "cursor-pointer hover:ring-1 hover:ring-primary" : ""}
          >
            {code}
          </SyntaxHighlighter>
          {editable && (
            <div className="text-xs text-muted-foreground mt-1">
              Haz clic en el código para editarlo
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodeBlock;
