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
Plataforma digital exclusiva para un club privado de inversores inmobiliarios que permite acceder a oportunidades cuidadosamente seleccionadas, con toda la información relevante para evaluar el potencial de rentabilidad, expresar interés, invertir mediante préstamos participativos y seguir el desarrollo del proyecto en tiempo real. Diseñada para garantizar transparencia, seguridad y eficiencia, está orientada a personas que buscan invertir en bienes raíces con confianza y control.

### **0.4. URL del proyecto:**

> Puede ser pública o privada, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/).

### 0.5. URL o archivo comprimido del repositorio

> Puedes tenerlo alojado en público o en privado, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/). También puedes compartir por correo un archivo zip con el contenido


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

### 2.2. Características y funcionalidades principales

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

> Proporciona imágenes y/o videotutorial mostrando la experiencia del usuario desde que aterriza en la aplicación, pasando por todas las funcionalidades principales.

### **1.4. Instrucciones de instalación:**
> Documenta de manera precisa las instrucciones para instalar y poner en marcha el proyecto en local (librerías, backend, frontend, servidor, base de datos, migraciones y semillas de datos, etc.)

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

El proyecto es una plataforma web para inversión inmobiliaria privada, con acceso restringido mediante invitación. Los usuarios pueden consultar oportunidades de inversión, expresar interés, invertir, y hacer seguimiento del estado del proyecto.

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

### **2.5. Seguridad**

> Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede

### **2.6. Tests**

> Describe brevemente algunos de los tests realizados

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
  - `role`: enum ('visitor', 'partner', 'investor', 'manager')
  - `status`: enum ('pending', 'active', 'inactive', 'banned')
  - `invitation_id`: UUID (opcional, FK a Invitation)

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
  - `user_id`: UUID (FK a User, destinatario)
  - `type`: enum ('new_investment', 'project_update', 'system')
  - `content`: text
  - `read`: boolean
  - `created_at`: timestamp
  - `related_id`: UUID (opcional, referencia a la entidad relacionada)

#### Endpoints API
- **POST** `/api/investments` - Registrar una nueva inversión
  - Body: `{ project_id, amount, notes }`
  - Respuesta 201: Inversión registrada correctamente
  - Respuesta 400: Datos inválidos o monto inferior al mínimo
  
- **GET** `/api/investments/user` - Listar inversiones del usuario
  - Query params: `status`
  - Respuesta 200: Array de inversiones con datos del proyecto

- **GET** `/api/projects/:id/investments` - Listar inversiones de un proyecto
  - Respuesta 200: Array con inversiones y porcentaje de financiación alcanzado

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/investment.js` - Definir entidad Investment
  - `backend/domain/entities/notification.js` - Definir entidad Notification
  - `backend/application/services/investmentService.js` - Servicio de inversiones
  - `backend/application/services/notificationService.js` - Servicio de notificaciones
  - `backend/interfaces/controllers/investmentController.js` - Controlador
  - `backend/interfaces/routes/investmentRoutes.js` - Rutas
  - `backend/prisma/schema.prisma` - Nuevos modelos Prisma

- **Frontend**:
  - `frontend/pages/projects/[id]/invest.js` - Página de formulario de inversión
  - `frontend/components/investments/InvestmentForm.jsx` - Componente de formulario
  - `frontend/components/projects/InvestmentProgress.jsx` - Barra de progreso
  - `frontend/components/notifications/Notification.jsx` - Componente de notificación
  - `frontend/services/investmentService.js` - Comunicación con la API

#### Criterios de aceptación técnicos
1. La inversión debe actualizarse en tiempo real para otros usuarios
2. El monto mínimo debe validarse tanto en frontend como backend
3. Las notificaciones deben enviarse por email y dentro de la plataforma
4. El sistema debe manejar concurrencia para evitar sobrefinanciación
5. La barra de progreso debe actualizarse automáticamente
6. El gestor debe recibir una notificación especial con detalles completos

#### Tests unitarios requeridos
- Validación de monto mínimo en diferentes escenarios
- Integridad transaccional al registrar inversión
- Generación correcta de notificaciones
- Actualización del estado del proyecto según inversiones

#### Documentación a actualizar
- Actualizar manual de usuario en docs/user/investing.md
- Documentar flujo de notificaciones en docs/technical/notifications.md

#### Requisitos no funcionales
- **Seguridad**: Validar que el usuario tenga rol 'partner' y el proyecto esté activo
- **Disponibilidad**: Operación crítica con alta disponibilidad (99.9%)
- **Auditoría**: Registro completo de eventos para trazabilidad
- **Rendimiento**: Operación completa <2s incluyendo notificaciones

### HISTORIA 4 – Ver documentos seguros (Should Have)

**Como** inversor,  
**Quiero** poder ver los documentos legales y técnicos de un proyecto,  
**Para** conocer todos los detalles sin posibilidad de descargarlos.

#### Descripción técnica detallada
Implementar un visor de documentos que permita a los inversores consultar documentación sensible (contratos, informes técnicos, etc.) con restricciones que impidan su descarga o captura, manteniendo la información segura mientras se garantiza la transparencia.

#### Campos y modelos de datos
- Ya mencionados en historias anteriores (ProjectDocument)
- Nuevos campos para seguimiento:
  - `document_views`: tabla para auditoría de visualizaciones
  - `watermark_config`: configuración de marcas de agua personalizadas

#### Endpoints API
- **GET** `/api/documents/:id/view` - Servir documento para visualización
  - Response: Documento con protecciones aplicadas
  - Seguridad: Token JWT específico para un solo documento y sesión

#### Archivos a modificar/crear
- **Backend**:
  - `backend/services/secureDocumentService.js` - Servicio para gestión segura
  - `backend/middleware/documentViewMiddleware.js` - Middleware de auditoría

- **Frontend**:
  - `frontend/components/documents/SecureDocumentViewer.jsx` - Visor seguro
  - `frontend/hooks/useSecureDocument.js` - Hook para gestión de visualización

#### Criterios de aceptación técnicos
1. Impedir capturas de pantalla cuando sea técnicamente posible
2. Aplicar marca de agua con identificación del usuario
3. Limitar el tiempo de visualización por sesión
4. Registrar todas las visualizaciones para auditoría

### HISTORIA 5 – Mensajería interna (Should Have)

**Como** socio o inversor,  
**Quiero** poder comunicarme con los gestores a través de la plataforma,  
**Para** resolver dudas o solicitar información adicional sobre proyectos.

#### Descripción técnica detallada
Implementar un sistema de mensajería interna que permita la comunicación directa entre usuarios y gestores, con soporte para conversaciones, notificaciones y seguimiento de temas relacionados con proyectos específicos.

#### Campos y modelos de datos
- **Modelo `Message`**:
  - `id`: UUID (PK)
  - `sender_id`: UUID (FK a User)
  - `receiver_id`: UUID (FK a User)
  - `project_id`: UUID (opcional, FK a Project)
  - `subject`: string
  - `content`: text
  - `read`: boolean
  - `created_at`: timestamp

#### Endpoints API
- **POST** `/api/messages` - Enviar mensaje
- **GET** `/api/messages` - Listar conversaciones
- **GET** `/api/messages/:conversationId` - Ver hilo completo

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/message.js` - Entidad mensaje
  - `backend/application/services/messageService.js` - Servicio de mensajes

- **Frontend**:
  - `frontend/pages/messages/index.js` - Bandeja de entrada
  - `frontend/components/messages/MessageThread.jsx` - Hilo de mensajes

#### Criterios de aceptación técnicos
1. Notificaciones en tiempo real mediante WebSockets
2. Indicador visual de mensajes no leídos
3. Posibilidad de adjuntar referencias a proyectos
4. Búsqueda por contenido y filtrado por fecha

### HISTORIA 6 – Informes semanales de proyecto (Could Have)

**Como** inversor,  
**Quiero** ver informes periódicos sobre mis inversiones,  
**Para** seguir el progreso y estar informado de cualquier incidencia.

#### Descripción técnica detallada
Desarrollar un sistema que permita a los gestores publicar informes periódicos sobre el avance de los proyectos, con elementos estructurados (progreso de obra, hitos financieros, actualizaciones legales) y que los inversores puedan consultarlos de forma organizada.

#### Campos y modelos de datos
- **Modelo `ProjectUpdate`**:
  - `id`: UUID (PK)
  - `project_id`: UUID (FK a Project)
  - `title`: string
  - `content`: text (formateado con Markdown)
  - `type`: enum ('weekly', 'milestone', 'alert')
  - `progress_percentage`: integer
  - `published_at`: timestamp
  - `created_by`: UUID (FK a User)

#### Endpoints API
- **POST** `/api/projects/:id/updates` - Publicar actualización
- **GET** `/api/projects/:id/updates` - Listar actualizaciones
- **GET** `/api/updates/:id` - Ver detalle de actualización

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/projectUpdate.js` - Entidad actualización
  - `backend/application/services/updateService.js` - Servicio de actualizaciones

- **Frontend**:
  - `frontend/pages/projects/[id]/updates/index.js` - Lista de informes
  - `frontend/components/projects/UpdateDetail.jsx` - Detalle de informe

#### Criterios de aceptación técnicos
1. Soporte para contenido multimedia en informes
2. Gráficos de progreso y comparativas con cronograma
3. Notificación automática a inversores al publicarse
4. Versionado de informes para auditoría

### Tabla priorizada de historias de usuario (MoSCoW)

| ID | Historia de Usuario | Prioridad | Complejidad | Dependencias | Estimación |
|----|-------------------|-----------|------------|-------------|------------|
| US01 | Registro mediante invitación | Must Have | Media | Ninguna | 8 puntos |
| US02 | Ver oportunidades de inversión | Must Have | Alta | US01 | 13 puntos |
| US03 | Marcar "Invierto" | Must Have | Alta | US01, US02 | 13 puntos |
| US04 | Ver documentos seguros | Should Have | Media | US01, US02 | 8 puntos |
| US05 | Mensajería interna | Should Have | Media | US01 | 8 puntos |
| US06 | Informes semanales de proyecto | Could Have | Media | US01, US03 | 8 puntos |
| US07 | Marcar "Me interesa" | Should Have | Baja | US01, US02 | 5 puntos |
| US08 | Enviar invitaciones (gestores) | Must Have | Baja | Ninguna | 5 puntos |
| US09 | Publicar oportunidad de inversión | Must Have | Alta | Ninguna | 13 puntos |
| US10 | Autenticación de usuarios | Must Have | Media | US01 | 8 puntos |
| US11 | Gestionar socios inactivos | Could Have | Media | US01, US07 | 8 puntos |
| US12 | Ver streaming en directo | Could Have | Alta | US01, US03 | 13 puntos |
| US13 | Recibir notificaciones | Should Have | Media | US01 | 8 puntos |
| US14 | Ver panel de control (gestor) | Should Have | Alta | US08, US09 | 13 puntos |

---

## 6. Tickets de trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

### 🎟️ Ticket 1: Backend - Registro de Inversión con Validación y Notificación

**Título:** Registro de Inversión con Validación de Mínimos y Notificación a Socios

#### Descripción
Implementar una funcionalidad backend que permita al socio registrado indicar el importe que desea invertir en una oportunidad activa. El sistema debe validar que se cumpla el mínimo requerido (ya sea un importe fijo o un % del total del proyecto), registrar la inversión, y notificar al resto de socios que una parte del capital ya ha sido comprometida.

#### Criterios de Aceptación
- **Dado que** un socio está logueado y accede al detalle de una oportunidad activa
- **Cuando** pulsa "Invertir" y especifica una cantidad
- **Entonces** el sistema valida el importe mínimo, lo registra y dispara una notificación al resto de socios

Si la cantidad es inválida o inferior al mínimo, se devuelve error y el registro no se guarda.

El sistema debe ser transaccional para evitar inconsistencias por inversión simultánea.

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 8 puntos de historia
- **Asignado a:** Equipo de Backend
- **Etiquetas:** Backend, Inversión, Validación, Notificación, Sprint 1

#### Comentarios
- Validar que el usuario sea socio autorizado
- Crear endpoint REST: POST /api/investments
- Enviar notificación (email + notificación interna) al resto de socios del club que no hayan invertido aún
- Revisar lógica de validación de inversión mínima: debe poder configurarse a nivel de cada oportunidad

#### Enlaces
- Documento de Reglas de Inversión
- Diagrama de flujo del proceso de inversión

#### Historial de Cambios
- 14/04/2025: Creado por Product Manager
- 15/04/2025: Añadido requerimiento de transaccionalidad por Tech Lead

### 🎟️ Ticket 2: Frontend - Vista de Detalle de Oportunidad

**Título:** Vista Detallada de Oportunidad con Simulación Económica y Multimedia

#### Descripción
Diseñar e implementar una vista completa en la parte privada de socios que muestre el detalle de una oportunidad de inversión. Esta vista debe incluir los datos clave del proyecto, estudio económico, estudio de mercado, vídeo explicativo, planos, galería de fotos, y la posibilidad de simular el retorno de inversión.

#### Criterios de Aceptación
- **Dado que** el socio está autenticado y accede a una oportunidad
- **Cuando** se carga la página
- **Entonces** se muestra el título, resumen, importe total, rentabilidad estimada, vídeo, plano, fotos y botón "Me interesa" o "Invertir"

El módulo de simulación permite introducir un importe deseado y devuelve una estimación del retorno.

Si el usuario no es socio, la página no debe permitir acceso.

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 13 puntos de historia
- **Asignado a:** Equipo de Frontend
- **Etiquetas:** Frontend, Inversión, Multimedia, Simulación, Sprint 2

#### Comentarios
- Utilizar framework React y diseño responsive
- Incluir componentes embebidos para vídeo (vía iframe o reproductor HTML5)
- Mostrar planos en slider o visor PDF integrado
- Preparar módulo de simulación como componente independiente reutilizable
- Asegurarse de aplicar control de acceso a nivel de ruta y componente

#### Enlaces
- Figma del diseño UI/UX
- API de Oportunidades: `/api/opportunities/:id`

#### Historial de Cambios
- 14/04/2025: Creado por Product Manager
- 15/04/2025: Añadido requerimiento de control de acceso por Tech Lead

### 🎟️ Ticket 3: Base de Datos - Creación de Tablas de Inversión

**Título:** Diseño y Creación de Tablas de Inversión e Historial de Inversión

#### Descripción
Diseñar y crear la estructura de base de datos necesaria para registrar todas las inversiones que los socios realizan en las oportunidades disponibles. Incluir tabla principal investments y tabla asociada investment_logs para trazabilidad.

#### Criterios de Aceptación
- **Dado que** un socio invierte en una oportunidad
- **Cuando** se guarda el registro
- **Entonces** los datos se almacenan correctamente en las tablas investments e investment_logs

Las tablas deben estar normalizadas y tener claves foráneas válidas hacia users y opportunities.

El sistema debe soportar registros con múltiples inversiones por socio en distintas oportunidades.

#### Detalles Técnicos
- **Prioridad:** Alta
- **Estimación:** 5 puntos de historia
- **Asignado a:** Equipo de Base de Datos
- **Etiquetas:** Base de Datos, Inversión, Estructura, Sprint 1

#### Comentarios
- Crear tabla `investments` con campos:
  - id, user_id, opportunity_id, amount, timestamp, status
- Crear tabla `investment_logs` con campos:
  - id, investment_id, action, actor_id, timestamp, notes
- Crear índices para búsquedas por usuario y por oportunidad
- Documentar relaciones en el modelo de datos (ER Diagram)

#### Enlaces
- Esquema inicial del modelo entidad-relación
- Conexión con microservicio de inversiones (diagrama técnico)

#### Historial de Cambios
- 14/04/2025: Creado por Arquitecto de Datos
- 15/04/2025: Confirmada clave compuesta user_id + opportunity_id para evitar duplicidades

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1**

**Pull Request 2**

**Pull Request 3**

