require('dotenv').config({ path: require('path').resolve(__dirname, '../../../../.env') });
const path = require('path');
const CloudinaryStorageService = require('../../../infrastructure/external/storage/CloudinaryStorageService');
const fs = require('fs');

describe('CloudinaryStorageService Integration', () => {
  let service;
  let uploadedUrl;

  beforeAll(() => {
    service = new CloudinaryStorageService();
  });

  it('debe subir un PDF a Cloudinary y devolver la URL', async () => {
    // Cargar un PDF de ejemplo desde la carpeta de tests o usar un buffer simple
    const filePath = path.join(__dirname, '../../fixtures/test.pdf');
    let buffer;
    if (fs.existsSync(filePath)) {
      buffer = fs.readFileSync(filePath);
    } else {
      // Si no existe, crea un buffer simple (no será un PDF real, pero sirve para la prueba)
      buffer = Buffer.from('%PDF-1.4\n%Fake PDF for test');
    }
    const file = {
      originalname: 'test-upload.pdf',
      buffer,
      mimetype: 'application/pdf',
    };

    const folder = 'documents/test-integration';
    uploadedUrl = await service.storeFile(file, folder);

    expect(typeof uploadedUrl).toBe('string');
    expect(uploadedUrl).toMatch(/^https:\/\/res\.cloudinary\.com\//);
    expect(uploadedUrl).toContain('/documents/test-integration/');
  });

  it('debe generar una URL firmada para un PDF y permitir su visualización', async () => {
    // Preparar un PDF de ejemplo
    const filePath = path.join(__dirname, '../../fixtures/test.pdf');
    let buffer;
    if (fs.existsSync(filePath)) {
      buffer = fs.readFileSync(filePath);
    } else {
      buffer = Buffer.from('%PDF-1.4\n%Fake PDF for test');
    }
    const file = {
      originalname: 'test-signed.pdf',
      buffer,
      mimetype: 'application/pdf',
    };

    const folder = 'documents/test-integration-signed';
    // Subir el archivo y obtener la URL pública
    const uploaded = await service.storeFile(file, folder);

    // Generar URL firmada con expiración de 600 segundos
    const signedUrl = await service.getSignedUrl(uploaded, 600);

    // Validar formato de la URL firmada
    expect(typeof signedUrl).toBe('string');
    expect(signedUrl).toMatch(/^https:\/\/res\.cloudinary\.com\//);
    // Para raw (documentos), debe usar delivery tipo 'authenticated'
    expect(signedUrl).toMatch(/\/raw\/authenticated\//);
    // Debe incluir el token de acceso autenticado (_a) según Cloudinary v2
    expect(signedUrl).toContain('_a=');

    // Eliminar el archivo subido de Cloudinary
    await service.deleteFile(uploaded);
  });

  afterAll(async () => {
    if (uploadedUrl) {
      // Elimina el archivo subido de Cloudinary
      await service.deleteFile(uploadedUrl);
    }
  });
}); 