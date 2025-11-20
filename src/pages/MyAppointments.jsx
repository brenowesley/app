import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export default function MyAppointments() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(async (u) => {
      setUser(u);
      const customers = await base44.entities.Customer.filter({ created_by: u.email });
      if (customers.length > 0) {
        setCustomer(customers[0]);
      }
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['my-appointments', customer?.id],
    queryFn: () => base44.entities.Appointment.filter({ customer_id: customer.id }, '-created_date'),
    enabled: !!customer
  });

  const cancelMutation = useMutation({
    mutationFn: async (appointmentId) => {
      return await base44.entities.Appointment.update(appointmentId, {
        status: 'cancelled',
        cancellation_reason: 'Cancelado pelo cliente'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-appointments']);
      toast.success("Agendamento cancelado");
    },
    onError: () => {
        toast.error("Erro ao cancelar agendamento");
    }
  });

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'pending' || apt.status === 'confirmed'
  );

  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled' || apt.status === 'no_show' || apt.status === 'in_progress'
  );

  const AppointmentItem = ({ appointment }) => {
    const statusConfig = {
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800 border-blue-200" },
      in_progress: { label: "Em andamento", color: "bg-purple-100 text-purple-800 border-purple-200" },
      completed: { label: "Concluído", color: "bg-green-100 text-green-800 border-green-200" },
      cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800 border-red-200" },
      no_show: { label: "Não compareceu", color: "bg-gray-100 text-gray-800 border-gray-200" }
    };

    const config = statusConfig[appointment.status] || statusConfig.pending;
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const isUpcoming = appointment.status === 'pending' || appointment.status === 'confirmed';

    return (
      <Card className="border border-slate-100 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {appointment.service_name}
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                em <span className="font-semibold">{appointment.barber_shop_name}</span>
              </p>
              <Badge className={`${config.color} border`}>
                {config.label}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <p className="text-md font-semibold text-slate-900">
                  {format(appointmentDate, "dd 'de' MMM, yyyy", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <p className="text-md text-slate-600">{appointment.time}</p>
              </div>
            </div>
          </div>
          
          {isUpcoming && (
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => cancelMutation.mutate(appointment.id)}
                disabled={cancelMutation.isPending}
              >
                <XCircle className="w-4 h-4 mr-2" />
                {cancelMutation.isPending ? "Cancelando..." : "Cancelar Agendamento"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  if (isLoading || !customer) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Meus Agendamentos</h1>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Anteriores ({pastAppointments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(apt => (
              <AppointmentItem key={apt.id} appointment={apt} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-slate-500">
                Nenhum agendamento futuro. <Link to={createPageUrl('Home')} className="text-amber-600 hover:underline">Agende seu horário!</Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6 space-y-6">
          {pastAppointments.length > 0 ? (
            pastAppointments.map(apt => (
              <AppointmentItem key={apt.id} appointment={apt} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-slate-500">
                Nenhum histórico de agendamento.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}