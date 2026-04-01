import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { templates, languagePresets, type CheatsheetConfig } from '@/data/cheatsheetData';
import EditorPanel from '@/components/EditorPanel';
import CheatsheetPreview from '@/components/CheatsheetPreview';
import { toast } from 'sonner';

const defaultConfig: CheatsheetConfig = {
  title: languagePresets.html.title,
  subtitle: languagePresets.html.subtitle,
  language: 'html',
  template: templates[0],
  sections: languagePresets.html.sections,
  customColors: {
    headerBg: '#1a9f6e',
    headerText: '#ffffff',
    sectionBg: '#1c2333',
    sectionTitle: '#5eead4',
    codeBg: '#131a2b',
    codeText: '#e2e8f0',
    labelText: '#94a3b8',
    pageBg: '#0f172a',
  },
  font: 'Inter',
};

export default function Index() {
  const [config, setConfig] = useState<CheatsheetConfig>(defaultConfig);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const exportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: config.customColors.pageBg,
      });
      const imgData = canvas.toDataURL('image/png');
      const imgW = canvas.width;
      const imgH = canvas.height;

      const pdfW = imgW * 0.264583; // px to mm at 96dpi
      const pdfH = imgH * 0.264583;

      const pdf = new jsPDF({
        orientation: pdfW > pdfH ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfW, pdfH],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${config.title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
      toast.success('PDF exported successfully!');
    } catch {
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  }, [config]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Editor Sidebar */}
      <div className="w-[380px] flex-shrink-0 overflow-hidden">
        <EditorPanel config={config} onChange={setConfig} onExportPdf={exportPdf} isExporting={isExporting} />
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="min-w-[800px] shadow-2xl rounded-xl overflow-hidden border border-border animate-fade-in">
          <CheatsheetPreview ref={previewRef} config={config} />
        </div>
      </div>
    </div>
  );
}
