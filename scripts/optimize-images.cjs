const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../frontend/public/images');
const outputDir = path.join(__dirname, '../frontend/public/images/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  try {
    const {
      width = 1200,
      quality = 80,
      format = 'webp'
    } = options;

    await sharp(inputPath)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`   Tamaño original: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Tamaño optimizado: ${(outputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Reducción: ${reduction}%\n`);
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error.message);
  }
};

const optimizeAllImages = async () => {
  console.log('🖼️  Optimizando imágenes para producción...\n');

  const images = [
    { name: 'hero-background.jpg', width: 1920, quality: 85 },
    { name: 'luxury-real-estate.jpg', width: 1200, quality: 80 },
    { name: 'luxury-interior.jpg', width: 1200, quality: 80 },
    { name: 'analytics.jpg', width: 800, quality: 85 },
    { name: 'transparency.jpg', width: 1200, quality: 80 },
    { name: 'exclusivity.jpg', width: 1200, quality: 80 }
  ];

  for (const image of images) {
    const inputPath = path.join(inputDir, image.name);
    const outputName = image.name.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(outputDir, outputName);

    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath, {
        width: image.width,
        quality: image.quality,
        format: 'webp'
      });
    } else {
      console.log(`⚠️  Imagen no encontrada: ${inputPath}`);
    }
  }

  console.log('🎉 Optimización completada!');
  console.log(`📁 Imágenes optimizadas guardadas en: ${outputDir}`);
};

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeImage, optimizeAllImages }; 