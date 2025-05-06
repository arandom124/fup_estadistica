
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CodeBlock from '../components/CodeBlock';
import LatexRenderer from '../components/LatexRenderer';
import MarkdownEditor from '../components/MarkdownEditor';
import RMarkdownSection from '../components/RMarkdownSection';
import EnhancedChunksSection from '../components/EnhancedChunksSection';
import Integrantes from '@/components/Integrantes';

const Index = () => {
  // Estado para el tema
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Efecto para cambiar el tema y guardarlo
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Estado para el resultado simulado
  const [chunkOutput, setChunkOutput] = useState<string>('');

  // Ejecutar código simulado
  const runRCode = () => {
    setChunkOutput(`> mtcars[1:5, 1:4]
                   mpg cyl disp  hp
Mazda RX4         21.0   6  160 110
Mazda RX4 Wag     21.0   6  160 110
Datsun 710        22.8   4  108  93
Hornet 4 Drive    21.4   6  258 110
Hornet Sportabout 18.7   8  360 175`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Integrantes/>
        {/* Sección 1: Estructura de un documento RMarkdown */}
        <div>
        <br />
    <section className="bg-muted py-8 px-4 rounded-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">¿Qué es RMarkdown?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              RMarkdown es una extensión de la sintaxis de Markdown que permite integrar fácilmente código R, 
              resultados computacionales y texto narrativo en un solo documento.
            </p>
            <p>
              Los documentos RMarkdown son completamente reproducibles y soportan múltiples formatos de salida, 
              como HTML, PDF, presentaciones y más.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Beneficios clave:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Integra código, resultados y texto en un solo documento</li>
              <li>Soporta múltiples lenguajes de programación (R, Python, SQL, etc.)</li>
              <li>Facilita la reproducibilidad científica</li>
              <li>Automatiza la generación de informes</li>
              <li>Mantiene la consistencia entre análisis y documentación</li>
            </ul>
          </div>
        </div>
      </section>
        </div>
        <RMarkdownSection id="estructura" title="1. Estructura de un documento RMarkdown">
          <p className="mb-4">
            Los documentos RMarkdown combinen texto en formato markdown con bloques de código R ejecutable, 
            permitiendo crear informes dinámicos y reproducibles. La estructura básica incluye:
          </p>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">YAML Front Matter</h3>
            <p>Metadatos que controlan el título, autor, formato de salida y opciones de formato:</p>
            
            <CodeBlock 
              code={`---
title: "Análisis Estadístico"
author: "Tu Nombre"
date: "2023-05-05"
output: 
  html_document:
    toc: true
    theme: united
---`}
              language="yaml"
              isDark={isDark}
              editable={true}
              storageKey="yaml-example"
            />
            
            <h3 className="text-lg font-semibold">Texto en Markdown</h3>
            <p>El contenido de tu documento se escribe usando sintaxis markdown:</p>
            
            <CodeBlock 
              code={`# Introducción

Este es un **informe** creado con *RMarkdown*.

## Objetivos

1. Analizar los datos
2. Crear visualizaciones
3. Interpretar resultados`}
              language="markdown"
              isDark={isDark}
              editable={true}
              storageKey="markdown-example"
            />
            
            <h3 className="text-lg font-semibold">Chunks de Código R</h3>
            <p>Bloques de código R que se pueden ejecutar directamente dentro del documento:</p>
            
            <CodeBlock 
              code={`\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
library(tidyverse)
\`\`\``}
              language="r"
              isDark={isDark}
              editable={true}
              storageKey="chunk-example"
            />
          </div>
        </RMarkdownSection>

        {/* Sección 2: Inserción de código y resultados */}
        <RMarkdownSection id="codigo-resultados" title="2. Inserción de código y resultados" alternateBackground>
          <p className="mb-4">
            RMarkdown permite incluir y ejecutar código R, mostrando tanto el código como los resultados en el documento final.
          </p>
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Opciones de Chunks</h3>
            <p>Controla cómo se ejecuta y se muestra el código:</p>
            
            <CodeBlock 
              code={`\`\`\`{r grafico, fig.width=8, fig.height=6, echo=TRUE, warning=FALSE}
# echo=TRUE - Muestra el código
# warning=FALSE - Oculta advertencias
# fig.width/height - Tamaño del gráfico
plot(iris$Sepal.Length, iris$Sepal.Width, 
     col=iris$Species, 
     xlab="Longitud Sépalo", 
     ylab="Ancho Sépalo")
\`\`\``}
              language="r"
              isDark={isDark}
              editable={true}
              storageKey="chunk-options"
            />
            
            <h3 className="text-lg font-semibold">Código Interactivo</h3>
            <p>Puedes editar y probar chunks de código R (simulado):</p>
            
            <div className="border rounded-md p-4 bg-muted/30">
              <textarea
                className="w-full p-3 font-mono text-sm border rounded-md mb-3 bg-card text-card-foreground"
                rows={5}
                defaultValue={`# Explorar datos de mtcars
mtcars[1:5, 1:4]  # Mostrar primeras filas y columnas

# Crear un gráfico simple
plot(mtcars$wt, mtcars$mpg, 
     main="Peso vs. Rendimiento",
     xlab="Peso (1000 lbs)", 
     ylab="Millas por galón")`}
              />
              
              <button 
                onClick={runRCode}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                Ejecutar Código
              </button>
              
              {chunkOutput && (
                <pre className="mt-3 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                  {chunkOutput}
                </pre>
              )}
            </div>
            
            <h3 className="text-lg font-semibold">Resultados Inline</h3>
            <p>También puedes incluir resultados R dentro del texto usando la sintaxis <code>`r expresión`</code>:</p>
            
            <CodeBlock 
              code={`La media del conjunto de datos mtcars es \`r mean(mtcars$mpg)\` millas por galón.`}
              language="markdown"
              isDark={isDark}
            />
          </div>
        </RMarkdownSection>

        {/* Sección 3: Uso de chunks, texto, ecuaciones y tablas - ENHANCED */}
        <RMarkdownSection id="chunks-texto-ecuaciones" title="3. Uso de chunks, texto, ecuaciones y tablas">
          <EnhancedChunksSection isDark={isDark} />
        </RMarkdownSection>

        {/* Sección 4: Generación de informes automáticos */}
        <RMarkdownSection id="informes-automaticos" title="4. Generación de informes automáticos" alternateBackground>
          <p className="mb-4">
            Una de las grandes ventajas de RMarkdown es la capacidad de generar informes automáticos 
            en diferentes formatos de salida.
          </p>
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Formatos de Salida</h3>
            <p>RMarkdown permite generar informes en múltiples formatos:</p>
            
            <CodeBlock 
              code={`---
title: "Mi Informe"
output:
  html_document: default
  pdf_document: default
  word_document: default
  pptx_document: default
---`}
              language="yaml"
              isDark={isDark}
              editable={true}
              storageKey="output-formats"
            />
            
            <h3 className="text-lg font-semibold">Parámetros</h3>
            <p>Puedes parametrizar tus informes para generar versiones diferentes del mismo análisis:</p>
            
            <CodeBlock 
              code={`---
title: "Informe Paramétrico"
params:
  data_file: "datos.csv"
  fecha_inicio: "2023-01-01"
  region: "Europa"
---

\`\`\`{r setup}
# Cargar datos usando los parámetros
datos <- read.csv(params$data_file)
datos_filtrados <- subset(datos, 
                         fecha >= params$fecha_inicio & 
                         region == params$region)
\`\`\``}
              language="r"
              isDark={isDark}
              editable={true}
              storageKey="params-example"
            />
            
            <h3 className="text-lg font-semibold">Automatización</h3>
            <p>Puedes automatizar la generación de informes mediante scripts:</p>
            
            <CodeBlock 
              code={`# Script para generar informes para diferentes regiones
regiones <- c("Europa", "Asia", "América", "África", "Oceanía")

for (region in regiones) {
  rmarkdown::render(
    "informe_template.Rmd",
    output_file = paste0("informe_", region, ".html"),
    params = list(
      region = region,
      fecha_inicio = "2023-01-01"
    )
  )
}`}
              language="r"
              isDark={isDark}
              editable={true}
              storageKey="automation-example"
            />
            
            <div className="mt-8 p-4 bg-muted rounded-md">
              <h3 className="text-lg font-semibold mb-2">Ventajas de los informes automáticos</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Reducción de errores humanos en la transcripción de resultados</li>
                <li>Ahorro de tiempo en la creación de informes repetitivos</li>
                <li>Facilidad para actualizar informes cuando cambian los datos</li>
                <li>Garantía de reproducibilidad del análisis</li>
                <li>Formatos profesionales sin necesidad de maquetación manual</li>
              </ul>
            </div>
          </div>
        </RMarkdownSection>
      </main>
      
      <footer className="p-6 mt-1 bg-muted text-center">
      <p className="text-sm text-muted-foreground">
          💻 dev -  arandomCore — 📌Fundación Universitaria de Popayán
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2025 • Ingeniería en Sistemas
          </p>
        
      </footer>
    </div>
  );
};

export default Index;
