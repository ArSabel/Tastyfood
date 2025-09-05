'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white shadow-lg py-4 transition-colors duration-300 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-blue-600">
            <Image 
              src="/TASTYFOOD.png" 
              alt="TastyFood Logo" 
              width={32}
              height={32}
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className="truncate">TastyFood</span>
          </Link>
          
          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/productos" className="font-medium hover:text-blue-600 transition-colors">
              Menú
            </Link>
            <Link href="/nosotros" className="font-medium hover:text-blue-600 transition-colors">
              Nosotros
            </Link>
            <Link href="/ubicaciones" className="font-medium hover:text-blue-600 transition-colors">
              Ubicaciones
            </Link>
            <Link href="/contacto" className="font-medium hover:text-blue-600 transition-colors">
              Contacto
            </Link>
            <Link href="/carrito" className="relative flex items-center font-medium hover:text-blue-600 transition-colors">
              <ShoppingCart className="mr-1" size={18} />
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1">
                  Mi Cuenta
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full w-48 bg-transparent rounded-md shadow-lg z-10">
                    <Link href="/perfil" className="block bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mi Perfil
                    </Link>
                    <Link href="/pedidos" className="block bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mis Pedidos
                    </Link>
                    <button 
                       onClick={async () => {
                         await signOut();
                         router.push('/');
                       }}
                       className="block bg-red-600 w-full text-left px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors rounded-b-lg"
                     >
                       Cerrar Sesión
                     </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 absolute left-0 right-0 top-full z-50 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link 
                href="/productos" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menú
              </Link>
              <Link 
                href="/nosotros" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="/ubicaciones" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ubicaciones
              </Link>
              <Link 
                href="/contacto" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link 
                href="/carrito" 
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Carrito
                {totalItems > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link 
                    href="/perfil" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link 
                    href="/pedidos" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setMobileMenuOpen(false);
                      router.push('/');
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-blue-600 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}