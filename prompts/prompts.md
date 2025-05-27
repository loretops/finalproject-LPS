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
8. [Seguridad](#8-seguridad)
9. [Configuración del proyecto](#9-configuración-del-proyecto)
10. [Estandarización de la interfaz](#10-estandarización-de-la-interfaz)
11. [Historias de Usuario específicas](#11-historias-de-usuario-específicas)
12. [Despliegue y configuración de entornos](#12-despliegue-y-configuración-de-entornos)

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
Podrías hacer un único diagrama de arquitectura para representar los componentes principales de la aplicación y las tecnologías utilizadas?
```

**Prompt 3:**
```
Bien, en base a esta arquitectura enfocada a un programador junior, haz una dexripción de alto nivel del proyecto y la estructura de los ficheros. Quiero que representes la estructura del proyecto, y que expliques brevemente el propósito de las carpetas principales, así como si obedece a algún patrón o arquitectra específica
```

**Prompt 4:**
```
Quiero que hagas lo siguientes pasos:
1. Cambiar la estructura de carpetas para que en vez de ser cliente y servidor sean frontend y backend según tus conocimientos como experto en arquietctura de sistemas. esta estructura debes cambiarla en aquellos archivos del proyecto donde esté definida. 
2. según la consulta anterior, valora si debes aplicar mejor DDD tal y como propones para separar la lógica de negocio
3. Evalua si vale la pena implementar más la arquitectura hexagonal según los criterios que me indicas (Faltan puertos claramente definidos, no hay adaptadores primarios/secundarios explícitos)
4. valora también si vale la pena aplicar más los principios SOLID según idicas (La dependencia en Express está acoplada directamente a los controladores, no se ve inyección de dependencias clara)
5. Crea un archivo en la documentación que incluya toda la información necesaria para levantar el entorno(Instalación de dependencias, configuración de variables de entorno, preparación y migración de la base de datos, ejecución del servidor de desarrollo, testing inicial). Para ello además quiero que tengas en cuenta que como estoy haciendo muchas pruebas, y se quedan en uso los puertos, cada vez que reinicio los servidores tengo problemas con los puertos. Busca una forma para que se puedan hacer esas pruebas sin tener ese problema. 
6. revisa los archivos de documentación y dime cómo documentarias mejor respondiendo más al "por qué" que al "qué"
7. valora si es bueno usar JsDoc para ayudar al autocompletado en la documentación
8. Valora este punto: Monitorización y logging: Implementa logging estructurado, prepara el sistema para monitorización básica

Para todo ten en cuenta mi posición como programadora junior, y que no quiero un proyecto complejo, sino quiero que sea sencillo, fácil de mantener, aunque si quiero que en el futuro sea escalable.
```

**Prompt 5:**
```
Tengo más consultas: 
1. Para la estrcutura de carpetas, incluirías prisma dentro del backend?, o mejor lo mantenemos fuera?
2. Revisa el archivo propuesto de @monitoring-logging.md , y dime si para desarrollar el proyecto con CURSOS y Claude, verdaderamente me aporta un valor añadido y me va a facilitar el desarrollo, o si por el contrario me va a comoplicar todo
3. Qué me recomiendas mas para reiniciar servidores al hacer pruebas: usar cross-port-killer, o crear un script que haga todo "manualmente"?
```

**Prompt 6:**
```
- @readme.md Eres un experto en ingeniero de productom desarrollador full-satck. Estudia y analiza todo el proyecto completo. Indexalo si es necesario. Necesito completar la documentación a un alto nivel, y quiero desarrollar el punto 2.4. Infraestructura y despliegue. Como aun estoy en fase de desarrollo y lo tengo todo en local, quizá la parte de despliegue podemos postponerla, aunque si lo ves oportuno también la vamos rellenando. Pero quiero que al menos me desarrolles la documentación acerca de la infrasetructura. esta es la información que tengo que desarrollar: "Detalla la infraestructura del proyecto, incluyendo un diagrama en el formato que creas conveniente, y explica el proceso de despliegue que se sigue"
- Quiero que revises todos los archivos del proyecto, como te he dicho, para que tengas una visión completa. Redacta el punto 2.4, pero no le des un enfoque de desarrollo local, olvida eso. Redacta todo para desarrollar y desplegar el proyecto para ponerlo en marcha. Acuerdate de @rules.mdc
- Prefiero que, ya que por ahora estoy haciendo el desarrollo en local, des un enfoque de la infraestructura y del despliegue, de forma local, y hagas un esbozo de lo que sería la infaestructura y despliegue en real. Probablemente contrate un servidor VPS y compre un dominio para este propósito, pero sún no lo sé. Acuerdate de las @rules.mdc
- No estás haciendo caso de cómo actualizar el archivo @prompts.md ya que debes añadir lo que yo te pido, tal y como lo escribo, sin modificarlo. Y te has dejado atrás varios prompts de la conversación. No me interesan tus respuestas, ni tus interpretaciones, sino el texto de mi solicitud
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

**Prompt 5:**
```
Creo que has hecho un buen trabajo con @user-stories.md , pero quizá deberías revisar el modelo de datos descrito en @readme.md  para ver si cumple lo indicado en esas historias de usuario. Puedes aplicar un punto de vista crítico, como experto en bases de datos, y si ves que no está bien definido algo en las historias de usurio respecto a la base de datos, indicamelo, o incluso te permito cambiar ese detalle de la historia de usuario. 

Si haces cambios actualiza todo lo necesario en el @readme.md : 3.1. Diagrama del modelo de datos, 3.2. Descripción de entidades principales. 
```

**Prompt 6:**
```
El modelo de datos propuesto lo veo algo complejo.
Actúa como un Arquitecto de Sistemas y DBA experto en el diseño de sistemas escalables usando DDD. Eres experto en recomendar el tipo de base de datos adecuado, que sea SQL.
Has sido contratada para asistir y guiar en las decisiones relacionadas con este MVP. Revisa todo el proyecto.
Como te decía, analiza si es demasiado compleja la base de datos, y sin embargo quizá falta alguna entidad como la tabla para los roles de usuario. Mira a ver si puedes mejorar esta estructura y normalizarla. 
Usemos solo SQL. Indica qué índices serán necesarios para este sistema.

Con las mejoras que vayas a hacer del modelo de datos debes actualizar el @readme.md (tanto el diagrama ERD como la descripción de entidades principales), y también actualiza las @user-stories.md si hiciera falta.
```

## 4. Especificación de la API

**Prompt 1:**
```
Eres un experto desarrollador backend. Como ves, mi proyecto se comunica a través de API, así que quiero que tras analizar a fondo todo el proyecto,  encuentres y describas en el @readme.md , en el punto 4. Especificación de la API, los endpoints principales (maximo 3) en **formato OpenAPI**.  Añade además un ejemploi de petición y de respuesta

Te estás olvidando de nuevo de las @rules.mdc 
```

**Prompt 2:**
```
Has hecho bien la definición de los endpoints, porque has buscado solo los que ya están desarrollados, pero quizá, para la documentación, valga la pena añadir como endpoints princpales, alguno que aun no esté desarrollado. Puedes verlos definidos en el punto 5. Historias de Usuario del @readme.md 
Analiza lo que te propongo y luego me dices qué opinas
```

**Prompt 3:**
```
Te dije que la descripcion de los endpoints principales, com maximo podían ser 3. No has añadido más? Elige los 3 principales
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

**Prompt 5:**
```
Ahora vamos a revisar las historias de usuario: Eres un experto en producto. A estas historias de usuario @user-stories.md  le falta detalle técnico y específico para permitir al developer ser totalmente autónomo a la hora de completarla.
Por favor entiende la necesidad y proporciona una historia mejorada que sea más clara, específica y concisa acorde a las mejores prácticas de producto, incluyendo descripción completa de la funcionalidad, lista exhaustiva de campos a tocar, estructura y URL de los endpoints necesarios, ficheros a modificar acorde a la arquitectura y buenas prácticas, pasos para que la tarea se asuma como completada, cómo actualizar la documentación que sea relevante o crear tests unitarios, y requisitos no funcionales relativos a seguridad, rendimiento, etc. Actualiza @user-stories.md  en formato markdown, y no olvides las@rules.mdc 

En @readme.md también hay historias de usuario. Actualiza esas historias de usuario igualmente con el mismo contenido que en @user-stories.md 
```

**Prompt 6:**
```
Quier empezar la HU2, pero echo de menos, en esta historia de usuario, que se indique la necesidad de que el gestor pueda crear, o gestionar, en general, oportunidades de inversión, porque no encuentro este requerimiento en ningún punto de @user-stories.md 
```

**Prompt 7:**
```
Me parece bien el enfoque 1, secuencial. Hay algún punto de la documentación del proyecto @docs donde se indique el orden que se debe seguir en el desarrollo de las historias de usuario? Porque quiero dejar reflejado el orden adecuado en el propio archivo @user-stories.md 
```

**Prompt 8:**
```
@user-stories.md 
Revisa todas las historias de usuario, y haz una tabla priorizada según el orden lógco de desarrollo y dependencias.
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
Eres un experto desarrollador full-satck y product manager. Tienes toda la documentación preparada para empezar a desarrollar la primera historia de usuario. Estudiala, y vete desarrollando cada ticket para la primra historia de usuario a desarrollar. Conoces  los componentes de un buen ticket de trabajo. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto. 

No hagas nada todavía, solo crea los tickets en @tickets.md por orden de ejecución. 
Acuerdate de las @rules.mdc 
```

**Prompt 3:**
```
Echo de menos un ticket para crear la invitación desde el frontend. Además previamente a todo, para probar esto, hará falta crear un ticket para el login en la plataforma
```

**Prompt 4:**
```
Están en estos tickets la configuración necesaria para el enñvio de las invitaciones por email? La docuemntación que has adjuntado a los tickets, creo que te la has inventado... Mejor añadir links reales, o crear esos archivos en base a documentación real que ya exista
```

**Prompt 5:**
```
si, reorganizalo @tickets.md  segun las dependencias técnicas. Y revisa que cubra requerimientos de frontend, backend y bases de datos definidas en la histroia de usuario 1 @user-stories.md , pero no añadas nada que no sea necesario para el MVP
```

**Prompt 6:**
```
@readme.md @tickets.md @development_status.md 
Fijate en los tickets escritos para la HU1. A mi me parece que están muy bien. 

Quiero hacer lo mismo para la siguiente historia de usuario, que es la 10, así que habría que añadir los tickets a contonuación en el archivo@tickets.md, y preparar el archivo @development_status.md para ir haciendo seguimiento del desarrollo de los mismos . Así que como experto desarrollador full-satck y product manager, con toda la documentación de la que dispones. Como te he dicho, debes dar todo el detalle requerido para desarrollar la tarea de inicio a fin, teniendo en cuenta las buenas prácticas al respecto. No desarrolles nada aún, solo crea los tickets, en el orden lógico de ejecución para que pueda crearse el flujo de uso. No te inventes nada, todo debe ajustarse al proyecto real. El orden de creación debe tener en cuenta las dependencias técnicas. Revisa que cubra los requerimientos de frontend, backend y basese de datos. No añadas nada que no sea necesario para un MVP, y ten en cuenta que si ves impresciniidible hacer odificaciones en el modelo de datos, habrá que revisar cuáles ya que habrá que actualizar varios archivos.
Acuerdate de las @rules.mdc 
```

**Prompt 7:**
```
Claro, hay que desarrollar todos y cada uno de los tickets de esta Historia de Usuario, como buen desarrollador full-stack. Recuerda escribirlos en el orden logico de desarrollo, segun sus dependencias, y escribelos como siempre en@tickets.md. Fijate en los tickets escritos anteriormente, que son muy completos. Quiero que cada ticket permita al desarrollador tener toda la información para desarrollar lo necesario de princpio a fin, todo lo necesario para backend, frontend, y bases de datos, así como los tests necesarios para que el desarrollo sea robusto. He dicho los necesraios, que no significa hacer demasiados tests, sino solo lso que aporten valor añ desarrollo, y reduzcan futuros errores. Para los tickets que implican frontend hay que tener en cuenta librerias o dependiencias instaladas, o si fuera necesario recomendar otras. Para cada ticket hay que recomendar buenas prácticas. No olvides que esto es MVP, y aceurdate que cualquier alteración del modelo de datos hay que tenerla en cuenta para modificar base de datos y archivos implicados.
```

**Prompt 8:**
```
vamos con el ticket#22. Estoy pendando que , para no perder todos mis prompts de este desarrollo de la HU2, crea un archivo llamado prompts_HU2, con el mismo formato que @prompts.md , pero si indice de navegación inicial, para ir guadando ahi todos los prompts de esta HU, tal y como se indica en @rules. 
```

**Prompt 9:**
```
- En realidad la HU9 no está funcionando bien. Así que quiero empezar a desarrollarla. Empezemos por crear los tickets completos.
- Fijate en @user-stories.md, y en los tickets escritos @tickets.md.
- Fijate en los tickets escritos para la HU1. A mi me parece que están muy bien.
- habría que añadir los tickets a contonuación en el archivo@tickets.md, y preparar el archivo @development_status.md para ir haciendo seguimiento del desarrollo de los mismos. Así que como experto desarrollador full-satck y product manager, con toda la documentación de la que dispones. Como te he dicho, debes dar todo el detalle requerido para desarrollar la tarea de inicio a fin, teniendo en cuenta las buenas prácticas al respecto. No desarrolles nada aún, solo crea los tickets, en el orden lógico de ejecución para que pueda crearse el flujo de uso. No te inventes nada, todo debe ajustarse al proyecto real. El orden de creación debe tener en cuenta las dependencias técnicas. Revisa que cubra los requerimientos de frontend, backend y basese de datos. No añadas nada que no sea necesario para un MVP, y ten en cuenta que si ves impresciniidible hacer odificaciones en el modelo de datos, habrá que revisar cuáles ya que habrá que actualizar varios archivos.
- Acuerdate también de actualizar siempre el archivo @production_deployment.md
```

## 7. Pull requests

**Prompt 1:**
```
Tengo un problema con el repositorio, y es que he ido haciendo commit y push en vez de crear una rama con los cambios para hacer un Pull request. ¿Cómo puedo arreglarlo? 
```

**Prompt 2:**
```
@readme.md Tengo que documentar las Pull Request en @readme.md , como parte de la documentación de alto nivel que tengo que presentar, y como parte de la documenatción de un proyecto bien desarrollado, pero no sé muy bien qué debo poner. ¿Me puedes ayudar? Puedes revisar los cambios del repositorio
```

**Prompt 3:**
```
Prepara una nueva PR, y documentala en @prompts.md y en @readme.md , porque ya hemos terminado la HU9
```

**Prompt 4:**
```
prepara esta inforamción pero en un texto en formato markdown que yo pueda copiar, pero teniendo en cuenta que esta pULL REQUEST atienda a la implementacion de la HU3. Y actualiza también @prompts.md  y @readme.md  en la sección Pull requests
```

**Prompt 5:**
```
Crea la documentación adecuada para la PR, tanto la que he de añadir en la propia PR, como la que debe ir en la documentación: @prompts.md y @readme.md 

## 8. Seguridad

**Prompt 1:**
```
@readme.md 
Tengo que seguir documentando el proyecto. Revisa todos los archivos para poder aportar este punto: Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede, pero solo para lo que se ha desarrollado por ahora. De hecho se debe indicar que es lo que hay en este punto del proyecto, y más adelante se mejorará este punto. 
Si hay algún punto claro de lo que se va a desarrollar en el futuro, se pueden añadir aquí tambien. de hecho hay puntos de seguridad fundamentales en este proyecto, así que profundiza lo que necesites, sin perder de vista que es un MVP, y yo soy una progaramdora junior, y no puedo mantener un proyecto muy complejo
@rules.mdc 
```

## 9. Configuración del proyecto

**Prompt 1:**
```
Todo bien. Ahora quiero que como experto desarrollador full-stack, preparado para trabajar con el equipo de frontend, revises la estructura, arquitectura y finalidad del proyecto @readme.md , @architecture , y las dependencias que ya hay, y me propongas libreraias y/o documentacion adecuada para que cada pantalla del forntend que vaya desarrollando tenga un estilo profesional, limpio, intuitivo, estetico y moderno. ¿Qué propones?
```

**Prompt 2:**
```
Empieza por el punto Configura Tailwind CSS como base, y Añade componentes básicos (shadcn/ui o HeadlessUI) para navegación y layouts. Además, añade a Cursor la documentación que me propones en el punto 7. Recursos y documentación recomendada
```

## 10. Estandarización de la interfaz

**Prompt 1:**
```
Los últimos desarrollos los hemos hecho con una interfaz adecuada, mucho mejor que al princpio. me gustaría igualar todo lo que llevamos desarrollado por ahora del frontend para que todo tenga una imagen coherente. Guiame paso a paso. recuerda que hemos instalado alguans deopendencias y librerias para mejorar el interfaz
```

**Prompt 2:**
```
Revisa la primera pantalla de adminstracion de proyectos 
Ahora revisa las egunda pantalla de gestion de invitados 
Ahora unifica un mismo estilo: el que cumpla mejor las buenas practicas, y sea más estetico y funcional
```

**Prompt 3:**
```
no creo que haya quedado estandarizado. Pero bueno, ya lo afrontaremos. Mira http://localhost:3001/admin/projects, y revisa el encabezado de la tabla de proyectos, que aparentemente permiten ordenar cada columna de forma ascendente y descendente, epro en la realidad no lo hace
```

**Prompt 4:**
```
He pinchado en las flechas para ordenar asecndentemente la columna TITULO y no lo hace
```

**Prompt 5:**
```
Ya está terminada esta Historia de Usuario, así que vamos a hacer una nueva PR, pero asegurate que sea a mi repositorio, no al original. Actualiza @prompts.md con esto, en la sección Pull Requests, y documenta el @readme.md en la misma sección. Vamos paso a paso
```

**Prompt 6:**
```
has probado los tests?
```

## 11. Historias de Usuario específicas

### Historia de Usuario 2: Ver oportunidades de inversión
[Ver prompts completos](prompts/prompts_HU2.md)

### Historia de Usuario 3: Marcar Invierto
[Ver prompts completos](prompts/prompts_HU3.md)

### Historia de Usuario 9: Marcar "Me Interesa"
[Ver prompts completos](prompts/prompts_HU9.md)

### Historia de Usuario 7: Confirmación de correo electrónico
[Ver prompts completos](prompts/prompts_HU7.md)

### Análisis del producto
[Ver análisis completo](prompts/prompts_analisis_product_3.md)

## Implementación de tickets de Historia de Usuario 3

- [Ver prompts para el desarrollo de HU3](prompts_HU3.md)

## Historia de Usuario 3: Marcar "Invierto"

### Implementación completa de la funcionalidad "Marcar Invierto"

Se ha implementado toda la funcionalidad para que los socios puedan indicar su intención formal de invertir en un proyecto y especificar el monto. Ver todos los prompts y detalles en [prompts_HU3.md](prompts_HU3.md).

### Implementación de Tickets #47 y #48

```
Las pruebas de implementación actual me parecería bien hacerlas si lo ves importante para un desarrollo consistente, teniendo en cuenta que es un MVP, y que a veces hay que tener cuidado de no excederse en los tests si no son necesarios. Pero bajo tu experiencia como desarrollador full-stack, toma la decisión.
Una vez decidido si vas a hacer más pruebas, dime qué pasos vas a seguir
```

Se implementaron la página "Mis Inversiones" y el componente de resumen de inversiones para proyectos. Ver todos los detalles en [prompts_HU3.md](prompts_HU3.md).

Prompt para desarrollar la funcionalidad de "Marcar Invierto" que permite a los socios indicar su intención formal de invertir en un proyecto, incluyendo la creación de modelos de datos, servicios backend y componentes frontend. 


## Sistema de errores y logging

- "Por ahora atcualiza si es necesario @investment-flow.md  y @development_status.md. Y vete haciendo uno por uno los siguientes puntos: * Manejo de errores en cliente: El frontend muestra mensajes de error genéricos. Sería bueno mejorar la claridad de estos mensajes para que los usuarios entiendan exactamente qué ocurrió. * Monitoreo de errores 500: Sería bueno implementar algún sistema de alerta o logging más detallado para errores 500, ya que son críticos y pueden indicar problemas graves en la aplicación."

## 12. Despliegue y configuración de entornos

**Prompt 1:**
```
Acuerdate de las @rules.mdc  
Entonces, podemos considerar que tenemos un MVP. 
Necesitamos prepararnos para realizar el despliegue. Hay que evaluar dos opciones:
1. Entorno temporal de prueba en servicios gratuitos
2. Entorno privado, definitivo

Para ambas opciones analiza la infaestructura completa necesaria para llevar a cabo el despliegue del MVP. Si se trata de la opción 2, debe dar soporte a la escalabilidad del proyecto. La infraestructura debe ser segura, estable y a la vez buscar la opción más barata. 

Creo que tenemos documentación acerca de este tipo de información. Si lo crees conveniente, guarda tus concluisones en un documento antiguo, o existente, Lo que resulta mejor para poder tomar deicisiones y tener documentación para revisar en el futuro
```

**Prompt 2:**
```
dime todas las opcioines de despliegue en un entorno real, busacndo pros y contras en cuanto a costes y facilidad de gestion y mantenimeinto del proyecto
```

**Prompt 3:**
```
si quisiera usar servicios de pago, que tengan una buena relación calidad precio, y que sea una infarestructura sencilla, ¿qué me recomiendas? Revias bien mi proyecto, para que no sete escape nada
```

**Prompt 4:**
```
es mejor eso? No es mejor un servidor VPS en cualquier hosting como tropical server?
```

**Prompt 5:**
```
en un VPS en Tropical srever podría desplegar por completo mi MVP? Incluido el almacenamiento de documentos? Por cierto llevas siglos olvidandote de las @rules.mdc 
```

**Prompt 6:**
```
Bueno, todas tus respuetsas me han parecido muy interesantes, pero respecto a las @rules.mdc es que no estás actualizando los @prompts.md , y ya hay muchos prompts que has omitido. A ver si consigues actualizar un poco el archivo
```

**Prompt 7:**
```
Vamos a empezar el despliegue, paso a paso. eres un senior DevOps Engineer. Necesito que me guies en el proceso de despliegue que hemos definido en entornos gratuitod. necesito que sean entornos a los que el Product Owner pueda acceder para testearlo. Has creado un archivo @deployment_free.md : revisalo primero, si quieres, y cuando te parezca adecuado comenzamos po rel primer paso. Revisa si es posible que en vez de Resend usemos GMAIL. Necesito además que uses buenas practicas según el codigo OWASP. Y como siempre que te acuerdes de las @rules.mdc , y por tanto actualices los archivos indicados.
```

## 11. Mejora de componentes y servicios

### 11.1 Cloudinary y gestión de documentos

**Prompt:**
```
@Cliudinary Assets Management 
Revisa bien como acceder a los documentos almacenados en Cloudinary, e incluso com opoder descargarlos. Revisa la gestion completa de los documentos en nuestro proyecto, porque es una parte básica y fundamental. De hecho, si quieres, puedes desarrollar primero este punto en todos sus casos de uso. ¿Dónde quieres ampliar este tema, en el documento @tickets.md ? Es importante revisar cada caso de uso, y con la documentacion de cloudinary asegurarnos que funciona bien, aunque siempre debemos dejar todo preparado, en la medida que se pueda, para poder usar en el futuro otro gestor de documentación
```

**Prompt:**
```
quiero que desarrolles todos los tickets en un nuevo documento en markdown, en la carpeta@product , y de forma completa con todos los casos de uso, y todos los escenarios según los tipos de documentos qe se pueden subir, los niveles de acceso, y los niveles de seguridad. Que cada actor tenga los accesos adecuados para cada caso de uso. Revisa toda la documentación que necesites: @tickets.md , @user-stories.md , @readme.md . Y apoyate en la documentacion de cloudinary @Cliudinary Assets Management 
```
