MD funcione.">
import TurndownService from 'turndown';
import JSZip from 'jszip';
import * as prettier from "prettier/standalone";
import * as markdownPlugin from "prettier/plugins/markdown";
import { marked } from 'marked';

export interface ConverterOptions {
  headingStyle?: 'atx' | 'setext';
  hr?: string;
  bullet?: '*' | '-' | '+';
  codeBlockStyle?: 'fenced' | 'indented';
  keepImages?: boolean;
}

export const convertToMarkdown = (content: string, type: string, options: ConverterOptions = {}): string => {
  // Se o conteúdo já for texto puro ou markdown, apenas retornamos (ou limpamos)
  if (type === 'text/markdown' || type === 'text/plain') {
    return content;
  }

  try {
    const turndownOptions: any = {
      headingStyle: options.headingStyle || 'atx',
      codeBlockStyle: options.codeBlockStyle || 'fenced',
      hr: options.hr || '---',
      bullet: options.bullet || '*',
    };

    // Garantindo que o TurndownService seja instanciado corretamente
    // Em alguns builds, ele pode vir como .default
    const Service = (TurndownService as any).default || TurndownService;
    const turndownService = new Service(turndownOptions);

    if (!options.keepImages) {
      turndownService.remove('img');
    }

    return turndownService.turndown(content);
  } catch (e) {
    console.error("Erro na conversão Turndown:", e);
    return content; // Fallback para o texto original se a conversão falhar
  }
};

export const formatMarkdown = async (content: string): Promise<string> => {
  try {
    return await prettier.format(content, {
      parser: "markdown",
      plugins: [markdownPlugin],
      printWidth: 80,
      proseWrap: "always",
    });
  } catch (e) {
    console.error("Erro ao formatar Markdown", e);
    return content;
  }
};

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  saveBlob(blob, filename.endsWith('.md') ? filename : `${filename.replace(/\.[^/.]+$/, "")}.md`);
};

export const downloadHtml = async (content: string, filename: string) => {
  const htmlContent = await marked.parse(content);
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; color: #333; }
          img { max-width: 100%; }
          pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
          code { font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        </style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `;
  const blob = new Blob([fullHtml], { type: 'text/html' });
  saveBlob(blob, filename.replace(/\.[^/.]+$/, "") + ".html");
};

const saveBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
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
  saveBlob(content, `docmd-export-${Date.now()}.zip`);
};