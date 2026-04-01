export type BlockType = 'heading' | 'text' | 'code' | 'image' | 'table' | 'divider' | 'spacer' | 'list';

export interface BlockBase {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

export interface HeadingBlock extends BlockBase {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3;
  align: 'left' | 'center' | 'right';
  color: string;
}

export interface TextBlock extends BlockBase {
  type: 'text';
  content: string;
  align: 'left' | 'center' | 'right';
  color: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
}

export interface CodeBlock extends BlockBase {
  type: 'code';
  code: string;
  language: string;
  label: string;
  bgColor: string;
  textColor: string;
  showLabel: boolean;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  src: string;
  alt: string;
  align: 'left' | 'center' | 'right';
  borderRadius: number;
}

export interface TableBlock extends BlockBase {
  type: 'table';
  rows: string[][];
  headerBg: string;
  headerText: string;
  cellBg: string;
  cellText: string;
  borderColor: string;
}

export interface DividerBlock extends BlockBase {
  type: 'divider';
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
  thickness: number;
}

export interface SpacerBlock extends BlockBase {
  type: 'spacer';
}

export interface ListBlock extends BlockBase {
  type: 'list';
  items: string[];
  ordered: boolean;
  color: string;
  fontSize: number;
}

export type Block = HeadingBlock | TextBlock | CodeBlock | ImageBlock | TableBlock | DividerBlock | SpacerBlock | ListBlock;

export interface CheatsheetDoc {
  title: string;
  bgColor: string;
  font: string;
  blocks: Block[];
  totalPages: number;
}

const id = () => Math.random().toString(36).substring(2, 9);

export function createBlock(type: BlockType): Block {
  const base = { id: id(), type, x: 50, y: 50, width: 350, height: 'auto' };
  switch (type) {
    case 'heading':
      return { ...base, type: 'heading', content: 'Section Title', level: 2, align: 'left', color: '#5eead4' };
    case 'text':
      return { ...base, type: 'text', content: 'Enter your text here...', align: 'left', color: '#cbd5e1', fontSize: 14, bold: false, italic: false };
    case 'code':
      return { ...base, type: 'code', code: '// your code here', language: 'javascript', label: 'Example', bgColor: '#131a2b', textColor: '#e2e8f0', showLabel: true };
    case 'image':
      return { ...base, type: 'image', src: '', alt: 'Image', align: 'center', borderRadius: 8 };
    case 'table':
      return { ...base, width: 500, type: 'table', rows: [['Header 1', 'Header 2', 'Header 3'], ['Cell 1', 'Cell 2', 'Cell 3'], ['Cell 4', 'Cell 5', 'Cell 6']], headerBg: '#1a9f6e', headerText: '#ffffff', cellBg: '#1c2333', cellText: '#e2e8f0', borderColor: '#2d3748' };
    case 'divider':
      return { ...base, height: 20, type: 'divider', style: 'solid', color: '#334155', thickness: 1 };
    case 'spacer':
      return { ...base, height: 50, type: 'spacer' };
    case 'list':
      return { ...base, type: 'list', items: ['Item 1', 'Item 2', 'Item 3'], ordered: false, color: '#cbd5e1', fontSize: 13 };
  }
}

export const fonts = ['Inter', 'JetBrains Mono', 'Space Grotesk', 'Fira Code', 'Source Code Pro', 'Roboto Mono'];

export interface Template {
  id: string;
  name: string;
  description: string;
  doc: CheatsheetDoc;
}

export const cheatsheetTemplates: Template[] = [
  {
    id: 'html-modern',
    name: 'HTML5 — Modern',
    description: 'Clean modern HTML5 cheatsheet with gradient header',
    doc: {
      title: 'HTML5 Cheatsheet',
      bgColor: '#0f172a',
      font: 'Inter',
      totalPages: 1,
      blocks: [
        { id: id(), type: 'heading', content: 'HTML5 Quick Reference', level: 1, align: 'center', color: '#5eead4', x: 200, y: 50, width: 400, height: 'auto' },
        { id: id(), type: 'text', content: 'Essential HTML tags and attributes for modern web development', align: 'center', color: '#94a3b8', fontSize: 14, bold: false, italic: true, x: 200, y: 110, width: 400, height: 'auto' },
        { id: id(), type: 'divider', style: 'solid', color: '#1a9f6e', thickness: 2, x: 50, y: 160, width: 700, height: 20 },
        { id: id(), type: 'heading', content: 'Document Structure', level: 2, align: 'left', color: '#5eead4', x: 50, y: 200, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- content -->\n</body>\n</html>', language: 'html', label: 'Basic Template', bgColor: '#131a2b', textColor: '#e2e8f0', showLabel: true, x: 50, y: 250, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Semantic Elements', level: 2, align: 'left', color: '#5eead4', x: 420, y: 200, width: 330, height: 'auto' },
        { id: id(), type: 'table', rows: [['Tag', 'Purpose'], ['<header>', 'Page/section header'], ['<nav>', 'Navigation links'], ['<main>', 'Main content area'], ['<article>', 'Self-contained content'], ['<section>', 'Thematic grouping'], ['<footer>', 'Page/section footer']], headerBg: '#1a9f6e', headerText: '#ffffff', cellBg: '#1c2333', cellText: '#e2e8f0', borderColor: '#2d3748', x: 420, y: 250, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Forms', level: 2, align: 'left', color: '#5eead4', x: 50, y: 530, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: '<form action="/submit" method="POST">\n  <input type="text" name="user" required>\n  <input type="email" name="email">\n  <select name="role">\n    <option>Admin</option>\n  </select>\n  <button type="submit">Send</button>\n</form>', language: 'html', label: 'Form Example', bgColor: '#131a2b', textColor: '#e2e8f0', showLabel: true, x: 50, y: 580, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Media Tags', level: 2, align: 'left', color: '#5eead4', x: 420, y: 530, width: 330, height: 'auto' },
        { id: id(), type: 'list', items: ['<img src="" alt=""> — Embed image', '<video src="" controls> — Embed video', '<audio src="" controls> — Embed audio', '<canvas> — 2D drawing surface', '<svg> — Scalable vector graphics'], ordered: false, color: '#cbd5e1', fontSize: 13, x: 420, y: 580, width: 330, height: 'auto' },
      ],
    },
  },
  {
    id: 'css-terminal',
    name: 'CSS3 — Terminal',
    description: 'Dark terminal-style CSS reference',
    doc: {
      title: 'CSS3 Cheatsheet',
      bgColor: '#0a0a0a',
      font: 'JetBrains Mono',
      totalPages: 1,
      blocks: [
        { id: id(), type: 'heading', content: '$ css3 --cheatsheet', level: 1, align: 'left', color: '#22c55e', x: 50, y: 50, width: 700, height: 'auto' },
        { id: id(), type: 'divider', style: 'dashed', color: '#22c55e', thickness: 1, x: 50, y: 100, width: 700, height: 20 },
        { id: id(), type: 'heading', content: 'Selectors', level: 2, align: 'left', color: '#4ade80', x: 50, y: 140, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: 'element { }       /* Type selector */\n.class { }        /* Class selector */\n#id { }           /* ID selector */\ndiv > p { }       /* Direct child */\na:hover { }       /* Pseudo-class */\n::before { }      /* Pseudo-element */', language: 'css', label: 'selectors.css', bgColor: '#111111', textColor: '#22c55e', showLabel: true, x: 50, y: 190, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Flexbox', level: 2, align: 'left', color: '#4ade80', x: 420, y: 140, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: 'display: flex;\nflex-direction: row | column;\njustify-content: center | space-between;\nalign-items: center | stretch;\nflex-wrap: wrap;\ngap: 16px;', language: 'css', label: 'flexbox.css', bgColor: '#111111', textColor: '#22c55e', showLabel: true, x: 420, y: 190, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Grid', level: 2, align: 'left', color: '#4ade80', x: 50, y: 450, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngrid-gap: 1rem;\ngrid-column: span 2;', language: 'css', label: 'grid.css', bgColor: '#111111', textColor: '#22c55e', showLabel: true, x: 50, y: 500, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Box Model', level: 2, align: 'left', color: '#4ade80', x: 420, y: 450, width: 330, height: 'auto' },
        { id: id(), type: 'table', rows: [['Property', 'Example'], ['margin', '10px auto'], ['padding', '16px 24px'], ['border', '1px solid #333'], ['box-sizing', 'border-box']], headerBg: '#22c55e', headerText: '#000000', cellBg: '#111111', cellText: '#22c55e', borderColor: '#1a3a1a', x: 420, y: 500, width: 330, height: 'auto' },
      ],
    },
  },
  {
    id: 'mysql-minimal',
    name: 'MySQL — Minimal',
    description: 'Clean minimal MySQL reference',
    doc: {
      title: 'MySQL Cheatsheet',
      bgColor: '#fafaf9',
      font: 'Space Grotesk',
      totalPages: 1,
      blocks: [
        { id: id(), type: 'heading', content: 'MySQL Quick Reference', level: 1, align: 'left', color: '#1c1917', x: 50, y: 50, width: 330, height: 'auto' },
        { id: id(), type: 'text', content: 'Essential SQL commands for database management', align: 'left', color: '#57534e', fontSize: 14, bold: false, italic: false, x: 50, y: 110, width: 330, height: 'auto' },
        { id: id(), type: 'divider', style: 'solid', color: '#d6d3d1', thickness: 1, x: 50, y: 160, width: 700, height: 20 },
        { id: id(), type: 'heading', content: 'Database & Tables', level: 2, align: 'left', color: '#1c1917', x: 50, y: 200, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: 'CREATE DATABASE mydb;\nUSE mydb;\nCREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE\n);', language: 'sql', label: 'DDL', bgColor: '#f5f5f4', textColor: '#1c1917', showLabel: true, x: 50, y: 250, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'CRUD Operations', level: 2, align: 'left', color: '#1c1917', x: 420, y: 200, width: 330, height: 'auto' },
        { id: id(), type: 'table', rows: [['Operation', 'Syntax'], ['INSERT', "INSERT INTO t (col) VALUES ('val')"], ['SELECT', 'SELECT * FROM t WHERE id = 1'], ['UPDATE', "UPDATE t SET col='val' WHERE id=1"], ['DELETE', 'DELETE FROM t WHERE id = 1']], headerBg: '#1c1917', headerText: '#fafaf9', cellBg: '#f5f5f4', cellText: '#1c1917', borderColor: '#d6d3d1', x: 420, y: 250, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Joins', level: 2, align: 'left', color: '#1c1917', x: 50, y: 530, width: 330, height: 'auto' },
        { id: id(), type: 'code', code: 'SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.total > 100\nORDER BY o.total DESC;', language: 'sql', label: 'Join Example', bgColor: '#f5f5f4', textColor: '#1c1917', showLabel: true, x: 50, y: 580, width: 330, height: 'auto' },
        { id: id(), type: 'heading', content: 'Aggregates', level: 2, align: 'left', color: '#1c1917', x: 420, y: 530, width: 330, height: 'auto' },
        { id: id(), type: 'list', items: ['COUNT(*) — Count rows', 'SUM(col) — Sum values', 'AVG(col) — Average', 'GROUP BY col — Group results', 'HAVING condition — Filter groups'], ordered: false, color: '#44403c', fontSize: 13, x: 420, y: 580, width: 330, height: 'auto' },
      ],
    },
  },
];
