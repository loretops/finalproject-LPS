# Tickets para Historia de Usuario 1 - Registro mediante invitación

## Ticket #1: Implementar Login en la plataforma

**Título:** Implementar sistema de autenticación básico

**Descripción:** Crear un sistema de login básico para que los gestores puedan acceder a la plataforma y crear invitaciones. Esta funcionalidad es necesaria para probar el flujo completo de invitación y registro.

**Criterios de Aceptación:**
- Formulario de login funcional con campos de email y contraseña
- Validación de credenciales contra la base de datos
- Generación de token JWT para mantener la sesión
- Protección de rutas privadas
- Manejo de errores de autenticación con mensajes claros

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Full-Stack

**Etiquetas:** Backend, Frontend, Seguridad, MVP

**Tareas:**
1. Crear endpoint de autenticación en el backend
2. Implementar servicio de generación y validación de JWT
3. Desarrollar formulario de login en el frontend
4. Implementar almacenamiento seguro del token en el cliente
5. Crear sistema de protección de rutas
6. Implementar cierre de sesión
7. Añadir tests para verificar el funcionamiento

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Variables de entorno necesarias](../technical/env-example.md)

## Ticket #2: Servicios de autenticación en Frontend

**Título:** Implementar servicios de autenticación en Frontend

**Descripción:** Crear los servicios de frontend que gestionarán la comunicación con la API para el registro de nuevos socios y el almacenamiento seguro de información de autenticación.

**Criterios de Aceptación:**
- Se crea un servicio que comunica con todos los endpoints de autenticación
- Gestiona correctamente el almacenamiento del token JWT
- Maneja errores de forma consistente
- Implementa interceptores para agregar headers de autenticación
- Proporciona métodos para verificar el estado de autenticación

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Seguridad, MVP

**Tareas:**
1. Crear servicio de autenticación
2. Implementar métodos para registro, login, logout
3. Desarrollar almacenamiento seguro del token JWT
4. Implementar interceptores para requests autenticados
5. Crear helpers para verificar estado de login
6. Implementar manejo de errores HTTP

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Variables de entorno necesarias](../technical/env-example.md)

## Ticket #3: Configuración y modelo para invitaciones

**Título:** Implementar modelo de datos para invitaciones y migrations

**Descripción:** Crear el modelo de datos para gestionar invitaciones de usuarios al club. Implementar la estructura de base de datos que almacene tokens de invitación, estados, fechas de expiración y relaciones con usuarios.

**Criterios de Aceptación:**
- El modelo Invitation tiene todos los campos requeridos (id, email, token, status, invited_by, created_at, expires_at)
- Se han creado las migraciones de Prisma correctamente
- Los tipos de datos son apropiados (UUID para IDs, enum para status, etc.)
- Las relaciones entre modelos están correctamente definidas
- Se ha implementado la expiración automática (7 días por defecto)

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Base de datos, Prisma, MVP

**Tareas:**
1. Actualizar el esquema Prisma con el modelo Invitation
2. Definir relaciones con el modelo User
3. Crear enumeraciones para estados (pending, used, expired)
4. Generar migraciones
5. Implementar índices para búsquedas eficientes por email y token
6. Ejecutar migraciones en entorno de desarrollo

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Variables de entorno para base de datos](../technical/env-example.md)

## Ticket #4: Servicio de gestión de invitaciones

**Título:** Implementar servicio de invitaciones

**Descripción:** Crear los servicios de backend para gestionar el ciclo de vida completo de las invitaciones: generación, validación, expiración y uso. (Nota: Incluye la lógica para *crear* una invitación, que será usada por la UI del gestor).

**Criterios de Aceptación:**
- Se genera correctamente un token único y criptográficamente seguro
- Se puede verificar si un token es válido o ha expirado
- Se gestiona correctamente la actualización de estado (usado, expirado)
- Se implementa la lógica para asegurar que solo hay una invitación activa por email
- Se registra toda la información necesaria (quién invitó, cuándo, etc.)
- Incluye una función para *crear* una nueva invitación asociada a un email y al gestor que invita.

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Seguridad, MVP

**Tareas:**
1. Crear servicio para generar tokens seguros
2. Implementar verificación de tokens
3. Desarrollar lógica de expiración automática
4. Validar unicidad de invitación por email
5. Implementar función para marcar token como usado después del registro
6. Implementar función para crear una nueva invitación en la base de datos.
7. Agregar tests unitarios

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #5: Sistema de envío de emails para invitaciones

**Título:** Implementar servicio de envío de emails para invitaciones

**Descripción:** Crear un sistema para enviar emails de invitación a los potenciales socios. El email debe contener el enlace con el token de invitación y los pasos a seguir para completar el registro.

**Criterios de Aceptación:**
- El servicio puede enviar emails usando un proveedor SMTP configurado en variables de entorno
- El contenido del email es en formato HTML con diseño profesional
- Se incluye un enlace con el token de invitación que dirige al formulario de registro
- Se registra en base de datos el estado del envío del email
- Se implementa sistema de reintento en caso de fallos
- Se pueden personalizar las plantillas de email

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Email, MVP

**Tareas:**
1. Configurar servicio de envío de emails (Nodemailer u otro similar)
2. Crear plantilla HTML para el email de invitación
3. Implementar función para generar enlaces con tokens
4. Desarrollar lógica de seguimiento y reintento de envíos
5. Conectar con el servicio de invitaciones (para obtener token y email)
6. Añadir variables de entorno necesarias para la configuración SMTP
7. Implementar tests para verificar el servicio

**Enlaces:**
- [Configuración de email en variables de entorno](../technical/env-example.md)
- [Guía de configuración del entorno](../technical/setup.md)

## Ticket #6: Implementar interfaz para crear y enviar invitaciones

**Título:** Crear interfaz para gestión de invitaciones

**Descripción:** Implementar una interfaz para que los gestores puedan crear y enviar invitaciones a nuevos potenciales socios. Esta función es necesaria para iniciar el proceso de registro mediante invitación.

**Criterios de Aceptación:**
- Interfaz para crear nuevas invitaciones con campo de email
- Validación del formato de email
- Confirmación visual cuando la invitación se envía correctamente
- Listado de invitaciones enviadas con su estado (pendiente, usada, expirada)
- Opción para reenviar invitaciones si han expirado
- Limitación de acceso solo a usuarios con rol de gestor

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Diseñar interfaz para crear invitaciones
2. Implementar formulario con validación
3. Crear componente para mostrar listado de invitaciones
4. Conectar con endpoints de API para crear/reenviar invitaciones (Nota: requiere crear API para crear/reenviar primero o en paralelo).
5. Implementar filtros y búsqueda para el listado
6. Añadir protección de acceso basada en roles
7. Realizar pruebas de usabilidad

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #7: API Endpoints para verificación de invitaciones

**Título:** Implementar endpoints API para validar invitaciones

**Descripción:** Crear los endpoints de la API que permitirán verificar la validez de un token de invitación antes de mostrar el formulario de registro.

**Criterios de Aceptación:**
- El endpoint GET `/api/auth/invitation/:token` responde con el estado del token
- Tokens válidos retornan status 200 con información relevante
- Tokens inválidos o expirados retornan respuestas apropiadas (400/404)
- Se implementa rate limiting para prevenir ataques de fuerza bruta
- La respuesta incluye información sobre el email asociado al token

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, Seguridad, MVP

**Tareas:**
1. Crear controlador para verificación de invitaciones
2. Implementar validación y sanitización de parámetros
3. Conectar con el servicio de invitaciones (Ticket #4)
4. Implementar middleware de rate limiting
5. Documentar respuestas de la API
6. Crear tests para verificar comportamiento del endpoint

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Variables de entorno necesarias](../technical/env-example.md)

## Ticket #8: API Endpoints para registro de usuarios

**Título:** Implementar endpoint API para registro mediante invitación

**Descripción:** Crear el endpoint de la API que procesará el registro de nuevos socios que posean un token de invitación válido.

**Criterios de Aceptación:**
- El endpoint POST `/api/auth/register` procesa correctamente los datos de registro
- Valida el token de invitación antes de permitir el registro
- Marca el token como utilizado tras un registro exitoso
- Asigna el rol 'partner' automáticamente
- Encripta la contraseña de forma segura
- Valida todos los campos del formulario

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, Seguridad, MVP

**Tareas:**
1. Crear controlador para registro de usuarios
2. Implementar validación y sanitización del formulario
3. Conectar con servicios de autenticación y de invitaciones (Ticket #4)
4. Desarrollar lógica para marcar invitación como usada
5. Implementar asignación automática de rol
6. Crear tests para verificar proceso de registro
7. Implementar protección contra ataques de inyección y XSS
8. Considerar rate limiting en este endpoint también.

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #9: Página de validación de invitación

**Título:** Implementar página para validar tokens de invitación

**Descripción:** Crear la página frontend que validará el token de invitación y mostrará un mensaje apropiado, antes de redirigir al formulario de registro.

**Criterios de Aceptación:**
- La página `/invitation/[token]` carga y valida el token
- Muestra mensajes de error apropiados para tokens inválidos/expirados
- Muestra un mensaje de bienvenida personalizado para tokens válidos
- Redirige al formulario de registro si el token es válido
- Tiene un diseño responsivo acorde con la identidad de la marca
- Maneja correctamente estados de carga

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente de página para la validación de invitación
2. Implementar llamada a la API para verificar token (Ticket #7)
3. Crear estados visuales para diferentes respuestas (válido, inválido, expirado)
4. Implementar redirección al formulario de registro
5. Diseñar interfaz acorde a la identidad visual
6. Asegurar que es responsive para dispositivos móviles
7. Implementar mensajes de error claros

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #10: Formulario de registro para nuevos socios

**Título:** Implementar formulario de registro para nuevos socios

**Descripción:** Crear el formulario de registro que usarán los nuevos socios para crear su cuenta después de recibir una invitación válida.

**Criterios de Aceptación:**
- El formulario captura nombre (**firstName**), apellidos (**lastName**), email, contraseña y confirmación
- Valida que la contraseña cumpla los requisitos de seguridad
- Muestra feedback en tiempo real sobre la fortaleza de la contraseña
- El email viene precargado y no es editable si viene de un token válido
- Envía correctamente los datos al endpoint de registro (Ticket #8)
- Maneja errores de validación con mensajes claros
- Redirige a página de confirmación tras registro exitoso
- Los campos **firstName** y **lastName** son obligatorios.

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, Seguridad, MVP

**Tareas:**
1. Crear componente de formulario con todos los campos necesarios (**firstName, lastName**, email, password, confirmPassword)
2. Implementar validación del lado del cliente
3. Conectar con API para envío de datos (usando servicio de Ticket #2)
4. Desarrollar indicador de fortaleza de contraseña
5. Implementar manejo de errores y mensajes de validación
6. Asegurar accesibilidad (WCAG 2.1 nivel AA)
7. Hacer pruebas de usabilidad en diferentes dispositivos
8. Asegurar que el campo email esté pre-rellenado y deshabilitado cuando corresponda.

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #11: Página de confirmación post-registro

**Título:** Implementar página de confirmación tras registro exitoso

**Descripción:** Crear una página que se mostrará después de un registro exitoso, informando al usuario que debe verificar su correo electrónico.

**Criterios de Aceptación:**
- Muestra mensaje claro sobre la necesidad de verificar email
- Incluye instrucciones sobre cómo verificar la cuenta
- Tiene opción para reenviar email de verificación (requiere API adicional)
- Diseño consistente con la identidad de marca
- Ofrece enlace para ir a la página de login

**Prioridad:** Media

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente para la página de confirmación
2. Implementar interfaz según diseño aprobado
3. Agregar funcionalidad para reenvío de email (conectar a API correspondiente)
4. Asegurar que sea responsive para todos los dispositivos
5. Implementar animaciones sutiles para mejor UX

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

# Tickets para Historia de Usuario 10 - Publicación de oportunidades de inversión

## Ticket #12: Verificación de roles y permisos

**Título:** Implementar sistema de verificación de roles para gestores

**Descripción:** Crear un middleware que verifique que el usuario tiene rol de gestor antes de permitir acceso a las funcionalidades de gestión de proyectos de inversión.

**Criterios de Aceptación:**
- El middleware verifica correctamente si el usuario tiene rol 'manager'
- Bloquea acceso a usuarios con roles insuficientes (403 Forbidden)
- Se integra con el sistema de autenticación existente
- Puede usarse de forma selectiva en rutas específicas
- Proporciona mensajes de error claros

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Seguridad, MVP

**Tareas:**
1. Crear middleware de verificación de roles
2. Integrar con el flujo de autenticación existente
3. Implementar función de verificación de acceso
4. Configurar respuestas de error apropiadas
5. Crear tests unitarios para verificar funcionamiento
6. Documentar uso del middleware

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #13: Modelo de datos para gestión de proyectos

**Título:** Implementar modelo de datos para proyectos de inversión

**Descripción:** Extender los modelos existentes y crear nuevos modelos en Prisma para soportar la creación y gestión de proyectos de inversión inmobiliaria.

**Criterios de Aceptación:**
- El modelo Project contiene todos los campos requeridos (id, title, description, status, minimum_investment, target_amount, current_amount, expected_roi, location, property_type, draft, published_at, created_by, published_by, created_at)
- El modelo ProjectDocument soporta diferentes tipos de archivos y niveles de acceso
- Se establecen las relaciones correctas entre tablas
- Se generan migraciones de Prisma funcionales
- Se implementan índices para consultas eficientes

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Base de datos, Prisma, MVP

**Tareas:**
1. Actualizar/confirmar el esquema Prisma con los modelos Project y ProjectDocument
2. Definir relaciones entre modelos (User → Project, Project → ProjectDocument)
3. Crear enumeraciones para estados del proyecto y tipos de documentos
4. Generar migraciones
5. Implementar índices para búsquedas eficientes
6. Ejecutar migraciones en entorno de desarrollo
7. Verificar integridad referencial

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #14: Servicio de almacenamiento de documentos

**Título:** Implementar servicio de almacenamiento de documentos para proyectos

**Descripción:** Crear un servicio que gestione el almacenamiento seguro de documentos (archivos PDF, imágenes, videos) asociados a las oportunidades de inversión.

**Criterios de Aceptación:**
- Se pueden subir archivos de diferentes tipos (PDF, imágenes, videos)
- Los archivos se almacenan de forma segura (ya sea local o en servicio cloud)
- Se genera un URL accesible para cada archivo
- Se valida el tipo y tamaño de archivos
- Se optimizan las imágenes automáticamente
- Se limita el tamaño de archivos según configuración

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Almacenamiento, Seguridad, MVP

**Tareas:**
1. Configurar servicio de almacenamiento (local para desarrollo, cloud para producción)
2. Implementar validación de tipos y tamaños de archivos
3. Crear función para procesar y optimizar imágenes
4. Desarrollar sistema de nomenclatura segura para archivos
5. Implementar generación de URLs seguros
6. Crear sistema de gestión de permisos de acceso
7. Integrar con modelo ProjectDocument

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #15: API Endpoints para creación y gestión de proyectos

**Título:** Implementar endpoints API para gestión de proyectos

**Descripción:** Crear los endpoints de la API que permitirán a los gestores crear, modificar, publicar y gestionar oportunidades de inversión.

**Criterios de Aceptación:**
- El endpoint POST `/api/projects` permite crear proyectos
- El endpoint PUT `/api/projects/:id` permite actualizar proyectos
- El endpoint POST `/api/projects/:id/publish` permite publicar un proyecto
- El endpoint POST `/api/projects/:id/documents` permite subir documentos
- Solo usuarios con rol 'manager' pueden acceder a estos endpoints
- Se validan todos los datos de entrada
- Se implementan respuestas adecuadas para todos los escenarios

**Prioridad:** Alta

**Estimación:** 8 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, MVP

**Tareas:**
1. Crear controlador para gestión de proyectos
2. Implementar endpoint de creación de proyectos
3. Implementar endpoint de actualización de proyectos
4. Implementar endpoint de publicación de proyectos
5. Implementar endpoint para subida de documentos
6. Integrar con servicio de almacenamiento (Ticket #14)
7. Implementar validación de datos de entrada
8. Aplicar middleware de verificación de roles (Ticket #12)
9. Documentar endpoints
10. Crear tests para verificar funcionamiento

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #16: Interfaz de administración de proyectos (listado)

**Título:** Implementar listado de proyectos para gestores

**Descripción:** Crear la interfaz que permitirá a los gestores ver, filtrar y acceder a todos los proyectos en el sistema, tanto en borrador como publicados.

**Criterios de Aceptación:**
- Muestra listado de todos los proyectos con información clave
- Permite filtrar por estado (borrador, publicado, cerrado)
- Incluye opciones para crear nuevo proyecto, editar o eliminar existentes
- Solo es accesible para usuarios con rol de gestor
- Implementa paginación para manejar muchos proyectos
- Tiene un diseño responsivo y usable

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear página para listado de proyectos en área de administración
2. Implementar componente de tabla con filtros y paginación
3. Integrar con API para obtener listado de proyectos
4. Implementar controles para acciones (crear, editar, eliminar)
5. Diseñar indicadores visuales de estado
6. Asegurar protección de la ruta para solo gestores
7. Implementar búsqueda y ordenación
8. Realizar pruebas de usabilidad

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #17: Formulario de creación/edición de proyectos

**Título:** Implementar formulario para creación y edición de proyectos

**Descripción:** Crear la interfaz que permitirá a los gestores introducir toda la información necesaria para un nuevo proyecto de inversión o editar uno existente.

**Criterios de Aceptación:**
- El formulario incluye todos los campos necesarios (título, descripción, inversión mínima, objetivo, rentabilidad esperada, ubicación, tipo)
- Valida todos los campos antes de enviar
- Permite guardar como borrador
- Muestra feedback visual durante el proceso de guardado
- Funciona tanto para creación como para edición
- Implementa auto-guardado para evitar pérdida de información

**Prioridad:** Alta

**Estimación:** 8 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Diseñar layout del formulario
2. Implementar validación de todos los campos
3. Crear componentes reutilizables para cada sección
4. Integrar con API para enviar datos
5. Implementar lógica de guardado automático
6. Desarrollar sistema de feedback visual (éxito, error)
7. Implementar vista previa de proyecto
8. Asegurar accesibilidad (WCAG 2.1 nivel AA)
9. Realizar pruebas de usabilidad

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #18: Componente de gestión de documentos del proyecto

**Título:** Implementar componente para gestión de documentos del proyecto

**Descripción:** Crear un componente que permita a los gestores subir, categorizar y gestionar documentos asociados a un proyecto de inversión.

**Criterios de Aceptación:**
- Permite subir múltiples tipos de documentos (PDF, imágenes, videos)
- Clasifica documentos por tipo (legal, económico, técnico, imagen, video)
- Asigna nivel de acceso a cada documento (público, socio, inversor)
- Muestra progreso de carga de archivos
- Permite eliminar o reemplazar documentos existentes
- Valida tamaño y formato de archivos según configuración

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Diseñar interfaz para subida y gestión de documentos
2. Implementar componente de drag & drop para archivos
3. Crear selector de tipo de documento y nivel de acceso
4. Integrar con API para subida de documentos
5. Implementar barra de progreso de carga
6. Desarrollar funcionalidad de previsualización de documentos
7. Implementar validación de archivos (tipo, tamaño)
8. Realizar pruebas de usabilidad

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

## Ticket #19: Página de publicación y vista previa del proyecto

**Título:** Implementar funcionalidad de publicación con vista previa

**Descripción:** Crear la interfaz que permitirá al gestor revisar toda la información del proyecto antes de publicarlo, y completar el proceso de publicación.

**Criterios de Aceptación:**
- Muestra vista previa de cómo verán el proyecto los socios
- Verifica que todos los campos obligatorios están completos
- Indica claramente cualquier información faltante
- Permite publicar el proyecto si cumple todos los requisitos
- Muestra confirmación clara del estado de publicación
- Registra quién publicó el proyecto y cuándo

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Diseñar interfaz de vista previa del proyecto
2. Implementar validación de campos obligatorios
3. Crear componente de checklist de requisitos
4. Integrar con API para publicación
5. Desarrollar modal de confirmación
6. Implementar notificaciones de éxito/error
7. Crear sistema de redirección post-publicación

**Enlaces:**
- [Configuración del entorno](../technical/setup.md)
- [Historias de usuario](../product/user-stories.md)

# Tickets para Historia de Usuario 2 - Ver oportunidades de inversión

## Ticket #20: API endpoints para listar y filtrar proyectos públicos

**Título:** Implementar endpoints API para listar y filtrar proyectos publicados

**Descripción:** Crear los endpoints de la API que permitirán a los socios ver un listado paginado de todos los proyectos de inversión publicados, con capacidad de filtrado y ordenación. Estos endpoints deben estar protegidos para ser accesibles solo por usuarios autenticados con rol de socio (partner) o superior.

**Criterios de Aceptación:**
- El endpoint GET `/api/projects/public` devuelve proyectos publicados para socios
- Implementa filtrado por múltiples criterios (status, propertyType, minRoi, location)
- Implementa paginación con parámetros page y limit
- Implementa ordenación por diferentes campos con parámetros sortField y sortDirection
- Solo usuarios autenticados con rol 'partner' o superior pueden acceder a estos endpoints
- Devuelve metadatos de paginación (totalItems, totalPages, currentPage)
- La respuesta incluye solo los datos básicos necesarios para el listado
- Se implementan medidas de protección contra ataques (rate limiting, validación de parámetros)

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, MVP

**Tareas:**
1. Modificar el repositorio de proyectos para filtrar solo proyectos publicados
2. Implementar controlador de API para el listado público de proyectos
3. Configurar rutas y middleware de autorización
4. Validar parámetros de consulta (filtros, paginación, ordenación)
5. Optimizar consultas a la base de datos para mejor rendimiento
6. Implementar transformador de datos para adecuar el formato de respuesta
7. Documentar el endpoint en la documentación de API
8. Escribir tests para verificar comportamiento y seguridad

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Implementación de autenticación](../technical/auth.md)
- [Modelo de datos existente](../technical/database.md)

## Ticket #21: API endpoints para detalle de un proyecto

**Título:** Implementar endpoint API para detalle completo de un proyecto

**Descripción:** Crear el endpoint de la API que mostrará todos los detalles de un proyecto específico, incluyendo su información completa, documentos asociados y estadísticas relevantes. Este endpoint debe estar protegido y accesible solo para socios.

**Criterios de Aceptación:**
- El endpoint GET `/api/projects/public/:id` devuelve información detallada de un proyecto
- El proyecto debe estar en estado 'published' para ser accesible
- La respuesta incluye todos los datos relevantes del proyecto, incluyendo datos económicos y ubicación
- La respuesta incluye listado de documentos asociados filtrados por nivel de acceso
- Se verifica que el usuario tenga permisos suficientes para ver el proyecto
- Se implementa un registro de vistas para análisis de interés
- Se manejan adecuadamente los casos de error (proyecto no existente, no publicado, sin permisos)

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, MVP

**Tareas:**
1. Implementar el controlador para el endpoint de detalle de proyecto
2. Configurar ruta y middleware de autorización
3. Integrar con el servicio de proyectos existente
4. Implementar filtrado de documentos según nivel de acceso del usuario
5. Crear transformador de datos para formatear la respuesta
6. Implementar registro de vistas de proyectos
7. Manejar correctamente todos los casos de error
8. Crear tests para verificar comportamiento y seguridad

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Modelo de datos de proyectos](../technical/database.md)
- [Gestión de permisos](../technical/permissions.md)

## Ticket #22: Servicio frontend para consumo de API de proyectos públicos

**Título:** Implementar servicio frontend para gestión de proyectos públicos

**Descripción:** Crear un servicio en el frontend que maneje toda la comunicación con la API para obtener y filtrar proyectos publicados, gestionar la paginación y el estado de la aplicación relacionado con estos datos.

**Criterios de Aceptación:**
- Se implementa un servicio que comunica con los endpoints de proyectos públicos
- Provee métodos para listar proyectos con filtros y paginación
- Provee método para obtener detalle completo de un proyecto
- Implementa el manejo de errores HTTP
- Incluye tipos TypeScript para mejor desarrollo
- Proporciona funciones para transformar datos entre formatos de API y frontend
- Utiliza interceptores para agregar headers de autenticación
- Implementa caché básica para mejorar rendimiento

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Servicios, MVP

**Tareas:**
1. Crear archivo de servicio para proyectos públicos
2. Implementar métodos para listar proyectos con filtros
3. Implementar método para obtener detalle de un proyecto específico
4. Crear interfaces TypeScript para los tipos de datos
5. Implementar transformadores de datos para normalización
6. Configurar interceptores HTTP para autenticación automática
7. Implementar manejo centralizado de errores
8. Configurar caché básica para respuestas frecuentes
9. Escribir tests para el servicio

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de servicios frontend](../technical/frontend-services.md)
- [Configuración de axios](../technical/http-client.md)

## Ticket #23: Página de listado de proyectos para socios

**Título:** Implementar página de listado de proyectos para socios

**Descripción:** Crear la página que mostrará a los socios todas las oportunidades de inversión disponibles, con opciones de filtrado, ordenación y paginación. Esta página debe ofrecer una experiencia de usuario óptima con una representación visual clara de cada proyecto.

**Criterios de Aceptación:**
- Se implementa la página en `/projects` accesible solo para socios autenticados
- Muestra un listado paginado de proyectos con diseño en cuadrícula (grid)
- Cada proyecto se muestra como una tarjeta con información clave
- Implementa filtros por tipo de propiedad, ubicación, ROI mínimo
- Permite ordenar por diferentes criterios (fecha, ROI, monto)
- Muestra indicadores visuales del estado de financiación de cada proyecto
- Ofrece paginación intuitiva
- Implementa estados de carga, vacío y error
- Diseño completamente responsive para todas las pantallas

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente de página para el listado
2. Implementar componente de tarjeta para cada proyecto
3. Desarrollar componentes de filtros y ordenación
4. Integrar con el servicio de proyectos (Ticket #22)
5. Implementar gestión de estado con React hooks
6. Crear componente de paginación
7. Manejar todos los estados de la UI (carga, vacío, error)
8. Implementar persistencia de filtros en URL o localStorage
9. Optimizar rendimiento de renderizado
10. Garantizar accesibilidad (WCAG 2.1 nivel AA)
11. Realizar tests de componentes y pruebas de integración

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de estilos](../technical/style-guide.md)
- [Componentes UI existentes](../technical/ui-components.md)

## Ticket #24: Componente de tarjeta de proyecto

**Título:** Implementar componente reutilizable de tarjeta de proyecto

**Descripción:** Crear un componente de tarjeta reutilizable para mostrar información resumida de un proyecto de inversión, que se utilizará tanto en el listado general como en otras partes de la aplicación que necesiten mostrar proyectos.

**Criterios de Aceptación:**
- El componente muestra la información clave del proyecto (título, ROI, ubicación, monto)
- Incluye una imagen principal del proyecto con fallback predeterminado
- Muestra indicador visual del estado de financiación (porcentaje financiado)
- Implementa diferentes variantes (tamaño completo, compacto)
- Incluye acciones contextuales (ver detalle, marcar interés)
- Es completamente responsive y adaptable a diferentes contenedores
- Sigue el diseño visual establecido para la aplicación
- Mantiene coherencia con los componentes UI existentes
- Implementa optimizaciones para carga de imágenes

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Componentes, UI/UX, MVP

**Tareas:**
1. Crear componente ProjectCard con todas las propiedades necesarias
2. Implementar las diferentes variantes del componente
3. Desarrollar la lógica de presentación de información clave
4. Crear indicador de progreso de financiación
5. Integrar con componentes UI existentes (Button, Card)
6. Implementar optimización de imágenes (lazy loading, placeholders)
7. Garantizar accesibilidad del componente
8. Documentar el componente y sus variantes
9. Crear tests para verificar el comportamiento del componente

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de componentes](../technical/component-guide.md)
- [Biblioteca de componentes UI](../technical/ui-components.md)

## Ticket #25: Componentes de filtrado y ordenación

**Título:** Implementar componentes para filtrado y ordenación de proyectos

**Descripción:** Crear componentes reutilizables para permitir a los usuarios filtrar y ordenar los proyectos según diferentes criterios, mejorando así la experiencia de búsqueda y exploración de oportunidades de inversión.

**Criterios de Aceptación:**
- Se implementa un componente de filtros con múltiples criterios (tipo, ubicación, ROI)
- Se implementa un componente de ordenación con diferentes campos
- Los componentes son responsive y se adaptan a móvil/desktop
- Los filtros aplicados se muestran claramente al usuario
- Permite borrar filtros individualmente o todos a la vez
- Persiste los filtros seleccionados en la URL para permitir compartir/guardar búsquedas
- Implementa validación para rangos de valores (mínimo, máximo)
- Proporciona retroalimentación visual al aplicar filtros/ordenación

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Componentes, UI/UX, MVP

**Tareas:**
1. Crear componente ProjectFilters con todos los filtros necesarios
2. Implementar componente ProjectSorting para ordenación
3. Desarrollar lógica para aplicar/eliminar filtros
4. Integrar con componentes UI existentes (Input, Button, Select)
5. Implementar persistencia de filtros en URL
6. Crear componente de "chips" para mostrar filtros activos
7. Implementar diseño responsive con adaptación a diferentes dispositivos
8. Garantizar accesibilidad de los componentes
9. Crear tests para los componentes

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de UX para filtros](../technical/ux-patterns.md)
- [Implementación de query params](../technical/routing.md)

## Ticket #26: Página de detalle de proyecto para socios

**Título:** Implementar página de detalle de proyecto para socios

**Descripción:** Crear la página que mostrará a los socios todos los detalles de una oportunidad de inversión específica, incluyendo información completa, documentos, imágenes y estadísticas, además de proveer funcionalidades para indicar interés o invertir.

**Criterios de Aceptación:**
- Implementa la página en `/projects/:id` accesible solo para socios autenticados
- Muestra información completa del proyecto (descripción, datos económicos, ubicación)
- Incluye galería de imágenes del proyecto con visor optimizado
- Muestra documentos disponibles según nivel de acceso del usuario
- Implementa visualización de datos financieros con gráficos donde sea relevante
- Incluye sección de progreso de financiación con datos actualizados
- Proporciona acciones claras para "Me interesa" e "Invierto"
- Implementa breadcrumbs para navegación
- Diseño completamente responsive para todas las pantallas
- Optimiza carga progresiva de contenido

**Prioridad:** Alta

**Estimación:** 8 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente de página para el detalle del proyecto
2. Implementar secciones principales (información general, financiera, documentos)
3. Desarrollar componente de galería de imágenes
4. Crear visualización de documentos según tipo
5. Implementar gráficos para datos financieros (opcional para MVP)
6. Desarrollar componente de progreso de financiación
7. Integrar con el servicio de proyectos (Ticket #22)
8. Implementar acciones "Me interesa" e "Invierto" (placeholder para futuras HU)
9. Optimizar carga de recursos (imágenes, documentos)
10. Garantizar accesibilidad (WCAG 2.1 nivel AA)
11. Crear tests de componentes y pruebas de integración

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de estilos](../technical/style-guide.md)
- [Implementación de galerías](../technical/media-components.md)

## Ticket #27: Componente visor de galería de imágenes

**Título:** Implementar componente visor de galería de imágenes

**Descripción:** Crear un componente de galería de imágenes optimizado para mostrar fotografías de los proyectos, con capacidad de visualización en pantalla completa, zoom y navegación intuitiva.

**Criterios de Aceptación:**
- El componente muestra múltiples imágenes en formato galería
- Permite expandir imágenes a tamaño completo en un modal
- Implementa navegación entre imágenes (anterior/siguiente)
- Ofrece funcionalidad de zoom para examinar detalles
- Optimiza la carga de imágenes (lazy loading, placeholders)
- Es completamente responsive y funciona en móvil/tablet/desktop
- Incluye gestos táctiles para dispositivos móviles
- Implementa teclas de acceso rápido para navegación por teclado
- Mantiene coherencia con el diseño visual de la aplicación

**Prioridad:** Media

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Componentes, UI/UX, MVP

**Tareas:**
1. Investigar y seleccionar una biblioteca de galerías compatible con React
2. Implementar componente ImageGallery envolviendo la biblioteca seleccionada
3. Desarrollar modo de visualización en miniatura y modo pantalla completa
4. Implementar controles de navegación y zoom
5. Configurar optimización de imágenes y lazy loading
6. Añadir soporte para gestos táctiles
7. Implementar navegación por teclado
8. Estilizar el componente según la guía de diseño
9. Garantizar accesibilidad del componente
10. Crear tests para el componente

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Guía de componentes](../technical/component-guide.md)
- [Optimización de imágenes](../technical/asset-optimization.md)

## Ticket #28: Componente visor de documentos

**Título:** Implementar componente visor de documentos del proyecto

**Descripción:** Crear un componente que permita a los socios visualizar los diferentes tipos de documentos asociados a un proyecto (PDF, documentos legales, presentaciones) de forma segura y optimizada, según su nivel de acceso.

**Criterios de Aceptación:**
- El componente muestra un listado de documentos disponibles agrupados por categoría
- Permite visualizar PDFs directamente en el navegador sin necesidad de descargarlos
- Incluye previsualización de documentos cuando sea posible
- Respeta niveles de acceso (muestra solo documentos accesibles para el usuario actual)
- Implementa controles para zoom, navegación por páginas, etc.
- Es completamente responsive y funciona en diferentes dispositivos
- Optimiza la carga progresiva de documentos grandes
- Muestra claramente mensajes cuando no hay acceso a ciertos documentos

**Prioridad:** Media

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Componentes, UI/UX, MVP

**Tareas:**
1. Investigar y seleccionar biblioteca para visualización de PDFs en React
2. Implementar componente DocumentViewer con soporte para diferentes tipos de archivos
3. Desarrollar listado de documentos con filtrado por categoría
4. Implementar lógica de control de acceso basada en rol del usuario
5. Crear previsualización para documentos cuando sea posible
6. Implementar controles de navegación y zoom para PDFs
7. Optimizar carga de documentos grandes
8. Añadir mensajes explicativos para documentos no accesibles
9. Estilizar el componente según la guía de diseño
10. Garantizar accesibilidad del componente
11. Crear tests para el componente

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Servicio de almacenamiento de documentos](../technical/document-storage-service.md)
- [Control de acceso a documentos](../technical/document-access-policy.md)

## Ticket #29: Middleware de verificación de autenticación para socios

**Título:** Implementar middleware de verificación de rol de socio

**Descripción:** Crear un middleware que verifique que el usuario tiene rol de socio (partner) o superior antes de permitir acceso a las funcionalidades de visualización de proyectos públicos.

**Criterios de Aceptación:**
- El middleware verifica correctamente si el usuario tiene rol 'partner' o superior
- Bloquea acceso a usuarios no autenticados con redirección a login
- Bloquea acceso a usuarios con roles insuficientes (403 Forbidden)
- Se integra con el sistema de autenticación existente
- Puede usarse de forma selectiva en rutas específicas
- Proporciona mensajes de error claros
- Es reutilizable en diferentes partes de la aplicación

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Seguridad, Autenticación, MVP

**Tareas:**
1. Crear middleware de verificación de rol de socio
2. Integrar con el flujo de autenticación existente
3. Implementar función de verificación de permisos
4. Configurar respuestas de error apropiadas
5. Crear sistema de redirección para usuarios no autenticados
6. Crear tests unitarios para verificar funcionamiento
7. Documentar uso del middleware

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Implementación de autenticación](../technical/auth.md)
- [Gestión de roles](../technical/role-middleware-guide.md)

## Ticket #30: Tests e2e para flujo de visualización de proyectos

**Título:** Implementar tests end-to-end para flujo de visualización de proyectos

**Descripción:** Crear tests end-to-end que validen el flujo completo de visualización de proyectos por parte de los socios, desde el login hasta la exploración de proyectos y visualización de detalles.

**Criterios de Aceptación:**
- Se implementan tests e2e con Cypress o similar para el flujo completo
- Los tests cubren autenticación, navegación, filtrado y visualización de proyectos
- Se prueban diferentes roles de usuario (socio, inversor, etc.)
- Se verifica correcta visualización de contenido según permisos
- Los tests son robustos frente a condiciones variables (proyectos diferentes)
- Se incluyen assertions para validar elementos críticos de la UI
- Los tests son mantenibles y bien documentados

**Prioridad:** Media

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo QA/Full-Stack

**Etiquetas:** Testing, E2E, Calidad, MVP

**Tareas:**
1. Configurar entorno de testing e2e (Cypress o similar)
2. Crear datos de prueba consistentes (usuarios, proyectos)
3. Implementar test de flujo de login como socio
4. Crear test para navegación a listado de proyectos
5. Implementar test de filtrado y ordenación
6. Crear test para visualización de detalle de proyecto
7. Implementar test de visualización de documentos
8. Verificar comportamiento con diferentes roles
9. Crear documentación de los tests
10. Integrar con CI/CD para ejecución automática

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-2--ver-oportunidades-de-inversión-must-have)
- [Configuración de testing](../technical/testing-guide.md)
- [Datos de prueba](../technical/test-fixtures.md)

# Tickets para Historia de Usuario 9 - Marcar "Me Interesa"

## Ticket #31: Modelo de datos para intereses en proyectos

**Título:** Implementar modelo de datos para gestión de intereses

**Descripción:** Crear el modelo de datos necesario para gestionar la funcionalidad de "Me Interesa" que permite a los socios indicar interés en proyectos de inversión sin un compromiso financiero inmediato.

**Criterios de Aceptación:**
- El modelo Interest contiene todos los campos requeridos (id, user_id, project_id, created_at, status, notes)
- Se implementa correctamente el enum para estados ('active', 'converted', 'declined')
- Se establecen las relaciones adecuadas con los modelos User y Project
- Se generan migraciones de Prisma funcionales
- Se implementan índices para consultas eficientes (por usuario, por proyecto)
- Se garantiza que solo existe un interés activo por usuario y proyecto

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Base de datos, Prisma, MVP

**Tareas:**
1. Actualizar el esquema Prisma con el modelo Interest
2. Definir relaciones con los modelos User y Project
3. Crear enumeración para estados (active, converted, declined)
4. Generar migraciones
5. Implementar índices para búsquedas eficientes
6. Actualizar el modelo de Notification para soportar notificaciones de tipo 'new_interest'
7. Ejecutar migraciones en entorno de desarrollo
8. Verificar integridad referencial

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Modelo de datos existente](../technical/database.md)

## Ticket #32: Servicio backend para gestión de intereses

**Título:** Implementar servicio de gestión de intereses en proyectos

**Descripción:** Crear un servicio en el backend que maneje todas las operaciones relacionadas con la funcionalidad "Me Interesa", incluyendo registro de interés, listado de proyectos de interés y eliminación de interés.

**Criterios de Aceptación:**
- Se implementa un servicio que permite registrar interés en un proyecto
- Se puede obtener todos los intereses de un usuario
- Se puede eliminar un interés existente
- Se evita la duplicación de intereses activos para un mismo usuario y proyecto
- Se implementa la lógica para cambiar el estado de un interés (active → converted/declined)
- Se registran notificaciones automáticas cuando se crea un nuevo interés
- La operación debe ser transaccional (todo o nada)

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, Servicios, MVP

**Tareas:**
1. Crear servicio InterestService con métodos principales
2. Implementar lógica para registrar nuevo interés
3. Desarrollar función para listar intereses de un usuario
4. Implementar función para eliminar/actualizar interés
5. Integrar con servicio de notificaciones para crear alertas
6. Implementar verificación para evitar duplicados
7. Manejar todos los errores posibles con mensajes claros
8. Añadir tests unitarios para verificar funcionamiento correcto

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Servicios existentes](../technical/services.md)

## Ticket #33: API Endpoints para gestión de intereses

**Título:** Implementar endpoints API para gestión de intereses en proyectos

**Descripción:** Crear los endpoints de la API que permitirán a los socios marcar interés en proyectos, ver sus proyectos de interés y eliminar intereses existentes.

**Criterios de Aceptación:**
- El endpoint POST `/api/projects/:id/interest` permite marcar interés en un proyecto
- El endpoint GET `/api/users/me/interests` permite ver todos los proyectos de interés del usuario
- El endpoint DELETE `/api/projects/:id/interest` permite eliminar un interés existente
- Todos los endpoints están protegidos y solo son accesibles por usuarios autenticados con rol de socio
- Se validan correctamente todos los parámetros de entrada
- Se implementan respuestas adecuadas para todos los escenarios posibles
- Se incluye documentación detallada de los endpoints

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Backend

**Etiquetas:** Backend, API, MVP

**Tareas:**
1. Crear controlador InterestController para manejar las peticiones
2. Implementar endpoint para marcar interés (POST)
3. Desarrollar endpoint para listar intereses (GET)
4. Implementar endpoint para eliminar interés (DELETE)
5. Aplicar middleware de autenticación y verificación de roles
6. Implementar validación de parámetros y manejo de errores
7. Documentar los endpoints en la documentación de API
8. Crear tests para verificar comportamiento de endpoints

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Implementación de autenticación](../technical/auth.md)
- [Guía de endpoints API](../technical/api-guidelines.md)

## Ticket #34: Servicio frontend para gestión de intereses

**Título:** Implementar servicio frontend para gestión de intereses en proyectos

**Descripción:** Crear un servicio en el frontend que gestione la comunicación con la API para marcar, listar y eliminar intereses en proyectos por parte de los socios.

**Criterios de Aceptación:**
- Se implementa un servicio que se comunica con todos los endpoints de intereses
- Proporciona métodos para marcar interés en un proyecto
- Ofrece métodos para listar todos los proyectos de interés del usuario
- Permite eliminar un interés existente
- Implementa manejo de errores y feedback claro
- Incluye tipos TypeScript para mejor desarrollo
- Se integra correctamente con el sistema de autenticación existente

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, Servicios, MVP

**Tareas:**
1. Crear archivo de servicio interestService.js
2. Implementar método para marcar interés (markInterest)
3. Desarrollar método para listar intereses (getUserInterests)
4. Implementar método para eliminar interés (removeInterest)
5. Añadir manejo de errores y mensajes para el usuario
6. Crear interfaces TypeScript para los tipos de datos
7. Integrar con sistema de autenticación para encabezados JWT
8. Escribir tests para verificar funcionamiento del servicio

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Guía de servicios frontend](../technical/frontend-services.md)
- [Configuración de axios](../technical/http-client.md)

## Ticket #35: Componente UI botón "Me Interesa"

**Título:** Implementar componente botón de interés para proyectos

**Descripción:** Crear un componente reutilizable para marcar interés en proyectos que pueda integrarse en diferentes partes de la aplicación como páginas de listado o de detalle de proyectos.

**Criterios de Aceptación:**
- Se implementa un componente InterestButton que muestra si un proyecto ya ha sido marcado como interesante
- El componente permite marcar/desmarcar interés con un solo clic
- Muestra estados visuales distintos (interesado/no interesado, cargando, error)
- Se integra con el servicio de intereses para realizar operaciones
- Muestra feedback inmediato al usuario tras la acción
- Es responsive y accesible
- Mantiene coherencia visual con los componentes UI existentes

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, Componentes, MVP

**Tareas:**
1. Crear componente InterestButton reutilizable
2. Implementar lógica para marcar/desmarcar interés
3. Integrar con el servicio de intereses (Ticket #34)
4. Desarrollar estados visuales (normal, hover, active, loading, success, error)
5. Implementar animaciones sutiles para mejorar UX
6. Garantizar accesibilidad (WCAG 2.1 nivel AA)
7. Asegurar compatibilidad con tema visual de la aplicación
8. Escribir tests del componente

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Guía de componentes](../technical/component-guide.md)
- [Biblioteca de componentes UI](../technical/ui-components.md)

## Ticket #36: Integración del botón de interés en páginas de proyectos

**Título:** Integrar botón "Me Interesa" en páginas de listado y detalle de proyectos

**Descripción:** Incorporar el componente de botón de interés en las páginas de listado y detalle de proyectos para permitir a los socios marcar su interés desde cualquier punto donde vean un proyecto.

**Criterios de Aceptación:**
- El componente InterestButton se integra en la tarjeta de proyecto del listado
- El componente se integra de manera destacada en la página de detalle de proyecto
- El estado se sincroniza correctamente entre diferentes vistas
- Al marcar interés se muestra notificación visual de éxito
- Se añade contador de personas interesadas en el proyecto (opcional para MVP)
- La interfaz es coherente y mantiene el diseño general
- Se implementa feedback visual adecuado para todas las interacciones

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, Integración, MVP

**Tareas:**
1. Integrar componente InterestButton en ProjectCard
2. Añadir componente en la página de detalle del proyecto
3. Implementar sincronización de estado entre componentes
4. Desarrollar notificaciones toast para confirmación de acciones
5. Añadir contador de interesados si el backend proporciona estos datos
6. Asegurar que la integración sea responsive en todas las vistas
7. Verificar la usabilidad en diferentes dispositivos
8. Realizar pruebas de integración

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Página de proyectos existente](../technical/frontend-structure.md)
- [Componente ProjectCard](../technical/ui-components.md)

## Ticket #37: Página de "Mis Intereses" para socios

**Título:** Implementar página de listado de proyectos de interés del usuario

**Descripción:** Crear una página que muestre todos los proyectos en los que el usuario ha marcado interés, permitiendo acceder rápidamente a ellos y gestionar sus intereses desde un único lugar.

**Criterios de Aceptación:**
- Se implementa la página en `/account/interests` accesible solo para socios autenticados
- Muestra un listado de todos los proyectos marcados como interesantes por el usuario
- Permite filtrar y ordenar los proyectos según diferentes criterios
- Incluye la opción de eliminar un interés directamente desde el listado
- Muestra estados visuales apropiados (cargando, vacío, error)
- Es responsive y accesible en todos los dispositivos
- Ofrece enlaces directos a la página de detalle de cada proyecto

**Prioridad:** Media

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo de Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente de página para el listado de intereses
2. Implementar llamada al servicio para obtener intereses del usuario
3. Desarrollar componentes de filtrado y ordenación específicos
4. Implementar funcionalidad para eliminar interés desde el listado
5. Crear estados visuales para diferentes situaciones (cargando, sin resultados)
6. Integrar componente ProjectCard para mostrar cada proyecto
7. Asegurar que la página sea completamente responsive
8. Implementar tests de componente e integración

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Estructura de cuenta de usuario](../technical/frontend-structure.md)
- [Componentes UI existentes](../technical/ui-components.md)

## Ticket #38: Sistema de notificaciones para intereses

**Título:** Implementar sistema de notificaciones para nuevos intereses en proyectos

**Descripción:** Crear un sistema que genere notificaciones automáticas cuando un socio marca interés en un proyecto, permitiendo a los gestores ver y gestionar estos intereses.

**Criterios de Aceptación:**
- Se registra una notificación automática cuando un socio marca interés en un proyecto
- Las notificaciones se envían al gestor/creador del proyecto
- El sistema soporta notificaciones en la plataforma (y opcionalmente por email)
- Las notificaciones incluyen información relevante (proyecto, usuario, fecha)
- Los gestores pueden ver un listado de todas las notificaciones recientes
- Se marca el estado de leído/no leído en notificaciones
- El sistema es escalable para soportar otros tipos de notificaciones en el futuro

**Prioridad:** Media

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Full-Stack

**Etiquetas:** Backend, Frontend, Notificaciones, MVP

**Tareas:**
1. Extender el modelo Notification para soportar intereses
2. Crear servicio de notificaciones en backend
3. Implementar generación automática de notificaciones al marcar interés
4. Desarrollar endpoint API para obtener notificaciones del usuario
5. Crear componente de indicador de notificaciones en la interfaz
6. Implementar página o modal para ver todas las notificaciones
7. Desarrollar sistema para marcar notificaciones como leídas
8. Integrar con sistema de emails (opcional para MVP)
9. Escribir tests para verificar funcionamiento

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Sistema de notificaciones](../technical/notification-system.md)
- [Configuración de email](../technical/email-service.md)

## Ticket #39: Tests e2e para flujo de interés en proyectos

**Título:** Implementar tests end-to-end para flujo de marcar interés en proyectos

**Descripción:** Crear tests end-to-end que validen el flujo completo de marcar interés en proyectos por parte de los socios, incluyendo marcar interés, ver proyectos de interés y eliminar un interés.

**Criterios de Aceptación:**
- Se implementan tests e2e con Cypress o similar para el flujo completo
- Los tests cubren la acción de marcar interés desde la página de listado y detalle
- Se prueba la visualización de la página "Mis Intereses"
- Se verifica la eliminación de un interés existente
- Los tests incluyen verificación de interfaz (estados visuales, feedback)
- El código de prueba es mantenible y está bien documentado
- Se verifica la integración correcta con el resto de la aplicación

**Prioridad:** Baja

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo QA/Frontend

**Etiquetas:** Testing, E2E, Calidad, MVP

**Tareas:**
1. Configurar entorno de testing e2e (o reutilizar el existente)
2. Crear datos de prueba para usuarios y proyectos
3. Implementar test de marcar interés desde la página de listado
4. Crear test para marcar interés desde la página de detalle
5. Implementar test de visualización de la página "Mis Intereses"
6. Desarrollar test para eliminar un interés
7. Verificar el manejo de errores y casos límite
8. Documentar los tests y sus casos de uso
9. Integrar con la pipeline de CI/CD existente

**Enlaces:**
- [Historia de usuario](../product/user-stories.md#-historia-9--marcar-me-interesa-must-have)
- [Configuración de testing](../technical/testing-guide.md)
- [Tests e2e existentes](../technical/e2e-tests.md)
