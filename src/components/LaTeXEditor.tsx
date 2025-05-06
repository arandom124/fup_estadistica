
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import LatexRenderer from './LatexRenderer';

interface LaTeXEditorProps {
  isDark: boolean;
  storageKey: string;
}

const LATEX_EXAMPLES = [
  { name: "Sumatoria", formula: "\\sum_{i=1}^{n} x_i" },
  { name: "Fracción", formula: "\\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2" },
  { name: "Matriz", formula: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
  { name: "Integral", formula: "\\int_{a}^{b} f(x) \\, dx" },
  { name: "Límite", formula: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0" }
];

const LaTeXEditor: React.FC<LaTeXEditorProps> = ({ isDark, storageKey }) => {
  const [latex, setLatex] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedLatex = localStorage.getItem(storageKey);
      return savedLatex || "\\sum_{i=1}^{n} x_i";
    }
    return "\\sum_{i=1}^{n} x_i";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, latex);
    }
  }, [latex, storageKey]);

  const insertExample = (formula: string) => {
    setLatex(formula);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md">
          <div className="bg-muted p-2 text-sm font-medium border-b">
            Editor LaTeX
          </div>
          <Textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            className="font-mono text-sm h-40 p-4 rounded-t-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
            placeholder="Escribe una ecuación LaTeX..."
          />
        </div>
        <div className="border rounded-md">
          <div className="bg-muted p-2 text-sm font-medium border-b">
            Vista Previa
          </div>
          <div className="flex items-center justify-center h-40 bg-card overflow-auto p-4">
            <LatexRenderer formula={latex} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {LATEX_EXAMPLES.map((example, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            onClick={() => insertExample(example.formula)}
            className="text-xs"
          >
            {example.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LaTeXEditor;
