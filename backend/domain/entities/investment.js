/**
 * Entidad de inversión
 * Representa una inversión realizada por un socio en un proyecto inmobiliario
 */
class Investment {
  constructor({
    id,
    userId,
    projectId,
    amount,
    investedAt,
    status,
    notes,
    contractReference
  }) {
    this.id = id;
    this.userId = userId;
    this.projectId = projectId;
    this.amount = amount;
    this.investedAt = investedAt || new Date();
    this.status = status || 'pending';
    this.notes = notes;
    this.contractReference = contractReference;
  }

  /**
   * Verifica si la inversión cumple con el monto mínimo requerido
   * @param {number} minimumAmount - Monto mínimo requerido para el proyecto
   * @returns {boolean} - Verdadero si la inversión cumple con el monto mínimo
   */
  meetsMinimumAmount(minimumAmount) {
    return this.amount >= minimumAmount;
  }

  /**
   * Cambia el estado de la inversión
   * @param {string} newStatus - Nuevo estado ('pending', 'confirmed', 'rejected', 'canceled')
   */
  updateStatus(newStatus) {
    // Convertir 'cancelled' a 'canceled' para mantener compatibilidad
    if (newStatus === 'cancelled') {
      newStatus = 'canceled';
    }
    
    const validStatuses = ['pending', 'confirmed', 'rejected', 'canceled'];
    
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Estado de inversión no válido: ${newStatus}`);
    }
    
    this.status = newStatus;
  }

  /**
   * Verifica si la inversión está en estado pendiente
   * @returns {boolean} - Verdadero si la inversión está pendiente
   */
  isPending() {
    return this.status === 'pending';
  }

  /**
   * Verifica si la inversión está confirmada
   * @returns {boolean} - Verdadero si la inversión está confirmada
   */
  isConfirmed() {
    return this.status === 'confirmed';
  }

  /**
   * Valida que la inversión tenga todos los datos necesarios
   * @returns {boolean} - Verdadero si la inversión es válida
   * @throws {Error} - Error si la inversión no es válida
   */
  validate() {
    if (!this.userId) throw new Error('La inversión debe tener un usuario asociado');
    if (!this.projectId) throw new Error('La inversión debe tener un proyecto asociado');
    if (!this.amount || this.amount <= 0) throw new Error('El monto de inversión debe ser mayor que cero');
    
    return true;
  }
}

module.exports = Investment; 