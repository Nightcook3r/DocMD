"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Download, Copy, Check, Trash2, Eye, Edit3, Columns, 
  FileEdit, Clock, Type, AlignLeft, Sparkles, Printer, FileCode
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import MarkdownPreview from './MarkdownPreview';
import MarkdownToolbar from './MarkdownToolbar';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { getDocumentStats } from '@/utils/stats';
import { marked } from 'marked';
import { formatMarkdown, downloadHtml } from '@/utils/converter';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const [isFormatting, setIsFormatting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stats = getDocumentStats(content);

  const handleAction = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newContent = `${before}${prefix}${selectedText}${suffix}${after}`;
    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleFormat = async () => {
    setIsFormatting(true);
    try {
      const formatted = await formatMarkdown(content);
      onChange(formatted);
      showSuccess("Markdown formatado com sucesso!");
    } catch (e) {
      showError("Erro ao formatar documento.");
    } finally {
      setIsFormatting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 print:m-0">
      {/* Toolbar Superior - Escondida na impressão */}
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
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="hidden sm:block">
            <TabsList className="bg-muted/50 h-9 p-1 rounded-xl">
              <TabsTrigger value="edit" className="h-7 px-3 text-[10px] uppercase font-bold"><Edit3 size={12} className="mr-1"/> Edit</TabsTrigger>
              <TabsTrigger value="preview" className="h-7 px-3 text-[10px] uppercase font-bold"><Eye size={12} className="mr-1"/> View</TabsTrigger>
              <TabsTrigger value="split" className="h-7 px-3 text-[10px] uppercase font-bold hidden lg:flex"><Columns size={12} className="mr-1"/> Split</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFormat} 
            disabled={isFormatting}
            className="gap-2 h-9 rounded-xl text-xs font-bold text-primary border-primary/20 hover:bg-primary/5"
          >
            <Sparkles size={14} className={cn(isFormatting && "animate-spin")} />
            Limpar
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" size="sm" className="gap-2 h-9 rounded-xl text-xs font-bold shadow-lg shadow-primary/20">
                <Download size={14} />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl p-2">
              <DropdownMenuItem onClick={onDownload} className="rounded-lg gap-2 cursor-pointer">
                <FileCode size={14} /> Baixar .md
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadHtml(content, fileName)} className="rounded-lg gap-2 cursor-pointer">
                <FileCode size={14} className="text-orange-500" /> Baixar .html
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint} className="rounded-lg gap-2 cursor-pointer">
                <Printer size={14} className="text-blue-500" /> Imprimir / PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
          
          <Button variant="ghost" size="sm" onClick={() => handleCopy('md')} className="h-9 px-3 rounded-xl text-xs font-bold">
            {copied === 'md' ? <Check size={14} /> : <Copy size={14} />}
          </Button>

          <Button variant="ghost" size="sm" onClick={onClear} className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 rounded-xl">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      {/* Área do Editor/Preview */}
      <div className={cn(
        "grid gap-4 transition-all duration-500",
        view === "split" ? "lg:grid-cols-2" : "grid-cols-1",
        "print:block print:border-none"
      )}>
        {(view === "edit" || view === "split") && (
          <div className="relative group flex flex-col border-2 rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden print:hidden">
            <MarkdownToolbar onAction={handleAction} />
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="O Markdown convertido aparecerá aqui..."
              className="min-h-[600px] font-mono text-sm p-8 leading-relaxed resize-none focus-visible:ring-0 border-none bg-transparent"
            />
          </div>
        )}
        
        {(view === "preview" || view === "split") && (
          <div className="relative group print:m-0">
            <div className="min-h-[600px] border-2 rounded-2xl bg-card overflow-hidden print:border-none print:min-h-0">
              <MarkdownPreview content={content} />
            </div>
          </div>
        )}
      </div>

      {/* Footer com Estatísticas - Escondido na impressão */}
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
    </div>
  );
};

export default MarkdownEditor;