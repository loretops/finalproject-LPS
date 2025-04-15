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
├── client/                      # Aplicación frontend (Next.js)
│   ├── pages/                  # Rutas del sitio (cada archivo es una página)
│   ├── components/             # Componentes reutilizables de interfaz
│   ├── services/               # Funciones para interactuar con el backend (fetch, axios)
│   ├── context/                # Contextos globales (auth, usuario, etc.)
│   └── styles/                 # Estilos globales y por componente
│
├── server/                      # Backend (Node.js + Express)
│   ├── index.js                # Punto de entrada del servidor
│   ├── routes.js               # Todas las rutas agrupadas aquí
│   ├── controllers/            # Funciones que manejan la lógica de cada ruta
│   ├── middleware/             # Middleware de autenticación y roles
│   └── utils/                  # Funciones auxiliares (validaciones, tokens, etc.)
│
├── prisma/                     # ORM y modelo de datos
│   ├── schema.prisma          # Definición de las tablas y relaciones
│   └── migrations/            # Migraciones generadas por Prisma
│
├── .env                        # Variables de entorno (conexiones, claves API, etc.)
├── package.json                # Dependencias y scripts
├── README.md                   # Documentación del proyecto
└── tsconfig.json              # Configuración de TypeScript
```

### 📂 Explicación por carpeta

| Carpeta | Propósito |
|---------|-----------|
| `client/` | Código del frontend. Gestiona la interfaz, navegación y llamadas a la API |
| `pages/` | Cada archivo representa una página con ruta automática (/login, /proyectos, etc.) |
| `components/` | Elementos reutilizables: botones, formularios, tarjetas, etc. |
| `services/` | Módulo donde se centralizan todas las llamadas a la API del backend |
| `context/` | Manejo de contexto global para sesión, usuario, etc. |
| `server/` | Backend Express. Gestiona peticiones, lógica de negocio y conexión a la BBDD |
| `routes.js` | Agrupa y exporta todas las rutas de forma sencilla |
| `controllers/` | Código que ejecuta las acciones al recibir una petición |
| `middleware/` | Funciones que controlan el acceso, verificación de tokens y roles |
| `utils/` | Funciones auxiliares para validaciones, generación de tokens, etc. |
| `prisma/` | ORM y definición del modelo de datos (schema + migraciones) |
| `.env` | Configuración de variables sensibles (URL DB, claves Cloudinary...) |

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

```
erDiagram
    users ||--o{ invitations : has
    users ||--o{ expressed_interests : expresses
    users ||--o{ investments : makes
    users ||--o{ notifications : receives
    users ||--o{ projects : creates

    invitations {
        UUID id PK
        VARCHAR email
        VARCHAR token
        UUID invited_by FK
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP expires_at
    }

    users {
        UUID id PK
        VARCHAR email
        TEXT password_hash
        VARCHAR role
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    projects ||--o{ project_documents : has
    projects ||--o{ expressed_interests : receives
    projects ||--o{ investments : receives
    projects ||--o{ project_updates : has

    projects {
        UUID id PK
        VARCHAR title
        TEXT description
        VARCHAR status
        DECIMAL minimum_investment
        DECIMAL target_amount     
        DECIMAL current_amount    
        DECIMAL expected_roi      
        VARCHAR location          
        VARCHAR property_type     
        TIMESTAMP published_at
        UUID created_by FK
        TIMESTAMP created_at
    }

    project_documents {
        UUID id PK
        UUID project_id FK
        TEXT file_url
        VARCHAR file_type
        VARCHAR access_level
        VARCHAR document_type  
        TIMESTAMP created_at
    }

    expressed_interests {
        UUID id PK
        UUID user_id FK
        UUID project_id FK
        TIMESTAMP expressed_at
    }

    investments {
        UUID id PK
        UUID user_id FK
        UUID project_id FK
        DECIMAL amount
        TIMESTAMP invested_at
        VARCHAR status          
        TEXT contract_reference 
    }

    project_updates {
        UUID id PK
        UUID project_id FK
        VARCHAR title
        TEXT description
        TEXT video_url
        TIMESTAMP created_at
    }

    notifications {
        UUID id PK
        UUID user_id FK
        TEXT content
        BOOLEAN read
        TIMESTAMP created_at
    }
```
![Diagrama Modelo de Datos](docs/images/modelo_datos.png)



### **3.2. Descripción de entidades principales:**

#### 1. users
Representa a los usuarios del sistema, incluyendo visitantes registrados, socios e inversores, y gestores.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del usuario | PK, NOT NULL, UNIQUE |
| email | VARCHAR | Email del usuario | NOT NULL, UNIQUE |
| password_hash | TEXT | Hash de la contraseña | NOT NULL |
| role | VARCHAR | Rol del usuario (visitor, socio, gestor) | NOT NULL, CHECK en valores permitidos |
| status | VARCHAR | Estado del usuario (active, pending, banned) | NOT NULL, DEFAULT: 'pending' |
| created_at | TIMESTAMP | Fecha de creación de la cuenta | NOT NULL, DEFAULT: now() |
| updated_at | TIMESTAMP | Fecha de última actualización del perfil | NOT NULL, DEFAULT: now() |

##### Relaciones
- 🔑 id → invitations.invited_by
- 🔑 id → expressed_interests.user_id
- 🔑 id → investments.user_id
- 🔑 id → notifications.user_id
- 🔑 id → projects.created_by

#### 2. projects
Oportunidades de inversión inmobiliaria publicadas por los gestores.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador único del proyecto | PK, NOT NULL, UNIQUE |
| title | VARCHAR | Título del proyecto | NOT NULL |
| description | TEXT | Descripción general | NOT NULL |
| status | VARCHAR | Estado (draft, published, closed, etc.) | NOT NULL, DEFAULT: 'draft' |
| minimum_investment | DECIMAL | Inversión mínima por usuario | NOT NULL, CHECK > 0 |
| target_amount | DECIMAL | Monto total a captar | NOT NULL, CHECK > 0 |
| current_amount | DECIMAL | Monto ya invertido | DEFAULT: 0, CHECK >= 0 |
| expected_roi | DECIMAL | Retorno estimado | CHECK >= 0 |
| location | VARCHAR | Ubicación de la propiedad | NULLABLE |
| property_type | VARCHAR | Tipo (residencial, comercial, etc.) | NULLABLE |
| published_at | TIMESTAMP | Fecha de publicación | NULLABLE |
| created_by | UUID | Usuario gestor que creó el proyecto | FK → users.id, NOT NULL |
| created_at | TIMESTAMP | Fecha de creación | NOT NULL, DEFAULT: now() |

##### Relaciones
- 🔑 id → project_documents.project_id
- 🔑 id → expressed_interests.project_id
- 🔑 id → investments.project_id
- 🔑 id → project_updates.project_id

#### 3. investments
Inversiones realizadas en un proyecto.

| Campo | Tipo de Dato | Descripción | Restricciones |
|-------|-------------|-------------|---------------|
| id | UUID | Identificador de la inversión | PK, NOT NULL |
| user_id | UUID | Usuario que invierte | FK → users.id, NOT NULL |
| project_id | UUID | Proyecto en el que invierte | FK → projects.id, NOT NULL |
| amount | DECIMAL | Monto invertido | NOT NULL, CHECK > 0 |
| invested_at | TIMESTAMP | Fecha de inversión | NOT NULL, DEFAULT: now() |
| status | VARCHAR | Estado (pending, confirmed, etc.) | NOT NULL, DEFAULT: 'pending' |
| contract_reference | TEXT | Identificador del contrato legal | NULLABLE |

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

---

## 5. Historias de Usuario

### 🥇 HISTORIA 1 – Registro mediante invitación (Must Have)

**Como** usuario invitado,  
**Quiero** registrarme mediante una invitación exclusiva,  
**Para** acceder a la zona privada como socio del club.

#### Descripción
Solo los usuarios que reciben una invitación personalizada del gestor pueden acceder al área privada del Club de Socios.

#### Criterios de Aceptación
- **Dado que** el gestor ha enviado una invitación al email del usuario
- **Cuando** el usuario accede al enlace recibido y completa su registro
- **Entonces** su cuenta queda validada y puede iniciar sesión como socio

#### Notas adicionales
Se requiere un sistema de generación de enlaces únicos con expiración y validación por email.

#### Tareas
- Diseñar el modelo de invitaciones (estructura y caducidad)
- Crear la vista del formulario de registro para invitados
- Implementar verificación del enlace (válido/no válido/caducado)
- Integrar confirmación por correo electrónico
- Vincular usuario a rol "socio"

### 🥈 HISTORIA 2 – Ver oportunidades de inversión (Must Have)

**Como** socio del club,  
**Quiero** ver las oportunidades de inversión disponibles,  
**Para** decidir si deseo invertir en alguna de ellas.

#### Descripción
El socio autenticado puede consultar las fichas de los proyectos con información detallada: rentabilidad, estudio económico, planos, fotos, vídeo, etc.

#### Criterios de Aceptación
- **Dado que** un socio está autenticado
- **Cuando** accede al área de oportunidades
- **Entonces** puede visualizar fichas de inversión detalladas (ocultas al público)

#### Notas adicionales
Toda esta información debe almacenarse de forma segura. No accesible sin login. Vídeos deben estar protegidos contra descarga o enlace directo.

#### Tareas
- Definir modelo de datos de las oportunidades
- Crear interfaz para mostrar fichas de inversión
- Integrar visor multimedia (fotos, vídeo)
- Control de permisos: solo socios autenticados
- Cargar estudio económico y documentación en vista protegida

### 🥉 HISTORIA 3 – Marcar "Invierto" (Must Have)

**Como** socio,  
**Quiero** poder indicar que deseo invertir en un proyecto y cuánto,  
**Para** que el gestor y los demás socios conozcan mi compromiso.

#### Descripción
Permite a los socios señalar su interés formal con un importe determinado, que se registra y muestra como parte del progreso de financiación.

#### Criterios de Aceptación
- **Dado que** el socio ha accedido a una oportunidad de inversión
- **Cuando** pulsa "Invierto" e introduce el importe
- **Entonces** el sistema registra el dato y actualiza el porcentaje de inversión comprometida, notificando al gestor y a los socios

#### Notas adicionales
Puede haber un mínimo de inversión. Se debe validar el importe y evitar duplicidades.

#### Tareas
- Diseñar formulario para entrada de importe
- Validar importe ≥ mínimo
- Registrar en base de datos como "inversión comprometida"
- Generar notificación a otros socios
- Actualizar progreso de inversión en el panel del proyecto

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

