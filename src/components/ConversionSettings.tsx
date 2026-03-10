"use client";

import React from 'react';
import { Settings2, Languages, FileType } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface MarkdownSettings {
  headingStyle: 'atx' | 'setext';
  hr: string;
  bullet: '*' | '-' | '+';
  codeBlockStyle: 'fenced' | 'indented';
  keepImages: boolean;
}

interface ConversionSettingsProps {
  ocrLang: string;
  onOcrLangChange: (val: string) => void;
  settings: MarkdownSettings;
  onSettingsChange: (settings: MarkdownSettings) => void;
}

const ConversionSettings = ({ ocrLang, onOcrLangChange, settings, onSettingsChange }: ConversionSettingsProps) => {
  return (
    <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Languages size={16} className="text-primary" />
          Configurações OCR
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Idioma Principal</Label>
          <Select value={ocrLang} onValueChange={onOcrLangChange}>
            <SelectTrigger className="w-full bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="por+eng">Português + Inglês</SelectItem>
              <SelectItem value="por">Português</SelectItem>
              <SelectItem value="eng">Inglês</SelectItem>
              <SelectItem value="spa">Espanhol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <FileType size={16} className="text-primary" />
          Estilo Markdown
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="keep-images" className="text-xs cursor-pointer">Preservar Imagens</Label>
            <Switch 
              id="keep-images" 
              checked={settings.keepImages} 
              onCheckedChange={(val) => onSettingsChange({ ...settings, keepImages: val })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Estilo de Títulos</Label>
            <Select 
              value={settings.headingStyle} 
              onValueChange={(val: any) => onSettingsChange({ ...settings, headingStyle: val })}
            >
              <SelectTrigger className="w-full h-8 text-xs bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="atx">ATX (# Título)</SelectItem>
                <SelectItem value="setext">Setext (Título ===)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Marcador de Lista</Label>
            <Select 
              value={settings.bullet} 
              onValueChange={(val: any) => onSettingsChange({ ...settings, bullet: val })}
            >
              <SelectTrigger className="w-full h-8 text-xs bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">Asterisco (*)</SelectItem>
                <SelectItem value="-">Hífen (-)</SelectItem>
                <SelectItem value="+">Mais (+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionSettings;