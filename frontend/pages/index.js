import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <header style={{
        marginBottom: '2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>COOPCO</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Plataforma exclusiva para club privado de inversores inmobiliarios
        </p>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem'
        }}>
          <Link href="/login" style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1rem'
            }}>
            Acceder
          </Link>
        </div>
      </header>

      <main>
        <section style={{ 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px', 
          padding: '2rem',
          marginBottom: '2rem' 
        }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Bienvenido a COOPCO</h2>
          <p>
            Nuestra plataforma conecta a un club privado de inversores con oportunidades 
            inmobiliarias de alta calidad, facilitando una gestión transparente, segura 
            y eficiente del proceso de inversión.
          </p>
        </section>

        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.8rem' }}>Exclusividad</h3>
            <p>Acceso por invitación a un club cerrado de inversores seleccionados.</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.8rem' }}>Análisis Sólidos</h3>
            <p>Inversiones respaldadas por análisis económicos, de mercado y visuales.</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.8rem' }}>Transparencia</h3>
            <p>Seguimiento continuo de la evolución de proyectos con vídeos en directo.</p>
          </div>
        </section>
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '1rem 0', 
        borderTop: '1px solid #eaeaea',
        color: '#666'
      }}>
        <p>© {new Date().getFullYear()} COOPCO - Todos los derechos reservados</p>
      </footer>
    </div>
  );
} 