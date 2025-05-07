import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout principal de la aplicación que incluye navegación y footer
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del layout
 * @param {boolean} props.hideNav - Si es verdadero, oculta la barra de navegación
 * @param {boolean} props.hideFooter - Si es verdadero, oculta el footer
 */
const Layout = ({ children, hideNav = false, hideFooter = false }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {!hideNav && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout; 