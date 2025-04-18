'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Simulación de datos (posteriormente se conectará con una base de datos)
const getProduct = (id: string): Product | undefined => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      description: 'Deliciosa hamburguesa con carne de res, lechuga, tomate y queso',
      price: 12.99,
      category: 'Hamburguesas',
      image: '/products/hamburger.jpg',
      ingredients: ['Pan artesanal', 'Carne de res', 'Lechuga', 'Tomate', 'Queso cheddar', 'Cebolla'],
      nutritionalInfo: {
        calories: 650,
        protein: 35,
        carbs: 45,
        fat: 28
      }
    },
    // Más productos se agregarán aquí
  ];

  return products.find(p => p.id === id);
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();

  const product = getProduct(productId);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="h-64 w-full md:w-96 bg-gray-300">
                {/* Aquí irá la imagen del producto */}
              </div>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              
              {product.ingredients && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
                  <ul className="list-disc list-inside space-y-1">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.nutritionalInfo && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Información Nutricional</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Calorías: {product.nutritionalInfo.calories} kcal</p>
                      <p className="text-gray-600">Proteínas: {product.nutritionalInfo.protein}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Carbohidratos: {product.nutritionalInfo.carbs}g</p>
                      <p className="text-gray-600">Grasas: {product.nutritionalInfo.fat}g</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}