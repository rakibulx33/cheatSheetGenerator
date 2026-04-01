import { type Block } from '@/data/cheatsheetData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Trash2, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Plus, Minus as MinusIcon } from 'lucide-react';

interface Props {
  selectedBlockId: string | null;
  selectedBlock: Block | null;
  onDeleteBlock: (id: string) => void;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
}

export default function PropertiesPanel({ selectedBlockId, selectedBlock, onDeleteBlock, onUpdateBlock }: Props) {
  if (!selectedBlock) {
    return (
      <div className="flex flex-col h-full bg-card border-l border-border w-[280px]">
        <div className="p-4 border-b border-border flex items-center h-[69px]">
          <h2 className="font-display text-base font-bold text-foreground">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center text-xs text-muted-foreground">
          Select a block on the canvas to view and edit its properties.
        </div>
      </div>
    );
  }

  const handleGeometryChange = (field: 'x' | 'y' | 'width' | 'height', val: string) => {
    // If it's a pure number string, parse it. If it's 'auto', keep it string.
    let parsed: string | number = val;
    if (!isNaN(Number(val)) && val.trim() !== '') {
      parsed = Number(val);
    }
    onUpdateBlock(selectedBlockId!, { [field]: parsed });
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border w-[280px]">
      <div className="p-4 border-b border-border flex items-center justify-between h-[69px]">
        <h2 className="font-display text-base font-bold text-foreground capitalize">{selectedBlock.type} Properties</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteBlock(selectedBlockId!)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Position & Layout</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground uppercase">X</Label>
                <Input value={selectedBlock.x} onChange={(e) => handleGeometryChange('x', e.target.value)} className="h-8 text-xs font-mono" />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground uppercase">Y</Label>
                <Input value={selectedBlock.y} onChange={(e) => handleGeometryChange('y', e.target.value)} className="h-8 text-xs font-mono" />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground uppercase">W</Label>
                <Input value={selectedBlock.width} onChange={(e) => handleGeometryChange('width', e.target.value)} className="h-8 text-xs font-mono" />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground uppercase">H</Label>
                <Input value={selectedBlock.height} onChange={(e) => handleGeometryChange('height', e.target.value)} className="h-8 text-xs font-mono" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <BlockProperties block={selectedBlock} onUpdate={(u) => onUpdateBlock(selectedBlockId!, u)} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function BlockProperties({ block, onUpdate }: { block: Block; onUpdate: (u: Partial<Block>) => void }) {
  // Re-use the existing switch statement basically exactly identifying the block type to render options
  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-4">
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
        <div className="space-y-4">
          <NumberField label="Font Size (px)" value={block.fontSize} onChange={(v) => onUpdate({ fontSize: v })} min={8} max={72} />
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
        <div className="space-y-4">
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
            <span className="text-xs text-muted-foreground">Show Label Bar</span>
          </div>
          <ColorField label="Background" value={block.bgColor} onChange={(v) => onUpdate({ bgColor: v })} />
          <ColorField label="Text Color" value={block.textColor} onChange={(v) => onUpdate({ textColor: v })} />
        </div>
      );
    case 'image':
      return (
        <div className="space-y-4">
          <NumberField label="Border Radius (px)" value={block.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} min={0} max={100} />
          <AlignmentPicker value={block.align} onChange={(v) => onUpdate({ align: v })} />
          <div>
            <Label className="text-xs text-muted-foreground">Image Source (URL or Base64)</Label>
            <Input value={block.src} onChange={(e) => onUpdate({ src: e.target.value })} placeholder="https://..." className="mt-1 h-8 text-xs" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Alt Text (Accessibility)</Label>
            <Input value={block.alt} onChange={(e) => onUpdate({ alt: e.target.value })} className="mt-1 h-8 text-xs" />
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <ColorField label="Header BG" value={block.headerBg} onChange={(v) => onUpdate({ headerBg: v })} />
            <ColorField label="Header Text" value={block.headerText} onChange={(v) => onUpdate({ headerText: v })} />
            <ColorField label="Cell BG" value={block.cellBg} onChange={(v) => onUpdate({ cellBg: v })} />
            <ColorField label="Cell Text" value={block.cellText} onChange={(v) => onUpdate({ cellText: v })} />
          </div>
          <ColorField label="Border" value={block.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
          
          <div className="pt-2">
            <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Rows & Columns</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Button variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => {
                  const newRows = block.rows.map(r => [...r, '']);
                  newRows[0][newRows[0].length - 1] = `Col ${newRows[0].length}`;
                  onUpdate({ rows: newRows });
                }}><Plus className="w-3 h-3 mr-1" /> Add Col</Button>
                <Button variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => {
                  if (block.rows[0]?.length <= 1) return;
                  onUpdate({ rows: block.rows.map(r => r.slice(0, -1)) });
                }} disabled={block.rows[0]?.length <= 1}><MinusIcon className="w-3 h-3 mr-1" /> Rm Col</Button>
              </div>
              <div className="space-y-1">
                <Button variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => {
                  const cols = block.rows[0]?.length || 2;
                  onUpdate({ rows: [...block.rows, Array(cols).fill('')] });
                }}><Plus className="w-3 h-3 mr-1" /> Add Row</Button>
                <Button variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => {
                  if (block.rows.length <= 1) return;
                  onUpdate({ rows: block.rows.slice(0, -1) });
                }} disabled={block.rows.length <= 1}><MinusIcon className="w-3 h-3 mr-1" /> Rm Row</Button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'divider':
      return (
        <div className="space-y-4">
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
          <NumberField label="Thickness (px)" value={block.thickness} onChange={(v) => onUpdate({ thickness: v })} min={1} max={16} />
          <ColorField label="Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
        </div>
      );
    case 'spacer':
      return (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Spacers reserve empty space. Adjust the Height inside the Position & Layout section above.
          </p>
        </div>
      );
    case 'list':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch checked={block.ordered} onCheckedChange={(v) => onUpdate({ ordered: v })} />
            <span className="text-xs text-muted-foreground">Numbered List</span>
          </div>
          <NumberField label="Font Size" value={block.fontSize} onChange={(v) => onUpdate({ fontSize: v })} min={8} max={48} />
          <ColorField label="Text Color" value={block.color} onChange={(v) => onUpdate({ color: v })} />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 text-xs h-8" onClick={() => onUpdate({ items: [...block.items, 'New item'] })}>
              <Plus className="w-3 h-3 mr-1" /> Add Item
            </Button>
            {block.items.length > 1 && (
              <Button variant="secondary" size="sm" className="flex-1 text-xs h-8" onClick={() => onUpdate({ items: block.items.slice(0, -1) })}>
                <MinusIcon className="w-3 h-3 mr-1" /> Remove
              </Button>
            )}
          </div>
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
        <Button key={align} variant={value === align ? 'default' : 'secondary'} size="sm" onClick={() => onChange(align)} className="flex-1 h-8 p-0">
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent" />
      <span className="text-xs text-muted-foreground truncate">{label}</span>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-7 text-xs w-20 ml-auto font-mono uppercase" />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 h-8 text-xs font-mono" />
    </div>
  );
}
