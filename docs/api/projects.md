# API de Proyectos

Este documento describe los endpoints disponibles para la gestión de proyectos en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Crear un nuevo proyecto (solo gestores)

Permite a un gestor crear un nuevo proyecto en estado de borrador.

```
POST /projects
```

#### Parámetros de cuerpo (JSON)

| Parámetro       | Tipo   | Requerido | Descripción                                    |
|-----------------|--------|-----------|------------------------------------------------|
| title           | string | Sí        | Título del proyecto                            |
| description     | string | Sí        | Descripción detallada del proyecto             |
| propertyType    | string | No        | Tipo de propiedad (residential, commercial)    |
| location        | string | No        | Ubicación del proyecto                         |
| expectedRoi     | number | No        | Retorno de inversión esperado (porcentaje)     |
| targetAmount    | number | No        | Monto objetivo total a recaudar                |
| minimumInvestment | number | No      | Inversión mínima requerida                     |
| images          | array  | No        | URLs de imágenes del proyecto                  |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Residencial Las Palmas",
  "description": "Desarrollo residencial de 20 unidades en zona premium...",
  "propertyType": "residential",
  "location": "Madrid, España",
  "expectedRoi": 12.5,
  "targetAmount": 500000,
  "minimumInvestment": 10000,
  "status": "draft",
  "createdAt": "2025-05-01T10:30:00.000Z",
  "updatedAt": "2025-05-01T10:30:00.000Z",
  "createdBy": "550e8400-e29b-41d4-a716-446655440001",
  "images": []
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Se requieren título y descripción para crear un proyecto"
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

**500 Internal Server Error**

```json
{
  "message": "Error al crear el proyecto",
  "error": "Detalles del error"
}
```

---

### Listar proyectos

Obtiene un listado paginado y filtrado de proyectos.

```
GET /projects
```

#### Parámetros de consulta

| Parámetro     | Tipo   | Requerido | Descripción                                    |
|---------------|--------|-----------|------------------------------------------------|
| status        | string | No        | Filtrar por estado (draft, published, closed)  |
| propertyType  | string | No        | Filtrar por tipo de propiedad                  |
| minRoi        | number | No        | Filtrar por ROI mínimo                         |
| location      | string | No        | Filtrar por ubicación                          |
| page          | number | No        | Número de página (por defecto: 1)              |
| limit         | number | No        | Elementos por página (por defecto: 10)         |
| sortField     | string | No        | Campo para ordenar los resultados              |
| sortDirection | string | No        | Dirección de ordenamiento (asc, desc)          |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Residencial Las Palmas",
      "description": "Desarrollo residencial de 20 unidades en zona premium...",
      "propertyType": "residential",
      "location": "Madrid, España",
      "expectedRoi": 12.5,
      "targetAmount": 500000,
      "minimumInvestment": 10000,
      "status": "published",
      "createdAt": "2025-05-01T10:30:00.000Z",
      "updatedAt": "2025-05-01T12:00:00.000Z",
      "createdBy": "550e8400-e29b-41d4-a716-446655440001",
      "images": ["https://example.com/images/project1.jpg"],
      "creator": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "firstName": "Admin",
        "lastName": "User"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
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

**500 Internal Server Error**

```json
{
  "message": "Error al listar proyectos",
  "error": "Detalles del error"
}
```

---

### Obtener un proyecto específico

Devuelve información detallada de un proyecto específico.

```
GET /projects/:id
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Residencial Las Palmas",
  "description": "Desarrollo residencial de 20 unidades en zona premium...",
  "propertyType": "residential",
  "location": "Madrid, España",
  "expectedRoi": 12.5,
  "targetAmount": 500000,
  "minimumInvestment": 10000,
  "status": "published",
  "createdAt": "2025-05-01T10:30:00.000Z",
  "updatedAt": "2025-05-01T12:00:00.000Z",
  "createdBy": "550e8400-e29b-41d4-a716-446655440001",
  "images": ["https://example.com/images/project1.jpg"],
  "creator": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "firstName": "Admin",
    "lastName": "User"
  },
  "documents": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "title": "Brochure comercial",
      "documentType": "brochure",
      "accessLevel": "public",
      "url": "https://example.com/documents/brochure.pdf",
      "uploadedAt": "2025-05-01T13:00:00.000Z"
    }
  ],
  "interestCount": 5,
  "investmentCount": 3,
  "currentAmount": 250000
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
  "message": "Error al obtener el proyecto",
  "error": "Detalles del error"
}
```

---

### Actualizar un proyecto (solo gestores)

Permite a un gestor actualizar la información de un proyecto existente.

```
PUT /projects/:id
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Parámetros de cuerpo (JSON)

| Parámetro       | Tipo   | Requerido | Descripción                                    |
|-----------------|--------|-----------|------------------------------------------------|
| title           | string | No        | Título del proyecto                            |
| description     | string | No        | Descripción detallada del proyecto             |
| propertyType    | string | No        | Tipo de propiedad (residential, commercial)    |
| location        | string | No        | Ubicación del proyecto                         |
| expectedRoi     | number | No        | Retorno de inversión esperado (porcentaje)     |
| targetAmount    | number | No        | Monto objetivo total a recaudar                |
| minimumInvestment | number | No      | Inversión mínima requerida                     |
| images          | array  | No        | URLs de imágenes del proyecto                  |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Residencial Las Palmas - Fase II",
  "description": "Desarrollo residencial de 20 unidades en zona premium...",
  "propertyType": "residential",
  "location": "Madrid, España",
  "expectedRoi": 13.5,
  "targetAmount": 550000,
  "minimumInvestment": 10000,
  "status": "draft",
  "createdAt": "2025-05-01T10:30:00.000Z",
  "updatedAt": "2025-05-02T15:45:00.000Z",
  "createdBy": "550e8400-e29b-41d4-a716-446655440001",
  "images": ["https://example.com/images/project1.jpg", "https://example.com/images/project2.jpg"]
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "No se han proporcionado datos para actualizar"
}
```

**400 Bad Request**

```json
{
  "message": "Un proyecto publicado no se puede modificar"
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
  "message": "Error al actualizar el proyecto",
  "error": "Detalles del error"
}
```

---

### Publicar un proyecto (solo gestores)

Permite a un gestor cambiar el estado de un proyecto de borrador a publicado.

```
POST /projects/:id/publish
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Residencial Las Palmas",
  "description": "Desarrollo residencial de 20 unidades en zona premium...",
  "propertyType": "residential",
  "location": "Madrid, España",
  "expectedRoi": 12.5,
  "targetAmount": 500000,
  "minimumInvestment": 10000,
  "status": "published",
  "createdAt": "2025-05-01T10:30:00.000Z",
  "updatedAt": "2025-05-01T16:00:00.000Z",
  "publishedAt": "2025-05-01T16:00:00.000Z",
  "createdBy": "550e8400-e29b-41d4-a716-446655440001",
  "images": ["https://example.com/images/project1.jpg"]
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "El proyecto ya está publicado",
  "type": "validation_error"
}
```

**400 Bad Request**

```json
{
  "message": "El proyecto debe tener un documento legal antes de ser publicado",
  "type": "validation_error"
}
```

**400 Bad Request**

```json
{
  "message": "Se requiere especificar la inversión mínima y el monto objetivo",
  "type": "validation_error"
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
  "message": "Proyecto no encontrado",
  "type": "not_found_error"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al publicar el proyecto",
  "error": "Detalles del error",
  "type": "server_error"
}
```

---

### Añadir documento a un proyecto (solo gestores)

Permite añadir un documento a un proyecto existente.

```
POST /projects/:id/documents
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del proyecto   |

#### Parámetros de cuerpo (JSON)

| Parámetro    | Tipo   | Requerido | Descripción                                          |
|--------------|--------|-----------|------------------------------------------------------|
| documentType | string | Sí        | Tipo de documento (legal, brochure, financial, etc.) |
| accessLevel  | string | Sí        | Nivel de acceso (public, partners_only, managers)    |
| title        | string | No        | Título descriptivo del documento                     |
| file         | file   | Sí        | Archivo a subir                                      |

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
  "url": "https://example.com/documents/brochure.pdf",
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