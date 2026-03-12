import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
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
    
    return result.data.text;
  } catch (error) {
    console.error("Erro no OCR Parser:", error);
    throw error;
  }
};