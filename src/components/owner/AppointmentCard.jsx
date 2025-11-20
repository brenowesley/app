import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, User, Phone, CheckCircle, XCircle } from "lucide-react";

export default function AppointmentCard({ appointment, onUpdateStatus }) {
  const statusConfig = {
    pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800 border-blue-200" },
    in_progress: { label: "Em andamento", color: "bg-purple-100 text-purple-800 border-purple-200" },
    completed: { label: "Concluído", color: "bg-green-100 text-green-800 border-green-200" },
    cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800 border-red-200" },
    no_show: { label: "Não compareceu", color: "bg-gray-100 text-gray-800 border-gray-200" }
  };

  const config = statusConfig[appointment.status] || statusConfig.pending;
  // A data no Base44 é 'yyyy-MM-dd' e o time é 'HH:mm'. 
  // Juntamos com 'T' para garantir que o Date() interprete corretamente no fuso horário local.
  const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
  
  const isPending = appointment.status === 'pending';
  const isConfirmed = appointment.status === 'confirmed';

  return (
    <Card className="border border-slate-100 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {appointment.service_name}
            </h3>
            <Badge className={`${config.color} border`}>
              {config.label}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              {format(appointmentDate, "dd 'de' MMM", { locale: ptBR })}
            </p>
            <p className="text-sm text-slate-600">{appointment.time}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4 text-slate-400" />
            <span>{appointment.customer_name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{appointment.customer_phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{appointment.duration_minutes} minutos</span>
          </div>
        </div>
        
        {/* Notas */}
        <div className="text-sm text-slate-700 p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="font-semibold">Notas:</span> {appointment.notes || "Nenhuma observação."}
        </div>
        
        {/* Actions */}
        {(isPending || isConfirmed) && (
          <div className="flex gap-3 pt-4 mt-4 border-t border-slate-100">
            {isPending && (
              <Button 
                variant="default" 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => onUpdateStatus('confirmed')}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              className={`flex-1 ${isConfirmed ? 'text-purple-600 hover:bg-purple-50' : 'text-red-600 hover:bg-red-50'}`}
              onClick={() => onUpdateStatus(isConfirmed ? 'in_progress' : 'cancelled')}
            >
              {isConfirmed ? 'Iniciar Serviço' : 'Cancelar'}
            </Button>
          </div>
        )}
        {appointment.status === 'in_progress' && (
          <div className="flex gap-3 pt-4 mt-4 border-t border-slate-100">
            <Button 
              variant="default" 
              size="sm"
              className="bg-green-600 hover:bg-green-700 flex-1"
              onClick={() => onUpdateStatus('completed')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Concluir
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => onUpdateStatus('no_show')}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Não Compareceu
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}