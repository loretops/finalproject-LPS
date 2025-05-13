# Prompts para el desarrollo de la Historia de Usuario 3: Marcar "Invierto"

## Prompt para implementación completa de tickets
```
En @tickets.md tienes los tickets de la HU3. Vete implementando uno a uno, prueba los tests en caso de que esrcibas alguno, y vete haciendo commit de cada ticket implementado, hasta que completes la HU3
```

Este prompt solicitó la implementación de varios tickets de la HU3 "Marcar Invierto", siguiendo un enfoque paso a paso para crear:

1. **Modelos de datos:**
   - Entidad de inversión
   - Actualización del modelo de proyecto para soportar inversiones

2. **Backend:**
   - Servicio para gestión de inversiones
   - API Endpoints para operaciones CRUD de inversiones

3. **Frontend:**
   - Servicio cliente para consumir la API de inversiones
   - Componente para formulario de inversión
   - Integración del formulario en página de detalle de proyecto

Todo el desarrollo se realizó siguiendo buenas prácticas como manejo de transacciones en operaciones críticas, validación de datos, y gestión de estados en componentes frontend. 

## Implementación de la Página "Mis Inversiones" (Ticket #47) y Componente de Resumen (Ticket #48)

### Prompt inicial:
```
Las pruebas de implementación actual me parecería bien hacerlas si lo ves importante para un desarrollo consistente, teniendo en cuenta que es un MVP, y que a veces hay que tener cuidado de no excederse en los tests si no son necesarios. Pero bajo tu experiencia como desarrollador full-stack, toma la decisión.
Una vez decidido si vas a hacer más pruebas, dime qué pasos vas a seguir
```

### Prompt para continuar:
```
vamos con esos pasos, me parece bien
```

### Detalles de la implementación:

En esta sesión, hemos implementado dos tickets de la HU3:

1. **Ticket #47: Página "Mis Inversiones"**
   - Creamos la página para que los socios puedan visualizar y gestionar sus inversiones
   - Implementamos un sistema de filtrado por estados (pendientes, confirmadas, canceladas, rechazadas)
   - Desarrollamos una vista tabular con información detallada de cada inversión
   - Añadimos la funcionalidad para cancelar inversiones pendientes
   - Creamos una página de detalle para ver información completa de una inversión específica

2. **Ticket #48: Componente de Resumen de Inversiones**
   - Desarrollamos un componente visual con barra de progreso y métricas clave
   - Integramos el componente en la página de detalle del proyecto
   - Añadimos integración con el formulario de inversión existente
   - Mostramos información relevante como cantidad invertida, inversores, etc.

La implementación siguió las mejores prácticas y patrones existentes en la aplicación, manteniendo un diseño limpio, modular y consistente. 