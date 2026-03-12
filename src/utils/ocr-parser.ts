import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
    // Usando a versão mais simples da API que gerencia o worker internamente
    const result = await Tesseract.recognize(
      file,
      'por+eng',
      {
        logger: m => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(Math.round(m.progress * 100));
          }
        }
      }
    );
    
    if (!result.data || !result.data.text) {
      throw new Error("Nenhum texto detectado na imagem.");
    }
    
    return result.data.text;
  } catch (error: any) {
    console.error("Erro no OCR Parser:", error);
    throw new Error("Falha ao processar imagem (OCR). Verifique sua conexão.");
  }
};