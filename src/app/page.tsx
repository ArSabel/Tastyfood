'use client';

import { useState, useEffect } from 'react';
import { Clock, Phone, Mail, Facebook, Instagram, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Producto, Seccion, seccionesService, productosService } from '@/lib/database';
import Footer from '@/components/Footer';

export default function Home() {
  const [activePromo, setActivePromo] = useState(0);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<(Producto & { stock_disponible: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const { addItem, loading: cartLoading } = useCart();
  const { user, checkProfileComplete } = useAuth();
  const router = useRouter();

  // Promociones
  const promos = [
    { title: "2x1 en Hamburguesas", desc: "Todos los martes", bgColor: "bg-amber-100" },
    { title: "30% de Descuento", desc: "En tu primera compra", bgColor: "bg-blue-100" }
  ];

  // Cargar datos de la base de datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [seccionesData, productosData] = await Promise.all([
          seccionesService.obtenerTodas(),
          productosService.obtenerConStock()
        ]);
        
        setSecciones(seccionesData);
        // Tomar solo los primeros 6 productos para destacados
        setFeaturedProducts(productosData.slice(0, 6));
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleAddToCart = async (producto: Producto & { stock_disponible: number }) => {
    if (cartLoading || addingToCart === producto.id) return;
    
    // Verificar si el usuario está autenticado
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Verificar si el perfil está completo
    const isProfileComplete = await checkProfileComplete();
    
    if (!isProfileComplete) {
      alert('Para realizar pedidos debes completar tu perfil con: Nombre, Apellido y Teléfono');
      router.push('/perfil?complete=true');
      return;
    }
    
    try {
      setAddingToCart(producto.id);
      await addItem({
          id: producto.id,
          name: producto.nombre,
          price: producto.precio,
          quantity: 1
        });
      setMensaje(`${producto.nombre} agregado al carrito`);
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setMensaje('Error al agregar al carrito');
      setTimeout(() => setMensaje(null), 3000);
    } finally {
      setAddingToCart(null);
    }
  };

  // Rotación automática de promociones
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [promos.length]);

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <Navbar />
        
      {/* Mensaje de confirmación */}
      {mensaje && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300">
          {mensaje}
        </div>
      )}

      <main className="container mx-auto px-4 py-8">


        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20 px-6 rounded-xl mb-12 relative overflow-hidden">
          {/* Círculos animados */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="circle-1 absolute w-40 h-40 rounded-full bg-blue-400 opacity-20 top-10 left-10 animate-float-slow"></div>
            <div className="circle-2 absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 bottom-10 right-10 animate-float-medium"></div>
            <div className="circle-3 absolute w-24 h-24 rounded-full bg-blue-200 opacity-30 top-1/3 right-1/4 animate-float-fast"></div>
            <div className="circle-4 absolute w-32 h-32 rounded-full bg-blue-500 opacity-20 bottom-1/4 left-1/3 animate-pulse-slow"></div>
            <div className="circle-5 absolute w-16 h-16 rounded-full bg-white opacity-10 top-1/2 left-1/5 animate-pulse-fast"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Disfruta la mejor experiencia gastronómica en el campus
            </h1>
            <p className="text-xl mb-8">
              Platillos preparados con ingredientes frescos y de calidad premium
            </p>
            <div className="flex justify-center">
              <Link
                href="/productos"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center group"
              >
                Ver Menú
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Nuestras Categorías</h2>
            <Link href="/productos" className="text-blue-600 hover:text-blue-800 flex items-center">
              Ver todas
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 animate-pulse rounded-xl p-6 h-24"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {secciones.map((seccion) => {
                // TODO: Se recomienda agregar campos 'icon' y 'color' a la tabla 'secciones' en la base de datos
                // para una gestión más dinámica y centralizada de la apariencia.
                const icon = '🍽️';
                const color = 'bg-gray-100';
                
                return (
                  <Link 
                    href={`/productos?seccion=${seccion.id}`}
                    key={seccion.id}
                    className={`${color} rounded-xl p-6 text-center transition-transform hover:scale-105`}
                  >
                    <span className="text-4xl mb-2 block">{icon}</span>
                    <h3 className="font-medium text-lg">{seccion.nombre}</h3>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Productos Destacados */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Productos Destacados</h2>
            <Link href="/productos" className="text-blue-600 hover:text-blue-800 flex items-center">
              Ver todos
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {product.imagen_url ? (
                      <Image 
                        src={product.imagen_url} 
                        alt={product.nombre}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl opacity-50">🍽️</span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-medium">{product.seccion?.nombre}</span>
                    <h3 className="font-semibold text-lg mt-1">{product.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-2">{product.descripcion}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-green-600">${product.precio.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock_disponible}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_disponible === 0 || addingToCart === product.id || cartLoading}
                      className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {addingToCart === product.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Agregando...
                        </span>
                      ) : product.stock_disponible > 0 ? (
                        'Agregar al Carrito'
                      ) : (
                        'Sin Stock'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why choose us section */}
        <section className="py-16 bg-blue-600 text-white mb-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥬</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ingredientes Frescos</h3>
                <p className="text-blue-100">
                  Utilizamos ingredientes frescos y de calidad en todos nuestros platillos.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
                <p className="text-blue-100">
                  Entregamos tu comida caliente y fresca en el menor tiempo posible.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chefs Expertos</h3>
                <p className="text-blue-100">
                  Nuestros chefs tienen años de experiencia preparando comida deliciosa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-gray-50 mb-16 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Lo que dicen nuestros clientes</h2>
            <div className="relative">
              <div className="flex animate-scroll-slow">
                {/* Primera serie de testimonios */}
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "La comida está deliciosa y la entrega es muy rápida. Definitivamente recomendado."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        MC
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">María Castillo</p>
                        <p className="text-sm text-gray-500">Estudiante</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Excelente servicio y comida de calidad. Los precios son muy justos."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        JR
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">José Rodríguez</p>
                        <p className="text-sm text-gray-500">Profesor</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Me encanta la variedad del menú y la frescura de los ingredientes."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        AS
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">Ana Solís</p>
                        <p className="text-sm text-gray-500">Estudiante</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Segunda serie de testimonios (duplicados para efecto infinito) */}
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "La comida está deliciosa y la entrega es muy rápida. Definitivamente recomendado."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        MC
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">María Castillo</p>
                        <p className="text-sm text-gray-500">Estudiante</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Excelente servicio y comida de calidad. Los precios son muy justos."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        JR
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">José Rodríguez</p>
                        <p className="text-sm text-gray-500">Profesor</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-white text-gray-800 p-6 rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                        <Star className="fill-yellow-500" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Me encanta la variedad del menú y la frescura de los ingredientes."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        AS
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">Ana Solís</p>
                        <p className="text-sm text-gray-500">Estudiante</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white text-center mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">¿Listo para ordenar?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Haz tu pedido ahora y disfruta de la mejor comida del campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/productos"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Ver Menú
              </Link>
              <Link
                href="/productos"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Pedir Ahora
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}