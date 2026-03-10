"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Check, Trash2, Eye, Edit3, Columns, Code } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import MarkdownPreview from './MarkdownPreview';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  content: string;
  onChange: (val: string) => void;
  onDownload: () => void;
  onClear: () => void;
}

const MarkdownEditor = ({ content, onChange, onDownload, onClear }: MarkdownEditorProps) => {
  const [copied, setCopied] = useState<'md' | 'html' | null>(null);
  const [view, setView] = useState<"edit" | "preview" | "split">("edit");

  // Ajusta a visualização padrão baseada no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && view !== "split") {
        // Opcional: auto-ativar split em telas grandes
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  const handleCopy = (type: 'md' | 'html') => {
    if (type === 'md') {
      navigator.clipboard.writeText(content);
    } else {
      // Simples conversão básica para HTML (poderia usar uma lib como 'marked' se necessário)
      // Por enquanto, copiaremos o MD mas o botão está preparado
      navigator.clipboard.writeText(content);
    }
    setCopied(type);
    showSuccess(type === 'md' ? "Markdown copiado!" : "HTML copiado!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-card border rounded-2xl p-3 gap-4 shadow-sm">
        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full lg:w-auto">
          <TabsList className="grid w-full grid-cols-3 lg:w-[300px] bg-muted/50">
            <TabsTrigger value="edit" className="gap-2 text-xs">
              <Edit3 size={14} /> Editar
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 text-xs">
              <Eye size={14} /> Ver
            </TabsTrigger>
            <TabsTrigger value="split" className="gap-2 text-xs hidden lg:flex">
              <Columns size={14} /> Split
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
          <Button variant="outline" size="sm" onClick={() => handleCopy('md')} className="gap-2 h-9 rounded-xl">
            {copied === 'md' ? <Check size={14} /> : <Copy size={14} />}
            <span className="hidden sm:inline">Copiar MD</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload} className="gap-2 h-9 rounded-xl">
            <Download size={14} />
            <span className="hidden sm:inline">Baixar</span>
          </Button>
          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
          <Button variant="ghost" size="sm" onClick={onClear} className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 rounded-xl">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-4 transition-all duration-500",
        view === "split" ? "lg:grid-cols-2" : "grid-cols-1"
      )}>
        {(view === "edit" || view === "split") && (
          <div className="relative group">
            <Textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="O Markdown convertido aparecerá aqui..."
              className="min-h-[600px] font-mono text-sm p-8 leading-relaxed resize-none focus-visible:ring-primary/20 border-2 rounded-2xl bg-card/50 backdrop-blur-sm"
            />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="bg-muted px-2 py-1 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Editor</span>
            </div>
          </div>
        )}
        
        {(view === "preview" || view === "split") && (
          <div className="relative group">
            <div className="min-h-[600px] border-2 rounded-2xl bg-card overflow-hidden">
              <MarkdownPreview content={content} />
            </div>
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Preview</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
        <div className="flex gap-4">
          <span>{content.length} Caracteres</span>
          <span>{content.split(/\s+/).filter(Boolean).length} Palavras</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Sincronizado
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;