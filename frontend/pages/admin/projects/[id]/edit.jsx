import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import ProjectForm from '../../../../components/Admin/ProjectForm';
import ProjectDocumentManager from '../../../../components/Admin/ProjectDocumentManager';
import BackButton from '../../../../components/ui/BackButton';
import { Tab } from '@headlessui/react';
import { DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import projectService from '../../../../services/projectService';
import { withAuth } from '../../../../utils/withAuth';

/**
 * Página para editar un proyecto existente
 */
const EditProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar los datos del proyecto
  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);
  
  // Función para cargar los datos del proyecto
  const loadProject = async (projectId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await projectService.getProjectById(projectId);
      setProject(data);
    } catch (err) {
      console.error('Error al cargar el proyecto:', err);
      setError('No se pudo cargar la información del proyecto. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  
  // Manjar éxito en la actualización
  const handleUpdateSuccess = (updatedProject) => {
    setProject(updatedProject);
  };
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Editar Proyecto</h1>
            <BackButton href="/admin/projects" />
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <svg className="animate-spin h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">Cargando proyecto...</p>
            </div>
          ) : project ? (
            <Tab.Group>
              <Tab.List className="flex rounded-xl bg-gray-100 p-1 mb-6">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 focus:outline-none ${
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                    }`
                  }
                >
                  <div className="flex items-center justify-center">
                    <PencilSquareIcon className="h-5 w-5 mr-1" />
                    Datos del Proyecto
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 focus:outline-none ${
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                    }`
                  }
                >
                  <div className="flex items-center justify-center">
                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                    Documentos
                  </div>
                </Tab>
              </Tab.List>
              
              <Tab.Panels>
                <Tab.Panel>
                  <ProjectForm 
                    mode="edit" 
                    initialData={project} 
                    onSuccess={handleUpdateSuccess} 
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <ProjectDocumentManager 
                    projectId={id} 
                    readOnly={project.status === 'published'} 
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontró el proyecto</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(EditProjectPage, ['manager']); 