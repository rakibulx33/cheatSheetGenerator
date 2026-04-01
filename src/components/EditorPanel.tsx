import { type Block, type BlockType, type CheatsheetDoc, createBlock, fonts, cheatsheetTemplates } from '@/data/cheatsheetData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  Trash2, FileDown, Type, Code2, Image, Table2, Minus, Space, List, Heading,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Plus, Minus as MinusIcon,
  LayoutTemplate,
} from 'lucide-react';

interface Props {
  doc: CheatsheetDoc;
  selectedBlockId: string | null;
  selectedBlock: Block | null;
  onUpdateDoc: (updates: Partial<CheatsheetDoc>) => void;
  onAddBlock: (type: BlockType) => void;
  onDeleteBlock: (id: string) => void;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
  onLoadTemplate: (doc: CheatsheetDoc) => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

const blockTypes: { type: BlockType; icon: React.ReactNode; label: string }[] = [
  { type: 'heading', icon: <Heading className="w-4 h-4" />, label: 'Heading' },
  { type: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
  { type: 'code', icon: <Code2 className="w-4 h-4" />, label: 'Code' },
  { type: 'image', icon: <Image className="w-4 h-4" />, label: 'Image' },
  { type: 'table', icon: <Table2 className="w-4 h-4" />, label: 'Table' },
  { type: 'list', icon: <List className="w-4 h-4" />, label: 'List' },
  { type: 'divider', icon: <Minus className="w-4 h-4" />, label: 'Divider' },
  { type: 'spacer', icon: <Space className="w-4 h-4" />, label: 'Spacer' },
];

export default function EditorPanel({
  doc, selectedBlockId, selectedBlock, onUpdateDoc, onAddBlock, onDeleteBlock,
  onUpdateBlock, onLoadTemplate, onExportPdf, isExporting,
}: Props) {

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Cheatsheet Builder</h2>
        <Button onClick={onExportPdf} disabled={isExporting} size="sm" className="gap-2">
          <FileDown className="w-4 h-4" />
          {isExporting ? 'Exporting…' : 'Export PDF'}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Templates */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <LayoutTemplate className="w-3.5 h-3.5" /> Templates
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {cheatsheetTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onLoadTemplate(t.doc)}
                  className="text-left p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Document Settings */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Document</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Font</Label>
                <Select value={doc.font} onValueChange={(v) => onUpdateDoc({ font: v })}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Columns</Label>
                <Select value={String(doc.columns)} onValueChange={(v) => onUpdateDoc({ columns: Number(v) })}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((n) => <SelectItem key={n} value={String(n)}>{n} Col{n > 1 ? 's' : ''}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={doc.bgColor}
                onChange={(e) => onUpdateDoc({ bgColor: e.target.value })}
                className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="text-xs text-muted-foreground">Background Color</span>
            </div>
          </div>

          <Separator />

          {/* Add Block */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add Block</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {blockTypes.map(({ type, icon, label }) => (
                <button
                  key={type}
                  onClick={() => onAddBlock(type)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/10 transition-all text-muted-foreground hover:text-primary"
                >
                  {icon}
                  <span className="text-[10px] font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Selected Block Properties */}
          {selectedBlock ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)} Properties
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteBlock(selectedBlockId!)}
                  className="h-7 text-xs text-destructive hover:text-destructive gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </Button>
              </div>

              {/* Resize / Span controls */}
              <div className="space-y-3 p-3 rounded-lg border border-border bg-secondary/30">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size & Span</Label>
                <div className="grid grid-cols-2 gap-2">
                  <NumberField
                    label="Column Span"
                    value={selectedBlock.colSpan || 1}
                    onChange={(v) => onUpdateBlock(selectedBlockId!, { colSpan: v })}
                    min={1}
                    max={doc.columns}
                  />
                  <NumberField
                    label="Min Height (px)"
                    value={selectedBlock.minHeight || 0}
                    onChange={(v) => onUpdateBlock(selectedBlockId!, { minHeight: v || undefined })}
                    min={0}
                    max={800}
                  />
                </div>
              </div>

              <BlockProperties block={selectedBlock} onUpdate={(u) => onUpdateBlock(selectedBlockId!, u)} />
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-xs">
              Click a block in the preview to edit its properties
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function BlockProperties({ block, onUpdate }: { block: Block; onUpdate: (u: Partial<Block>) => void }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Level</Label>
            <Select value={String(block.level)} onValueChange={(v) => onUpdate({ level: Number(v) as 1 | 2 | 3 })}>
              <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1 — Large</SelectItem>
                <SelectItem value="2">H2 — Medium</SelectItem>
                <SelectItem value="3">H3 — Small</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlignmentPicker value={block.align} onChange={(v) => onUpdate({ align: v })} />
          <ColorField label="Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
        </div>
      );
    case 'text':
      return (
        <div className="space-y-3">
          <NumberField label="Font Size" value={block.fontSize} onChange={(v) => onUpdate({ fontSize: v })} min={10} max={32} />
          <AlignmentPicker value={block.align} onChange={(v) => onUpdate({ align: v })} />
          <div className="flex gap-2">
            <Button variant={block.bold ? 'default' : 'secondary'} size="sm" onClick={() => onUpdate({ bold: !block.bold })} className="h-8 w-8 p-0">
              <Bold className="w-3.5 h-3.5" />
            </Button>
            <Button variant={block.italic ? 'default' : 'secondary'} size="sm" onClick={() => onUpdate({ italic: !block.italic })} className="h-8 w-8 p-0">
              <Italic className="w-3.5 h-3.5" />
            </Button>
          </div>
          <ColorField label="Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
        </div>
      );
    case 'code':
      return (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Language</Label>
            <Input value={block.language} onChange={(e) => onUpdate({ language: e.target.value })} className="mt-1 h-8 text-xs" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Label</Label>
            <Input value={block.label} onChange={(e) => onUpdate({ label: e.target.value })} className="mt-1 h-8 text-xs" />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={block.showLabel} onCheckedChange={(v) => onUpdate({ showLabel: v })} />
            <span className="text-xs text-muted-foreground">Show Label</span>
          </div>
          <ColorField label="Background" value={block.bgColor} onChange={(v) => onUpdate({ bgColor: v })} />
          <ColorField label="Text Color" value={block.textColor} onChange={(v) => onUpdate({ textColor: v })} />
        </div>
      );
    case 'image':
      return (
        <div className="space-y-3">
          <NumberField label="Width %" value={block.width} onChange={(v) => onUpdate({ width: v })} min={10} max={100} />
          <NumberField label="Border Radius" value={block.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} min={0} max={50} />
          <AlignmentPicker value={block.align} onChange={(v) => onUpdate({ align: v })} />
          <div>
            <Label className="text-xs text-muted-foreground">Alt Text</Label>
            <Input value={block.alt} onChange={(e) => onUpdate({ alt: e.target.value })} className="mt-1 h-8 text-xs" />
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="space-y-3">
          <ColorField label="Header BG" value={block.headerBg} onChange={(v) => onUpdate({ headerBg: v })} />
          <ColorField label="Header Text" value={block.headerText} onChange={(v) => onUpdate({ headerText: v })} />
          <ColorField label="Cell BG" value={block.cellBg} onChange={(v) => onUpdate({ cellBg: v })} />
          <ColorField label="Cell Text" value={block.cellText} onChange={(v) => onUpdate({ cellText: v })} />
          <ColorField label="Border" value={block.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => {
              const newRows = block.rows.map(r => [...r, '']);
              newRows[0][newRows[0].length - 1] = `Col ${newRows[0].length}`;
              onUpdate({ rows: newRows });
            }}>
              <Plus className="w-3 h-3 mr-1" /> Column
            </Button>
            <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => {
              const cols = block.rows[0]?.length || 2;
              onUpdate({ rows: [...block.rows, Array(cols).fill('')] });
            }}>
              <Plus className="w-3 h-3 mr-1" /> Row
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => {
              if (block.rows[0]?.length <= 1) return;
              onUpdate({ rows: block.rows.map(r => r.slice(0, -1)) });
            }}>
              <MinusIcon className="w-3 h-3 mr-1" /> Column
            </Button>
            <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => {
              if (block.rows.length <= 1) return;
              onUpdate({ rows: block.rows.slice(0, -1) });
            }}>
              <MinusIcon className="w-3 h-3 mr-1" /> Row
            </Button>
          </div>
        </div>
      );
    case 'divider':
      return (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Style</Label>
            <Select value={block.style} onValueChange={(v) => onUpdate({ style: v as 'solid' | 'dashed' | 'dotted' })}>
              <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <NumberField label="Thickness" value={block.thickness} onChange={(v) => onUpdate({ thickness: v })} min={1} max={8} />
          <ColorField label="Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
        </div>
      );
    case 'spacer':
      return (
        <div className="space-y-3">
          <NumberField label="Height (px)" value={block.height} onChange={(v) => onUpdate({ height: v })} min={4} max={120} />
        </div>
      );
    case 'list':
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Switch checked={block.ordered} onCheckedChange={(v) => onUpdate({ ordered: v })} />
            <span className="text-xs text-muted-foreground">Numbered List</span>
          </div>
          <NumberField label="Font Size" value={block.fontSize} onChange={(v) => onUpdate({ fontSize: v })} min={10} max={24} />
          <ColorField label="Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
          <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => onUpdate({ items: [...block.items, 'New item'] })}>
            <Plus className="w-3 h-3 mr-1" /> Add Item
          </Button>
          {block.items.length > 1 && (
            <Button variant="secondary" size="sm" className="text-xs h-7" onClick={() => onUpdate({ items: block.items.slice(0, -1) })}>
              <MinusIcon className="w-3 h-3 mr-1" /> Remove Last
            </Button>
          )}
        </div>
      );
    default:
      return null;
  }
}

function AlignmentPicker({ value, onChange }: { value: string; onChange: (v: 'left' | 'center' | 'right') => void }) {
  return (
    <div className="flex gap-1">
      {([['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]] as const).map(([align, Icon]) => (
        <Button key={align} variant={value === align ? 'default' : 'secondary'} size="sm" onClick={() => onChange(align)} className="h-8 w-8 p-0">
          <Icon className="w-3.5 h-3.5" />
        </Button>
      ))}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-7 text-xs w-20 ml-auto" />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 h-8 text-xs" />
    </div>
  );
}
