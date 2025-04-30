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

**Prompt 10:**
```
Revisa el archivo @readme.md porque vamos a revisar la arquitectura del proyecto: 
* Eres un experto arquitecto de sistemas, con experiencia en proyectos similares al descrito. Revisa la arquitectira propuesta de backend y frontend. Quiero usar buenas prácticas DDD, SOLID, DRY y patrones de diseño. Ten en cuenta que yo soy una programadora junior, que el proyecto que quiero sacer adelante es un MVP, y necesito que sea fácil de mantener, y en el futuro se p ueda escalar. Antes de cambiar nada, dime qué sugieres. Quiero que analices la estructura de carpetas- las tecnologías usadas- la arquitectura de backend y frontend- todos los pasos para levantar el entorno, incluida la base de datos.
No te olvides de las @rules.mdc 
```

**Prompt 11:**
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

**Prompt 12:**
```
Tengo más consultas: 
1. Para la estrcutura de carpetas, incluirías prisma dentro del backend?, o mejor lo mantenemos fuera?
2. Revisa el archivo propuesto de @monitoring-logging.md , y dime si para desarrollar el proyecto con CURSOS y Claude, verdaderamente me aporta un valor añadido y me va a facilitar el desarrollo, o si por el contrario me va a comoplicar todo
3. Qué me recomiendas mas para reiniciar servidores al hacer pruebas: usar cross-port-killer, o crear un script que haga todo "manualmente"?
```

**Prompt 13:**
```
Pues vamos a llevar a cabo el punto 1, y por tanto actualizar los archivos necesarios son ese cambios, y el punto 3, y actualizar los archivos necesarios con el cambio. 
Además valora si sería mejor poner toda la documentación, o parte de ella, dentro de docs
Revisa todo el proyecto para no dejarte atrás ninguna actualización ni vinculo
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
Creo que has hecho un buen trabajo con @user-stories.md , pero quizá deberías revisar el modelo de datos descrito en @readme.md  para ver si cumple lo indicado en esas historias de usuario. Puedes aplicar un punto de vista crítico, como experto en bases de datos, y si ves que no está bien definido algo en las hsitorias de usurio respecto a la base de datos, indicamelo, o incluso te permito cambiar ese detalle de la historia de usuario. 

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
Ahora vamos a revisar las historias de usuario: Eres un experto en producto.
 A estas historias de usuario @user-stories.md  le falta detalle técnico y específico para permitir al developer ser totalmente autónomo a la hora de completarla.
 Por favor entiende la necesidad y proporciona una historia mejorada que sea más clara, específica y concisa acorde a las mejores prácticas de producto, incluyendo descripción completa de la funcionalidad, lista exhaustiva de campos a tocar, estructura y URL de los endpoints necesarios, ficheros a modificar acorde a la arquitectura y buenas prácticas, pasos para que la tarea se asuma como completada, cómo actualizar la documentación que sea relevante o crear tests unitarios, y requisitos no funcionales relativos a seguridad, rendimiento, etc. Actualiza @user-stories.md  en formato markdown, y no olvides las@rules.mdc 

En @readme.md tambiñen hay historias de usuario. Actualiza esas historias de usuario igualmente con el mismo contenido que en @user-stories.md 
```

**prompt 6:**
```
Bien, pero revisa estos puntos:
1. Están TODAS histroias de usuario definidas por completo? Al menos mantiene las necesarias para el MVP @user-stories.md , y desarrollalas enteras
2. Por qué has creado un uevo archivo de prompts, y por qué añades el prompt diferente a cómo yo lo he escrito? siemptre debes usar @prompts.md y seguir las @rules.mdc 
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
ok, pero no quiero que se rompa nada de lo que ya está desarrollado. ten cuidado. haz las pruebas que necesites para no estropear lo que ya funciona
```

## 7. Pull requests

**Prompt 1:**
```
Index y estudia todo el proyecto a fondo, como experto desarrollador full-satck:

1. Lo primero que qiuero saber es ¿donde y cómo puedo desplegar el proyecto? ¿Qué infaestructura necesito? ¿Hay alguna forma de hacerlo de manera gratuita?

2. Después quiero empezar a desarrollarlo. Haz un roadmap de las tickets a desarrollar, según la información que ya tenemos, teniendo en cuenta que queremos un MVP, y que hay que poantear todo para un desarrollador junior

<!-- 
Eres un experto en desarrollo de software y conoces las buenas prácticas para la creación de pull requests. En base a los tickets de trabajo, crea los pull requests. Da todo el detalle requerido para desarrollar la tarea de inicio a fin, teniendo en cuenta las buenas prácticas al respecto. -->
```


## 8. Requisitos y configuración

- REVISA @env-example.md . No hace falt aañdir URLs tipo FRONTEND_URL, por ejemplo?

# Prompts

## Sistema

### Crear estructura de carpetas
```
Basandote en @readme.md , crea la estructura de carpetas, pero no desarrolles nada aún
```

### Iniciar servicio PostgreSQL
```
ejecuta brew services start postgresql
```

### Documentar problemas con PostgreSQL
```
documenta @setup.md con tu respuesta, para tenerlo en cuenta en el futuro. Añadelo también en @readme.md en el lugar más adecuado
```

### Configurar schema de Prisma
```
npx prisma generate --schema=./backend/prisma/schema.prisma
Environment variables loaded from .env
Prisma schema loaded from backend/prisma/schema.prisma
Error: 
You don't have any datasource defined in your schema.prisma.
You can define a datasource like this:

datasource db {
  provider = "postgresql"
  url      = env("DB_URL")
}

More information in our documentation:
https://pris.ly/d/prisma-schema
```

### Ejecutar migraciones de Prisma
```
Tienes la conexion a la base de datos en @env-example.md . Ejecuta npx prisma migrate dev --schema=./backend/prisma/schema.prisma
```

### Iniciar aplicación y verificar funcionamiento
```
haz una prueba sencilla de que el proyecto ha arrancado correctamente: frontend, backend y bases de datos
```

## Historia de Usuario 1: Registro mediante invitación

*   [X] Vamos a empezar el desarrollo. Comienza por el primer ticket de `docs/product/tickets.md`.
*   [ ] si, adelante con la opción B
*   [ ] si, adelante con este enfoque. Puedes mantener la contraseña que has propuesto
*   [ ] haz tu la llamada con curl
*   [ ] vuelve a probar el curl
*   [ ] com olos reviso?
*   [ ] 1] Login error in AuthController: data and hash arguments required
*   [ ] Si, empieza por el paso que propones. Donde crear el archivo debe ser conforme a la estructura y arquitectura definidas. Puedes revisar los archivos que necesites, especialmente el `@readme.md`. te estás olvidando ultimamente de las `@rules.mdc`
*   [ ] ya he econtrado el problema. He probado el login, y ha funcionado. Vamos a por el siguiente paso del ticket
*   [ ] Entnces, esta todo el ticket 1? Entonces pasaremos al ticket 2
*   [ ] Me parece bien dedciar tiempo a escribir los test para el login, antes de pasar al siguiente ticket
*   [ ] qué opinas tu? Si no lo ves importante y necesario no hagas los tests.
*   [ ] vamos apor el ticket 2. Y no te olvides de las @rules.mdc
*   [ ] Pues quizá no estaba bien definido el orden de los tickets. Entonces, no sería más conveniente empezar por el ticket 3?
*   [ ] si, adelante con el ticket 4
*   [ ] Qué conviene hacer primero: ¿el ticket2? o el ticket 4?
*   [ ] sigue el plan de accion y pruebas que me has propuesto, pero vamos paso a paso
*   [ ] escribe los tests. Hazlo en el archivo más conveniente usando buenas prácticas, y bajo tu conocimiento como experto en tests
*   [ ] si, adelante
*   [ ] me refiero a que quiero que los emails se envñien de verdad. Y quiero hacer pruebas con tests siempre que consideres, y según que ticklets estés desarrollando considera los tipos de tests que debes hacer, según tu gran experiencia en este campo. Y también habrá que hacer pruebas en el frontend
*   [ ] He hecho la prueba real y ha funcionado. Si consideras recomendable para mi proyecto hacer el resto de tests que propones, adelante. Y sino, pasaremos al siguiente paso
*   [ ] si, me parece perfecto. Adelante
*   [ ] si, haz las pruebas con curl
*   [ ] si, adelante con el frontend del ticket 6
*   [ ] Revisa qué tickets están hechos @tickets.md y cuales serían los siguientes pasos, sin olvidarte de los test que sean necesarios. Y no te olvides de @rules.mdc 
*   [ ] Me sigue sorprendiendo que, después de haber analizado cada archivo del proyecto, sigas queriendo crear archivos con extensión jsx. ¿No son generalmente .js? 
Te voy a volver a pedir lo que te he pedido al principio, pero debes ser totalmente coherente con lo que ya está desarrollado, y con el @readme.md , admás de tener en cuenta las @rules.mdc 
@tickets.md Revisa los tickets definidos para la historia de usuario 1. Revisa TODO el proyecto, y conluye qué tickets están termindos y cuales serían los próximos pasos para terminar lo que falta, sin olvidarte de los tests que creas oportunos. Y no olvides las rules.mdc
*   [ ] si, adelante. Completa el ticket 6
*   [ ] antes lo voy a probar desde el frontend, pero no tengo acceso a invitations desde el dashboard
*   [ ] ok, ha funcionado muy bien el envío de la invitación desde el frontend, pero no puedo ver qué invitaciones he enviado y en qué estado se encuentran. ¿Esta tarea está defibida en algún ticket?
*   [ ] si, sigue con el siguiente ticket que lo estás haciendo muy bien. Deben cumplirse todos los criterios de aceptación. te estás olvidando siempre de las @rules.mdc
```

## Análisis de Tickets y Próximos Pasos

- `@readme.md @tickets.md Estudia e indexa todo el proyecto. Dime cual es el siguiente ticket a desarrollar`
```
- `si, y para relleneralo revisa ticket a ticket su estado actual`
```

- `si, con mucho cuidado. Paso a paso. Comrpobando cada uno de ellos. Antes de nada, asugurate que la entidad user tenga firstname y lastname`
```

- `si, pero veo una inchoerencia en el. ticket10, porque habla de name, cuando debe ser firstname y lastname`
```

\n- `he hecho pruebas de registro desde el front y me da este error: Name, email, password and invitation token are required`\n- `Invalid prisma.user.create() invocation in /Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/backend/application/use_cases/registerUser.js:72:37 [...] Unknown argument \`email_verified\`. Did you mean \`emailVerified\`?`