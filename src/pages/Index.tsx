"use client";

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import MarkdownEditor from '@/components/MarkdownEditor';
import { convertToMarkdown, downloadMarkdown } from '@/utils/converter';
import { extractTextFromPDF } from '@/utils/pdf-parser';
import { extractTextFromImage } from '@/utils/ocr-parser';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { FileCode2, Sparkles, Loader2, FileSearch, Image as ImageIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { showError } from '@/utils/toast';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setFileName(file.name);

    try {
      let content = '';
      
      if (file.type === 'application/pdf') {
        content = await extractTextFromPDF(file);
      } else if (file.type.startsWith('image/')) {
        content = await extractTextFromImage(file, (p) => setProgress(p));
      } else {
        content = await file.text();
      }

      const converted = convertToMarkdown(content, file.type);
      setMarkdown(converted);
    } catch (error) {
      console.error(error);
      showError("Erro ao processar o arquivo. Tente novamente.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
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
            <span>Conversor com IA & OCR</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Tudo para <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extraia texto de PDFs, imagens e HTML instantaneamente.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-6 bg-card border rounded-2xl animate-pulse">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="text-center space-y-2 w-full max-w-xs">
                <p className="font-medium">Processando seu arquivo...</p>
                {progress > 0 && (
                  <>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{progress}% concluído</p>
                  </>
                )}
              </div>
            </div>
          ) : !markdown ? (
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
          {!markdown && !isProcessing && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "PDF para MD", desc: "Extração de texto limpa de documentos PDF.", icon: <FileSearch className="text-blue-500" /> },
                { title: "OCR em Imagens", desc: "Transforme fotos de documentos em texto editável.", icon: <ImageIcon className="text-purple-500" /> },
                { title: "HTML & Web", desc: "Converta código HTML em Markdown formatado.", icon: <FileCode2 className="text-amber-500" /> }
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