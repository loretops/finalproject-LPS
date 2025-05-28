# API de Intereses

Este documento describe los endpoints disponibles para gestionar intereses en proyectos en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Registrar interés en un proyecto

Permite a un socio registrar su interés en un proyecto específico.

```
POST /interests
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| projectId  | string | Sí        | ID UUID del proyecto                       |
| notes      | string | No        | Notas o comentarios adicionales            |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "projectId": "550e8400-e29b-41d4-a716-446655440002",
  "status": "pending",
  "createdAt": "2025-05-13T12:00:00.000Z",
  "notes": "Me interesa este proyecto, especialmente por su ubicación"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Se requiere el ID del proyecto"
}
```

**400 Bad Request**

```json
{
  "message": "Solo se puede mostrar interés en proyectos publicados"
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

**409 Conflict**

```json
{
  "message": "Ya has mostrado interés en este proyecto"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al registrar interés en el proyecto",
  "error": "Se ha producido un error interno. Por favor, inténtalo de nuevo más tarde."
}
```

---

### Obtener intereses del usuario autenticado

Devuelve un listado de los intereses del usuario autenticado.

```
GET /interests/user
```

#### Parámetros de consulta

| Parámetro | Tipo   | Requerido | Descripción                                           |
|-----------|--------|-----------|-------------------------------------------------------|
| status    | string | No        | Filtrar por estado (pending, contacted, converted, rejected) |
| page      | number | No        | Número de página (por defecto: 1)                     |
| limit     | number | No        | Cantidad de elementos por página (por defecto: 10)    |

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
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "projectId": "550e8400-e29b-41d4-a716-446655440002",
      "status": "pending",
      "createdAt": "2025-05-13T12:00:00.000Z",
      "notes": "Me interesa este proyecto, especialmente por su ubicación",
      "project": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "title": "Proyecto Residencial Las Palmas",
        "expectedRoi": 12.5,
        "location": "Madrid, España",
        "status": "published",
        "images": ["https://example.com/images/project1.jpg"]
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
  "message": "Error al obtener los intereses del usuario",
  "error": "Detalles del error"
}
```

---

### Obtener intereses de un proyecto (solo gestores)

Devuelve un listado de intereses para un proyecto específico.

```
GET /interests/project/:projectId
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| projectId  | ID UUID del proyecto   |

#### Parámetros de consulta

| Parámetro | Tipo   | Requerido | Descripción                                           |
|-----------|--------|-----------|-------------------------------------------------------|
| status    | string | No        | Filtrar por estado (pending, contacted, converted, rejected) |
| page      | number | No        | Número de página (por defecto: 1)                     |
| limit     | number | No        | Cantidad de elementos por página (por defecto: 10)    |

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
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "projectId": "550e8400-e29b-41d4-a716-446655440002",
      "status": "pending",
      "createdAt": "2025-05-13T12:00:00.000Z",
      "notes": "Me interesa este proyecto, especialmente por su ubicación",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "firstName": "Ana",
        "lastName": "García",
        "email": "ana.garcia@example.com"
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

**400 Bad Request**

```json
{
  "message": "Se requiere el ID del proyecto"
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
  "message": "Error al obtener los intereses en el proyecto",
  "error": "Detalles del error"
}
```

---

### Eliminar un interés

Permite a un socio eliminar un interés registrado previamente.

```
DELETE /interests/:id
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del interés    |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (204 No Content)

*No hay cuerpo en la respuesta*

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Se requiere el ID del interés"
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
  "message": "No tienes permiso para eliminar este interés"
}
```

**404 Not Found**

```json
{
  "message": "Interés no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al eliminar el interés",
  "error": "Detalles del error"
}
```

---

### Cambiar estado de un interés (solo gestores)

Permite a un gestor cambiar el estado de un interés.

```
PATCH /interests/:id/status
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| id         | ID UUID del interés    |

#### Parámetros de cuerpo (JSON)

| Parámetro | Tipo   | Requerido | Descripción                                           |
|-----------|--------|-----------|-------------------------------------------------------|
| status    | string | Sí        | Nuevo estado (pending, contacted, converted, rejected) |
| notes     | string | No        | Notas o comentarios adicionales del gestor            |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "projectId": "550e8400-e29b-41d4-a716-446655440002",
  "status": "contacted",
  "createdAt": "2025-05-13T12:00:00.000Z",
  "updatedAt": "2025-05-14T10:30:00.000Z",
  "notes": "Me interesa este proyecto, especialmente por su ubicación",
  "managerNotes": "Contactado por teléfono el 14/05/2025",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "firstName": "Ana",
    "lastName": "García",
    "email": "ana.garcia@example.com"
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Se requieren el ID del interés y el nuevo estado"
}
```

**400 Bad Request**

```json
{
  "message": "Estado no válido. Los valores permitidos son: pending, contacted, converted, rejected"
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
  "message": "No tienes permiso para cambiar el estado de este interés"
}
```

**404 Not Found**

```json
{
  "message": "Interés no encontrado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al cambiar el estado del interés",
  "error": "Detalles del error"
}
``` 