import React, { useState } from 'react';
import Head from 'next/head';
import DocumentViewer from '../../components/projects/DocumentViewer';
import Button from '../../components/ui/Button';

// Documentos de ejemplo para la demostración
const EXAMPLE_DOCUMENTS = [
  {
    id: 'doc1',
    name: 'Planos de construcción',
    url: 'https://www.africau.edu/images/default/sample.pdf',
    fileType: 'application/pdf',
    documentType: 'technical',
    accessLevel: 'partner',
    securityLevel: 'view_only',
    description: 'Planos técnicos del proyecto con detalles constructivos'
  },
  {
    id: 'doc2',
    name: 'Imagen del proyecto',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    fileType: 'image/jpeg',
    documentType: 'marketing',
    accessLevel: 'public',
    securityLevel: 'download',
    description: 'Renderizado 3D de la fachada principal'
  },
  {
    id: 'doc3',
    name: 'Video promocional',
    url: 'https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-scenic-landscape-with-forests-and-mountains-5125/1080p.mp4',
    fileType: 'video/mp4',
    documentType: 'marketing',
    accessLevel: 'public',
    securityLevel: 'download',
    description: 'Video promocional del entorno del proyecto'
  },
  {
    id: 'doc4',
    name: 'Contrato de inversión',
    url: 'https://www.africau.edu/images/default/sample.pdf',
    fileType: 'application/pdf',
    documentType: 'legal',
    accessLevel: 'investor',
    securityLevel: 'full_access',
    description: 'Documento legal con términos y condiciones'
  },
  {
    id: 'doc5',
    name: 'Hoja de cálculo financiera',
    url: '#document-not-available',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    documentType: 'financial',
    accessLevel: 'investor',
    securityLevel: 'download',
    description: 'Análisis financiero y proyecciones'
  }
];

/**
 * Página de demostración del componente DocumentViewer
 */
const DocumentViewerExamplePage = () => {
  const [selectedDocId, setSelectedDocId] = useState('doc1');
  const [fullScreenDoc, setFullScreenDoc] = useState(null);
  const [showControls, setShowControls] = useState(true);
  
  // Obtener el documento seleccionado
  const selectedDocument = EXAMPLE_DOCUMENTS.find(doc => doc.id === selectedDocId) || EXAMPLE_DOCUMENTS[0];
  
  return (
    <>
      <Head>
        <title>Ejemplo de Visor de Documentos | COOPCO</title>
        <meta name="description" content="Demostración del componente visor de documentos para proyectos" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Demostración: Visor de Documentos
        </h1>
        
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Seleccionar documento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {EXAMPLE_DOCUMENTS.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-3 rounded-lg border text-left transition 
                  ${selectedDocId === doc.id 
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="capitalize">{doc.documentType}</span>
                  {' • '}
                  <span className="text-gray-400">{doc.fileType}</span>
                </p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    doc.securityLevel === 'view_only' ? 'bg-yellow-100 text-yellow-800' :
                    doc.securityLevel === 'download' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {doc.securityLevel === 'view_only' ? 'Solo ver' :
                     doc.securityLevel === 'download' ? 'Descarga' :
                     'Acceso completo'}
                  </span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    doc.accessLevel === 'public' ? 'bg-gray-100 text-gray-800' :
                    doc.accessLevel === 'partner' ? 'bg-blue-100 text-blue-800' :
                    doc.accessLevel === 'investor' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.accessLevel === 'public' ? 'Público' :
                     doc.accessLevel === 'partner' ? 'Socio' :
                     doc.accessLevel === 'investor' ? 'Inversor' :
                     'Admin'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button 
              onClick={() => setFullScreenDoc(selectedDocument)}
              variant="primary"
            >
              Abrir en pantalla completa
            </Button>
            
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={showControls} 
                onChange={() => setShowControls(!showControls)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                Mostrar controles
              </span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Visor de documentos</h2>
            <DocumentViewer 
              document={selectedDocument}
              showControls={showControls}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Información del documento</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{selectedDocument.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Tipo de documento</h4>
                    <p className="text-sm text-gray-700 capitalize">{selectedDocument.documentType}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Tipo de archivo</h4>
                    <p className="text-sm text-gray-700">{selectedDocument.fileType}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Nivel de acceso</h4>
                    <p className="text-sm text-gray-700 capitalize">{selectedDocument.accessLevel}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Nivel de seguridad</h4>
                    <p className="text-sm text-gray-700">
                      {selectedDocument.securityLevel === 'view_only' ? 'Solo visualización' :
                       selectedDocument.securityLevel === 'download' ? 'Permite descarga' :
                       selectedDocument.securityLevel === 'print' ? 'Permite impresión' :
                       'Acceso completo'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Estado vacío */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Estado cuando no hay documento</h2>
          <DocumentViewer document={null} />
        </div>
      </div>
      
      {/* Documento en pantalla completa */}
      {fullScreenDoc && (
        <DocumentViewer 
          document={fullScreenDoc}
          onClose={() => setFullScreenDoc(null)}
          showControls={showControls}
          isFullScreen={true}
        />
      )}
    </>
  );
};

export default DocumentViewerExamplePage; 