import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import projectService from '../../services/projectService';

const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residencial' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'land', label: 'Terreno' },
  { value: 'mixed', label: 'Uso mixto' },
];

/**
 * Componente de formulario para crear o editar proyectos
 * @param {Object} props - Propiedades del componente
 * @param {string} props.mode - Modo del formulario ('create' o 'edit')
 * @param {Object} props.initialData - Datos iniciales para edición
 * @param {Function} props.onSuccess - Función a llamar tras éxito (opcional)
 */
const ProjectForm = ({ mode = 'create', initialData = {}, onSuccess }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minimum_investment: '',
    target_amount: '',
    expected_roi: '',
    property_type: 'residential',
    location: '',
    ...initialData
  });
  
  // Estado de errores del formulario
  const [formErrors, setFormErrors] = useState({});
  
  // Cargar datos para edición
  useEffect(() => {
    if (mode === 'edit' && initialData.id) {
      // Asegurar que el tipo de propiedad coincide con uno de los valores predefinidos
      let propertyType = initialData.property_type;
      if (!PROPERTY_TYPES.some(type => type.value === propertyType)) {
        console.warn(`Tipo de propiedad '${propertyType}' no reconocido, usando 'residential' por defecto`);
        propertyType = 'residential';
      }
      
      setFormData({
        ...formData,
        ...initialData,
        property_type: propertyType // Usar el valor normalizado
      });
      
      // Verificar si el proyecto está publicado y mostrar advertencia
      if (initialData.status === 'published') {
        setError('Este proyecto ya está publicado y no puede ser modificado. Los cambios no se guardarán.');
      }
    }
  }, [initialData, mode]);
  
  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convertir valores numéricos
    const processedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    // Limpiar error del campo
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
    
    // Si se cambia minimum_investment, actualizar target_amount (6x por defecto)
    if (name === 'minimum_investment' && value !== '') {
      const minInvestment = Number(value);
      if (!isNaN(minInvestment) && minInvestment > 0) {
        setFormData(prev => ({
          ...prev,
          target_amount: minInvestment * 6
        }));
      }
    }
  };
  
  // Validar formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'El título es obligatorio';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.minimum_investment) {
      errors.minimum_investment = 'La inversión mínima es obligatoria';
    } else if (isNaN(Number(formData.minimum_investment)) || Number(formData.minimum_investment) <= 0) {
      errors.minimum_investment = 'La inversión mínima debe ser un número positivo';
    }
    
    if (!formData.target_amount) {
      errors.target_amount = 'El monto objetivo es obligatorio';
    } else if (isNaN(Number(formData.target_amount)) || Number(formData.target_amount) <= 0) {
      errors.target_amount = 'El monto objetivo debe ser un número positivo';
    }
    
    if (!formData.expected_roi) {
      errors.expected_roi = 'El ROI esperado es obligatorio';
    } else if (isNaN(Number(formData.expected_roi)) || Number(formData.expected_roi) < 0) {
      errors.expected_roi = 'El ROI esperado debe ser un número positivo';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'La ubicación es obligatoria';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    
    // Verificar si el proyecto está publicado
    if (mode === 'edit' && formData.status === 'published') {
      setError('Los proyectos publicados no pueden ser modificados. Contacte con el administrador si necesita hacer cambios.');
      return;
    }
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Convertir valores de string a número donde corresponda
      const dataToSubmit = {
        ...formData,
        minimum_investment: Number(formData.minimum_investment),
        target_amount: Number(formData.target_amount),
        expected_roi: Number(formData.expected_roi),
        // Asegurar que property_type es uno de los valores permitidos
        property_type: (() => {
          const currentType = formData.property_type;
          const validType = PROPERTY_TYPES.find(t => t.value === currentType);
          return validType ? validType.value : 'residential';
        })()
      };
      
      // Verificación adicional para asegurar que los datos son válidos
      console.log('Datos a enviar:', dataToSubmit);
      
      // Asegurarnos de que los campos están completos
      if (mode === 'edit') {
        // Si falta algún campo requerido, obtener el proyecto completo primero
        if (!dataToSubmit.property_type || !dataToSubmit.status) {
          try {
            const currentProject = await projectService.getProjectById(initialData.id);
            // Combinar con los datos actuales para asegurar que tenemos toda la información
            Object.keys(currentProject).forEach(key => {
              if (dataToSubmit[key] === undefined || dataToSubmit[key] === '') {
                dataToSubmit[key] = currentProject[key];
              }
            });
            console.log('Datos combinados para actualización:', dataToSubmit);
          } catch (fetchError) {
            console.error('Error al obtener datos actuales del proyecto:', fetchError);
            // Continuar con los datos que tenemos
          }
        }
      }
      
      let result;
      if (mode === 'create') {
        result = await projectService.createProject(dataToSubmit);
        setSuccessMessage('Proyecto creado con éxito');
      } else {
        result = await projectService.updateProject(initialData.id, dataToSubmit);
        setSuccessMessage('Proyecto actualizado con éxito');
      }
      
      // Llamar a función de éxito si se proporcionó
      if (onSuccess) {
        onSuccess(result);
      } else {
        // Esperar un momento para mostrar el mensaje de éxito y luego redirigir
        setTimeout(() => {
          router.push('/admin/projects');
        }, 1500);
      }
    } catch (err) {
      console.error('Error al guardar proyecto:', err);
      setError(err.message || 'Error al guardar el proyecto. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {mode === 'create' ? 'Nuevo Proyecto' : 'Editar Proyecto'}
        </h3>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-600">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título *
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm ${
                  formErrors.title 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } sm:text-sm`}
              />
              {formErrors.title && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {formErrors.title && <p className="mt-2 text-sm text-red-600">{formErrors.title}</p>}
          </div>
          
          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción *
            </label>
            <div className="mt-1 relative">
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm ${
                  formErrors.description 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } sm:text-sm`}
              />
              {formErrors.description && (
                <div className="absolute top-0 right-0 pt-2 pr-3 flex items-start pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {formErrors.description && <p className="mt-2 text-sm text-red-600">{formErrors.description}</p>}
          </div>
          
          {/* Fila con dos campos: Inversión Mínima y Monto Objetivo */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Inversión Mínima */}
            <div>
              <label htmlFor="minimum_investment" className="block text-sm font-medium text-gray-700">
                Inversión Mínima (€) *
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  name="minimum_investment"
                  id="minimum_investment"
                  min="0"
                  step="1000"
                  value={formData.minimum_investment}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.minimum_investment 
                      ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  } sm:text-sm`}
                />
                {formErrors.minimum_investment && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {formErrors.minimum_investment && <p className="mt-2 text-sm text-red-600">{formErrors.minimum_investment}</p>}
            </div>
            
            {/* Monto Objetivo */}
            <div>
              <label htmlFor="target_amount" className="block text-sm font-medium text-gray-700">
                Monto Objetivo (€) *
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  name="target_amount"
                  id="target_amount"
                  min="0"
                  step="1000"
                  value={formData.target_amount}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.target_amount 
                      ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  } sm:text-sm`}
                />
                {formErrors.target_amount && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {formErrors.target_amount && <p className="mt-2 text-sm text-red-600">{formErrors.target_amount}</p>}
              <p className="mt-2 text-xs text-gray-500">Por defecto, 6 veces la inversión mínima</p>
            </div>
          </div>
          
          {/* Fila con dos campos: ROI y Tipo de Propiedad */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* ROI Esperado */}
            <div>
              <label htmlFor="expected_roi" className="block text-sm font-medium text-gray-700">
                ROI Esperado (%) *
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  name="expected_roi"
                  id="expected_roi"
                  min="0"
                  step="0.1"
                  value={formData.expected_roi}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.expected_roi 
                      ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  } sm:text-sm`}
                />
                {formErrors.expected_roi && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {formErrors.expected_roi && <p className="mt-2 text-sm text-red-600">{formErrors.expected_roi}</p>}
            </div>
            
            {/* Tipo de Propiedad */}
            <div>
              <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">
                Tipo de Propiedad
              </label>
              <div className="mt-1">
                <select
                  id="property_type"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {PROPERTY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Ubicación *
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Madrid, España"
                className={`block w-full rounded-md shadow-sm ${
                  formErrors.location 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } sm:text-sm`}
              />
              {formErrors.location && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {formErrors.location && <p className="mt-2 text-sm text-red-600">{formErrors.location}</p>}
          </div>
          
          {/* Botones de acción */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : mode === 'create' ? 'Crear Proyecto' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm; 