import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantidade: number, sabor?: string) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [quantidade, setQuantidade] = useState(0);
  const [saborSelecionado, setSaborSelecionado] = useState('');
  const [showFlavorError, setShowFlavorError] = useState(false);

  const handleIncrement = () => {
    if (item.tem_opcoes_sabor && !saborSelecionado) {
      setShowFlavorError(true);
      return;
    }
    setShowFlavorError(false);
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    onAddToCart(item, novaQuantidade, saborSelecionado);
  };

  const handleDecrement = () => {
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      onAddToCart(item, novaQuantidade, saborSelecionado);
    }
  };

  const handleFlavorChange = (value: string) => {
    setSaborSelecionado(value);
    setShowFlavorError(false);
    if (quantidade > 0) {
      onAddToCart(item, quantidade, value);
    }
  };

  const isAvailable = item.disponivel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2
        ${quantidade > 0 ? 'border-red-400' : 'border-transparent'}
        ${!isAvailable ? 'opacity-60' : ''}
      `}
    >
      {/* Image Section */}
      {item.imagem_url && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-100 to-rose-100">
          <img
            src={item.imagem_url}
            alt={item.nome}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                INDISPONÍVEL
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {item.codigo && (
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                {item.codigo}
              </span>
            )}
            <h3 className="font-bold text-gray-900 text-lg mt-2 leading-tight">
              {item.nome}
            </h3>
            {item.descricao && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.descricao}
              </p>
            )}
          </div>
        </div>

        {/* Flavor Selection */}
        {item.tem_opcoes_sabor && item.opcoes_sabor && isAvailable && (
          <div className="mb-4">
            <Select value={saborSelecionado} onValueChange={handleFlavorChange}>
              <SelectTrigger className={showFlavorError ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o sabor..." />
              </SelectTrigger>
              <SelectContent>
                {item.opcoes_sabor.map((sabor) => (
                  <SelectItem key={sabor} value={sabor}>
                    {sabor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showFlavorError && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Selecione o sabor antes de adicionar
              </p>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-red-600">
            R$ {item.preco.toFixed(2).replace('.', ',')}
          </div>
          
          {isAvailable && (
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {quantidade > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2 bg-red-50 rounded-full p-1"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleDecrement}
                      className="h-8 w-8 rounded-full hover:bg-red-100"
                    >
                      <Minus className="h-4 w-4 text-red-600" />
                    </Button>
                    <span className="font-bold text-gray-900 w-6 text-center">
                      {quantidade}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button
                size="icon"
                onClick={handleIncrement}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}