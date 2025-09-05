import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Image 
                src="/TASTYFOOD.png" 
                alt="TastyFood Logo" 
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-2xl font-bold">TastyFood</span>
            </div>
            <p className="text-gray-400 mb-4">
              Somos la Empresa Pública de producción y desarrollo estratégico de la Universidad Laica Eloy Alfaro de Manabí
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://www.facebook.com/epuleam" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/ep_uleam/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@ep_uleam" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=0958951061&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/productos" className="text-gray-400 hover:text-white transition-colors">Menú</Link></li>
              <li><Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/promociones" className="text-gray-400 hover:text-white transition-colors">Promociones</Link></li>
              <li><Link href="/ubicaciones" className="text-gray-400 hover:text-white transition-colors">Ubicaciones</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Horario</h3>
            <ul className="space-y-1 text-gray-400">
              <li className="flex justify-start gap-4">
                <span>Lunes - Viernes:</span>
                <span>8:00 - 17:00</span>
              </li>
              <li className="flex justify-start gap-4">
                <span>Sábado:</span>
                <span>8:00 - 14:00</span>
              </li>
              <li className="flex justify-start gap-4">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <Phone size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>+593 95 895 1061 - 052679600</span>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>gerencia@ep-uleam.gob.ec</span>
              </li>
              <li className="flex items-start">
                <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>ULEAM, Manta</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TastyFood. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}