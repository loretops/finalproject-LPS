# API de Logs

Este documento describe los endpoints disponibles para el registro de logs y errores en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Registrar error del cliente

Permite a las aplicaciones cliente registrar errores para monitorización y debugging.

```
POST /logs/errors
```

#### Parámetros de cuerpo (JSON)

| Parámetro  | Tipo   | Requerido | Descripción                                |
|------------|--------|-----------|-------------------------------------------|
| message    | string | Sí        | Mensaje de error                           |
| stack      | string | No        | Stack trace del error                      |
| url        | string | No        | URL donde ocurrió el error                 |
| userAgent  | string | No        | User agent del navegador                   |
| timestamp  | string | No        | Timestamp del error (ISO 8601)            |
| level      | string | No        | Nivel del error (error, warning, info)    |
| metadata   | object | No        | Información adicional del contexto         |

#### Cabeceras requeridas

```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Respuesta exitosa (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Error registrado correctamente",
  "timestamp": "2025-05-15T10:30:00.000Z"
}
```

#### Ejemplo de petición

```json
{
  "message": "TypeError: Cannot read property 'id' of undefined",
  "stack": "TypeError: Cannot read property 'id' of undefined\n    at ProjectCard.jsx:45:12\n    at renderWithHooks (react-dom.development.js:15486:18)",
  "url": "https://coopco.vercel.app/projects",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "timestamp": "2025-05-15T10:30:00.000Z",
  "level": "error",
  "metadata": {
    "component": "ProjectCard",
    "props": {
      "projectId": "550e8400-e29b-41d4-a716-446655440002"
    },
    "userId": "550e8400-e29b-41d4-a716-446655440001"
  }
}
```

#### Respuestas de error

**400 Bad Request**

```json
{
  "message": "El mensaje de error es requerido"
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
  "message": "Demasiadas solicitudes de logging. Intenta de nuevo más tarde."
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al registrar el log",
  "error": "Detalles del error"
}
```

## Notas Técnicas

### Niveles de Log

| Nivel   | Descripción                                    |
|---------|------------------------------------------------|
| error   | Errores críticos que afectan la funcionalidad |
| warning | Advertencias que no bloquean la operación     |
| info    | Información general para debugging             |

### Rate Limiting

- Límite de **100 logs por minuto** por usuario
- Límite de **1000 logs por hora** por dirección IP
- Los logs duplicados (mismo mensaje y stack) se agrupan automáticamente

### Almacenamiento

- Los logs se almacenan en la base de datos para análisis
- Los logs más antiguos de **30 días** se archivan automáticamente
- Los logs críticos se envían a servicios de monitorización externos

### Privacidad

- Los logs no deben contener información sensible (contraseñas, tokens)
- Los datos personales se enmascaran automáticamente
- Solo los administradores pueden acceder a los logs completos

### Metadata Recomendada

Para facilitar el debugging, se recomienda incluir en metadata:

```json
{
  "component": "NombreDelComponente",
  "action": "accion_que_se_ejecutaba",
  "userId": "id_del_usuario",
  "sessionId": "id_de_sesion",
  "buildVersion": "version_del_build",
  "environment": "production|development"
}
``` 