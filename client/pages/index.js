// Página de inicio
export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '0.5rem' }}>
        Bienvenido a COOPCO
      </h1>
      <h2 style={{ color: '#666' }}>
        Club de Inversión Inmobiliaria
      </h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444' }}>
        Plataforma digital exclusiva para un club privado de inversores inmobiliarios que permite acceder a 
        oportunidades cuidadosamente seleccionadas, con toda la información relevante para evaluar el 
        potencial de rentabilidad y seguir el desarrollo del proyecto.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginTop: '2rem' }}>
        <h3>Características principales:</h3>
        <ul>
          <li>Acceso exclusivo mediante invitación</li>
          <li>Oportunidades de inversión premium</li>
          <li>Seguimiento en tiempo real de proyectos</li>
          <li>Comunicación directa con gestores</li>
        </ul>
      </div>
    </div>
  );
} 