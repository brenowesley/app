import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, MapPin, Scissors } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function BookingSummary({ shop, service, date, time }) {
  if (!shop || !service) return null;

  return (
    <Card className="sticky top-6 border-2 border-slate-100 shadow-xl">
      <CardHeader className="bg-gradient-to-br from-slate-50 to-white">
        <CardTitle className="text-xl text-slate-900">Resumo do Agendamento</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 mb-2">{shop.name}</h3>
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
            <span>{shop.address}, {shop.city}</span>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-slate-900">{service.name}</span>
          </div>
          <p className="text-sm text-slate-600 ml-6">{service.description}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          {date && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900">
                {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900">{time}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-slate-700">Total</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600">
            R$ {service.price?.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}