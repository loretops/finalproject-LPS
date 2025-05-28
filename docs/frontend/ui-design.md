# Diseño y Experiencia de Usuario de COOPCO

Este documento presenta el diseño y la experiencia de usuario implementada en COOPCO, la plataforma exclusiva para el club privado de inversores inmobiliarios.

## Índice
1. [Principios de diseño](#principios-de-diseño)
2. [Paleta de colores y tipografía](#paleta-de-colores-y-tipografía)
3. [Componentes de UI reutilizables](#componentes-de-ui-reutilizables)
4. [Flujos principales de usuario](#flujos-principales-de-usuario)
5. [Responsive design](#responsive-design)
6. [Accesibilidad](#accesibilidad)

## Principios de diseño

El diseño de COOPCO se ha desarrollado bajo los siguientes principios:

- **Simplicidad**: Interfaces limpias y minimalistas que facilitan la comprensión.
- **Profesionalidad**: Aspecto sofisticado que transmite confianza y seriedad.
- **Claridad**: Información presentada de forma estructurada y comprensible.
- **Coherencia**: Sistema de diseño consistente en toda la plataforma.
- **Usabilidad**: Flujos intuitivos orientados a objetivos concretos del usuario.

## Paleta de colores y tipografía

### Colores principales
- **Azul primario** (#3B82F6): Color principal de la marca, utilizado en elementos de acción y destacados.
- **Azul oscuro** (#1E40AF): Variante más oscura para contrastes y elementos secundarios.
- **Gris neutro** (#6B7280): Para textos secundarios y elementos no destacados.
- **Blanco** (#FFFFFF): Fondos y áreas de contenido principal.
- **Negro** (#111827): Textos principales y elementos de alto contraste.

### Colores de estado
- **Verde** (#10B981): Éxito, confirmación, elementos positivos.
- **Rojo** (#EF4444): Error, alerta, eliminación.
- **Amarillo** (#F59E0B): Advertencia, atención.
- **Azul claro** (#60A5FA): Información, elementos interactivos secundarios.

### Tipografía
- **Familia principal**: Inter (sans-serif)
- **Jerarquía**:
  - Títulos principales: 24px, negrita
  - Subtítulos: 18px, semibold
  - Texto de contenido: 16px, regular
  - Texto secundario: 14px, regular
  - Anotaciones: 12px, regular

## Componentes de UI reutilizables

COOPCO implementa un sistema de componentes reutilizables que garantizan consistencia visual y funcional:

### Navegación
- **Navbar**: Barra de navegación principal con menú responsivo y opciones contextuales según rol de usuario.
- **Footer**: Pie de página con enlaces legales y de soporte.
- **Breadcrumbs**: Navegación contextual para páginas anidadas.

### Entrada de datos
- **Button**: Botones con variantes primario, secundario, outline y ghost.
- **Input**: Campos de texto con validación y mensajes de error integrados.
- **Select**: Desplegables para selección de opciones.
- **Checkbox y Radio**: Elementos de selección múltiple y única.
- **DatePicker**: Selector de fechas para filtrado y formularios.

### Presentación de datos
- **Card**: Contenedor para mostrar información resumida, usado en listados de proyectos.
- **Table**: Tablas para datos tabulares con ordenación y filtrado.
- **Tabs**: Pestañas para organizar contenido en secciones.
- **Modal**: Ventanas modales para acciones importantes o confirmaciones.
- **Alert**: Mensajes de notificación y feedback.

### Componentes específicos
- **ProjectCard**: Tarjeta especializada para mostrar información resumida de proyectos.
- **InterestButton**: Botón especializado para la funcionalidad "Me interesa".
- **InvestmentForm**: Formulario para realizar inversiones.
- **DocumentViewer**: Visor especializado para documentos del proyecto.
- **VerificationStatus**: Indicador del estado de verificación de email.

## Flujos principales de usuario

### 1. Registro por invitación
El proceso de registro por invitación incluye:
1. Recepción de email de invitación con enlace único
2. Validación del token de invitación
3. Formulario de registro con campos para nombre, apellidos y contraseña
4. Confirmación exitosa y redirección al dashboard

### 2. Exploración de proyectos
El flujo de exploración de proyectos incluye:
1. Listado de proyectos disponibles con filtros y ordenación
2. Tarjetas de resumen con información clave de cada proyecto
3. Vista detallada de proyecto con pestañas para diferentes tipos de información
4. Visualización de documentos, imágenes y detalles financieros

### 3. Expresión de interés e inversión
El flujo para invertir incluye:
1. Botón "Me interesa" en tarjetas y página de detalle
2. Formulario para indicar cantidad a invertir
3. Confirmación de la intención de inversión
4. Seguimiento de inversiones realizadas

### 4. Panel de administración
El flujo para gestores incluye:
1. Gestión de invitaciones a nuevos socios
2. Creación y edición de proyectos
3. Publicación de oportunidades de inversión
4. Seguimiento de intereses e inversiones de los socios

## Responsive design

COOPCO está diseñado siguiendo un enfoque "mobile-first" y se adapta a diferentes tamaños de pantalla:

- **Móviles** (<640px): Diseño de una columna, menú colapsable, elementos optimizados para pantallas pequeñas.
- **Tablets** (640px-1024px): Diseño de dos columnas, navegación expandida, tablas simplificadas.
- **Escritorio** (>1024px): Diseño multi-columna, uso completo del espacio, funcionalidades avanzadas visibles.

## Accesibilidad

La plataforma implementa las siguientes prácticas de accesibilidad:

- **Contraste**: Relaciones de contraste WCAG AA entre texto y fondo.
- **Teclado**: Navegación completa mediante teclado con indicadores de foco visibles.
- **Etiquetas**: Elementos de formulario correctamente etiquetados.
- **Textos alternativos**: Imágenes con textos descriptivos para lectores de pantalla.
- **Mensajes de error**: Feedback claro para errores de formulario.
- **Estructura semántica**: Uso adecuado de encabezados y landmarks HTML. 