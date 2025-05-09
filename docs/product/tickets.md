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
5. Implementar animaciones sutiles para mejorar UX

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
