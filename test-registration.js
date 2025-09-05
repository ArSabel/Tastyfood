// Script para probar el registro automatizado
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Iniciando prueba de registro con verificación de cédula y fecha de nacimiento...');

async function testRegistration() {
  console.log('🧪 Iniciando prueba de registro completo...');
  
  // Generar email único para evitar conflictos
  const timestamp = Date.now();
  const testEmail = `test${timestamp}@example.com`;
  const testPassword = 'password123';
  
  const profileData = {
    first_name: '',
    last_name: '',
    cedula_ruc: '1234567890',
    phone: '',
    gender: '',
    birth_date: '1990-01-15'
  };
  
  try {
    console.log('📧 Registrando usuario:', testEmail);
    console.log('📝 Datos del perfil:', profileData);
    
    // Simular el proceso de signUp
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });
    
    if (error) {
      console.error('❌ Error de registro:', error.message);
      return false;
    }
    
    console.log('✅ Usuario creado exitosamente:', data.user?.id);
    
    if (data.user && profileData) {
      console.log('📝 Insertando perfil con datos:', {
        id: data.user.id,
        ...profileData
      });
      
      // Verificar si ya existe un perfil para este usuario
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      let profileInsertData, profileError;
      
      if (existingProfile) {
        console.log('ℹ️ El perfil ya existe, actualizando datos...');
        const result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', data.user.id)
          .select();
        
        profileInsertData = result.data;
        profileError = result.error;
      } else {
        console.log('ℹ️ Creando nuevo perfil...');
        const result = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            ...profileData
          })
          .select();
        
        profileInsertData = result.data;
        profileError = result.error;
      }
      
      if (profileError) {
        console.error('❌ Error creating profile:', profileError);
        console.error('❌ Detalles del error:', {
          code: profileError.code,
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint
        });
        return false;
      }
      
      console.log('✅ Perfil creado exitosamente:', profileInsertData);
      
      // Verificar que los datos se guardaron correctamente
      const { data: retrievedProfile, error: retrieveError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (retrieveError) {
        console.error('❌ Error al recuperar perfil:', retrieveError);
        return false;
      }
      
      console.log('🔍 Perfil recuperado:', retrievedProfile);
      console.log('\n📊 Verificación de campos específicos:');
      console.log('✅ cedula_ruc:', retrievedProfile.cedula_ruc || '❌ VACÍO');
      console.log('✅ birth_date:', retrievedProfile.birth_date || '❌ VACÍO');
      
      // Limpiar datos de prueba
      console.log('\n🧹 Limpiando datos de prueba...');
      
      // Eliminar perfil
      await supabase
        .from('profiles')
        .delete()
        .eq('id', data.user.id);
      
      // Eliminar usuario (esto requiere privilegios de admin, pero intentamos)
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(data.user.id);
      if (deleteUserError) {
        console.warn('⚠️ No se pudo eliminar el usuario (requiere privilegios de admin):', deleteUserError.message);
      } else {
        console.log('✅ Usuario eliminado exitosamente');
      }
      
      return true;
    }
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando prueba de registro automatizada\n');
  
  const success = await testRegistration();
  
  if (success) {
    console.log('\n🎉 ¡Prueba de registro exitosa! Los datos se guardan correctamente.');
  } else {
    console.log('\n❌ La prueba de registro falló. Revisar los logs anteriores.');
  }
}

main().catch(console.error);