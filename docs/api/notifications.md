# API de Notificaciones

Este documento describe los endpoints disponibles para gestionar notificaciones en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Obtener notificaciones del usuario

Devuelve un listado de notificaciones para el usuario autenticado.

```
GET /notifications
```

#### Parámetros de consulta

| Parámetro  | Tipo    | Requerido | Descripción                                |
|------------|---------|-----------|-------------------------------------------|
| unreadOnly | boolean | No        | Si es true, solo devuelve notificaciones no leídas (por defecto: false) |
| limit      | number  | No        | Número máximo de notificaciones a devolver (por defecto: 10) |

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
      "title": "Nuevo proyecto disponible",
      "message": "Se ha publicado un nuevo proyecto que podría interesarte: Residencial Las Palmas",
      "type": "new_project",
      "isRead": false,
      "createdAt": "2025-05-15T08:30:00.000Z",
      "metadata": {
        "projectId": "550e8400-e29b-41d4-a716-446655440002"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Tu interés ha sido registrado",
      "message": "Has mostrado interés en el proyecto Residencial Las Palmas",
      "type": "interest_registered",
      "isRead": true,
      "createdAt": "2025-05-10T14:45:00.000Z",
      "metadata": {
        "projectId": "550e8400-e29b-41d4-a716-446655440002",
        "interestId": "550e8400-e29b-41d4-a716-446655440004"
      }
    }
  ],
  "unreadCount": 1,
  "totalCount": 2
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
  "message": "Error al obtener notificaciones",
  "error": "Detalles del error"
}
```

---

### Marcar notificación como leída

Marca una notificación específica como leída.

```
PATCH /notifications/:notificationId/read
```

#### Parámetros de URL

| Parámetro     | Descripción               |
|---------------|---------------------------|
| notificationId | ID UUID de la notificación |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Nuevo proyecto disponible",
  "message": "Se ha publicado un nuevo proyecto que podría interesarte: Residencial Las Palmas",
  "type": "new_project",
  "isRead": true,
  "createdAt": "2025-05-15T08:30:00.000Z",
  "updatedAt": "2025-05-15T09:20:00.000Z",
  "metadata": {
    "projectId": "550e8400-e29b-41d4-a716-446655440002"
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

**404 Not Found**

```json
{
  "message": "Notificación no encontrada"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al marcar notificación como leída",
  "error": "Detalles del error"
}
```

---

### Marcar todas las notificaciones como leídas

Marca todas las notificaciones del usuario como leídas.

```
PATCH /notifications/read-all
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "count": 5
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
  "message": "Error al marcar notificaciones como leídas",
  "error": "Detalles del error"
}
```

---

### Eliminar notificación

Elimina una notificación específica.

```
DELETE /notifications/:notificationId
```

#### Parámetros de URL

| Parámetro     | Descripción               |
|---------------|---------------------------|
| notificationId | ID UUID de la notificación |

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

**404 Not Found**

```json
{
  "message": "Notificación no encontrada"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al eliminar notificación",
  "error": "Detalles del error"
}
``` 