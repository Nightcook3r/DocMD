"use client";

import React, { useState } from 'react';
import { HistoryItem } from '@/hooks/use-history';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Trash2, ExternalLink, Calendar, Search, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const HistoryList = ({ items, onSelect, onDelete, onClear }: HistoryListProps) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
        <FileText className="mx-auto mb-4 text-muted-foreground opacity-20" size={48} />
        <p className="text-muted-foreground">Nenhum histórico encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Buscar no histórico..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:bg-destructive/10">
          Limpar Tudo
        </Button>
      </div>
      
      <div className="grid gap-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-all shadow-sm"
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
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum resultado para "{search}"
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryList;