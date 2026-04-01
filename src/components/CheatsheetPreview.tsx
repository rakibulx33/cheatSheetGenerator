import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Block, CheatsheetDoc } from '@/data/cheatsheetData';

interface Props {
  doc: CheatsheetDoc;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
  onReorder: (activeId: string, overId: string) => void;
}

const CheatsheetPreview = forwardRef<HTMLDivElement, Props>(
  ({ doc, selectedBlockId, onSelectBlock, onUpdateBlock, onReorder }, ref) => {
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        onReorder(String(active.id), String(over.id));
      }
    };

    return (
      <div
        ref={ref}
        style={{
          background: doc.bgColor,
          fontFamily: doc.font,
          minHeight: '600px',
          padding: '32px',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onSelectBlock(null);
        }}
      >
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={doc.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div
              style={{
                display: doc.columns > 1 ? 'grid' : 'block',
                gridTemplateColumns: doc.columns > 1 ? `repeat(${doc.columns}, 1fr)` : undefined,
                gap: '12px',
              }}
            >
              {doc.blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => onSelectBlock(block.id)}
                  onUpdate={(updates) => onUpdateBlock(block.id, updates)}
                  font={doc.font}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  }
);

interface SortableBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Block>) => void;
  font: string;
}

function SortableBlock({ block, isSelected, onSelect, onUpdate, font }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    outline: isSelected ? '2px solid hsl(165, 80%, 48%)' : '2px solid transparent',
    outlineOffset: '2px',
    borderRadius: '6px',
    position: 'relative',
    cursor: 'pointer',
  };

  // Full-width blocks span all columns
  const isFullWidth = block.type === 'divider' || block.type === 'spacer' ||
    (block.type === 'heading' && block.level === 1);

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, gridColumn: isFullWidth ? '1 / -1' : undefined }}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className="group"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <BlockRenderer block={block} onUpdate={onUpdate} isSelected={isSelected} font={font} />
    </div>
  );
}

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
      return <hr style={{ border: 'none', borderTop: `${block.thickness}px ${block.style} ${block.color}`, margin: '8px 0' }} />;
    case 'spacer':
      return <div style={{ height: block.height }} />;
    case 'list':
      return <EditableList block={block} onUpdate={onUpdate} isSelected={isSelected} />;
    default:
      return null;
  }
}

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
        padding: '4px',
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
        padding: '4px',
        lineHeight: 1.6,
      }}
    >
      {block.content}
    </div>
  );
}

function EditableCode({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'code' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [block.code]);

  return (
    <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
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
        }}>
          {block.label} <span style={{ opacity: 0.5 }}>— {block.language}</span>
        </div>
      )}
      {isSelected ? (
        <textarea
          ref={textareaRef}
          value={block.code}
          onChange={(e) => onUpdate({ code: e.target.value })}
          style={{
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
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpdate({ src: ev.target?.result as string });
    reader.readAsDataURL(file);
  }, [onUpdate]);

  if (!block.src) {
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '120px',
          border: '2px dashed #334155',
          borderRadius: block.borderRadius,
          cursor: 'pointer',
          color: '#64748b',
          fontSize: '13px',
        }}
      >
        Click to upload image
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    );
  }

  return (
    <div style={{ textAlign: block.align }}>
      <img
        src={block.src}
        alt={block.alt}
        style={{
          width: `${block.width}%`,
          borderRadius: block.borderRadius,
          display: 'inline-block',
        }}
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
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: font, borderRadius: '6px', overflow: 'hidden' }}>
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
  );
}

function EditableList({ block, onUpdate, isSelected }: { block: Extract<Block, { type: 'list' }>; onUpdate: (u: Partial<Block>) => void; isSelected: boolean }) {
  const Tag = block.ordered ? 'ol' : 'ul';
  return (
    <Tag style={{
      color: block.color,
      fontSize: block.fontSize,
      paddingLeft: '20px',
      margin: '4px 0',
      lineHeight: 1.8,
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
          style={{ outline: 'none' }}
        >
          {item}
        </li>
      ))}
    </Tag>
  );
}

CheatsheetPreview.displayName = 'CheatsheetPreview';
export default CheatsheetPreview;
