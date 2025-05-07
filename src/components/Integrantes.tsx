import React from 'react'

function Integrantes() {
  return (
    <div id="portada" className=" flex flex-col justify-center items-center section-container animate-fade-in">
    <div className="glass-card p-8 md:p-12 max-w-1xl w-full text-center space-y-6">
      <div className="mb-6">
        <img 
          src="/arandomCore-uploads/d06c1c79-4efe-49fe-b40a-b84a15d8d7e9.png" 
          alt="Logo FUP" 
          className="h-32 mx-auto mb-4 dark:invert"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }} 
        />
        <div className="space-y-1 mb-4">
          <h4 className="text-sm font-medium text-muted-foreground">FUNDACIÓN UNIVERSITARIA DE POPAYÁN</h4>
          <h4 className="text-sm font-medium text-muted-foreground">FACULTAD DE INGENIERÍA</h4>
          <h4 className="text-sm font-medium text-muted-foreground">PROGRAMA: INGENIERÍA EN SISTEMAS</h4>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
      Reportes Reproducibles con RMarkdown
      </h1>
      <h2 className="text-xl md:text-2xl font-medium mb-8">Puntos:</h2>
      <h4 className="text-xl md:text-1xl font-medium mb-8">
        1- Estructura de un documento 'RMarkdown'.
        <br/>
         2- Inserción de código y resultados. 
         <br/>
        3- Uso de chunks, texto, ecuaciones y tablas. 
        <br/>
        4- Generación de informes automáticos en HTML/PDF</h4>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-1">Integrantes:</h3>
          <p className="text-muted-foreground">Jhoan Alban Rojas</p>
          <p className="text-muted-foreground">⁠Ferney Lozada</p>
          <p className="text-muted-foreground">Jose Domingo Aranda</p>
          <p className="text-muted-foreground">Juan Pablo Cerón</p>
        </div>
        <br />
        <div>
          <h3 className="text-lg font-medium mb-1">Docente:</h3>
          <p className="text-muted-foreground">Carlos Andres Leiton Piamba</p>
        </div>
        <br />
        <div>
          <h3 className="text-lg font-medium mb-1">Fecha:</h3>
          <p className="text-muted-foreground">Popayán, 7 de mayo de 2025</p>
        </div>
      </div>

      
    </div>
  </div>
  )
}

export default Integrantes