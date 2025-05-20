import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import VerificationBanner from '../ui/VerificationBanner';
import { useAuth } from '../../context/AuthContext';

/**
 * Layout principal de la aplicación que incluye navegación y footer
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del layout
 * @param {boolean} props.hideNav - Si es verdadero, oculta la barra de navegación
 * @param {boolean} props.hideFooter - Si es verdadero, oculta el footer
 * @param {boolean} props.hideVerificationBanner - Si es verdadero, oculta el banner de verificación
 */
const Layout = ({ 
  children, 
  hideNav = false, 
  hideFooter = false,
  hideVerificationBanner = false 
}) => {
  const { user } = useAuth();
  
  // Mostrar el banner solo si hay un usuario autenticado y no está oculto explícitamente
  const showVerificationBanner = !hideVerificationBanner && user;
  
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <Navbar />}
      
      {/* Banner de verificación de email */}
      {showVerificationBanner && <VerificationBanner />}
      
      <main className={`flex-grow ${showVerificationBanner ? 'pt-32' : 'pt-20'}`}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout; 