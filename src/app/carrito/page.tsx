'use client';

import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {items.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  if (!user) {
                    router.push('/login');
                    return;
                  }
                  // Aquí irá la lógica para procesar el pedido
                  console.log('Procesando pedido...');
                }}
              >
                Proceder al pago
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}