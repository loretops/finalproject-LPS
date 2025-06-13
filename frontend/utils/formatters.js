/**
 * Formatea un número como moneda
 * @param {number|string} amount - Cantidad a formatear
 * @param {string} [currency='EUR'] - Moneda (por defecto EUR)
 * @param {string} [locale='es-ES'] - Configuración regional para el formato
 * @returns {string} - Cantidad formateada con símbolo de moneda
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'es-ES') => {
  // Asegurarse de que amount sea un número válido
  const numAmount = typeof amount === 'number' ? amount : parseFloat(amount || 0);
  
  // Verificar que es un número válido
  if (isNaN(numAmount)) {
    return `0 ${currency}`;
  }
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(numAmount);
};

/**
 * Formatea un número como porcentaje
 * @param {number|string} value - Valor a formatear
 * @param {number} [decimals=0] - Número de decimales a mostrar
 * @param {string} [locale='es-ES'] - Configuración regional para el formato
 * @returns {string} - Porcentaje formateado
 */
export const formatPercent = (value, decimals = 0, locale = 'es-ES') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value / 100);
};

/**
 * Formatea una fecha
 * @param {string|Date} date - Fecha a formatear
 * @param {Object} [options] - Opciones de formato
 * @param {boolean} [options.includeTime=false] - Si se debe incluir la hora
 * @param {string} [options.dateStyle] - Estilo de fecha ('full', 'long', 'medium', 'short')
 * @param {string} [options.locale='es-ES'] - Configuración regional para el formato
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const { 
    includeTime = false, 
    dateStyle,
    locale = 'es-ES' 
  } = options;
  
  // Si se proporciona dateStyle, usar directamente
  if (dateStyle) {
    return new Intl.DateTimeFormat(locale, { dateStyle }).format(dateObj);
  }
  
  // Si no, usar el formato personalizado
  const formatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if (includeTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }
  
  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
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