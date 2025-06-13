import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProjectCard from '../../components/projects/ProjectCard';
import withAuth from '../../components/Auth/withAuth';
import interestService from '../../services/interestService';
import publicProjectService from '../../services/publicProjectService';
import { useAuth } from '../../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { XCircleIcon, FolderPlusIcon } from '@heroicons/react/24/outline';

/**
 * Página de "Mis Intereses" donde los socios pueden ver y gestionar proyectos en los que están interesados
 */
const MyInterestsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  // Estados
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  
  // Cargar intereses del usuario
  useEffect(() => {
    const loadInterests = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Obtener lista de intereses
        const userInterests = await interestService.getUserInterests();
        
        // Debug de los datos recibidos
        console.log('Intereses recibidos:', userInterests);
        
        // Transformar los datos para añadir la URL de imagen si falta
        const processedInterests = userInterests.map(interest => {
          if (interest.project) {
            // Debug de los datos del proyecto antes de la transformación
            console.log('Proyecto original:', interest.project);
            
            // Asegurarse de que el proyecto tenga una URL de imagen
            const imageUrl = interest.project.imageUrl || '/images/placeholder-image.png';
            
            // Asegurarse de que los valores monetarios sean números
            // Usar parseFloat para convertir correctamente strings y manejar valores indefinidos
            // Usar tanto camelCase como snake_case para compatibilidad
            const targetAmount = parseFloat(interest.project.targetAmount || interest.project.target_amount || 0);
            const currentAmount = parseFloat(interest.project.currentAmount || interest.project.current_amount || 0);
            const minimumInvestment = parseFloat(interest.project.minimumInvestment || interest.project.minimum_investment || 0);
            
            console.log('Valores monetarios originales y procesados:', {
              targetAmount: {
                original: interest.project.targetAmount || interest.project.target_amount,
                processed: targetAmount
              },
              currentAmount: {
                original: interest.project.currentAmount || interest.project.current_amount,
                processed: currentAmount
              },
              minimumInvestment: {
                original: interest.project.minimumInvestment || interest.project.minimum_investment,
                processed: minimumInvestment
              }
            });
            
            // Crear una copia del proyecto con los campos correctos para ProjectCard
            return {
              ...interest,
              project: {
                ...interest.project,
                image_url: imageUrl,
                property_type: interest.project.propertyType,
                minimum_investment: minimumInvestment,
                expected_roi: interest.project.expectedRoi || interest.project.expected_roi,
                target_amount: targetAmount,
                current_amount: currentAmount
              }
            };
          }
          return interest;
        });
        
        // Debug de los intereses procesados
        console.log('Intereses procesados:', processedInterests);
        
        setInterests(processedInterests);
      } catch (err) {
        console.error('Error al cargar intereses:', err);
        setError('No se pudieron cargar tus intereses. Por favor, inténtalo de nuevo más tarde.');
        toast.error('Error al cargar tus intereses');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInterests();
  }, []);
  
  // Manejar la eliminación de un interés
  const handleRemoveInterest = async (interestId, projectTitle) => {
    try {
      setRemovingId(interestId);
      await interestService.removeInterest(interestId);
      
      // Actualizar la lista de intereses
      setInterests(interests.filter(interest => interest.id !== interestId));
      
      // Mostrar mensaje de éxito
      toast.success(`Se ha eliminado tu interés en ${projectTitle || 'el proyecto'}`);
    } catch (err) {
      console.error('Error al eliminar interés:', err);
      toast.error('No se pudo eliminar el interés');
    } finally {
      setRemovingId(null);
    }
  };
  
  // Renderizar estado de carga
  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>Mis Intereses | COOPCO</title>
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando tus intereses...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Mis Intereses | COOPCO</title>
        <meta 
          name="description" 
          content="Gestiona los proyectos de inversión en los que has mostrado interés" 
        />
      </Head>
      
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Intereses</h1>
          <p className="mt-2 text-lg text-gray-600">
            Proyectos de inversión en los que has mostrado interés
          </p>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        
        {/* Contenido principal */}
        {interests.length > 0 ? (
          <div className="space-y-8">
            {/* Lista de proyectos con interés */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map(interest => (
                <div key={interest.id} className="relative">
                  {/* Botón para eliminar interés */}
                  <button
                    className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleRemoveInterest(interest.id, interest.project?.title)}
                    disabled={removingId === interest.id}
                    title="Eliminar interés"
                    aria-label="Eliminar interés"
                  >
                    <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                  </button>
                  
                  {/* Tarjeta del proyecto */}
                  {interest.project ? (
                    <ProjectCard project={interest.project} />
                  ) : (
                    <Card hover={false} className="h-full p-6 flex flex-col items-center justify-center text-center">
                      <p className="text-gray-500">Este proyecto ya no está disponible</p>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <FolderPlusIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No tienes proyectos con interés</h2>
            <p className="mt-1 text-gray-500">
              Explora los proyectos disponibles y marca "Me interesa" en aquellos que te gustaría seguir.
            </p>
            <div className="mt-6">
              <Button 
                variant="primary"
                onClick={() => router.push('/projects')}
              >
                Explorar proyectos
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

// Proteger la página para que solo accedan socios
export default withAuth(MyInterestsPage, ['partner', 'investor', 'manager']); 