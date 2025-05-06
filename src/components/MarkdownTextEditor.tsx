
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownTextEditorProps {
  isDark: boolean;
  storageKey: string;
}

const MarkdownTextEditor: React.FC<MarkdownTextEditorProps> = ({ isDark, storageKey }) => {
  const [markdown, setMarkdown] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedText = localStorage.getItem(storageKey);
      return savedText || `## Análisis de datos con R

Esta es una **demostración** de cómo se pueden combinar:

1. Texto formateado con *Markdown*
2. [Enlaces a documentación](https://rmarkdown.rstudio.com/)
3. Listas y otros elementos

El contenido puede incluir:
- Texto formateado
- Ecuaciones matemáticas
- Código ejecutable
- Tablas de datos`;
    }
    return `## Análisis de datos con R

Esta es una **demostración** de cómo se pueden combinar:

1. Texto formateado con *Markdown*
2. [Enlaces a documentación](https://rmarkdown.rstudio.com/)
3. Listas y otros elementos

El contenido puede incluir:
- Texto formateado
- Ecuaciones matemáticas
- Código ejecutable
- Tablas de datos`;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, markdown);
    }
  }, [markdown, storageKey]);

  // Simple Markdown rendering (basic simulation)
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold my-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold my-4">{line.substring(2)}</h1>;
        }
        
        // List items
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = line.substring(2);
          const formattedContent = formatInlineMarkdown(content);
          return <li key={index} className="ml-5 my-1" dangerouslySetInnerHTML={{ __html: formattedContent }}></li>;
        }
        
        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          const content = line.substring(line.indexOf('.') + 1).trim();
          const formattedContent = formatInlineMarkdown(content);
          return <li key={index} className="ml-5 my-1 list-decimal" dangerouslySetInnerHTML={{ __html: formattedContent }}></li>;
        }
        
        // Empty line
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Regular paragraph
        return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}></p>;
      });
  };

  // Format inline markdown elements
  const formatInlineMarkdown = (text: string) => {
    let formatted = text;
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    return formatted;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-md">
        <div className="bg-muted p-2 text-sm font-medium border-b">
          Editor Markdown
        </div>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="font-mono text-sm h-60 p-4 rounded-t-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
        />
      </div>
      <div className="border rounded-md">
        <div className="bg-muted p-2 text-sm font-medium border-b">
          Vista Previa
        </div>
        <div className="p-4 h-60 overflow-auto bg-card">
          {renderMarkdown(markdown)}
        </div>
      </div>
    </div>
  );
};

export default MarkdownTextEditor;
