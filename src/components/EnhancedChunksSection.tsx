
import React from 'react';
import ChunkEditor from './ChunkEditor';
import MarkdownTextEditor from './MarkdownTextEditor';
import LaTeXEditor from './LaTeXEditor';
import TableGenerator from './TableGenerator';
import { FuturisticButton } from './ui/futuristic-button';
import { Code, FileText, Table2, Zap, Calculator } from 'lucide-react';

interface EnhancedChunksSectionProps {
  isDark: boolean;
}

const EnhancedChunksSection: React.FC<EnhancedChunksSectionProps> = ({ isDark }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-2 text-gradient flex items-center gap-2">
          <Code className="h-5 w-5" />
          3.1 Chunks de Código
        </h3>
        <p className="text-muted-foreground backdrop-blur-sm bg-black/30 p-3 rounded-md">
          Los chunks de código en RMarkdown permiten ejecutar R directamente dentro del documento.
          Pueden incluir opciones como <code className="text-cyan-400">echo</code>, <code className="text-cyan-400">eval</code>, y <code className="text-cyan-400">warning</code>.
        </p>
        <ChunkEditor isDark={isDark} storageKey="rmarkdown-chunk-editor" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-2 text-gradient flex items-center gap-2">
          <FileText className="h-5 w-5" />
          3.2 Texto Markdown
        </h3>
        <p className="text-muted-foreground backdrop-blur-sm bg-black/30 p-3 rounded-md">
          RMarkdown utiliza sintaxis Markdown para formatear texto, crear listas, enlaces y más.
        </p>
        <MarkdownTextEditor isDark={isDark} storageKey="rmarkdown-text-editor" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-2 text-gradient flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          3.3 Ecuaciones Matemáticas
        </h3>
        <p className="text-muted-foreground backdrop-blur-sm bg-black/30 p-3 rounded-md">
          Las ecuaciones matemáticas se escriben en sintaxis LaTeX entre símbolos <code className="text-cyan-400">$</code> (para ecuaciones inline) 
          o <code className="text-cyan-400">$$</code> (para ecuaciones en bloque).
        </p>
        <LaTeXEditor isDark={isDark} storageKey="rmarkdown-latex-editor" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-2 text-gradient flex items-center gap-2">
          <Table2 className="h-5 w-5" />
          3.4 Tablas
        </h3>
        <p className="text-muted-foreground backdrop-blur-sm bg-black/10 p-3 rounded-md">
          Las tablas se pueden crear manualmente con sintaxis Markdown o generarlas con 
          funciones de R como <code className="text-cyan-400">knitr::kable()</code>.
        </p>
        <TableGenerator isDark={isDark} storageKey="rmarkdown-table-generator" />
      </div>
      
      
    </div>
  );
};

export default EnhancedChunksSection;
