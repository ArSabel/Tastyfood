import React, { useState } from 'react';
import SelectorEstrellas from './SelectorEstrellas';
import { calificacionesService } from '../lib/database';

interface ModalCalificacionProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: string;
  onCalificacionEnviada?: () => void;
}

const ModalCalificacion: React.FC<ModalCalificacionProps> = ({
  isOpen,
  onClose,
  usuarioId,
  onCalificacionEnviada
}) => {
  const [calificacion, setCalificacion] = useState<number>(0);
  const [comentario, setComentario] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (calificacion === 0) {
      setError('Por favor selecciona una calificación');
      return;
    }

    setEnviando(true);
    setError('');

    try {
      await calificacionesService.crear({
        usuario_id: usuarioId,
        calificacion,
        comentario: comentario.trim() || null
      });

      // Resetear formulario
      setCalificacion(0);
      setComentario('');
      
      // Notificar éxito
      if (onCalificacionEnviada) {
        onCalificacionEnviada();
      }
      
      onClose();
    } catch (err) {
      console.error('Error al enviar calificación:', err);
      setError('Error al enviar la calificación. Por favor intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const handleClose = () => {
    if (!enviando) {
      setCalificacion(0);
      setComentario('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            ¡Califica tu experiencia!
          </h2>
          <p className="text-gray-600 mb-6">
            ¡Felicidades por tu primer pedido! Nos encantaría conocer tu opinión.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo calificarías tu experiencia?
              </label>
              <div className="flex justify-center">
                <SelectorEstrellas
                  calificacion={calificacion}
                  onChange={setCalificacion}
                  size="lg"
                />
              </div>
            </div>

            {/* Comentario opcional */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentario (opcional)
              </label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Cuéntanos más sobre tu experiencia..."
                rows={3}
                maxLength={500}
                disabled={enviando}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {comentario.length}/500
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={enviando}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ahora no
              </button>
              <button
                type="submit"
                disabled={enviando || calificacion === 0}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {enviando ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar calificación'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificacion;