"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Check, Trash2, Eye, Edit3 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import MarkdownPreview from './MarkdownPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarkdownEditorProps {
  content: string;
  onChange: (val: string) => void;
  onDownload: () => void;
  onClear: () => void;
}

const MarkdownEditor = ({ content, onChange, onDownload, onClear }: MarkdownEditorProps) => {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"edit" | "preview">("edit");

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    showSuccess("Copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-muted/30 p-2 rounded-lg border gap-2">
        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
            <TabsTrigger value="edit" className="gap-2">
              <Edit3 size={14} /> Editar
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye size={14} /> Ver
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 flex-1 sm:flex-none">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload} className="gap-2 flex-1 sm:flex-none">
            <Download size={16} />
            Baixar
          </Button>
          <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="relative group">
        {view === "edit" ? (
          <Textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="O Markdown convertido aparecerá aqui..."
            className="min-h-[500px] font-mono text-sm p-6 leading-relaxed resize-none focus-visible:ring-primary/20 border-2"
          />
        ) : (
          <MarkdownPreview content={content} />
        )}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded">
          {content.length} caracteres | {content.split(/\s+/).filter(Boolean).length} palavras
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;