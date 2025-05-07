# Recursos y documentación para el frontend

Este documento proporciona enlaces a recursos y documentación útiles para el desarrollo del frontend de COOPCO, la plataforma exclusiva para club privado de inversores inmobiliarios.

## 📚 Documentación de librerías principales

### Tailwind CSS

- [Documentación oficial de Tailwind CSS](https://tailwindcss.com/docs) - Referencia completa de clases y utilidades
- [Tailwind UI Playground](https://play.tailwindcss.com/) - Entorno de pruebas para experimentar con Tailwind
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - Hoja de referencia rápida
- [Personalización de colores](https://tailwindcss.com/docs/customizing-colors) - Guía para personalizar la paleta de colores

### HeadlessUI

- [Documentación de HeadlessUI](https://headlessui.com/) - Componentes accesibles para Tailwind CSS
- [Ejemplos de HeadlessUI](https://headlessui.dev/react/menu) - Ejemplos interactivos de uso de componentes
- [GitHub de HeadlessUI](https://github.com/tailwindlabs/headlessui) - Repositorio con código fuente y ejemplos adicionales

### Heroicons

- [Catálogo de Heroicons](https://heroicons.com/) - Colección completa de iconos disponibles
- [Referencia de uso en React](https://github.com/tailwindlabs/heroicons#react) - Instrucciones de implementación

### Next.js

- [Documentación oficial de Next.js](https://nextjs.org/docs) - Guía completa del framework
- [Ejemplos de Next.js](https://github.com/vercel/next.js/tree/canary/examples) - Repositorio con ejemplos oficiales
- [Learn Next.js](https://nextjs.org/learn) - Tutorial interactivo oficial

## 📐 Guías de diseño y patrones

### Refactoring UI

- [Refactoring UI](https://www.refactoringui.com/) - Guía de diseño para desarrolladores
- [7 Practical Tips for Cheating at Design](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886) - Consejos prácticos de diseño UI

### Patrones de diseño y plantillas

- [Componentes de Tailwind UI](https://tailwindui.com/components) - Componentes profesionales de pago (solo como referencia visual)
- [Plantillas y ejemplos gratuitos de Tailwind](https://tailwindcomponents.com/) - Componentes comunitarios gratuitos
- [Patrones de UI con Tailwind](https://www.patterns.dev/) - Patrones modernos de UI implementados con Tailwind

## 🧩 Componentes para nuestro proyecto

Utilizamos distintas categorías de componentes que puedes encontrar en la carpeta `components/`:

### Estructura y Layout

- `components/layout/Layout.jsx` - Wrapper principal de la aplicación
- `components/layout/Navbar.jsx` - Barra de navegación responsiva
- `components/layout/Footer.jsx` - Pie de página

### Componentes reutilizables

- `components/ui/` - Componentes de UI básicos (botones, inputs, etc.)
- `components/projects/` - Componentes específicos para proyectos de inversión
- `components/auth/` - Componentes para autenticación y registro

## 🎨 Guía de estilo

Hemos definido una guía de estilo en el archivo `globals.css` y en la configuración de Tailwind:

### Colores

- **Primario**: Tonos de azul para elementos principales y acción (`primary-*`)
- **Secundario**: Tonos grises neutros para elementos secundarios (`secondary-*`)
- **Estado**: Colores específicos para estados (verde=éxito, rojo=error, etc.)

### Tipografía

- **Fuente principal**: Inter (sans-serif)
- **Jerarquía de tamaños**:
  - Títulos principales: `text-3xl font-bold`
  - Subtítulos: `text-2xl font-bold`
  - Contenido: `text-base`
  - Texto secundario: `text-sm text-gray-500`

### Componentes comunes

Hemos definido clases comunes para elementos repetitivos:

- `.btn` - Estilo base para botones
- `.btn-primary` - Botón de acción principal
- `.btn-secondary` - Botón de acción secundaria
- `.input` - Campos de formulario
- `.card` - Tarjetas para mostrar contenido

## 📱 Responsive Design

Nuestro enfoque para el diseño responsivo:

- **Mobile-first**: Diseñamos primero para móviles y luego expandimos para pantallas más grandes
- **Breakpoints**:
  - `sm`: 640px (tablets pequeñas)
  - `md`: 768px (tablets)
  - `lg`: 1024px (laptops/desktops)
  - `xl`: 1280px (pantallas grandes)
  - `2xl`: 1536px (pantallas muy grandes)

## 🚀 Mejores prácticas de rendimiento

- Usar Next.js Image para optimización de imágenes
- Implementar lazy loading para componentes grandes
- Minimizar re-renderizados innecesarios
- Utilizar React.memo para componentes que se renderizan frecuentemente con las mismas props

## 🧪 Herramientas de desarrollo

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Extensión para VS Code
- [Prettier con plugin de Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - Formateador de código
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) - Extensión para depurar React

## 📚 Libros y recursos adicionales

- [Inclusive Components](https://inclusive-components.design/) - Patrones para crear interfaces accesibles
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/) - Metodología de diseño modular
- [Designing for the Web](https://designingfortheweb.co.uk/) - Principios fundamentales de diseño web 