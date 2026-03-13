"use client";

import React from 'react';
import { Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <section className="py-24 border-t">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">100% Gratuito. Para Sempre.</h2>
          <p className="text-muted-foreground text-lg">Acreditamos em ferramentas acessíveis. O DocMD é mantido através de anúncios discretos.</p>
        </div>

        <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-4 border-primary/10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black mb-2 flex items-center gap-2">
                  Plano Open <Heart className="text-red-500 fill-red-500" size={24} />
                </h3>
                <p className="text-muted-foreground">Acesso total a todas as funcionalidades sem pagar nada.</p>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Conversões Ilimitadas",
                  "OCR de Alta Precisão",
                  "Privacidade Total (Local)",
                  "Exportação em Lote (ZIP)",
                  "Sem Necessidade de Conta"
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
                <span className="text-muted-foreground font-bold">/mês</span>
              </div>
              <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                Começar a Converter
              </Button>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Suportado por Anúncios
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;