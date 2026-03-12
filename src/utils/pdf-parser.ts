import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

// Usando um CDN confiável e garantindo que a versão coincida
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      let pageText = textContent.items.map((item: any) => item.str).join(' ');

      // Se a página parecer vazia ou for um PDF escaneado, usamos OCR
      if (pageText.trim().length < 10) {
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          
          const { data: { text } } = await Tesseract.recognize(
            canvas.toDataURL('image/png'),
            'por+eng',
            { 
              logger: m => {
                if (m.status === 'recognizing text' && onProgress) {
                  const totalProgress = ((i - 1) / pdf.numPages) + (m.progress / pdf.numPages);
                  onProgress(Math.round(totalProgress * 100));
                }
              }
            }
          );
          pageText = text;
        }
      } else if (onProgress) {
        onProgress(Math.round((i / pdf.numPages) * 100));
      }

      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error("Erro detalhado no PDF Parser:", error);
    throw error;
  }
};