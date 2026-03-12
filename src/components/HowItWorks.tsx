"use client";

import React from 'react';
import { MousePointer2, FileCode2, DownloadCloud } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black">Como funciona?</h2>
        <p className="text-muted-foreground">Três passos simples para a perfeição.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <MousePointer2 size={32} />, title: "1. Upload", desc: "Arraste seus arquivos PDF, imagens ou HTML para a zona de drop." },
          { icon: <FileCode2 size={32} />, title: "2. Conversão", desc: "Nossa IA extrai o texto e formata automaticamente para Markdown." },
          { icon: <DownloadCloud size={32} />, title: "3. Exportação", desc: "Edite se necessário e baixe em .md, .html ou PDF." }
        ].map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center space-y-4">
            <div className="p-6 rounded-full bg-primary/5 text-primary border border-primary/10 shadow-inner">{step.icon}</div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            {i < 2 && <div className="hidden md:block absolute top-1/4 -right-6 text-muted-foreground/20">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;