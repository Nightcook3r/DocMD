export const MARKDOWN_TEMPLATES = [
  {
    name: "README de Projeto",
    content: `# Nome do Projeto\n\nUma breve descrição do que este projeto faz.\n\n## 🚀 Instalação\n\n\`\`\`bash\nnpm install meu-projeto\n\`\`\`\n\n## 🛠️ Tecnologias\n\n- React\n- TypeScript\n- Tailwind CSS\n\n## 📄 Licença\n\nMIT`
  },
  {
    name: "Notas de Reunião",
    content: `# 📝 Notas de Reunião: [Assunto]\n\n**Data:** \${new Date().toLocaleDateString()}\n**Participantes:** \n\n## 🎯 Objetivos\n- [ ] Item 1\n- [ ] Item 2\n\n## 💬 Discussão\n- Ponto principal discutido.\n\n## ✅ Próximos Passos\n1. Ação para @pessoa`
  },
  {
    name: "Post de Blog",
    content: `---
title: Título do Post
date: \${new Date().toISOString()}
tags: [tecnologia, markdown]
---

# Título Principal

Introdução cativante aqui...

## Subtítulo

Conteúdo do seu post com **negrito** e *itálico*.

> Uma citação importante para destacar.`
  }
];