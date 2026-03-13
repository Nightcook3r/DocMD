"use client";

import React from 'react';
import { Book, Code, List, Type, Quote, Link as LinkIcon } from 'lucide-react';

const MarkdownGuide = () => {
  const sections = [
    {
      icon: <Type size={20} />,
      title: "Títulos",
      desc: "Use # para títulos. Quanto mais #, menor o título.",
      example: "# Título 1\n## Título 2\n### Título 3"
    },
    {
      icon: <Code size={20} />,
      title: "Código",
      desc: "Use crases para código em linha ou blocos.",
      example: "`código simples` ou \n```js\nconsole.log('Olá');\n```"
    },
    {
      icon: <List size={20} />,
      title: "Listas",
      desc: "Use - ou * para listas não ordenadas.",
      example: "- Item A\n- Item B\n  - Sub-item"
    },
    {
      icon: <Quote size={20} />,
      title: "Citações",
      desc: "Use > para destacar citações ou blocos de texto.",
      example: "> Este é um bloco de citação importante."
    }
  ];

  return (
    <section className="py-24 border-t">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black">Guia Rápido de Markdown</h2>
          <p className="text-muted-foreground">Aprenda a formatar os seus documentos como um profissional.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-muted/20 border hover:bg-muted/30 transition-colors space-y-4">
              <div className="flex items-center gap-3 font-bold">
                <div className="p-2 rounded-xl bg-background border text-primary">{s.icon}</div>
                {s.title}
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <pre className="p-4 rounded-xl bg-background/50 border text-xs font-mono overflow-x-auto">
                {s.example}
              </pre>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 text-center space-y-4">
          <h3 className="text-xl font-bold">Por que usar Markdown?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Markdown é o padrão da indústria para documentação técnica. É leve, fácil de ler e pode ser convertido para quase qualquer formato. Com o DocMD, você traz a clareza do Markdown para os seus PDFs e imagens legadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarkdownGuide;