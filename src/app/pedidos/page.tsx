'use client';

import Layout from '@/components/Layout';
import OrderHistory from './OrderHistory';

export default function OrdersPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
        <OrderHistory />
      </div>
    </Layout>
  );

}