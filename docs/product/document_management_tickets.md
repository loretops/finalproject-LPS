# Gestión de Documentos - Tickets Detallados

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