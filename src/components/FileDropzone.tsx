"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, FileType } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

const FileDropzone = ({ onFileSelect, className }: FileDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
      'text/plain': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: false
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ease-in-out",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className={cn(
            "p-4 rounded-full bg-primary/10 text-primary transition-transform duration-300",
            isDragActive && "scale-110"
          )}>
            <Upload size={32} />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold tracking-tight">
              {isDragActive ? "Solte o arquivo aqui" : "Arraste seu arquivo"}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Suporta HTML, PDF, Imagens (OCR) e arquivos de texto.
            </p>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>Formato não suportado. Use PDF, Imagens, HTML ou TXT.</span>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;