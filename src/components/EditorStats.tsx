"use client";

import React from 'react';
import { Type, AlignLeft, Clock } from 'lucide-react';

interface EditorStatsProps {
  stats: {
    characters: number;
    words: number;
    readingTime: number;
  };
}

const EditorStats = ({ stats }: EditorStatsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-muted/30 rounded-2xl border text-[10px] font-bold uppercase tracking-widest text-muted-foreground print:hidden">
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Type size={14} className="text-primary" />
          <span>{stats.characters} Caracteres</span>
        </div>
        <div className="flex items-center gap-2">
          <AlignLeft size={14} className="text-primary" />
          <span>{stats.words} Palavras</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-primary" />
          <span>{stats.readingTime} min de leitura</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full border shadow-sm">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>Pronto para exportar</span>
      </div>
    </div>
  );
};

export default EditorStats;