"use client";

import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft size={16} /> Voltar
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Termos de Uso</h1>
        </div>

        <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-foreground font-bold text-xl">1. Aceitação dos Termos</h2>
          <p>Ao acessar o site DocMD, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>

          <h2 className="text-foreground font-bold text-xl">2. Licença de Uso</h2>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais no site DocMD apenas para visualização transitória pessoal e não comercial.</p>

          <h2 className="text-foreground font-bold text-xl">3. Isenção de Responsabilidade</h2>
          <p>Os materiais no site do DocMD são fornecidos 'como estão'. O DocMD não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;