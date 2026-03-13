"use client";

import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft size={16} /> Voltar
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Política de Privacidade</h1>
        </div>

        <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>A sua privacidade é importante para nós. É política do DocMD respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site DocMD.</p>
          
          <h2 className="text-foreground font-bold text-xl">1. Processamento Local</h2>
          <p>O DocMD é uma ferramenta de processamento local. Isso significa que os seus ficheiros (PDFs, Imagens, HTML) são processados diretamente no seu navegador. Não fazemos upload dos seus documentos para os nossos servidores.</p>

          <h2 className="text-foreground font-bold text-xl">2. Cookies e Publicidade</h2>
          <p>Utilizamos o Google AdSense para exibir anúncios. O Google utiliza cookies para exibir anúncios com base em visitas anteriores ao nosso site ou a outros sites na internet.</p>

          <h2 className="text-foreground font-bold text-xl">3. Segurança</h2>
          <p>Embora não armazenemos os seus dados pessoais, tomamos todas as medidas necessárias para garantir que a sua experiência de navegação seja segura e protegida.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;