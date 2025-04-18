'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
  userId: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Simulación de carga de pedidos (posteriormente se conectará con una base de datos)
      const userOrders: Order[] = [
        {
          id: 'ORD-001',
          userId: user.id,
          items: [
            { name: 'Hamburguesa Clásica', quantity: 2, price: 12.99 },
            { name: 'Papas Fritas', quantity: 1, price: 4.99 }
          ],
          total: 30.97,
          status: 'preparing',
          createdAt: '2024-01-20T15:30:00Z'
        },
      ];
      setOrders(userOrders);
      setLoading(false);
    }
  }, [user]);

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-500',
      preparing: 'bg-blue-500',
      ready: 'bg-green-500',
      delivered: 'bg-gray-500'
    };
    return colors[status];
  };

  const getStatusText = (status: Order['status']) => {
    const texts = {
      pending: 'Pendiente',
      preparing: 'Preparando',
      ready: 'Listo',
      delivered: 'Entregado'
    };
    return texts[status];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Inicia sesión para ver tus pedidos</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No tienes pedidos realizados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
              <p className="text-gray-600">
                {new Date(order.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className={`${getStatusColor(order.status)} text-white px-4 py-2 rounded-full font-medium`}>
              {getStatusText(order.status)}
            </div>
          </div>
          
          <div className="border-t border-b py-4 my-4 space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-600">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-blue-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}