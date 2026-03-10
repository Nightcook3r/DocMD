"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-6 bg-card border-2 rounded-md min-h-[400px] overflow-auto animate-in fade-in duration-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || "*Nenhum conteúdo para visualizar.*"}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;