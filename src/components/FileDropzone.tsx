"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';
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
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer rounded-2xl border-2 border-dashed p-16 transition-all duration-300 ease-in-out",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className={cn(
            "p-5 rounded-full bg-primary/10 text-primary transition-transform duration-300",
            isDragActive && "scale-110"
          )}>
            <Upload size={40} />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold tracking-tight">
              {isDragActive ? "Solte os arquivos" : "Arraste seus arquivos"}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Selecione um ou vários arquivos (PDF, Imagens, HTML, TXT).
            </p>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>Alguns arquivos possuem formatos não suportados.</span>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;