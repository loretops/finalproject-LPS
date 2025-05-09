import React from 'react';
import Link from 'next/link';

/**
 * Componente Footer con información de la empresa, links útiles y derechos de autor
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="/" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Inicio
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/sobre-nosotros" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Sobre Nosotros
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/politica-privacidad" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Política de Privacidad
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/terminos-servicio" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Términos de Servicio
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/contacto" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Contacto
            </Link>
          </div>
        </nav>
        
        <div className="mt-10 flex justify-center space-x-10">
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              />
            </svg>
          </Link>
        </div>
        
        <div className="mt-10 border-t border-gray-900/10 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {currentYear} COOPCO. Todos los derechos reservados.
          </p>
          <p className="mt-4 text-xs leading-5 text-gray-500 sm:mt-0">
            Club privado de inversores inmobiliarios.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 