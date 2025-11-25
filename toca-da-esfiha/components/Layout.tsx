import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ShoppingCart, Phone, Clock, MapPin } from 'lucide-react';

interface LayoutProps {
  children?: React.ReactNode;
  currentPageName: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((sum: number, item: any) => sum + item.quantidade, 0);
        setCartCount(total);
      } catch (e) {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const isMenuPage = currentPageName === 'Menu';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Menu')} className="flex items-center gap-3">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69209c2a000f42976a9de0d2/5c6ce1447_logo1.png"
                alt="Toca da Esfiha Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Toca da Esfiha</h1>
                <p className="text-xs text-gray-600">A Melhor Esfiha da Região</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-red-600" />
                <span>18h - 23h30</span>
              </div>
              
              <Link
                to={createPageUrl('Checkout')}
                className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Carrinho</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Toca da Esfiha</h3>
              <p className="text-sm text-gray-400">
                As melhores esfihas abertas da região, preparadas com ingredientes frescos e muito carinho.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <a href="https://wa.me/5573981139131" className="hover:text-red-500 transition-colors">
                    (73) 98113-9131
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Segunda a Domingo: 18h - 23h30</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Localização</h3>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-500 mt-1" />
                <span>Península de Maraú, Bahia</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Toca da Esfiha. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}