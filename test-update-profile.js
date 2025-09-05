require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRegistration() {
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  const profileData = {
    first_name: '',
    last_name: '',
    cedula_ruc: '1234567890',
    phone: '',
    gender: '',
    birth_date: '1990-01-15'
  };

  console.log('🧪 Iniciando prueba de registro completo...');
  console.log('📧 Registrando usuario:', testEmail);
  console.log('📝 Datos del perfil:', profileData);

  try {
    // Registrar usuario
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });

    if (error) {
      console.error('❌ Error en registro:', error);
      return false;
    }

    if (!data.user) {
      console.error('❌ No se creó el usuario');
      return false;
    }

    console.log('✅ Usuario creado exitosamente:', data.user.id);

    // Esperar un momento para que Supabase cree el perfil automáticamente
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Actualizar perfil (en lugar de insertar)
    console.log('📝 Actualizando perfil con datos:', profileData);
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', data.user.id);

    if (profileError) {
      console.error('❌ Error updating profile:', profileError);
      return false;
    }

    console.log('✅ Perfil actualizado exitosamente');

    // Verificar que los datos se guardaron
    const { data: savedProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (fetchError) {
      console.error('❌ Error al obtener perfil:', fetchError);
      return false;
    }

    console.log('📋 Perfil guardado:', savedProfile);

    // Verificar campos específicos
    const success = savedProfile.cedula_ruc === profileData.cedula_ruc && 
                   savedProfile.birth_date === profileData.birth_date;

    if (success) {
      console.log('✅ ¡Datos guardados correctamente!');
      console.log('✅ Cédula/RUC:', savedProfile.cedula_ruc);
      console.log('✅ Fecha de nacimiento:', savedProfile.birth_date);
    } else {
      console.log('❌ Los datos no se guardaron correctamente');
      console.log('❌ Esperado - Cédula/RUC:', profileData.cedula_ruc, 'Guardado:', savedProfile.cedula_ruc);
      console.log('❌ Esperado - Fecha:', profileData.birth_date, 'Guardado:', savedProfile.birth_date);
    }

    // Limpiar datos de prueba
    await supabase.from('profiles').delete().eq('id', data.user.id);
    console.log('🧹 Datos de prueba eliminados');

    return success;

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    return false;
  }
}

async function main() {
  const success = await testRegistration();
  
  if (success) {
    console.log('\n✅ La prueba de registro fue exitosa!');
  } else {
    console.log('\n❌ La prueba de registro falló. Revisar los logs anteriores.');
  }
}

main().catch(console.error);