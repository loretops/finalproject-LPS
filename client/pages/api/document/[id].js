// API route para acceso seguro a documentos
// Usando jose en lugar de jsonwebtoken para compatibilidad con Edge/Browser
import * as jose from 'jose';

export default async function handler(req, res) {
  // Solo permitir peticiones GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  try {
    const { id } = req.query;
    const { token } = req.query;

    // Verificar que se proporcionó un token
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Acceso no autorizado. Se requiere token' 
      });
    }

    // Verificar el token usando jose
    let decodedToken;
    try {
      // Crear clave de firma a partir del secreto
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(process.env.JWT_SECRET);
      
      // Verificar el token
      const { payload } = await jose.jwtVerify(token, secretKey);
      decodedToken = payload;
    } catch (error) {
      console.error('Error verificando token:', error);
      return res.status(401).json({ 
        success: false, 
        error: 'Token inválido o expirado' 
      });
    }

    // Comprobar que el token es para este documento
    if (decodedToken.documentId !== id || decodedToken.purpose !== 'document-access') {
      return res.status(403).json({ 
        success: false, 
        error: 'Token no válido para este documento' 
      });
    }

    // En un entorno real, aquí buscarías el documento en la base de datos
    // const document = await prisma.projectDocument.findUnique({
    //   where: { id }
    // });
    
    // if (!document) {
    //   return res.status(404).json({ success: false, error: 'Documento no encontrado' });
    // }

    // Registro de acceso para auditoría
    console.log(`[AUDIT] ${new Date().toISOString()} - User: ${decodedToken.userId} - Access Document: ${id}`);
    
    // Si el documento está encriptado, desencriptarlo
    // if (document.isEncrypted) {
    //   const decryptedContent = // ... lógica de desencriptación
    // }

    // Servir el documento con restricciones de seguridad
    res.setHeader('Content-Disposition', 'inline; filename="documento.pdf"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Prevenir descarga y cacheo
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // En un caso real, se devolvería el contenido real del documento
    // return res.send(documentContent);
    
    // Para este ejemplo simplemente devolvemos un mensaje
    return res.status(200).json({ 
      success: true, 
      message: 'Acceso al documento concedido',
      documentId: id,
      // Se podrían incluir metadatos seguros del documento
    });
    
  } catch (error) {
    console.error('Error accessing document:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
} 