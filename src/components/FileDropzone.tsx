"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image as ImageIcon, Code, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFilesSelect: (files: File[]) => void;
  className?: string;
}

const FileDropzone = ({ onFilesSelect, className }: FileDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) onFilesSelect(acceptedFiles);
  }, [onFilesSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
      'text/plain': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true
  });

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer rounded-[3rem] border-4 border-dashed p-12 md:p-24 transition-all duration-500 ease-out overflow-hidden",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[1.02] shadow-2xl shadow-primary/10" 
            : "border-muted-foreground/10 hover:border-primary/30 hover:bg-muted/30 hover:shadow-xl"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col items-center justify-center space-y-8 text-center">
          <div className="flex -space-x-4 mb-2">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500 rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500 shadow-lg">
              <FileText size={32} />
            </div>
            <div className="p-5 rounded-2xl bg-primary text-primary-foreground z-10 scale-110 shadow-2xl shadow-primary/40">
              <Upload size={40} />
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 rotate-[12deg] group-hover:rotate-0 transition-transform duration-500 shadow-lg">
              <ImageIcon size={32} />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              {isDragActive ? "Solte para converter" : "Arraste seus arquivos"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto font-medium">
              PDFs, Imagens, HTML ou Texto. <br />
              <span className="text-primary/60 text-sm">Tudo é processado localmente no seu navegador.</span>
            </p>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              <Code size={14} /> HTML
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              <FileText size={14} /> PDF
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              <ImageIcon size={14} /> OCR
            </div>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <span>Alguns arquivos possuem formatos não suportados. Tente PDF, Imagens ou HTML.</span>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;