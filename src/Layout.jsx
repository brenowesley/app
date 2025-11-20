import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Scissors, Calendar, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const isOwnerPage = currentPageName?.includes('Owner');

  const customerLinks = [
    { name: "Início", path: "Home", icon: Scissors },
    { name: "Meus Agendamentos", path: "MyAppointments", icon: Calendar }
  ];

  const ownerLinks = [
    { name: "Dashboard", path: "OwnerDashboard", icon: LayoutDashboard },
    { name: "Agendamentos", path: "OwnerDashboard", icon: Calendar }
  ];

  const links = isOwnerPage ? ownerLinks : customerLinks;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">BarberMatch</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user && (
                <>
                  {links.map(link => (
                    <Link
                      key={link.path}
                      to={createPageUrl(link.path)}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  ))}
                </>
              )}
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                    <User className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-900">
                      {user.full_name || user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => base44.auth.logout()}
                    className="text-slate-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => base44.auth.redirectToLogin(window.location.href)}
                  >
                    Entrar
                  </Button>
                  <Link to={createPageUrl("OwnerRegister")}>
                    <Button className="bg-slate-900 hover:bg-slate-800">
                      Cadastrar Salão
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {user && (
                <>
                  {links.map(link => (
                    <Link
                      key={link.path}
                      to={createPageUrl(link.path)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 py-2"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">{user.email}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        base44.auth.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </>
              )}
              {!user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      base44.auth.redirectToLogin(window.location.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Entrar
                  </Button>
                  <Link to={createPageUrl("OwnerRegister")}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800">
                      Cadastrar Salão
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scissors className="w-6 h-6" />
                <span className="text-xl font-bold">BarberMatch</span>
              </div>
              <p className="text-slate-400">
                Conectando você aos melhores profissionais de beleza
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Clientes</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to={createPageUrl("Home")} className="hover:text-white">Buscar Salões</Link></li>
                <li><Link to={createPageUrl("MyAppointments")} className="hover:text-white">Meus Agendamentos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Profissionais</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to={createPageUrl("OwnerRegister")} className="hover:text-white">Cadastrar Salão</Link></li>
                <li><Link to={createPageUrl("OwnerDashboard")} className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2024 BarberMatch. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}