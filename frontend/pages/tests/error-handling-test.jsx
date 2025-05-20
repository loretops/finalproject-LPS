import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import { handleClientError } from '../../utils/errorHandler';
import errorMonitor from '../../utils/errorMonitor';

// Ejemplos de errores para pruebas
const errorExamples = [
  {
    name: 'Error de validación',
    error: {
      message: 'El monto de inversión debe ser al menos de 5000',
      status: 400,
      data: { field: 'amount', minValue: 5000 }
    },
    context: 'Crear inversión'
  },
  {
    name: 'Error de autenticación',
    error: {
      message: 'Tu sesión ha expirado',
      status: 401
    },
    context: 'Ver detalles de inversión'
  },
  {
    name: 'Error de permisos',
    error: {
      message: 'No tienes permisos para realizar esta acción',
      status: 403
    },
    context: 'Cancelar inversión'
  },
  {
    name: 'Error de recurso no encontrado',
    error: {
      message: 'Inversión no encontrada',
      status: 404
    },
    context: 'Ver detalles de inversión'
  },
  {
    name: 'Error de conflicto',
    error: {
      message: 'Ya has realizado una inversión en este proyecto',
      status: 409
    },
    context: 'Crear inversión'
  },
  {
    name: 'Error interno del servidor',
    error: {
      message: 'Error interno del servidor',
      status: 500,
      data: { 
        errorCode: 'DB_CONNECTION_ERROR',
        details: 'No se pudo conectar a la base de datos'
      }
    },
    context: 'Actualizar estado de inversión'
  },
  {
    name: 'Error de red',
    error: {
      message: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.',
      request: {} // Simula error.request presente
    },
    context: 'Cargar inversiones'
  }
];

const ErrorHandlingTestPage = () => {
  const [lastErrorId, setLastErrorId] = useState(null);
  
  // Función para probar el manejo de un error específico
  const testErrorHandling = (example) => {
    // 1. Mostrar toast nativo para comparación
    toast.error(`Error nativo: ${example.error.message}`);
    
    // 2. Usar nuestro manejador de errores personalizado
    const error = { ...example.error }; // Clonar para no modificar el original
    handleClientError(error, { context: example.context });
    
    // 3. Registrar el error si es crítico (500)
    if (error.status >= 500) {
      const errorId = errorMonitor.logServerError(error, {
        component: 'ErrorHandlingTestPage',
        action: 'testErrorHandling',
        additionalData: { example: example.name }
      });
      setLastErrorId(errorId);
    } else {
      const errorId = errorMonitor.logError(error, {
        component: 'ErrorHandlingTestPage',
        action: 'testErrorHandling',
        additionalData: { example: example.name }
      });
      setLastErrorId(errorId);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Toaster position="top-right" />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prueba de Manejo de Errores</h1>
          <p className="mt-2 text-lg text-gray-600">
            Esta página permite probar el sistema de manejo y monitoreo de errores.
          </p>
          {lastErrorId && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                Último error registrado: <code className="font-mono">{lastErrorId}</code>
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {errorExamples.map((example, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">{example.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Status: {example.error.status || 'N/A'}</p>
              <p className="text-sm text-gray-700 mt-2">{example.error.message}</p>
              <div className="mt-4">
                <Button 
                  onClick={() => testErrorHandling(example)}
                  variant="secondary"
                  className="w-full"
                >
                  Probar Error
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
          <p className="mt-2 text-gray-700">
            Haz clic en los botones para probar diferentes tipos de errores.
            Observa cómo los errores se muestran en las notificaciones toast y
            cómo se registran en la consola del navegador.
          </p>
          <p className="mt-2 text-gray-700">
            Los errores críticos (500) se registran con mayor detalle y se monitorean
            para diagnóstico posterior.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorHandlingTestPage; 