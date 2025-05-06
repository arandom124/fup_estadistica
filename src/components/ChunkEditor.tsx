
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Save, Code } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface ChunkEditorProps {
  isDark: boolean;
  storageKey: string;
}

const ChunkEditor: React.FC<ChunkEditorProps> = ({ isDark, storageKey }) => {
  const [code, setCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem(storageKey);
      return savedCode || '# Análisis descriptivo\nsummary(mtcars)\n\n# Visualización\nplot(mtcars$mpg, mtcars$hp, \n     main="Relación entre rendimiento y potencia",\n     xlab="Millas por galón", \n     ylab="Caballos de fuerza")';
    }
    return '# Análisis descriptivo\nsummary(mtcars)\n\n# Visualización\nplot(mtcars$mpg, mtcars$hp, \n     main="Relación entre rendimiento y potencia",\n     xlab="Millas por galón", \n     ylab="Caballos de fuerza")';
  });
  
  const [output, setOutput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('code');

  useEffect(() => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Auto-save to localStorage
      localStorage.setItem(storageKey, code);
    }
  }, [code, storageKey]);

  const runCode = () => {
    // Simulate R output
    setOutput(`> summary(mtcars$mpg)
   Min. 1st Qu.  Median    Mean 3rd Qu.    Max. 
  10.40   15.43   19.20   20.09   22.80   33.90 
> plot(mtcars$mpg, mtcars$hp)
# [Gráfico generado]`);
    setActiveTab('output');
  };

  const saveCode = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, code);
      alert('Código guardado en localStorage');
    }
  };

  const copyCode = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      alert('Código copiado al portapapeles');
    }
  };

  return (
    <div className="border rounded-md shadow-sm bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center px-4 py-2 bg-muted border-b">
          <TabsList>
            <TabsTrigger value="code" className="flex items-center gap-1">
              <Code size={16} />
              <span>Código</span>
            </TabsTrigger>
            <TabsTrigger value="output">Resultado</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={runCode}>
              Ejecutar
            </Button>
            <Button variant="outline" size="sm" onClick={saveCode}>
              <Save size={16} className="mr-1" />
              Guardar
            </Button>
            <Button variant="outline" size="sm" onClick={copyCode}>
              <Copy size={16} className="mr-1" />
              Copiar
            </Button>
          </div>
        </div>
        
        <TabsContent value="code" className="p-0 m-0">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm h-60 rounded-t-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
            placeholder="Escribe código R aquí..."
          />
        </TabsContent>
        
        <TabsContent value="output" className="p-0 m-0">
          <div className="h-60 overflow-auto p-4 font-mono text-sm bg-muted/30">
            {output ? (
              <pre>{output}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Ejecuta el código para ver los resultados
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChunkEditor;
