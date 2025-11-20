import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, ChevronLeft, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ShopDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const shopId = urlParams.get('id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: shop, isLoading: shopLoading } = useQuery({
    queryKey: ['shop', shopId],
    queryFn: () => base44.entities.BarberShop.filter({ id: shopId }),
    select: (data) => data[0],
    enabled: !!shopId
  });

  const { data: services = [] } = useQuery({
    queryKey: ['services', shopId],
    queryFn: () => base44.entities.Service.filter({ barber_shop_id: shopId, is_active: true }),
    enabled: !!shopId
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', shopId],
    queryFn: () => base44.entities.Review.filter({ barber_shop_id: shopId }, '-created_date', 10),
    enabled: !!shopId
  });

  if (shopLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full" />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Salão não encontrado</p>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header and Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-slate-900">
        <img
          src={shop.cover_image || defaultImage}
          alt={shop.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto text-white">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para a Busca
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{shop.name}</h1>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-semibold">
                {shop.rating ? shop.rating.toFixed(1) : "Novo"}
              </span>
            </div>
            <span className="text-lg">|</span>
            <span className="text-lg">{shop.total_reviews || 0} avaliações</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Services and About */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Services Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Scissors className="w-6 h-6 text-amber-600" />
                Nossos Serviços
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.length > 0 ? (
                  services.map(service => (
                    <Card key={service.id} className="border border-slate-100 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-5 flex justify-between items-center">
                        <div className="flex-1 mr-4">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{service.name}</h3>
                          <p className="text-sm text-slate-600 line-clamp-2">{service.description || "Serviço profissional"}</p>
                          <div className="mt-2 text-md font-semibold text-emerald-600">
                            R$ {service.price?.toFixed(2)} 
                            <span className="text-sm text-slate-500 ml-2">({service.duration_minutes} min)</span>
                          </div>
                        </div>
                        <Link to={createPageUrl(`BookAppointment?shopId=${shop.id}&serviceId=${service.id}`)}>
                          <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                            Agendar
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-slate-500 md:col-span-2">Nenhum serviço disponível no momento.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Avaliações ({shop.total_reviews || 0})</h2>
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-2" />
                        <span className="font-semibold text-slate-800">{review.rating.toFixed(1)} / 5</span>
                      </div>
                      <p className="font-medium text-slate-900 mb-1">{review.customer_name || "Cliente Anônimo"}</p>
                      <p className="text-slate-600 italic">"{review.comment || "Sem comentário"}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Seja o primeiro a avaliar este salão!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Info Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-xl border border-slate-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Informações do Salão</h2>
              
              <p className="text-slate-600 mb-6">
                {shop.description || "Salão de beleza e barbearia profissional oferecendo diversos serviços."}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-slate-500 mt-1" />
                  <div>
                    <span className="font-medium block">Endereço</span>
                    <p className="text-sm">{shop.address}, {shop.city} - {shop.state}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-slate-700">
                  <Phone className="w-5 h-5 text-slate-500 mt-1" />
                  <div>
                    <span className="font-medium block">Contato</span>
                    <p className="text-sm">{shop.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-slate-500 mt-1" />
                  <div>
                    <span className="font-medium block">Status</span>
                    <Badge className={shop.is_active ? "bg-emerald-500 hover:bg-emerald-500" : "bg-red-500 hover:bg-red-500"}>
                      {shop.is_active ? "Aberto Agora" : "Fechado"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}