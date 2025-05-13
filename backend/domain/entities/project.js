/**
 * Entidad de proyecto de inversión
 * Representa un proyecto inmobiliario disponible para inversión
 */
class Project {
  constructor({
    id,
    title,
    description,
    status,
    minimumInvestment,
    targetAmount,
    currentAmount,
    expectedRoi,
    location,
    propertyType,
    draft,
    publishedAt,
    createdBy,
    publishedBy,
    createdAt
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status || 'draft';
    this.minimumInvestment = minimumInvestment;
    this.targetAmount = targetAmount;
    this.currentAmount = currentAmount || 0;
    this.expectedRoi = expectedRoi;
    this.location = location;
    this.propertyType = propertyType;
    this.draft = draft !== undefined ? draft : true;
    this.publishedAt = publishedAt;
    this.createdBy = createdBy;
    this.publishedBy = publishedBy;
    this.createdAt = createdAt || new Date();
  }

  /**
   * Calcula el porcentaje de financiación actual del proyecto
   * @returns {number} - Porcentaje de financiación (0-100)
   */
  getFinancingPercentage() {
    if (!this.targetAmount || this.targetAmount <= 0) return 0;
    
    const percentage = (this.currentAmount / this.targetAmount) * 100;
    return Math.min(100, Math.round(percentage * 100) / 100); // Redondeo a 2 decimales y máximo 100%
  }

  /**
   * Verifica si una inversión cumple con el monto mínimo requerido
   * @param {number} amount - Monto de la inversión a verificar
   * @returns {boolean} - Verdadero si la inversión cumple con el monto mínimo
   */
  meetsMinimumInvestment(amount) {
    return amount >= this.minimumInvestment;
  }

  /**
   * Incrementa el monto actual financiado con una nueva inversión
   * @param {number} amount - Monto de la nueva inversión
   * @returns {number} - Nuevo monto total financiado
   */
  addInvestment(amount) {
    if (amount <= 0) {
      throw new Error('El monto de inversión debe ser mayor que cero');
    }
    
    this.currentAmount += amount;
    return this.currentAmount;
  }

  /**
   * Reduce el monto actual financiado (ej: cancelación de inversión)
   * @param {number} amount - Monto a reducir
   * @returns {number} - Nuevo monto total financiado
   */
  removeInvestment(amount) {
    if (amount <= 0) {
      throw new Error('El monto a reducir debe ser mayor que cero');
    }
    
    if (amount > this.currentAmount) {
      throw new Error('No se puede reducir más del monto actual financiado');
    }
    
    this.currentAmount -= amount;
    return this.currentAmount;
  }

  /**
   * Verifica si el proyecto está completamente financiado
   * @returns {boolean} - Verdadero si el proyecto alcanzó su objetivo
   */
  isFullyFunded() {
    return this.currentAmount >= this.targetAmount;
  }

  /**
   * Verifica si el proyecto está disponible para inversiones
   * @returns {boolean} - Verdadero si se pueden realizar inversiones
   */
  isAvailableForInvestment() {
    return !this.draft && 
           this.status === 'published' && 
           !this.isFullyFunded();
  }

  /**
   * Publica el proyecto haciéndolo visible para inversiones
   * @param {string} publishedBy - ID del usuario que publica el proyecto
   */
  publish(publishedBy) {
    if (!publishedBy) {
      throw new Error('Se requiere un usuario para publicar el proyecto');
    }
    
    this.draft = false;
    this.status = 'published';
    this.publishedAt = new Date();
    this.publishedBy = publishedBy;
  }

  /**
   * Valida que el proyecto tenga todos los datos necesarios para ser publicado
   * @returns {boolean} - Verdadero si el proyecto es válido para publicación
   * @throws {Error} - Error si el proyecto no es válido
   */
  validateForPublication() {
    if (!this.title || this.title.trim() === '') 
      throw new Error('El proyecto debe tener un título');
    
    if (!this.description || this.description.trim() === '') 
      throw new Error('El proyecto debe tener una descripción');
    
    if (!this.minimumInvestment || this.minimumInvestment <= 0)
      throw new Error('El proyecto debe especificar una inversión mínima válida');
    
    if (!this.targetAmount || this.targetAmount <= 0)
      throw new Error('El proyecto debe especificar un monto objetivo válido');
    
    if (!this.expectedRoi || this.expectedRoi < 0)
      throw new Error('El proyecto debe especificar un ROI esperado válido');
    
    if (!this.location)
      throw new Error('El proyecto debe especificar una ubicación');
    
    if (!this.propertyType)
      throw new Error('El proyecto debe especificar un tipo de propiedad');
    
    return true;
  }
}

module.exports = Project; 