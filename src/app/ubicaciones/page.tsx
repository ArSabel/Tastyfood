'use client';

import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UbicacionesPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-2xl">
            <MapPin className="mx-auto mb-6 text-blue-200" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestras Ubicaciones
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encuentra el Centro Gastronómico DELI en el campus de ULEAM
            </p>
          </div>
        </section>

        {/* Ubicación Principal */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Información de ubicación */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Centro Gastronómico DELI
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Dirección</h3>
                      <p className="text-gray-600">
                        Universidad Laica Eloy Alfaro de Manabí<br />
                        Campus Universitario, Manta - Ecuador
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Horarios de Atención</h3>
                      <div className="text-gray-600 space-y-1">
                        <p><span className="font-medium">Lunes - Viernes:</span> 8:00 AM - 5:00 PM</p>
                        <p><span className="font-medium">Sábado:</span> 8:00 AM - 2:00 PM</p>
                        <p><span className="font-medium">Domingo:</span> Cerrado</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Contacto</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>+593 95 895 1061</p>
                        <p>052679600</p>
                        <p>gerencia@ep-uleam.gob.ec</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/productos"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Ver Menú
                  </Link>
                  <a
                    href="https://maps.google.com/?q=Universidad+Laica+Eloy+Alfaro+Manabi+Manta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Navigation size={18} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
              
              {/* Mapa */}
              <div className="bg-gray-200 min-h-[400px] lg:min-h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.0123456789!2d-80.7123456!3d-0.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTknMTUuNiJTIDgwwrA0Mic0NC40Ilc!5e0!3m2!1ses!2sec!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Centro Gastronómico DELI"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Información Adicional */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fácil Acceso</h3>
              <p className="text-gray-600">
                Ubicado dentro del campus universitario de ULEAM, con fácil acceso para estudiantes, profesores y visitantes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Horarios Convenientes</h3>
              <p className="text-gray-600">
                Abierto durante toda la jornada académica para satisfacer las necesidades alimentarias de la comunidad universitaria.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Atención Personalizada</h3>
              <p className="text-gray-600">
                Nuestro equipo de estudiantes en formación brinda un servicio cálido y profesional en cada visita.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white py-16 px-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">¿Listo para visitarnos?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Ven y disfruta de nuestros deliciosos almuerzos a precios accesibles en el corazón del campus universitario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Ver Menú del Día
            </Link>
            <Link
              href="/contacto"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}