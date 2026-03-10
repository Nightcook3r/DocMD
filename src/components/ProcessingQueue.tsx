"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, Loader2, Trash2 } from 'lucide-react';

export interface ProcessingFile {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: string;
}

interface ProcessingQueueProps {
  queue: ProcessingFile[];
  onClear: () => void;
  onViewResult: (result: string, name: string) => void;
}

const ProcessingQueue = ({ queue, onClear, onViewResult }: ProcessingQueueProps) => {
  if (queue.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fila de Arquivos</span>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1" onClick={onClear}>
          <Trash2 size={10} /> Limpar
        </Button>
      </div>
      <div className="space-y-3 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
        {queue.map(file => (
          <div key={file.id} className="text-xs space-y-1.5 p-3 rounded-xl bg-muted/40 border transition-all hover:bg-muted/60">
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
                onClick={() => onViewResult(file.result || '', file.name)}
                className="text-[10px] text-primary hover:underline font-medium"
              >
                Visualizar no Editor
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingQueue;