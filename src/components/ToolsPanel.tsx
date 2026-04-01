import { type BlockType, type CheatsheetDoc, cheatsheetTemplates, fonts } from '@/data/cheatsheetData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileDown, Type, Code2, Image, Table2, Minus, Space, List, Heading, LayoutTemplate, LayoutGrid, Monitor } from 'lucide-react';

interface Props {
  doc: CheatsheetDoc;
  onUpdateDoc: (updates: Partial<CheatsheetDoc>) => void;
  onAddBlock: (type: BlockType) => void;
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

export default function ToolsPanel({ doc, onUpdateDoc, onAddBlock, onLoadTemplate, onExportPdf, isExporting }: Props) {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border w-[280px]">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground mb-3">Cheatsheet UI</h2>
        <Button onClick={onExportPdf} disabled={isExporting} className="w-full gap-2" variant="default">
          <FileDown className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export to PDF'}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Blocks
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {blockTypes.map(({ type, icon, label }) => (
                <button
                  key={type}
                  onClick={() => onAddBlock(type)}
                  className="flex items-center gap-2 p-2 rounded border border-border bg-secondary/30 hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-muted-foreground transition-all text-xs font-medium"
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Document Settings</Label>
            
            <div>
              <Label className="text-xs text-muted-foreground">Canvas Mode</Label>
              <div className="flex gap-2 mt-1">
                <Button 
                  variant={doc.canvasMode === 'a4' ? 'default' : 'secondary'} 
                  size="sm" 
                  className="flex-1 h-8 text-xs"
                  onClick={() => onUpdateDoc({ canvasMode: 'a4' })}
                >
                  <LayoutGrid className="w-3 h-3 mr-1" /> A4 Layout
                </Button>
                <Button 
                  variant={doc.canvasMode === 'infinite' ? 'default' : 'secondary'} 
                  size="sm" 
                  className="flex-1 h-8 text-xs"
                  onClick={() => onUpdateDoc({ canvasMode: 'infinite' })}
                >
                  <Monitor className="w-3 h-3 mr-1" /> Infinite
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Global Font</Label>
              <Select value={doc.font} onValueChange={(v) => onUpdateDoc({ font: v })}>
                <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {fonts.map((f) => <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={doc.bgColor}
                onChange={(e) => onUpdateDoc({ bgColor: e.target.value })}
                className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="text-xs text-muted-foreground">Canvas Background</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <LayoutTemplate className="w-3.5 h-3.5" /> Start from Template
            </Label>
            <div className="grid gap-2">
              {cheatsheetTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onLoadTemplate(t.doc)}
                  className="text-left p-3 rounded border border-border bg-secondary/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}

function Plus(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
}
