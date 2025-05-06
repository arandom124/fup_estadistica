
import React, { useState, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import LatexRenderer from './LatexRenderer';

interface MarkdownEditorProps {
  isDark: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ isDark }) => {
  const [markdownContent, setMarkdownContent] = useState<string>(() => {
    const saved = localStorage.getItem('markdown-editor');
    return saved || `## Ejemplo de RMarkdown

Este es un ejemplo de texto en **negrita** y en *cursiva*.

A continuación una ecuación:

$$\\sum_{i=1}^{n} x_i^2$$

Y un chunk de código R:

\`\`\`r
# Análisis descriptivo
summary(mtcars)
plot(mtcars$mpg, mtcars$hp)
\`\`\`

También puedes incluir tablas:

| Variable | Media | Desviación Estándar |
|----------|-------|---------------------|
| mpg      | 20.09 | 6.03                |
| hp       | 146.7 | 68.56               |`;
  });

  const [previewContent, setPreviewContent] = useState<JSX.Element[]>([]);

  useEffect(() => {
    localStorage.setItem('markdown-editor', markdownContent);
    
    // Una simulación básica de la renderización de Markdown
    // (En un caso real usaríamos una biblioteca como marked.js)
    const lines = markdownContent.split('\n');
    const preview: JSX.Element[] = [];
    
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';
    
    lines.forEach((line, index) => {
      // Detectar bloques de código
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Fin del bloque de código
          preview.push(
            <CodeBlock 
              key={`code-${index}`} 
              code={codeContent}
              language={codeLanguage} 
              isDark={isDark}
              editable={false}
            />
          );
          inCodeBlock = false;
          codeContent = '';
        } else {
          // Inicio del bloque de código
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
        return;
      }
      
      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }
      
      // Detectar ecuaciones
      if (line.startsWith('$$') && line.endsWith('$$')) {
        const formula = line.substring(2, line.length - 2);
        preview.push(<LatexRenderer key={`eq-${index}`} formula={formula} />);
        return;
      }
      
      // Encabezados
      if (line.startsWith('##')) {
        preview.push(
          <h2 key={`h-${index}`} className="text-xl font-bold my-3">
            {line.substring(2).trim()}
          </h2>
        );
        return;
      }
      
      // Texto con formato básico
      if (line.trim() !== '') {
        // Simulación simple de negritas y cursivas
        let formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        preview.push(
          <p 
            key={`p-${index}`} 
            className="my-2"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      } else {
        preview.push(<div key={`s-${index}`} className="h-4"></div>);
      }
    });
    
    setPreviewContent(preview);
  }, [markdownContent, isDark]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-md">
        <div className="bg-muted p-2 text-sm font-medium border-b">
          Editor
        </div>
        <textarea
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-card text-card-foreground focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>
      <div className="border rounded-md">
        <div className="bg-muted p-2 text-sm font-medium border-b">
          Vista Previa
        </div>
        <div className="p-4 h-64 overflow-auto">
          {previewContent}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
