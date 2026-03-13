"use client";

import React from 'react';
import { Mail, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft size={16} /> Voltar
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Mail size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Contacto</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Tem alguma dúvida, sugestão ou encontrou um problema? Estamos aqui para ajudar. Preencha o formulário ou utilize os nossos canais oficiais.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border">
                <Mail className="text-primary" size={20} />
                <span className="text-sm font-medium">suporte@docmd.app</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border">
                <MessageSquare className="text-primary" size={20} />
                <span className="text-sm font-medium">Chat de Suporte (Brevemente)</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-[2rem] bg-card border shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome</label>
              <Input placeholder="Seu nome" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <Input type="email" placeholder="seu@email.com" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mensagem</label>
              <Textarea placeholder="Como podemos ajudar?" className="min-h-[120px] rounded-xl" required />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl font-bold gap-2">
              Enviar Mensagem <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;