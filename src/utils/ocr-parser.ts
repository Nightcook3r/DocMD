import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  const result = await Tesseract.recognize(
    file,
    'por+eng', // Suporte a Português e Inglês
    {
      logger: m => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      }
    }
  );
  
  return result.data.text;
};