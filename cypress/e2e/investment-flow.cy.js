/**
 * Tests E2E para el flujo de inversión en proyectos
 */
describe('Flujo de inversión en proyectos', () => {
  beforeEach(() => {
    // Hacemos login como socio antes de cada test
    cy.visit('/login');
    cy.get('input[name="email"]').type('socio@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Iniciar Sesión').click();
    
    // Esperamos a que el login sea exitoso y estemos en la página principal
    cy.url().should('include', '/dashboard');
  });
  
  it('debe mostrar el listado de proyectos disponibles', () => {
    // Navegamos a la página de proyectos
    cy.visit('/projects');
    
    // Verificamos que se muestren proyectos disponibles
    cy.get('[data-cy="project-card"]').should('exist');
    cy.get('[data-cy="project-title"]').should('be.visible');
  });
  
  it('debe permitir ver el detalle de un proyecto', () => {
    // Navegamos a la página de proyectos
    cy.visit('/projects');
    
    // Hacemos clic en el primer proyecto
    cy.get('[data-cy="project-card"]').first().click();
    
    // Verificamos que estamos en la página de detalle
    cy.url().should('include', '/projects/');
    
    // Verificamos información clave del proyecto
    cy.get('[data-cy="project-detail-title"]').should('be.visible');
    cy.get('[data-cy="investment-summary"]').should('exist');
  });
  
  it('debe mostrar el formulario de inversión al hacer clic en "Invertir"', () => {
    // Navegamos directamente a la página de detalle de un proyecto
    cy.visit('/projects/1'); // Asumiendo que el proyecto 1 existe
    
    // Hacemos clic en el botón de invertir
    cy.get('[data-cy="invest-button"]').click();
    
    // Verificamos que aparezca el formulario de inversión
    cy.get('[data-cy="investment-form"]').should('be.visible');
    cy.get('input[name="amount"]').should('exist');
  });
  
  it('debe validar el monto mínimo de inversión', () => {
    // Navegamos directamente a la página de detalle de un proyecto
    cy.visit('/projects/1');
    
    // Hacemos clic en el botón de invertir
    cy.get('[data-cy="invest-button"]').click();
    
    // Intentamos invertir una cantidad muy pequeña
    cy.get('input[name="amount"]').type('10');
    cy.get('[data-cy="submit-investment"]').click();
    
    // Verificamos que aparezca un mensaje de error
    cy.get('[data-cy="amount-error"]').should('be.visible');
  });
  
  it('debe permitir completar el proceso de inversión', () => {
    // Navegamos directamente a la página de detalle de un proyecto
    cy.visit('/projects/1');
    
    // Hacemos clic en el botón de invertir
    cy.get('[data-cy="invest-button"]').click();
    
    // Completamos el formulario con datos válidos
    cy.get('input[name="amount"]').type('5000');
    cy.get('textarea[name="notes"]').type('Inversión de prueba desde Cypress');
    
    // Enviamos el formulario
    cy.get('[data-cy="submit-investment"]').click();
    
    // Verificamos que aparezca un mensaje de éxito
    cy.get('[data-cy="investment-success"]').should('be.visible');
    
    // Verificamos redirección a "Mis Inversiones"
    cy.url().should('include', '/investments');
  });
  
  it('debe mostrar la inversión en la página Mis Inversiones', () => {
    // Navegamos a la página de Mis Inversiones
    cy.visit('/investments');
    
    // Verificamos que se muestre la tabla de inversiones
    cy.get('[data-cy="investments-table"]').should('exist');
    
    // Verificamos que aparezca al menos una inversión
    cy.get('[data-cy="investment-row"]').should('exist');
    
    // Comprobamos que se muestre correctamente información clave
    cy.get('[data-cy="investment-amount"]').should('be.visible');
    cy.get('[data-cy="investment-status"]').should('be.visible');
    cy.get('[data-cy="investment-date"]').should('be.visible');
  });
  
  it('debe permitir ver el detalle de una inversión', () => {
    // Navegamos a la página de Mis Inversiones
    cy.visit('/investments');
    
    // Hacemos clic en "Ver detalles" de la primera inversión
    cy.get('[data-cy="view-investment-details"]').first().click();
    
    // Verificamos que estamos en la página de detalle de inversión
    cy.url().should('include', '/investments/');
    
    // Verificamos que se muestre información detallada
    cy.get('[data-cy="investment-detail-amount"]').should('be.visible');
    cy.get('[data-cy="investment-detail-status"]').should('be.visible');
    cy.get('[data-cy="investment-detail-date"]').should('be.visible');
    cy.get('[data-cy="investment-detail-project"]').should('be.visible');
  });
  
  it('debe permitir cancelar una inversión pendiente', () => {
    // Navegamos a la página de Mis Inversiones
    cy.visit('/investments');
    
    // Buscamos una inversión con estado "pending"
    cy.get('[data-cy="investment-status"]').contains('Pendiente').parents('[data-cy="investment-row"]').within(() => {
      // Hacemos clic en el botón de cancelar
      cy.get('[data-cy="cancel-investment"]').click();
    });
    
    // Confirmamos la cancelación en el modal
    cy.get('[data-cy="confirm-cancel"]').click();
    
    // Verificamos que aparezca un mensaje de éxito
    cy.get('[data-cy="cancel-success"]').should('be.visible');
    
    // Verificamos que la inversión ahora aparezca como "Cancelada"
    cy.get('[data-cy="investment-status"]').contains('Cancelada').should('exist');
  });
}); 