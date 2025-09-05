'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch  {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4 relative">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full h-full max-h-[95vh] flex relative">
        {/* Botón de volver al inicio - zona señalada */}
        <button
          onClick={() => router.push('/')}
          className="absolute left-4 top-4 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
          title="Volver al inicio"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        {/* Sección izquierda - Formulario */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          {/* Logo y título */}
          <div className="text-center mb-4 sm:mb-6">
            <Image 
              src="/TASTYFOOD.png" 
              alt="Tasty Food Logo" 
              width={112}
              height={112}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-2 sm:mb-3 drop-shadow-lg"
            />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              Bienvenido a Tasty Food
            </h1>
            <p className="text-sm sm:text-base text-blue-600 font-medium mb-3 sm:mb-4">
              ¿Qué te gustaría pedir?
            </p>
          </div>
          
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Inicia sesión en tu cuenta
          </h2>

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500">
                  ¿No tienes una cuenta?
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/registro')}
              className="w-full mt-3 sm:mt-4 bg-white text-blue-600 py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Crear cuenta
            </button>
          </div>
        </div>

        {/* Sección derecha - ImagenS */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <Image 
            src="/ImagenTasty1.png" 
            alt="Tasty Food" 
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        </div>
      </div>
    </div>
  );
}