# Implementación del Sistema de Calificaciones

## 1. Modificaciones al archivo database.ts

Agregar las siguientes interfaces y servicios al archivo `src/lib/database.ts`:

```typescript
// Agregar después de las interfaces existentes
export interface Calificacion {
  id: number;
  usuario_id: string;
  calificacion: number; // 1-5
  comentario?: string;
  created_at: string;
  updated_at: string;
}

export interface NuevaCalificacion {
  usuario_id: string;
  calificacion: number;
  comentario?: string;
}

export interface EstadisticasCalificaciones {
  total_calificaciones: number;
  promedio_calificacion: number;
  distribucion: {
    cinco_estrellas: number;
    cuatro_estrellas: number;
    tres_estrellas: number;
    dos_estrellas: number;
    una_estrella: number;
  };
}

// Agregar al final del archivo, después de facturasService
export const calificacionesService = {
  // Crear nueva calificación
  async crear(calificacion: NuevaCalificacion): Promise<Calificacion> {
    const { data, error } = await supabase
      .from('calificaciones')
      .insert(calificacion)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Verificar si usuario ya calificó
  async usuarioYaCalifico(usuarioId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('usuario_ya_califico', { p_usuario_id: usuarioId });
    
    if (error) throw error;
    return data;
  },

  // Verificar si es primer pedido pagado
  async esPrimerPedidoPagado(usuarioId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('es_primer_pedido_pagado', { p_usuario_id: usuarioId });
    
    if (error) throw error;
    return data;
  },

  // Obtener calificaciones de un usuario
  async obtenerPorUsuario(usuarioId: string): Promise<Calificacion[]> {
    const { data, error } = await supabase
      .from('calificaciones')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Obtener todas las calificaciones (para admin)
  async obtenerTodas(): Promise<Calificacion[]> {
    const { data, error } = await supabase
      .from('calificaciones')
      .select(`
        *,
        profiles:usuario_id (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Obtener estadísticas
  async obtenerEstadisticas(): Promise<EstadisticasCalificaciones> {
    const { data, error } = await supabase
      .rpc('obtener_estadisticas_calificaciones');
    
    if (error) throw error;
    return data;
  }
};
```

## 2. Crear componente SelectorEstrellas

Crear archivo `src/components/SelectorEstrellas.tsx`:

```typescript
import React from 'react';

interface SelectorEstrellasProps {
  calificacion: number;
  onChange: (calificacion: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SelectorEstrellas: React.FC<SelectorEstrellasProps> = ({
  calificacion,
  onChange,
  readonly = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleClick = (estrella: number) => {
    if (!readonly) {
      onChange(estrella);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          onClick={() => handleClick(estrella)}
          disabled={readonly}
          className={`
            ${sizeClasses[size]} 
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
            transition-transform duration-150
          `}
        >
          <svg
            className={`
              w-full h-full 
              ${estrella <= calificacion ? 'text-yellow-400' : 'text-gray-300'}
              ${!readonly && 'hover:text-yellow-300'}
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default SelectorEstrellas;
```

## 3. Crear componente ModalCalificacion

Crear archivo `src/components/ModalCalificacion.tsx`:

```typescript
import React, { useState } from 'react';
import SelectorEstrellas from './SelectorEstrellas';

interface ModalCalificacionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (calificacion: number, comentario: string) => void;
  loading?: boolean;
}

const ModalCalificacion: React.FC<ModalCalificacionProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleSubmit = () => {
    if (calificacion > 0) {
      onSubmit(calificacion, comentario);
    }
  };

  const handleOmitir = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            ¡Califica tu experiencia!
          </h2>
          <p className="text-gray-600 mb-6">
            Tu opinión nos ayuda a mejorar nuestro servicio.
          </p>
          
          {/* Selector de estrellas */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">¿Cómo calificarías tu experiencia?</p>
            <div className="flex justify-center">
              <SelectorEstrellas
                calificacion={calificacion}
                onChange={setCalificacion}
                size="lg"
              />
            </div>
            {calificacion > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {calificacion === 1 && "Muy malo"}
                {calificacion === 2 && "Malo"}
                {calificacion === 3 && "Regular"}
                {calificacion === 4 && "Bueno"}
                {calificacion === 5 && "Excelente"}
              </p>
            )}
          </div>
          
          {/* Campo de comentario */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentario (opcional)
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Cuéntanos sobre tu experiencia..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comentario.length}/500 caracteres
            </p>
          </div>
          
          {/* Botones */}
          <div className="flex space-x-3">
            <button
              onClick={handleOmitir}
              disabled={loading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Omitir
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || calificacion === 0}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Calificación'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificacion;
```

## 4. Modificaciones a la página de pedidos

Modificar el archivo `src/app/pedidos/page.tsx` agregando las siguientes importaciones y lógica:

```typescript
// Agregar estas importaciones al inicio del archivo
import { calificacionesService } from '@/lib/database';
import ModalCalificacion from '@/components/ModalCalificacion';

// Agregar estos estados después de los estados existentes
const [showModalCalificacion, setShowModalCalificacion] = useState(false);
const [loadingCalificacion, setLoadingCalificacion] = useState(false);
const [facturaParaCalificar, setFacturaParaCalificar] = useState<FacturaConDetalles | null>(null);

// Agregar esta función después de la función generarQR
const verificarMostrarCalificacion = async () => {
  if (!user) return;
  
  try {
    // Verificar si el usuario ya ha calificado
    const yaCalifico = await calificacionesService.usuarioYaCalifico(user.id);
    if (yaCalifico) return;
    
    // Buscar facturas pagadas
    const facturasPagadas = facturas.filter(f => f.estado === 'pagado');
    if (facturasPagadas.length === 0) return;
    
    // Verificar si es el primer pedido pagado
    const esPrimerPedido = await calificacionesService.esPrimerPedidoPagado(user.id);
    if (esPrimerPedido && facturasPagadas.length > 0) {
      setFacturaParaCalificar(facturasPagadas[0]);
      setShowModalCalificacion(true);
    }
  } catch (error) {
    console.error('Error al verificar calificación:', error);
  }
};

// Agregar esta función para manejar el envío de calificación
const handleSubmitCalificacion = async (calificacion: number, comentario: string) => {
  if (!user) return;
  
  try {
    setLoadingCalificacion(true);
    
    await calificacionesService.crear({
      usuario_id: user.id,
      calificacion,
      comentario: comentario.trim() || undefined
    });
    
    setShowModalCalificacion(false);
    setFacturaParaCalificar(null);
    
    // Mostrar mensaje de éxito (opcional)
    alert('¡Gracias por tu calificación!');
  } catch (error) {
    console.error('Error al enviar calificación:', error);
    alert('Error al enviar la calificación. Inténtalo de nuevo.');
  } finally {
    setLoadingCalificacion(false);
  }
};

// Modificar el useEffect existente para incluir la verificación
useEffect(() => {
  if (!user) {
    router.push('/login');
    return;
  }
  cargarFacturas();
}, [user, router]);

// Agregar un nuevo useEffect para verificar calificación después de cargar facturas
useEffect(() => {
  if (facturas.length > 0 && !loading) {
    verificarMostrarCalificacion();
  }
}, [facturas, loading]);

// Agregar el modal de calificación antes del modal QR existente
{/* Modal de Calificación */}
{showModalCalificacion && (
  <ModalCalificacion
    isOpen={showModalCalificacion}
    onClose={() => setShowModalCalificacion(false)}
    onSubmit={handleSubmitCalificacion}
    loading={loadingCalificacion}
  />
)}
```

## 5. Pasos de implementación

1. **Ejecutar el SQL en Supabase**: Copiar y ejecutar el contenido actualizado de `database.txt` en el editor SQL de Supabase

2. **Actualizar database.ts**: Agregar las interfaces y servicios de calificaciones

3. **Crear componentes**:

   * Crear `src/components/SelectorEstrellas.tsx`

   * Crear `src/components/ModalCalificacion.tsx`

4. **Modificar página de pedidos**: Actualizar `src/app/pedidos/page.tsx` con la nueva lógica

5. **Probar la funcionalidad**:

   * Crear un pedido de prueba

   * Cambiar el estado a 'pagado' en la base de datos

   * Verificar que aparezca el modal de calificación

   * Enviar una calificación y verificar que se guarde correctamente

## 6. Consideraciones adicionales

* El modal solo aparece una vez por usuario (después de su primer pedido pagado)

* Las calificaciones se almacenan con timestamp para análisis futuro

* Se incluyen funciones para obtener estadísticas de calificaciones

* El sistema es escalable para futuras mejoras (como calificaciones por producto)

Esta implementación mantiene la simplicidad del sistema actual mientras agrega una funcionalidad valiosa para recopilar feedback de los usuarios.
