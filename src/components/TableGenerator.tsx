
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Table } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { 
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableGeneratorProps {
  isDark: boolean;
  storageKey: string;
}

const TableGenerator: React.FC<TableGeneratorProps> = ({ isDark, storageKey }) => {
  const [activeTab, setActiveTab] = useState<string>('markdown');
  
  const [markdownTable, setMarkdownTable] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedTable = localStorage.getItem(`${storageKey}-markdown`);
      return savedTable || `| Variable | Tipo      | Descripción          |
|----------|-----------|----------------------|
| mpg      | Numérica  | Millas por galón    |
| cyl      | Numérica  | Número de cilindros |
| disp     | Numérica  | Desplazamiento      |
| hp       | Numérica  | Caballos de fuerza  |`;
    }
    return `| Variable | Tipo      | Descripción          |
|----------|-----------|----------------------|
| mpg      | Numérica  | Millas por galón    |
| cyl      | Numérica  | Número de cilindros |
| disp     | Numérica  | Desplazamiento      |
| hp       | Numérica  | Caballos de fuerza  |`;
  });
  
  const [rTable, setRTable] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedRTable = localStorage.getItem(`${storageKey}-rtable`);
      return savedRTable || `# Crear tabla con knitr
knitr::kable(head(mtcars[, 1:4]), 
             caption = "Primeras filas de mtcars",
             col.names = c("MPG", "Cilindros", "Desplazamiento", "HP"),
             align = c('c', 'c', 'r', 'r'))`;
    }
    return `# Crear tabla con knitr
knitr::kable(head(mtcars[, 1:4]), 
             caption = "Primeras filas de mtcars",
             col.names = c("MPG", "Cilindros", "Desplazamiento", "HP"),
             align = c('c', 'c', 'r', 'r'))`;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}-markdown`, markdownTable);
      localStorage.setItem(`${storageKey}-rtable`, rTable);
    }
  }, [markdownTable, rTable, storageKey]);

  const copyTable = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const textToCopy = activeTab === 'markdown' ? markdownTable : rTable;
      navigator.clipboard.writeText(textToCopy);
      alert('Tabla copiada al portapapeles');
    }
  };

  // Simple parser for markdown tables (basic implementation)
  const parseMarkdownTable = (markdown: string) => {
    const lines = markdown.trim().split('\n');
    if (lines.length < 3) return null;
    
    const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
    const rows = lines.slice(2).map(line => 
      line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
    );
    
    return { headers, rows };
  };

  const parsedTable = parseMarkdownTable(markdownTable);

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="markdown" className="flex items-center gap-1">
              <Table size={16} />
              <span>Markdown</span>
            </TabsTrigger>
            <TabsTrigger value="r">R generada</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" onClick={copyTable}>
            <Copy size={16} className="mr-1" />
            Copiar
          </Button>
        </div>
        
        <TabsContent value="markdown" className="space-y-4">
          <Textarea
            value={markdownTable}
            onChange={(e) => setMarkdownTable(e.target.value)}
            className="font-mono text-sm h-40 resize-none"
            placeholder="Escribe una tabla en formato Markdown..."
          />
          
          {parsedTable && (
            <div className="border rounded-md overflow-x-auto">
              <UITable>
                <TableHeader>
                  <TableRow>
                    {parsedTable.headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedTable.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="r" className="space-y-4">
          <Textarea
            value={rTable}
            onChange={(e) => setRTable(e.target.value)}
            className="font-mono text-sm h-40 resize-none"
            placeholder="Escribe código R para generar una tabla..."
          />
          
          <CodeBlock
            code={rTable}
            language="r"
            isDark={isDark}
            editable={true}
            storageKey="r-table-code"
          />
          
          <div className="border rounded-md p-4 bg-muted/30">
            <h4 className="text-sm font-medium mb-2">Resultado simulado:</h4>
            <UITable>
              <TableCaption>Primeras filas de mtcars</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>MPG</TableHead>
                  <TableHead>Cilindros</TableHead>
                  <TableHead>Desplazamiento</TableHead>
                  <TableHead>HP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>21.0</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>160</TableCell>
                  <TableCell>110</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>21.0</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>160</TableCell>
                  <TableCell>110</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>22.8</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>108</TableCell>
                  <TableCell>93</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>21.4</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>258</TableCell>
                  <TableCell>110</TableCell>
                </TableRow>
              </TableBody>
            </UITable>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TableGenerator;
