"use client";

import React from 'react';
import { Sparkles, Zap, Shield, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <div className="text-center space-y-8 animate-in fade-in slide-in-from-top-8 duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
        <Sparkles size={14} className="animate-pulse" />
        <span>Inteligência Artificial Integrada</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-black tracking-tight text-foreground leading-[0.9]">
        Documentos para <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
          Markdown Puro.
        </span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        A ferramenta definitiva para desenvolvedores e escritores. Converta PDFs complexos, imagens e HTML em Markdown limpo em segundos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
        {[
          { icon: <Zap className="text-yellow-500" />, title: "Ultra Rápido", desc: "Processamento local instantâneo." },
          { icon: <Shield className="text-green-500" />, title: "Privacidade", desc: "Seus arquivos nunca saem do navegador." },
          { icon: <Globe className="text-blue-500" />, title: "Multi-idioma", desc: "OCR avançado para +100 línguas." }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-3xl bg-card border hover:border-primary/50 transition-all duration-300 text-left group">
            <div className="mb-4 p-3 rounded-2xl bg-muted w-fit group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="font-bold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;