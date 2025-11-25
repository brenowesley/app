import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(sum);
  };

  const removeFromCart = (cartItemId: string) => {
    const newCart = cart.filter(item => item.cartItemId !== cartItemId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    calculateTotal(newCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to={createPageUrl('Menu')} className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para o Menu
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
          <Link to={createPageUrl('Menu')}>
            <Button>Fazer um pedido</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartItemId} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.imagem_url} alt={item.nome} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.nome}</h3>
                      {item.sabor && <p className="text-sm text-gray-500">Sabor: {item.sabor}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded">Qtd: {item.quantidade}</span>
                    <span className="font-bold text-gray-900">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}