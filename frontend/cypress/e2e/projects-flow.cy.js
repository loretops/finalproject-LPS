// Pruebas e2e para el flujo de visualización de proyectos
describe('Flujo de visualización de proyectos', () => {
  // Datos de prueba
  const mockProjects = [
    {
      id: '1',
      title: 'Proyecto Residencial Las Palmas',
      description: 'Un increíble proyecto residencial...',
      location: 'Madrid',
      property_type: 'Residencial',
      minimum_investment: 50000,
      target_amount: 2000000,
      current_amount: 1000000,
      expected_roi: 12.5,
      status: 'published',
      image_url: 'https://example.com/image1.jpg',
      documents: []
    },
    {
      id: '2',
      title: 'Edificio de Oficinas Centro',
      description: 'Edificio de oficinas en el centro...',
      location: 'Barcelona',
      property_type: 'Comercial',
      minimum_investment: 75000,
      target_amount: 5000000,
      current_amount: 2500000,
      expected_roi: 10,
      status: 'published',
      image_url: 'https://example.com/image2.jpg',
      documents: []
    }
  ];

  const mockProjectDetails = {
    id: '1',
    title: 'Proyecto Residencial Las Palmas',
    description: 'Un increíble proyecto residencial...',
    location: 'Madrid',
    property_type: 'Residencial',
    minimum_investment: 50000,
    target_amount: 2000000,
    current_amount: 1000000,
    expected_roi: 12.5,
    status: 'published',
    image_url: 'https://example.com/image1.jpg',
    documents: [
      {
        id: '1',
        title: 'Imagen 1',
        fileUrl: 'https://example.com/image1.jpg',
        fileType: 'image/jpeg',
        documentType: 'image'
      },
      {
        id: '2',
        title: 'Documento Legal',
        fileUrl: 'https://example.com/doc1.pdf',
        fileType: 'application/pdf',
        documentType: 'legal'
      }
    ]
  };

  beforeEach(() => {
    // Interceptar la solicitud de autenticación
    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 200,
      body: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'partner'
      }
    }).as('authMe');

    // Interceptar la solicitud de proyectos
    cy.intercept('GET', '**/api/projects/public*', {
      statusCode: 200,
      body: {
        data: mockProjects,
        pagination: {
          page: 1,
          totalPages: 1,
          totalItems: mockProjects.length
        }
      }
    }).as('getProjects');

    // Interceptar la solicitud de detalle de proyecto
    cy.intercept('GET', '**/api/projects/public/1', {
      statusCode: 200,
      body: mockProjectDetails
    }).as('getProjectDetails');

    // Interceptar la solicitud de interés en un proyecto
    cy.intercept('POST', '**/api/projects/public/*/interest', {
      statusCode: 200,
      body: { success: true }
    }).as('registerInterest');

    // Simular autenticación
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', 'mock-token-for-testing');
      win.localStorage.setItem('user', JSON.stringify({
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'partner'
      }));
    });
  });

  // Crear un comando personalizado para esperar a que la página se cargue
  Cypress.Commands.add('waitForPageLoad', () => {
    cy.wait('@authMe').its('response.statusCode').should('eq', 200);
  });

  // Test 1: Verificar la carga del listado de proyectos
  it('debería cargar correctamente la página de listado de proyectos', () => {
    // Visitar la página de proyectos
    cy.visit('/projects');
    cy.wait('@getProjects');
    
    // Verificar que el título de la página es correcto
    cy.contains('h1', 'Oportunidades de Inversión').should('exist');
    
    // Verificar que los proyectos se muestran
    cy.get('.grid-cols-1.md\\:grid-cols-2').should('exist');
    cy.contains('Proyecto Residencial Las Palmas').should('exist');
  });

  // Test 2: Probar la funcionalidad de filtrado
  it('debería filtrar proyectos correctamente', () => {
    cy.visit('/projects');
    
    // Seleccionar un tipo de propiedad del filtro
    cy.get('[data-testid="filter-property-type"]').click();
    cy.get('[data-testid="property-type-option-residential"]').click();
    
    // Verificar que la URL se actualiza con el filtro
    cy.url().should('include', 'propertyType=residential');
    
    // Verificar que el filtro se aplica visualmente
    cy.get('[data-testid="active-filters"]').should('contain', 'Residencial');
  });

  // Test 3: Probar la funcionalidad de ordenación
  it('debería ordenar proyectos correctamente', () => {
    cy.visit('/projects');
    
    // Cambiar la ordenación
    cy.get('[data-testid="sort-dropdown"]').click();
    cy.get('[data-testid="sort-option-roi-desc"]').click();
    
    // Verificar que la URL se actualiza con la ordenación
    cy.url().should('include', 'sort=expectedRoi');
    cy.url().should('include', 'direction=desc');
  });

  // Test 4: Probar la navegación a la página de detalle
  it('debería navegar correctamente a la página de detalle', () => {
    cy.visit('/projects');
    cy.wait('@getProjects');
    
    // Hacer clic en un proyecto
    cy.contains('Proyecto Residencial Las Palmas').click();
    cy.wait('@getProjectDetails');
    
    // Verificar que estamos en la página de detalle
    cy.url().should('include', '/projects/1');
    cy.contains('h1', 'Proyecto Residencial Las Palmas').should('exist');
  });

  // Test 5: Verificar las pestañas en la página de detalle
  it('debería mostrar correctamente las pestañas en la página de detalle', () => {
    cy.visit('/projects/1');
    cy.wait('@getProjectDetails');
    
    // Verificar que las pestañas existen
    cy.contains('button', 'Descripción').should('exist');
    cy.contains('button', 'Galería').should('exist');
    cy.contains('button', 'Documentos').should('exist');
    
    // Cambiar a la pestaña de galería
    cy.contains('button', 'Galería').click();
    
    // Cambiar a la pestaña de documentos
    cy.contains('button', 'Documentos').click();
  });

  // Test 6: Probar la funcionalidad de interés
  it('debería permitir marcar interés en un proyecto', () => {
    cy.visit('/projects/1');
    cy.wait('@getProjectDetails');
    
    // Hacer clic en el botón de interés
    cy.contains('button', 'Marcar interés').click();
    cy.wait('@registerInterest');
    
    // Verificar que el estado cambia
    cy.contains('Interesado').should('exist');
  });

  // Test 7: Probar la funcionalidad del visor de imágenes
  it('debería funcionar correctamente el visor de imágenes', () => {
    cy.visit('/projects/1');
    
    // Ir a la pestaña de galería
    cy.get('[data-testid="tab-gallery"]').click();
    
    // Verificar que se muestra el visor de imágenes
    cy.get('[data-testid="image-gallery"]').should('be.visible');
    
    // Probar navegación entre imágenes (si hay más de una)
    cy.get('[data-testid="image-gallery"]').then(($gallery) => {
      if ($gallery.find('[data-testid="next-image-button"]').length > 0) {
        cy.get('[data-testid="next-image-button"]').click();
        // Verificar que la imagen ha cambiado (esto dependerá de cómo implementemos la verificación)
      }
    });
    
    // Probar el modo pantalla completa
    cy.get('[data-testid="fullscreen-button"]').click();
    cy.get('[data-testid="fullscreen-gallery"]').should('be.visible');
    cy.get('[data-testid="close-fullscreen-button"]').click();
  });
}); 