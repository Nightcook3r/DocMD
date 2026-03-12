"use client";

import React from 'react';
import { FileUp, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { MadeWithDyad } from './made-with-dyad';

const Footer = () => {
  return (
    <footer className="mt-32 border-t pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <FileUp size={20} />
            </div>
            <span className="font-black text-2xl tracking-tighter">DocMD</span>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            A ponte definitiva entre documentos estáticos e conteúdo dinâmico. 
            Transforme seu fluxo de trabalho com conversão inteligente e privada.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-widest">Produto</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Funcionalidades</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Como Funciona</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Modelos</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-widest">Suporte</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Documentação</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted-foreground font-medium">
          © {new Date().getFullYear()} DocMD. Todos os direitos reservados.
        </p>
        <MadeWithDyad />
      </div>
    </footer>
  );
};

export default Footer;