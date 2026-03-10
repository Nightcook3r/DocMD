"use client";

import React from 'react';
import { HistoryItem } from '@/hooks/use-history';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const HistoryList = ({ items, onSelect, onDelete, onClear }: HistoryListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
        <FileText className="mx-auto mb-4 text-muted-foreground opacity-20" size={48} />
        <p className="text-muted-foreground">Nenhum histórico encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Conversões Recentes</h2>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive">
          Limpar Tudo
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <FileText size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{item.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {format(item.date, "PPp", { locale: ptBR })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="icon" onClick={() => onSelect(item)}>
                <ExternalLink size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(item.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;