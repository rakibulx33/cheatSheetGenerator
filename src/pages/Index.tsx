import { useState, useRef, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { type Block, type BlockType, type CheatsheetDoc, createBlock, cheatsheetTemplates } from '@/data/cheatsheetData';
import EditorPanel from '@/components/EditorPanel';
import CheatsheetPreview from '@/components/CheatsheetPreview';
import { toast } from 'sonner';

const deepCloneDoc = (doc: CheatsheetDoc): CheatsheetDoc => {
  return {
    ...doc,
    blocks: doc.blocks.map((b) => ({ ...b, id: Math.random().toString(36).substring(2, 9) })),
  };
};

export default function Index() {
  const [doc, setDoc] = useState<CheatsheetDoc>(() => deepCloneDoc(cheatsheetTemplates[0].doc));
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedBlock = selectedBlockId ? doc.blocks.find((b) => b.id === selectedBlockId) || null : null;

  const updateDoc = useCallback((updates: Partial<CheatsheetDoc>) => {
    setDoc((prev) => ({ ...prev, ...updates }));
  }, []);

  const addBlock = useCallback((type: BlockType) => {
    const block = createBlock(type);
    setDoc((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
    setSelectedBlockId(block.id);
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setDoc((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
    setSelectedBlockId(null);
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setDoc((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } as Block : b)),
    }));
  }, []);

  const reorderBlocks = useCallback((activeId: string, overId: string) => {
    setDoc((prev) => {
      const oldIndex = prev.blocks.findIndex((b) => b.id === activeId);
      const newIndex = prev.blocks.findIndex((b) => b.id === overId);
      return { ...prev, blocks: arrayMove(prev.blocks, oldIndex, newIndex) };
    });
  }, []);

  const loadTemplate = useCallback((templateDoc: CheatsheetDoc) => {
    setDoc(deepCloneDoc(templateDoc));
    setSelectedBlockId(null);
  }, []);

  const exportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      // Temporarily deselect for clean export
      setSelectedBlockId(null);
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: doc.bgColor,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdfW = canvas.width * 0.264583;
      const pdfH = canvas.height * 0.264583;

      const pdf = new jsPDF({
        orientation: pdfW > pdfH ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfW, pdfH],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${doc.title.replace(/\s+/g, '_').toLowerCase() || 'cheatsheet'}.pdf`);
      toast.success('PDF exported successfully!');
    } catch {
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  }, [doc]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="w-[360px] flex-shrink-0 overflow-hidden">
        <EditorPanel
          doc={doc}
          selectedBlockId={selectedBlockId}
          selectedBlock={selectedBlock}
          onUpdateDoc={updateDoc}
          onAddBlock={addBlock}
          onDeleteBlock={deleteBlock}
          onUpdateBlock={updateBlock}
          onLoadTemplate={loadTemplate}
          onExportPdf={exportPdf}
          isExporting={isExporting}
        />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="min-w-[700px] max-w-[1100px] mx-auto shadow-2xl rounded-xl overflow-hidden border border-border animate-fade-in">
          <CheatsheetPreview
            ref={previewRef}
            doc={doc}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlock={updateBlock}
            onReorder={reorderBlocks}
          />
        </div>
      </div>
    </div>
  );
}
