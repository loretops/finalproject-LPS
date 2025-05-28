# Servicio de Almacenamiento de Documentos: Arquitectura y Seguridad

Esta documentación técnica describe la implementación interna del Servicio de Almacenamiento de Documentos para el proyecto COOPCO, enfocándose en la arquitectura, lógica de negocio y consideraciones de seguridad. Para la configuración básica de Cloudinary, consulte [Configuración de Cloudinary](../deployment/cloudinary_setup.md).

## Descripción General

El servicio implementa las siguientes funcionalidades:

- Subida de archivos (documentos, imágenes, videos)
- Optimización automática de imágenes
- Asignación de metadatos (tipo de documento, nivel de acceso, etc.)
- Almacenamiento seguro de archivos
- Generación de URLs para acceso a archivos
- Registro de visualizaciones de documentos
- Eliminación de documentos

## Estructura de la Implementación

La implementación sigue una arquitectura por capas:

```
backend/
├── interfaces/          # Interfaces y contratos
│   └── storage/
│       └── StorageInterface.js
├── infrastructure/      # Implementación concreta
│   └── external/
│       └── storage/
│           └── LocalStorageService.js
├── domain/              # Lógica de negocio
│   └── services/
│       └── ProjectDocumentService.js
├── application/         # Capa de aplicación (API)
│   ├── controllers/
│   │   └── ProjectDocumentController.js
│   └── routes/
│       └── projectDocumentRoutes.js
├── middleware/          # Middleware
│   └── uploadMiddleware.js
├── utils/               # Utilidades
│   └── storageConfig.js
└── public/              # Archivos estáticos
    └── uploads/         # Directorio de almacenamiento para desarrollo
        ├── documents/
        ├── images/
        └── thumbnails/
```

## Configuración

### Tipos de Archivos Permitidos

El sistema está configurado para aceptar diferentes tipos de archivos, con restricciones de tamaño:

- **Documentos**: PDF, Word, Excel, PowerPoint, texto plano (máx. 10MB)
- **Imágenes**: JPEG, PNG, GIF, WebP, SVG (máx. 5MB)
- **Videos**: MP4, MPEG, MOV, AVI, WMV (máx. 100MB)

La configuración se encuentra en `utils/storageConfig.js`.

### Tipos de Documentos de Proyecto

Los documentos pueden clasificarse en los siguientes tipos:

- `legal`: Documentos legales del proyecto
- `financial`: Documentos financieros
- `technical`: Documentos técnicos
- `marketing`: Material de marketing
- `image`: Imágenes del proyecto
- `video`: Videos del proyecto
- `other`: Otros tipos de documentos

### Niveles de Acceso

Los documentos tienen diferentes niveles de acceso:

- `public`: Visible para cualquier persona
- `partner`: Solo para socios registrados
- `investor`: Solo para inversores en el proyecto
- `admin`: Solo para administradores y gestores

### Niveles de Seguridad

Se definen varios niveles de seguridad para los documentos:

- `view_only`: Solo visualización en navegador
- `download`: Permite descargar el archivo
- `print`: Permite imprimir
- `full_access`: Acceso completo

## Uso del Servicio

### API Endpoints

#### Subir un Documento

```
POST /api/projects/:projectId/documents
```

**Headers requeridos:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Parámetros de formulario:**
- `document`: Archivo a subir (campo de archivo)
- `documentType`: Tipo de documento (legal, financial, technical, etc.)
- `accessLevel`: Nivel de acceso (public, partner, investor, admin)
- `securityLevel`: Nivel de seguridad (view_only, download, print, full_access)

#### Subir una Imagen

```
POST /api/projects/:projectId/images
```

**Parámetros adicionales:**
- `optimize`: Nivel de optimización (thumbnail, medium, large, original)

#### Obtener Documentos de un Proyecto

```
GET /api/projects/:projectId/documents
```

**Parámetros de consulta (opcionales):**
- `documentType`: Filtrar por tipo de documento
- `accessLevel`: Filtrar por nivel de acceso

#### Obtener un Documento Específico

```
GET /api/documents/:documentId
```

#### Eliminar un Documento

```
DELETE /api/documents/:documentId
```

#### Obtener URL de Acceso a un Documento

```
GET /api/documents/:documentId/access
```

### Ejemplos de Uso

#### Subir un Documento PDF

```javascript
// Cliente JavaScript
const formData = new FormData();
formData.append('document', file); // Archivo del input
formData.append('documentType', 'legal');
formData.append('accessLevel', 'partner');
formData.append('securityLevel', 'view_only');

const response = await fetch(`/api/projects/${projectId}/documents`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const result = await response.json();
```

#### Subir una Imagen Optimizada

```javascript
const formData = new FormData();
formData.append('image', imageFile);
formData.append('documentType', 'image');
formData.append('accessLevel', 'public');
formData.append('optimize', 'medium'); // Optimizar para tamaño mediano

const response = await fetch(`/api/projects/${projectId}/images`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

## Implementaciones de Almacenamiento

### LocalStorageService (Desarrollo)

Para el entorno de desarrollo, se utiliza almacenamiento local en el sistema de archivos. Los archivos se guardan en subdirectorios dentro de `backend/public/uploads/` y se sirven directamente por Express.

### Posibles Implementaciones para Producción

En un entorno de producción, se recomienda implementar alguna de estas alternativas:

- **AWS S3**: Almacenamiento escalable en la nube
- **Google Cloud Storage**: Alternativa de almacenamiento en la nube
- **Azure Blob Storage**: Almacenamiento de objetos en Microsoft Azure

Para implementar un nuevo servicio de almacenamiento, cree una clase que extienda `StorageInterface` e implemente todos sus métodos.

## Consideraciones de Seguridad

- Los archivos subidos se renombran con identificadores únicos
- Se valida el tipo MIME de los archivos antes de procesarlos
- Se implementa límite de tamaño para prevenir ataques DoS
- Las URL firmadas permiten acceso temporal a documentos privados
- Se registran las visualizaciones de documentos para auditoría

## Optimización de Imágenes

El servicio utiliza la biblioteca Sharp para optimizar automáticamente las imágenes:

- Redimensionamiento a diferentes tamaños predefinidos
- Conversión a formato WebP para mejorar compresión
- Control de calidad configurable
- Conservación de relación de aspecto

## Próximos Pasos

Para mejorar el servicio, se recomienda:

1. Implementar almacenamiento en la nube para producción
2. Añadir escaneo de virus para archivos subidos
3. Implementar compresión para documentos PDF
4. Agregar generación de miniaturas para documentos y videos
5. Mejorar la validación de acceso basada en roles y proyectos 