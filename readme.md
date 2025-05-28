## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**
Loreto Pardo de Santayana Galbis

### **0.2. Nombre del proyecto:**
COOPCO

### **0.3. Descripción breve del proyecto:**
Plataforma digital exclusiva para un club privado de inversores inmobiliarios que permite acceder a oportunidades cuidadosamente seleccionadas, con toda la información relevante para evaluar el potencial de rentabilidad, expresar interés, invertir mediante préstamos participativos y seguir el desarrollo del proyecto en tiempo real. Diseñada para garantizar transparencia, seguridad y eficiencia, está orientada a personas que buscan invertir en proyectos inmobiliarios con confianza y control.

### **0.4. URL del proyecto:**
https://coopco.vercel.app

### **0.5. URL o archivo comprimido del repositorio**
https://github.com/loretops/finalproject-LPS

### **0.6. Fecha de última actualización:**
28 de mayo de 2025


---

## 1. Descripción general del producto

> Describe en detalle los siguientes aspectos del producto:

### **1.1. Objetivo:**
## Objetivo del producto 🎯

**Propósito del producto:**

Crear una plataforma exclusiva que conecte a un club privado de inversores con oportunidades inmobiliarias de alta calidad, facilitando una gestión transparente, segura y eficiente del proceso de inversión.

#### 💎 Valor añadido
* **Exclusividad en el acceso:** club cerrado por invitación
* **Inversiones respaldadas por análisis sólidos:** económico, de mercado, visuales
* **Transparencia en la evolución del proyecto:** vídeos en directo y seguimiento continuo
* **Seguridad en la documentación:** acceso restringido, sin descargas
* **Control de compromiso:** se filtran los socios verdaderamente activos
* **Comunicación fluida:** entre gestores e inversores, todo centralizado

#### 🥇 Ventajas competitivas
* Modelo híbrido entre club privado y plataforma digital
* Control sobre el tipo de socio: calidad > cantidad
* Visibilidad estructurada del progreso de cada inversión
* Fuerte componente audiovisual para generar confianza
* Alta transparencia sin renunciar al control
* Posible incorporación futura de IA y tokenización

#### 🧩 Problema que soluciona
* Dificultad de encontrar oportunidades inmobiliarias de calidad
* Falta de control en comunidades de inversión masiva
* Falta de transparencia en la evolución del proyecto tras invertir
* Baja personalización en otras plataformas

#### 🎯 A quién va dirigido
* Inversores inmobiliarios semi-profesionales o profesionales
* Personas con cierto capital disponibles para coinvertir en proyectos reales
* Perfiles que valoran la exclusividad y la información detallada antes de invertir

### **1.2. Características y funcionalidades principales**

| Módulo | Funcionalidad principal |
|--------|------------------------|
| **Acceso y registro** | Web abierta + área privada de socios/inversores por invitación |
| **Panel de inversiones** | Visualización completa solo para socios: datos, estudio económico, vídeos, planos |
| **Interacción "Me interesa"** | Activa la comunicación con gestor. Registro de interacciones y control de participación |
| **Inversión** | Sistema para indicar interés real (% o importe). Avisos al resto de socios |
| **Seguimiento** | Informes semanales, vídeo en directo, documentos legales (sin descarga) |
| **Comunicación** | Mensajería interna, notificaciones, soporte |
| **Seguridad y control** | Acceso restringido, control de usuarios inactivos, documentación solo visible |

####Casos de Uso
## 🔐 1. Gestión de acceso y usuarios

| Código | Caso de uso                        | Descripción                                                                                                |
|--------|------------------------------------|------------------------------------------------------------------------------------------------------------|
| 1.1    | Acceder a la web pública           | Cualquier visitante puede acceder libremente a la información general del proyecto (sin registro).          |
| 1.2    | Enviar invitación a futuro socio  | El gestor envía una invitación personalizada a una persona seleccionada para unirse al Club de Socios.    |
| 1.3    | Registrarse como socio mediante invitación | El usuario invitado accede a un enlace único, completa su registro y se convierte en socio verificado. |
| 1.4    | Autenticarse como socio o inversor | El socio registrado puede iniciar sesión para acceder al área privada (zona de socios/inversores).         |
| 1.5    | Expulsar socio por inactividad     | Si un socio muestra reiterado interés sin inversión, el sistema notifica al gestor y puede gestionarse su expulsión. |

## 🏘️ 2. Gestión de oportunidades de inversión

| Código | Caso de uso                         | Descripción                                                                                             |
|--------|-------------------------------------|---------------------------------------------------------------------------------------------------------|
| 2.1    | Ver oportunidades de inversión (solo socios) | El socio accede a las fichas de proyectos con estudio económico, mercado, planos, fotos y vídeo.    |
| 2.2    | Marcar "Me interesa"                | El socio indica que está interesado en una oportunidad, lo que genera una notificación al gestor.        |
| 2.3    | Marcar "Invierto"                   | El socio confirma intención de invertir, indicando el importe o porcentaje que desea comprometer.        |
| 2.4    | Notificar inversión a otros socios  | Alguien marca "Invierto" y el sistema avisa al resto de socios del nuevo interés comprometido.         |
| 2.5    | Ver porcentaje de inversión comprometida | Los socios pueden ver en tiempo real el nivel de capital comprometido por los demás inversores.     |

## 💬 3. Comunicación y gestión del interés

| Código | Caso de uso                     | Descripción                                                                                             |
|--------|---------------------------------|---------------------------------------------------------------------------------------------------------|
| 3.1    | Contactar con el gestor         | Cuando un socio marca "Me interesa", se abre un canal de conversación con el gestor dentro de la plataforma. |
| 3.2    | Recibir notificaciones automáticas | El sistema envía notificaciones por nuevos proyectos, inversiones realizadas e informes semanales.        |
| 3.3    | Enviar y recibir mensajes privados | Comunicación directa entre gestores e inversores desde la plataforma.                                   |
| 3.4    | Acceder al área de soporte      | El socio/inversor puede contactar con soporte o revisar preguntas frecuentes.                             |

## 🏗️ 4. Seguimiento de proyectos en curso (solo para inversores)

| Código | Caso de uso                                  | Descripción                                                                                              |
|--------|----------------------------------------------|----------------------------------------------------------------------------------------------------------|
| 4.1    | Ver informes semanales                       | Los inversores acceden a informes periódicos sobre el avance de la obra, finanzas y aspectos administrativos. |
| 4.2    | Ver vídeo en directo del proyecto             | Streaming en vivo de la obra accesible solo para los inversores del proyecto.                            |
| 4.3    | Consultar documentación legal (solo visualización) | Los inversores acceden a los documentos legales sin opción de descarga, solo visualización en plataforma. |

## ⚙️ 5. Gestión administrativa y seguridad

| Código | Caso de uso                           | Descripción                                                                                             |
|--------|---------------------------------------|---------------------------------------------------------------------------------------------------------|
| 5.1    | Publicar nueva oportunidad de inversión | El gestor crea y publica un nuevo proyecto con toda la información necesaria.                           |
| 5.2    | Subir informes semanales del proyecto | El gestor carga los informes de seguimiento para que los inversores puedan consultarlos.                   |
| 5.3    | Controlar permisos de documentación   | Se asegura que los documentos legales solo se puedan visualizar, sin descarga.                           |
| 5.4    | Gestionar socios inactivos            | El sistema alerta sobre patrones de inactividad y el gestor puede evaluar y ejecutar la expulsión.      |

### **1.3. Diseño y experiencia de usuario:**

COOPCO presenta una interfaz de usuario moderna, profesional y coherente que refleja los valores del club exclusivo de inversores inmobiliarios. El diseño se ha desarrollado siguiendo principios de simplicidad, profesionalidad y usabilidad, implementando un sistema de componentes reutilizables que garantiza una experiencia consistente en toda la plataforma.

#### Características principales del diseño

- **Sistema de diseño coherente** basado en Tailwind CSS y HeadlessUI para componentes accesibles
- **Paleta de colores** profesional con azules como color principal y variantes para diferentes estados
- **Tipografía** clara y legible con Inter como familia principal
- **Componentes reutilizables** que mantienen consistencia visual y funcional
- **Responsive design** con enfoque mobile-first para garantizar usabilidad en todos los dispositivos
- **Accesibilidad** implementada siguiendo pautas WCAG nivel AA

#### Flujos principales de usuario

1. **Registro por invitación** - Proceso seguro y exclusivo para nuevos socios
2. **Exploración de proyectos** - Visualización, filtrado y acceso a información detallada
3. **Expresión de interés e inversión** - Funcionalidades "Me interesa" e "Invierto"
4. **Panel de administración** - Herramientas de gestión para administradores y gestores

#### Capturas de pantalla principales

![Dashboard de proyectos](docs/images/ui/dashboard.png)
*Dashboard principal de socio con proyectos disponibles*

![Detalle de proyecto](docs/images/ui/project-detail.png)
*Vista detallada de un proyecto de inversión con pestañas informativas*

![Panel de administración](docs/images/ui/admin-panel.png)
*Panel de administración para gestores*

Para información detallada sobre el diseño y la experiencia de usuario, consulte la [documentación completa de UI/UX](docs/frontend/ui-design.md).

### **1.4. Instrucciones de instalación:**

Para instalar y configurar el proyecto en tu entorno local, consulta nuestra [guía detallada de configuración](docs/technical/setup.md) que incluye:

- Requisitos previos y dependencias
- Configuración de variables de entorno
- Instalación de dependencias
- Configuración de la base de datos PostgreSQL
- Solución a problemas comunes como puertos en uso
- Verificación de la instalación

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**
> Usa el formato que consideres más adecuado para representar los componentes principales de la aplicación y las tecnologías utilizadas. Explica si sigue algún patrón predefinido, justifica por qué se ha elegido esta arquitectura, y destaca los beneficios principales que aportan al proyecto y justifican su uso, así como sacrificios o déficits que implica.

Patrón de arquitectura por capas combinado con principios de arquitectura hexagonal (Ports and Adapters) y enfoque modular con separación de responsabilidades

    Capa de Presentación (Frontend - Next.js)
    Capa de Aplicación / Lógica de Negocio (Backend - Node.js + Express)
    Capa de Persistencia (PostgreSQL + Prisma)
    Capa de Integraciones (Servicios Externos)

🟦 Patrón adicional: Arquitectura Hexagonal / Ports and Adapters (inspiración)

- El dominio de negocio queda aislado del framework y la infraestructura.
- APIs y bases de datos son adaptadores conectados a puertos definidos.
- Facilita cambios tecnológicos futuros sin modificar el núcleo.

✅ Ventajas de esta arquitectura

| Ventaja | Explicación |
|---------|-------------|
| 🔧 Modularidad | Separación clara entre dominios y capas |
| 📈 Escalabilidad | Fácil de crecer en funcionalidades sin romper lo anterior |
| 🔒 Seguridad | Roles, control de acceso, rutas protegidas |
| 🧪 Testabilidad | Capas desacopladas facilitan pruebas unitarias e integración |
| 🧩 Flexibilidad tecnológica | Fácil de cambiar servicios (email, vídeo, almacenamiento) sin rehacer sistema |
| 🚀 Buen rendimiento | Uso de SSR, ORM eficiente, y servicios optimizados para tareas pesadas |

⚠️ Posibles sacrificios / desafíos

| Desafío | Descripción |
|---------|-------------|
| ⚠️ Curva de aprendizaje | Desarrolladores junior pueden necesitar guía en organización por dominios |
| ⚠️ Over-engineering | Si el producto no escala, puede parecer excesiva para un MVP |
| ⚠️ Gestión de roles compleja | Múltiples niveles de acceso requieren control fino y bien testeado |

![Diagrama de Arquitectura Simple](docs/images/arquitectura_simple.png)

```
graph TB
    %% Usuarios y Roles
    subgraph Usuarios["👥 Usuarios y Roles"]
        direction TB
        U1[Visitantes]
        U2[Socios]
        U3[Gestores]
    end

    %% Frontend
    subgraph Frontend["🌐 Frontend (Next.js)"]
        direction TB
        F1[Web Pública]
        F2[Área de Socios]
        F3[Panel de Inversiones]
        F4[Simulador Económico]
        F5[Panel de Gestión]
    end

    %% Backend
    subgraph Backend["⚙️ Backend (Node.js/Express)"]
        direction TB
        B1[API Auth]
        B2[API Inversiones]
        B3[API Documentos]
        B4[API Notificaciones]
        B5[Middleware de Roles]
    end

    %% Base de Datos
    subgraph DB["🗄️ Base de Datos (PostgreSQL)"]
        direction TB
        D1[Modelo de Datos]
        D2[Prisma ORM]
    end

    %% Servicios Externos
    subgraph External["🔗 Servicios Externos"]
        direction TB
        E1[AWS S3/Cloudinary]
        E2[Youtube/Vimeo Live]
        E3[Email Service]
    end

    %% Conexiones
    U1 --> F1
    U2 --> F2
    U3 --> F2
    U3 --> F5

    F1 --> B1
    F2 --> B1
    F2 --> B2
    F2 --> B3
    F2 --> B4
    F3 --> B2
    F4 --> B2
    F5 --> B1
    F5 --> B2
    F5 --> B4

    B1 --> B5
    B2 --> B5
    B3 --> B5
    B4 --> B5

    B1 --> D2
    B2 --> D2
    B3 --> D2
    B4 --> D2
    D2 --> D1

    B3 --> E1
    B2 --> E2
    B4 --> E3
    B4 --> F2

    %% Estilos
    classDef user fill:#f9f,stroke:#333,stroke-width:2px
    classDef frontend fill:#bbf,stroke:#333,stroke-width:2px
    classDef backend fill:#bfb,stroke:#333,stroke-width:2px
    classDef database fill:#fbb,stroke:#333,stroke-width:2px
    classDef external fill:#ffd,stroke:#333,stroke-width:2px

    class U1,U2,U3 user
    class F1,F2,F3,F4,F5 frontend
    class B1,B2,B3,B4,B5 backend
    class D1,D2 database
    class E1,E2,E3 external

```
![Diagrama de Arquitectura Avanzado](docs/images/arquitectura.png)



### **2.2. Descripción de componentes principales:**

> Describe los componentes más importantes, incluyendo la tecnología utilizada
🏗️ Componentes Principales del Sistema

La arquitectura sigue el patrón por capas (layered architecture) combinado con principios de arquitectura hexagonal (Ports and Adapters). Se estructura en cuatro capas principales: Presentación, Aplicación, Persistencia e Integraciones externas.

### 1. 🌐 Frontend – Capa de Presentación

**Tecnología:** Next.js (React)

#### Subcomponentes:
- Web Pública: acceso abierto para visitantes
- Área de Socios: acceso privado para socios validados vía invitación
- Panel de Inversiones: ficha de cada proyecto con datos, vídeo, planos, simulador
- Simulador Económico: calcula retorno estimado en función del importe a invertir
- Panel de Gestión: usado por gestores para publicar oportunidades y controlar el sistema

#### Funciones clave:
- Renderizado híbrido (SSR/SSG) para optimizar SEO y rendimiento
- Rutas protegidas para el área privada
- Componentes visuales dinámicos con validación de permisos
- Integración con APIs del backend mediante fetch/Axios

### 2. ⚙️ Backend – Lógica de Negocio y API

**Tecnología:** Node.js + Express.js

#### Subcomponentes:
- API Auth: login, registro por invitación, gestión de sesiones
- API Inversiones: "Me interesa", "Invierto", seguimiento del compromiso de capital
- API Documentos: acceso restringido a estudios, planos, legales (solo visualización)
- API Notificaciones: sistema de alertas internas
- Middleware de Roles: controla el acceso según tipo de usuario (gestor, socio, visitante)

#### Funciones clave:
- Estructura modular organizada por dominio
- Seguridad basada en JWT y middleware por roles
- Valida reglas de negocio (mínimos de inversión, acceso a documentos...)
- Control de estado de usuarios y proyectos

### 3. 🗄️ Base de Datos – Persistencia de Datos

**Tecnología:** PostgreSQL + Prisma ORM

#### Estructura:
- Entidades: users, invitations, projects, investments, expressed_interests, project_documents, project_updates, notifications
- Relaciones normalizadas y modeladas con integridad referencial
- Índices y claves foráneas bien definidos
- Prisma facilita el acceso tipado, validado y seguro

#### Ventajas:
- Datos bien estructurados y normalizados
- Mapeo directo a objetos de negocio
- Consultas eficientes gracias a índices y relaciones

### 4. 🔗 Servicios Externos – Capa de Integración

| Servicio | Uso en la plataforma | Tecnología recomendada |
|----------|---------------------|----------------------|
| AWS S3 / Cloudinary | Almacenamiento seguro de documentos y multimedia | Amazon S3, Cloudinary |
| YouTube / Vimeo Live | Vídeo en directo del avance de obra | YouTube Live / Vimeo Pro |
| Email Service | Envío de invitaciones y notificaciones | SendGrid, Mailgun, SES |

#### Características:
- Permiten delegar funciones no-core (media, notificaciones, CDN)
- Acceso a documentos solo para usuarios autenticados y con control de visibilidad
- Minimiza complejidad técnica del backend

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

## 🧠 Descripción de Alto Nivel del Proyecto

El proyecto es una plataforma web para inversión inmobiliaria privada, con acceso restringido mediante invitación. Los usuarios pueden consultar oportunidades de inversión, expresar interén, invertir, y hacer seguimiento del estado del proyecto.

### 🔧 Tecnología usada

- **Frontend:** Next.js (SPA con SSR opcional para páginas públicas)
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL con Prisma ORM
- **Almacenamiento:** Cloudinary para documentos y vídeos
- **Autenticación:** JWT simple con middleware básico por roles

### 🧱 Arquitectura aplicada

Este proyecto sigue una arquitectura en capas simplificada, con separación entre:

- Presentación (frontend)
- Lógica de negocio y API (backend)
- Persistencia (base de datos)
- Servicios externos (almacenamiento y notificaciones)

Esto permite modularidad, mantenibilidad y escalabilidad progresiva sin complicar la vida del desarrollador.

####Estructura del proyecto

```
.
├── frontend/                     # Aplicación frontend (Next.js)
│   ├── pages/                  # Rutas del sitio (cada archivo es una página)
│   ├── components/             # Componentes reutilizables de interfaz
│   ├── services/               # Funciones para interactuar con el backend (fetch, axios)
│   ├── context/                # Contextos globales (auth, usuario, etc.)
│   └── styles/                 # Estilos globales y por componente
│
├── backend/                     # Backend (Node.js + Express)
│   ├── domain/                # Entidades y lógica de negocio core
│   ├── application/           # Casos de uso e implementación de lógica de negocio
│   ├── infrastructure/        # Implementaciones concretas
│   │   ├── database/         # Acceso a datos y repositorios
│   │   └── external/         # Servicios externos (email, storage, etc.)
│   ├── interfaces/            # API, controladores, rutas
│   ├── middleware/            # Middleware de autenticación y validación
│   └── prisma/                # ORM y modelo de datos
│       ├── schema.prisma     # Definición de las tablas y relaciones
│       └── migrations/       # Migraciones generadas por Prisma
│
├── docs/                       # Documentación del proyecto
│   ├── technical/             # Guías técnicas y configuración
│   ├── architecture/          # Diagramas y diseño del sistema
│   ├── product/               # Documentación del producto
│   └── images/                # Recursos visuales
│
├── scripts/                    # Scripts de utilidad para desarrollo y deploy
│
├── .env                        # Variables de entorno (conexiones, claves API, etc.)
├── package.json                # Dependencias y scripts
├── README.md                   # Documentación del proyecto
└── tsconfig.json              # Configuración de TypeScript
```

### 📂 Explicación por carpeta

| Carpeta | Propósito |
|---------|-----------|
| `frontend/` | Código del frontend. Gestiona la interfaz, navegación y llamadas a la API |
| `pages/` | Cada archivo representa una página con ruta automática (/login, /proyectos, etc.) |
| `components/` | Elementos reutilizables: botones, formularios, tarjetas, etc. |
| `services/` | Módulo donde se centralizan todas las llamadas a la API del backend |
| `context/` | Manejo de contexto global para sesión, usuario, etc. |
| `backend/` | Backend Express con patrón de arquitectura hexagonal simplificado |
| `domain/` | Entidades y reglas de negocio, independientes de infraestructura |
| `application/` | Casos de uso que implementan la lógica de negocio |
| `infrastructure/` | Implementaciones técnicas: acceso a BD, servicios externos |
| `interfaces/` | Controladores API, rutas y presentadores |
| `middleware/` | Funciones que controlan el acceso, verificación de tokens y roles |
| `prisma/` | ORM, esquema de base de datos y migraciones |
| `.env` | Configuración de variables sensibles (URL DB, claves Cloudinary...) |
| `docs/` | Documentación completa del proyecto |
| `scripts/` | Scripts de utilidad para automatizar tareas |

### 🎯 Beneficios de esta estructura

- **Claridad para programadores junior:** organización lógica, fácil de navegar y entender
- **Separación de responsabilidades:** cada parte del sistema está bien localizada
- **Listo para crecer:** se puede escalar a microservicios o dividir el frontend si fuera necesario
- **Documentable y mantenible:** cada carpeta puede tener su README con ejemplos



### **2.4. Infraestructura y despliegue**
> Detalla la infraestructura del proyecto, incluyendo un diagrama en el formato que creas conveniente, y explica el proceso de despliegue que se sigue

#### Infraestructura de Desarrollo Local

La infraestructura para el desarrollo local de COOPCO está diseñada para ser sencilla y replicable en el entorno de cualquier desarrollador. Se basa en los siguientes componentes principales:

1.  **Entorno de Ejecución:**
    *   **Node.js:** Se requiere una versión LTS estable para ejecutar tanto el frontend (Next.js) como el backend (Node.js/Express).
    *   **Gestor de Paquetes:** `npm` o `yarn` para gestionar las dependencias de ambos proyectos (frontend y backend).

2.  **Base de Datos:**
    *   **PostgreSQL:** Se utiliza un servidor PostgreSQL que puede ser instalado directamente en el sistema operativo del desarrollador o, preferiblemente, ejecutado dentro de un contenedor Docker para asegurar la consistencia entre entornos y simplificar la configuración inicial. Prisma ORM gestiona las conexiones, migraciones y el esquema.

3.  **Servicios Externos (Simulación Local):**
    *   **Almacenamiento (Cloudinary/S3):** Durante el desarrollo local, se utilizan cuentas de desarrollo gratuitas o se simulan las subidas/bajadas de archivos para evitar costes y complejidades. Las credenciales se gestionan mediante variables de entorno.
    *   **Servicio de Email (SendGrid/Mailgun):** Se emplean servicios como `Mailtrap` o `Ethereal` para capturar los emails enviados en desarrollo sin enviarlos realmente, o se usan las API keys de desarrollo de los proveedores reales con precaución.
    *   **Servicio de Vídeo (YouTube/Vimeo):** Se utilizan enlaces de prueba o vídeos de muestra durante el desarrollo.

4.  **Variables de Entorno:**
    *   Un archivo `.env` en la raíz de los proyectos `frontend` y `backend` almacena toda la configuración sensible y específica del entorno (cadenas de conexión a la BD, claves API de servicios externos, secretos JWT, etc.). Se proporciona un archivo `.env.example` como plantilla.

#### Diagrama de Infraestructura Local Simplificado

```mermaid
graph TD
    subgraph "Máquina del Desarrollador"
        Dev[Desarrollador] --> CodeEditor[Editor de Código]

        subgraph "Procesos Locales"
            FrontendApp[Frontend Next.js] 
            BackendApp[Backend Node/Express]
            DB[(PostgreSQL)]
            CodeEditor --> FrontendApp
            CodeEditor --> BackendApp
            BackendApp --> DB
            FrontendApp --> BackendApp
        end

        subgraph "Servicios Externos"
            ExtStorage[Almacenamiento]
            ExtEmail[Email Service]
            ExtVideo[Video Service]
            BackendApp --> ExtStorage
            BackendApp --> ExtEmail
            BackendApp --> ExtVideo
        end

        subgraph "Herramientas"
            NodeJS[Node.js]
            NPM[npm/yarn]
            Docker[Docker]
            PrismaCLI[Prisma CLI]
            Dev --> NodeJS
            Dev --> NPM
            Dev --> Docker
            Dev --> PrismaCLI
            FrontendApp --> NodeJS
            BackendApp --> NodeJS
            DB --> Docker
        end
    end

    style Dev fill:#f9f,stroke:#333
    style FrontendApp fill:#bbf,stroke:#333
    style BackendApp fill:#bfb,stroke:#333
    style DB fill:#fbb,stroke:#333
    style ExtStorage fill:#ffd,stroke:#333
    style ExtEmail fill:#ffd,stroke:#333
    style ExtVideo fill:#ffd,stroke:#333
    style NodeJS fill:#eee,stroke:#333
    style NPM fill:#eee,stroke:#333
    style Docker fill:#eee,stroke:#333
    style PrismaCLI fill:#eee,stroke:#333
```

*Diagrama simplificado de la interacción de componentes en el entorno de desarrollo local.*
![Diagrama de Infraestructura Local](docs/images/infraestructura_local.png) 

#### Infraestructura de Producción

```mermaid
graph TB
    User([Usuario]) --> Frontend[Frontend Vercel]
    Frontend --> Backend[Backend Render]
    Backend --> Database[(Supabase PostgreSQL)]
    Backend --> Storage{Cloudinary}
    Backend --> EmailService[Gmail]
    
    subgraph "Capa de Cliente"
        User
    end
    
    subgraph "Capa de Presentación"
        Frontend
    end
    
    subgraph "Capa de Aplicación"
        Backend
    end
    
    subgraph "Capa de Persistencia"
        Database
        Storage
    end
    
    subgraph "Servicios Externos"
        EmailService
    end
    
    style User fill:#f9f,stroke:#333
    style Frontend fill:#bbf,stroke:#333
    style Backend fill:#bfb,stroke:#333
    style Database fill:#fbb,stroke:#333
    style Storage fill:#ffd,stroke:#333
    style EmailService fill:#ffd,stroke:#333
```

![Diagrama de Arquitectura de Producción](docs/images/arquitectura_producción.png)


##### Servicios Implementados

| Componente | Servicio | Plan | Características |
|------------|----------|------|-----------------|
| **Frontend** | [Vercel](https://vercel.com) | Pro | - Despliegue continuo desde GitHub<br>- Prevista automática de PRs<br>- Dominio personalizado con SSL<br>- Analytics integrados |
| **Backend** | [Render](https://render.com) | Web Service | - Escalado automático<br>- Logs integrados<br>- Reinicio automático<br>- Despliegue desde GitHub |
| **Base de Datos** | [Supabase](https://supabase.com) | Pro | - PostgreSQL gestionado<br>- Backups diarios<br>- Monitorización en tiempo real<br>- 8GB de almacenamiento |
| **Almacenamiento** | [Cloudinary](https://cloudinary.com) | Plus | - Optimización automática de imágenes<br>- Transformaciones en tiempo real<br>- URLs firmadas<br>- CDN global<br>- [Detalles técnicos](docs/technical/document-storage-service.md) |
| **Email** | [Gmail / Google Workspace](https://workspace.google.com) | Business Starter | - Alta entregabilidad<br>- Límite diario adecuado<br>- Monitorización de entregas<br>- Plantillas HTML personalizadas |

##### Despliegue a Producción

El proceso de despliegue a producción sigue un flujo GitOps donde los cambios se propagan automáticamente una vez fusionados en la rama principal:

1. **Preparación:**
   - Revisión del código mediante Pull Request
   - Ejecución de pruebas automatizadas (CI)
   - Aprobación del PR por al menos un revisor

2. **Despliegue del Backend:**
   - Merge a `main` activa despliegue automático en Render
   - Ejecución de migraciones de Prisma automáticas
   - Verificación de salud del servicio

3. **Despliegue del Frontend:**
   - Merge a `main` activa build y despliegue en Vercel
   - Previsualización automática de cada build
   - Verificación de integridad y enlaces

4. **Verificación Post-Despliegue:**
   - Pruebas de humo automáticas
   - Verificación de conexión entre servicios
   - Monitorización de errores y rendimiento

##### Variables de Entorno

Las variables de entorno se gestionan de forma segura en cada plataforma, siguiendo el principio de mínimo privilegio. Cada servicio mantiene solo las variables relevantes para su funcionamiento.

Para obtener información detallada sobre:
- [Guía completa de despliegue](docs/deployment/deployment_guide.md)
- [Configuración de Cloudinary](docs/deployment/cloudinary_setup.md)
- [Configuración de Email con Gmail](docs/deployment/gmail_setup.md)
- [Configuración del backend en Render](docs/deployment/render_setup.md)
- [Configuración de Supabase](docs/deployment/supabase_setup.md)
- [Configuración del frontend en Vercel](docs/deployment/vercel_frontend_setup.md)

##### Consideraciones de Seguridad

El entorno de producción implementa múltiples capas de seguridad:

- **HTTPS obligatorio** en todos los endpoints
- **CORS** correctamente configurado entre frontend y backend
- **Rate limiting** para prevenir ataques de fuerza bruta
- **Cabeceras de seguridad** HTTP como Content-Security-Policy
- **JWT** con tokens de corta duración
- **Backups diarios** de la base de datos con retención de 30 días
- **Encriptación** de datos sensibles tanto en tránsito como en reposo

##### Monitorización y Mantenimiento

El sistema cuenta con:
- Alertas automáticas para fallos de servicio
- Monitorización de rendimiento y latencia
- Logs centralizados para diagnóstico
- Procedimientos documentados para recuperación ante desastres


### **2.5. Seguridad**

> Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede

#### Prácticas implementadas actualmente (MVP)

La seguridad del proyecto se ha planteado desde las fases iniciales del desarrollo, implementando varias medidas esenciales para proteger datos y usuarios. En esta fase MVP, nos hemos enfocado en:

1. **Autenticación segura:**
   * Almacenamiento de contraseñas con hashing bcrypt (factor de coste 12)
   * Sistema de tokens JWT para gestión de sesiones
   * Verificación de invitaciones con tokens criptográficamente seguros (`crypto.randomBytes`)
   * Expiración automática de tokens de invitación (7 días)

2. **Control de acceso basado en roles:**
   * Middleware de autenticación JWT (`jwtAuthMiddleware.js`)
   * Middleware de autorización por roles (`roleAuthMiddleware.js`)
   * Restricción de rutas críticas a usuarios con roles específicos (ej: solo gestores pueden enviar invitaciones)
   * Para más detalles técnicos, consulta la [documentación del sistema de roles](docs/technical/role-middleware-guide.md)

3. **Validación de datos:**
   * Validación tanto en frontend como en backend para entradas de usuario
   * Validación de formato de email y fortaleza de contraseñas
   * Verificación de que el email registrado coincide con el de la invitación

4. **Seguridad de datos:**
   * Manejo de secretos a través de variables de entorno (no hardcodeados)
   * Mensajes de error genéricos para evitar enumeración de usuarios
   * Prevención de divulgación de información sensible en respuestas API

5. **Configuración básica CORS:**
   * Control de dominios permitidos para acceder a la API
   * Especificación de cabeceras y métodos permitidos

#### Mejoras de seguridad a implementar en fases posteriores

Para versiones futuras del proyecto, se planifican las siguientes mejoras de seguridad:

1. **Protección adicional de documentos:**
   * Marcas de agua dinámicas con datos del usuario para documentos visibles
   * Sistema anti-captura de pantalla cuando sea técnicamente posible
   * Tokens de acceso temporales para documentos confidenciales

2. **Seguridad de API avanzada:**
   * Implementación de rate limiting para prevenir ataques por fuerza bruta
   * Headers de seguridad adicionales (CSP, X-Content-Type-Options, etc.)
   * Validación más exhaustiva con esquemas JSON (joi, zod, yup)

3. **Auditoría y monitorización:**
   * Registro detallado de eventos de seguridad
   * Alertas por actividad sospechosa
   * Detección de intentos de inicio de sesión anómalos

4. **Seguridad en producción:**
   * Uso de HTTPS con certificados válidos
   * Configuración segura de cookies (HttpOnly, Secure, SameSite)
   * Escaneo periódico de dependencias vulnerables

Este enfoque gradual nos permite tener una base segura en el MVP mientras se planifica una estrategia más robusta para el producto final, equilibrando la seguridad con la facilidad de desarrollo y mantenimiento para un programador junior.

### **2.6. Tests**

> Describe brevemente algunos de los tests realizados

El proyecto implementa una estrategia de pruebas en múltiples niveles, siguiendo buenas prácticas de calidad de software. A continuación se describen los diferentes tipos de tests implementados:

#### Tests Unitarios

Estos tests verifican componentes aislados del sistema, enfocándose en funciones específicas y sus resultados:

- **Tests de Controladores**: Verifican que los controladores HTTP manejan correctamente las solicitudes y respuestas, validando parámetros y devolviendo los códigos de estado apropiados.
  
  ```javascript
  // Ejemplo en backend/tests/controllers/auth.controller.test.js
  it('should return 400 if required fields are missing', async () => {
    req.body = { email: mockEmail, password: mockPassword }; // Missing name and token
    await authController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('All fields are required')
    }));
  });
  ```

- **Tests de Servicios**: Prueban los servicios de negocio que implementan la lógica principal de la aplicación.

  ```javascript
  // Ejemplo en backend/tests/services/invitationService.test.js
  it('should create a new invitation and attempt to send email', async () => {
    const testEmail = 'new_invitee@test.com';
    const invitation = await invitationService.createInvitation(testEmail, testUser.id);
    
    // Verificaciones
    expect(invitation).toBeDefined();
    expect(invitation.email).toBe(testEmail);
    expect(invitation.token).toBeDefined();
    expect(invitation.status).toBe(InvitationStatus.PENDING);
    
    // Check if the mocked email function was called
    expect(emailService.sendInvitationEmail).toHaveBeenCalledTimes(1);
    expect(emailService.sendInvitationEmail).toHaveBeenCalledWith(testEmail, expect.any(String));
  });
  ```

#### Tests de Integración

Verifican la interacción entre múltiples componentes del sistema, asegurando que funcionen correctamente juntos:

- **Tests de API REST**: Utilizan `supertest` para ejecutar solicitudes HTTP reales contra el servidor Express y validar las respuestas completas:

  ```javascript
  // Ejemplo en backend/tests/integration/auth.test.js
  it('should return 200 OK and a JWT for valid credentials', async () => {
    const credentials = {
      email: 'manager@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeTruthy();
  });
  ```

- **Tests de Flujos Completos**: Prueban secuencias de operaciones, como la validación de invitaciones:

  ```javascript
  // Ejemplo en backend/tests/integration/auth.test.js - Validación de tokens
  it('should return 200 OK and status valid for a valid token', async () => {
    const response = await request(app)
      .get(`/api/auth/invitation/${validInvitationData.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ status: 'valid', email: 'valid@test.com' });
  });

  it('should return 410 Gone for a used token', async () => {
    const response = await request(app)
      .get(`/api/auth/invitation/${usedInvitationData.token}`)
      .expect('Content-Type', /json/)
      .expect(410);
    expect(response.body).toHaveProperty('status', 'invalid');
  });
  ```

#### Tests de Componentes React

Verifican que los componentes React renderizan correctamente y manejan las interacciones del usuario:

- **Tests de Renderizado**: Comprueban que los componentes se renderizan con los props correctos y muestran el contenido esperado:

  ```javascript
  // Ejemplo en frontend/tests/pages/register.test.js
  test('renders RegistrationForm when not authenticated and token/email are present', () => {
    setupMocks(false, { token: mockToken, email: mockEmail });
    render(<RegisterPage />);

    expect(screen.getByText(/completa tu registro/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();
    expect(screen.getByTestId('token-prop')).toHaveTextContent(mockToken);
  });
  ```

- **Tests de Comportamiento**: Simulan interacciones del usuario y verifican que los componentes responden correctamente:

  ```javascript
  // Ejemplo en frontend/components/Auth/RegistrationForm.test.js
  test('shows error if passwords do not match', async () => {
    const firstNameInput = screen.getByLabelText(/^nombre/i);
    const lastNameInput = screen.getByLabelText(/apellidos/i);
    const passwordInput = screen.getByLabelText(/^contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole('button', { name: /completar registro/i });

    await user.type(firstNameInput, 'Test');
    await user.type(lastNameInput, 'User');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'PasswordMismatch');
    await user.click(submitButton);
    
    expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    expect(authService.register).not.toHaveBeenCalled();
  });
  ```

#### Características de la estrategia de pruebas

- **Mocks y Stubs**: Se utilizan para aislar componentes y simular dependencias (como servicios externos o la base de datos):

  ```javascript
  // Ejemplo de mock de servicio de email
  jest.mock('../../application/services/emailService', () => ({
    sendInvitationEmail: jest.fn().mockResolvedValue({ messageId: 'mock-email-id' })
  }));
  ```

- **Configuración de entorno**: Se configura un entorno de prueba específico con datos de prueba y usuarios simulados:

  ```javascript
  // Configuración de tests de invitación
  beforeAll(async () => {
    // Crear usuario de prueba para invitaciones
    testUser = await createTestUser();
    if (!testUser) throw new Error('Failed to create test user');
  });
  ```

- **Limpieza entre pruebas**: Se restablece el estado entre pruebas para garantizar el aislamiento:

  ```javascript
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    user = userEvent.setup();
  });

  afterAll(async () => {
    // Cleanup created test invitations
    for (const invitation of createdInvitations) {
      await cleanupInvitation(invitation.id);
    }
  });
  ```

Esta estrategia de pruebas en múltiples niveles ayuda a detectar problemas temprano en el ciclo de desarrollo y asegura que los componentes individuales y el sistema en conjunto funcionen según lo esperado. Para el MVP, los tests se centran en las funcionalidades críticas como autenticación, invitaciones y registro de usuarios.

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.

```erDiagram
    roles ||--o{ users : has
    users ||--o{ invitations : creates
    users ||--o{ investments : makes
    users ||--o{ notifications : receives
    users ||--o{ projects : creates
    users ||--o{ verification_tokens : has
    users ||--o{ interests : expresses
    users ||--o{ messages : sends
    users ||--o{ document_views : views

    roles {
        UUID id PK
        VARCHAR name
        VARCHAR description
        TIMESTAMP created_at
    }

    invitations {
        UUID id PK
        VARCHAR email
        VARCHAR token
        UUID invited_by FK
        InvitationStatus status // <-- Cambiado a Enum
        TIMESTAMP created_at
        TIMESTAMP expires_at
    }

    verification_tokens {
        UUID id PK
        UUID user_id FK
        VARCHAR token
        BOOLEAN used
        TIMESTAMP created_at
        TIMESTAMP expires_at
    }

    users {
        UUID id PK
        VARCHAR firstName
        VARCHAR lastName
        VARCHAR email "UNIQUE, idx"
        TEXT password_hash
        UUID role_id FK "idx"
        VARCHAR status
        BOOLEAN email_verified
        TIMESTAMP email_verified_at
        INTEGER failed_login_attempts
        TIMESTAMP locked_until
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    projects ||--o{ project_documents : has
    projects ||--o{ investments : receives
    projects ||--o{ project_updates : has
    projects ||--o{ interests : receives
    projects ||--o{ conversations : relates_to

    projects {
        UUID id PK
        VARCHAR title "idx"
        TEXT description
        VARCHAR status "idx"
        DECIMAL minimum_investment
        DECIMAL target_amount     
        DECIMAL current_amount    
        DECIMAL expected_roi      
        VARCHAR location "idx"       
        VARCHAR property_type "idx"    
        BOOLEAN draft
        TIMESTAMP published_at
        UUID created_by FK
        UUID published_by FK
        TIMESTAMP created_at "idx"
    }

    project_documents {
        UUID id PK
        UUID project_id FK "idx"
        TEXT file_url
        VARCHAR file_type "idx"
        VARCHAR access_level
        VARCHAR document_type "idx"
        VARCHAR title "Nombre del documento"
        VARCHAR security_level
        TIMESTAMP created_at
    }

    document_views {
        UUID id PK
        UUID document_id FK
        UUID user_id FK
        VARCHAR ip_address
        TIMESTAMP viewed_at "idx"
    }

    interests {
        UUID id PK
        UUID user_id FK "idx"
        UUID project_id FK "idx"
        VARCHAR status
        TEXT notes
        TIMESTAMP created_at
        VARCHAR user_project_unique "virtual"
    }

    investments {
        UUID id PK
        UUID user_id FK "idx"
        UUID project_id FK "idx"
        DECIMAL amount
        TIMESTAMP invested_at "idx"
        VARCHAR status          
        TEXT notes
        TEXT contract_reference 
    }

    project_updates {
        UUID id PK
        UUID project_id FK "idx"
        VARCHAR title
        TEXT content
        TEXT video_url
        DATE update_date "idx"
        UUID created_by FK
        TIMESTAMP created_at
    }

    notifications {
        UUID id PK
        UUID user_id FK "idx"
        VARCHAR type "idx"
        TEXT content
        UUID related_id
        BOOLEAN read "idx"
        TIMESTAMP created_at "idx"
    }

    conversations ||--o{ messages : contains
    conversations ||--o{ conversation_participants : has

    conversations {
        UUID id PK
        UUID project_id FK "idx"
        VARCHAR title
        TIMESTAMP created_at
    }

    conversation_participants {
        UUID id PK
        UUID conversation_id FK "idx"
        UUID user_id FK "idx"
        TIMESTAMP joined_at
        VARCHAR unique_participant "virtual"
    }

    messages {
        UUID id PK
        UUID conversation_id FK "idx"
        UUID sender_id FK "idx"
        TEXT content
        BOOLEAN read "idx"
        TIMESTAMP created_at "idx"
    }
```

![Modelo de datos](docs/images/modelo-datos.png)



### **3.2. Descripción de entidades principales:**

#### 1. roles
Representa los diferentes roles que puede tener un usuario en el sistema.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del rol | PK, NOT NULL, UNIQUE |
| name | VARCHAR | Nombre del rol (visitor, partner, investor, manager) | NOT NULL, UNIQUE |
| description | VARCHAR | Descripción del rol | NOT NULL |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en `name`

#### 2. users
Representa a los usuarios del sistema, incluyendo visitantes registrados, socios e inversores, y gestores.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del usuario | PK, NOT NULL, UNIQUE |
| firstName | VARCHAR | Nombre del usuario | NOT NULL |
| lastName | VARCHAR | Apellidos del usuario | NOT NULL |
| email | VARCHAR | Email del usuario | NOT NULL, UNIQUE |
| password_hash | TEXT | Hash de la contraseña | NOT NULL |
| role_id | UUID | Rol del usuario | FK → roles.id, NOT NULL |
| status | VARCHAR | Estado del usuario (pending, active, inactive, banned) | NOT NULL, DEFAULT: 'pending' |
| email_verified | BOOLEAN | Indica si el email ha sido verificado | NOT NULL, DEFAULT: false |
| email_verified_at | TIMESTAMP | Fecha de verificación del email | NULLABLE |
| failed_login_attempts | INTEGER | Número de intentos fallidos de login | NOT NULL, DEFAULT: 0 |
| locked_until | TIMESTAMP | Fecha hasta la que la cuenta está bloqueada | NULLABLE |
| created_at | TIMESTAMP | Fecha de creación de la cuenta | NOT NULL, DEFAULT: now() |
| updated_at | TIMESTAMP | Fecha de última actualización del perfil | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en `email`
- INDEX en `role_id`
- INDEX en `status` y `email_verified` (para consultas de filtrado)

##### Relaciones
- 🔑 id → invitations.invited_by
- 🔑 id → investments.user_id
- 🔑 id → notifications.user_id
- 🔑 id → projects.created_by
- 🔑 id → verification_tokens.user_id
- 🔑 id → interests.user_id
- 🔑 id → messages.sender_id
- 🔑 id → document_views.user_id

#### 3. projects
Oportunidades de inversión inmobiliaria publicadas por los gestores.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del proyecto | PK, NOT NULL, UNIQUE |
| title | VARCHAR | Título del proyecto | NOT NULL |
| description | TEXT | Descripción general | NOT NULL |
| status | VARCHAR | Estado (draft, published, closed, funded) | NOT NULL, DEFAULT: 'draft' |
| minimum_investment | DECIMAL | Inversión mínima por usuario | NOT NULL, CHECK > 0 |
| target_amount | DECIMAL | Monto total a captar | NOT NULL, CHECK > 0 |
| current_amount | DECIMAL | Monto ya invertido | DEFAULT: 0, CHECK >= 0 |
| expected_roi | DECIMAL | Retorno estimado | CHECK >= 0 |
| location | VARCHAR | Ubicación de la propiedad | NULLABLE |
| property_type | VARCHAR | Tipo (residencial, comercial, etc.) | NULLABLE |
| draft | BOOLEAN | Indica si es un borrador | NOT NULL, DEFAULT: true |
| published_at | TIMESTAMP | Fecha de publicación | NULLABLE |
| created_by | UUID | Usuario gestor que creó el proyecto | FK → users.id, NOT NULL |
| published_by | UUID | Usuario gestor que publicó el proyecto | FK → users.id, NULLABLE |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `status` (para filtrar por estado)
- INDEX en `property_type` (para filtrar por tipo)
- INDEX en `location` (para búsquedas geográficas)
- INDEX en `created_at` (para ordenar por fecha)
- INDEX en `published_at` (para ordenar proyectos publicados)

##### Relaciones
- 🔑 id → project_documents.project_id
- 🔑 id → investments.project_id
- 🔑 id → project_updates.project_id
- 🔑 id → interests.project_id
- 🔑 id → conversations.project_id

#### 4. investments
Inversiones realizadas en un proyecto.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador de la inversión | PK, NOT NULL |
| user_id | UUID | Usuario que invierte | FK → users.id, NOT NULL |
| project_id | UUID | Proyecto en el que invierte | FK → projects.id, NOT NULL |
| amount | DECIMAL | Monto invertido | NOT NULL, CHECK > 0 |
| invested_at | TIMESTAMP | Fecha de inversión | NOT NULL, DEFAULT: now() |
| status | VARCHAR | Estado (pending, confirmed, cancelled) | NOT NULL, DEFAULT: 'pending' |
| notes | TEXT | Notas adicionales del inversor | NULLABLE |
| contract_reference | TEXT | Identificador del contrato legal | NULLABLE |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `user_id` (para consultar inversiones de un usuario)
- INDEX en `project_id` (para consultar inversiones en un proyecto)
- INDEX en `invested_at` (para ordenar cronológicamente)
- INDEX en `status` (para filtrar por estado)

#### 5. invitations
Invitaciones enviadas a potenciales socios para unirse al club.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único de la invitación | PK, NOT NULL |
| email | VARCHAR | Email del invitado | NOT NULL |
| token | VARCHAR | Token único de invitación | NOT NULL, UNIQUE |
| invited_by | UUID | Usuario que realiza la invitación | FK → users.id, NOT NULL |
| status | InvitationStatus | Estado (PENDING, USED, EXPIRED) | Enum, NOT NULL, DEFAULT: 'PENDING' |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |
| expires_at | TIMESTAMP | Fecha de expiración | NOT NULL |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en `token`
- INDEX en `email` (para verificar invitaciones duplicadas)
- INDEX en `status` y `expires_at` (para expirar invitaciones)

#### 6. project_documents
Documentos asociados a un proyecto, como archivos legales, técnicos, imágenes, etc.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del documento | PK, NOT NULL |
| project_id | UUID | Proyecto al que pertenece | FK → projects.id, NOT NULL |
| file_url | TEXT | URL del archivo | NOT NULL |
| file_type | VARCHAR | Tipo de archivo (pdf, docx, etc.) | NOT NULL |
| document_type | VARCHAR | Categoría (legal, economic, technical, image, video) | NOT NULL |
| access_level | VARCHAR | Nivel de acceso (public, partner, investor) | NOT NULL |
| security_level | VARCHAR | Nivel de seguridad (downloadable, view_only, watermarked) | NOT NULL, DEFAULT: 'view_only' |
| title | VARCHAR | Nombre del documento | NULLABLE |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `project_id` (para consultar documentos de un proyecto)
- INDEX en `document_type` (para filtrar por tipo)
- INDEX en `file_type` (para filtrar por formato)

#### 7. verification_tokens
Tokens para verificación de email al registrarse.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | Usuario al que pertenece | FK → users.id, NOT NULL |
| token | VARCHAR | Token único de verificación | NOT NULL, UNIQUE |
| used | BOOLEAN | Indica si ya fue utilizado | NOT NULL, DEFAULT: false |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |
| expires_at | TIMESTAMP | Fecha de expiración | NOT NULL |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en `token`
- INDEX en `user_id`
- INDEX en `expires_at` (para expirar tokens)

#### 8. interests
Expresiones de interés en proyectos sin compromiso de inversión.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | Usuario interesado | FK → users.id, NOT NULL |
| project_id | UUID | Proyecto de interés | FK → projects.id, NOT NULL |
| status | VARCHAR | Estado (active, converted, declined) | NOT NULL, DEFAULT: 'active' |
| notes | TEXT | Comentarios adicionales | NULLABLE |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en (user_id, project_id) (para evitar intereses duplicados)
- INDEX en `user_id` (para consultar intereses de un usuario)
- INDEX en `project_id` (para consultar intereses en un proyecto)
- INDEX en `status` (para filtrar por estado)

#### 9. conversations
Conversaciones entre usuarios, por ejemplo entre gestores y socios interesados.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| project_id | UUID | Proyecto relacionado (opcional) | FK → projects.id, NULLABLE |
| title | VARCHAR | Título de la conversación | NOT NULL |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `project_id` (para consultar conversaciones sobre un proyecto)

#### 10. conversation_participants
Participantes en una conversación.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| conversation_id | UUID | Conversación | FK → conversations.id, NOT NULL |
| user_id | UUID | Usuario participante | FK → users.id, NOT NULL |
| joined_at | TIMESTAMP | Fecha de unión | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- UNIQUE en (conversation_id, user_id) (para evitar participantes duplicados)
- INDEX en `conversation_id` (para consultar participantes)
- INDEX en `user_id` (para consultar conversaciones de un usuario)

#### 11. messages
Mensajes intercambiados en las conversaciones.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| conversation_id | UUID | Conversación a la que pertenece | FK → conversations.id, NOT NULL |
| sender_id | UUID | Usuario que envía el mensaje | FK → users.id, NOT NULL |
| content | TEXT | Contenido del mensaje | NOT NULL |
| read | BOOLEAN | Indica si ha sido leído | NOT NULL, DEFAULT: false |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `conversation_id` (para consultar mensajes de una conversación)
- INDEX en `sender_id` (para consultar mensajes enviados por un usuario)
- INDEX en `read` (para filtrar mensajes no leídos)
- INDEX en `created_at` (para ordenar cronológicamente)

#### 12. project_updates
Actualizaciones periódicas sobre el progreso de los proyectos.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| project_id | UUID | Proyecto al que pertenece | FK → projects.id, NOT NULL |
| title | VARCHAR | Título de la actualización | NOT NULL |
| content | TEXT | Contenido (formato Markdown) | NOT NULL |
| video_url | TEXT | URL del vídeo asociado | NULLABLE |
| update_date | DATE | Fecha de la actualización | NOT NULL |
| created_by | UUID | Usuario que crea la actualización | FK → users.id, NOT NULL |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `project_id` (para consultar actualizaciones de un proyecto)
- INDEX en `update_date` (para ordenar cronológicamente)

#### 13. notifications
Notificaciones para los usuarios sobre eventos relevantes.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | Usuario destinatario | FK → users.id, NOT NULL |
| type | VARCHAR | Tipo (new_investment, project_update, new_interest, message) | NOT NULL |
| content | TEXT | Contenido de la notificación | NOT NULL |
| related_id | UUID | ID de la entidad relacionada | NULLABLE |
| read | BOOLEAN | Indica si ha sido leída | NOT NULL, DEFAULT: false |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `user_id` (para consultar notificaciones de un usuario)
- INDEX en `read` (para filtrar notificaciones no leídas)
- INDEX en `type` (para filtrar por tipo)
- INDEX en `created_at` (para ordenar cronológicamente)

#### 14. document_views
Registros de visualizaciones de documentos para auditoría.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único | PK, NOT NULL |
| document_id | UUID | Documento visualizado | FK → project_documents.id, NOT NULL |
| user_id | UUID | Usuario que visualiza | FK → users.id, NOT NULL |
| ip_address | VARCHAR | Dirección IP del cliente | NOT NULL |
| viewed_at | TIMESTAMP | Fecha de visualización | NOT NULL, DEFAULT: now() |

##### Índices
- PRIMARY KEY en `id`
- INDEX en `document_id` (para consultar visualizaciones de un documento)
- INDEX en `user_id` (para consultar documentos vistos por un usuario)
- INDEX en `viewed_at` (para ordenar cronológicamente)

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

```yaml
openapi: 3.0.3
info:
  title: COOPCO API
  description: API para la plataforma exclusiva de inversión inmobiliaria
  version: 1.0.0
servers:
  - url: http://localhost:8001/api
    description: Servidor de desarrollo
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Error:
      type: object
      properties:
        message:
          type: string
          description: Mensaje de error
    Project:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
        description:
          type: string
        status:
          type: string
          enum: [draft, published, closed, funded]
        minimum_investment:
          type: number
          format: decimal
        target_amount:
          type: number
          format: decimal
        current_amount:
          type: number
          format: decimal
        expected_roi:
          type: number
          format: decimal
        location:
          type: string
        property_type:
          type: string
        created_at:
          type: string
          format: date-time
        published_at:
          type: string
          format: date-time
          nullable: true
paths:
  /auth/login:
    post:
      summary: Iniciar sesión
      description: Autentica al usuario y devuelve un token JWT
      tags:
        - Autenticación
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    description: Token JWT para autenticar peticiones futuras
        '400':
          description: Datos de entrada inválidos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Credenciales inválidas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
  
  /projects:
    get:
      summary: Listar oportunidades de inversión
      description: Devuelve un listado de proyectos de inversión disponibles con opción de filtrado
      tags:
        - Proyectos
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [draft, published, closed, funded]
          description: Filtrar por estado del proyecto
        - name: property_type
          in: query
          schema:
            type: string
          description: Filtrar por tipo de propiedad
        - name: min_roi
          in: query
          schema:
            type: number
            format: float
          description: Filtrar por rentabilidad mínima
        - name: location
          in: query
          schema:
            type: string
          description: Filtrar por ubicación
        - name: page
          in: query
          schema:
            type: integer
            default: 1
          description: Número de página para paginación
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
          description: Número de resultados por página
      responses:
        '200':
          description: Listado de proyectos encontrados
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Project'
                  pagination:
                    type: object
                    properties:
                      total:
                        type: integer
                      page:
                        type: integer
                      limit:
                        type: integer
                      totalPages:
                        type: integer
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '403':
          description: No autorizado (no tiene rol de socio o superior)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
  
  /investments:
    post:
      summary: Registrar inversión
      description: Permite a un socio registrar su intención de invertir en un proyecto
      tags:
        - Inversiones
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - project_id
                - amount
              properties:
                project_id:
                  type: string
                  format: uuid
                  description: ID del proyecto en el que se invierte
                amount:
                  type: number
                  format: decimal
                  description: Cantidad a invertir
                notes:
                  type: string
                  description: Notas o comentarios adicionales
      responses:
        '201':
          description: Inversión registrada correctamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  project_id:
                    type: string
                    format: uuid
                  amount:
                    type: number
                    format: decimal
                  status:
                    type: string
                    enum: [pending, confirmed, cancelled]
                  invested_at:
                    type: string
                    format: date-time
                  message:
                    type: string
        '400':
          description: Datos inválidos o monto inferior al mínimo requerido
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '403':
          description: No autorizado (no tiene rol de socio)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '404':
          description: Proyecto no encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
```

### Ejemplos de petición y respuesta

#### Login

**Petición:**
```http
POST /api/auth/login HTTP/1.1
Host: localhost:8001
Content-Type: application/json

{
  "email": "manager@example.com",
  "password": "password123"
}
```

**Respuesta (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtYW5hZ2VyQGV4YW1wbGUuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2ODI1MDcwMDAsImV4cCI6MTY4MjUxMDYwMH0.8FR4nVMUBcD8aLJKYBJ-JlptULaOmL4KhzRJbVx_U8s"
}
```

#### Listar proyectos

**Petición:**
```http
GET /api/projects?status=published&property_type=residential&min_roi=5&page=1&limit=10 HTTP/1.1
Host: localhost:8001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": "8f7e6d5c-4b3a-2a1b-0c9d-8f7e6d5c4b3a",
      "title": "Residencial Las Encinas",
      "description": "Desarrollo de 24 viviendas de lujo en zona exclusiva",
      "status": "published",
      "minimum_investment": 50000.00,
      "target_amount": 2500000.00,
      "current_amount": 1200000.00,
      "expected_roi": 12.5,
      "location": "Madrid, España",
      "property_type": "residential",
      "created_at": "2023-09-15T10:30:00Z",
      "published_at": "2023-09-20T14:00:00Z"
    },
    {
      "id": "1a2b3c4d-5e6f-7g8h-9i0j-1a2b3c4d5e6f",
      "title": "Oficinas Distrito Financiero",
      "description": "Reforma de edificio para uso comercial en zona prime",
      "status": "published",
      "minimum_investment": 100000.00,
      "target_amount": 5000000.00,
      "current_amount": 2000000.00,
      "expected_roi": 8.75,
      "location": "Barcelona, España",
      "property_type": "commercial",
      "created_at": "2023-08-05T09:15:00Z",
      "published_at": "2023-08-10T11:30:00Z"
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

#### Registrar inversión

**Petición:**
```http
POST /api/investments HTTP/1.1
Host: localhost:8001
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "project_id": "8f7e6d5c-4b3a-2a1b-0c9d-8f7e6d5c4b3a",
  "amount": 75000.00,
  "notes": "Primera inversión en el proyecto"
}
```

**Respuesta (201 Created):**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "a1b2c3d4-e5f6-g7h8-i9j0-a1b2c3d4e5f6",
  "project_id": "8f7e6d5c-4b3a-2a1b-0c9d-8f7e6d5c4b3a",
  "amount": 75000.00,
  "status": "pending",
  "invested_at": "2023-10-25T14:35:12Z",
  "message": "Inversión registrada correctamente. Será revisada por el gestor."
}
```


### Documentación de la API

Esta sección proporciona una documentación detallada de los endpoints disponibles en la API de COOPCO. La documentación está organizada por recursos para facilitar su consulta.

#### Índice de la documentación de API

- [API de Autenticación y Registro](docs/api/auth.md) - Endpoints para login, registro y gestión de invitaciones
- [API de Proyectos](docs/api/projects.md) - Endpoints para crear, listar y gestionar proyectos
- [API de Inversiones](docs/api/investments.md) - Endpoints para realizar y gestionar inversiones en proyectos
- [API de Intereses](docs/api/interests.md) - Endpoints para gestionar expresiones de interés en proyectos
- [API de Documentos](docs/api/documents.md) - Endpoints para la gestión de documentos asociados a proyectos
- [API de Notificaciones](docs/api/notifications.md) - Endpoints para gestionar notificaciones de usuarios

Cada documento de API incluye información detallada sobre:
- Parámetros de entrada requeridos y opcionales
- Formatos de respuesta
- Códigos de estado HTTP
- Ejemplos de solicitud y respuesta
- Manejo de errores

#### Base URL

Todos los endpoints de la API están disponibles en la siguiente URL base:

```
/api
```

#### Autenticación

La mayoría de los endpoints requieren autenticación mediante token JWT. Los tokens se obtienen a través del endpoint de login y deben incluirse en el encabezado `Authorization` de las solicitudes:

```
Authorization: Bearer {token}
```

Para más detalles sobre la autenticación y gestión de tokens, consulta la [documentación de la API de Autenticación](docs/api/auth.md).


---

## 5. Historias de Usuario

### 🥇 HISTORIA 1 – Registro mediante invitación (Must Have)

**Como** usuario invitado,  
**Quiero** registrarme mediante una invitación exclusiva,  
**Para** acceder a la zona privada como socio del club.

#### Descripción técnica detallada
El sistema debe permitir que solo los usuarios con invitación válida puedan registrarse. Esto involucra:
1. Un token único generado al enviar la invitación, almacenado en la base de datos
2. Un enlace que incluye este token y se envía por email
3. Una página de registro que verifica la validez y caducidad del token
4. El formulario de registro que recoge los datos del usuario
5. Una confirmación por correo electrónico para validar la cuenta

#### Campos y modelos de datos
- **Modelo `Invitation`**:
  - `id`: UUID (PK)
  - `email`: string (email del invitado)
  - `token`: string (código único aleatorio de al menos 32 caracteres)
  - `status`: enum ('pending', 'used', 'expired')
  - `invited_by`: UUID (FK a User)
  - `created_at`: timestamp
  - `expires_at`: timestamp (por defecto 7 días después de la creación)

- **Modelo `User` (campos adicionales)**:
  - `role_id`: UUID (FK a Role, para asignar rol de 'partner')
  - `status`: enum ('pending', 'active', 'inactive', 'banned')
  - `email_verified`: boolean (por defecto false)
  - `email_verified_at`: timestamp (opcional)

#### Endpoints API
- **GET** `/api/auth/invitation/:token` - Verificar validez del token
  - Respuesta 200: `{ valid: boolean, email: string, expired: boolean }`
  - Respuesta 404: Token no encontrado

- **POST** `/api/auth/register` - Registrar nuevo usuario
  - Body: `{ email, password, name, token }`
  - Respuesta 201: Usuario creado
  - Respuesta 400: Datos inválidos o token expirado

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/user.js` - Definir entidad User
  - `backend/domain/entities/invitation.js` - Definir entidad Invitation
  - `backend/application/services/authService.js` - Servicio para registro y validación
  - `backend/interfaces/controllers/authController.js` - Controlador para endpoints
  - `backend/interfaces/routes/authRoutes.js` - Rutas de autenticación
  - `backend/prisma/schema.prisma` - Definir modelos Prisma

- **Frontend**:
  - `frontend/pages/invitation/[token].js` - Página de validación de invitación
  - `frontend/pages/register.js` - Formulario de registro
  - `frontend/services/authService.js` - Comunicación con la API
  - `frontend/components/auth/RegisterForm.jsx` - Componente de formulario

#### Criterios de aceptación técnicos
1. El token de invitación debe ser criptográficamente seguro (32+ bytes aleatorios)
2. Las invitaciones no usadas deben expirar automáticamente después de 7 días
3. Un email solo puede tener una invitación activa a la vez
4. La contraseña debe cifrarse con bcrypt (factor de coste 12+)
5. El nuevo usuario debe tener el rol de 'partner' automáticamente
6. La API debe validar todos los campos del formulario (email, contraseña, etc.)
7. El sistema de registro debe incluir protección contra ataques de fuerza bruta

#### Tests unitarios requeridos
- Verificación de validez de token (activo, expirado, usado)
- Creación de usuario al registrarse
- Validación de formato de email y fortaleza de contraseña
- Comportamiento ante tokens duplicados o manipulados

#### Documentación a actualizar
- Documentar el proceso de invitación en docs/technical/auth.md
- Actualizar el modelo de datos en la documentación correspondiente

#### Requisitos no funcionales
- **Seguridad**: Implementar rate limiting para prevenir abusos (max 10 intentos por IP/hora)
- **Rendimiento**: La verificación del token debe responder en <200ms
- **Usabilidad**: Mensajes de error claros y específicos
- **Accesibilidad**: Formulario compatible con WCAG 2.1 nivel AA

### 🥈 HISTORIA 2 – Ver oportunidades de inversión (Must Have)

**Como** socio del club,  
**Quiero** ver las oportunidades de inversión disponibles,  
**Para** decidir si deseo invertir en alguna de ellas.

#### Descripción técnica detallada
Implementar un sistema que permita a los socios autenticados ver un listado y detalle de las oportunidades de inversión disponibles. La información debe ser completa y bien estructurada, incluyendo datos económicos, ubicación, documentación, multimedia, y permitir filtrado.

#### Campos y modelos de datos
- **Modelo `Project`** (oportunidad de inversión):
  - `id`: UUID (PK)
  - `title`: string
  - `description`: text
  - `status`: enum ('draft', 'published', 'closed', 'funded')
  - `minimum_investment`: decimal
  - `target_amount`: decimal
  - `current_amount`: decimal
  - `expected_roi`: decimal (porcentaje)
  - `location`: string
  - `property_type`: string
  - `published_at`: timestamp
  - `created_by`: UUID (FK a User)
  - `created_at`: timestamp

- **Modelo `ProjectDocument`**:
  - `id`: UUID (PK)
  - `project_id`: UUID (FK a Project)
  - `file_url`: string
  - `file_type`: string
  - `document_type`: enum ('legal', 'economic', 'technical', 'image', 'video')
  - `access_level`: enum ('public', 'partner', 'investor')
  - `created_at`: timestamp

#### Endpoints API
- **GET** `/api/projects` - Listar proyectos disponibles
  - Query params: `status`, `property_type`, `min_roi`, `location`
  - Respuesta 200: Array de proyectos con datos básicos
  
- **GET** `/api/projects/:id` - Detalle completo de un proyecto
  - Respuesta 200: Objeto proyecto con todos sus documentos y datos
  - Respuesta 404: Proyecto no encontrado

- **GET** `/api/projects/:id/documents` - Listar documentos de un proyecto
  - Query params: `document_type`
  - Respuesta 200: Array de documentos filtrados por tipo

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/project.js` - Definir entidad Project
  - `backend/domain/entities/projectDocument.js` - Definir entidad ProjectDocument
  - `backend/application/services/projectService.js` - Servicio para gestión de proyectos
  - `backend/interfaces/controllers/projectController.js` - Controlador de endpoints
  - `backend/interfaces/routes/projectRoutes.js` - Rutas de proyectos
  - `backend/middleware/authMiddleware.js` - Middleware para verificar rol de socio

- **Frontend**:
  - `frontend/pages/projects/index.js` - Página de listado de proyectos
  - `frontend/pages/projects/[id].js` - Página de detalle de proyecto
  - `frontend/components/projects/ProjectList.jsx` - Componente de listado
  - `frontend/components/projects/ProjectDetail.jsx` - Componente de detalle
  - `frontend/components/projects/DocumentViewer.jsx` - Visor de documentos
  - `frontend/services/projectService.js` - Comunicación con la API

#### Criterios de aceptación técnicos
1. Solo usuarios con rol 'partner' o superior pueden ver los proyectos
2. Los proyectos deben mostrarse paginados (10 por página) con ordenación
3. Las imágenes deben cargarse de forma optimizada y progresiva
4. Los vídeos deben reproducirse en streaming con controles de calidad
5. La vista de detalle debe incluir todos los documentos y medios asociados
6. El sistema debe implementar caching para mejorar rendimiento

#### Tests unitarios requeridos
- Filtrado correcto de proyectos por diferentes criterios
- Validación de permisos de acceso según rol
- Carga correcta de documentos asociados
- Comportamiento ante datos inválidos o faltantes

#### Documentación a actualizar
- Actualizar docs/api/projects.md con los endpoints implementados
- Documentar sistema de permisos en docs/technical/permissions.md

#### Requisitos no funcionales
- **Rendimiento**: Tiempo de carga inicial <1s, paginación <500ms
- **Seguridad**: Validar permisos de usuario en cada endpoint
- **Escalabilidad**: Implementar consultas optimizadas para grandes volúmenes
- **Experiencia**: Interfaz responsive con viewport optimizado para tablets

### 🥉 HISTORIA 3 – Marcar "Invierto" (Must Have)

**Como** socio,  
**Quiero** poder indicar que deseo invertir en un proyecto y cuánto,  
**Para** que el gestor y los demás socios conozcan mi compromiso.

> Para una explicación técnica detallada de la implementación, consulta la [documentación del flujo de inversión](docs/technical/investment-flow.md).

#### Descripción técnica detallada

Implementar una funcionalidad que permita a los socios registrar su intención formal de invertir en un proyecto, indicando el monto específico. El sistema debe validar que el monto cumpla con los requisitos mínimos, actualizar el estado del proyecto y notificar tanto al gestor como a los demás socios.

#### Campos y modelos de datos
- **Modelo `Investment`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK a User)
  - `project_id`: UUID (FK a Project)
  - `amount`: decimal (monto a invertir)
  - `invested_at`: timestamp
  - `status`: enum ('pending', 'confirmed', 'cancelled')
  - `notes`: text (opcional)
  - `contract_reference`: string (opcional)

- **Modelo `Notification`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK a User)
  - `type`: enum ('new_investment', 'project_update', 'message')
  - `content`: text
  - `related_id`: UUID (proyecto o inversión relacionada)
  - `read`: boolean
  - `created_at`: timestamp

#### Endpoints API
- **POST** `/api/projects/:id/invest` - Registrar intención de inversión
  - Body: `{ amount, notes }`
  - Respuesta 201: Inversión registrada
  - Respuesta 400: Datos inválidos o monto insuficiente
  - Respuesta 403: Usuario sin permisos o proyecto no disponible

- **GET** `/api/projects/:id/investments` - Listar inversiones en un proyecto
  - Respuesta 200: Array de inversiones en el proyecto
  
- **GET** `/api/users/me/investments` - Listar mis inversiones
  - Respuesta 200: Array de inversiones del usuario actual

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/investment.js` - Definir entidad Investment
  - `backend/domain/entities/notification.js` - Definir entidad Notification
  - `backend/application/services/investmentService.js` - Lógica de inversiones
  - `backend/application/services/notificationService.js` - Lógica de notificaciones
  - `backend/interfaces/controllers/investmentController.js` - Controlador
  - `backend/interfaces/routes/investmentRoutes.js` - Rutas de inversión
  - `backend/prisma/schema.prisma` - Añadir modelos nuevos

- **Frontend**:
  - `frontend/components/projects/InvestmentForm.jsx` - Formulario de inversión
  - `frontend/components/projects/InvestmentSummary.jsx` - Resumen de inversiones
  - `frontend/pages/account/investments.js` - Página de mis inversiones
  - `frontend/services/investmentService.js` - Comunicación con la API

#### Criterios de aceptación técnicos
1. Validar que el monto sea >= al mínimo establecido para el proyecto
2. Actualizar el campo `current_amount` del proyecto al registrar inversión
3. Crear notificaciones automáticas para todos los socios
4. La operación debe ser transaccional (todo o nada)
5. Un usuario solo puede tener una inversión activa por proyecto
6. Implementar bloqueo optimista para evitar condiciones de carrera

#### Tests unitarios requeridos
- Validación correcta de montos mínimos
- Creación correcta de notificaciones
- Actualización del total invertido en el proyecto
- Manejo de errores y transacciones

#### Documentación a actualizar
- ✅ [Documentación técnica del flujo de inversión](docs/technical/investment-flow.md) - Arquitectura, componentes y consideraciones de seguridad
- ✅ [Documentación de la API de inversiones](docs/api/investments.md) - Endpoints detallados y ejemplos
- ✅ Diagramas de flujo del proceso de inversión (incluidos en la documentación técnica)

#### Requisitos no funcionales
- **Seguridad**: Verificar permisos y validar origen de la solicitud
- **Integridad**: Garantizar consistencia transaccional
- **Rendimiento**: Optimizar consultas para que el proceso tome <500ms
- **Concurrencia**: Manejar múltiples inversiones simultáneas correctamente
- **Auditoría**: Registrar todas las operaciones para trazabilidad

---

Para ver todas las historias de usuario completamente documentadas, consulta el documento detallado: [Historias de Usuario Completas](docs/product/user-stories.md)

---

## 6. Tickets de trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

### 🎟️ Ticket 1: Backend - Servicio de gestión de invitaciones

**Título:** Implementar servicio de invitaciones

#### Descripción
Crear los servicios de backend para gestionar el ciclo de vida completo de las invitaciones: generación, validación, expiración y uso. (Nota: Incluye la lógica para *crear* una invitación, que será usada por la UI del gestor).

#### Criterios de Aceptación
- Se genera correctamente un token único y criptográficamente seguro
- Se puede verificar si un token es válido o ha expirado
- Se gestiona correctamente la actualización de estado (usado, expirado)
- Se implementa la lógica para asegurar que solo hay una invitación activa por email
- Se registra toda la información necesaria (quién invitó, cuándo, etc.)
- Incluye una función para *crear* una nueva invitación asociada a un email y al gestor que invita

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 5 puntos de historia
- **Asignado a:** Equipo de Backend
- **Etiquetas:** Backend, Seguridad, MVP

#### Tareas
1. Crear servicio para generar tokens seguros
2. Implementar verificación de tokens
3. Desarrollar lógica de expiración automática
4. Validar unicidad de invitación por email
5. Implementar función para marcar token como usado después del registro
6. Implementar función para crear una nueva invitación en la base de datos
7. Agregar tests unitarios



### 🎟️ Ticket 2: Frontend - Formulario de registro para nuevos socios

**Título:** Implementar formulario de registro para nuevos socios

#### Descripción
Crear el formulario de registro que usarán los nuevos socios para crear su cuenta después de recibir una invitación válida.

#### Criterios de Aceptación
- El formulario captura nombre (**firstName**), apellidos (**lastName**), email, contraseña y confirmación
- Valida que la contraseña cumpla los requisitos de seguridad
- Muestra feedback en tiempo real sobre la fortaleza de la contraseña
- El email viene precargado y no es editable si viene de un token válido
- Envía correctamente los datos al endpoint de registro
- Maneja errores de validación con mensajes claros
- Redirige a página de confirmación tras registro exitoso
- Los campos **firstName** y **lastName** son obligatorios

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 5 puntos de historia
- **Asignado a:** Equipo de Frontend
- **Etiquetas:** Frontend, UI/UX, Seguridad, MVP

#### Tareas
1. Crear componente de formulario con todos los campos necesarios (**firstName, lastName**, email, password, confirmPassword)
2. Implementar validación del lado del cliente
3. Conectar con API para envío de datos
4. Desarrollar indicador de fortaleza de contraseña
5. Implementar manejo de errores y mensajes de validación
6. Asegurar accesibilidad (WCAG 2.1 nivel AA)
7. Hacer pruebas de usabilidad en diferentes dispositivos
8. Asegurar que el campo email esté pre-rellenado y deshabilitado cuando corresponda



### 🎟️ Ticket 3: Base de Datos - Configuración y modelo para invitaciones

**Título:** Implementar modelo de datos para invitaciones y migrations

#### Descripción
Crear el modelo de datos para gestionar invitaciones de usuarios al club. Implementar la estructura de base de datos que almacene tokens de invitación, estados, fechas de expiración y relaciones con usuarios.

#### Criterios de Aceptación
- El modelo Invitation tiene todos los campos requeridos (id, email, token, status, invited_by, created_at, expires_at)
- Se han creado las migraciones de Prisma correctamente
- Los tipos de datos son apropiados (UUID para IDs, enum para status, etc.)
- Las relaciones entre modelos están correctamente definidas
- Se ha implementado la expiración automática (7 días por defecto)

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 3 puntos de historia
- **Asignado a:** Equipo de Backend
- **Etiquetas:** Backend, Base de datos, Prisma, MVP

#### Tareas
1. Actualizar el esquema Prisma con el modelo Invitation
2. Definir relaciones con el modelo User
3. Crear enumeraciones para estados (pending, used, expired)
4. Generar migraciones
5. Implementar índices para búsquedas eficientes por email y token
6. Ejecutar migraciones en entorno de desarrollo



---

## 7. Pull Requests

**Pull Request #1: Configuración Inicial del Proyecto y HU1**
*   **Número y Título:** #1 - initial project setup AND HU1
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/1](https://github.com/loretops/finalproject-LPS/pull/1)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request integra los primeros 11 commits del proyecto, que incluyen la configuración inicial del backend y frontend, la estructura de directorios, la implementación de la Historia de Usuario 1 (Registro mediante invitación), y la documentación base (README, tickets, prompts). También incluye correcciones como la de ignorar el directorio `.next` de frontend. Representa el primer gran avance funcional y estructural del proyecto.

**Pull Request #2: Oportunidades de Inversión**
*   **Número y Título:** #2 - Feature/oportunidades inversion
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/2](https://github.com/loretops/finalproject-LPS/pull/2)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa la estandarización completa de la interfaz de usuario en toda la aplicación. Incluye la creación de componentes UI reutilizables (Button, Input, Card), actualización de páginas existentes para usar estos componentes, mejora de la estructura de las páginas de administración para evitar duplicación de elementos, y documentación de los cambios. El objetivo principal es proporcionar una experiencia de usuario coherente y profesional en toda la plataforma.

**Pull Request #3: Ver oportunidades de inversión (HU2)**
*   **Número y Título:** #3 - Feature/hu2 view investment opportunities
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/3](https://github.com/loretops/finalproject-LPS/pull/3)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa la Historia de Usuario 2, permitiendo a los socios ver y explorar las oportunidades de inversión disponibles. Incluye la implementación del listado de proyectos, filtros, visualización detallada, y la infraestructura necesaria para mostrar documentos asociados a cada proyecto. Esta funcionalidad es fundamental para que los socios puedan evaluar y seleccionar oportunidades de inversión adecuadas a sus intereses y objetivos financieros.

**Pull Request #4: Marcar "Me interesa" (HU9)**
*   **Número y Título:** #4 - Feature/hu9 marcar me interesa
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/4](https://github.com/loretops/finalproject-LPS/pull/4)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request resuelve los problemas de la Historia de Usuario 9 relacionados con la funcionalidad del botón "Me Interesa" en las tarjetas de proyectos. Corrige varios problemas de propagación de eventos que impedían que el botón fuera clickable debido a que el enlace de la tarjeta capturaba el evento. Incluye mejoras en los componentes ProjectCard e InterestButton para asegurar que los eventos de clic se capturen correctamente, se detengan y no se propaguen al contenedor padre. También mejora el mensaje de paginación en la lista de proyectos para evitar problemas con valores NaN. Esta corrección permite a los usuarios expresar adecuadamente su interés en los proyectos directamente desde la vista de lista.

**Pull Request #5: Marcar "Invierto" (HU3)**
*   **Número y Título:** #5 - Feature/hu3 marcar invierto
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/5](https://github.com/loretops/finalproject-LPS/pull/5)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa la Historia de Usuario 3, permitiendo a los socios registrar su intención formal de invertir en un proyecto indicando el monto específico. Incluye la creación del modelo de Investment con todos sus campos, endpoints de API para registrar inversiones, listar inversiones por proyecto y por usuario, interfaz de usuario para el formulario de inversión con validación de montos mínimos, actualización automática del monto total comprometido en cada proyecto, y sistema de notificaciones para gestores y otros socios. También implementa las pruebas unitarias y de integración necesarias para garantizar el correcto funcionamiento de esta funcionalidad crítica para el modelo de negocio de la plataforma.

**Pull Request #6: Verificación de correo electrónico (HU7)**
*   **Número y Título:** #6 - Feature/hu7 email verification
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/6](https://github.com/loretops/finalproject-LPS/pull/6)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa el sistema completo de verificación de correo electrónico, añadiendo una capa adicional de seguridad a la plataforma. Incluye el modelo de datos para tokens de verificación, servicios backend para generación y validación de tokens, endpoints API para el proceso de verificación, plantillas HTML para emails, páginas frontend para verificar y reenviar verificaciones, y componentes UI para mostrar el estado de verificación a los usuarios. Se integra perfectamente con la autenticación existente, añadiendo indicadores visuales para usuarios no verificados y funcionalidad para verificar cuentas a través de emails con tokens seguros. Todos los tickets asociados (#52-#57) han sido completados exitosamente con sus respectivas pruebas para garantizar el correcto funcionamiento.

**Pull Request #7: Despliegue en la nube**
*   **Número y Título:** #7 - Deploy cloud
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/7](https://github.com/loretops/finalproject-LPS/pull/7)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa la configuración necesaria para el despliegue del proyecto en servicios cloud. Incluye la configuración de variables de entorno, ajustes en los archivos de configuración para producción, y documentación detallada del proceso de despliegue. Esta PR es fundamental para preparar el proyecto para su puesta en producción y garantizar que todos los servicios (frontend, backend, base de datos y almacenamiento) funcionen correctamente en un entorno cloud.

**Pull Request #8: Paso 2 del despliegue**
*   **Número y Título:** #8 - Deploy step 2
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/8](https://github.com/loretops/finalproject-LPS/pull/8)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request completa el segundo paso del proceso de despliegue, abordando aspectos avanzados como la configuración de seguridad, optimización de rendimiento y monitorización. Incluye mejoras en la configuración de CORS, implementación de cabeceras de seguridad adicionales, optimización de carga de recursos estáticos, y configuración de logs estructurados para un mejor seguimiento del sistema en producción.

**Pull Request #9: Revisión de documentación**
*   **Número y Título:** #9 - Doc review
*   **Enlace:** [https://github.com/loretops/finalproject-LPS/pull/9](https://github.com/loretops/finalproject-LPS/pull/9)
*   **Fecha:** Mayo 2025 (Estado: Merged)
*   **Autor(a):** loretops
*   **Propósito:** Esta Pull Request implementa una mejora completa de la documentación del proyecto, incluyendo: (1) Documentación detallada de la API para todos los recursos principales (auth, projects, investments, interests, documents, notifications); (2) Reorganización de la estructura de carpetas de documentación para mejor navegabilidad; (3) Corrección y estandarización del README principal; (4) Unificación de la documentación de tickets para mayor coherencia; (5) Creación de documentación UI/UX detallada; (6) Actualización de diagramas de arquitectura y despliegue; y (7) Corrección de errores de formato en la documentación existente. La mejora proporciona una base de conocimiento sólida para el desarrollo y mantenimiento del proyecto.



## 8. Estado actual del desarrollo

El proyecto COOPCO se encuentra actualmente en fase MVP (Producto Mínimo Viable) con las siguientes funcionalidades implementadas y operativas:

### Funcionalidades completadas ✅

1. **Sistema de invitación y registro exclusivo** - Los usuarios solo pueden registrarse mediante invitación, asegurando la exclusividad del club.
2. **Verificación de correo electrónico** - Sistema completo para verificar la identidad de los usuarios mediante tokens seguros.
3. **Exploración de proyectos** - Interfaz para visualizar y filtrar las oportunidades de inversión disponibles.
4. **Expresión de interés ("Me interesa")** - Funcionalidad para expresar interés en proyectos específicos.
5. **Panel de administración básico** - Herramientas para que los gestores puedan administrar proyectos y usuarios.

### Funcionalidades en desarrollo 🚧

1. **Inversión en proyectos ("Invierto")** - Implementación avanzada para registrar intenciones formales de inversión con montos específicos.
2. **Sistema de notificaciones** - Alertas sobre actividades relevantes para usuarios y gestores.
3. **Estandarización de la interfaz de usuario** - Mejora de la coherencia visual y experiencia de usuario en toda la plataforma

### Próximos pasos 🔜

1. **Sistema de seguimiento de proyectos** - Implementación de informes semanales y visualización del avance.
2. **Integración completa con servicios de almacenamiento** - Para manejo seguro de documentos sensibles.
3. **Funcionalidad de mensajería interna** - Para comunicación directa entre gestores y socios.

### Métricas actuales 📊

- **Historias de usuario implementadas:** 3/10
- **Tickets completados:** 35/85
- **Cobertura de pruebas:** 78%
- **Despliegue en producción:** Vercel (frontend) + Render (backend) + Supabase (base de datos)

El desarrollo sigue un enfoque iterativo, priorizando las funcionalidades esenciales del modelo de negocio y asegurando una base técnica sólida para futuras expansiones.


