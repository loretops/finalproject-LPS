# Documentación del Proyecto COOPCO

## Estructura de la Documentación

### 📂 Arquitectura
- [Diseño del Sistema](architecture/system-design.md) - Arquitectura general del proyecto
- [Despliegue](architecture/deployment.md) - Guía de despliegue y configuración de infraestructura

### 📂 Producto
- [Historias de Usuario](product/user-stories.md) - Historias de usuario del MVP
- [Tickets de Trabajo](product/tickets.md) - Tickets detallados para el desarrollo

### 📂 Guías Técnicas
- [Configuración del Entorno](technical/setup.md) - Cómo configurar el entorno de desarrollo
- [Variables de Entorno](technical/env-example.md) - Guía de configuración de .env

### 📂 Recursos Visuales
- Diagramas de arquitectura
- Esquemas de la base de datos
- Mockups y diseños de UI

## Estructura del Proyecto

```
.
├── frontend/                     # Aplicación frontend (Next.js)
│   ├── pages/                    # Rutas del sitio
│   ├── components/               # Componentes reutilizables
│   ├── services/                 # Funciones para interactuar con el backend
│   ├── context/                  # Contextos globales
│   └── styles/                   # Estilos
│
├── backend/                      # Backend (Node.js + Express)
│   ├── domain/                   # Entidades y lógica de negocio
│   ├── application/              # Casos de uso
│   ├── infrastructure/           # Implementaciones concretas
│   ├── interfaces/               # API, controladores, rutas
│   ├── middleware/               # Middleware de autenticación
│   └── prisma/                   # ORM y modelo de datos
│
├── docs/                         # Esta documentación
├── scripts/                      # Scripts de utilidad
└── .env                          # Variables de entorno
```

## Comenzando

1. Consulta la [Configuración del Entorno](technical/setup.md) para comenzar.
2. Revisa las [Historias de Usuario](product/user-stories.md) para entender los requisitos.
3. Sigue la estructura definida en [Diseño del Sistema](architecture/system-design.md). 