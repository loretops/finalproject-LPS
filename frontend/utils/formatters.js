/**
 * Formatea un número como moneda (EUR)
 * @param {number|string} value - Valor a formatear
 * @param {string} [locale='es-ES'] - Configuración regional
 * @param {string} [currency='EUR'] - Moneda
 * @returns {string} - Valor formateado como moneda
 */
export const formatCurrency = (value, locale = 'es-ES', currency = 'EUR') => {
  // Asegurar que value es un número
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0,00 €';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numValue);
};

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} [locale='es-ES'] - Configuración regional
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, locale = 'es-ES') => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
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

/**
 * Formatea un número como porcentaje
 * @param {number|string} value - Valor a formatear
 * @param {number} [decimals=1] - Número de decimales
 * @param {string} [locale='es-ES'] - Configuración regional
 * @returns {string} - Valor formateado como porcentaje
 */
export const formatPercentage = (value, decimals = 1, locale = 'es-ES') => {
  // Asegurar que value es un número
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0%';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(numValue / 100);
}; 