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
import { Sparkles, Loader2, History, FileUp, Languages, Settings2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showError, showSuccess } from '@/utils/toast';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("converter");
  const [ocrLang, setOcrLang] = useState("por+eng");
  
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
      showSuccess("Arquivo processado com sucesso!");
    } catch (error) {
      console.error(error);
      showError("Erro ao processar o arquivo. Verifique o formato e tente novamente.");
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

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>Conversor Inteligente</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Doc para <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A ferramenta definitiva para transformar PDFs, imagens e HTML em documentos Markdown limpos.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Settings (Desktop) */}
          <div className="w-full md:w-64 space-y-6 shrink-0">
            <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Settings2 size={16} />
                Configurações OCR
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Idioma de Reconhecimento</label>
                <Select value={ocrLang} onValueChange={setOcrLang}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="por+eng">Português + Inglês</SelectItem>
                    <SelectItem value="por">Apenas Português</SelectItem>
                    <SelectItem value="eng">Apenas Inglês</SelectItem>
                    <SelectItem value="spa">Espanhol</SelectItem>
                    <SelectItem value="fra">Francês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">
                O OCR é ativado automaticamente para imagens e PDFs sem texto nativo.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 max-w-[400px]">
                <TabsTrigger value="converter" className="gap-2">
                  <FileUp size={16} /> Conversor
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History size={16} /> Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="converter" className="space-y-8">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center p-20 space-y-6 bg-card border-2 border-dashed rounded-2xl shadow-sm">
                    <div className="relative">
                      <Loader2 className="w-16 h-16 text-primary animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Languages size={24} className="text-primary/50" />
                      </div>
                    </div>
                    <div className="text-center space-y-3 w-full max-w-xs">
                      <p className="font-semibold text-lg">Extraindo conteúdo...</p>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground font-mono">{progress}%</p>
                    </div>
                  </div>
                ) : !markdown ? (
                  <FileDropzone onFileSelect={handleFileSelect} />
                ) : (
                  <MarkdownEditor 
                    content={markdown} 
                    onChange={setMarkdown}
                    onDownload={() => downloadMarkdown(markdown, fileName)}
                    onClear={() => { setMarkdown(''); setFileName('documento.md'); }}
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
          </div>
        </div>

        <footer className="mt-20">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;