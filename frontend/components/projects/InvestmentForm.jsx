import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import investmentService from '../../services/investmentService';
import { formatCurrency } from '../../utils/formatters';

/**
 * Componente de formulario para invertir en un proyecto
 */
const InvestmentForm = ({ project, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Calcular sugerencias de inversión basadas en el mínimo y el objetivo
  const minInvestment = parseFloat(project.minimum_investment);
  const remainingAmount = parseFloat(project.target_amount) - parseFloat(project.current_amount);
  
  // Definir sugerencias de inversión
  const investmentSuggestions = [
    minInvestment,
    Math.max(minInvestment * 2, minInvestment + 10000),
    Math.max(minInvestment * 5, minInvestment + 30000),
    remainingAmount // Opción para invertir todo lo restante
  ].filter((value, index, self) => 
    // Filtrar duplicados y valores mayores que el restante
    value <= remainingAmount && 
    self.indexOf(value) === index
  );

  /**
   * Maneja el cambio en el campo de monto
   */
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, ''); // Solo permitir números y punto
    setAmount(value);
    setError(null);
  };

  /**
   * Selecciona un monto predefinido
   */
  const selectAmount = (value) => {
    setAmount(value.toString());
    setError(null);
  };

  /**
   * Envía el formulario de inversión
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validar monto
    const amountValue = parseFloat(amount);
    if (!amountValue || isNaN(amountValue)) {
      setError('Por favor, ingresa un monto válido');
      return;
    }
    
    if (amountValue < minInvestment) {
      setError(`El monto mínimo de inversión es ${formatCurrency(minInvestment)}`);
      return;
    }
    
    if (amountValue > remainingAmount) {
      setError(`El monto máximo disponible para inversión es ${formatCurrency(remainingAmount)}`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Llamar al servicio para crear la inversión
      const response = await investmentService.createInvestment(project.id, {
        amount: amountValue,
        notes: notes.trim() || undefined
      });
      
      toast.success('¡Inversión registrada con éxito!');
      
      // Limpiar el formulario
      setAmount('');
      setNotes('');
      
      // Notificar al componente padre
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error al realizar inversión:', error);
      setError(error.message || 'Error al procesar tu inversión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Invertir en este proyecto</h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-gray-600">Inversión mínima</p>
            <p className="text-lg font-bold text-blue-800">{formatCurrency(project.minimum_investment)}</p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <p className="text-sm text-gray-600">Disponible para inversión</p>
            <p className="text-lg font-bold text-green-800">{formatCurrency(remainingAmount)}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Puedes invertir entre {formatCurrency(minInvestment)} y {formatCurrency(remainingAmount)}</p>
          <div className="flex flex-wrap gap-2">
            {investmentSuggestions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => selectAmount(value)}
                className={`px-3 py-1 text-sm border rounded-full transition-colors
                  ${amount === value.toString() 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
              >
                {formatCurrency(value)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Monto a invertir *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">€</span>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el monto"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Añade notas o condiciones específicas (opcional)"
            rows="3"
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 text-white font-medium rounded-md transition
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar inversión'}
        </button>
        
        <p className="mt-3 text-xs text-gray-500 text-center">
          Al confirmar, estás expresando tu interés inicial en invertir. 
          Un gestor revisará tu solicitud y se pondrá en contacto contigo para formalizar la inversión.
        </p>
      </form>
    </div>
  );
};

InvestmentForm.propTypes = {
  /** Datos del proyecto en el que se invertirá */
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    minimum_investment: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    target_amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    current_amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }).isRequired,
  /** Función a llamar después de una inversión exitosa */
  onSuccess: PropTypes.func
};

export default InvestmentForm; 