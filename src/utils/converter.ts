import TurndownService from 'turndown';
import JSZip from 'jszip';

export interface ConverterOptions {
  headingStyle?: 'atx' | 'setext';
  hr?: string;
  bullet?: '*' | '-' | '+';
  codeBlockStyle?: 'fenced' | 'indented';
  keepImages?: boolean;
}

export const convertToMarkdown = (content: string, type: string, options: ConverterOptions = {}): string => {
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

  return turndownService.turndown(content);
};

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.md') ? filename : `${filename.replace(/\.[^/.]+$/, "")}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadBatchAsZip = async (files: { name: string, content: string }[]) => {
  const zip = new JSZip();
  
  files.forEach(file => {
    const name = file.name.endsWith('.md') ? file.name : `${file.name.replace(/\.[^/.]+$/, "")}.md`;
    zip.file(name, file.content);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `docmd-export-${Date.now()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};