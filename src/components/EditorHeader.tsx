"use client";

import React from 'react';
import { FileEdit, Edit3, Eye, Columns, LayoutTemplate, ChevronDown, Sparkles, Download, FileCode, Printer, Check, Copy, Trash2, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { MARKDOWN_TEMPLATES } from '@/utils/templates';
import { showSuccess } from '@/utils/toast';

interface EditorHeaderProps {
  fileName: string;
  onFileNameChange: (name: string) => void;
  view: "edit" | "preview" | "split";
  onViewChange: (view: "edit" | "preview" | "split") => void;
  onApplyTemplate: (content: string) => void;
  onFormat: () => void;
  isFormatting: boolean;
  onDownload: () => void;
  onDownloadHtml: () => void;
  onPrint: () => void;
  onCopy: (type: 'md' | 'html') => void;
  copied: 'md' | 'html' | null;
  onClear: () => void;
}

const EditorHeader = ({
  fileName, onFileNameChange, view, onViewChange, onApplyTemplate,
  onFormat, isFormatting, onDownload, onDownloadHtml, onPrint,
  onCopy, copied, onClear
}: EditorHeaderProps) => {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DocMD - Conversor de Markdown',
          text: 'Estou a usar o DocMD para converter os meus documentos!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao partilhar', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showSuccess("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-card border rounded-2xl p-3 gap-4 shadow-sm print:hidden">
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
        <Tabs value={view} onValueChange={(v) => onViewChange(v as any)} className="hidden sm:block">
          <TabsList className="bg-muted/50 h-9 p-1 rounded-xl">
            <TabsTrigger value="edit" className="h-7 px-3 text-[10px] uppercase font-bold"><Edit3 size={12} className="mr-1"/> Edit</TabsTrigger>
            <TabsTrigger value="preview" className="h-7 px-3 text-[10px] uppercase font-bold"><Eye size={12} className="mr-1"/> View</TabsTrigger>
            <TabsTrigger value="split" className="h-7 px-3 text-[10px] uppercase font-bold hidden lg:flex"><Columns size={12} className="mr-1"/> Split</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
        <Button variant="ghost" size="sm" onClick={handleShare} className="h-9 px-3 rounded-xl text-xs font-bold gap-2">
          <Share2 size={14} /> Partilhar
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-9 rounded-xl text-xs font-bold border-primary/20 hover:bg-primary/5">
              <LayoutTemplate size={14} /> Modelos <ChevronDown size={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl p-2 w-56">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Escolha um ponto de partida</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MARKDOWN_TEMPLATES.map((t, i) => (
              <DropdownMenuItem key={i} onClick={() => onApplyTemplate(t.content)} className="rounded-lg cursor-pointer py-2">
                {t.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" onClick={onFormat} disabled={isFormatting} className="gap-2 h-9 rounded-xl text-xs font-bold text-primary border-primary/20 hover:bg-primary/5">
          <Sparkles size={14} className={cn(isFormatting && "animate-spin")} /> Limpar
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="gap-2 h-9 rounded-xl text-xs font-bold shadow-lg shadow-primary/20">
              <Download size={14} /> Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl p-2">
            <DropdownMenuItem onClick={onDownload} className="rounded-lg gap-2 cursor-pointer"><FileCode size={14} /> Baixar .md</DropdownMenuItem>
            <DropdownMenuItem onClick={onDownloadHtml} className="rounded-lg gap-2 cursor-pointer"><FileCode size={14} className="text-orange-500" /> Baixar .html</DropdownMenuItem>
            <DropdownMenuItem onClick={onPrint} className="rounded-lg gap-2 cursor-pointer"><Printer size={14} className="text-blue-500" /> Imprimir / PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
        <Button variant="ghost" size="sm" onClick={() => onCopy('md')} className="h-9 px-3 rounded-xl text-xs font-bold">
          {copied === 'md' ? <Check size={14} /> : <Copy size={14} />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 rounded-xl">
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;