'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const categories = ['Todos', 'Hamburguesas', 'Pizzas', 'Bebidas', 'Postres'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addItem } = useCart();

  const products: Product[] = [
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      description: 'Deliciosa hamburguesa con carne de res, lechuga, tomate y queso',
      price: 12.99,
      category: 'Hamburguesas',
      image: '/products/hamburger.jpg'
    },
    // Más productos se agregarán aquí
  ];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Nuestro Menú</h1>
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {/* Aquí irá la imagen del producto */}
              <div className="h-48 bg-gray-300"></div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
}