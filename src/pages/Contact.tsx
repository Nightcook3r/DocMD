"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { showError } from '@/utils/toast';

const Contact = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // NOTA: Substitua 'seu_id_aqui' pelo ID que o Formspree lhe fornecer
  const FORMSPREE_ID = "seu_id_aqui"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => navigate('/'), 3000);
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus('error');
      showError("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black">Mensagem Enviada!</h1>
          <p className="text-muted-foreground">
            Obrigado pelo seu contacto. Receberá uma resposta no seu email em breve.
          </p>
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-xl">
            Voltar para a Home
          </Button>
        </div>
      </div>
    );
  }

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
                <span className="text-sm font-medium">Resposta em até 24h</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-[2rem] bg-card border shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome</label>
              <Input name="name" placeholder="Seu nome" required className="rounded-xl" disabled={status === 'loading'} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <Input name="email" type="email" placeholder="seu@email.com" required className="rounded-xl" disabled={status === 'loading'} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mensagem</label>
              <Textarea name="message" placeholder="Como podemos ajudar?" className="min-h-[120px] rounded-xl" required disabled={status === 'loading'} />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl font-bold gap-2" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>Enviando... <Loader2 size={16} className="animate-spin" /></>
              ) : (
                <>Enviar Mensagem <Send size={16} /></>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;