import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import InterestButton from '../../components/projects/InterestButton';
import Card from '../../components/ui/Card';
import { Toaster } from 'react-hot-toast';

/**
 * Página de ejemplo para probar el botón "Me interesa" en distintas configuraciones
 */
const InterestButtonTestPage = () => {
  // Estado para rastrear los intereses simulados
  const [interests, setInterests] = useState({
    'project-1': false,
    'project-2': true,
    'project-3': false,
    'project-4': true,
    'project-5': false,
    'project-6': false,
  });

  // Manejador de cambio de interés
  const handleInterestChange = (projectId, isInterested) => {
    console.log(`Proyecto ${projectId}: ${isInterested ? 'interesado' : 'no interesado'}`);
    setInterests(prev => ({
      ...prev,
      [projectId]: isInterested
    }));
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test del botón "Me Interesa"</h1>
          <p className="mt-2 text-lg text-gray-600">
            Esta página muestra las diferentes variantes y estados del botón "Me Interesa".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variante por defecto */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Variante por defecto</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Estado no interesado:</span>
                <InterestButton 
                  projectId="project-1" 
                  onInterestChange={(newState) => handleInterestChange('project-1', newState)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Estado interesado:</span>
                <InterestButton 
                  projectId="project-2" 
                  onInterestChange={(newState) => handleInterestChange('project-2', newState)}
                />
              </div>
            </div>
          </Card>

          {/* Tamaños */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Diferentes tamaños</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Tamaño pequeño (sm):</span>
                <InterestButton 
                  projectId="project-3" 
                  size="sm"
                  onInterestChange={(newState) => handleInterestChange('project-3', newState)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Tamaño grande (lg):</span>
                <InterestButton 
                  projectId="project-4" 
                  size="lg"
                  onInterestChange={(newState) => handleInterestChange('project-4', newState)}
                />
              </div>
            </div>
          </Card>

          {/* Variantes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Variantes de estilo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Variante outline:</span>
                <InterestButton 
                  projectId="project-5" 
                  variant="outline"
                  onInterestChange={(newState) => handleInterestChange('project-5', newState)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <span>Sin texto (solo icono):</span>
                <InterestButton 
                  projectId="project-6" 
                  showText={false}
                  onInterestChange={(newState) => handleInterestChange('project-6', newState)}
                />
              </div>
            </div>
          </Card>

          {/* Estado actual */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Estado actual</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Esta tarjeta muestra el estado actual de interés en cada proyecto.
                Prueba los botones y verás los cambios reflejados aquí:
              </p>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <pre className="text-sm">
                  {JSON.stringify(interests, null, 2)}
                </pre>
              </div>
            </div>
          </Card>

          {/* Instrucciones */}
          <Card className="p-6 col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Instrucciones para pruebas manuales</h2>
            <div className="space-y-3 text-sm">
              <p>1. <strong>Prueba de cambio de estado</strong>: Haz clic en los botones y observa cómo cambian entre los estados "Me interesa" e "Interesado".</p>
              <p>2. <strong>Prueba de autenticación</strong>: Cierra sesión e intenta hacer clic en un botón. Deberías ser redirigido a la página de login.</p>
              <p>3. <strong>Prueba de persistencia</strong>: Navega a otras páginas y regresa. El estado de interés debe mantenerse (requiere backend).</p>
              <p>4. <strong>Prueba de notificaciones</strong>: Al hacer clic en los botones, deberías ver notificaciones toast de éxito/error.</p>
              <p>5. <strong>Prueba en móvil</strong>: Verifica que los botones se ven y funcionan correctamente en dispositivos móviles.</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default InterestButtonTestPage; 