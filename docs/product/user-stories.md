# Club de Inversión Inmobiliaria - Historias de Usuario

## ✅ Historias Principales

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
- Agregar docs/technical/investment-flow.md explicando el proceso
- Actualizar docs/api/investments.md con los endpoints
- Documentar el diagrama de flujo del proceso

#### Requisitos no funcionales
- **Seguridad**: Verificar permisos y validar origen de la solicitud
- **Integridad**: Garantizar consistencia transaccional
- **Rendimiento**: Optimizar consultas para que el proceso tome <500ms
- **Concurrencia**: Manejar múltiples inversiones simultáneas correctamente
- **Auditoría**: Registrar todas las operaciones para trazabilidad

## Otras Historias Relevantes

### 🔒 HISTORIA 4 – Ver documentos legales sin descargar (Should Have)

**Como** inversor,  
**Quiero** poder ver los documentos legales del proyecto sin poder descargarlos,  
**Para** consultar información confidencial sin poner en riesgo su seguridad.

#### Descripción técnica detallada
Implementar un visor seguro de documentos que permita a los inversores consultar los documentos legales del proyecto directamente en la plataforma, sin posibilidad de descargarlos. Debe funcionar con múltiples formatos (PDF, DOCX) y mantener la seguridad de la información.

#### Campos y modelos de datos
- **Modelo `ProjectDocument`** (campos adicionales):
  - `secured_view_url`: string (URL temporal firmada)
  - `security_level`: enum ('downloadable', 'view_only', 'watermarked')
  - `expiry_time`: timestamp (para links temporales)

#### Endpoints API
- **GET** `/api/documents/:id/secure-view` - Generar URL de visualización segura
  - Respuesta 200: `{ view_url: string, expires_at: timestamp }`
  - Respuesta 403: Usuario sin permisos

- **GET** `/api/documents/:id/audit` - Ver historial de visualizaciones
  - Respuesta 200: Array de registros de visualización

#### Archivos a modificar/crear
- **Backend**:
  - `backend/infrastructure/external/secureDocumentService.js` - Integración con visor
  - `backend/application/services/documentService.js` - Lógica de documentos
  - `backend/interfaces/controllers/documentController.js` - Controlador
  - `backend/infrastructure/database/documentRepository.js` - Acceso a datos

- **Frontend**:
  - `frontend/components/documents/SecureViewer.jsx` - Componente de visualización
  - `frontend/pages/documents/view/[id].js` - Página de visualización segura
  - `frontend/services/documentService.js` - Comunicación con la API

#### Criterios de aceptación técnicos
1. Los documentos nunca deben estar disponibles para descarga directa
2. El visor debe implementar protección contra capturas de pantalla
3. Las URLs de visualización deben ser temporales (máx. 30 minutos)
4. Agregar marca de agua con ID del usuario que visualiza
5. Registrar todos los accesos a documentos (quién, cuándo, desde dónde)

#### Tests unitarios requeridos
- Generación correcta de URLs seguras temporales
- Validación de permisos de usuario
- Expiración correcta de enlaces
- Registro correcto de accesos

#### Documentación a actualizar
- Crear docs/technical/secure-document-viewer.md
- Actualizar política de seguridad en docs/security/document-policy.md

#### Requisitos no funcionales
- **Seguridad**: Implementar DRM básico para documentos sensibles
- **Rendimiento**: Carga de documentos <3 segundos incluso para PDFs grandes
- **Compatibilidad**: Funcionar en Chrome, Firefox, Safari y Edge
- **Auditabilidad**: Registrar IP, dispositivo y tiempo de visualización

### 💬 HISTORIA 5 – Comunicación entre gestor y socio (Should Have)

**Como** gestor,  
**Quiero** poder comunicarme directamente con socios interesados,  
**Para** resolver dudas de forma personalizada.

#### Descripción técnica detallada
Desarrollar un sistema de mensajería interno que permita la comunicación directa entre gestores y socios, especialmente tras expresar interés en una inversión. El sistema debe mantener el historial de conversaciones, enviar notificaciones y organizarse por proyectos.

#### Campos y modelos de datos
- **Modelo `Conversation`**:
  - `id`: UUID (PK)
  - `project_id`: UUID (FK a Project, opcional)
  - `title`: string
  - `created_at`: timestamp
  
- **Modelo `Message`**:
  - `id`: UUID (PK)
  - `conversation_id`: UUID (FK a Conversation)
  - `sender_id`: UUID (FK a User)
  - `content`: text
  - `read`: boolean
  - `created_at`: timestamp

#### Endpoints API
- **GET** `/api/conversations` - Listar conversaciones del usuario
  - Query params: `project_id`, `unread_only`
  - Respuesta 200: Array de conversaciones con último mensaje

- **GET** `/api/conversations/:id/messages` - Obtener mensajes de una conversación
  - Query params: `page`, `limit`
  - Respuesta 200: Array de mensajes paginados

- **POST** `/api/conversations/:id/messages` - Enviar nuevo mensaje
  - Body: `{ content }`
  - Respuesta 201: Mensaje enviado

- **POST** `/api/projects/:id/conversations` - Iniciar conversación sobre proyecto
  - Body: `{ title, initial_message }`
  - Respuesta 201: Conversación creada

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/conversation.js` - Definir entidad Conversation
  - `backend/domain/entities/message.js` - Definir entidad Message
  - `backend/application/services/conversationService.js` - Lógica de conversaciones
  - `backend/interfaces/controllers/conversationController.js` - Controlador
  - `backend/interfaces/routes/conversationRoutes.js` - Rutas de API

- **Frontend**:
  - `frontend/pages/messages/index.js` - Bandeja de entrada
  - `frontend/pages/messages/conversation/[id].js` - Vista de conversación
  - `frontend/components/messages/ConversationList.jsx` - Lista de conversaciones
  - `frontend/components/messages/MessageThread.jsx` - Hilo de mensajes
  - `frontend/components/messages/MessageComposer.jsx` - Composición de mensajes
  - `frontend/services/conversationService.js` - Comunicación con la API

#### Criterios de aceptación técnicos
1. Los mensajes no leídos deben destacarse visualmente
2. La conversación debe agruparse por proyecto cuando corresponda
3. Implementar sistema de notificaciones por email (opcional para el usuario)
4. El sistema debe soportar carga de imágenes en mensajes
5. Implementar indicadores de "escribiendo..." y "mensaje leído"

#### Tests unitarios requeridos
- Creación correcta de nuevas conversaciones
- Envío y recepción de mensajes
- Marcado automático de mensajes como leídos
- Notificaciones correctas por email

#### Documentación a actualizar
- Crear docs/features/messaging.md con descripción del sistema
- Actualizar diagrama de flujo de comunicación

#### Requisitos no funcionales
- **Privacidad**: Conversaciones visibles solo para participantes
- **Rendimiento**: Carga de historial en <500ms
- **Experiencia**: Interfaz intuitiva tipo chat moderno
- **Accesibilidad**: Cumplir WCAG 2.1 nivel AA

### 📈 HISTORIA 6 – Ver informes y vídeo semanal de obra (Could Have)

**Como** inversor,  
**Quiero** ver un informe y un vídeo semanal del proyecto,  
**Para** hacer seguimiento del estado real de mi inversión.

#### Descripción técnica detallada
Implementar una funcionalidad que permita a los inversores acceder a informes semanales y vídeos del avance de la obra. Los informes deben estar organizados cronológicamente, permitir visualización en la plataforma y mostrar información relevante. El vídeo debe ser seguro y accesible solo para inversores.

#### Campos y modelos de datos
- **Modelo `ProjectUpdate`**:
  - `id`: UUID (PK)
  - `project_id`: UUID (FK a Project)
  - `title`: string
  - `content`: text (en formato Markdown, incluirá las métricas y KPIs dentro del contenido)
  - `video_url`: string (opcional)
  - `update_date`: date
  - `created_by`: UUID (FK a User)
  - `created_at`: timestamp

## Historias adicionales del MVP

### 📱 HISTORIA 7 – Confirmación de correo electrónico (Must Have)

**Como** nuevo socio,  
**Quiero** confirmar mi correo electrónico tras el registro,  
**Para** verificar mi identidad y activar mi cuenta.

#### Descripción técnica detallada
Implementar un sistema de verificación de correo electrónico que envíe un enlace único de confirmación después del registro. El usuario debe confirmar su correo para activar completamente su cuenta, mejorando la seguridad del sistema y reduciendo cuentas falsas.

#### Campos y modelos de datos
- **Modelo `VerificationToken`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK a User)
  - `token`: string (token único de verificación)
  - `created_at`: timestamp
  - `expires_at`: timestamp (24 horas después de la creación)
  - `used`: boolean

- **Modelo `User`** (campos adicionales):
  - `email_verified`: boolean (por defecto false)
  - `email_verified_at`: timestamp (opcional)

#### Endpoints API
- **POST** `/api/auth/verify-email` - Verificar token de correo electrónico
  - Body: `{ token }`
  - Respuesta 200: `{ success: true, message: "Email verificado correctamente" }`
  - Respuesta 400: Token inválido o expirado

- **POST** `/api/auth/resend-verification` - Reenviar email de verificación
  - Respuesta 200: Email reenviado
  - Respuesta 429: Demasiadas solicitudes (rate limiting)

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/verificationToken.js` - Definir entidad VerificationToken
  - `backend/application/services/emailVerificationService.js` - Lógica de verificación
  - `backend/interfaces/controllers/authController.js` - Controlador para verificación
  - `backend/infrastructure/email/templates/verificationEmail.js` - Plantilla de email
  - `backend/prisma/schema.prisma` - Añadir modelo VerificationToken

- **Frontend**:
  - `frontend/pages/auth/verify-email/[token].js` - Página de verificación
  - `frontend/components/auth/VerificationStatus.jsx` - Componente de estado
  - `frontend/services/authService.js` - Métodos para verificación

#### Criterios de aceptación técnicos
1. El token de verificación debe ser único y criptográficamente seguro
2. El enlace de verificación debe expirar en 24 horas
3. Un usuario no verificado debe tener acceso limitado a la plataforma
4. El proceso debe manejar correctamente enlaces expirados o ya utilizados
5. Se debe implementar rate limiting para reenvío de correos (máximo 3 intentos/hora)

#### Tests unitarios requeridos
- Generación correcta de tokens de verificación
- Validación de tokens (válidos, expirados, ya utilizados)
- Proceso completo de verificación de correo
- Limitación de reintentos de verificación

#### Documentación a actualizar
- Actualizar docs/technical/auth.md con el flujo de verificación
- Documentar proceso en guía de usuario en docs/user/registration.md

#### Requisitos no funcionales
- **Seguridad**: Implementar protección contra ataques de fuerza bruta en verificación
- **Rendimiento**: El proceso de verificación debe completarse en <500ms
- **Usabilidad**: Mensajes claros sobre estado de verificación
- **Accesibilidad**: Página de verificación compatible con lectores de pantalla

### 🔑 HISTORIA 8 – Iniciar sesión como socio (Must Have)

**Como** socio registrado y verificado,  
**Quiero** poder iniciar sesión en la plataforma de forma segura,  
**Para** acceder a la zona privada del club de inversión.

#### Descripción técnica detallada
Implementar un sistema de autenticación seguro que permita a los socios registrados iniciar sesión utilizando su correo electrónico y contraseña. El sistema debe validar credenciales, utilizar JWT para gestionar sesiones, y proteger contra accesos no autorizados.

#### Campos y modelos de datos
- **Modelo `User`** (campos utilizados):
  - `email`: string (para identificación)
  - `password_hash`: string (contraseña encriptada)
  - `role_id`: UUID (define permisos)
  - `failed_login_attempts`: integer (por defecto 0)
  - `locked_until`: timestamp (opcional)

#### Endpoints API
- **POST** `/api/auth/login` - Iniciar sesión
  - Body: `{ email, password }`
  - Respuesta 200: `{ user: { id, name, role }, token: "JWT" }`
  - Respuesta 401: Credenciales inválidas
  - Respuesta 403: Cuenta bloqueada o no verificada

- **POST** `/api/auth/logout` - Cerrar sesión
  - Respuesta 200: Sesión finalizada

- **GET** `/api/auth/me` - Obtener datos del usuario actual
  - Respuesta 200: Datos del usuario autenticado
  - Respuesta 401: No autenticado

#### Archivos a modificar/crear
- **Backend**:
  - `backend/application/services/authenticationService.js` - Lógica de autenticación
  - `backend/infrastructure/auth/jwtService.js` - Servicio de tokens JWT
  - `backend/interfaces/controllers/authController.js` - Controlador de autenticación
  - `backend/middleware/authMiddleware.js` - Middleware de autenticación
  - `backend/prisma/schema.prisma` - Añadir modelo Session

- **Frontend**:
  - `frontend/pages/login.js` - Página de inicio de sesión
  - `frontend/components/auth/LoginForm.jsx` - Formulario de login
  - `frontend/contexts/AuthContext.jsx` - Contexto de autenticación
  - `frontend/hooks/useAuth.js` - Hook para gestión de autenticación
  - `frontend/services/authService.js` - Comunicación con API de autenticación

#### Criterios de aceptación técnicos
1. Implementar bloqueo temporal tras 5 intentos fallidos de login
2. El token JWT debe incluir rol y permisos del usuario
3. La sesión debe expirar después de 24 horas de inactividad
4. Almacenar historial de inicios de sesión para auditoría
5. Implementar CSRF protection en el proceso de login
6. Validar que el correo electrónico esté verificado antes de permitir login

#### Tests unitarios requeridos
- Validación correcta de credenciales
- Bloqueo tras múltiples intentos fallidos
- Generación y validación de tokens JWT
- Cierre de sesión y revocación de tokens

#### Documentación a actualizar
- Ampliar docs/technical/auth.md con flujo de autenticación
- Documentar política de seguridad en docs/security/authentication-policy.md

#### Requisitos no funcionales
- **Seguridad**: Implementar HTTPS, CSRF protection y rate limiting
- **Rendimiento**: Proceso de login <1s incluso con alta carga
- **Usabilidad**: Mensajes de error claros y específicos
- **Accesibilidad**: Formulario de login compatible con WCAG 2.1 nivel AA

### 💡 HISTORIA 9 – Marcar "Me Interesa" (Must Have)

**Como** socio del club,  
**Quiero** poder indicar que me interesa un proyecto de inversión,  
**Para** recibir más información y mostrar mi interés sin compromiso.

#### Descripción técnica detallada
Implementar una funcionalidad que permita a los socios marcar proyectos que les interesan, generando notificaciones al gestor y abriendo un canal de comunicación. A diferencia de "Invierto", esta acción no implica compromiso financiero inmediato.

#### Campos y modelos de datos
- **Modelo `Interest`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK a User)
  - `project_id`: UUID (FK a Project)
  - `created_at`: timestamp
  - `status`: enum ('active', 'converted', 'declined')
  - `notes`: text (opcional)

- **Modelo `Notification`** (campos adicionales):
  - Nuevo tipo: `'new_interest'`

#### Endpoints API
- **POST** `/api/projects/:id/interest` - Marcar interés en un proyecto
  - Body: `{ notes }`
  - Respuesta 201: Interés registrado
  - Respuesta 400: Ya existe interés activo

- **GET** `/api/users/me/interests` - Listar mis proyectos de interés
  - Respuesta 200: Array de intereses del usuario

- **DELETE** `/api/projects/:id/interest` - Eliminar interés en un proyecto
  - Respuesta 200: Interés eliminado
  - Respuesta 404: No existe interés

#### Archivos a modificar/crear
- **Backend**:
  - `backend/domain/entities/interest.js` - Definir entidad Interest
  - `backend/application/services/interestService.js` - Lógica de intereses
  - `backend/interfaces/controllers/interestController.js` - Controlador
  - `backend/interfaces/routes/interestRoutes.js` - Rutas de API
  - `backend/prisma/schema.prisma` - Añadir modelo Interest

- **Frontend**:
  - `frontend/components/projects/InterestButton.jsx` - Botón de interés
  - `frontend/pages/account/interests.js` - Página de mis intereses
  - `frontend/services/interestService.js` - Comunicación con API

#### Criterios de aceptación técnicos
1. Un usuario solo puede tener un interés activo por proyecto
2. Al marcar interés, notificar automáticamente al gestor del proyecto
3. Mostrar contador de interesados en la página del proyecto
4. Permitir al usuario ver todos sus proyectos de interés en un listado
5. Registrar métricas de conversión (interés → inversión)

#### Tests unitarios requeridos
- Creación y eliminación correcta de intereses
- Validación de duplicados
- Generación correcta de notificaciones
- Conversión de interés a inversión

#### Documentación a actualizar
- Crear docs/features/interest-flow.md con el proceso completo
- Actualizar docs/api/interests.md con los nuevos endpoints

#### Requisitos no funcionales
- **Experiencia**: Respuesta inmediata al marcar interés (<200ms)
- **Monitorización**: Registrar métricas de conversión para análisis
- **Mantenibilidad**: Código organizado para facilitar extensiones futuras
- **Escalabilidad**: Estructura optimizada para alto volumen de intereses

### 📊 HISTORIA 10 – Publicación de oportunidades de inversión (Must Have)

**Como** gestor del club,  
**Quiero** poder publicar nuevas oportunidades de inversión,  
**Para** ponerlas a disposición de los socios.

#### Descripción técnica detallada
Implementar un sistema que permita a los gestores crear, editar y publicar nuevos proyectos de inversión con toda su información asociada, incluyendo detalles económicos, ubicación, documentación y multimedia.

#### Campos y modelos de datos
- **Modelo `Project`** (campos adicionales):
  - `draft`: boolean (indica si es borrador)
  - `published_by`: UUID (FK a User, gestor que publica)
  - `published_at`: timestamp (cuándo se publicó)

- **Modelo `Role`** (para gestión de permisos):
  - `id`: UUID (PK)
  - `name`: string (nombres de roles: 'visitor', 'partner', 'investor', 'manager')
  - `description`: string (descripción del rol)
  - `created_at`: timestamp

#### Endpoints API
- **POST** `/api/projects` - Crear nuevo proyecto
  - Body: Datos completos del proyecto
  - Respuesta 201: Proyecto creado
  - Respuesta 400: Datos inválidos

- **PUT** `/api/projects/:id` - Actualizar proyecto existente
  - Body: Datos a actualizar
  - Respuesta 200: Proyecto actualizado
  - Respuesta 403: Sin permisos para editar

- **POST** `/api/projects/:id/publish` - Publicar proyecto
  - Respuesta 200: Proyecto publicado
  - Respuesta 400: Proyecto incompleto para publicación

- **POST** `/api/projects/:id/documents` - Subir documento
  - Multipart form con archivo y metadatos
  - Respuesta 201: Documento subido
  - Respuesta 400: Error en la subida

#### Archivos a modificar/crear
- **Backend**:
  - `backend/application/services/projectManagementService.js` - Lógica de gestión
  - `backend/infrastructure/storage/documentStorageService.js` - Almacenamiento
  - `backend/interfaces/controllers/projectManagementController.js` - Controlador
  - `backend/interfaces/routes/projectManagementRoutes.js` - Rutas API
  - `backend/middleware/roleMiddleware.js` - Verificación de roles

- **Frontend**:
  - `frontend/pages/admin/projects/index.js` - Listado de gestión
  - `frontend/pages/admin/projects/new.js` - Formulario de creación
  - `frontend/pages/admin/projects/[id]/edit.js` - Formulario de edición
  - `frontend/components/admin/ProjectForm.jsx` - Formulario de proyecto
  - `frontend/components/admin/DocumentUploader.jsx` - Componente de carga
  - `frontend/services/adminService.js` - Comunicación con API

#### Criterios de aceptación técnicos
1. Solo usuarios con rol 'manager' pueden crear/editar proyectos
2. Validar todos los campos obligatorios antes de permitir publicación
3. Soportar subida de múltiples archivos en diferentes formatos
4. Implementar guardado automático de borradores cada 2 minutos
5. Mantener historial de cambios para auditoría
6. Limitar tamaño de archivos según tipo (imágenes: 5MB, PDFs: 20MB, videos: 100MB)

#### Tests unitarios requeridos
- Creación y edición de proyectos con diferentes datos
- Validación de permisos por rol
- Subida de diferentes tipos de documentos
- Proceso completo de publicación

#### Documentación a actualizar
- Crear docs/admin/project-management.md con instrucciones detalladas
- Documentar formato de archivos aceptados en docs/technical/file-upload.md

#### Requisitos no funcionales
- **Seguridad**: Validar tipo y contenido de archivos subidos
- **Rendimiento**: Optimización de imágenes y compresión automática
- **Usabilidad**: Interfaz de administración intuitiva
- **Redundancia**: Copias de seguridad de todos los documentos

## 📋 Tabla Priorizada de Historias de Usuario según el Orden Lógico de Desarrollo

| # | ID | Historia breve | MoSCoW | Dependencias | Justificación |
|---|----|--------------------|---------|--------------|--------------|
| 1 | US01 | **Registro mediante invitación** | Must Have | — | Punto de entrada al sistema para nuevos socios |
| 2 | US07 | **Confirmación de correo electrónico** | Must Have | US01 | Garantiza emails válidos y mejora seguridad |
| 3 | US08 | **Iniciar sesión como socio** | Must Have | US01, US07 | Necesario para acceder a funcionalidades privadas |
| 4 | US10 | **Publicación de oportunidades (gestor)** | Must Have | US08 | Los gestores deben poder crear proyectos antes de que se puedan visualizar |
| 5 | US02 | **Ver oportunidades de inversión** | Must Have | US08, US10 | Requiere autenticación y que existan proyectos para ver |
| 6 | US09 | **Marcar "Me Interesa"** | Must Have | US02 | El socio debe ver los proyectos para poder marcar interés |
| 7 | US03 | **Marcar "Invierto" y monto** | Must Have | US02 | El socio debe ver los proyectos para poder invertir |
| 8 | US04 | **Ver documentos legales sin descarga** | Should Have | US03 | Principalmente útil para inversores |
| 9 | US05 | **Comunicación gestor ↔ socio** | Should Have | US09 | Se activa tras expresar interés en un proyecto |
| 10 | US06 | **Ver informes y vídeo semanal** | Could Have | US03 | Seguimiento para inversores existentes |
| 11 | US12 | **Subida de informes semanales** | Should Have | US10 | Permite a gestores mantener informados a inversores |
| 12 | US13 | **Notificaciones internas** | Should Have | US03, US06 | Mejora comunicación sobre actualizaciones |
| 13 | US14 | **Alertar sobre socios inactivos** | Could Have | US09, US03 | Gestión avanzada del club, no esencial |

### Notas sobre el orden de desarrollo

- **Grupo 1 (Acceso)**: Las historias US01, US07 y US08 forman el bloque de autenticación y debe implementarse primero.
- **Grupo 2 (Creación de contenido)**: US10 es un prerrequisito lógico para US02, ya que no se pueden visualizar proyectos si no existen.
- **Grupo 3 (Interacción básica)**: US02, US09 y US03 permiten a los socios ver e interactuar con las oportunidades.
- **Grupo 4 (Funcionalidades avanzadas)**: Las demás historias agregan valor pero no son esenciales para el flujo básico.

## 🧱 MVP Backlog – Plataforma de Inversión Inmobiliaria

### 🎯 Must Have

- [ ] **US01**: Como usuario invitado, quiero registrarme mediante una invitación exclusiva para acceder al área privada
- [ ] **US07**: Como nuevo socio, quiero confirmar mi correo electrónico tras el registro para verificar mi identidad
- [ ] **US08**: Como socio, quiero poder iniciar sesión para acceder a la zona privada
- [ ] **US10**: Como gestor, quiero publicar nuevas oportunidades de inversión para ponerlas a disposición de los socios
- [ ] **US02**: Como socio, quiero ver las oportunidades de inversión disponibles para evaluar si deseo invertir
- [ ] **US09**: Como socio, quiero indicar que una inversión me interesa para abrir contacto con el gestor
- [ ] **US03**: Como socio, quiero poder confirmar que deseo invertir e indicar el monto para comprometerme con el proyecto
- [ ] **US04**: Como inversor, quiero consultar documentos legales sin poder descargarlos para proteger la confidencialidad

### 🟡 Should Have

- [ ] **US05**: Como gestor o socio, quiero poder comunicarme dentro de la plataforma para resolver dudas
- [ ] **US12**: Como gestor, quiero subir informes semanales para mantener informados a los inversores
- [ ] **US13**: Como socio, quiero recibir notificaciones para estar al día de las novedades
- [ ] **US06**: Como socio, quiero ver el porcentaje de inversión comprometida en cada proyecto para decidir cuándo invertir

### ⚪ Could Have

- [ ] **US14**: Como gestor, quiero recibir alertas sobre socios inactivos para valorar su permanencia en el club
