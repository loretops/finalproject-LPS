> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o  los de corrección o adición de funcionalidades que consideres más relevantes.
Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras


## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripción general del producto
[Conversación en ChatGPT](https://chatgpt.com/share/67e283c6-099c-800a-9202-5ee3cf871e78)

**Prompt 1:**
```
Eres un experto product manager y desarrollador full-satck. Además tienes mucha experiencia en el mundo inmobiliario y en inversiones. Quiero desarrollar un producto de software para inversores inmobiliarios. Se trataría de una plataforma donde pueden acceder los que son "socios" de un determinado "club" inmobiliario. Ahí se van publicando las diferentes posibles inversiones y los socios pueden tratar de invertir en esas ofertas. ¿Conoces algo parecido? ¿Hay algo así en el mercado?
```

**Prompt 2:**
```
Haz una comparativa de las principales funcionalidades de las 3 mejoras plataformas de inversión inmobiliaria. 
```

**Prompt 3:**
```
En base al conocimiento de otras plataformas y según lo que yo te he contado que quiero desarrollar, identifica las funcionalidades básicas para mi software. Me gustaría detectar el valor añadido que puede tener mi producto, y por tanto que ventajas competitivas. 
Aún tengo que hacer una adecuada toma de requisitos, pero quiero ir haciendo un primer acercamiento a un posible producto, aunque sea en su versión mínima (MVP)
```

**Prompt 4:**
```
Vamos a seguir con este proyecto: 
* Respecto al **tipo de usuarios**, la web será visible a todos el mundo y habrá una zona de club de socios, que tendrán acceso por invitación. Los socios, pueden ver las posibles inversiones, y si dicen "Me Interesa" podrán convertirse en inversores, que es lo mismo que convertirse en accionistas, porque su inversión será sobre las acciones de una empresa. 
*Respecto a los **detalles clave de las oportunidades de inversión**, la **rentabilidad** lleva un estudio económico, y un estudio de mercado del momento de la compra, y dentro de ese proyecto lleva video, planos y fotos. Esta información solo es visible para los socios. 
*Respecto al **proceso de inversión y seguimiento**:
- Si el socio dice "Me Interesa" interactuando de alguna forma con la plataforma, el gestor se pone en contacto con el para aportar más datos, también mediante la plataforma. Si el socio dice "Invierto" tiene que haber alguna forma donde indicar cuánto quiere invertir del total (habrá un mínimo establecido, o por porcentaje o por importe económico), y esa información ("hay un socio que quiere un x%) llegará al resto de socios. 
- Si un apersona dice muchas veces "Me Interesa", pero nunca invierte, llegará un momento que se le expulse del club de socios. 
-El tipo de inversión es un préstamo participativo y pasa. ser propietario de la inversión
-La simulación de inversión te la da el proyecto en origen, cuando le das el estudio económico general. Quizá aquí se puede usar IA
*Respecto a la **comunicación y soporte**:
- Cada semana se cargará, para los inversores, un informe de cómo va la obra, y como va la parte administrativa y económica. 
-En la parte de la obra siempre habrá video en directo
-Los inversores,  también tendrán documentación legal asociada
-Es necesario que no se pueda descargar ningún documento

Con toda esta nueva información que te aporto, quiero que hasg lo siguiente: 
1. vuelve a plantear un MVP. 
2. Además quiero que destaques el Objetivo del producto: propósito, valor añadido, ventajas competitivas, qué soluciona y a quién va dirigido. 
3. Las características y funcionalidad principales que satisfagan las necesidades que te he indicado (para el MVP)
4. Descripción breve del proyecto
```

## 2. Arquitectura del Sistema

**Prompt 1:**
```
Ya sabes mucho de mi producto. Sabes que quiero que sea un MVP. Quiero que sea algo sencillo de desarrollar y mantener para una progaramdor poco experto. 
Eres un arquitecto experto en desarrollo de software. Además, basándote en la experiencia del repositorio que te indico, y usando buenas prácticas, hazme una propuesta para el diseño del sistema, ¿qué arquitectura usarías? https://github.com/donnemartin/system-design-primer
```

**Prompt 2:**
```
@arquitectura.md 
@readme.md 
Eres un arquitecto experto en desarrollo de software. Además, basándote en la experiencia del repositorio que te indico, dime que formato consideras más adecuado para representar los componentes princpales de mi aplicación y las tecnologúas utilizadas
https://github.com/donnemartin/system-design-primer
```

**Prompt 3:**
```
Podrías hacer un único diagrama de arquitectura para representar los componentes principales de la aplicación y las tecnologías utilizadas?
```

**Prompt 4:**
```
Simplifica el diagrama para representar los componentes principales de la aplicación y las tecnologías utilizadas
```

**Prompt 5:**
```
Basándote en el diagrama más completo que has creado, explicame si esta arquitectura y estas tecnologías siguen algún patrón predefinido
```

**Prompt 6:**
```
Vamos a volver al tema de la arquitectura, ¿Te acuerdas? Por si acaso te doy un archivo con mucha información. Puedes ver aquí el diagrama. Por favor, siendo  un experto ingeniero de producto y analista y diseñador de software, describe los componentes principales, incluyendo la tecnología utilizada
```

**Prompt 7:**
```
Cambiarías algo para un desarrollador junior?
```

**Prompt 8:**
```
Bien, en base a esta arquitectura enfocada a un programador junior, haz una dexripción de alto nivel del proyecto y la estructura de los ficheros. Quiero que representes la estructura del proyecto, y que expliques brevemente el propósito de las carpetas principales, así como si obedece a algún patrón o arquitectra específica
```

**Prompt 9:**
```
@arquitectura.md@readme.md 
Revisa la estructura de archivos propuesta en @readme.md . Para un desarrollador junior, te parece mejor esa, o la que hal al final de @arquitectura.md ? 
```


## 3. Modelo de Datos

**Prompt 1:**
```
Revisa todo lo que ya sabes sobre el proyecto, y vamos a crear el modelo de datos. Quiero que sea una base de datos bien hecha según buenas prácticas DDD, son un buen rendimiento, donde las consultas sean eficientes, sea fácil de mantener y escalable.  Que esté normalizada y debes crear los índices de forma adecuada
```

**Prompt 2:**
```
si, por favor, genera el diagrama ERD en mermaid, y luego la imagen. Quiero las dos cosas
```

**Prompt 3:**
```
revisa el modelo de datos del archivo y siendo un experto en arquitectura de bases de datos, según mi MVP, dime si te parece adecuado, o cambiarías algo. Revisa todo el proyecto para tener más información
```

**Prompt 4:**
```
Crees que todas las mejoras son imprescinidbles para un MVP? 
```

## 5. Historias de Usuario

**Prompt 1:**
```
Eres un analista de software experto. Para mi MVP, enumera y describe brevemente los casos de uso 
```

**Prompt 2:**
```
Hay que corregir dos cosas de 1. Gestión de acceso y usuarios
El caso de uso "1.1. Registrarse como visitante Un usuario puede visitar la web pública y registrarse para recibir información, pero sin acceso al área privada", no es válido, porque no hace falta registrarse en la web para verla, cuando eres un visitante normal. 
Además, hay que añadir el caso de uso del gestor que manda invitación a un futuro socio, y éste se registra mediante esa invitación. 
Vuelve a mostrarse todos los casos de uso, pero corrigiendo esto.Hazlo todo en Markdown
```

**Prompt 3:**
```
Quiero que crees historias de usuario  en base a  su valor para el usuario, complejidad, dependencias y otros factores importantes, teniendo en cuenta las buenas prácticas de producto.  Debes tener en cuenta la lógica MOSCOW

Sigue por tanto la siguiente estructura:
*  Formato estándar: "Como [tipo de usuario], quiero [realizar una acción] para [obtener un beneficio]".
   * Descripción: Una descripción concisa y en lenguaje natural de la funcionalidad que el usuario desea.
   * Criterios de Aceptación: Condiciones específicas que deben cumplirse para considerar la User Story como "terminada", éstos deberian de seguir un formato similar a "Dado que" [contexto inicial], "cuando" [acción realizada], "entonces" [resultado esperado].
   * Notas adicionales:  Notas que puedan ayudar al desarrollo de la historia
   * Tareas: Lista de tareas y subtareas para que esta historia pueda ser completada

Fíjate además en esta documentación: https://miro.com/es/agile/que-es-historia-usuario/

De todas las historias de usuario que desarrolles, destaca las 3 más importantes
```

**Prompt 4:**
```
¿Estas son todas las historias de usuario necesarias?

Si falta alguna, añádela, y si: quiero que prepares  una tabla priorizada de todas las historias con etiquetas MoSCoW, y crea un backlog inicial en markdown
```

## 6. Tickets de Trabajo

**Prompt 1:**
```
Eres un experto Product Manager, y conoces los componentes de un buen ticket de trabajo
En base a las historias de usuario, crea los tickets de trabajo. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

Te doy un ejemplo de un buen ticket de trabajo:
"Título: Implementación de Autenticación de Dos Factores (2FA)

Descripción: Añadir autenticación de dos factores para mejorar la seguridad del login de usuarios. Debe soportar aplicaciones de autenticación como Authenticator y mensajes SMS.

Criterios de Aceptación:

	Los usuarios pueden seleccionar 2FA desde su perfil.
	Soporte para Google Authenticator y SMS.
	Los usuarios deben confirmar el dispositivo 2FA durante la configuración.

Prioridad: Alta

Estimación: 8 puntos de historia

Asignado a: Equipo de Backend

Etiquetas: Seguridad, Backend, Sprint 10

Comentarios: Verificar la compatibilidad con la base de usuarios internacionales para el envío de SMS.

Enlaces: Documento de Especificación de Requerimientos de Seguridad

Historial de Cambios:

	01/10/2023: Creado por [nombre]
	05/10/2023: Prioridad actualizada a Alta por [nombre]"

Basándote en la experiencia de otros proyectos aporta la información técnica necesaria para completar todos los componentes de los tickets que vayamos a generar. 

Destaca, de los tickets creados, un ticket de backend, uno de frontend y uno de bases de datos. Documentalos. da todo el detalle requerido para realizar la tarea de inicio a fin, teniendo las buenas prácticas, como ya hemos hablado. Y hazlo todo en markdown
```

**Prompt 2:**
```
Si, quiero que hagas todos los tickets, pero asegúrate de que se trate de un MVP. No quiero un proyecto complejo de inicio. Si tienes que volver a escribirlos, hazlo. Y ponlo todo en un archivo tickets.md en markdown
```

## 7. Pull requests

**Prompt 1:**
```
Index y estudia todo el proyecto a fondo, como experto desarrollador full-satck:

1. Lo primero que qiuero saber es ¿donde y cómo puedo desplegar el proyecto? ¿Qué infaestructura necesito? ¿Hay alguna forma de hacerlo de manera gratuita?

2. Después quiero empezar a desarrollarlo. Haz un roadmap de las tickets a desarrollar, según la información que ya tenemos, teniendo en cuenta que queremos un MVP, y que hay que poantear todo para un desarrollador junior

<!-- 
Eres un experto en desarrollo de software y conoces las buenas prácticas para la creación de pull requests. En base a los tickets de trabajo, crea los pull requests. Da todo el detalle requerido para desarrollar la tarea de inicio a fin, teniendo en cuenta las buenas prácticas al respecto. -->