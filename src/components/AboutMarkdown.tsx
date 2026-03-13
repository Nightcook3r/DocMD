"use client";

import React from 'react';
import { Info, BookOpen, Code2 } from 'lucide-react';

const AboutMarkdown = () => {
  return (
    <section className="py-24 border-t">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black">O que é Markdown e por que converter?</h2>
          <p className="text-muted-foreground">Entenda a importância de transformar os seus documentos em código limpo.</p>
        </div>

        <div className="grid gap-8">
          <div className="flex gap-6 p-8 rounded-3xl bg-muted/30 border">
            <div className="shrink-0 p-4 rounded-2xl bg-background border h-fit">
              <BookOpen className="text-primary" size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Simplicidade e Portabilidade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Markdown é uma linguagem de marcação leve que permite formatar texto usando sintaxe simples. Ao converter PDFs e imagens para Markdown, você garante que o seu conteúdo possa ser lido em qualquer editor de texto, versionado no Git e facilmente convertido para HTML ou PDF novamente.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-8 rounded-3xl bg-muted/30 border">
            <div className="shrink-0 p-4 rounded-2xl bg-background border h-fit">
              <Code2 className="text-primary" size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Foco no Conteúdo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Diferente de editores visuais complexos, o Markdown permite que você se concentre na escrita. A nossa ferramenta utiliza OCR (Reconhecimento Óptico de Caracteres) avançado para extrair texto de imagens e PDFs, mantendo a estrutura de títulos, listas e tabelas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMarkdown;