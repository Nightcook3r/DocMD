export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const getDocumentStats = (text: string) => {
  const characters = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const lines = text.split('\n').length;
  const readingTime = calculateReadingTime(text);
  
  return { characters, words, lines, readingTime };
};