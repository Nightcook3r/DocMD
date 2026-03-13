"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como converter PDF para Markdown gratuitamente?",
    answer: "O DocMD permite converter ficheiros PDF para Markdown de forma totalmente gratuita e privada. Basta arrastar o seu ficheiro para a zona de upload e o nosso algoritmo extrairá o texto e a formatação automaticamente."
  },
  {
    question: "O DocMD é seguro para documentos sensíveis?",
    answer: "Sim. Todo o processamento é feito localmente no seu navegador (client-side). Os seus documentos nunca são enviados para os nossos servidores, garantindo 100% de privacidade."
  },
  {
    question: "O que é OCR e como funciona nesta ferramenta?",
    answer: "OCR (Reconhecimento Óptico de Caracteres) é uma tecnologia que identifica texto dentro de imagens. O DocMD utiliza OCR avançado para permitir que você converta fotos de documentos ou PDFs digitalizados em texto Markdown editável."
  },
  {
    question: "Posso exportar o Markdown para outros formatos?",
    answer: "Sim, além do formato .md, você pode exportar o seu conteúdo para HTML ou imprimir diretamente como PDF através do nosso editor inteligente."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 border-t">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black">Perguntas Frequentes</h2>
          <p className="text-muted-foreground">Tudo o que você precisa saber sobre o DocMD.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-0 mb-4 bg-muted/30 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-left py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;