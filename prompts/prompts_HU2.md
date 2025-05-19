# Historia de Usuario 2: Ver oportunidades de inversión

> En esta sección se detallan los prompts principales utilizados durante la implementación de la Historia de Usuario 2 (Ver oportunidades de inversión).

## Implementación Ticket #20: API endpoints para listar y filtrar proyectos públicos

**Prompt 1:**
```
@rules.mdc @tickets.md @user-stories.md @development_status.md 
Claro, hay que desarrollar todos y cada uno de los tickets de esta Historia de Usuario, como buen desarrollador full-stack. Recuerda escribirlos en el orden logico de desarrollo, segun sus dependencias, y escribelos como siempre en@tickets.md. Fijate en los tickets escritos anteriormente, que son muy completos. Quiero que cada ticket permita al desarrollador tener toda la información para desarrollar lo necesario de princpio a fin, todo lo necesario para backend, frontend, y bases de datos, así como los tests necesarios para que el desarrollo sea robusto. He dicho los necesraios, que no significa hacer demasiados tests, sino solo lso que aporten valor añ desarrollo, y reduzcan futuros errores. Para los tickets que implican frontend hay que tener en cuenta librerias o dependiencias instaladas, o si fuera necesario recomendar otras. Para cada ticket hay que recomendar buenas prácticas. No olvides que esto es MVP, y aceurdate que cualquier alteración del modelo de datos hay que tenerla en cuenta para modificar base de datos y archivos implicados. Como siempre, acuerdate de las @rules.mdc 
```

**Prompt 2:**
```
Ok, muy bien. Y en algún sitio has reflejado el orden de desarrollo de dichos tickets, sus dependencias, etc?
```

**Prompt 3:**
```
si, igual que lo has hecho en las anteriores HU. Hazlo similar, para mantener una coherencia y una contonuidad. Una misma logica. Y sobretodo que este archivo @development_status.md , nos sirva para ir desarrollando sabiendo en que punto nos encontramos en cada momento. No se trata tantop de tener muchísima información, sino de saber qué está hecho y qué falta, y en que punto nos encontramos
```

**Prompt 4:**
```
Pues vamos a empezar a desarrollar, pero antes de nada crea una nueva rama para este desarrollo de HU, y llevate a esa rama los cambios actuales
```

**Prompt 5:**
```
vamos con el ticket#22. Estoy pendando que , para no perder todos mis prompts de este desarrollo de la HU2, crea un archivo llamado prompts_HU2, con el mismo formato que @prompts.md , pero si indice de navegación inicial, para ir guadando ahi todos los prompts de esta HU, tal y como se indica en @rules. 
```

## Implementación Ticket #21: API endpoints para detalle de un proyecto

**Prompt 6:**
```
pues adelante, empieza
```

## Implementación Ticket #22: Servicio frontend para consumo de API de proyectos públicos

**Prompt 7:**
```
vamos con el ticket#22. Estoy pendando que , para no perder todos mis prompts de este desarrollo de la HU2, crea un archivo llamado prompts_HU2, con el mismo formato que @prompts.md , pero si indice de navegación inicial, para ir guadando ahi todos los prompts de esta HU, tal y como se indica en @rules. 
```

**Prompt 8:**
```
has probado los tests?
```

**Prompt 9:**
```
sigue con el siguiente ticket
```

## Implementación Ticket #24: Componente de tarjeta de proyecto

**Prompt 10:**
```
sigue con el siguiente ticket
```

## Implementación Ticket #25: Componentes de filtrado y ordenación

**Prompt 12:**
```
sigue con los siguientes tickets, pero quiero ir viendo los resultados y haciendo tests. Dime donde comprobar los nuevos desarrollos
```

**Prompt 13:**
```
Server Error
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

This error happened while generating the page. Any console logs will be displayed in the terminal window.
Call Stack
React
renderElement
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6054:9)
renderNodeDestructiveImpl
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6115:11)
renderNodeDestructive
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6087:14)
renderNode
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6270:12)
renderHostElement
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (5642:3)
renderElement
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (5963:5)
renderNodeDestructiveImpl
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6115:11)
renderNodeDestructive
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6087:14)
renderNode
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (6270:12)
renderHostElement
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (5642:3)
renderElement
file:///Users/loretopardodesantayanagalbis/Sites/localhost/finalproject-LPS/node_modules/react-dom/cjs/react-dom-server.browser.development.js (5963:5)
```

**Prompt 14:**
```
1 of 2 errors
Next.js (14.2.28) is outdated (learn more)

Unhandled Runtime Error
ReferenceError: Cannot access 'renderFilterForm' before initialization

Source
components/projects/filters/ProjectFilters.jsx (208:14) @ renderFilterForm

  206 |           <div className="modal-box">
  207 |             <h3 className="font-bold text-lg mb-4">Filtrar proyectos</h3>
> 208 |             {renderFilterForm()}
      |              ^
  209 |             <div className="modal-action">
  210 |               <form method="dialog">
  211 |                 <Button variant="outline" className="mr-2">Cancelar</Button>
```

**Prompt 15:**
```
si, adelante. Pero antes haz un commit bien ejecutado con todos los cambios, y bien documentado
```

## Implementación Ticket #23: Página de listado de proyectos para socios

**Prompt 16:**
```
si, procede ahora con la implementación del Ticket #23: Página de listado de proyectos para socios
```

**Prompt 17:**
```
Lo primero quiero saber si has probado el nuevo desarrollo, y actualizado @development_status.md . Y despues habrá que seguir con el siguiente paso para ocmpletar la HU2
```

**Prompt 18:**
```
Y por que no lo haces? Te estás olvidando de las @rules? asi como de actualizar @prompts_HU2.md ?
```

## Implementación Ticket #27: Componente visor de galería de imágenes

**Prompt 19:**
```
Lo primero quiero saber si has probado el nuevo desarrollo, y actualizado @development_status.md . Y despues habrá que seguir con el siguiente paso para ocmpletar la HU2
```

## Implementación Ticket #28: Componente visor de documentos

**Prompt 20:**
```
si, contonua con el tcket 28. Cuando podré ver el listado de proyectos como socio?
```

## Implementación Ticket #26: Página de detalle de proyecto para socios

**Prompt 21:**
```
Revisando el estado de los tickets, veo que el #26 (Página de detalle de proyecto para socios) aparece como pendiente, pero al examinar el código, parece que ya está completamente implementado en frontend/pages/projects/[id].jsx. ¿Puedes actualizar el estado del desarrollo para reflejar que este ticket está completo?
```

## Implementación Ticket #30: Tests e2e para flujo de visualización de proyectos

**Prompt 22:**
```
adelante con los siguientes pasos
```

**Prompt 23:**
```
Ahora que hemos implementado todos los componentes y páginas para la visualización de proyectos, el siguiente paso es implementar los tests end-to-end para verificar que todo el flujo funciona correctamente. Vamos a utilizar Cypress para estos tests.
```
