# Historia de Usuario 3: Marcar Invierto

> En esta sección se detallan los prompts principales utilizados durante la implementación de la Historia de Usuario 3 (Marcar Invierto).

## Análisis y planificación

**Prompt 1:**
```
Revisa cual el la siguiente HU a desarrollar, crea una rama, y desarrolla los tickets igual que has hecho en las anteriores @tickets.md  , fijandote en como te lo he pedido otras veces, @prompts.md , creando un archivo cuyo nombre contenga el numero de la HU, igual que antes: prompts_HUnumero_historia, actualizando tambien @development_status.md , sin perder de vista @production_deployment.md . 
Crea los tickets, y no desarrolles nada aún
```

## Creación de tickets

**Prompt 2:**
```
Desarrolla los tickets de la HU3, y escribelos al final del archivo @tickets.md 
```

**Prompt 3:**
```
Para la HU3: hay que desarrollar todos y cada uno de los tickets de esta Historia de Usuario, como buen desarrollador full-stack. Recuerda escribirlos en el orden logico de desarrollo, segun sus dependencias, y escribelos en un nuevo archivo que se llame tickets_HU3.md
Fijate en los tickets escritos anteriormente, que son muy completos. Quiero que cada ticket permita al desarrollador tener toda la información para desarrollar lo necesario de princpio a fin, todo lo necesario para backend, frontend, y bases de datos, así como los tests necesarios para que el desarrollo sea robusto. He dicho los necesraios, que no significa hacer demasiados tests, sino solo lso que aporten valor añ desarrollo, y reduzcan futuros errores. Para los tickets que implican frontend hay que tener en cuenta librerias o dependiencias instaladas, o si fuera necesario recomendar otras. Para cada ticket hay que recomendar buenas prácticas. No olvides que esto es MVP, y aceurdate que cualquier alteración del modelo de datos hay que tenerla en cuenta para modificar base de datos y archivos implicados.
```

## Implementación

**Prompt 4:**
```
In this conversation, I was asked to implement tickets for Historia de Usuario 3 (HU3) - "Marcar Invierto" (Mark Investment) functionality for a project. I worked on implementing seven tickets in sequence:

1. Ticket #40: Created an Investment entity in the domain layer (backend/domain/entities/investment.js) with validation methods and business logic
2. Ticket #41: Developed a Project entity with investment support functions (backend/domain/entities/project.js)
3. Ticket #42: Implemented a backend InvestmentService with transaction support and notification integration
4. Ticket #43: Created API endpoints for investment management with proper routes, controllers, and authentication middleware
5. Ticket #44: Created a frontend investmentService.js to communicate with the API
6. Ticket #45: Created InvestmentForm.jsx component with validation and user feedback
7. Ticket #46: Integrated InvestButton.jsx into the project detail page with modal functionality
```

**Prompt 5:**
```
Explora cual sería el siguiente paso en el desarrollo de mi proyecto. Crees adecuado terminar el MVP para pasarlo a un servidor en la nube? O es mejor hacerlo antes?
```

## Corrección de errores

**Prompt 9:**
```
Te voy diciendo errores. 
*Mira la imagen 
En la barra verde que muestra progreso de financiación, hay un error porque pone NaN%, y después Nan € de 60.000 €. Además se ve la barra coloreada de verde como si se hubiera completado la inversión. Además, habla de financiación cuando sería maas correcto hablar de inversión

* No hay enlace a Mis Inversiones desde el menú

* Como gestor no hay panel de administración de inversiones
```

**Prompt 10:**
```
Desarrolla el resto de tickets, y despues guiame paso a paso para probar todo lo desarrollado
```

## Implementación de Tickets #47 y #48

```
Las pruebas de implementación actual me parecería bien hacerlas si lo ves importante para un desarrollo consistente, teniendo en cuenta que es un MVP, y que a veces hay que tener cuidado de no excederse en los tests si no son necesarios. Pero bajo tu experiencia como desarrollador full-stack, toma la decisión.
Una vez decidido si vas a hacer más pruebas, dime qué pasos vas a seguir