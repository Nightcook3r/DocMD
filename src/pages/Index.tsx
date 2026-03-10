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
import { Sparkles, Loader2, History, FileUp, Settings2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';

interface ProcessingFile {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: string;
}

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');
  const [processingQueue, setProcessingQueue] = useState<ProcessingFile[]>([]);
  const [activeTab, setActiveTab] = useState("converter");
  const [ocrLang, setOcrLang] = useState("por+eng");
  
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  const handleFilesSelect = async (files: File[]) => {
    const newQueue: ProcessingFile[] = files.map(f => ({
      id: crypto.randomUUID(),
      name: f.name,
      progress: 0,
      status: 'pending'
    }));

    setProcessingQueue(prev => [...newQueue, ...prev]);
    setActiveTab("converter");

    for (const file of files) {
      const queueId = newQueue.find(q => q.name === file.name)?.id;
      if (!queueId) continue;

      updateQueueStatus(queueId, 'processing', 0);

      try {
        let content = '';
        if (file.type === 'application/pdf') {
          content = await extractTextFromPDF(file, (p) => updateQueueStatus(queueId, 'processing', p));
        } else if (file.type.startsWith('image/')) {
          content = await extractTextFromImage(file, (p) => updateQueueStatus(queueId, 'processing', p));
        } else {
          content = await file.text();
        }

        const converted = convertToMarkdown(content, file.type);
        updateQueueStatus(queueId, 'completed', 100, converted);
        addToHistory(file.name, converted, file.type);
        
        // Se for o único arquivo ou o primeiro, já mostra no editor
        if (files.length === 1) {
          setMarkdown(converted);
          setFileName(file.name);
        }
      } catch (error) {
        console.error(error);
        updateQueueStatus(queueId, 'error', 0);
        showError(`Erro ao processar ${file.name}`);
      }
    }
    
    if (files.length > 1) {
      showSuccess(`${files.length} arquivos processados!`);
    }
  };

  const updateQueueStatus = (id: string, status: ProcessingFile['status'], progress: number, result?: string) => {
    setProcessingQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status, progress, result } : item
    ));
  };

  const handleSelectFromHistory = (item: HistoryItem) => {
    setMarkdown(item.content);
    setFileName(item.name);
    setActiveTab("converter");
  };

  const isAnyProcessing = processingQueue.some(f => f.status === 'processing' || f.status === 'pending');

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>Conversor em Lote</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Doc para <span className="text-primary">Markdown</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Arraste múltiplos arquivos e converta tudo de uma vez com OCR inteligente.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Settings */}
          <div className="w-full lg:w-72 space-y-6 shrink-0">
            <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Settings2 size={16} />
                  Configurações OCR
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Idioma</label>
                  <Select value={ocrLang} onValueChange={setOcrLang}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="por+eng">Português + Inglês</SelectItem>
                      <SelectItem value="por">Português</SelectItem>
                      <SelectItem value="eng">Inglês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {processingQueue.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fila de Arquivos</span>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => setProcessingQueue([])}>Limpar</Button>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-auto pr-2">
                    {processingQueue.map(file => (
                      <div key={file.id} className="text-xs space-y-1.5 p-2 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-medium flex-1">{file.name}</span>
                          {file.status === 'completed' && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
                          {file.status === 'error' && <AlertCircle size={14} className="text-destructive shrink-0" />}
                          {file.status === 'processing' && <Loader2 size={14} className="text-primary animate-spin shrink-0" />}
                        </div>
                        {file.status === 'processing' && (
                          <Progress value={file.progress} className="h-1" />
                        )}
                        {file.status === 'completed' && (
                          <button 
                            onClick={() => { setMarkdown(file.result || ''); setFileName(file.name); }}
                            className="text-[10px] text-primary hover:underline"
                          >
                            Visualizar no Editor
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                {!markdown && !isAnyProcessing ? (
                  <FileDropzone onFilesSelect={handleFilesSelect} />
                ) : (
                  <div className="space-y-6">
                    {isAnyProcessing && !markdown && (
                      <div className="p-12 text-center bg-card border-2 border-dashed rounded-2xl">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Processando arquivos da fila...</p>
                      </div>
                    )}
                    {markdown && (
                      <MarkdownEditor 
                        content={markdown} 
                        onChange={setMarkdown}
                        onDownload={() => downloadMarkdown(markdown, fileName)}
                        onClear={() => { setMarkdown(''); setFileName('documento.md'); }}
                      />
                    )}
                  </div>
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