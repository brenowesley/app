import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react";
import AppointmentCard from "../components/owner/AppointmentCard";
import ServiceCard from "../components/owner/ServiceCard";
import ServiceFormDialog from "../components/owner/ServiceFormDialog";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function OwnerDashboard() {
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const shopIdParam = urlParams.get('shopId');
  
  const [user, setUser] = useState(null);
  const [shopId, setShopId] = useState(shopIdParam);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    base44.auth.me().then(async (u) => {
      setUser(u);
      if (!shopIdParam) {
        // Tenta buscar o primeiro salão associado ao dono, se nenhum shopId foi passado na URL
        const shops = await base44.entities.BarberShop.filter({ owner_email: u.email });
        if (shops.length > 0) {
          setShopId(shops[0].id);
        } else {
          // Se não tem salão, redireciona para o cadastro
          // window.location.href = createPageUrl('OwnerRegister'); 
          console.log("Usuário não possui salão cadastrado.");
        }
      }
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, [shopIdParam]);

  const { data: shop } = useQuery({
    queryKey: ['shop', shopId],
    queryFn: () => base44.entities.BarberShop.filter({ id: shopId }),
    select: (data) => data[0],
    enabled: !!shopId
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ['owner-appointments', shopId],
    queryFn: () => base44.entities.Appointment.filter({ barber_shop_id: shopId }, '-date'),
    enabled: !!shopId
  });

  const { data: services = [] } = useQuery({
    queryKey: ['owner-services', shopId],
    queryFn: () => base44.entities.Service.filter({ barber_shop_id: shopId }),
    enabled: !!shopId
  });

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await base44.entities.Appointment.update(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['owner-appointments']);
    }
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId) => {
      await base44.entities.Service.delete(serviceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['owner-services']);
    }
  });
  
  // Calculate stats for the current month
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);
  
  const currentMonthAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= startOfMonthDate && aptDate <= endOfMonthDate;
  });
  
  const totalRevenue = currentMonthAppointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.service_price, 0);
  
  const stats = [
    { title: "Agendamentos Mês", value: currentMonthAppointments.length, icon: Calendar, color: "text-blue-500" },
    { title: "Faturamento Mês", value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-emerald-500" },
    { title: "Serviços Ativos", value: services.filter(s => s.is_active).length, icon: TrendingUp, color: "text-amber-500" },
    { title: "Novos Clientes", value: appointments.length, icon: Users, color: "text-purple-500" }, // Mocked: should count unique customers
  ];

  const handleEditService = (service) => {
    setEditingService(service);
    setShowServiceForm(true);
  };

  const handleCreateService = () => {
    setEditingService(null);
    setShowServiceForm(true);
  };

  if (!shop) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-slate-600">Carregando ou Salão não encontrado/associado.</p>
        <p className="mt-4"><a href={createPageUrl('OwnerRegister')} className="text-amber-600 hover:underline">Cadastrar Novo Salão?</a></p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard: {shop.name}</h1>
      <p className="text-slate-600 mb-8">Gerencie seu salão e acompanhe suas métricas.</p>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md border border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                {format(today, 'MMMM', { locale: ptBR })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-96">
          <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
        </TabsList>
        
        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Próximos Agendamentos</h2>
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.filter(apt => apt.status === 'pending' || apt.status === 'confirmed').map(apt => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  onUpdateStatus={(status) => updateAppointmentStatusMutation.mutate({ id: apt.id, status })}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-lg border border-slate-100">
              <p className="text-slate-500">Nenhum agendamento futuro.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="mt-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Meus Serviços</h2>
            <Button onClick={handleCreateService} className="bg-amber-500 hover:bg-amber-600">
              Adicionar Serviço
            </Button>
          </div>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onEdit={() => handleEditService(service)}
                  onDelete={() => deleteServiceMutation.mutate(service.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-lg border border-slate-100">
              <p className="text-slate-500">Nenhum serviço cadastrado.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Service Form Dialog */}
      {showServiceForm && shopId && (
        <ServiceFormDialog 
          shopId={shopId} 
          service={editingService} 
          onClose={() => setShowServiceForm(false)} 
        />
      )}
    </div>
  );
}