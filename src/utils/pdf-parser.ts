import * as pdfjsLib from 'pdfjs-dist';

// Configuração do Worker usando uma versão fixa compatível com a instalada (5.5.207)
// Usamos a URL do CDN diretamente para evitar problemas de resolução de versão em tempo de execução
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.5.207/pdf.worker.min.mjs';

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
      
      // Extração de texto mais robusta
      const pageText = textContent.items
        .map((item: any) => item.str)
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
    throw new Error(error.message || "Falha ao ler o arquivo PDF.");
  }
};