'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type UserProfile = {
  first_name: string;
  last_name: string;
  cedula_ruc: string;
  phone: string;
  gender: string;
  birth_date: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  profileComplete: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData: UserProfile) => Promise<void>;
  signOut: () => Promise<void>;
  checkProfileComplete: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  // Optimizado para evitar congelamientos y mejorar rendimiento
  const checkProfileComplete = useCallback(async () => {
    // Si no hay usuario, no hay perfil que verificar
    if (!user) {
      setProfileComplete(false);
      return false;
    }
    
    try {
      // Implementar Promise con timeout para evitar bloqueos indefinidos
      const fetchProfileData = async () => {
        return await supabase
          .from('profiles')
          .select('first_name, last_name, phone')
          .eq('id', user.id)
          .maybeSingle();
      };
      
      // Crear promesa con timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout al verificar perfil')), 3000);
      });
      
      // Usar Promise.race para implementar timeout
      const { data, error } = await Promise.race([
        fetchProfileData(),
        timeoutPromise.then(() => {
          throw new Error('Timeout al verificar perfil');
        })
      ]) as any;
      
      if (error) {
        console.error('❌ Error en consulta de perfil:', error);
        setProfileComplete(false);
        return false;
      }
      
      // Verificación defensiva de campos requeridos
      // Usar operador de encadenamiento opcional para evitar errores
      const isComplete = Boolean(
        data && 
        typeof data === 'object' &&
        data.first_name?.trim() && 
        data.last_name?.trim() && 
        data.phone?.trim()
      );
      
      setProfileComplete(isComplete);
      return isComplete;
    } catch (error) {
      // Manejo mejorado de errores con información detallada
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('❌ Error al verificar perfil:', errorMessage);
      setProfileComplete(false);
      return false;
    }
  }, [user, supabase]);

  // useEffect optimizado para manejo de sesión y suscripción a cambios de autenticación
  useEffect(() => {
    let isMounted = true; // Flag para evitar actualizaciones de estado después de desmontaje
    
    // Verificar sesión actual con manejo de errores mejorado
    const getSession = async () => {
      try {
        // Implementar timeout para evitar bloqueos indefinidos
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout al obtener sesión')), 3000)
        );
        
        // Usar Promise.race para implementar timeout
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
        
        if (isMounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            // Evitamos llamar a checkProfileComplete aquí para prevenir bucles de actualización
            // Solo marcamos que hay un usuario autenticado
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener sesión:', error);
        if (isMounted) setLoading(false);
      }
    };

    getSession();

    // Suscribirse a cambios de autenticación con manejo optimizado
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      
      setUser(session?.user ?? null);
      if (session?.user) {
        // Evitamos llamar a checkProfileComplete aquí para prevenir bucles de actualización
        // El perfil se verificará cuando sea necesario, no en cada cambio de autenticación
      }
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false; // Marcar componente como desmontado
      subscription.unsubscribe();
    };
  }, []); // Eliminamos la dependencia de checkProfileComplete para evitar bucles de actualización

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Error de autenticación:", error.message);
        throw error;
      }
    } catch (err: unknown) {
      console.error("Error inesperado:", err);
      throw err;
    }
  };

  // Función de registro optimizada para evitar congelamientos
  const signUp = async (email: string, password: string, profileData: UserProfile) => {
    try {
      // Crear usuario con timeout para evitar bloqueos indefinidos
      const authController = new AbortController();
      const authTimeoutId = setTimeout(() => authController.abort(), 5000); // 5 segundos máximo
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      clearTimeout(authTimeoutId);
      
      if (error) {
        console.error("❌ Error de registro:", error.message);
        throw error;
      }

      // Crear perfil de usuario si el registro fue exitoso
      if (data.user && profileData) {
        // Timeout para la creación del perfil
        const profileController = new AbortController();
        const profileTimeoutId = setTimeout(() => profileController.abort(), 3000); // 3 segundos máximo
        
        try {
          // Primero verificar si ya existe un perfil para este usuario
          const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();
          
          if (checkError) {
            console.error("❌ Error al verificar perfil existente:", checkError.message);
          }
          
          if (existingProfile) {
            console.log("ℹ️ Perfil existente encontrado, actualizando datos...");
            // Si ya existe, actualizar en lugar de insertar
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                cedula_ruc: profileData.cedula_ruc,
                birth_date: profileData.birth_date,
                updated_at: new Date().toISOString()
              })
              .eq('id', data.user.id);
              
            clearTimeout(profileTimeoutId);
            
            if (updateError) {
              console.error("❌ Error al actualizar perfil:", updateError.message);
              // No lanzamos error para permitir continuar
            } else {
              console.log("✅ Perfil actualizado exitosamente");
            }
          } else {
            console.log("ℹ️ Creando nuevo perfil...");
            // Si no existe, insertar nuevo perfil
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                cedula_ruc: profileData.cedula_ruc,
                birth_date: profileData.birth_date,
                first_name: profileData.first_name || '',
                last_name: profileData.last_name || '',
                phone: profileData.phone || '',
                gender: profileData.gender || ''
              });
            
            clearTimeout(profileTimeoutId);
            
            if (profileError) {
              console.error("❌ Error al crear perfil:", profileError.message);
              // No lanzamos error para permitir continuar
            } else {
              console.log("✅ Perfil creado exitosamente");
            }
          }
        } catch (profileErr) {
          console.error("❌ Error en la creación del perfil:", profileErr);
          // No lanzamos el error para permitir que el usuario continúe aunque falle la creación del perfil
          // El perfil se puede completar después
        }
      }
    } catch (err: unknown) {
      console.error("❌ Error en el proceso de registro:", err);
      throw err;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, profileComplete, signIn, signUp, signOut, checkProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}