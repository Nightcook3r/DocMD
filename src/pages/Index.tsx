"use client";

import React, { useState, useEffect, useRef } from 'react';
import FileDropzone from '@/components/FileDropzone';
import MarkdownEditor from '@/components/MarkdownEditor';
import HistoryList from '@/components/HistoryList';
import ProcessingQueue, { ProcessingFile } from '@/components/ProcessingQueue';
import ConversionSettings, { MarkdownSettings } from '@/components/ConversionSettings';
import ThemeToggle from '@/components/ThemeToggle';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { convertToMarkdown, downloadMarkdown, downloadBatchAsZip } from '@/utils/converter';
import { extractTextFromPDF } from '@/utils/pdf-parser';
import { extractTextFromImage } from '@/utils/ocr-parser';
import { useHistory, HistoryItem } from '@/hooks/use-history';
import { Loader2, History, FileUp, Archive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const Index = () => {
  const [markdown, setMarkdown] = useState<string>(() => localStorage.getItem('docmd_draft') || '');
  const [fileName, setFileName] = useState<string>(() => localStorage.getItem('docmd_filename') || 'documento.md');
  const [processingQueue, setProcessingQueue] = useState<ProcessingFile[]>([]);
  const [activeTab, setActiveTab] = useState("converter");
  const [ocrLang, setOcrLang] = useState(() => localStorage.getItem('docmd_ocr_lang') || "por+eng");
  
  const converterRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<MarkdownSettings>(() => {
    const saved = localStorage.getItem('docmd_settings');
    return saved ? JSON.parse(saved) : {
      headingStyle: 'atx',
      hr: '---',
      bullet: '*',
      codeBlockStyle: 'fenced',
      keepImages: true
    };
  });
  
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  useEffect(() => {
    localStorage.setItem('docmd_draft', markdown);
    localStorage.setItem('docmd_filename', fileName);
  }, [markdown, fileName]);

  useEffect(() => {
    localStorage.setItem('docmd_settings', JSON.stringify(settings));
    localStorage.setItem('docmd_ocr_lang', ocrLang);
  }, [settings, ocrLang]);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          setFileName(file.name.replace(/\.[^/.]+$/, "") + ".md");
        }
      } catch (error) {
        updateQueueStatus(queueId, 'error', 0);
        showError(`Erro ao processar ${file.name}`);
      }
    }
    
    if (files.length > 1) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#2563eb', '#1d4ed8'] });
      showSuccess(`${files.length} arquivos processados!`);
    }
  };

  const updateQueueStatus = (id: string, status: ProcessingFile['status'], progress: number, result?: string) => {
    setProcessingQueue(prev => prev.map(item => item.id === id ? { ...item, status, progress, result } : item));
  };

  const handleBatchDownload = async () => {
    const completedFiles = processingQueue.filter(f => f.status === 'completed' && f.result).map(f => ({ name: f.name, content: f.result! }));
    if (completedFiles.length === 0) return;
    await downloadBatchAsZip(completedFiles);
    showSuccess("Download em lote iniciado!");
  };

  const handleSelectFromHistory = (item: HistoryItem) => {
    setMarkdown(item.content);
    setFileName(item.name.endsWith('.md') ? item.name : item.name + '.md');
    setActiveTab("converter");
    scrollToConverter();
  };

  const isAnyProcessing = processingQueue.some(f => f.status === 'processing' || f.status === 'pending');
  const hasCompletedFiles = processingQueue.some(f => f.status === 'completed');

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <nav className="border-b bg-background/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setMarkdown(''); setFileName('documento.md'); setActiveTab('converter'); }}>
            <div className="bg-primary text-primary-foreground p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <FileUp size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter">Doc<span className="text-primary">MD</span></span>
          </div>
          <div className="flex items-center gap-4"><ThemeToggle /></div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {!markdown && !isAnyProcessing && (
          <div className="space-y-32">
            <Hero onStart={scrollToConverter} />
            <Features />
            <HowItWorks />
          </div>
        )}

        <div ref={converterRef} className="flex flex-col lg:flex-row gap-12 items-start relative mt-16 scroll-mt-24">
          <aside className="w-full lg:w-80 space-y-8 shrink-0 lg:sticky lg:top-28 z-10">
            <ConversionSettings ocrLang={ocrLang} onOcrLangChange={setOcrLang} settings={settings} onSettingsChange={setSettings} />
            <div className="space-y-4">
              {hasCompletedFiles && (
                <Button onClick={handleBatchDownload} className="w-full gap-2 h-12 rounded-2xl font-bold shadow-lg shadow-primary/10" variant="secondary">
                  <Archive size={18} /> Baixar Tudo (ZIP)
                </Button>
              )}
              <ProcessingQueue queue={processingQueue} onClear={() => setProcessingQueue([])} onViewResult={(res, name) => { setMarkdown(res); setFileName(name.endsWith('.md') ? name : name + '.md'); scrollToConverter(); }} />
            </div>
          </aside>

          <main className="flex-1 w-full min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-muted/50 p-1.5 text-muted-foreground mb-10 border">
                <TabsTrigger value="converter" className="rounded-xl px-8 py-2.5 text-sm font-bold transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl gap-2"><FileUp size={18} /> Conversor</TabsTrigger>
                <TabsTrigger value="history" className="rounded-xl px-8 py-2.5 text-sm font-bold transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl gap-2"><History size={18} /> Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="converter" className="mt-0 focus-visible:outline-none">
                {!markdown && !isAnyProcessing ? (
                  <div className="animate-in zoom-in-95 duration-500"><FileDropzone onFilesSelect={handleFilesSelect} /></div>
                ) : (
                  <div className="space-y-8">
                    {isAnyProcessing && !markdown && (
                      <div className="p-32 text-center bg-card border-2 border-dashed rounded-[3rem] shadow-2xl animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-shimmer" />
                        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-8" />
                        <h3 className="text-2xl font-black mb-3">Extraindo Conhecimento...</h3>
                        <p className="text-muted-foreground text-lg">Nossa IA está lendo seus documentos agora mesmo.</p>
                      </div>
                    )}
                    {markdown && (
                      <MarkdownEditor 
                        content={markdown} 
                        fileName={fileName}
                        onFileNameChange={setFileName}
                        onChange={setMarkdown}
                        onDownload={() => downloadMarkdown(markdown, fileName)}
                        onClear={() => { setMarkdown(''); setFileName('documento.md'); }}
                      />
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-0 focus-visible:outline-none">
                <HistoryList items={history} onSelect={handleSelectFromHistory} onDelete={removeFromHistory} onClear={clearHistory} />
              </TabsContent>
            </Tabs>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;