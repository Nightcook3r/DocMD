export const generateTOC = (markdown: string): string => {
  const lines = markdown.split('\n');
  const toc: string[] = ['## Sumário\n'];
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      const indent = '  '.repeat(level - 1);
      toc.push(`${indent}- [${title}](#${slug})`);
    }
  });
  
  return toc.length > 1 ? toc.join('\n') + '\n\n' : '';
};

export const generateMarkdownTable = (rows: number, cols: number): string => {
  let table = '\n';
  // Header
  table += '| ' + Array(cols).fill('Coluna').join(' | ') + ' |\n';
  // Separator
  table += '| ' + Array(cols).fill('---').join(' | ') + ' |\n';
  // Body
  for (let i = 0; i < rows; i++) {
    table += '| ' + Array(cols).fill('Dado').join(' | ') + ' |\n';
  }
  return table + '\n';
};