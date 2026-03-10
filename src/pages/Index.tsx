"use client";

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import MarkdownEditor from '@/components/MarkdownEditor';
import HistoryList from '@/components/HistoryList';
import { convertToMarkdown, downloadMarkdown } from '@/utils/converter';
import { extractTextFromPDF } from '@/utils/pdf-parser';
import { extractTextFromImage } from '@/utils/ocr-parser';
import { useHistory, HistoryItem } from '@/hooks/use-history';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles, Loader2, History, FileUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from '@/utils/toast';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("converter");
  
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setFileName(file.name);

    try {
      let content = '';
      
      if (file.type === 'application/pdf') {
        content = await extractTextFromPDF(file, (p) => setProgress(p));
      } else if (file.type.startsWith('image/')) {
        content = await extractTextFromImage(file, (p) => setProgress(p));
      } else {
        content = await file.text();
      }

      const converted = convertToMarkdown(content, file.type);
      setMarkdown(converted);
      addToHistory(file.name, converted, file.type);
      showSuccess("Arquivo processado e salvo no histórico!");
    } catch (error) {
      console.error(error);
      showError("Erro ao processar o arquivo. Tente novamente.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleSelectFromHistory = (item: HistoryItem) => {
    setMarkdown(item.content);
    setFileName(item.name);
    setActiveTab("converter");
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
            <span>Conversor com OCR Avançado</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Arquivos para <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Converta PDFs (mesmo com imagens), fotos e HTML com salvamento local automático.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-[400px] mx-auto">
            <TabsTrigger value="converter" className="gap-2">
              <FileUp size={16} /> Conversor
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History size={16} /> Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="converter" className="space-y-8">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center p-20 space-y-6 bg-card border rounded-2xl shadow-sm">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="text-center space-y-2 w-full max-w-xs">
                  <p className="font-medium">Processando com OCR...</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{progress}% concluído</p>
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
          </TabsContent>

          <TabsContent value="history">
            <HistoryList 
              items={history} 
              onSelect={handleSelectFromHistory}
              onDelete={removeFromHistory}
              onClear={clearHistory}
            />
          </TabsContent>
        </Tabs>

        <footer className="mt-20">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;