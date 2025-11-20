import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ShopCard({ shop }) {
  const defaultImage = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80";
  
  return (
    <Link to={createPageUrl(`ShopDetails?id=${shop.id}`)}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={shop.cover_image || defaultImage}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          {shop.is_active && (
            <Badge className="absolute top-4 right-4 bg-emerald-500 text-white border-0">
              Aberto
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
            {shop.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-700">
                {shop.rating ? shop.rating.toFixed(1) : "Novo"}
              </span>
            </div>
            {shop.total_reviews > 0 && (
              <span className="text-sm text-slate-500">
                ({shop.total_reviews} avaliações)
              </span>
            )}
          </div>
          
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {shop.description || "Salão de beleza profissional"}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{shop.city} - {shop.state}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Funciona até às 18:00 (Mock)</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}