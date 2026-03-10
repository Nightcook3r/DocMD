"use client";

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import MarkdownEditor from '@/components/MarkdownEditor';
import { convertToMarkdown, downloadMarkdown } from '@/utils/converter';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { FileCode2, Sparkles } from 'lucide-react';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');

  const handleFileSelect = (file: File, content: string) => {
    const converted = convertToMarkdown(content, file.type);
    setMarkdown(converted);
    setFileName(file.name);
  };

  const handleDownload = () => {
    if (!markdown) return;
    downloadMarkdown(markdown, fileName);
  };

  const handleClear = () => {
    setMarkdown('');
    setFileName('documento.md');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>Conversor Inteligente</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Transforme arquivos em <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Converta HTML, textos e códigos para o formato Markdown de forma instantânea e elegante.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!markdown ? (
            <FileDropzone onFileSelect={handleFileSelect} />
          ) : (
            <MarkdownEditor 
              content={markdown} 
              onChange={setMarkdown}
              onDownload={handleDownload}
              onClear={handleClear}
            />
          )}

          {/* Features Info */}
          {!markdown && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "HTML para MD", desc: "Transforme páginas web complexas em Markdown limpo.", icon: <FileCode2 className="text-blue-500" /> },
                { title: "Preservação", desc: "Mantém links, tabelas e formatação original.", icon: <Sparkles className="text-amber-500" /> },
                { title: "Privacidade", desc: "Tudo é processado localmente no seu navegador.", icon: <Sparkles className="text-green-500" /> }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-20">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;