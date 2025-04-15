#!/bin/bash

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Script de Despliegue COOPCO ===${NC}"
echo "Este script facilita el proceso de despliegue en Vercel y Render"

# Verificar cambios locales
echo -e "\n${YELLOW}Verificando cambios en Git...${NC}"
git status

# Preguntar qué hacer
echo -e "\n${YELLOW}¿Qué acción deseas realizar?${NC}"
echo "1) Ejecutar entorno de desarrollo local (frontend + backend)"
echo "2) Ejecutar pruebas y linting"
echo "3) Commit y push de los cambios actuales"
echo "4) Abrir dashboard de Vercel"
echo "5) Abrir dashboard de Render"
echo "6) Salir"

read -p "Selecciona una opción (1-6): " option

case $option in
  1)
    echo -e "\n${GREEN}Iniciando entorno de desarrollo local...${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:5000"
    npm run dev:all
    ;;
  2)
    echo -e "\n${GREEN}Ejecutando pruebas y linting...${NC}"
    npm run lint
    echo -e "\n${GREEN}Linting completado${NC}"
    ;;
  3)
    echo -e "\n${GREEN}Preparando commit y push...${NC}"
    read -p "Mensaje de commit: " commit_message
    
    # Añadir todos los cambios
    git add .
    
    # Commit con el mensaje proporcionado
    git commit -m "$commit_message"
    
    # Push al repositorio remoto
    git push
    
    echo -e "\n${GREEN}¡Push realizado con éxito!${NC}"
    echo "El despliegue automático comenzará en Vercel y Render si está configurado."
    ;;
  4)
    echo -e "\n${GREEN}Abriendo dashboard de Vercel...${NC}"
    open https://vercel.com/dashboard
    ;;
  5)
    echo -e "\n${GREEN}Abriendo dashboard de Render...${NC}"
    open https://dashboard.render.com
    ;;
  6)
    echo -e "\n${GREEN}Saliendo del script de despliegue${NC}"
    exit 0
    ;;
  *)
    echo -e "\n${RED}Opción inválida${NC}"
    exit 1
    ;;
esac 