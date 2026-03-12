"use client";

import React, { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess, showError } from '@/utils/toast';
import MarkdownPreview from './MarkdownPreview';
import MarkdownToolbar from './MarkdownToolbar';
import EditorHeader from './EditorHeader';
import EditorStats from './EditorStats';
import { cn } from '@/lib/utils';
import { getDocumentStats } from '@/utils/stats';
import { marked } from 'marked';
import { formatMarkdown, downloadHtml } from '@/utils/converter';
import { generateTOC, generateMarkdownTable } from '@/utils/toc';

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

  const handleInsertTOC = () => {
    const toc = generateTOC(content);
    if (!toc) {
      showError("Nenhum título encontrado para gerar o sumário.");
      return;
    }
    onChange(toc + content);
    showSuccess("Sumário gerado!");
  };

  const handleInsertTable = () => {
    const table = generateMarkdownTable(3, 3);
    handleAction(table, "");
  };

  const handleFormat = async () => {
    setIsFormatting(true);
    try {
      const formatted = await formatMarkdown(content);
      onChange(formatted);
      showSuccess("Markdown formatado!");
    } catch (e) {
      showError("Erro ao formatar.");
    } finally {
      setIsFormatting(false);
    }
  };

  const handleCopy = async (type: 'md' | 'html') => {
    let textToCopy = content;
    if (type === 'html') textToCopy = await marked.parse(content);
    await navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    showSuccess("Copiado!");
    setTimeout(() => setCopied(null), 2000);
  };

  const applyTemplate = (templateContent: string) => {
    const processed = templateContent.replace(/\${new Date\(\)\.toLocaleDateString\(\)}/g, new Date().toLocaleDateString())
                                   .replace(/\${new Date\(\)\.toISOString\(\)}/g, new Date().toISOString());
    onChange(processed);
    showSuccess("Modelo aplicado!");
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 print:m-0">
      <EditorHeader 
        fileName={fileName}
        onFileNameChange={onFileNameChange}
        view={view}
        onViewChange={setView}
        onApplyTemplate={applyTemplate}
        onFormat={handleFormat}
        isFormatting={isFormatting}
        onDownload={onDownload}
        onDownloadHtml={() => downloadHtml(content, fileName)}
        onPrint={() => window.print()}
        onCopy={handleCopy}
        copied={copied}
        onClear={onClear}
      />
      
      <div className={cn("grid gap-4 transition-all duration-500", view === "split" ? "lg:grid-cols-2" : "grid-cols-1", "print:block print:border-none")}>
        {(view === "edit" || view === "split") && (
          <div className="relative group flex flex-col border-2 rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden print:hidden">
            <MarkdownToolbar onAction={handleAction} onInsertTOC={handleInsertTOC} onInsertTable={handleInsertTable} />
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

      <EditorStats stats={stats} />
    </div>
  );
};

export default MarkdownEditor;