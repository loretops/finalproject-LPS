# API de Verificación de Email

Este documento describe los endpoints disponibles para la verificación de correo electrónico en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Verificar estado de verificación del usuario

Verifica si el email del usuario autenticado está verificado.

```
GET /verification/status
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "isVerified": true,
  "email": "usuario@ejemplo.com"
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
  "message": "Error al verificar el estado de verificación",
  "error": "Detalles del error"
}
```

---

### Enviar email de verificación

Envía un email de verificación al usuario autenticado.

```
POST /verification/send
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "message": "Email de verificación enviado correctamente",
  "email": "usuario@ejemplo.com"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "El email ya está verificado"
}
```

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**429 Too Many Requests**

```json
{
  "message": "Demasiadas solicitudes de verificación. Intenta de nuevo más tarde."
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al enviar email de verificación",
  "error": "Detalles del error"
}
```

---

### Verificar email con token

Verifica el email del usuario utilizando un token de verificación.

```
GET /verification/verify/:token
```

#### Parámetros de URL

| Parámetro  | Descripción                     |
|------------|---------------------------------|
| token      | Token de verificación de email  |

#### Respuesta exitosa (200 OK)

```json
{
  "message": "Email verificado correctamente",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@ejemplo.com",
    "isVerified": true
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Token de verificación requerido"
}
```

**404 Not Found**

```json
{
  "message": "Token de verificación no válido o expirado"
}
```

**409 Conflict**

```json
{
  "message": "El email ya está verificado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al verificar el email",
  "error": "Detalles del error"
}
```

---

### Reenviar email de verificación

Reenvía un email de verificación a una dirección específica.

```
POST /verification/resend
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| email      | string | Sí        | Correo electrónico para reenviar verificación |

#### Cabeceras requeridas

```
Content-Type: application/json
```

#### Respuesta exitosa (200 OK)

```json
{
  "message": "Email de verificación reenviado correctamente",
  "email": "usuario@ejemplo.com"
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "Email requerido"
}
```

**400 Bad Request**

```json
{
  "message": "El email ya está verificado"
}
```

**404 Not Found**

```json
{
  "message": "Usuario no encontrado"
}
```

**429 Too Many Requests**

```json
{
  "message": "Demasiadas solicitudes de verificación. Intenta de nuevo más tarde."
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al reenviar email de verificación",
  "error": "Detalles del error"
}
```

## Notas Técnicas

### Tokens de Verificación

- Los tokens de verificación tienen una validez de **24 horas**
- Cada token solo puede ser utilizado **una vez**
- Los tokens son generados usando `crypto.randomBytes(32)` para máxima seguridad
- Los tokens expirados se eliminan automáticamente de la base de datos

### Rate Limiting

- Las rutas de verificación tienen protección contra spam
- Límite de **3 solicitudes por minuto** por usuario
- Límite de **10 solicitudes por hora** por dirección IP

### Seguridad

- Los emails de verificación incluyen enlaces seguros con tokens únicos
- Los tokens se almacenan hasheados en la base de datos
- Las verificaciones exitosas invalidan automáticamente todos los tokens pendientes del usuario 