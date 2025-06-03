import React from 'react';
import Layout from '../components/layout/Layout';

export default function TerminosServicio() {
  return (
    <Layout>
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Términos de Servicio
            </h1>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Última actualización: 1 de junio de 2023
            </p>
          </div>
          <div className="mt-12">
            <div className="prose prose-primary prose-lg text-gray-500 mx-auto">
              <h2>1. Introducción</h2>
              <p>
                Estos Términos de Servicio ("Términos") regulan su acceso y uso de la plataforma COOPCO, 
                incluyendo cualquier contenido, funcionalidad y servicios ofrecidos en o a través de 
                nuestra plataforma. Al registrarse en nuestra plataforma o utilizarla de cualquier manera, 
                usted acepta estar sujeto a estos Términos.
              </p>

              <h2>2. Elegibilidad</h2>
              <p>
                Para utilizar nuestros servicios, usted debe:
              </p>
              <ul>
                <li>Tener al menos 18 años de edad.</li>
                <li>Ser residente fiscal en uno de los países donde operamos.</li>
                <li>Tener capacidad legal para celebrar contratos vinculantes.</li>
                <li>No estar prohibido por la ley para utilizar nuestros servicios.</li>
                <li>Haber recibido una invitación formal para unirse a nuestro club de inversores.</li>
              </ul>

              <h2>3. Registro de cuenta</h2>
              <p>
                Para acceder a ciertas funciones de la plataforma, debe registrarse para obtener una cuenta. 
                Al registrarse, usted acepta proporcionar información precisa, actual y completa, y mantener 
                esta información actualizada. Usted es responsable de mantener la confidencialidad de su 
                contraseña y de todas las actividades que ocurran bajo su cuenta.
              </p>

              <h2>4. Inversiones</h2>
              <p>
                Todas las inversiones realizadas a través de nuestra plataforma:
              </p>
              <ul>
                <li>Están sujetas a los términos específicos de cada proyecto.</li>
                <li>Implican riesgos, incluida la posible pérdida del capital invertido.</li>
                <li>Requieren documentación legal adicional específica para cada proyecto.</li>
                <li>No garantizan rendimientos futuros.</li>
              </ul>
              <p>
                COOPCO actúa como facilitador entre inversores y proyectos, y coinvierte entre un 10% y un 15% 
                en cada proyecto presentado en la plataforma.
              </p>

              <h2>5. Limitación de responsabilidad</h2>
              <p>
                COOPCO no será responsable por:
              </p>
              <ul>
                <li>Decisiones de inversión tomadas por los usuarios basadas en la información proporcionada.</li>
                <li>Pérdidas o daños resultantes del uso de la plataforma.</li>
                <li>Interrupciones o fallos técnicos que puedan afectar al servicio.</li>
                <li>Contenido proporcionado por terceros a través de la plataforma.</li>
              </ul>

              <h2>6. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos en cualquier momento. Si realizamos cambios, 
                publicaremos los Términos actualizados en esta página y actualizaremos la fecha de "última actualización". 
                El uso continuado de la plataforma después de cualquier cambio constituye su aceptación de los 
                Términos modificados.
              </p>

              <h2>7. Legislación aplicable</h2>
              <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta 
                sus principios de conflicto de leyes. Cualquier disputa relacionada con estos Términos estará 
                sujeta a la jurisdicción exclusiva de los tribunales de Madrid, España.
              </p>

              <h2>8. Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre estos Términos, contáctenos en:
              </p>
              <p>
                Email: legal@coopco.com<br />
                Dirección: Calle Principal 123, 28001, Madrid, España
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 