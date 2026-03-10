"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Check, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface MarkdownEditorProps {
  content: string;
  onChange: (val: string) => void;
  onDownload: () => void;
  onClear: () => void;
}

const MarkdownEditor = ({ content, onChange, onDownload, onClear }: MarkdownEditorProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    showSuccess("Copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload} className="gap-2">
            <Download size={16} />
            Baixar .md
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2">
          <Trash2 size={16} />
          Limpar
        </Button>
      </div>
      
      <div className="relative group">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="O Markdown convertido aparecerá aqui..."
          className="min-h-[400px] font-mono text-sm p-6 leading-relaxed resize-none focus-visible:ring-primary/20 border-2"
        />
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          {content.length} caracteres
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;