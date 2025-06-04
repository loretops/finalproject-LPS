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

## 📊 Estimación Total

**Total de puntos:** 13 puntos

## 🗓️ Plan de desarrollo sugerido

1. Iniciar con el Ticket #52 (Modelo de datos) como base de toda la funcionalidad.
2. Continuar con el Ticket #53 (Servicio backend) una vez el modelo esté listo.
3. Desarrollar el Ticket #55 (Plantillas de email) en paralelo, ya que no tiene dependencias directas.
4. Implementar el Ticket #54 (API Endpoints) cuando el servicio esté completado.
5. Proceder con el Ticket #56 (Página de verificación frontend) una vez los endpoints estén disponibles.
6. Finalizar con el Ticket #57 (Componentes UI) para integrar la funcionalidad en toda la plataforma.

## 🧪 Pruebas

Para cada ticket se deben implementar pruebas específicas, incluyendo:

1. **Tests unitarios** para modelos y servicios.
2. **Tests de integración** para endpoints API.
3. **Tests de componentes** para elementos de UI.
4. **Tests end-to-end** para el flujo completo de verificación.

## 📚 Referencias y recursos

- [Documentación de Express.js](https://expressjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Guía de diseño de emails HTML](https://www.campaignmonitor.com/dev-resources/guides/coding-html-emails/)
- [Mejores prácticas para verificación de email](https://postmarkapp.com/guides/password-reset-email-best-practices) 