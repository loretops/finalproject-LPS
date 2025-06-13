# API de Inversiones

Este documento describe los endpoints disponibles para gestionar inversiones en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Realizar una inversión en un proyecto

Permite a un socio registrar una nueva inversión en un proyecto.

```
POST /projects/:projectId/invest
```

#### Parámetros de URL

| Parámetro  | Descripción         |
|------------|---------------------|
| projectId  | ID UUID del proyecto |

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| amount     | number | Sí        | Monto a invertir (debe ser mayor que 0)    |
| notes      | string | No        | Notas o comentarios adicionales            |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "message": "Inversión registrada con éxito",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "projectId": "550e8400-e29b-41d4-a716-446655440002",
    "amount": 50000,
    "status": "pending",
    "investedAt": "2025-05-13T12:00:00.000Z",
    "notes": "Mi primera inversión",
    "contractReference": null
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "La inversión debe ser al menos de 10000"
}
```

**400 Bad Request**

```json
{
  "message": "El proyecto no está disponible para inversiones en este momento"
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
  "message": "Error al registrar la inversión",
  "error": "Detalles del error"
}
```

---

### Obtener inversiones del usuario autenticado

Devuelve un listado paginado de las inversiones realizadas por el usuario autenticado.

```
GET /users/me/investments
```

#### Parámetros de consulta

| Parámetro | Tipo   | Requerido | Descripción                                           |
|-----------|--------|-----------|-------------------------------------------------------|
| status    | string | No        | Filtrar por estado (pending, confirmed, rejected, canceled) |
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
      "amount": 50000,
      "status": "pending",
      "investedAt": "2025-05-13T12:00:00.000Z",
      "notes": "Mi primera inversión",
      "contractReference": null,
      "project": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "title": "Proyecto Residencial Las Palmas",
        "expectedRoi": 12.5,
        "targetAmount": 500000,
        "currentAmount": 350000,
        "minimumInvestment": 10000,
        "status": "published"
      }
    }
  ],
  "pagination": {
    "total": 5,
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

**500 Internal Server Error**

```json
{
  "message": "Error al obtener inversiones del usuario",
  "error": "Detalles del error"
}
```

---

### Obtener inversiones de un proyecto (solo gestores)

Devuelve un listado paginado de las inversiones realizadas en un proyecto específico.

```
GET /projects/:projectId/investments
```

#### Parámetros de URL

| Parámetro  | Descripción         |
|------------|---------------------|
| projectId  | ID UUID del proyecto |

#### Parámetros de consulta

| Parámetro | Tipo   | Requerido | Descripción                                           |
|-----------|--------|-----------|-------------------------------------------------------|
| status    | string | No        | Filtrar por estado (pending, confirmed, rejected, canceled) |
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
      "amount": 50000,
      "status": "pending",
      "investedAt": "2025-05-13T12:00:00.000Z",
      "notes": "Mi primera inversión",
      "contractReference": null,
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "firstName": "Ana",
        "lastName": "García",
        "email": "ana.garcia@example.com"
      }
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2
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
  "message": "No tienes permiso para ver inversiones de este proyecto"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener inversiones del proyecto",
  "error": "Detalles del error"
}
```

---

### Obtener detalle de una inversión específica

Devuelve la información detallada de una inversión específica.

```
GET /investments/:investmentId
```

#### Parámetros de URL

| Parámetro    | Descripción         |
|--------------|---------------------|
| investmentId | ID UUID de la inversión |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "projectId": "550e8400-e29b-41d4-a716-446655440002",
    "amount": 50000,
    "status": "pending",
    "investedAt": "2025-05-13T12:00:00.000Z",
    "notes": "Mi primera inversión",
    "contractReference": null,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "firstName": "Ana",
      "lastName": "García",
      "email": "ana.garcia@example.com"
    },
    "project": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Proyecto Residencial Las Palmas",
      "expectedRoi": 12.5,
      "status": "published"
    }
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
  "message": "No tienes permiso para ver esta inversión"
}
```

**404 Not Found**

```json
{
  "message": "Inversión no encontrada"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener detalle de la inversión",
  "error": "Detalles del error"
}
```

---

### Cancelar una inversión

Permite a un socio cancelar una inversión que ha realizado si todavía está en estado "pending".

```
DELETE /investments/:investmentId
```

#### Parámetros de URL

| Parámetro    | Descripción         |
|--------------|---------------------|
| investmentId | ID UUID de la inversión |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "message": "Inversión cancelada con éxito",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "projectId": "550e8400-e29b-41d4-a716-446655440002",
    "amount": 50000,
    "status": "cancelled",
    "investedAt": "2025-05-13T12:00:00.000Z",
    "notes": "Mi primera inversión",
    "contractReference": null
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Solo se pueden cancelar inversiones en estado pendiente"
}
```

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**404 Not Found**

```json
{
  "message": "Inversión no encontrada o no pertenece al usuario"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al cancelar la inversión",
  "error": "Detalles del error"
}
```

---

### Actualizar estado de una inversión (solo gestores)

Permite a un gestor actualizar el estado de una inversión.

```
PATCH /investments/:investmentId/status
```

#### Parámetros de URL

| Parámetro    | Descripción         |
|--------------|---------------------|
| investmentId | ID UUID de la inversión |

#### Parámetros de cuerpo (JSON)

| Parámetro         | Tipo   | Requerido | Descripción                                        |
|-------------------|--------|-----------|---------------------------------------------------|
| status            | string | Sí        | Nuevo estado (pending, confirmed, rejected, canceled) |
| contractReference | string | No        | Referencia del contrato (requerido para 'confirmed') |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "message": "Estado de inversión actualizado con éxito",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "projectId": "550e8400-e29b-41d4-a716-446655440002",
    "amount": 50000,
    "status": "confirmed",
    "investedAt": "2025-05-13T12:00:00.000Z",
    "notes": "Mi primera inversión",
    "contractReference": "CONT-2025-001",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "firstName": "Ana",
      "lastName": "García",
      "email": "ana.garcia@example.com"
    },
    "project": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Proyecto Residencial Las Palmas",
      "expectedRoi": 12.5,
      "status": "published",
      "createdBy": "550e8400-e29b-41d4-a716-446655440003"
    }
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Estado de inversión no válido"
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
  "message": "No tienes permiso para actualizar inversiones"
}
```

**404 Not Found**

```json
{
  "message": "Inversión no encontrada"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al actualizar estado de la inversión",
  "error": "Detalles del error"
}
```

> Nota: Por retrocompatibilidad, el sistema acepta tanto "canceled" como "cancelled", pero internamente se estandariza a "canceled". 