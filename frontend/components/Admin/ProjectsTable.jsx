import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  ArrowPathIcon,
  ArrowsUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  FunnelIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Componente que muestra una tabla de proyectos con capacidades de filtrado y paginación
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.projects - Lista de proyectos a mostrar
 * @param {Function} props.onDelete - Función a llamar al eliminar un proyecto
 * @param {Function} props.onPublish - Función a llamar al publicar un proyecto
 * @param {Object} props.pagination - Información de paginación
 * @param {Function} props.onPageChange - Función a llamar al cambiar de página
 * @param {string} props.statusFilter - Filtro de estado actual
 * @param {Function} props.onStatusFilterChange - Función a llamar al cambiar el filtro de estado
 * @param {string} props.sortField - Campo por el que se ordena actualmente
 * @param {string} props.sortDirection - Dirección de ordenamiento (asc/desc)
 * @param {Function} props.onSortChange - Función a llamar al cambiar el ordenamiento
 */
const ProjectsTable = ({ 
  projects = [], 
  onDelete, 
  onPublish,
  pagination = { page: 1, totalPages: 1, totalItems: 0 },
  onPageChange,
  statusFilter,
  onStatusFilterChange,
  sortField,
  sortDirection,
  onSortChange 
}) => {
  // Estados locales
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Función para manejar selección de filas
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  // Función para manejar selección de todas las filas
  const toggleSelectAll = () => {
    if (selectedRows.length === projects.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(projects.map(project => project.id));
    }
  };
  
  // Función para manejar cambios en el ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      onSortChange(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'asc');
    }
  };
  
  // Obtener clase de estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Obtener texto de estado
  const getStatusText = (status) => {
    switch (status) {
      case 'draft':
        return 'Borrador';
      case 'published':
        return 'Publicado';
      case 'closed':
        return 'Cerrado';
      default:
        return status;
    }
  };
  
  // Renderizar icono de ordenamiento
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowsUpDownIcon className="h-4 w-4 ml-1" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUpIcon className="h-4 w-4 ml-1" /> 
      : <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Barra de herramientas */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <Link href="/admin/projects/new" className="btn btn-primary flex items-center">
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            <span>Nuevo Proyecto</span>
          </Link>
          
          {selectedRows.length > 0 && (
            <button
              onClick={() => onDelete(selectedRows)}
              className="btn btn-outline text-red-600 hover:bg-red-50"
            >
              <TrashIcon className="h-5 w-5 mr-1" />
              <span>Eliminar {selectedRows.length}</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center">
          <Menu as="div" className="relative">
            <Menu.Button className="btn btn-outline flex items-center">
              <FunnelIcon className="h-5 w-5 mr-1" />
              <span>Estado: {statusFilter ? getStatusText(statusFilter) : 'Todos'}</span>
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => onStatusFilterChange(null)}
                      >
                        Todos
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => onStatusFilterChange('draft')}
                      >
                        Borradores
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => onStatusFilterChange('published')}
                      >
                        Publicados
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => onStatusFilterChange('closed')}
                      >
                        Cerrados
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      
      {/* Tabla de proyectos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={selectedRows.length === projects.length && projects.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  Título
                  {renderSortIcon('title')}
                </div>
              </th>
              <th 
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('minimum_investment')}
              >
                <div className="flex items-center">
                  Inversión Mínima
                  {renderSortIcon('minimum_investment')}
                </div>
              </th>
              <th 
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('expected_roi')}
              >
                <div className="flex items-center">
                  ROI Esperado
                  {renderSortIcon('expected_roi')}
                </div>
              </th>
              <th 
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Estado
                  {renderSortIcon('status')}
                </div>
              </th>
              <th 
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                <div className="flex items-center">
                  Creado
                  {renderSortIcon('created_at')}
                </div>
              </th>
              <th scope="col" className="relative px-3 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-3 py-4 text-center text-sm text-gray-500">
                  No hay proyectos disponibles
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={selectedRows.includes(project.id)}
                      onChange={() => toggleRowSelection(project.id)}
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(project.minimum_investment)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.expected_roi}%</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(project.created_at)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/projects/${project.id}`} className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Ver</span>
                      </Link>
                      <Link href={`/admin/projects/${project.id}/edit`} className="text-gray-600 hover:text-gray-900">
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Editar</span>
                      </Link>
                      {project.status === 'draft' && (
                        <button 
                          onClick={() => onPublish(project.id)} 
                          className="text-green-600 hover:text-green-900"
                        >
                          <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Publicar</span>
                        </button>
                      )}
                      <button 
                        onClick={() => onDelete([project.id])} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      {projects.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{projects.length}</span> de{' '}
            <span className="font-medium">{pagination.totalItems}</span> proyectos
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Anterior</span>
                &laquo;
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    page === pagination.page
                      ? 'bg-primary-50 border-primary-500 text-primary-600 z-10'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.page === pagination.totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Siguiente</span>
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable; 