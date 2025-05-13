import React, { useState } from 'react';
import Head from 'next/head';
import Card from '../../components/ui/Card';
import InterestButton from '../../components/projects/InterestButton';
import { useAuth } from '../../context/AuthContext';
import withAuth from '../../components/Auth/withAuth';

/**
 * Página de ejemplo que muestra las diferentes variantes del botón "Me Interesa"
 */
const InterestButtonExample = () => {
  const { isAuthenticated } = useAuth();
  const [interestState, setInterestState] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  // Proyecto de ejemplo para probar el botón
  const exampleProjectId = "example-project-1";

  // Manejar cambio de estado de interés
  const handleInterestChange = (buttonId, newState) => {
    setInterestState(prev => ({
      ...prev,
      [buttonId]: newState
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Head>
        <title>Ejemplo de Botón "Me Interesa"</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Ejemplo de Botón "Me Interesa"</h1>
      
      <p className="mb-4 text-gray-700">
        Esta página muestra diferentes variantes del componente InterestButton utilizado para que los socios
        marquen su interés en proyectos de inversión. {!isAuthenticated && 
        'No has iniciado sesión, por lo que verás el comportamiento de redirección al login.'}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Variante Estándar (Primary)</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Botón "Me interesa" por defecto:</span>
              <InterestButton 
                projectId={exampleProjectId} 
                onInterestChange={(newState) => handleInterestChange('button1', newState)}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Sólo icono (sin texto):</span>
              <InterestButton 
                projectId={exampleProjectId} 
                showText={false}
                onInterestChange={(newState) => handleInterestChange('button2', newState)}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Tamaño pequeño (sm):</span>
              <InterestButton 
                projectId={exampleProjectId} 
                size="sm"
                onInterestChange={(newState) => handleInterestChange('button3', newState)}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Tamaño grande (lg):</span>
              <InterestButton 
                projectId={exampleProjectId} 
                size="lg"
                onInterestChange={(newState) => handleInterestChange('button4', newState)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Otros Estilos</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Estilo outline:</span>
              <InterestButton 
                projectId={exampleProjectId} 
                variant="outline"
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Estilo secondary:</span>
              <InterestButton 
                projectId={exampleProjectId} 
                variant="secondary"
              />
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span>En tarjeta de proyecto:</span>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Proyecto de ejemplo</h3>
                    <p className="text-sm text-gray-600">Madrid • Residencial</p>
                  </div>
                  <InterestButton 
                    projectId={exampleProjectId}
                    size="sm"
                  />
                </div>
                <p className="mt-2 text-sm">Este es un ejemplo de cómo se vería el botón integrado en una tarjeta de proyecto.</p>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500">ROI estimado: 12%</div>
                  <div className="text-xs text-gray-500">Inversión mín: 10.000€</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Estado actual de los botones</h2>
        <p className="mb-4">
          Esta sección muestra el estado actual de interés en los botones de esta página para 
          demostrar cómo funciona el callback <code>onInterestChange</code>.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(interestState, null, 2)}
        </pre>
      </Card>
    </div>
  );
};

export default withAuth(InterestButtonExample); 