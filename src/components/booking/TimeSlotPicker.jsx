import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function TimeSlotPicker({ availableSlots, selectedTime, onSelectTime }) {
  if (!availableSlots || availableSlots.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">Nenhum horário disponível para esta data</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
      {availableSlots.map((slot) => (
        <Button
          key={slot}
          variant={selectedTime === slot ? "default" : "outline"}
          onClick={() => onSelectTime(slot)}
          className={`h-12 ${
            selectedTime === slot
              ? "bg-slate-900 hover:bg-slate-800 text-white"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          {slot}
        </Button>
      ))}
    </div>
  );
}