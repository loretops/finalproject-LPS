/**
 * Formatea un valor numérico como moneda (EUR)
 * @param {number} value - Valor a formatear
 * @returns {string} Valor formateado como moneda
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '';
  
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formatea una fecha en formato local español
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Formatea una fecha con hora en formato local español
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha y hora formateada
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

/**
 * Calcula el tiempo transcurrido desde una fecha hasta ahora
 * @param {string|Date} date - Fecha desde la que calcular
 * @returns {string} Texto descriptivo del tiempo transcurrido
 */
export const timeAgo = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  const seconds = Math.floor((now - dateObj) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) {
    return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
  } else if (months > 0) {
    return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else if (days > 0) {
    return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  } else if (hours > 0) {
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else if (minutes > 0) {
    return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  } else {
    return 'Hace unos segundos';
  }
};

/**
 * Trunca un texto a una longitud máxima y añade puntos suspensivos
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}; 