import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/customer/SearchBar";
import ShopCard from "../components/customer/ShopCard";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const [filters, setFilters] = useState({ searchTerm: "", city: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['shops', filters],
    queryFn: async () => {
      const allShops = await base44.entities.BarberShop.list('-created_date', 100);
      
      return allShops.filter(shop => {
        const matchesSearch = !filters.searchTerm || 
          shop.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          shop.description?.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        const matchesCity = !filters.city || 
          shop.city?.toLowerCase().includes(filters.city.toLowerCase());
        
        return matchesSearch && matchesCity && shop.is_active;
      });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=80')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Marketplace Premium</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Beleza ao seu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Alcance
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto text-xl text-slate-300 mb-12">
              Encontre os melhores salões de beleza e barbearias da sua cidade e agende seu horário com facilidade.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={setFilters} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
          {filters.searchTerm || filters.city ? "Resultados da Busca" : "Salões em Destaque"}
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full" />
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-lg">
            <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600 font-semibold mb-2">Ops! Nenhum resultado encontrado.</p>
            <p className="text-slate-500">Tente buscar por outro termo ou cidade.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
        
        {/* Call to Action for Owners */}
        {!user && (
          <div className="mt-20 text-center p-12 bg-white rounded-xl shadow-2xl border border-amber-100">
            <Award className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              É dono de um salão?
            </h3>
            <p className="text-slate-600 mb-6">
              Cadastre-se no BarberMatch e alcance milhares de novos clientes.
            </p>
            <Link to={createPageUrl("OwnerRegister")}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-amber-500/30">
                Cadastrar Meu Salão Agora
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}