import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Clock } from 'lucide-react';

export default function StoreStatus() {
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      const openTime = 18 * 60; // 18:00
      const closeTime = 23 * 60 + 30; // 23:30
      const currentTime = hour * 60 + minute;
      
      // Also check logic for day rollover if needed, but for simplicity assuming same day
      setIsOpen(currentTime >= openTime && currentTime <= closeTime);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl p-4 shadow-lg border-2 mb-6
        ${isOpen
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-3 rounded-full
          ${isOpen ? 'bg-green-100' : 'bg-red-100'}
        `}>
          {isOpen ? (
            <Store className="w-6 h-6 text-green-600" />
          ) : (
            <Clock className="w-6 h-6 text-red-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${isOpen ? 'text-green-900' : 'text-red-900'}`}>
            {isOpen ? '🎉 Estamos Abertos!' : 'Estamos Fechados'}
          </h3>
          <p className={`text-sm ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
            {isOpen
              ? 'Faça seu pedido agora!'
              : 'Horário de funcionamento: 18h às 23h30'
            }
          </p>
        </div>
        
        {isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
}