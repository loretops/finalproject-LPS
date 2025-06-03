import React from 'react';
import Layout from '../components/layout/Layout';

export default function PoliticaPrivacidad() {
  return (
    <Layout>
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Última actualización: 1 de junio de 2023
            </p>
          </div>
          <div className="mt-12">
            <div className="prose prose-primary prose-lg text-gray-500 mx-auto">
              <h2>1. Introducción</h2>
              <p>
                En COOPCO respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
                Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando 
                visita nuestra plataforma y le informará sobre sus derechos de privacidad y cómo la ley le protege.
              </p>

              <h2>2. Datos que recopilamos</h2>
              <p>
                Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, 
                que hemos agrupado de la siguiente manera:
              </p>
              <ul>
                <li>
                  <strong>Datos de identidad:</strong> incluye nombre, apellidos, nombre de usuario o identificador similar.
                </li>
                <li>
                  <strong>Datos de contacto:</strong> incluye dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.
                </li>
                <li>
                  <strong>Datos financieros:</strong> incluye detalles de cuenta bancaria solo para procesar inversiones.
                </li>
                <li>
                  <strong>Datos de transacción:</strong> incluye detalles sobre pagos hacia y desde usted, y otros detalles de productos y servicios que ha adquirido de nosotros.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> incluye dirección IP, datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de plug-in del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utiliza para acceder a nuestra plataforma.
                </li>
              </ul>

              <h2>3. Cómo utilizamos sus datos</h2>
              <p>
                Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus datos personales en las siguientes circunstancias:
              </p>
              <ul>
                <li>Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.</li>
                <li>Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y derechos fundamentales no anulen esos intereses.</li>
                <li>Cuando necesitemos cumplir con una obligación legal o regulatoria.</li>
              </ul>

              <h2>4. Compartir datos</h2>
              <p>
                Podemos compartir sus datos personales con las partes que se establecen a continuación para los fines establecidos en esta política de privacidad:
              </p>
              <ul>
                <li>Proveedores de servicios que nos brindan servicios de administración de TI y sistema.</li>
                <li>Asesores profesionales, incluidos abogados, banqueros, auditores y aseguradores.</li>
                <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
              </ul>

              <h2>5. Seguridad de datos</h2>
              <p>
                Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan, usen o accedan accidentalmente de manera no autorizada, se alteren o divulguen. Además, limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de saber.
              </p>

              <h2>6. Sus derechos legales</h2>
              <p>
                Bajo ciertas circunstancias, tiene derechos bajo las leyes de protección de datos en relación con sus datos personales, incluido el derecho a:
              </p>
              <ul>
                <li>Solicitar acceso a sus datos personales.</li>
                <li>Solicitar la corrección de sus datos personales.</li>
                <li>Solicitar la eliminación de sus datos personales.</li>
                <li>Oponerse al procesamiento de sus datos personales.</li>
                <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
                <li>Solicitar la transferencia de sus datos personales.</li>
                <li>Derecho a retirar el consentimiento.</li>
              </ul>

              <h2>7. Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en:
              </p>
              <p>
                Email: privacidad@coopco.com<br />
                Dirección: Calle Principal 123, 28001, Madrid, España
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 