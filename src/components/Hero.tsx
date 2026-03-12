"use client";

import React from 'react';
import { Sparkles, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative text-center space-y-10 py-12 md:py-20 overflow-hidden">
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-1000">
        <Sparkles size={14} className="text-yellow-500" />
        <span>Inteligência Artificial de Ponta</span>
      </div>

      <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        Seus docs em <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-600 to-indigo-600">
          Markdown.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        A ponte perfeita entre documentos complexos e código limpo. Converta PDFs, imagens e HTML com precisão cirúrgica.
      </p>

      <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
        <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold gap-2 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
          Começar Agora <ArrowRight size={20} />
        </Button>
        <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg font-bold border-2 hover:bg-muted/50 transition-all">
          Ver Demonstração
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        {[
          { 
            icon: <Zap className="text-yellow-500" />, 
            title: "Velocidade Extrema", 
            desc: "Processamento local que respeita seu tempo.",
            color: "bg-yellow-500/5"
          },
          { 
            icon: <Shield className="text-green-500" />, 
            title: "Privacidade Total", 
            desc: "Seus dados nunca saem do seu navegador.",
            color: "bg-green-500/5"
          },
          { 
            icon: <Globe className="text-blue-500" />, 
            title: "Global & Versátil", 
            desc: "Suporte a centenas de idiomas via OCR.",
            color: "bg-blue-500/5"
          }
        ].map((feature, i) => (
          <div key={i} className="relative p-8 rounded-[2.5rem] bg-card border-2 border-transparent hover:border-primary/20 hover:bg-muted/30 transition-all duration-500 text-left group overflow-hidden">
            <div className={`mb-6 p-4 rounded-2xl ${feature.color} w-fit group-hover:scale-110 transition-transform duration-500`}>
              {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-xl font-black mb-2">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              {React.cloneElement(feature.icon as React.ReactElement, { size: 120 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;