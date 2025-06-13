#!/bin/bash

# Script para configurar datos de demo para COOPCO
echo "🚀 Configurando datos de demostración para COOPCO..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que Prisma está instalado
if ! command -v npx &> /dev/null; then
    print_error "Error: npx no está instalado. Instala Node.js y npm primero."
    exit 1
fi

print_status "Eliminando datos existentes..."
cd backend
npx prisma migrate reset --force --skip-generate

print_status "Aplicando migraciones..."
npx prisma migrate deploy

print_status "Regenerando cliente Prisma..."
npx prisma generate

print_status "Creando datos básicos (usuarios, roles)..."
node prisma/seed.js

print_status "Creando proyectos de demostración..."
node prisma/demo-seed.js

cd ..

print_status "🎉 Configuración de demo completada!"
echo
echo "📋 Datos creados:"
echo "   👤 Manager: manager@example.com / password123"
echo "   👤 Socio: partner@example.com / password123"
echo "   🏢 5 proyectos de inversión"
echo "   💰 Inversiones de ejemplo"
echo "   📧 Invitación de prueba"
echo
echo "🌐 URLs para probar:"
echo "   Frontend: http://localhost:3001"
echo "   Backend: http://localhost:8001"
echo
print_warning "Asegúrate de que ambos servidores estén ejecutándose:"
echo "   Backend: cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev" 