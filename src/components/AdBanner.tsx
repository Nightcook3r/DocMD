"use client";

import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdBanner = ({ slot, format = 'auto', className }: AdBannerProps) => {
  // Nota: Em produção, o AdSense preencherá este espaço automaticamente
  // se o script estiver no head e o 'auto-ads' estiver ativado.
  return (
    <div className={`w-full overflow-hidden my-8 flex justify-center ${className}`}>
      <div className="bg-muted/20 border-2 border-dashed rounded-2xl p-4 w-full max-w-4xl min-h-[100px] flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">
        Espaço Publicitário
      </div>
      {/* 
        Código real do AdSense para blocos manuais:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-1663588260511025"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
};

export default AdBanner;