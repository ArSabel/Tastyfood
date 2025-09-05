// Script de debugging para probar la inserción de datos en Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurada' : '❌ Faltante');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testProfileInsertion() {
  console.log('🔍 Iniciando prueba de inserción de perfil...');
  
  // Datos de prueba
  const testProfileData = {
    id: '12345678-1234-1234-1234-123456789012', // UUID de prueba
    first_name: 'Juan',
    last_name: 'Pérez',
    cedula_ruc: '1234567890',
    phone: '0987654321',
    gender: 'M',
    birth_date: '1990-01-15'
  };
  
  try {
    console.log('📝 Intentando insertar perfil con datos:', testProfileData);
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(testProfileData)
      .select();
    
    if (error) {
      console.error('❌ Error al insertar perfil:', error);
      return false;
    }
    
    console.log('✅ Perfil insertado exitosamente:', data);
    
    // Verificar que los datos se guardaron correctamente
    const { data: retrievedData, error: retrieveError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testProfileData.id)
      .single();
    
    if (retrieveError) {
      console.error('❌ Error al recuperar perfil:', retrieveError);
      return false;
    }
    
    console.log('🔍 Datos recuperados:', retrievedData);
    
    // Verificar campos específicos
    console.log('\n📊 Verificación de campos:');
    console.log('cedula_ruc:', retrievedData.cedula_ruc || '❌ VACÍO');
    console.log('birth_date:', retrievedData.birth_date || '❌ VACÍO');
    console.log('first_name:', retrievedData.first_name || '❌ VACÍO');
    console.log('last_name:', retrievedData.last_name || '❌ VACÍO');
    
    // Limpiar datos de prueba
    await supabase
      .from('profiles')
      .delete()
      .eq('id', testProfileData.id);
    
    console.log('🧹 Datos de prueba eliminados');
    
    return true;
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    return false;
  }
}

async function checkExistingProfiles() {
  console.log('\n🔍 Verificando perfiles existentes...');
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, cedula_ruc, birth_date, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) {
      console.error('❌ Error al obtener perfiles:', error);
      return;
    }
    
    console.log('📋 Últimos 5 perfiles:');
    data.forEach((profile, index) => {
      console.log(`\n${index + 1}. ID: ${profile.id}`);
      console.log(`   Nombre: ${profile.first_name || 'N/A'} ${profile.last_name || 'N/A'}`);
      console.log(`   Cédula: ${profile.cedula_ruc || '❌ VACÍO'}`);
      console.log(`   Fecha nacimiento: ${profile.birth_date || '❌ VACÍO'}`);
      console.log(`   Creado: ${profile.created_at}`);
    });
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

async function main() {
  console.log('🚀 Iniciando debugging de registro de usuarios\n');
  
  // Verificar conexión
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.error('❌ Error de conexión a Supabase:', error);
      return;
    }
    console.log('✅ Conexión a Supabase exitosa\n');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
    return;
  }
  
  // Ejecutar pruebas
  await checkExistingProfiles();
  console.log('\n' + '='.repeat(50));
  await testProfileInsertion();
  
  console.log('\n🏁 Debugging completado');
}

main().catch(console.error);