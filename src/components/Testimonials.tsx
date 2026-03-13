"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ricardo Silva",
    role: "Desenvolvedor Fullstack",
    content: "O DocMD salvou horas do meu fluxo de trabalho. Converter documentação técnica de PDF para Markdown nunca foi tão fácil e preciso.",
    avatar: "RS"
  },
  {
    name: "Ana Oliveira",
    role: "Escritora Técnica",
    content: "A privacidade é fundamental para mim. Saber que meus arquivos são processados localmente me dá a confiança que preciso para trabalhar com dados sensíveis.",
    avatar: "AO"
  },
  {
    name: "Carlos Santos",
    role: "Estudante de Engenharia",
    content: "O OCR é impressionante. Consegui converter fotos dos meus apontamentos em texto editável instantaneamente. Recomendo vivamente!",
    avatar: "CS"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 border-t">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">O que dizem os nossos utilizadores</h2>
          <p className="text-muted-foreground text-lg">Junte-se a milhares de profissionais que já simplificaram o seu trabalho.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-card border-2 border-transparent hover:border-primary/10 hover:bg-muted/30 transition-all duration-500 space-y-6 shadow-sm">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-muted-foreground leading-relaxed italic">"{t.content}"</p>
              <div className="flex items-center gap-4 pt-4">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/5 text-primary font-bold">{t.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;