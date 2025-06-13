// Crear un script de diagnóstico para verificar el estado de un proyecto
import fetch from 'node-fetch';

async function checkProject(id) {
  try {
    console.log('🔍 Verificando proyecto:', id);
    
    // Obtener el proyecto
    const res = await fetch(`http://localhost:8001/api/projects/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MmZjOWFhMC0zNzA5LTQwZGEtYmU1ZC03M2FkMWIwZWJiZTkiLCJlbWFpbCI6Im1hbmFnZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc0NzcyNjk1MiwiZXhwIjoxNzQ4MzMxNzUyfQ.HfUMeeP5ZSfTHqDrbx9SqJMae4cq2yv_JApHAuKFpOg' 
      }
    });
    
    if (!res.ok) {
      throw new Error(`Error al obtener el proyecto: ${res.status} ${res.statusText}`);
    }
    
    const project = await res.json();
    console.log('✅ Proyecto obtenido:', project.id, project.title);
    
    // Verificar requisitos
    const issues = [];
    
    // Descripción
    const description = project.description || '';
      if (description.trim().length < 10) {
    issues.push(`❌ Descripción demasiado corta (${description.trim().length} caracteres, mínimo 10)`);
    } else {
      console.log('✅ Descripción tiene longitud adecuada:', description.trim().length, 'caracteres');
    }
    
    // Documentos
    if (!project.documents || project.documents.length === 0) {
      console.log('⚠️ No tiene documentos (validación desactivada temporalmente en desarrollo)');
    } else {
      const hasLegalDocs = project.documents.some(doc => doc.documentType === 'legal');
      if (!hasLegalDocs) {
        console.log('⚠️ No tiene documentos legales (validación desactivada temporalmente en desarrollo)');
      } else {
        console.log('✅ Tiene documentos legales');
      }
    }
    
    // Campos obligatorios
    if (!project.title || project.title.trim() === '') issues.push('❌ Falta título');
    if (!project.minimumInvestment || project.minimumInvestment <= 0) issues.push('❌ Falta inversión mínima válida');
    if (!project.targetAmount || project.targetAmount <= 0) issues.push('❌ Falta monto objetivo válido');
    if (!project.location) issues.push('❌ Falta ubicación');
    if (!project.propertyType) issues.push('❌ Falta tipo de propiedad');
    
    console.log('');
    console.log('📊 RESULTADO DIAGNÓSTICO:');
    if (issues.length === 0) {
      console.log('✅ El proyecto cumple todos los requisitos para ser publicado');
    } else {
      console.log(`❌ El proyecto tiene ${issues.length} problemas que impiden su publicación:`);
      issues.forEach(issue => console.log(' ', issue));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Llamar a la función con el ID del proyecto
checkProject('fb169d28-042a-468b-b33c-a64e796b524e'); 