# Tickets para Historia de Usuario 1 - Registro mediante invitación

## Índice General

### [Tickets para Historia de Usuario 1 - Registro mediante invitación](#tickets-para-historia-de-usuario-1---registro-mediante-invitación)
- [Ticket #1: Implementar Login en la plataforma](#ticket-1-implementar-login-en-la-plataforma)
- [Ticket #2: Servicios de autenticación en Frontend](#ticket-2-servicios-de-autenticación-en-frontend)
- [Ticket #3: Configuración y modelo para invitaciones](#ticket-3-configuración-y-modelo-para-invitaciones)
- [Ticket #4: Servicio de gestión de invitaciones](#ticket-4-servicio-de-gestión-de-invitaciones)
- [Ticket #5: Sistema de envío de emails para invitaciones](#ticket-5-sistema-de-envío-de-emails-para-invitaciones)
- [Ticket #6: Implementar interfaz para crear y enviar invitaciones](#ticket-6-implementar-interfaz-para-crear-y-enviar-invitaciones)
- [Ticket #7: API Endpoints para verificación de invitaciones](#ticket-7-api-endpoints-para-verificación-de-invitaciones)
- [Ticket #8: API Endpoints para registro de usuarios](#ticket-8-api-endpoints-para-registro-de-usuarios)
- [Ticket #9: Página de validación de invitación](#ticket-9-página-de-validación-de-invitación)
- [Ticket #10: Formulario de registro para nuevos socios](#ticket-10-formulario-de-registro-para-nuevos-socios)
- [Ticket #11: Página de confirmación post-registro](#ticket-11-página-de-confirmación-post-registro)

### [Tickets para Historia de Usuario 10 - Publicación de oportunidades de inversión](#tickets-para-historia-de-usuario-10---publicación-de-oportunidades-de-inversión)
- [Ticket #12: Verificación de roles y permisos](#ticket-12-verificación-de-roles-y-permisos)
- [Ticket #13: Modelo de datos para gestión de proyectos](#ticket-13-modelo-de-datos-para-gestión-de-proyectos)
- [Ticket #14: Servicio de almacenamiento de documentos](#ticket-14-servicio-de-almacenamiento-de-documentos)
- [Ticket #15: API Endpoints para creación y gestión de proyectos](#ticket-15-api-endpoints-para-creación-y-gestión-de-proyectos)
- [Ticket #16: Interfaz de administración de proyectos (listado)](#ticket-16-interfaz-de-administración-de-proyectos-listado)
- [Ticket #17: Formulario de creación/edición de proyectos](#ticket-17-formulario-de-creaciónedición-de-proyectos)
- [Ticket #18: Componente de gestión de documentos del proyecto](#ticket-18-componente-de-gestión-de-documentos-del-proyecto)
- [Ticket #19: Página de publicación y vista previa del proyecto](#ticket-19-página-de-publicación-y-vista-previa-del-proyecto)

### [Tickets para Historia de Usuario 2 - Ver oportunidades de inversión](#tickets-para-historia-de-usuario-2---ver-oportunidades-de-inversión)
- [Ticket #20: API endpoints para listar y filtrar proyectos públicos](#ticket-20-api-endpoints-para-listar-y-filtrar-proyectos-públicos)
- [Ticket #21: API endpoints para detalle de un proyecto](#ticket-21-api-endpoints-para-detalle-de-un-proyecto)
- [Ticket #22: Servicio frontend para consumo de API de proyectos públicos](#ticket-22-servicio-frontend-para-consumo-de-api-de-proyectos-públicos)
- [Ticket #23: Página de listado de proyectos para socios](#ticket-23-página-de-listado-de-proyectos-para-socios)
- [Ticket #24: Componente de tarjeta de proyecto](#ticket-24-componente-de-tarjeta-de-proyecto)
- [Ticket #25: Componentes de filtrado y ordenación](#ticket-25-componentes-de-filtrado-y-ordenación)
- [Ticket #26: Página de detalle de proyecto para socios](#ticket-26-página-de-detalle-de-proyecto-para-socios)
- [Ticket #27: Componente visor de galería de imágenes](#ticket-27-componente-visor-de-galería-de-imágenes)
- [Ticket #28: Componente visor de documentos](#ticket-28-componente-visor-de-documentos)
- [Ticket #29: Middleware de verificación de autenticación para socios](#ticket-29-middleware-de-verificación-de-autenticación-para-socios)
- [Ticket #30: Tests e2e para flujo de visualización de proyectos](#ticket-30-tests-e2e-para-flujo-de-visualización-de-proyectos)

### [Tickets para Historia de Usuario 9 - Marcar "Me Interesa"](#tickets-para-historia-de-usuario-9---marcar-me-interesa)
- [Ticket #31: Modelo de datos para intereses en proyectos](#ticket-31-modelo-de-datos-para-intereses-en-proyectos)
- [Ticket #32: Servicio backend para gestión de intereses](#ticket-32-servicio-backend-para-gestión-de-intereses)
- [Ticket #33: API Endpoints para gestión de intereses](#ticket-33-api-endpoints-para-gestión-de-intereses)
- [Ticket #34: Servicio frontend para gestión de intereses](#ticket-34-servicio-frontend-para-gestión-de-intereses)
- [Ticket #35: Componente UI botón "Me Interesa"](#ticket-35-componente-ui-botón-me-interesa)
- [Ticket #36: Integración del botón de interés en páginas de proyectos](#ticket-36-integración-del-botón-de-interés-en-páginas-de-proyectos)
- [Ticket #37: Página de "Mis Intereses" para socios](#ticket-37-página-de-mis-intereses-para-socios)
- [Ticket #38: Sistema de notificaciones para intereses](#ticket-38-sistema-de-notificaciones-para-intereses)
- [Ticket #39: Tests e2e para flujo de interés en proyectos](#ticket-39-tests-e2e-para-flujo-de-interés-en-proyectos)

### [Tickets para Historia de Usuario 3 - Marcar "Invierto"](#tickets-para-historia-de-usuario-3---marcar-invierto)
- [Ticket #40: Modelo de datos para inversiones](#ticket-40-modelo-de-datos-para-inversiones)
- [Ticket #41: Actualización del modelo de proyecto para inversiones](#ticket-41-actualización-del-modelo-de-proyecto-para-inversiones)
- [Ticket #42: Servicio backend para gestión de inversiones](#ticket-42-servicio-backend-para-gestión-de-inversiones)
- [Ticket #43: API Endpoints para gestión de inversiones](#ticket-43-api-endpoints-para-gestión-de-inversiones)
- [Ticket #44: Servicio frontend para gestión de inversiones](#ticket-44-servicio-frontend-para-gestión-de-inversiones)
- [Ticket #45: Componente formulario de inversión](#ticket-45-componente-formulario-de-inversión)
- [Ticket #46: Integración del formulario en página de detalle](#ticket-46-integración-del-formulario-en-página-de-detalle)
- [Ticket #47: Página de "Mis Inversiones" para socios](#ticket-47-página-de-mis-inversiones-para-socios)
- [Ticket #48: Componente de resumen de inversiones en proyecto](#ticket-48-componente-de-resumen-de-inversiones-en-proyecto)
- [Ticket #49: Sistema de notificaciones para inversiones](#ticket-49-sistema-de-notificaciones-para-inversiones)
- [Ticket #50: Tests e2e para flujo de inversión](#ticket-50-tests-e2e-para-flujo-de-inversión)
- [Ticket #51: Dashboard para gestores con resumen de inversiones](#ticket-51-dashboard-para-gestores-con-resumen-de-inversiones)

### [Tickets para Historia de Usuario 7 - Confirmación de correo electrónico](#tickets-para-historia-de-usuario-7-confirmación-de-correo-electrónico)
- [Ticket #52: Modelo de datos para tokens de verificación](#ticket-52-modelo-de-datos-para-tokens-de-verificación)
- [Ticket #53: Servicio backend para verificación de email](#ticket-53-servicio-backend-para-verificación-de-email)
- [Ticket #54: API Endpoints para verificación de email](#ticket-54-api-endpoints-para-verificación-de-email)
- [Ticket #55: Plantillas de email para verificación](#ticket-55-plantillas-de-email-para-verificación)
- [Ticket #56: Página de verificación en frontend](#ticket-56-página-de-verificación-en-frontend)
- [Ticket #57: Componentes UI para estado de verificación](#ticket-57-componentes-ui-para-estado-de-verificación)

### [Gestión de Documentos (Cloudinary) - Tickets Detallados](#gestión-de-documentos-cloudinary---tickets-detallados)
- [Ticket #DM-01: Mejora del Servicio de Almacenamiento en Cloudinary](#-ticket-dm-01-mejora-del-servicio-de-almacenamiento-en-cloudinary-mvp---orden-1)
- [Ticket #DM-02: Implementación de Visor Seguro de Documentos](#-ticket-dm-02-implementación-de-visor-seguro-de-documentos-mvp---orden-2)
- [Ticket #DM-03: Sistema de Descarga Controlada de Documentos](#-ticket-dm-03-sistema-de-descarga-controlada-de-documentos-mvp---orden-3)
- [Ticket #DM-04: Gestor de Carga de Documentos por Lotes](#ticket-dm-04-gestor-de-carga-de-documentos-por-lotes)
- [Ticket #DM-05: Sistema de Control de Versiones de Documentos](#ticket-dm-05-sistema-de-control-de-versiones-de-documentos)
- [Ticket #DM-06: Sistema de Búsqueda y Filtrado Avanzado de Documentos](#ticket-dm-06-sistema-de-búsqueda-y-filtrado-avanzado-de-documentos)
- [Ticket #DM-07: Implementación de Análisis y Estadísticas de Documentos](#ticket-dm-07-implementación-de-análisis-y-estadísticas-de-documentos)
- [Ticket #DM-08: Implementación de Política de Retención y Archivo de Documentos](#ticket-dm-08-implementación-de-política-de-retención-y-archivo-de-documentos)
- [Ticket #DM-09: Integración de Firma Digital en Documentos](#ticket-dm-09-integración-de-firma-digital-en-documentos)
- [Ticket #DM-10: Sistema de Permisos Granulares para Documentos](#ticket-dm-10-sistema-de-permisos-granulares-para-documentos)

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
- [Documentación del proyecto](../../readme.md)

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


# Tickets para Historia de Usuario 3 - Marcar "Invierto"

> Este documento contiene los tickets de desarrollo para la HU3 (Marcar "Invierto"), que permite a los socios indicar su intención formal de invertir en un proyecto y especificar el monto.

## Dependencias y Orden de Desarrollo

Para la Historia de Usuario 3, el orden recomendado de desarrollo es:

1. **Fase 1 - Modelos de Datos**
   - **#40: Modelo de datos para inversiones** - Implementar entidades y modelo en la base de datos
   - **#41: Actualización del modelo de proyecto para inversiones** - Añadir campos necesarios para gestionar inversiones

2. **Fase 2 - Backend**
   - **#42: Servicio backend para gestión de inversiones** - Implementar la lógica de negocio para inversiones
   - **#43: API Endpoints para gestión de inversiones** - Crear los endpoints para interactuar con el servicio

3. **Fase 3 - Frontend (Servicios y Componentes)**
   - **#44: Servicio frontend para gestión de inversiones** - Crear la capa de servicio en el frontend
   - **#45: Componente formulario de inversión** - Implementar el formulario para realizar inversiones
   - **#46: Integración del formulario en página de detalle** - Integrar el formulario en la página de detalle de proyecto

4. **Fase 4 - Páginas y Componentes Adicionales**
   - **#47: Página de "Mis Inversiones" para socios** - Implementar la página para visualizar inversiones realizadas
   - **#48: Componente de resumen de inversiones en proyecto** - Mostrar información resumida de inversiones en proyectos

5. **Fase 5 - Notificaciones y Pruebas**
   - **#49: Sistema de notificaciones para inversiones** - Implementar notificaciones automáticas
   - **#50: Tests e2e para flujo de inversión** - Validar el flujo completo con pruebas e2e
   - **#51: Dashboard para gestores con resumen de inversiones** - Crear panel para gestores con información de inversiones

## Detalle de Tickets

## Ticket #40: Modelo de datos para inversiones

**Título:** Implementar modelo de datos para inversiones

**Descripción:** Crear las entidades y el modelo de datos necesarios para gestionar las inversiones de los socios en proyectos inmobiliarios. Esto incluye la definición de la entidad Investment en el dominio y las migraciones necesarias en la base de datos.

**Criterios de Aceptación:**
- Se define la entidad `Investment` en el dominio con todos los campos requeridos
- Se implementa la migración en Prisma para la tabla `investments` si no existe ya
- Se cumple con los requisitos de campos especificados en la HU3
- Se establecen correctamente las relaciones con los modelos de User y Project
- Se crean los índices necesarios para optimizar las consultas
- Se implementan las validaciones básicas a nivel de modelo

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo Backend

**Etiquetas:** Backend, Base de Datos, Dominio, MVP

**Tareas:**
1. Verificar que el modelo `Investment` ya definido en schema.prisma cumple con los requisitos
2. Implementar la entidad `Investment` en `backend/domain/entities/investment.js`
3. Definir las validaciones de negocio para la entidad (monto mínimo, validaciones, etc.)
4. Asegurar que las relaciones con User y Project estén correctamente definidas
5. Implementar métodos auxiliares en la entidad para cálculos y validaciones específicas
6. Actualizar documentación de modelos si es necesario

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Esquema de base de datos](backend/prisma/schema.prisma)
- [Guía de entidades de dominio](docs/technical/domain-entities.md)

## Ticket #41: Actualización del modelo de proyecto para inversiones

**Título:** Actualizar modelo de proyecto para soportar inversiones

**Descripción:** Actualizar el modelo de Project para soportar adecuadamente las inversiones, implementando los métodos necesarios para gestionar montos de inversión, calcular porcentajes de financiación y validar reglas de negocio relacionadas.

**Criterios de Aceptación:**
- El modelo Project puede calcular correctamente el porcentaje financiado
- Se implementan métodos para actualizar el campo `currentAmount` al registrar inversiones
- Se incluyen validaciones para verificar que una inversión cumple con el monto mínimo
- Se añaden métodos para determinar si un proyecto está completamente financiado
- Se crea lógica para validar si un proyecto permite nuevas inversiones basado en su estado
- El modelo mantiene integridad referencial con las inversiones asociadas

**Prioridad:** Alta

**Estimación:** 2 puntos de historia

**Asignado a:** Equipo Backend

**Etiquetas:** Backend, Base de Datos, Dominio, MVP

**Tareas:**
1. Actualizar entidad Project en `backend/domain/entities/project.js` con nuevos métodos
2. Implementar método para calcular el porcentaje de financiación actual
3. Añadir método para incrementar `currentAmount` al registrar inversiones
4. Implementar método para validar si una inversión cumple requisitos mínimos
5. Crear método para determinar si un proyecto acepta más inversiones
6. Actualizar validaciones relevantes para mantener integridad de datos

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Entidad Project existente](backend/domain/entities/project.js)
- [Guía de actualización de modelos](docs/technical/model-update-guide.md)

## Ticket #42: Servicio backend para gestión de inversiones

**Título:** Implementar servicio backend para gestión de inversiones

**Descripción:** Crear un servicio que implemente toda la lógica de negocio relacionada con las inversiones, incluyendo la creación, consulta, actualización y validación de inversiones en proyectos.

**Criterios de Aceptación:**
- Se implementa un servicio completo que gestiona el ciclo de vida de las inversiones
- El servicio incluye métodos para registrar nuevas inversiones
- Se implementa lógica para listar inversiones por usuario y por proyecto
- Se incluyen validaciones de reglas de negocio (monto mínimo, proyecto disponible, etc.)
- La actualización del monto acumulado en el proyecto se realiza transaccionalmente
- El servicio maneja correctamente la creación de notificaciones asociadas
- Se implementa un manejo adecuado de errores y excepciones
- Las operaciones críticas son transaccionales para garantizar integridad de datos

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Backend

**Etiquetas:** Backend, Servicios, Transacciones, MVP

**Tareas:**
1. Crear `backend/application/services/investmentService.js`
2. Implementar método para registrar inversión (`createInvestment`)
3. Desarrollar método para listar inversiones por usuario (`getUserInvestments`)
4. Implementar método para listar inversiones por proyecto (`getProjectInvestments`)
5. Añadir método para cancelar una inversión si el estado lo permite (`cancelInvestment`)
6. Crear método para confirmar una inversión (`confirmInvestment`)
7. Implementar lógica transaccional para actualizar montos del proyecto
8. Integrar con servicio de notificaciones para generar alertas

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Guía de servicios backend](docs/technical/backend-services.md)
- [Manejo de transacciones](docs/technical/transaction-management.md)

## Ticket #43: API Endpoints para gestión de inversiones

**Título:** Implementar API endpoints para gestión de inversiones

**Descripción:** Crear los endpoints de API necesarios para que el frontend pueda interactuar con el servicio de inversiones, incluyendo rutas para registrar, listar y gestionar inversiones.

**Criterios de Aceptación:**
- Se implementa el endpoint POST `/api/projects/:id/invest` para registrar inversiones
- Se crea el endpoint GET `/api/projects/:id/investments` para listar inversiones por proyecto
- Se implementa el endpoint GET `/api/users/me/investments` para listar inversiones del usuario
- Se añade validación de permisos para asegurar que solo los usuarios autorizados acceden
- Todos los endpoints devuelven códigos HTTP apropiados según el resultado de la operación
- La documentación Swagger/OpenAPI se actualiza con los nuevos endpoints
- Se implementa la validación de entrada para parámetros y cuerpo de peticiones

**Prioridad:** Alta

**Estimación:** 4 puntos de historia

**Asignado a:** Equipo Backend

**Etiquetas:** Backend, API, REST, MVP

**Tareas:**
1. Crear `backend/interfaces/controllers/investmentController.js`
2. Implementar método para registrar inversión (`investInProject`)
3. Desarrollar método para listar inversiones de un proyecto (`getProjectInvestments`)
4. Implementar método para listar inversiones del usuario (`getUserInvestments`)
5. Crear `backend/interfaces/routes/investmentRoutes.js` para definir rutas
6. Aplicar middleware de autenticación y verificación de roles
7. Implementar validaciones de entrada con express-validator
8. Actualizar documentación de API con nuevos endpoints
9. Crear tests básicos para validar funcionamiento de los endpoints

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Guía de controladores](docs/technical/controllers-guide.md)
- [Documentación API](docs/api/README.md)

## Ticket #44: Servicio frontend para gestión de inversiones

**Título:** Implementar servicio frontend para gestión de inversiones

**Descripción:** Crear un servicio en el frontend que interactúe con los endpoints de la API de inversiones, permitiendo a los componentes realizar operaciones relacionadas con inversiones de manera centralizada.

**Criterios de Aceptación:**
- Se implementa un servicio completo en `frontend/services/investmentService.js`
- El servicio incluye método para realizar inversión en un proyecto (`investInProject`)
- Se implementa método para listar inversiones del usuario (`getUserInvestments`)
- Se añade método para listar inversiones en un proyecto (`getProjectInvestments`)
- El servicio maneja correctamente errores y devoluciones de la API
- Se implementa manejo de estado (loading, error, success) para operaciones asíncronas
- Se crean interfaces TypeScript para los tipos de datos involucrados

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, Servicios, MVP

**Tareas:**
1. Crear `frontend/services/investmentService.js`
2. Implementar método para realizar inversión (`investInProject`)
3. Desarrollar método para listar inversiones del usuario (`getUserInvestments`)
4. Implementar método para listar inversiones en proyecto (`getProjectInvestments`) 
5. Añadir manejo de errores y mensajes para el usuario
6. Crear interfaces TypeScript para los tipos de datos
7. Integrar con sistema de autenticación para encabezados JWT
8. Escribir tests básicos para verificar funcionamiento del servicio

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Guía de servicios frontend](docs/technical/frontend-services.md)
- [Configuración de axios](docs/technical/http-client.md)

## Ticket #45: Componente formulario de inversión

**Título:** Implementar componente de formulario para inversiones

**Descripción:** Crear un componente de formulario para que los socios puedan realizar inversiones en proyectos, incluyendo campos para especificar el monto y notas adicionales.

**Criterios de Aceptación:**
- Se implementa un componente `InvestmentForm` reutilizable
- El formulario incluye campo para ingresar el monto a invertir con validación
- Se muestra claramente el monto mínimo de inversión del proyecto
- Incluye validación para asegurar que el monto cumple con los requisitos
- Se permite al usuario añadir notas opcionales sobre su inversión
- Muestra confirmación antes de enviar para evitar errores accidentales
- Ofrece feedback visual durante el proceso de envío y tras completarse
- Es responsive y accesible en diferentes dispositivos
- Mantiene consistencia con el diseño general de la aplicación

**Prioridad:** Alta

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, UI/UX, Componentes, MVP

**Tareas:**
1. Crear componente `InvestmentForm` en `frontend/components/projects/InvestmentForm.jsx`
2. Implementar formulario con formik o react-hook-form para gestión de estado
3. Añadir validaciones para el campo de monto (mínimo, formato, etc.)
4. Implementar campo de notas opcional con contador de caracteres
5. Desarrollar modal de confirmación antes de enviar inversión
6. Crear estados visuales para diferentes situaciones (enviando, éxito, error)
7. Conectar con el servicio de inversiones para enviar datos
8. Implementar tests básicos del componente

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Guía de componentes](docs/technical/component-guide.md)
- [Guía de estilos UI](docs/design/ui-styleguide.md)

## Ticket #46: Integración del formulario en página de detalle

**Título:** Integrar formulario de inversión en la página de detalle de proyecto

**Descripción:** Integrar el componente de formulario de inversión en la página de detalle de proyecto, asegurando que funcione correctamente con los datos del proyecto y la lógica de navegación.

**Criterios de Aceptación:**
- El formulario de inversión se integra correctamente en la página de detalle de proyecto
- Se muestra de forma destacada y accesible para los usuarios
- El monto mínimo se precarga del proyecto actual automáticamente
- Se implementa lógica para mostrar/ocultar el formulario según el estado del proyecto
- Al completar la inversión se muestra una confirmación y se actualiza la UI
- Se dirige al usuario a una página de resumen o confirmación tras invertir
- La integración es consistente con el diseño general de la página
- Se mantiene la experiencia responsive en todos los dispositivos

**Prioridad:** Alta

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, UI/UX, Integración, MVP

**Tareas:**
1. Actualizar `frontend/pages/projects/[id].jsx` para integrar el formulario
2. Implementar sección destacada para el formulario de inversión
3. Añadir lógica condicional para mostrar/ocultar formulario según estado
4. Desarrollar flujo de confirmación tras inversión exitosa
5. Crear página o modal de confirmación/resumen post-inversión
6. Asegurar que la UI se actualiza correctamente tras una inversión
7. Mantener coherencia visual con el resto de la página
8. Implementar tests de integración

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Página de detalle de proyecto](frontend/pages/projects/[id].jsx)
- [Guía de navegación](docs/technical/frontend-navigation.md)

## Ticket #47: Página de "Mis Inversiones" para socios

**Título:** Implementar página de listado de inversiones del usuario

**Descripción:** Crear una página que permita a los socios ver todas sus inversiones actuales, con detalles de cada una y acceso rápido a los proyectos relacionados.

**Criterios de Aceptación:**
- Se implementa la página en `/account/investments` accesible solo para socios autenticados
- Muestra un listado de todas las inversiones realizadas por el usuario
- Incluye detalles clave: proyecto, monto, fecha, estado, ROI esperado
- Permite filtrar inversiones por estado (pendientes, confirmadas, etc.)
- Ofrece acceso directo a la página de detalle de cada proyecto
- Muestra resumen total de inversiones y estadísticas básicas
- Es responsive y accesible en todos los dispositivos
- Implementa estados visuales para diferentes situaciones (cargando, vacío, error)

**Prioridad:** Media

**Estimación:** 4 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, UI/UX, MVP

**Tareas:**
1. Crear componente de página para listado de inversiones en `frontend/pages/account/investments.js`
2. Implementar llamada al servicio para obtener inversiones del usuario
3. Desarrollar componente de tabla o lista para mostrar inversiones
4. Implementar filtros y ordenación para la lista de inversiones
5. Crear componente de resumen con estadísticas (total invertido, proyectos, etc.)
6. Desarrollar estados visuales para diferentes situaciones
7. Integrar con sistema de navegación y protección de rutas
8. Implementar tests básicos de la página

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Estructura de cuenta de usuario](docs/technical/frontend-structure.md)
- [Componentes UI existentes](docs/technical/ui-components.md)

## Ticket #48: Componente de resumen de inversiones en proyecto

**Título:** Implementar componente de resumen de inversiones en proyecto

**Descripción:** Crear un componente que muestre un resumen visual de las inversiones en un proyecto, incluyendo el progreso de financiación, número de inversores y otra información relevante.

**Criterios de Aceptación:**
- Se implementa un componente `InvestmentSummary` reutilizable
- El componente muestra claramente el progreso de financiación con una barra visual
- Incluye detalles como: cantidad recaudada, objetivo, porcentaje completado
- Muestra información sobre número de inversores (opcional según permisos)
- Permite diferentes variantes visuales (completa, compacta, etc.)
- Es responsive y se adapta a diferentes contenedores
- Mantiene consistencia con el diseño general de la aplicación
- Los datos se actualizan automáticamente cuando cambia el proyecto

**Prioridad:** Media

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, UI/UX, Componentes, MVP

**Tareas:**
1. Crear componente `InvestmentSummary` en `frontend/components/projects/InvestmentSummary.jsx`
2. Implementar barra de progreso visual para financiación
3. Desarrollar cálculos para porcentajes y visualización de datos
4. Crear diferentes variantes visuales del componente
5. Implementar lógica para mostrar/ocultar información según permisos
6. Asegurar que el componente es responsive y accesible
7. Integrar con el tema visual de la aplicación
8. Escribir tests para verificar cálculos y visualización

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Guía de componentes](docs/technical/component-guide.md)
- [Biblioteca de componentes UI](docs/technical/ui-components.md)

## Ticket #49: Sistema de notificaciones para inversiones

**Título:** Implementar sistema de notificaciones para nuevas inversiones

**Descripción:** Crear un sistema que genere notificaciones automáticas cuando un socio realiza una inversión, permitiendo a los gestores y otros socios mantenerse informados.

**Criterios de Aceptación:**
- Se registra una notificación automática cuando un socio realiza una inversión
- Las notificaciones se envían al gestor/creador del proyecto y otros socios
- El sistema soporta notificaciones en la plataforma (y opcionalmente por email)
- Las notificaciones incluyen información relevante (proyecto, monto, usuario)
- Los gestores pueden ver un listado de todas las notificaciones recientes
- Se marca el estado de leído/no leído en notificaciones
- El sistema es escalable para soportar otros tipos de notificaciones en el futuro

**Prioridad:** Media

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Full-Stack

**Etiquetas:** Backend, Frontend, Notificaciones, MVP

**Tareas:**
1. Verificar o extender el modelo Notification para soportar inversiones
2. Actualizar o crear servicio de notificaciones en backend
3. Implementar generación automática de notificaciones al realizar inversión
4. Verificar endpoint API para obtener notificaciones del usuario
5. Actualizar componente de indicador de notificaciones en la interfaz
6. Asegurar que la página o modal de notificaciones muestra las nuevas
7. Implementar sistema para marcar notificaciones como leídas
8. Integrar con sistema de emails (opcional para MVP)
9. Escribir tests para verificar funcionamiento

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Sistema de notificaciones](docs/technical/notification-system.md)
- [Configuración de email](docs/technical/email-service.md)

## Ticket #50: Tests e2e para flujo de inversión

**Título:** Implementar tests end-to-end para flujo de inversión en proyectos

**Descripción:** Crear tests end-to-end que validen el flujo completo de inversión en proyectos, desde la visualización del proyecto hasta la confirmación de la inversión y su visualización en el listado personal.

**Criterios de Aceptación:**
- Se implementan tests e2e con Cypress o similar para el flujo completo
- Los tests cubren la acción de invertir desde la página de detalle del proyecto
- Se verifica la validación de montos mínimos y errores en formulario
- Se prueba la visualización de la página "Mis Inversiones"
- Los tests incluyen verificación de interfaz (estados visuales, feedback)
- Se verifica la actualización de la barra de progreso del proyecto
- El código de prueba es mantenible y está bien documentado
- Se incluyen escenarios positivos y negativos (errores, validaciones)

**Prioridad:** Baja

**Estimación:** 3 puntos de historia

**Asignado a:** Equipo QA/Frontend

**Etiquetas:** Testing, E2E, Calidad, MVP

**Tareas:**
1. Configurar escenarios de prueba y datos iniciales
2. Implementar test para navegar al detalle de un proyecto
3. Crear test para completar y enviar formulario de inversión
4. Verificar validaciones y mensajes de error
5. Comprobar página de confirmación post-inversión
6. Implementar test para verificar página "Mis Inversiones"
7. Comprobar actualización de datos del proyecto tras inversión
8. Documentar los test cases creados

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Configuración de Cypress](cypress/README.md)
- [Guía de testing e2e](docs/technical/e2e-testing-guide.md)

## Ticket #51: Dashboard para gestores con resumen de inversiones

**Título:** Implementar dashboard para gestores con resumen de inversiones

**Descripción:** Crear un panel de control para gestores que muestre información consolidada sobre las inversiones en todos los proyectos, permitiendo monitorear el progreso de financiación y gestionar el estado de las inversiones.

**Criterios de Aceptación:**
- Se implementa dashboard en el área de administración para gestores
- Muestra resumen global de inversiones por proyecto
- Incluye estadísticas clave: total recaudado, proyectos financiados, inversiones pendientes
- Permite ver y gestionar las inversiones en estado pendiente
- Incluye gráficos para visualizar tendencias de inversión
- Ofrece filtros para analizar datos por período, proyecto o estado
- Es responsive y optimizado para diferentes dispositivos
- Los datos se actualizan en tiempo real o con refresco periódico

**Prioridad:** Baja

**Estimación:** 5 puntos de historia

**Asignado a:** Equipo Frontend

**Etiquetas:** Frontend, Dashboard, Gestión, UI/UX

**Tareas:**
1. Crear página de dashboard en área de administración
2. Implementar componentes para visualización de estadísticas globales
3. Desarrollar tabla de inversiones pendientes con opciones de gestión
4. Crear componentes de gráficos para visualizar datos (barras, líneas, etc.)
5. Implementar filtros para análisis de datos
6. Integrar con servicios de inversión para obtener datos actualizados
7. Diseñar interfaz responsive y optimizada para diferentes dispositivos
8. Escribir tests para verificar funcionalidad

**Enlaces:**
- [Historia de usuario](docs/product/user-stories.md#-historia-3--marcar-invierto-must-have)
- [Panel de administración](docs/technical/admin-panel.md)
- [Biblioteca de visualización de datos](docs/technical/data-visualization.md)

# Tickets para Historia de Usuario 7: Confirmación de correo electrónico

## 📌 Descripción General
Estos tickets corresponden a la implementación de la Historia de Usuario 7: "Como nuevo socio, quiero confirmar mi dirección de correo electrónico después del registro para verificar mi identidad y tener acceso completo a la plataforma".

## 📋 Lista de Tickets

### Ticket #52: Modelo de datos para tokens de verificación

**Título:** Implementación del modelo de datos para tokens de verificación de email

**Descripción:** Crear la entidad necesaria para gestionar tokens de verificación de email, que permitirá a los usuarios confirmar sus direcciones de correo electrónico. Se utilizará un modelo basado en tokens únicos con tiempo de expiración.

**Criterios de Aceptación:**
1. La entidad debe incluir campos para: token único (string), usuario asociado (relación), email a verificar (string), fecha de creación, fecha de expiración, fecha de uso y estado (pendiente/usado/expirado).
2. Implementar validaciones para asegurar que cada token es único.
3. Implementar método para verificar si un token ha expirado.
4. Implementar método para marcar un token como usado.
5. Crear tests unitarios para validar el funcionamiento del modelo.

**Tareas:**
1. Actualizar el esquema de Prisma añadiendo el modelo `VerificationToken`.
2. Crear la entidad de dominio `VerificationToken` en `/backend/domain/entities/`.
3. Implementar los métodos de validación y business logic en la entidad.
4. Implementar tests unitarios para la entidad.
5. Ejecutar migraciones de base de datos.

**Dependencias:** Ninguna

**Nivel de prioridad:** Alta

**Estimación:** 2 puntos

**Notas técnicas:**
- Configurar el token para que expire después de 24 horas.
- Utilizar un formato de token seguro (UUID v4 recomendado).
- Considerar índices de base de datos para búsquedas eficientes por token y usuario.

---

### Ticket #53: Servicio backend para verificación de email

**Título:** Implementación del servicio de verificación de email

**Descripción:** Crear un servicio que gestione la generación, validación y procesamiento de tokens de verificación de email, así como la actualización del estado de verificación de los usuarios.

**Criterios de Aceptación:**
1. Implementar método para generar y guardar un nuevo token de verificación.
2. Implementar método para validar un token recibido.
3. Implementar método para marcar un email como verificado.
4. Implementar método para reenviar un email de verificación.
5. Implementar manejo de errores para tokens inválidos, expirados o ya utilizados.
6. Implementar lógica para actualizar el estado de verificación del usuario.
7. Crear tests unitarios para validar el funcionamiento del servicio.

**Tareas:**
1. Crear el servicio `EmailVerificationService` en `/backend/application/services/`.
2. Implementar los métodos necesarios en el servicio.
3. Integrar con el modelo de datos creado en el Ticket #52.
4. Implementar la lógica para actualizar el estado de verificación del usuario.
5. Integrar con el servicio de email existente para enviar correos de verificación.
6. Implementar tests unitarios para el servicio.

**Dependencias:** Ticket #52

**Nivel de prioridad:** Alta

**Estimación:** 3 puntos

**Notas técnicas:**
- Utilizar transacciones para operaciones que afecten a múltiples tablas.
- Implementar mecanismos para evitar ataques de fuerza bruta.
- Considerar límites en el número de intentos de verificación y reenvíos.

---

### Ticket #54: API Endpoints para verificación de email

**Título:** Implementación de API Endpoints para verificación de email

**Descripción:** Crear los endpoints necesarios para la verificación de email, incluyendo la verificación de tokens y el reenvío de correos de verificación.

**Criterios de Aceptación:**
1. Implementar endpoint GET `/api/auth/verify-email/:token` para verificar un token de email.
2. Implementar endpoint POST `/api/auth/resend-verification` para reenviar un email de verificación.
3. Asegurar que los endpoints devuelven respuestas adecuadas y códigos HTTP apropiados.
4. Implementar validación de parámetros y manejo de errores.
5. Documentar los endpoints en la especificación de la API.
6. Implementar tests de integración para los endpoints.

**Tareas:**
1. Crear el controlador `EmailVerificationController` en `/backend/interfaces/http/controllers/`.
2. Definir las rutas en `/backend/interfaces/http/routes/auth.routes.js` o crear un archivo específico para verificación.
3. Implementar la lógica de los controladores integrándolos con el servicio creado en el Ticket #53.
4. Implementar validación de parámetros con express-validator.
5. Implementar manejo de errores y respuestas apropiadas.
6. Actualizar la documentación de la API.
7. Implementar tests de integración para los endpoints.

**Dependencias:** Ticket #53

**Nivel de prioridad:** Alta

**Estimación:** 2 puntos

**Notas técnicas:**
- El endpoint de verificación será accesible sin autenticación (token en la URL).
- El endpoint de reenvío requerirá autenticación JWT.
- Considerar limitación de tasa (rate limiting) para prevenir abusos.

---

### Ticket #55: Plantillas de email para verificación

**Título:** Creación de plantillas de email para verificación

**Descripción:** Diseñar e implementar las plantillas HTML y de texto plano para los correos electrónicos de verificación de email, asegurando que sean atractivos, claros y funcionales en diferentes clientes de correo.

**Criterios de Aceptación:**
1. Crear plantilla HTML responsive para el email de verificación inicial.
2. Crear plantilla HTML responsive para el email de reenvío de verificación.
3. Crear versiones de texto plano para ambas plantillas (para clientes que no soportan HTML).
4. Las plantillas deben incluir el logo de la plataforma, instrucciones claras y un botón/enlace prominente para verificar.
5. Las plantillas deben funcionar correctamente en los principales clientes de correo (Gmail, Outlook, Apple Mail).

**Tareas:**
1. Diseñar las plantillas HTML usando una estructura compatible con email.
2. Implementar las plantillas en `/backend/application/templates/emails/`.
3. Crear las versiones de texto plano.
4. Integrar las plantillas con el servicio de envío de emails.
5. Realizar pruebas de visualización en diferentes clientes de correo.

**Dependencias:** Ninguna (puede desarrollarse en paralelo a tickets anteriores)

**Nivel de prioridad:** Media

**Estimación:** 2 puntos

**Notas técnicas:**
- Usar tablas para la estructura en lugar de divs para compatibilidad con clientes de correo.
- Utilizar CSS inline para el estilo.
- Probar en servicios como Litmus o Email on Acid si es posible.
- Asegurar que los enlaces incluyan un token seguro y tengan una URL válida para el entorno.

---

### Ticket #56: Página de verificación en frontend

**Título:** Implementación de página de verificación de email en frontend

**Descripción:** Crear una página en el frontend que permita a los usuarios verificar su email a través del enlace recibido en su correo y mostrar el resultado del proceso de verificación.

**Criterios de Aceptación:**
1. Implementar página en `/verify-email/[token]` que procese automáticamente el token de la URL.
2. Mostrar estados de carga durante la verificación.
3. Mostrar mensaje de éxito cuando la verificación se complete correctamente.
4. Mostrar mensaje de error apropiado cuando la verificación falle (token inválido, expirado, etc).
5. Incluir botón para reenviar email de verificación si es necesario.
6. Incluir enlace para ir al login después de una verificación exitosa.
7. Asegurar que la página sea responsive y cumpla con estándares de accesibilidad.

**Tareas:**
1. Crear componente `VerifyEmailPage` en `frontend/pages/verify-email/[token].jsx`.
2. Implementar la lógica para extraer el token de la URL y llamar al endpoint de verificación.
3. Implementar diferentes estados visuales según el resultado de la verificación.
4. Crear componente de éxito que muestre un mensaje positivo y próximos pasos.
5. Crear componente de error con opciones para reenviar o contactar soporte.
6. Implementar pruebas para los diferentes escenarios.

**Dependencias:** Ticket #54

**Nivel de prioridad:** Alta

**Estimación:** 2 puntos

**Notas técnicas:**
- Utilizar los componentes UI existentes para mantener consistencia visual.
- Implementar gestión de estado con React hooks (useState, useEffect).
- Considerar el uso de react-query para manejar la petición de verificación.
- Añadir análisis (analytics) para seguir tasas de verificación exitosa.

---

### Ticket #57: Componentes UI para estado de verificación

**Título:** Implementación de componentes UI para indicar estado de verificación

**Descripción:** Crear componentes visuales que indiquen el estado de verificación del email del usuario en toda la plataforma, y bloqueo de acceso a funcionalidades para usuarios no verificados.

**Criterios de Aceptación:**
1. Implementar banner/alerta que se muestre en toda la plataforma para usuarios no verificados.
2. El banner debe incluir información sobre la importancia de verificar y un botón para reenviar el email.
3. Implementar lógica para restringir el acceso a ciertas funcionalidades para usuarios no verificados.
4. Mostrar mensajes informativos al intentar acceder a funcionalidades restringidas.
5. Implementar indicador visual del estado de verificación en el perfil del usuario.

**Tareas:**
1. Crear componente `EmailVerificationBanner` en `frontend/components/common/`.
2. Integrar el banner en el layout principal de la aplicación.
3. Implementar HOC (High Order Component) o middleware para restringir acceso a rutas protegidas.
4. Modificar la lógica de autenticación para incluir el estado de verificación en el contexto de usuario.
5. Actualizar el perfil de usuario para mostrar el estado de verificación.
6. Implementar el servicio frontend para reenviar emails de verificación.

**Dependencias:** Ticket #56

**Nivel de prioridad:** Media

**Estimación:** 2 puntos

**Notas técnicas:**
- El banner debe ser persistente pero no intrusivo.
- Considerar el uso de localStorage para no mostrar el banner constantemente si el usuario lo cierra.
- Utilizar el contexto de autenticación existente para acceder al estado de verificación.
- Las rutas a restringir deben definirse en coordinación con los requerimientos de negocio.

# Gestión de Documentos (Cloudinary) - Tickets Detallados

## Introducción

Este documento detalla los tickets y especificaciones para implementar un sistema completo de gestión de documentos dentro de la plataforma del Club de Inversión Inmobiliaria. El sistema utiliza Cloudinary como proveedor de almacenamiento principal, pero está diseñado con una arquitectura que permitiría cambiar de proveedor en el futuro con mínimas modificaciones.

La gestión documental es una parte fundamental del sistema, permitiendo a los usuarios acceder a documentos críticos según su rol y nivel de acceso, garantizando tanto la disponibilidad como la seguridad de la información.

> **NOTA IMPORTANTE: Los tickets marcados como "MVP" son los que se implementarán en la primera fase del proyecto, siendo los mínimos necesarios para tener una funcionalidad básica pero completa del sistema de gestión documental.**

## Consideraciones Generales

### Tipos de Documentos Soportados

| Categoría | Tipos de Archivo | Extensiones | Tamaño Máximo |
|-----------|------------------|------------|--------------|
| Documentos | PDF, Word, Excel, PowerPoint, texto plano | .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .rtf | 10MB |
| Imágenes | JPEG, PNG, GIF, WebP, SVG | .jpg, .jpeg, .png, .gif, .webp, .svg | 5MB |
| Videos | MP4, MPEG, MOV, AVI, WMV | .mp4, .mpeg, .mov, .avi, .wmv | 100MB |

### Clasificación de Documentos por Tipo

- **LEGAL**: Documentos legales relacionados con los proyectos
- **FINANCIAL**: Documentos financieros, balances, proyecciones
- **TECHNICAL**: Documentos técnicos, planos, especificaciones
- **MARKETING**: Materiales promocionales del proyecto
- **IMAGE**: Imágenes del proyecto o propiedad
- **VIDEO**: Videos del proyecto o propiedad
- **OTHER**: Otros documentos no clasificados

### Niveles de Acceso

- **PUBLIC**: Visible para todos los usuarios, incluso no registrados
- **PARTNER**: Solo visible para socios registrados
- **INVESTOR**: Solo visible para inversores en el proyecto específico
- **ADMIN**: Solo visible para administradores y gestores

### Niveles de Seguridad

- **VIEW_ONLY**: Solo permite visualización en el navegador sin descargar
- **DOWNLOAD**: Permite descargar el documento
- **PRINT**: Permite la impresión del documento
- **FULL_ACCESS**: Acceso completo sin restricciones

## Tickets de Desarrollo

### ✅ Ticket #DM-01: Mejora del Servicio de Almacenamiento en Cloudinary (MVP - Orden 1)

**Título:** Implementar servicio mejorado de almacenamiento con Cloudinary

**Descripción:** Actualizar el servicio de almacenamiento para proporcionar funcionalidades avanzadas y mejorar la gestión de documentos con Cloudinary, enfocándose en seguridad, rendimiento y escalabilidad.

**Criterios de Aceptación:**
- El servicio debe implementar correctamente la interfaz StorageInterface para mantener interoperabilidad
- Debe soportar todos los tipos de documentos especificados (PDF, Word, Excel, imágenes, videos, etc.)
- Debe implementar URLs firmadas con duración configurada por tipo de documento y nivel de seguridad
- Debe soportar optimización de imágenes y transformaciones según parámetros configurables
- Debe mantener registro de todas las operaciones para auditoría
- Debe implementar mecanismos de recuperación ante fallos
- Las operaciones críticas deben ser atómicas o soportar rollback

**Tareas:**
1. Actualizar configuración de Cloudinary para soportar todos los tipos de documentos
2. Implementar método mejorado de generación de URLs firmadas con expiración variable
3. Desarrollar sistema de transformación y optimización según tipo de archivo
4. Implementar registros detallados de operaciones para auditoría
5. Añadir soporte para detección automática de tipo de contenido
6. Implementar manejo de errores avanzado con reintentos automáticos
7. Desarrollar pruebas unitarias exhaustivas

### ✅ Ticket #DM-02: Implementación de Visor Seguro de Documentos (MVP - Orden 2)

**Título:** Implementar visor seguro de documentos con protección contra descarga

**Descripción:** Crear un sistema que permita visualizar documentos sensibles directamente en el navegador sin posibilidad de descarga, utilizando las capacidades de Cloudinary y añadiendo capas adicionales de seguridad.

**Criterios de Aceptación:**
- Los documentos con nivel de seguridad VIEW_ONLY no pueden ser descargados directamente
- El visor debe funcionar con múltiples formatos (PDF, DOCX, etc.)
- Debe implementar marca de agua con información del usuario visualizando
- Las URLs de visualización deben ser temporales (máx. 30 minutos)
- Debe registrar cada visualización (usuario, IP, fecha, duración)
- Debe implementar protección contra capturas de pantalla (en la medida de lo posible)
- Debe funcionar correctamente en dispositivos móviles y tablets

**Tareas:**
1. Desarrollar componente frontend para visualización segura de PDFs
2. Implementar generación de URLs firmadas con tiempo de expiración reducido
3. Crear sistema de marcas de agua dinámicas con datos del usuario
4. Desarrollar mecanismo de registro de visualizaciones
5. Implementar restricciones JavaScript para dificultar capturas de pantalla
6. Crear endpoints API para solicitar y validar acceso a documentos
7. Desarrollar pruebas de integración y seguridad

### ✅ Ticket #DM-03: Sistema de Descarga Controlada de Documentos (MVP - Orden 3)

**Título:** Implementar sistema de descarga controlada de documentos

**Descripción:** Crear un sistema que permita la descarga controlada de documentos para usuarios autorizados, incluyendo registro de cada descarga, límites por usuario, y generación de versiones personalizadas con marcas de agua.

**Criterios de Aceptación:**
- Solo los documentos con nivel de seguridad DOWNLOAD o superior pueden ser descargados
- Cada descarga debe ser registrada (usuario, IP, fecha, documento)
- Se debe implementar limitación de descargas por usuario y período
- Los documentos descargados deben incluir marca de agua personalizada
- Se debe verificar el nivel de acceso del usuario para cada descarga
- Las descargas deben usar URLs firmadas con corta expiración (5 minutos)
- El sistema debe soportar encriptación de documentos sensibles

**Tareas:**
1. Desarrollar endpoint API para solicitar descarga de documento
2. Implementar verificación de permisos por nivel de acceso y tipo de documento
3. Crear sistema de generación de URLs firmadas para descarga
4. Desarrollar mecanismo de registro detallado de descargas
5. Implementar sistema de límites y cuotas por usuario
6. Crear sistema de marcas de agua dinámicas para documentos descargados
7. Implementar pruebas de seguridad y rendimiento

### Ticket #DM-04: Gestor de Carga de Documentos por Lotes

**Título:** Implementar sistema de carga de documentos por lotes

**Descripción:** Crear una interfaz y un servicio backend que permita a los gestores cargar múltiples documentos simultáneamente, con procesamiento asíncrono, verificación de tipos y clasificación automática.

**Criterios de Aceptación:**
- La interfaz permite seleccionar y cargar hasta 20 documentos simultáneamente
- El sistema procesa los documentos de forma asíncrona mostrando progreso
- Se verifican automáticamente tipos, tamaños y potenciales malware
- Se implementa reconocimiento para sugerir clasificación de documentos
- El sistema genera miniaturas para documentos y PDFs
- Se permite asignar metadatos en lote o individualmente
- El sistema notifica cuando la carga está completa

**Tareas:**
1. Desarrollar componente frontend para carga múltiple con drag & drop
2. Implementar sistema de cola para procesamiento asíncrono
3. Crear servicio de verificación de tipos y seguridad
4. Desarrollar generador de miniaturas para diferentes tipos de documentos
5. Implementar sistema de clasificación automática basado en contenido
6. Crear interfaz para asignación de metadatos por lote
7. Desarrollar sistema de notificaciones de progreso y finalización

### Ticket #DM-05: Sistema de Control de Versiones de Documentos

**Título:** Implementar control de versiones para documentos de proyecto

**Descripción:** Crear un sistema que permita mantener y gestionar múltiples versiones de un mismo documento, facilitando la actualización sin perder versiones anteriores y manteniendo un historial completo.

**Criterios de Aceptación:**
- El sistema mantiene todas las versiones de un documento con registro de cambios
- Permite revertir a versiones anteriores sin perder la historia
- Muestra claramente la versión actual y el historial de cambios
- Cada versión registra quién y cuándo la subió
- Permite comparar versiones de documentos (cuando el formato lo permite)
- Las versiones anteriores permanecen accesibles según niveles de permiso
- Implementa etiquetado de versiones (v1.0, v2.0, "Final", etc.)

**Tareas:**
1. Modificar el modelo de datos para soportar versionado
2. Desarrollar servicio de gestión de versiones de documentos
3. Crear interfaz para visualizar y navegar entre versiones
4. Implementar sistema de etiquetado de versiones
5. Desarrollar mecanismo de comparación de versiones para formatos compatibles
6. Crear endpoints API para gestionar versiones
7. Implementar pruebas unitarias para verificar integridad de versiones

### Ticket #DM-06: Sistema de Búsqueda y Filtrado Avanzado de Documentos

**Título:** Implementar búsqueda avanzada de documentos con indexación de contenido

**Descripción:** Desarrollar un sistema que permita la búsqueda no solo por metadatos sino también por contenido dentro de los documentos, utilizando técnicas de indexación y OCR para documentos escaneados.

**Criterios de Aceptación:**
- El sistema permite búsqueda por múltiples criterios (tipo, fecha, proyecto, contenido)
- Implementa búsqueda full-text dentro del contenido de documentos compatibles
- Utiliza OCR para indexar contenido de documentos escaneados e imágenes
- Permite filtrado avanzado combinando múltiples criterios
- Los resultados se presentan ordenados por relevancia con vista previa
- Respeta niveles de acceso en los resultados de búsqueda
- El rendimiento debe mantenerse con grandes volúmenes de documentos

**Tareas:**
1. Implementar sistema de indexación de documentos
2. Integrar servicio OCR para documentos escaneados
3. Desarrollar motor de búsqueda full-text
4. Crear interfaz de usuario para búsqueda avanzada
5. Implementar filtrado por metadatos y contenido
6. Desarrollar sistema de presentación de resultados con preview
7. Optimizar rendimiento para grandes volúmenes de datos

### Ticket #DM-07: Implementación de Análisis y Estadísticas de Documentos

**Título:** Desarrollar sistema de análisis y estadísticas de uso de documentos

**Descripción:** Crear un dashboard que muestre estadísticas detalladas sobre el uso de documentos: visualizaciones, descargas, usuarios más activos, documentos más populares, etc., permitiendo a los gestores entender mejor el comportamiento de los usuarios.

**Criterios de Aceptación:**
- El dashboard muestra estadísticas de visualización y descarga por documento
- Presenta gráficos de tendencias de uso a lo largo del tiempo
- Identifica documentos más populares y usuarios más activos
- Permite filtrar estadísticas por proyecto, tipo de documento y período
- Implementa alertas para patrones inusuales (posibles filtraciones)
- Genera informes exportables en diferentes formatos
- Muestra tiempo promedio de visualización por documento

**Tareas:**
1. Desarrollar sistema de recolección y procesamiento de datos de uso
2. Crear modelos de análisis estadístico
3. Implementar dashboard visual con gráficos interactivos
4. Desarrollar sistema de informes personalizables
5. Crear mecanismo de alertas para comportamientos anómalos
6. Implementar filtros y segmentación de datos
7. Desarrollar exportación de informes en múltiples formatos

### Ticket #DM-08: Implementación de Política de Retención y Archivo de Documentos

**Título:** Implementar política automatizada de retención y archivo de documentos

**Descripción:** Desarrollar un sistema que gestione automáticamente el ciclo de vida de los documentos, aplicando políticas de retención, archivado y eliminación según reglas predefinidas basadas en tipo, edad y uso del documento.

**Criterios de Aceptación:**
- El sistema permite definir reglas de retención por tipo de documento
- Implementa archivado automático de documentos antiguos poco usados
- Notifica antes de aplicar políticas de eliminación
- Mantiene registro completo de documentos archivados/eliminados
- Permite recuperación de documentos archivados cuando sea necesario
- Implementa diferentes estrategias de almacenamiento según fase del ciclo de vida
- Cumple con requisitos legales de retención para documentos críticos

**Tareas:**
1. Desarrollar sistema de definición de políticas de retención
2. Implementar mecanismo automático de evaluación y aplicación de políticas
3. Crear sistema de almacenamiento por niveles (hot/warm/cold)
4. Desarrollar proceso de notificación previa a archivado/eliminación
5. Implementar registro detallado de operaciones de ciclo de vida
6. Crear interfaz para definir y gestionar políticas
7. Desarrollar sistema de recuperación de documentos archivados

### Ticket #DM-09: Integración de Firma Digital en Documentos

**Título:** Implementar sistema de firma digital para documentos legales

**Descripción:** Desarrollar un sistema que permita la firma digital de documentos legales directamente en la plataforma, con validez legal y registro inmutable de firmas, utilizando estándares reconocidos.

**Criterios de Aceptación:**
- Permite firmar digitalmente documentos PDF y compatibles
- Implementa estándares reconocidos de firma digital
- Registra las firmas con timestamp y datos del firmante
- Verifica la identidad del firmante mediante múltiples factores
- Genera certificados de firma verificables
- Permite validar la autenticidad e integridad de documentos firmados
- Implementa flujos de trabajo para múltiples firmantes

**Tareas:**
1. Integrar librería de firma digital compatible con estándares legales
2. Desarrollar interfaz para proceso de firma en plataforma
3. Implementar verificación de identidad multifactor
4. Crear registro inmutable de firmas (potencialmente blockchain)
5. Desarrollar sistema de validación de documentos firmados
6. Implementar flujos de trabajo para procesos con múltiples firmantes
7. Crear sistema de notificaciones para solicitudes de firma

### Ticket #DM-10: Sistema de Permisos Granulares para Documentos

**Título:** Implementar sistema de permisos granulares a nivel de documento

**Descripción:** Desarrollar un sistema avanzado de gestión de permisos que permita asignar accesos a nivel individual de documento, superando las limitaciones de los niveles generales de acceso, con capacidad para permisos temporales y condicionales.

**Criterios de Aceptación:**
- Permite asignar permisos específicos por documento a usuarios individuales
- Implementa herencia de permisos desde niveles superiores (proyecto, carpeta)
- Soporta permisos temporales con fecha de expiración
- Permite permisos condicionales basados en criterios (IP, hora, dispositivo)
- Implementa grupos de permisos para facilitar la gestión
- Proporciona vista de auditoría de permisos asignados
- Permite delegación controlada de asignación de permisos

**Tareas:**
1. Diseñar e implementar modelo de datos para permisos granulares
2. Desarrollar sistema de evaluación de permisos en tiempo real
3. Crear interfaz para gestión de permisos a nivel de documento
4. Implementar sistema de herencia y anulación de permisos
5. Desarrollar mecanismo de permisos temporales y condicionales
6. Crear sistema de auditoría de permisos
7. Implementar pruebas de seguridad y rendimiento

## Matriz de Casos de Uso por Rol de Usuario

| Caso de Uso | Visitante | Socio | Inversor | Gestor | Admin |
|-------------|-----------|-------|----------|--------|-------|
| Ver documentos públicos | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver documentos nivel PARTNER | ❌ | ✅ | ✅ | ✅ | ✅ |
| Ver documentos nivel INVESTOR | ❌ | ❌ | ✅* | ✅ | ✅ |
| Ver documentos nivel ADMIN | ❌ | ❌ | ❌ | ✅ | ✅ |
| Descargar documentos (nivel DOWNLOAD+) | ❌ | ✅† | ✅† | ✅ | ✅ |
| Subir documentos | ❌ | ❌ | ❌ | ✅ | ✅ |
| Eliminar documentos | ❌ | ❌ | ❌ | ✅‡ | ✅ |
| Gestionar versiones | ❌ | ❌ | ❌ | ✅ | ✅ |
| Ver estadísticas de documentos | ❌ | ❌ | ❌ | ✅ | ✅ |
| Gestionar permisos | ❌ | ❌ | ❌ | ✅§ | ✅ |

* Solo para proyectos en los que el usuario es inversor
† Según el nivel de seguridad del documento específico
‡ Solo documentos subidos por el mismo gestor
§ Permisos limitados a sus propios proyectos

## Diagrama de Flujo de Acceso a Documentos

```
Usuario solicita documento
    ↓
Verificar autenticación
    ↓
Verificar nivel de acceso
    ├── Si es insuficiente → Mostrar error de permisos
    ↓
Verificar nivel de seguridad
    ├── VIEW_ONLY → Generar URL firmada corta (30 min)
    ├── DOWNLOAD → Generar URL firmada para descarga (5 min)
    ├── PRINT → Generar URL con permisos de impresión
    ├── FULL_ACCESS → Generar URL sin restricciones
    ↓
Registrar acceso (visualización/descarga)
    ↓
Devolver URL al cliente
    ↓
Cliente accede al documento mediante URL firmada
```

## Consideraciones de Implementación

1. **Seguridad**: Implementar comprobaciones de seguridad en cada capa (frontend, backend, almacenamiento)
2. **Rendimiento**: Utilizar técnicas de carga progresiva, caché y CDN para documentos frecuentemente accedidos
3. **Escalabilidad**: Diseñar para volúmenes crecientes de documentos y usuarios
4. **Cumplimiento**: Asegurar que el sistema cumple con regulaciones relevantes (GDPR, LOPD, etc.)
5. **Auditoría**: Mantener registros completos de todas las operaciones para análisis de seguridad
6. **Recuperación**: Implementar sistemas de respaldo y recuperación para casos de fallo
7. **Abstracción**: Mantener capa de abstracción sobre Cloudinary para facilitar cambio futuro de proveedor

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|------------|---------|------------|
| Fallo del proveedor (Cloudinary) | Baja | Alto | Implementar sistema de respaldo local o segundo proveedor |
| Filtración de documentos sensibles | Baja | Crítico | URLs firmadas, caducidad corta, auditoría de accesos, marcas de agua |
| Sobrecarga del sistema | Media | Alto | Implementar caching, procesamiento asíncrono y escalado automático |
| Tipos de archivo maliciosos | Media | Alto | Verificación exhaustiva, sandboxing, análisis de malware |
| Ataques de fuerza bruta | Alta | Medio | Rate limiting, tokens de acceso complejos, expiración corta |
| Crecimiento excesivo de almacenamiento | Alta | Medio | Políticas de retención, compresión, eliminación automática de temporales |

## Plan de Pruebas

Para cada ticket, se deben implementar como mínimo:

1. **Pruebas unitarias**: Cobertura >80% del código
2. **Pruebas de integración**: Verificar interacción entre componentes
3. **Pruebas de seguridad**: Penetration testing para cada nueva funcionalidad
4. **Pruebas de rendimiento**: Verificar comportamiento bajo carga
5. **Pruebas de regresión**: Asegurar que nuevas funcionalidades no rompen existentes
6. **Pruebas de usabilidad**: Verificar experiencia de usuario con diferentes roles
7. **Pruebas de recuperación**: Comprobar comportamiento ante fallos

## Estimación y Priorización

| Ticket | Prioridad | MVP | Orden | Estimación (días) | Dependencias |
|--------|-----------|-----|-------|-------------------|-------------|
| DM-01: Servicio de Almacenamiento | Alta | ✅ | 1 | 5 | - |
| DM-02: Visor Seguro | Alta | ✅ | 2 | 7 | DM-01 |
| DM-03: Descarga Controlada | Alta | ✅ | 3 | 5 | DM-01 |
| DM-04: Carga por Lotes | Media | ❌ | - | 6 | DM-01 |
| DM-05: Control de Versiones | Media | ❌ | - | 8 | DM-01, DM-02 |
| DM-06: Búsqueda Avanzada | Media | ❌ | - | 10 | DM-01 |
| DM-07: Análisis y Estadísticas | Baja | ❌ | - | 7 | DM-01, DM-02, DM-03 |
| DM-08: Retención y Archivo | Baja | ❌ | - | 6 | DM-01, DM-05 |
| DM-09: Firma Digital | Baja | ❌ | - | 12 | DM-01, DM-02 |
| DM-10: Permisos Granulares | Media | ❌ | - | 9 | DM-01 | 