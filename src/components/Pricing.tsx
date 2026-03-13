"use client";

import React from 'react';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <section className="py-24 border-t">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Simples e Transparente</h2>
          <p className="text-muted-foreground text-lg">Sem subscrições, sem taxas ocultas. Apenas produtividade.</p>
        </div>

        <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-4 border-primary/10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={120} className="text-primary" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black mb-2">Plano Grátis</h3>
                <p className="text-muted-foreground">Tudo o que precisa para converter os seus documentos.</p>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Conversões Ilimitadas",
                  "OCR de Alta Precisão",
                  "Processamento 100% Local",
                  "Exportação MD, HTML e PDF",
                  "Sem Necessidade de Registo"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                      <Check size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center space-y-6 p-8 rounded-[2rem] bg-background border-2 shadow-xl">
              <div className="space-y-1">
                <span className="text-5xl font-black">0€</span>
                <span className="text-muted-foreground font-bold">/sempre</span>
              </div>
              <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                Começar Agora
              </Button>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Código Aberto & Gratuito
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;