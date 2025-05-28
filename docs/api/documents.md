# API de Gestión de Documentos

Este documento describe los endpoints disponibles para gestionar documentos en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Añadir documento a un proyecto (solo gestores)

Permite a un gestor subir un documento asociado a un proyecto.

```
POST /projects/:id/documents
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Parámetros de cuerpo (multipart/form-data)

| Parámetro    | Tipo   | Requerido | Descripción                                          |
|--------------|--------|-----------|------------------------------------------------------|
| file         | file   | Sí        | Archivo a subir                                      |
| documentType | string | Sí        | Tipo de documento (legal, brochure, financial, etc.) |
| accessLevel  | string | Sí        | Nivel de acceso (public, partners_only, managers)    |
| title        | string | No        | Título descriptivo del documento                     |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

#### Respuesta exitosa (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "projectId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Brochure comercial",
  "documentType": "brochure",
  "accessLevel": "public",
  "url": "https://cloudinary.example.com/v1/projects/documents/abcdef123456.pdf",
  "uploadedAt": "2025-05-01T13:00:00.000Z",
  "uploadedBy": "550e8400-e29b-41d4-a716-446655440001"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Se requieren tipo de documento y nivel de acceso"
}
```

**400 Bad Request**

```json
{
  "message": "No se ha proporcionado ningún archivo"
}
```

**400 Bad Request**

```json
{
  "message": "Formato de archivo no soportado"
}
```

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para realizar esta acción"
}
```

**404 Not Found**

```json
{
  "message": "Proyecto no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al añadir documento al proyecto",
  "error": "Detalles del error"
}
```

---

### Obtener documentos de un proyecto

Devuelve una lista de documentos asociados a un proyecto específico, filtrados según el nivel de acceso del usuario.

```
GET /projects/:id/documents
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Parámetros de consulta

| Parámetro    | Tipo   | Requerido | Descripción                                          |
|--------------|--------|-----------|------------------------------------------------------|
| documentType | string | No        | Filtrar por tipo de documento                        |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "projectId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Brochure comercial",
      "documentType": "brochure",
      "accessLevel": "public",
      "url": "https://cloudinary.example.com/v1/projects/documents/abcdef123456.pdf",
      "uploadedAt": "2025-05-01T13:00:00.000Z",
      "uploadedBy": "550e8400-e29b-41d4-a716-446655440001"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "projectId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Informe financiero",
      "documentType": "financial",
      "accessLevel": "partners_only",
      "url": "https://cloudinary.example.com/v1/projects/documents/ghijkl789012.pdf",
      "uploadedAt": "2025-05-02T14:30:00.000Z",
      "uploadedBy": "550e8400-e29b-41d4-a716-446655440001"
    }
  ]
}
```

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para realizar esta acción"
}
```

**404 Not Found**

```json
{
  "message": "Proyecto no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener documentos del proyecto",
  "error": "Detalles del error"
}
```

---

### Descargar un documento

Permite descargar un documento específico si el usuario tiene acceso.

```
GET /documents/:id/download
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del documento  |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

*Descarga directa del archivo*

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para acceder a este documento"
}
```

**404 Not Found**

```json
{
  "message": "Documento no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al descargar el documento",
  "error": "Detalles del error"
}
```

---

### Eliminar un documento (solo gestores)

Permite a un gestor eliminar un documento existente.

```
DELETE /documents/:id
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del documento  |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (204 No Content)

*No hay cuerpo en la respuesta*

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para eliminar este documento"
}
```

**404 Not Found**

```json
{
  "message": "Documento no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al eliminar el documento",
  "error": "Detalles del error"
}
```

---

### Actualizar metadatos de un documento (solo gestores)

Permite a un gestor actualizar los metadatos de un documento existente (título, tipo, nivel de acceso).

```
PATCH /documents/:id
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del documento  |

#### Parámetros de cuerpo (JSON)

| Parámetro    | Tipo   | Requerido | Descripción                                          |
|--------------|--------|-----------|------------------------------------------------------|
| title        | string | No        | Nuevo título del documento                           |
| documentType | string | No        | Nuevo tipo de documento                              |
| accessLevel  | string | No        | Nuevo nivel de acceso                                |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "projectId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Brochure comercial actualizado",
  "documentType": "brochure",
  "accessLevel": "partners_only",
  "url": "https://cloudinary.example.com/v1/projects/documents/abcdef123456.pdf",
  "uploadedAt": "2025-05-01T13:00:00.000Z",
  "updatedAt": "2025-05-03T09:15:00.000Z",
  "uploadedBy": "550e8400-e29b-41d4-a716-446655440001"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "No se han proporcionado datos para actualizar"
}
```

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para actualizar este documento"
}
```

**404 Not Found**

```json
{
  "message": "Documento no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al actualizar el documento",
  "error": "Detalles del error"
}
``` 