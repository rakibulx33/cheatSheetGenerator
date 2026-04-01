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

export const fonts = [
  'Inter', 
  'JetBrains Mono', 
  'Space Grotesk', 
  'Outfit', 
  'Poppins', 
  'Playfair Display', 
  'Fira Code', 
  'Fira Sans', 
  'Source Code Pro', 
  'Roboto Mono'
];

export interface Template {
  id: string;
  name: string;
  description: string;
  doc: CheatsheetDoc;
}

import { extendedTemplates } from './extendedTemplates';

export const cheatsheetTemplates: Template[] = [
  ...extendedTemplates,
];
