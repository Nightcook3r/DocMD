"use client";

import React from 'react';
import { 
  Cpu, 
  Zap, 
  Lock, 
  Languages, 
  FileJson, 
  Layout, 
  Smartphone, 
  Download 
} from 'lucide-react';

const features = [
  {
    icon: <Cpu className="text-blue-500" />,
    title: "Processamento Local",
    description: "Seus documentos nunca saem do seu navegador. Privacidade total garantida por processamento client-side."
  },
  {
    icon: <Zap className="text-yellow-500" />,
    title: "Conversão Instantânea",
    description: "Algoritmos otimizados para transformar PDFs complexos em Markdown limpo em segundos."
  },
  {
    icon: <Lock className="text-green-500" />,
    title: "Segurança de Dados",
    description: "Sem servidores intermediários. Seus dados sensíveis permanecem sob seu controle absoluto."
  },
  {
    icon: <Languages className="text-purple-500" />,
    title: "OCR Multilíngue",
    description: "Suporte a mais de 100 idiomas para extração de texto de imagens com alta precisão."
  },
  {
    icon: <FileJson className="text-orange-500" />,
    title: "Exportação Versátil",
    description: "Baixe seus arquivos em Markdown, HTML ou PDF. Suporte para download em lote via ZIP."
  },
  {
    icon: <Layout className="text-pink-500" />,
    title: "Editor Inteligente",
    description: "Interface de edição com preview em tempo real, ferramentas de formatação e modelos prontos."
  }
];

const Features = () => {
  return (
    <section className="py-24 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-black tracking-tight">Por que escolher o DocMD?</h2>
        <p className="text-muted-foreground text-lg">
          Combinamos o poder da inteligência artificial com a simplicidade do Markdown para oferecer a melhor experiência de conversão.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="group p-8 rounded-[2rem] bg-card border-2 border-transparent hover:border-primary/10 hover:bg-muted/30 transition-all duration-500"
          >
            <div className="mb-6 p-4 rounded-2xl bg-background border shadow-sm w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              {React.cloneElement(feature.icon as React.ReactElement, { size: 24 } as any)}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;