const fs = require('fs');
const path = require('path');

console.log('=== RENDER DEPLOYMENT DEBUG ===');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Verificar estructura de directorios
console.log('\n=== DIRECTORY STRUCTURE ===');
try {
  const domainPath = path.join(__dirname, 'domain');
  console.log('Domain directory exists:', fs.existsSync(domainPath));
  
  if (fs.existsSync(domainPath)) {
    console.log('Domain contents:', fs.readdirSync(domainPath));
    
    const entitiesPath = path.join(domainPath, 'entities');
    console.log('Entities directory exists:', fs.existsSync(entitiesPath));
    
    if (fs.existsSync(entitiesPath)) {
      const entities = fs.readdirSync(entitiesPath);
      console.log('Entities contents:', entities);
      
      // Verificar cada archivo específicamente
      entities.forEach(file => {
        const filePath = path.join(entitiesPath, file);
        const stats = fs.statSync(filePath);
        console.log(`  ${file}: ${stats.isFile() ? 'FILE' : 'DIR'} (${stats.size} bytes)`);
      });
    }
  }
} catch (error) {
  console.error('Error checking directories:', error.message);
}

// Probar diferentes estrategias de require
console.log('\n=== REQUIRE TESTS ===');
const strategies = [
  './domain/entities/Project',
  './domain/entities/Project.js',
  path.join(__dirname, 'domain/entities/Project'),
  path.join(__dirname, 'domain/entities/Project.js')
];

strategies.forEach((strategy, index) => {
  try {
    const resolved = require.resolve(strategy);
    console.log(`✅ Strategy ${index + 1}: ${strategy} -> ${resolved}`);
    
    // Intentar cargar el módulo
    const module = require(strategy);
    console.log(`   Module type: ${typeof module}`);
  } catch (error) {
    console.log(`❌ Strategy ${index + 1}: ${strategy} -> ${error.message}`);
  }
});

// Verificar archivos específicos
console.log('\n=== FILE VERIFICATION ===');
const filesToCheck = [
  'domain/entities/Project.js',
  'domain/entities/investment.js',
  'domain/entities/User.js'
];

filesToCheck.forEach(file => {
  const fullPath = path.join(__dirname, file);
  try {
    const exists = fs.existsSync(fullPath);
    console.log(`${file}: ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    
    if (exists) {
      const stats = fs.statSync(fullPath);
      console.log(`  Size: ${stats.size} bytes`);
      console.log(`  Modified: ${stats.mtime}`);
    }
  } catch (error) {
    console.log(`${file}: ERROR - ${error.message}`);
  }
});

console.log('\n=== ENVIRONMENT INFO ===');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch); 