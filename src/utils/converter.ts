import TurndownService from 'turndown';

export interface ConverterOptions {
  headingStyle?: 'atx' | 'setext';
  hr?: string;
  bullet?: '*' | '-' | '+';
  codeBlockStyle?: 'fenced' | 'indented';
  keepImages?: boolean;
}

export const convertToMarkdown = (content: string, type: string, options: ConverterOptions = {}): string => {
  // Usamos 'as any' para evitar erro de tipagem se a definição do Turndown estiver incompleta
  const turndownOptions: any = {
    headingStyle: options.headingStyle || 'atx',
    codeBlockStyle: options.codeBlockStyle || 'fenced',
    hr: options.hr || '---',
    bullet: options.bullet || '*',
  };

  const turndownService = new TurndownService(turndownOptions);

  if (!options.keepImages) {
    turndownService.remove('img');
  }

  if (type.includes('html')) {
    return turndownService.turndown(content);
  }
  
  return turndownService.turndown(content);
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