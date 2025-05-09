# Guía de Uso: Middleware de Verificación de Roles

Esta guía explica cómo usar el middleware de verificación de roles en tu API para proteger rutas según los permisos del usuario.

## Conceptos Básicos

El sistema de autenticación y autorización del proyecto se compone de dos middlewares:

1. **`jwtAuthMiddleware`**: Verifica el token JWT y agrega información del usuario a `req.user`
2. **`roleAuthMiddleware`**: Comprueba si el usuario tiene el rol requerido para acceder a la ruta

## Cómo Usar el Middleware de Roles

### Importar los Middleware Necesarios

```javascript
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');
```

### Proteger una Ruta para un Solo Rol

```javascript
// Ejemplo: Solo managers pueden crear invitaciones
router.post(
  '/invitations', 
  jwtAuthMiddleware,            // Primero verifica la autenticación
  roleAuthMiddleware('manager'), // Luego verifica el rol específico
  invitationController.create    // Si ambas pasan, ejecuta el controlador
);
```

### Proteger una Ruta para Múltiples Roles

```javascript
// Ejemplo: Partners y managers pueden ver proyectos
router.get(
  '/projects',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'manager']),
  projectController.list
);
```

### Orden de los Middlewares

Es crucial mantener este orden:

1. **Siempre** usa `jwtAuthMiddleware` primero
2. **Luego** usa `roleAuthMiddleware`
3. **Finalmente** ejecuta el controlador o middleware específico de la ruta

## Roles Disponibles en el Sistema

Los roles definidos en el sistema son:

| Rol       | Descripción                           |
|-----------|---------------------------------------|
| visitor   | Usuarios registrados sin invitación   |
| partner   | Socios del club con acceso básico     |
| investor  | Socios que han invertido en proyectos |
| manager   | Gestores con acceso administrativo    |

## Ejemplos para Casos Comunes

### Ejemplo 1: Ruta Solo para Gestores

```javascript
// Crear un nuevo proyecto inmobiliario
router.post(
  '/projects',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  projectController.create
);
```

### Ejemplo 2: Ruta para Socios e Inversores

```javascript
// Ver detalles de una inversión
router.get(
  '/investments/:id',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'investor', 'manager']),
  investmentController.getDetails
);
```

### Ejemplo 3: Ruta Solo para Inversores

```javascript
// Ver documentos legales de inversores
router.get(
  '/projects/:id/legal-documents',
  jwtAuthMiddleware,
  roleAuthMiddleware('investor'),
  projectController.getLegalDocuments
);
```

## Manejo de Errores

El middleware devuelve automáticamente:

- **403 Forbidden**: Cuando el usuario no tiene el rol necesario
- Mensaje claro indicando qué roles son necesarios para la ruta

## Pruebas y Depuración

Para probar el middleware de roles:

1. Obtén un token válido haciendo login con el usuario correcto
2. Usa el token en el header `Authorization: Bearer <token>`
3. Verifica que el acceso se concede o deniega según el rol del usuario

Si encuentras problemas, verifica:

- Que el token sea válido y no haya expirado
- Que el usuario tenga asignado el rol correcto en la base de datos
- Que el middleware de autenticación esté funcionando correctamente

## Buenas Prácticas

- Evita exponer detalles de implementación en los mensajes de error
- Usa roles específicos para cada tipo de acción (principio de mínimo privilegio)
- Mantén actualizados los tests para cada configuración de roles
- Documenta claramente qué roles son necesarios para cada endpoint 