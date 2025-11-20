import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scissors, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function OwnerRegister() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: ""
  });

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  const createShopMutation = useMutation({
    mutationFn: async (shopData) => {
      return await base44.entities.BarberShop.create(shopData);
    },
    onSuccess: (shop) => {
      toast.success("Salão cadastrado com sucesso!");
      navigate(createPageUrl(`OwnerDashboard?shopId=${shop.id}`));
    },
    onError: () => {
      toast.error("Erro ao cadastrar salão");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Faça login para continuar");
      return;
    }

    createShopMutation.mutate({
      ...formData,
      owner_email: user.email,
      is_active: true,
      rating: 0,
      total_reviews: 0
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="shadow-xl border border-slate-100">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-3">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900">
            Cadastrar Meu Salão
          </CardTitle>
          <p className="text-slate-600">Junte-se ao BarberMatch e comece a agendar.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Salão</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Ex: Barbearia do Zé" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="(99) 99999-9999" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Uma breve descrição sobre o seu salão" 
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Rua Exemplo, 123" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input 
                  id="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="São Paulo" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado (UF)</Label>
                <Input 
                  id="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  placeholder="SP" 
                  maxLength={2}
                  required 
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-lg shadow-amber-500/30"
              disabled={createShopMutation.isPending}
            >
              {createShopMutation.isPending ? (
                "Cadastrando..."
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Finalizar Cadastro
                </>
              )}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}