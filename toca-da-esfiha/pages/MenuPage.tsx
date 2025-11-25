import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '../components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '../services/api'; // Changed import to use our mock
import CategoryNav from '../components/menu/CategoryNav';
import MenuItemCard from '../components/menu/MenuItemCard';
import StoreStatus from '../components/menu/StoreStatus';
import { CartItem, MenuItem } from '../types';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('salgadas');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menuItems'],
    queryFn: () => base44.entities.MenuItem.filter({ disponivel: true }, 'ordem', 100),
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    updateCartTotal(savedCart);
  }, []);

  const updateCartTotal = (currentCart: CartItem[]) => {
    const total = currentCart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    setCartTotal(total);
  };

  const handleAddToCart = (item: MenuItem, quantidade: number, sabor?: string) => {
    let newCart = [...cart];
    const cartItemId = `${item.id}-${sabor || ''}`;
    
    const existingItemIndex = newCart.findIndex(
      cartItem => cartItem.cartItemId === cartItemId
    );

    if (quantidade === 0) {
      newCart = newCart.filter(cartItem => cartItem.cartItemId !== cartItemId);
    } else if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantidade = quantidade;
    } else {
      newCart.push({
        ...item,
        quantidade,
        sabor,
        cartItemId
      });
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    updateCartTotal(newCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const groupedItems = menuItems.reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const filteredItems = searchTerm
    ? menuItems.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  const categories = [
    { id: 'salgadas', name: 'Esfihas Salgadas', emoji: '🥙' },
    { id: 'vegetarianas', name: 'Esfihas Vegetarianas', emoji: '🥗' },
    { id: 'doces', name: 'Esfihas Doces', emoji: '🍰' },
    { id: 'mini-pizzas', name: 'Mini-Pizzas', emoji: '🍕' },
    { id: 'familia', name: 'Pizzas Família', emoji: '🍕' },
    { id: 'quibes', name: 'Quibes e Pastéis', emoji: '🥟' },
    { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo à Toca da Esfiha! 🥙
            </h1>
            <p className="text-xl text-red-50 max-w-2xl mx-auto">
              As melhores esfihas abertas da região. Ingredientes frescos, sabor incomparável.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Store Status */}
        <div className="mt-8">
          <StoreStatus />
        </div>

        {/* Search Bar */}
        <div className="mt-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar esfiha, pizza, bebida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500"
            />
          </div>
        </div>

        {/* Category Navigation */}
        {!searchTerm && (
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Menu Items */}
        <div className="mt-8">
          {searchTerm ? (
            // Search Results
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resultados da busca "{searchTerm}"
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems?.map((item) => (
                  <React.Fragment key={item.id}>
                    <MenuItemCard
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  </React.Fragment>
                ))}
              </div>
              {filteredItems?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Nenhum item encontrado</p>
                </div>
              )}
            </div>
          ) : (
            // Categories
            categories.map((category) => {
              const items = groupedItems[category.id] || [];
              if (items.length === 0) return null;
              return (
                <div key={category.id} id={`category-${category.id}`} className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className="text-4xl">{category.emoji}</span>
                    <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <React.Fragment key={item.id}>
                        <MenuItemCard
                          item={item}
                          onAddToCart={handleAddToCart}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Floating Cart Summary */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-90">
                      {cart.reduce((sum, item) => sum + item.quantidade, 0)} itens
                    </p>
                    <p className="text-2xl font-bold">
                      R$ {cartTotal.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
                <Link
                  to={createPageUrl('Checkout')}
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-50 transition-all shadow-lg"
                >
                  Ver Carrinho
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}