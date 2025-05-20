# Historia de Usuario 7: Confirmación de correo electrónico

> En esta sección se detallan los prompts principales utilizados durante la implementación de la Historia de Usuario 7 (Confirmación de correo electrónico).

## Análisis y planificación

**Prompt 1:**
```
Bien, pues vamos a por esta HU.
1. Crea una rama para su desarrollo
2. Crea un archivo tickets_HU7.md en markdown siguiendo las buenas prácticas. Como ejemplo de como debes hacerlo, revisa la sección @## 6. Tickets de Trabajo  de @prompts.md 
3. No te olvides las @rules.mdc , y para esta HU crea un archivo en la carpeta @prompts que se llame prompts_HU7.md en markdown, incluyendo TODOS los prompts que yo te escriba, igual que se especifica en @rules.mdc 
4. Añade rules para indicar que tambiñen hay que añadir los prompts de casa historia de usuario en su archivo correspondiente, como ahora: prompts_HU7.md, y también crea una rule para indicar cómo deben crearse los tickets de una Historia de Usuario
5. Una vez creados los tickets, te iré diciendo por donde empezar, así que no olvides crearlos en un orden lógico de desarrollo, tebiendo en cuenta las dependencias
``` 


**Prompt 2:**
```
Desarrolla el primer ticket de @tickets_HU7.md , paso a paso. Si hay cambios en el modelo de datos acuerdate de actualizar toda la documentación @readme.md , y la propia base de datos. 
```

**Prompt 3:**
```
Primero haz un commit con los ultimos cambiso que han servido para corregir errores, y adelante con el siguiente ticket. Recuerda que el orden de ejecución de los tikctes ha de ser el de un desarrollo lógico y teniendo en cuenta las dependiencias
```

**Prompt 4:**
```
sigue el trabajo que estabas haciendo desde el punto que lo has dejado
```

**Prompt 5:**
```
No he visto los tests ni los hemos probado. 
No te olivdes las @rules.mdc 
```

**Prompt 6:**
```
Entiendo que queda hacer commit antes de afrontar el desarrollo del siguiente ticket
```

**Prompt 7:**
```
Comineza a desarrollar el siguiente ticket, y no te olvides de las @rules.mdc 
```

**Prompt 8:**
```
No termino de entneder esta lógica, porque hasta ahora, cuando una persona recibia una invitación a su coirreo, mediante un link podía entrar en un formulario de registro. El usuario se registraba y automaticamente, ese email era el de un nevo socio.  ¿Ahora que has desarrollado?
```

**Prompt 9:**
```
Bien, sigue. No te olvides de las @rules.mdc en ningun momento
```

**Prompt 10:**
```
Vamos a probarlo, no? Que pruebas propones para que sea un testeo completo y eficaz? Acuerdate de las @rules.mdc 
```

**Prompt 11:**
```
en el index 
Build Error

Failed to compile
Next.js (14.2.28) is outdated (learn more)
./components/ui/VerificationBanner.jsx:2:1

Module not found: Can't resolve 'react-icons/fa'
  1 | import React, { useState, useEffect } from 'react';
> 2 | import { FaExclamationTriangle, FaTimesCircle, FaTimes, FaEnvelope } from 'react-icons/fa';
    | ^
  3 | import VerificationService from '../../services/verificationService';
  4 | import Button from './Button';
  5 |

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./components/layout/Layout.jsx

./pages/investments/[id].jsx
```

**Prompt 12:**
```
1 of 1 error
Next.js (14.2.28) is outdated (learn more)
Server Error

TypeError: Cannot read properties of undefined (reading '_context')
This error happened while generating the page. Any console logs will be displayed in the terminal window.
Source
React

components/layout/Layout.jsx (21:31) @ AuthContext

  19 |   hideVerificationBanner = false 
  20 | }) => {
> 21 |   const { user } = useContext(AuthContext);
     |                               ^
  22 |   
  23 |   // Mostrar el banner solo si hay un usuario autenticado y no está oculto explícitamente
  24 |   const showVerificationBanner = !hideVerificationBanner && user;
```

**Prompt 13:**
```
he parado sin querer el proceso, sigue desde el punto donde lo dejaste
```

**Prompt 14:**
```
ses uperponen dos elementos
```

**Prompt 15:**
```
Yo creo que está todo bien desarrollado. Actualiza @development_status.md , y @prompts.md  y @prompts_HU7.md  y haz commit. Y después siguiente ticket
```


