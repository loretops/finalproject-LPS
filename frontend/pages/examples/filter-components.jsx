import React, { useState } from 'react';
import Head from 'next/head';
import ProjectFilters from '../../components/projects/filters/ProjectFilters';
import ProjectSorting from '../../components/projects/filters/ProjectSorting';
import ProjectCard from '../../components/projects/ProjectCard';
import Card from '../../components/ui/Card';

// Datos de ejemplo para demostración
const mockProjects = [
  {
    id: 'project-1',
    title: 'Residencial Las Palmas',
    description: 'Proyecto residencial con 20 apartamentos en una zona exclusiva',
    location: 'Madrid',
    property_type: 'Residencial',
    minimum_investment: 50000,
    target_amount: 2000000,
    current_amount: 1000000,
    expected_roi: 12.5,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    published_at: '2025-01-15'
  },
  {
    id: 'project-2',
    title: 'Oficinas Centro Empresarial',
    description: 'Edificio de oficinas modernas en pleno centro financiero',
    location: 'Barcelona',
    property_type: 'Comercial',
    minimum_investment: 100000,
    target_amount: 5000000,
    current_amount: 2500000,
    expected_roi: 10.0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
    published_at: '2025-02-20'
  },
  {
    id: 'project-3',
    title: 'Complejo Turístico Playa Azul',
    description: 'Resort en primera línea de playa con instalaciones de lujo',
    location: 'Málaga',
    property_type: 'Turístico',
    minimum_investment: 75000,
    target_amount: 8000000,
    current_amount: 1500000,
    expected_roi: 15.0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    published_at: '2025-03-05'
  },
  {
    id: 'project-4',
    title: 'Centro Logístico Norte',
    description: 'Nave industrial con excelentes comunicaciones',
    location: 'Valencia',
    property_type: 'Industrial',
    minimum_investment: 80000,
    target_amount: 3000000,
    current_amount: 2800000,
    expected_roi: 8.2,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=2070&auto=format&fit=crop',
    published_at: '2025-02-10'
  },
  {
    id: 'project-5',
    title: 'Edificio Residencial Marina',
    description: 'Apartamentos de lujo con vistas al mar',
    location: 'Barcelona',
    property_type: 'Residencial',
    minimum_investment: 65000,
    target_amount: 4000000,
    current_amount: 3200000,
    expected_roi: 11.8,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop',
    published_at: '2025-01-25'
  }
];

// Extraer listas únicas de tipos de propiedad y ubicaciones
const propertyTypes = [...new Set(mockProjects.map(p => p.property_type))];
const locations = [...new Set(mockProjects.map(p => p.location))];

/**
 * Página de demostración para los componentes de filtrado y ordenación
 */
export default function FilterComponentsDemo() {
  // Estado para filtros y ordenación
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('publishedAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Estado para el modo de visualización
  const [compactMode, setCompactMode] = useState(false);
  
  // Manejar cambio de filtros
  const handleFilterChange = (newFilters) => {
    console.log('Nuevos filtros aplicados:', newFilters);
    setFilters(newFilters);
  };
  
  // Manejar cambio de ordenación
  const handleSortChange = (field, direction) => {
    console.log(`Ordenando por ${field} en dirección ${direction}`);
    setSortField(field);
    setSortDirection(direction);
  };
  
  // Filtrar proyectos según los filtros seleccionados
  const filteredProjects = mockProjects.filter(project => {
    // Filtrar por tipo de propiedad
    if (filters.propertyType && project.property_type !== filters.propertyType) {
      return false;
    }
    
    // Filtrar por ubicación
    if (filters.location && project.location !== filters.location) {
      return false;
    }
    
    // Filtrar por ROI mínimo
    if (filters.minRoi && project.expected_roi < filters.minRoi) {
      return false;
    }
    
    // Filtrar por inversión máxima
    if (filters.maxInvestment && project.minimum_investment > filters.maxInvestment) {
      return false;
    }
    
    return true;
  });
  
  // Ordenar proyectos según el criterio seleccionado
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Manejar el caso por defecto
    if (!sortField) return 0;
    
    // Mapeo de propiedades del API a propiedades del objeto
    const fieldMap = {
      publishedAt: 'published_at',
      expectedRoi: 'expected_roi',
      minimumInvestment: 'minimum_investment',
      currentAmount: 'current_amount',
      title: 'title'
    };
    
    const field = fieldMap[sortField] || sortField;
    
    // Comparación según el tipo de campo
    if (typeof a[field] === 'string') {
      const comparison = a[field].localeCompare(b[field]);
      return sortDirection === 'asc' ? comparison : -comparison;
    } else {
      const comparison = a[field] - b[field];
      return sortDirection === 'asc' ? comparison : -comparison;
    }
  });
  
  return (
    <>
      <Head>
        <title>Componentes de Filtrado y Ordenación</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Demostración de Componentes de Filtrado</h1>
            <p className="text-gray-600 mb-6">
              Esta página muestra los componentes de filtrado y ordenación para proyectos de inversión.
              Puedes probar diferentes filtros y opciones de ordenación para ver cómo funcionan.
            </p>
            
            <div className="flex items-center mb-6">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={compactMode}
                  onChange={(e) => setCompactMode(e.target.checked)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">
                  Modo compacto
                </span>
              </label>
              <div className="text-sm text-gray-500 ml-4">
                Habilita/deshabilita el modo compacto para los componentes
              </div>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <ProjectFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              propertyTypes={propertyTypes}
              locations={locations}
              compact={compactMode}
            />
          </div>
          
          {/* Contenido principal con ordenación y resultados */}
          <div className="lg:col-span-3">
            <ProjectSorting 
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              compact={compactMode}
            />
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-4">
                Mostrando {sortedProjects.length} de {mockProjects.length} proyectos
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    onInterestClick={(id) => console.log(`Interés marcado en proyecto ${id}`)}
                  />
                ))}
              </div>
              
              {sortedProjects.length === 0 && (
                <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron proyectos
                  </h3>
                  <p className="text-gray-500">
                    No hay proyectos que coincidan con los filtros seleccionados.
                    Intenta ajustar los criterios de búsqueda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 