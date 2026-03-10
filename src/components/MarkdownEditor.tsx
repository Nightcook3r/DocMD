"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Download, Copy, Check, Trash2, Eye, Edit3, Columns, FileEdit, Clock, Type, AlignLeft } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import MarkdownPreview from './MarkdownPreview';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { getDocumentStats } from '@/utils/stats';
import { marked } from 'marked';

interface MarkdownEditorProps {
  content: string;
  fileName: string;
  onFileNameChange: (name: string) => void;
  onChange: (val: string) => void;
  onDownload: () => void;
  onClear: () => void;
}

const MarkdownEditor = ({ content, fileName, onFileNameChange, onChange, onDownload, onClear }: MarkdownEditorProps) => {
  const [copied, setCopied] = useState<'md' | 'html' | null>(null);
  const [view, setView] = useState<"edit" | "preview" | "split">("edit");
  const stats = getDocumentStats(content);

  const handleCopy = async (type: 'md' | 'html') => {
    let textToCopy = content;
    if (type === 'html') {
      textToCopy = await marked.parse(content);
    }
    
    await navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    showSuccess(type === 'md' ? "Markdown copiado!" : "HTML copiado!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toolbar Superior */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-card border rounded-2xl p-3 gap-4 shadow-sm">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <FileEdit className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input 
              value={fileName}
              onChange={(e) => onFileNameChange(e.target.value)}
              className="pl-9 h-9 bg-muted/30 border-none focus-visible:ring-1 rounded-xl text-sm font-medium"
              placeholder="Nome do arquivo..."
            />
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="hidden sm:block">
            <TabsList className="bg-muted/50 h-9 p-1 rounded-xl">
              <TabsTrigger value="edit" className="h-7 px-3 text-[10px] uppercase font-bold"><Edit3 size={12} className="mr-1"/> Edit</TabsTrigger>
              <TabsTrigger value="preview" className="h-7 px-3 text-[10px] uppercase font-bold"><Eye size={12} className="mr-1"/> View</TabsTrigger>
              <TabsTrigger value="split" className="h-7 px-3 text-[10px] uppercase font-bold hidden lg:flex"><Columns size={12} className="mr-1"/> Split</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
          <Button variant="outline" size="sm" onClick={() => handleCopy('md')} className="gap-2 h-9 rounded-xl text-xs font-bold">
            {copied === 'md' ? <Check size={14} /> : <Copy size={14} />}
            MD
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCopy('html')} className="gap-2 h-9 rounded-xl text-xs font-bold">
            {copied === 'html' ? <Check size={14} /> : <Copy size={14} />}
            HTML
          </Button>
          <Button variant="primary" size="sm" onClick={onDownload} className="gap-2 h-9 rounded-xl text-xs font-bold shadow-lg shadow-primary/20">
            <Download size={14} />
            Baixar
          </Button>
          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
          <Button variant="ghost" size="sm" onClick={onClear} className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 rounded-xl">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      {/* Área do Editor/Preview */}
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
          </div>
        )}
        
        {(view === "preview" || view === "split") && (
          <div className="relative group">
            <div className="min-h-[600px] border-2 rounded-2xl bg-card overflow-hidden">
              <MarkdownPreview content={content} />
            </div>
          </div>
        )}
      </div>

      {/* Footer com Estatísticas */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-muted/30 rounded-2xl border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
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
    </div>
  );
};

export default MarkdownEditor;