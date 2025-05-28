# Configuración de Variables de Entorno en Render

Para solucionar el problema de CORS entre el frontend en Vercel y el backend en Render, es necesario actualizar las variables de entorno en Render.

## Problema actual

El error CORS indica que la cabecera `Access-Control-Allow-Origin` no coincide con el dominio del frontend en Vercel:

```
Solicitud desde otro origen bloqueada: la política de mismo origen impide leer el recurso remoto en https://coopco-backend.onrender.com/api/auth/login (razón: la cabecera CORS 'Access-Control-Allow-Origin' no coincide con 'https://<tu-frontend>.vercel.app').
```

## Solución

Añade las siguientes variables de entorno en la configuración del backend en Render:

1. Accede al Dashboard de Render
2. Selecciona el servicio del backend
3. Ve a "Environment" o "Variables de Entorno"
4. Añade las siguientes variables:

| Variable | Valor |
|----------|-------|
| `FRONTEND_URL` | `https://coopco.vercel.app` (o el dominio específico de tu frontend) |
| `CORS_ORIGIN` | `https://coopco.vercel.app` (o el dominio específico de tu frontend) |

## Verificación

Después de guardar las variables, Render reiniciará automáticamente el servicio. Revisa los logs para confirmar que el servicio se ha iniciado correctamente y busca el mensaje de depuración que muestra el valor de FRONTEND_URL:

```
DEBUG STARTUP - Reading FRONTEND_URL env var: https://coopco.vercel.app
``` 