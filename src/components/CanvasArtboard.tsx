import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Rnd } from 'react-rnd';
import type { Block, CheatsheetDoc } from '@/data/cheatsheetData';

interface Props {
  doc: CheatsheetDoc;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
}

const CanvasArtboard = forwardRef<HTMLDivElement, Props>(
  ({ doc, selectedBlockId, onSelectBlock, onUpdateBlock }, ref) => {
    const { setNodeRef } = useDroppable({
      id: 'canvas-droppable',
    });

    const setRefs = (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as any).current = node;
    };
    
    // A4 Portrait dimensions at 96 DPI (standard web)
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;
    const pages = doc.totalPages || 1;
  
    const canvasStyle: React.CSSProperties = {
      background: doc.bgColor,
      fontFamily: doc.font,
      position: 'relative',
      margin: '0 auto',
      width: A4_WIDTH,
      height: A4_HEIGHT * pages,
      boxShadow: '0 10px 40px -10px rgba(0,0,0,0.25)',
      border: '1px solid hsl(var(--border))',
      overflow: 'hidden',
    };

    return (
      <div
        ref={setRefs}
        style={canvasStyle}
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as Element).classList.contains('page-divider')) onSelectBlock(null);
        }}
        className="canvas-artboard bg-white"
      >
        {Array.from({ length: pages }).map((_, i) => (
          i > 0 && (
            <div 
              key={`page-${i}`} 
              className="page-divider w-full absolute border-t-2 border-dashed border-red-500/30 z-[5]" 
              style={{ top: i * A4_HEIGHT, cursor: 'pointer' }}
              onClick={() => onSelectBlock(null)}
            />
          )
        ))}
        {doc.blocks.map((block) => {
          const isSelected = selectedBlockId === block.id;

          // Parse width/height ensuring fallback
          const w = block.width === 'auto' ? undefined : block.width;
          const h = block.height === 'auto' ? undefined : block.height;

          return (
            <Rnd
              key={block.id}
              size={{ width: w as any, height: h as any }}
              position={{ x: block.x, y: block.y }}
              onDragStart={() => onSelectBlock(block.id)}
              onDragStop={(e, d) => {
                onUpdateBlock(block.id, { x: Math.round(d.x), y: Math.round(d.y) });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                onUpdateBlock(block.id, {
                  width: ref.style.width,
                  height: ref.style.height,
                  x: Math.round(position.x),
                  y: Math.round(position.y),
                });
              }}
              bounds="parent" // Keeps it inside the canvas. Remove this if you want items to bleed off edge
              disableDragging={!isSelected}
              enableResizing={isSelected}
              resizeHandleStyles={{
                bottomRight: { width: 14, height: 14, background: '#0ea5e9', border: '2px solid white', borderRadius: '50%', right: -7, bottom: -7 },
                bottomLeft: { width: 14, height: 14, background: '#0ea5e9', border: '2px solid white', borderRadius: '50%', left: -7, bottom: -7 },
                topRight: { width: 14, height: 14, background: '#0ea5e9', border: '2px solid white', borderRadius: '50%', right: -7, top: -7 },
                topLeft: { width: 14, height: 14, background: '#0ea5e9', border: '2px solid white', borderRadius: '50%', left: -7, top: -7 },
                right: { width: 8, right: -4, background: 'transparent' },
                left: { width: 8, left: -4, background: 'transparent' },
                top: { height: 8, top: -4, background: 'transparent' },
                bottom: { height: 8, bottom: -4, background: 'transparent' }
              }}
              style={{
                boxShadow: isSelected ? '0 0 0 2px #0ea5e9' : 'none',
                zIndex: isSelected ? 50 : 1, // Bring selected block to front
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectBlock(block.id);
              }}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <BlockRenderer block={block} onUpdate={(u) => onUpdateBlock(block.id, u)} isSelected={isSelected} font={doc.font} />
              </div>
            </Rnd>
          );
        })}
      </div>
    );
  }
);

interface BlockRendererProps {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
  isSelected: boolean;
  font: string;
}

function BlockRenderer({ block, onUpdate, isSelected, font }: BlockRendererProps) {
  switch (block.type) {
    case 'heading':
      return <EditableHeading block={block} onUpdate={onUpdate} isSelected={isSelected} />;
    case 'text':
      return <EditableText block={block} onUpdate={onUpdate} isSelected={isSelected} />;
    case 'code':
      return <EditableCode block={block} onUpdate={onUpdate} isSelected={isSelected} />;
    case 'image':
      return <ImageBlockView block={block} onUpdate={onUpdate} />;
    case 'table':
      return <EditableTable block={block} onUpdate={onUpdate} isSelected={isSelected} font={font} />;
    case 'divider':
      return <hr style={{ border: 'none', borderTop: `${block.thickness}px ${block.style} ${block.color}`, margin: 0, width: '100%', height: '100%' }} />;
    case 'spacer':
      return <div style={{ width: '100%', height: '100%' }} />;
    case 'list':
      return <EditableList block={block} onUpdate={onUpdate} isSelected={isSelected} />;
    default:
      return null;
  }
}

// Below are the exact same editable components as CheatsheetPreview

function EditableHeading({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'heading' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  const sizes = { 1: '28px', 2: '18px', 3: '15px' };
  return (
    <div
      contentEditable={isSelected}
      suppressContentEditableWarning
      onBlur={(e) => onUpdate({ content: e.currentTarget.textContent || '' })}
      style={{
        fontSize: sizes[block.level],
        fontWeight: 700,
        color: block.color,
        textAlign: block.align,
        letterSpacing: block.level === 1 ? '-0.5px' : '0.3px',
        textTransform: block.level > 1 ? 'uppercase' : undefined,
        outline: 'none',
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      {block.content}
    </div>
  );
}

function EditableText({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'text' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  return (
    <div
      contentEditable={isSelected}
      suppressContentEditableWarning
      onBlur={(e) => onUpdate({ content: e.currentTarget.textContent || '' })}
      style={{
        fontSize: block.fontSize,
        color: block.color,
        textAlign: block.align,
        fontWeight: block.bold ? 700 : 400,
        fontStyle: block.italic ? 'italic' : 'normal',
        outline: 'none',
        lineHeight: 1.6,
        width: '100%',
        height: '100%',
      }}
    >
      {block.content}
    </div>
  );
}

function EditableCode({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'code' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  const [localCode, setLocalCode] = useState(block.code);
  useEffect(() => { setLocalCode(block.code); }, [block.code]);

  return (
    <div style={{ borderRadius: '6px', overflow: 'hidden', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {block.showLabel && (
        <div style={{
          background: block.bgColor,
          padding: '6px 12px',
          fontSize: '11px',
          fontWeight: 600,
          color: block.textColor,
          opacity: 0.6,
          borderBottom: `1px solid ${block.textColor}22`,
          fontFamily: "'JetBrains Mono', monospace",
          flexShrink: 0
        }}>
          {block.label} <span style={{ opacity: 0.5 }}>— {block.language}</span>
        </div>
      )}
      {isSelected ? (
        <textarea
          value={localCode}
          onChange={(e) => setLocalCode(e.target.value)}
          onBlur={() => onUpdate({ code: localCode })}
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            width: '100%',
            background: block.bgColor,
            color: block.textColor,
            padding: '12px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            border: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: 1.6,
          }}
        />
      ) : (
        <pre style={{
          flex: 1,
          background: block.bgColor,
          color: block.textColor,
          padding: '12px',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          lineHeight: 1.6,
        }}>
          {block.code}
        </pre>
      )}
    </div>
  );
}

function ImageBlockView({ block, onUpdate }: { block: Extract<Block, { type: 'image' }>; onUpdate: (u: Partial<Block>) => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpdate({ src: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  if (!block.src) {
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: '40px',
          border: '2px dashed #94a3b8',
          borderRadius: block.borderRadius,
          cursor: 'pointer',
          color: '#64748b',
          fontSize: '13px',
          background: 'rgba(0,0,0,0.02)'
        }}
      >
        Click to upload
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    );
  }

  return (
    <div style={{ textAlign: block.align, width: '100%', height: '100%', overflow: 'hidden', borderRadius: block.borderRadius }}>
      <img
        src={block.src}
        alt={block.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        draggable={false}
      />
    </div>
  );
}

function EditableTable({ block, onUpdate, isSelected, font }: { block: Extract<Block, { type: 'table' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean; font: string }) {
  const updateCell = (row: number, col: number, value: string) => {
    const newRows = block.rows.map((r, ri) =>
      ri === row ? r.map((c, ci) => (ci === col ? value : c)) : [...r]
    );
    onUpdate({ rows: newRows });
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '6px' }}>
      <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: font }}>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => {
                const isHeader = ri === 0;
                return (
                  <td
                    key={ci}
                    contentEditable={isSelected}
                    suppressContentEditableWarning
                    onBlur={(e) => updateCell(ri, ci, e.currentTarget.textContent || '')}
                    onClick={(e) => isSelected && e.stopPropagation()}
                    style={{
                      background: isHeader ? block.headerBg : block.cellBg,
                      color: isHeader ? block.headerText : block.cellText,
                      padding: '8px 12px',
                      fontWeight: isHeader ? 700 : 400,
                      border: `1px solid ${block.borderColor}`,
                      outline: 'none',
                      textTransform: isHeader ? 'uppercase' : undefined,
                      fontSize: isHeader ? '11px' : '12px',
                      letterSpacing: isHeader ? '0.5px' : undefined,
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditableList({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'list' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  const Tag = block.ordered ? 'ol' : 'ul';
  return (
    <Tag style={{
      color: block.color,
      fontSize: block.fontSize,
      paddingLeft: '20px',
      margin: 0,
      lineHeight: 1.8,
      width: '100%',
      height: '100%',
    }}>
      {block.items.map((item, i) => (
        <li
          key={i}
          contentEditable={isSelected}
          suppressContentEditableWarning
          onBlur={(e) => {
            const newItems = [...block.items];
            newItems[i] = e.currentTarget.textContent || '';
            onUpdate({ items: newItems });
          }}
          onClick={(e) => isSelected && e.stopPropagation()}
          style={{ outline: 'none' }}
        >
          {item}
        </li>
      ))}
    </Tag>
  );
}

CanvasArtboard.displayName = 'CanvasArtboard';
export default CanvasArtboard;
