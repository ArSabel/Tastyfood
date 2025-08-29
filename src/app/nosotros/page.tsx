'use client';

import { useState, useEffect } from 'react';
import { Users, Award, Lightbulb, Building2, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Centro Gastronómico DELI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Facultad de Hotelería y Turismo - Universidad Laica Eloy Alfaro de Manabí. 
            Un verdadero laboratorio de prácticas atendido por estudiantes, donde ofrecemos 
            alimentos sanos y de mejor calidad a precios accesibles.
          </p>
        </section>

        {/* Imagen principal */}
        <section className="mb-16">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80 flex items-center justify-center">
              <div className="text-center text-white">
                <Building2 size={80} className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Centro Gastronómico DELI</h2>
                <p className="text-xl">Inaugurado el 5 de octubre de 2020</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes Somos */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <Heart className="text-blue-600 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">¿Quiénes Somos?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              El Centro Gastronómico y de Servicios de Alimentos y Bebidas "DELI" de la 
              Facultad de Hotelería y Turismo fue inaugurado el 5 de octubre de 2020, 
              como resultado del trabajo constante de la Unidad Académica junto a sus estudiantes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos un verdadero laboratorio de prácticas atendido por estudiantes de la 
              carrera de Hotelería y Turismo, donde ofrecemos alimentos sanos y de mejor 
              calidad a precios accesibles para toda la comunidad universitaria.
            </p>
          </div>
        </section>

        {/* Servicios y Características */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Laboratorio de Prácticas</h3>
              <p className="text-gray-600">
                Espacio de formación práctica para estudiantes de Hotelería y Turismo, 
                donde desarrollan sus habilidades culinarias y de servicio.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Almuerzos Económicos</h3>
              <p className="text-gray-600">
                Ofrecemos almuerzos completos, sanos y de calidad a tan solo $2.50, 
                accesibles para toda la comunidad universitaria.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Formación Profesional</h3>
              <p className="text-gray-600">
                Contribuimos a la formación de profesionales en turismo, hospitalidad 
                y hotelería con enfoque en desarrollo sostenible.
              </p>
            </div>
          </div>
        </section>

        {/* Diseño y Modernidad */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8">
            <div className="flex items-center mb-6">
              <Building2 className="mr-3" size={32} />
              <h2 className="text-3xl font-bold">Diseño y Modernidad</h2>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Nuestros restaurantes se caracterizan por su infraestructura moderna, además, 
              también por el aprovechamiento de la luz natural, la tecnología y el diseño 
              que transforman espacios en ambientes inspiradores y eficientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🌟 Funcionalidad</h4>
                <p className="text-blue-100">Espacios diseñados para optimizar la experiencia gastronómica</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🌱 Sostenibilidad</h4>
                <p className="text-blue-100">Compromiso con el medio ambiente en cada decisión</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💡 Tecnología</h4>
                <p className="text-blue-100">Integración de tecnología moderna para mejor servicio</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🏢 Confort</h4>
                <p className="text-blue-100">Ambientes cómodos que invitan a disfrutar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Visión */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
                Proyectarnos como un referente importante a nivel nacional e internacional 
                en la formación integral de profesionales en turismo, hospitalidad y hotelería, 
                que aporten al desarrollo sostenible en los ámbitos económico, social y ambiental.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2020</div>
                  <div className="text-blue-200">Año de Inauguración</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">$2.50</div>
                  <div className="text-blue-200">Precio del Almuerzo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-200">Atendido por Estudiantes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación y Contacto */}
        <section className="text-center">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Visítanos en el Campus ULEAM!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Estamos ubicados en el Campus Universitario ULEAM, al lado de la UEF Juan Montalvo. 
              Te invitamos a disfrutar de nuestros almuerzos económicos y de calidad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">📍 Dirección:</h3>
                <p className="text-gray-600">Campus Universitario ULEAM a lado de la UEF Juan Montalvo</p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">📞 Contacto:</h3>
                <p className="text-gray-600">Teléfono: 052679600</p>
                <p className="text-gray-600">Email: gerencia@ep-uleam.gob.ec</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/productos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver nuestro menú
              </Link>
              <Link
                href="/ubicaciones"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Más Información
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}