import * as pdfjsLib from 'pdfjs-dist';

// Usando o carregamento de assets do Vite para o worker para garantir que ele seja empacotado corretamente
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true,
      isEvalSupported: false
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Extração de texto mais robusta verificando o tipo do item
      const pageText = textContent.items
        .map((item: any) => {
          if ('str' in item) return item.str;
          return '';
        })
        .join(' ');

      if (onProgress) {
        onProgress(Math.round((i / pdf.numPages) * 100));
      }

      fullText += pageText + '\n\n';
    }

    if (!fullText.trim()) {
      throw new Error("Não foi possível extrair texto deste PDF. Ele pode ser uma imagem ou estar protegido.");
    }

    return fullText.trim();
  } catch (error: any) {
    console.error("Erro no PDF Parser:", error);
    if (error.message?.includes('worker')) {
      throw new Error("Erro no motor de processamento. Por favor, recarregue a página.");
    }
    throw new Error(error.message || "Falha ao ler o arquivo PDF.");
  }
};