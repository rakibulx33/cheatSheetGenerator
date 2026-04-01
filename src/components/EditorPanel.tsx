import { useState } from 'react';
import { templates, fonts, languagePresets, type CheatsheetConfig, type CheatsheetSection, type CheatsheetItem } from '@/data/cheatsheetData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, ChevronDown, ChevronRight, FileDown, LayoutTemplate } from 'lucide-react';

interface Props {
  config: CheatsheetConfig;
  onChange: (config: CheatsheetConfig) => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function EditorPanel({ config, onChange, onExportPdf, isExporting }: Props) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const updateField = <K extends keyof CheatsheetConfig>(key: K, value: CheatsheetConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const updateColor = (key: keyof CheatsheetConfig['customColors'], value: string) => {
    onChange({ ...config, customColors: { ...config.customColors, [key]: value } });
  };

  const loadPreset = (lang: string) => {
    const preset = languagePresets[lang];
    if (!preset) return;
    onChange({
      ...config,
      title: preset.title,
      subtitle: preset.subtitle,
      language: lang,
      sections: preset.sections,
    });
  };

  const addSection = () => {
    const newSection: CheatsheetSection = {
      id: generateId(),
      title: 'New Section',
      items: [{ id: generateId(), label: 'Label', code: 'code here', description: 'Description' }],
    };
    updateField('sections', [...config.sections, newSection]);
    setExpandedSections(prev => new Set(prev).add(newSection.id));
  };

  const removeSection = (id: string) => {
    updateField('sections', config.sections.filter(s => s.id !== id));
  };

  const updateSection = (id: string, key: keyof CheatsheetSection, value: string) => {
    updateField('sections', config.sections.map(s => s.id === id ? { ...s, [key]: value } : s));
  };

  const addItem = (sectionId: string) => {
    updateField('sections', config.sections.map(s =>
      s.id === sectionId
        ? { ...s, items: [...s.items, { id: generateId(), label: 'New Item', code: 'code', description: '' }] }
        : s
    ));
  };

  const removeItem = (sectionId: string, itemId: string) => {
    updateField('sections', config.sections.map(s =>
      s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s
    ));
  };

  const updateItem = (sectionId: string, itemId: string, key: keyof CheatsheetItem, value: string) => {
    updateField('sections', config.sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [key]: value } : i) }
        : s
    ));
  };

  const colorFields: { key: keyof CheatsheetConfig['customColors']; label: string }[] = [
    { key: 'pageBg', label: 'Page BG' },
    { key: 'headerBg', label: 'Header BG' },
    { key: 'headerText', label: 'Header Text' },
    { key: 'sectionBg', label: 'Section BG' },
    { key: 'sectionTitle', label: 'Section Title' },
    { key: 'codeBg', label: 'Code BG' },
    { key: 'codeText', label: 'Code Text' },
    { key: 'labelText', label: 'Label Text' },
  ];

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Cheatsheet Editor</h2>
        <Button onClick={onExportPdf} disabled={isExporting} size="sm" className="gap-2">
          <FileDown className="w-4 h-4" />
          {isExporting ? 'Exporting…' : 'Export PDF'}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Language Preset */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Language Preset</Label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(languagePresets).map(lang => (
                <Button
                  key={lang}
                  variant={config.language === lang ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => loadPreset(lang)}
                  className="text-xs capitalize"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input value={config.title} onChange={e => updateField('title', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Subtitle</Label>
              <Input value={config.subtitle} onChange={e => updateField('subtitle', e.target.value)} className="mt-1" />
            </div>
          </div>

          <Separator />

          {/* Template */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <LayoutTemplate className="w-3.5 h-3.5" /> Template
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => updateField('template', t)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    config.template.id === t.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/50 hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Font & Columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Font</Label>
              <Select value={config.font} onValueChange={v => updateField('font', v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {fonts.map(f => (
                    <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Columns</Label>
              <Select
                value={String(config.template.columns)}
                onValueChange={v => updateField('template', { ...config.template, columns: Number(v) })}
              >
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map(n => (
                    <SelectItem key={n} value={String(n)}>{n} Column{n > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Colors</Label>
            <div className="grid grid-cols-2 gap-2">
              {colorFields.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.customColors[key]}
                    onChange={e => updateColor(key, e.target.value)}
                    className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
                  />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sections */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sections</Label>
              <Button variant="ghost" size="sm" onClick={addSection} className="h-7 text-xs gap-1">
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>

            <div className="space-y-2">
              {config.sections.map(section => {
                const isExpanded = expandedSections.has(section.id);
                return (
                  <div key={section.id} className="border border-border rounded-lg overflow-hidden">
                    <div
                      className="flex items-center gap-2 px-3 py-2 bg-secondary/50 cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                      <Input
                        value={section.title}
                        onChange={e => { e.stopPropagation(); updateSection(section.id, 'title', e.target.value); }}
                        onClick={e => e.stopPropagation()}
                        className="h-7 text-sm font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
                      />
                      <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); removeSection(section.id); }} className="h-6 w-6 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="p-3 space-y-3">
                        {section.items.map(item => (
                          <div key={item.id} className="space-y-1.5 p-2 bg-muted/50 rounded-md">
                            <div className="flex gap-2">
                              <Input
                                value={item.label}
                                onChange={e => updateItem(section.id, item.id, 'label', e.target.value)}
                                placeholder="Label"
                                className="h-7 text-xs flex-1"
                              />
                              <Button variant="ghost" size="sm" onClick={() => removeItem(section.id, item.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <textarea
                              value={item.code}
                              onChange={e => updateItem(section.id, item.id, 'code', e.target.value)}
                              placeholder="Code"
                              className="w-full text-xs font-mono bg-background border border-border rounded px-2 py-1.5 resize-none"
                              rows={2}
                            />
                            <Input
                              value={item.description || ''}
                              onChange={e => updateItem(section.id, item.id, 'description', e.target.value)}
                              placeholder="Description (optional)"
                              className="h-7 text-xs"
                            />
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" onClick={() => addItem(section.id)} className="w-full h-7 text-xs gap-1">
                          <Plus className="w-3 h-3" /> Add Item
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
