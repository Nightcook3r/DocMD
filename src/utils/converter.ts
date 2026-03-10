import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

export const convertToMarkdown = (content: string, type: string): string => {
  if (type.includes('html')) {
    return turndownService.turndown(content);
  }
  // Se for texto simples ou código, apenas retorna o conteúdo (ou envolve em blocos de código se necessário)
  return content;
};

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace(/\.[^/.]+$/, "") + ".md";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};