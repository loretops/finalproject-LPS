import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { ChartBarIcon, UsersIcon, BanknotesIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

/**
 * Componente que muestra un resumen de las inversiones y progreso financiero de un proyecto
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.project - Datos del proyecto
 * @param {Function} [props.onInvest] - Función a ejecutar cuando se hace clic en "Invertir"
 * @param {boolean} [props.showInvestButton=true] - Si se debe mostrar el botón de invertir
 */
const InvestmentSummary = ({ project, onInvest, showInvestButton = true }) => {
  if (!project) return null;
  
  // Asegurar que currentAmount tenga un valor (usar formato snake_case del servicio)
  const currentAmount = project.current_amount || 0;
  const targetAmount = project.target_amount || 0;
  
  // Calcular porcentaje de inversión
  const fundingPercentage = targetAmount > 0 
    ? (currentAmount / targetAmount) * 100
    : 0;
  
  // Determinar el color de la barra de progreso según el porcentaje
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 50) return 'bg-emerald-500'; 
    if (percentage >= 25) return 'bg-cyan-500';
    return 'bg-sky-500';
  };
  
  // Comprobar si el proyecto está completamente financiado
  const isFullyFunded = fundingPercentage >= 100;
  
  // Calcular la cantidad restante para alcanzar el objetivo
  const remainingAmount = Math.max(0, targetAmount - currentAmount);
  
  // Renderizar la barra de progreso
  const renderProgressBar = () => (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${getProgressColor(fundingPercentage)}`}
        style={{ width: `${Math.min(100, fundingPercentage)}%` }}
      />
    </div>
  );
  
  return (
    <Card className="p-6 h-full">
      <div className="space-y-6">
        {/* Cabecera con título */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-primary-500" />
            Progreso de inversión
          </h3>
        </div>
        
        {/* Barra de progreso */}
        <div className="space-y-2">
          {renderProgressBar()}
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-900">
              {formatCurrency(currentAmount)}
            </span>
            <span className="text-gray-500">
              {formatPercentage(fundingPercentage)}
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(targetAmount)}
            </span>
          </div>
        </div>
        
        {/* Resumen de la inversión */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <BanknotesIcon className="h-4 w-4 mr-1" />
              Inversión mínima
            </p>
            <p className="text-base font-medium">
              {formatCurrency(project.minimum_investment)}
            </p>
          </div>
          
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Inversiones
            </p>
            <p className="text-base font-medium">
              {project.investmentCount || 0} inversores
            </p>
          </div>
          
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              Restante
            </p>
            <p className="text-base font-medium">
              {isFullyFunded ? (
                <span className="text-green-600">¡Objetivo alcanzado!</span>
              ) : (
                formatCurrency(remainingAmount)
              )}
            </p>
          </div>
          
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <UsersIcon className="h-4 w-4 mr-1" />
              Interesados
            </p>
            <p className="text-base font-medium">
              {project.interestCount || 0} socios
            </p>
          </div>
        </div>
        
        {/* Botón de invertir */}
        {showInvestButton && (
          <div>
            <Button
              variant="primary"
              fullWidth
              onClick={onInvest}
              disabled={!project.active || project.draft || isFullyFunded}
            >
              {isFullyFunded 
                ? 'Financiación completada' 
                : project.active 
                  ? '¡Quiero invertir!' 
                  : 'Proyecto no disponible'
              }
            </Button>
            
            {project.active && !isFullyFunded && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Mínimo de {formatCurrency(project.minimum_investment)} por inversión
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default InvestmentSummary; 