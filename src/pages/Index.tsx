"use client";

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import MarkdownEditor from '@/components/MarkdownEditor';
import HistoryList from '@/components/HistoryList';
import ProcessingQueue, { ProcessingFile } from '@/components/ProcessingQueue';
import ConversionSettings, { MarkdownSettings } from '@/components/ConversionSettings';
import ThemeToggle from '@/components/ThemeToggle';
import { convertToMarkdown, downloadMarkdown } from '@/utils/converter';
import { extractTextFromPDF } from '@/utils/pdf-parser';
import { extractTextFromImage } from '@/utils/ocr-parser';
import { useHistory, HistoryItem } from '@/hooks/use-history';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles, Loader2, History, FileUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from '@/utils/toast';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [fileName, setFileName] = useState<string>('documento.md');
  const [processingQueue, setProcessingQueue] = useState<ProcessingFile[]>([]);
  const [activeTab, setActiveTab] = useState("converter");
  const [ocrLang, setOcrLang] = useState("por+eng");
  const [settings, setSettings] = useState<MarkdownSettings>({
    headingStyle: 'atx',
    hr: '---',
    bullet: '*',
    codeBlockStyle: 'fenced',
    keepImages: true
  });
  
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

        const converted = convertToMarkdown(content, file.type, settings);
        updateQueueStatus(queueId, 'completed', 100, converted);
        addToHistory(file.name, converted, file.type);
        
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <FileUp size={20} />
            </div>
            <span>Doc<span className="text-primary">MD</span></span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} />
            <span>Conversor Profissional</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Transforme seus documentos.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A maneira mais rápida de converter PDFs, imagens e HTML para Markdown limpo e organizado.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6 shrink-0">
            <ConversionSettings 
              ocrLang={ocrLang} 
              onOcrLangChange={setOcrLang}
              settings={settings}
              onSettingsChange={setSettings}
            />
            
            <ProcessingQueue 
              queue={processingQueue} 
              onClear={() => setProcessingQueue([])}
              onViewResult={(res, name) => { setMarkdown(res); setFileName(name); }}
            />

            {history.length > 0 && (
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Estatísticas</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-2xl font-bold">{history.length}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Arquivos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(history.reduce((acc, curr) => acc + curr.content.length, 0) / 1000)}k
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase">Caracteres</p>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground mb-8">
                <TabsTrigger value="converter" className="rounded-lg px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2">
                  <FileUp size={16} /> Conversor
                </TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2">
                  <History size={16} /> Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="converter" className="mt-0 focus-visible:outline-none">
                {!markdown && !isAnyProcessing ? (
                  <FileDropzone onFilesSelect={handleFilesSelect} />
                ) : (
                  <div className="space-y-6">
                    {isAnyProcessing && !markdown && (
                      <div className="p-20 text-center bg-card border-2 border-dashed rounded-3xl shadow-sm animate-pulse">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-2">Processando sua fila...</h3>
                        <p className="text-muted-foreground">Isso pode levar alguns segundos dependendo do tamanho dos arquivos.</p>
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

              <TabsContent value="history" className="mt-0 focus-visible:outline-none">
                <HistoryList 
                  items={history} 
                  onSelect={handleSelectFromHistory}
                  onDelete={removeFromHistory}
                  onClear={clearHistory}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>

        <footer className="mt-24 border-t pt-12">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;