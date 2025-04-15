# 🎟️ Tickets de Trabajo — MVP Plataforma de Inversión Inmobiliaria

Este documento recoge todos los tickets necesarios para desarrollar el MVP de la plataforma de inversión inmobiliaria privada, organizada por módulos funcionales y siguiendo buenas prácticas.

---

## 🧩 Módulo: Gestión de Acceso y Usuarios

### 🎫 Backend: Envío de Invitaciones a Nuevos Socios
**Título:** Endpoint para envío de invitaciones a futuros socios  
**Descripción:** Crear un endpoint seguro para que los gestores puedan invitar nuevos socios vía email. La invitación contiene un token único con expiración.

**Criterios de Aceptación:**
- Token generado correctamente
- Enlace enviado por email
- Token con expiración de 72h

**Prioridad:** Must  
**Estimación:** 5 puntos  
**Etiquetas:** Backend, Seguridad, Acceso

---

### 🎫 Frontend: Registro de Nuevos Socios mediante Invitación
**Título:** Formulario de Registro accesible desde invitación  
**Descripción:** Crear un formulario de registro que solo es accesible si el usuario tiene una invitación válida con token.

**Criterios de Aceptación:**
- Token válido permite registro
- Token inválido muestra error
- Redirección a login tras registro exitoso

**Prioridad:** Must  
**Estimación:** 3 puntos  
**Etiquetas:** Frontend, Registro

---

### 🎫 Base de Datos: Estructura para Invitaciones
**Título:** Tabla de invitaciones  
**Descripción:** Crear tabla `invitations` con campos necesarios: email, token, expiración, estado.

**Prioridad:** Must  
**Estimación:** 2 puntos  
**Etiquetas:** Base de Datos

---

## 🧩 Módulo: Visualización de Oportunidades

### 🎫 Backend: API de Oportunidades (Zona Privada)
**Título:** Endpoint de detalle de oportunidad  
**Descripción:** Permitir acceso a los detalles de oportunidades solo si el usuario es socio.

**Criterios de Aceptación:**
- Verificación de permisos
- Respuesta con información detallada

**Prioridad:** Must  
**Estimación:** 5 puntos  
**Etiquetas:** Backend, Seguridad

---

### 🎫 Base de Datos: Modelo de Oportunidades
**Título:** Tabla de oportunidades  
**Descripción:** Crear tabla `opportunities` con campos como: título, resumen, ROI, video, PDF, estado.

**Prioridad:** Must  
**Estimación:** 3 puntos  
**Etiquetas:** Base de Datos

---

### 🎫 Frontend: Listado de Oportunidades (Zona Socios)
**Título:** Vista con oportunidades activas  
**Descripción:** Mostrar en zona de socios un listado con las oportunidades actuales.

**Criterios de Aceptación:**
- Accesible solo a socios
- Botón de ver detalle

**Prioridad:** Must  
**Estimación:** 5 puntos  
**Etiquetas:** Frontend, UI, Oportunidades

---

### 🎫 Frontend: Vista Pública Resumida de Oportunidades
**Título:** Listado simplificado sin datos sensibles  
**Descripción:** Vista pública con información básica (título, imagen).

**Prioridad:** Should  
**Estimación:** 3 puntos  
**Etiquetas:** Frontend, Público

---

## 🧩 Módulo: Interacción y Proceso de Inversión

### 🎫 Backend: Expresar Interés en Oportunidad
**Título:** Endpoint "Me Interesa"  
**Descripción:** Permitir a los socios expresar interés en una oportunidad.

**Criterios de Aceptación:**
- Asocia usuario con oportunidad
- Evita duplicados

**Prioridad:** Must  
**Estimación:** 3 puntos  
**Etiquetas:** Backend

---

### 🎫 Backend: Registro de Intención de Inversión
**Título:** Endpoint "Invierto" con importe  
**Descripción:** Permitir que el socio indique cuánto quiere invertir en una oportunidad.

**Criterios de Aceptación:**
- Verifica importe mínimo
- Informa al gestor

**Prioridad:** Must  
**Estimación:** 5 puntos  
**Etiquetas:** Backend, Proceso

---

### 🎫 Base de Datos: Modelo de Interés e Inversión
**Título:** Tablas para intereses e inversiones  
**Descripción:** Crear dos tablas: `interests` y `investments`, enlazadas con usuarios y oportunidades.

**Prioridad:** Must  
**Estimación:** 4 puntos  
**Etiquetas:** Base de Datos

---

## 🧩 Módulo: Seguimiento del Proyecto

### 🎫 Backend: Subida Semanal de Informes
**Título:** Endpoint para subir informe de seguimiento  
**Descripción:** Permitir a gestores subir informe semanal (PDF/Video).

**Prioridad:** Must  
**Estimación:** 3 puntos  
**Etiquetas:** Backend, Archivo

---

### 🎫 Frontend: Visualización de Informes Semanales
**Título:** Sección de informes para inversores  
**Descripción:** Interfaz para que los inversores vean los informes subidos.

**Prioridad:** Must  
**Estimación:** 3 puntos  
**Etiquetas:** Frontend

---

### 🎫 Backend: Streaming de Obra
**Título:** Integración de video en vivo desde obra  
**Descripción:** Integrar URL de video en vivo para mostrarlo a inversores.

**Prioridad:** Should  
**Estimación:** 5 puntos  
**Etiquetas:** Backend, Streaming

---

### 🎫 Frontend: Visualización del Streaming
**Título:** Componente para mostrar video en vivo  
**Descripción:** Mostrar correctamente el video de seguimiento de la obra.

**Prioridad:** Should  
**Estimación:** 3 puntos  
**Etiquetas:** Frontend, Video

---

## 🧩 Módulo: Seguridad y Control de Documentación

### 🎫 Backend: Protección de Documentos Legales
**Título:** Endpoint con restricción de descarga  
**Descripción:** Permitir solo visualización de PDF sin opción de descarga.

**Prioridad:** Must  
**Estimación:** 5 puntos  
**Etiquetas:** Backend, Seguridad, Archivos

---

### 🎫 Frontend: Visualización de Documentos
**Título:** Visor embebido de PDFs sin descarga  
**Descripción:** Implementar visor en frontend que no permita descargar el archivo.

**Prioridad:** Must  
**Estimación:** 4 puntos  
**Etiquetas:** Frontend, Documentos

---

> ✅ Total estimado del MVP: Aproximadamente 70-75 puntos de historia
> 
> 🧪 Incluye tests básicos, validaciones y diseño mínimo viable de interfaz
> 
> 📦 Modularidad: Cada módulo puede desplegarse de forma incremental

