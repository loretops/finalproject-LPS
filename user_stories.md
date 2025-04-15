# Club de Inversión Inmobiliaria - Historias de Usuario

## ✅ Historias Principales

### 🥇 HISTORIA 1 – Registro mediante invitación (Must Have)

**Como** usuario invitado,  
**Quiero** registrarme mediante una invitación exclusiva,  
**Para** acceder a la zona privada como socio del club.

#### Descripción
Solo los usuarios que reciben una invitación personalizada del gestor pueden acceder al área privada del Club de Socios.

#### Criterios de Aceptación
- **Dado que** el gestor ha enviado una invitación al email del usuario
- **Cuando** el usuario accede al enlace recibido y completa su registro
- **Entonces** su cuenta queda validada y puede iniciar sesión como socio

#### Notas adicionales
Se requiere un sistema de generación de enlaces únicos con expiración y validación por email.

#### Tareas
- Diseñar el modelo de invitaciones (estructura y caducidad)
- Crear la vista del formulario de registro para invitados
- Implementar verificación del enlace (válido/no válido/caducado)
- Integrar confirmación por correo electrónico
- Vincular usuario a rol "socio"

### 🥈 HISTORIA 2 – Ver oportunidades de inversión (Must Have)

**Como** socio del club,  
**Quiero** ver las oportunidades de inversión disponibles,  
**Para** decidir si deseo invertir en alguna de ellas.

#### Descripción
El socio autenticado puede consultar las fichas de los proyectos con información detallada: rentabilidad, estudio económico, planos, fotos, vídeo, etc.

#### Criterios de Aceptación
- **Dado que** un socio está autenticado
- **Cuando** accede al área de oportunidades
- **Entonces** puede visualizar fichas de inversión detalladas (ocultas al público)

#### Notas adicionales
Toda esta información debe almacenarse de forma segura. No accesible sin login. Vídeos deben estar protegidos contra descarga o enlace directo.

#### Tareas
- Definir modelo de datos de las oportunidades
- Crear interfaz para mostrar fichas de inversión
- Integrar visor multimedia (fotos, vídeo)
- Control de permisos: solo socios autenticados
- Cargar estudio económico y documentación en vista protegida

### 🥉 HISTORIA 3 – Marcar "Invierto" (Must Have)

**Como** socio,  
**Quiero** poder indicar que deseo invertir en un proyecto y cuánto,  
**Para** que el gestor y los demás socios conozcan mi compromiso.

#### Descripción
Permite a los socios señalar su interés formal con un importe determinado, que se registra y muestra como parte del progreso de financiación.

#### Criterios de Aceptación
- **Dado que** el socio ha accedido a una oportunidad de inversión
- **Cuando** pulsa "Invierto" e introduce el importe
- **Entonces** el sistema registra el dato y actualiza el porcentaje de inversión comprometida, notificando al gestor y a los socios

#### Notas adicionales
Puede haber un mínimo de inversión. Se debe validar el importe y evitar duplicidades.

#### Tareas
- Diseñar formulario para entrada de importe
- Validar importe ≥ mínimo
- Registrar en base de datos como "inversión comprometida"
- Generar notificación a otros socios
- Actualizar progreso de inversión en el panel del proyecto

## Otras Historias Relevantes

### 🔒 HISTORIA 4 – Ver documentos legales sin descargar (Should Have)

**Como** inversor,  
**Quiero** poder ver los documentos legales del proyecto sin poder descargarlos,  
**Para** consultar información confidencial sin poner en riesgo su seguridad.

#### Descripción
Documentos PDF u otros deben poder visualizarse en la plataforma sin opción de descarga o impresión.

#### Criterios de Aceptación
- **Dado que** un socio es inversor de un proyecto
- **Cuando** accede a la ficha del proyecto
- **Entonces** puede visualizar los documentos en modo seguro (read-only, no descargable)

#### Notas adicionales
Puede usarse un visor seguro (como PDF.js customizado o soluciones de DRM embebidas).

#### Tareas
- Implementar visor de documentos
- Configurar protección contra descarga
- Restringir acceso solo a inversores del proyecto

### 💬 HISTORIA 5 – Comunicación entre gestor y socio (Should Have)

**Como** gestor,  
**Quiero** poder comunicarme directamente con socios interesados,  
**Para** resolver dudas de forma personalizada.

#### Descripción
Mensajería uno-a-uno entre gestor y socio interesado desde la plataforma.

#### Criterios de Aceptación
- **Dado que** un socio ha marcado "Me Interesa"
- **Cuando** accede a su bandeja de mensajes
- **Entonces** puede ver o iniciar un hilo de conversación con el gestor

#### Notas adicionales
Necesario histórico, notificaciones push/email.

#### Tareas
- Crear modelo de mensajes
- Diseñar bandeja de entrada/mensajes
- Activar notificaciones internas y por email
- Filtrar mensajes por proyecto

### 📈 HISTORIA 6 – Ver informes y vídeo semanal de obra (Could Have)

**Como** inversor,  
**Quiero** ver un informe y un vídeo semanal del proyecto,  
**Para** hacer seguimiento del estado real de mi inversión.

#### Descripción
Panel de avance del proyecto con documentos, KPIs, y acceso a vídeo en directo o grabado.

#### Criterios de Aceptación
- **Dado que** un usuario ha invertido
- **Cuando** accede a su inversión
- **Entonces** puede ver el último informe cargado y un vídeo asociado

#### Tareas
- Crear panel de seguimiento de inversión
- Subida de documentos por parte del gestor
- Integración con plataforma de streaming
- Control de acceso por inversión

## Historias Adicionales

- 📧 **HISTORIA 7** – Confirmación de correo electrónico tras registro (Must Have)
- 🔔 **HISTORIA 8** – Notificaciones internas (Should Have)
- 📊 **HISTORIA 9** – Visualizar progreso de inversión en cada proyecto (Should Have)

## 📋 Tabla Priorizada de Historias de Usuario (MoSCoW)

| ID | Historia breve | MoSCoW | Valor | Complejidad | Dependencias |
|----|---------------|---------|-------|-------------|--------------|
| US01 | Registro mediante invitación | Must Have | 🔥 Alto | ⚙️ Media | — |
| US02 | Confirmación de correo electrónico | Must Have | 🔥 Alto | ⚙️ Media | US01 |
| US03 | Iniciar sesión como socio | Must Have | 🔥 Alto | ⚙️ Baja | US01, US02 |
| US04 | Visualizar oportunidades de inversión | Must Have | 🔥 Alto | ⚙️ Media | US03 |
| US05 | Marcar "Invierto" y monto | Must Have | 🔥 Alto | ⚙️ Alta | US04 |
| US06 | Ver progreso de inversión en tiempo real | Should Have | ⭐ Medio | ⚙️ Media | US05 |
| US07 | Marcar "Me Interesa" y abrir canal de contacto | Must Have | 🔥 Alto | ⚙️ Media | US04 |
| US08 | Comunicación gestor ↔ socio interesado | Should Have | ⭐ Medio | ⚙️ Alta | US07 |
| US09 | Ver documentos legales sin descarga | Must Have | 🔥 Alto | ⚙️ Alta | US05 |
| US10 | Ver informes y vídeo semanal del proyecto | Should Have | ⭐ Medio | ⚙️ Alta | US05 |
| US11 | Publicación de nuevas oportunidades (gestor) | Must Have | 🔥 Alto | ⚙️ Media | — |
| US12 | Subida de informes semanales (gestor) | Should Have | ⭐ Medio | ⚙️ Media | US11 |
| US13 | Notificaciones internas | Should Have | ⭐ Medio | ⚙️ Media | US05, US10 |
| US14 | Alertar gestor por inactividad de socios | Could Have | ⚪ Bajo | ⚙️ Alta | US07, US05 |

## 🧱 MVP Backlog – Plataforma de Inversión Inmobiliaria

### 🎯 Must Have

- [ ] **US01**: Como usuario invitado, quiero registrarme mediante una invitación exclusiva para acceder al área privada
- [ ] **US02**: Como nuevo socio, quiero confirmar mi correo electrónico tras el registro para verificar mi identidad
- [ ] **US03**: Como socio, quiero poder iniciar sesión para acceder a la zona privada
- [ ] **US04**: Como socio, quiero ver las oportunidades de inversión disponibles para evaluar si deseo invertir
- [ ] **US05**: Como socio, quiero poder confirmar que deseo invertir e indicar el monto para comprometerme con el proyecto
- [ ] **US07**: Como socio, quiero indicar que una inversión me interesa para abrir contacto con el gestor
- [ ] **US09**: Como inversor, quiero consultar documentos legales sin poder descargarlos para proteger la confidencialidad
- [ ] **US11**: Como gestor, quiero publicar nuevas oportunidades de inversión para ponerlas a disposición de los socios

### 🟡 Should Have

- [ ] **US06**: Como socio, quiero ver el porcentaje de inversión comprometida en cada proyecto para decidir cuándo invertir
- [ ] **US08**: Como gestor o socio, quiero poder comunicarme dentro de la plataforma para resolver dudas
- [ ] **US10**: Como inversor, quiero ver informes semanales y vídeos del proyecto para hacer seguimiento
- [ ] **US12**: Como gestor, quiero subir informes semanales para mantener informados a los inversores
- [ ] **US13**: Como socio, quiero recibir notificaciones para estar al día de las novedades

### ⚪ Could Have

- [ ] **US14**: Como gestor, quiero recibir alertas sobre socios inactivos para valorar su permanencia en el club
