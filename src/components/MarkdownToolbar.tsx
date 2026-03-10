"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, Link, List, ListOrdered, Quote, Code, 
  Heading1, Heading2, Image as ImageIcon, Strikethrough 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MarkdownToolbarProps {
  onAction: (prefix: string, suffix: string) => void;
}

const MarkdownToolbar = ({ onAction }: MarkdownToolbarProps) => {
  const tools = [
    { icon: <Heading1 size={16} />, label: "Título 1", prefix: "# ", suffix: "", shortcut: "H1" },
    { icon: <Heading2 size={16} />, label: "Título 2", prefix: "## ", suffix: "", shortcut: "H2" },
    { icon: <Bold size={16} />, label: "Negrito", prefix: "**", suffix: "**", shortcut: "Ctrl+B" },
    { icon: <Italic size={16} />, label: "Itálico", prefix: "_", suffix: "_", shortcut: "Ctrl+I" },
    { icon: <Strikethrough size={16} />, label: "Tachado", prefix: "~~", suffix: "~~", shortcut: "" },
    { icon: <Quote size={16} />, label: "Citação", prefix: "> ", suffix: "", shortcut: "" },
    { icon: <Code size={16} />, label: "Código", prefix: "`", suffix: "`", shortcut: "Ctrl+E" },
    { icon: <Link size={16} />, label: "Link", prefix: "[", suffix: "](url)", shortcut: "Ctrl+K" },
    { icon: <List size={16} />, label: "Lista", prefix: "- ", suffix: "", shortcut: "" },
    { icon: <ListOrdered size={16} />, label: "Lista Numerada", prefix: "1. ", suffix: "", shortcut: "" },
    { icon: <ImageIcon size={16} />, label: "Imagem", prefix: "![alt](", suffix: ")", shortcut: "" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-1.5 bg-muted/30 border-b">
      {tools.map((tool, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-background hover:shadow-sm transition-all"
              onClick={() => onAction(tool.prefix, tool.suffix)}
            >
              {tool.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-wider">
            {tool.label} {tool.shortcut && <span className="ml-2 opacity-50">{tool.shortcut}</span>}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default MarkdownToolbar;