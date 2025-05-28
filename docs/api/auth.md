# API de Autenticación y Registro

Este documento describe los endpoints disponibles para autenticación, registro y gestión de invitaciones en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Iniciar sesión

Permite a un usuario autenticarse en la plataforma y obtener un token JWT.

```
POST /auth/login
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| email      | string | Sí        | Correo electrónico del usuario            |
| password   | string | Sí        | Contraseña del usuario                    |

#### Cabeceras requeridas

```
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Email and password are required"
}
```

**401 Unauthorized**

```json
{
  "message": "Invalid credentials"
}
```

**500 Internal Server Error**

```json
{
  "message": "An internal server error occurred"
}
```

---

### Validar token de invitación

Verifica si un token de invitación es válido antes de registrarse.

```
GET /auth/invitation/:token
```

#### Parámetros de URL

| Parámetro  | Descripción            |
|------------|------------------------|
| token      | Token de invitación    |

#### Respuesta exitosa (200 OK)

```json
{
  "status": "valid",
  "email": "usuario@ejemplo.com"
}
```

#### Respuestas de error

**404 Not Found**

```json
{
  "status": "invalid",
  "message": "Invitation token not found."
}
```

**410 Gone**

```json
{
  "status": "invalid",
  "message": "Invitation token already used."
}
```

**410 Gone**

```json
{
  "status": "invalid",
  "message": "Invitation token already expired."
}
```

**400 Bad Request**

```json
{
  "status": "invalid",
  "message": "Invitation token is required."
}
```

**500 Internal Server Error**

```json
{
  "message": "An internal server error occurred while validating the invitation."
}
```

---

### Registro de usuario

Permite a un usuario registrarse en la plataforma utilizando un token de invitación.

```
POST /auth/register
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| firstName  | string | Sí        | Nombre del usuario                        |
| lastName   | string | Sí        | Apellido del usuario                      |
| email      | string | Sí        | Correo electrónico del usuario            |
| password   | string | Sí        | Contraseña del usuario                    |
| token      | string | Sí        | Token de invitación                       |

#### Cabeceras requeridas

```
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "message": "Registration successful.",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@ejemplo.com",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "role": "partner"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "All fields are required: firstName, lastName, email, password, and invitation token."
}
```

**400 Bad Request**

```json
{
  "message": "The email does not match the invitation."
}
```

**400 Bad Request**

```json
{
  "message": "Password must be at least 8 characters long."
}
```

**404 Not Found**

```json
{
  "message": "Invitation token not found."
}
```

**409 Conflict**

```json
{
  "message": "A user with this email already exists."
}
```

**410 Gone**

```json
{
  "message": "Invitation token has already been used."
}
```

**410 Gone**

```json
{
  "message": "Invitation token has expired."
}
```

**500 Internal Server Error**

```json
{
  "message": "An error occurred during registration."
}
```

---

### Crear invitación (solo gestores)

Permite a un gestor crear una invitación para un nuevo usuario.

```
POST /invitations
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| email      | string | Sí        | Correo electrónico del invitado           |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "message": "Invitation created and email sent successfully.",
  "invitationId": "550e8400-e29b-41d4-a716-446655440000",
  "token": "abc123def456ghi789"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Email is required in the request body."
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

**409 Conflict**

```json
{
  "message": "An active invitation already exists for this email."
}
```

**500 Internal Server Error**

```json
{
  "message": "Failed to create invitation."
}
```

---

### Listar invitaciones (solo gestores)

Permite a un gestor obtener una lista de todas las invitaciones enviadas.

```
GET /invitations
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario1@ejemplo.com",
    "token": "abc123def456ghi789",
    "status": "pending",
    "expiresAt": "2025-05-15T12:00:00.000Z",
    "createdAt": "2025-05-01T12:00:00.000Z",
    "updatedAt": "2025-05-01T12:00:00.000Z",
    "inviter": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "firstName": "Admin",
      "lastName": "User"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "email": "usuario2@ejemplo.com",
    "token": "jkl012mno345pqr678",
    "status": "used",
    "expiresAt": "2025-05-15T12:00:00.000Z",
    "createdAt": "2025-05-01T12:00:00.000Z",
    "updatedAt": "2025-05-02T12:00:00.000Z",
    "inviter": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "firstName": "Admin",
      "lastName": "User"
    }
  }
]
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
  "message": "Failed to fetch invitations."
}
``` 