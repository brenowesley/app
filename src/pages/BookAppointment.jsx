import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import TimeSlotPicker from "../components/booking/TimeSlotPicker";
import BookingSummary from "../components/booking/BookingSummary";
import { toast } from "sonner";

export default function BookAppointment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const shopId = urlParams.get('shopId');
  const serviceId = urlParams.get('serviceId');

  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    base44.auth.me().then(async (u) => {
      setUser(u);
      const customers = await base44.entities.Customer.filter({ created_by: u.email });
      if (customers.length > 0) {
        setCustomer(customers[0]);
      } else {
        // Se o usuário está logado mas não é um Customer, ele deve ser cadastrado/redirecionado
        // Lógica simplificada: Assume que o usuário é um Customer se logado.
        // Em um app real, aqui deveria haver um check-in/cadastro de Customer.
        setCustomer({ id: u.id, full_name: u.full_name, phone: 'N/A' }); 
      }
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  const { data: shop } = useQuery({
    queryKey: ['shop', shopId],
    queryFn: () => base44.entities.BarberShop.filter({ id: shopId }),
    select: (data) => data[0],
    enabled: !!shopId
  });

  const { data: service } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => base44.entities.Service.filter({ id: serviceId }),
    select: (data) => data[0],
    enabled: !!serviceId
  });

  // Mock function to generate time slots
  const generateSlots = (date) => {
    if (!date) return [];
    
    // Mock logic: generate fixed slots from 9:00 to 18:00
    const slots = [];
    for (let h = 9; h <= 17; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      if (h < 17) {
        slots.push(`${h.toString().padStart(2, '0')}:30`);
      }
    }
    // Filter out mock occupied slots (real logic would query appointments)
    const occupiedSlots = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(addDays(new Date(), 1), 'yyyy-MM-dd') 
      ? ["10:00", "14:30"] : [];
      
    return slots.filter(slot => !occupiedSlots.includes(slot));
  };
  
  useEffect(() => {
    setSelectedTime(null);
    setAvailableSlots(generateSlots(selectedDate));
  }, [selectedDate]);


  const createAppointmentMutation = useMutation({
    mutationFn: async (appointmentData) => {
      return await base44.entities.Appointment.create(appointmentData);
    },
    onSuccess: (newAppointment) => {
      queryClient.invalidateQueries(['my-appointments']);
      toast.success("Agendamento criado com sucesso!");
      navigate(createPageUrl(`MyAppointments?newId=${newAppointment.id}`));
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar agendamento");
    }
  });

  const handleSubmit = () => {
    if (!shop || !service || !customer || !selectedDate || !selectedTime) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const appointmentDate = format(selectedDate, 'yyyy-MM-dd');

    const appointmentData = {
      customer_id: customer.id,
      customer_name: customer.full_name,
      customer_phone: customer.phone,
      barber_shop_id: shop.id,
      barber_shop_name: shop.name,
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      duration_minutes: service.duration_minutes,
      date: appointmentDate,
      time: selectedTime,
      notes: notes,
      status: 'pending' 
    };

    createAppointmentMutation.mutate(appointmentData);
  };
  
  if (!shop || !service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Serviço ou Salão inválido.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to={createPageUrl(`ShopDetails?id=${shop.id}`)} className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ChevronLeft className="w-5 h-5 mr-2" />
        Voltar para {shop.name}
      </Link>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Agendar Serviço</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Step 1: Date and Time Picker */}
        <Card className="lg:col-span-2 shadow-lg border border-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              1. Selecione a Data e Hora
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            
            {/* Calendar Picker */}
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={ptBR}
                disabled={(date) => date < new Date() || date > addDays(new Date(), 90)}
                className="rounded-md border shadow"
              />
            </div>
            
            {/* Time Slot Picker */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Horários Disponíveis</h3>
              {selectedDate ? (
                <TimeSlotPicker 
                  availableSlots={availableSlots} 
                  selectedTime={selectedTime} 
                  onSelectTime={setSelectedTime}
                />
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-lg">
                  <p className="text-slate-500">Selecione uma data para ver os horários.</p>
                </div>
              )}
            </div>
            
            {/* Notes */}
            <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Observações (Opcional)</h3>
              <Textarea 
                placeholder="Ex: Prefiro o profissional X, tenho cabelo Y..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
          </CardContent>
        </Card>
        
        {/* Step 2: Summary and Confirmation */}
        <div className="lg:col-span-1 space-y-6">
          <BookingSummary 
            shop={shop} 
            service={service} 
            date={selectedDate} 
            time={selectedTime} 
          />
          
          <Button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || createAppointmentMutation.isPending}
            className="w-full h-12 text-lg bg-amber-500 hover:bg-amber-600 shadow-lg"
          >
            {createAppointmentMutation.isPending ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-amber-500 rounded-full" />
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirmar Agendamento
              </>
            )}
          </Button>
          
          <p className="text-center text-sm text-slate-500">
            Ao confirmar, você concorda com os termos de serviço do BarberMatch.
          </p>
        </div>
      </div>
    </div>
  );
}