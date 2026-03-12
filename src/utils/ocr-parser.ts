import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
    // Configuração explícita para garantir que o processamento ocorra corretamente
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
    throw new Error("Falha ao processar imagem (OCR). Certifique-se de que o arquivo é uma imagem válida.");
  }
};