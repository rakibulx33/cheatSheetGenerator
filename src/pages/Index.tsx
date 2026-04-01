import { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { type Block, type BlockType, type CheatsheetDoc, createBlock, cheatsheetTemplates } from '@/data/cheatsheetData';
import { useHistory } from '@/hooks/useHistory';
import ToolsPanel from '@/components/ToolsPanel';
import PropertiesPanel from '@/components/PropertiesPanel';
import CanvasArtboard from '@/components/CanvasArtboard';
import { toast } from 'sonner';

const deepCloneDoc = (doc: CheatsheetDoc): CheatsheetDoc => {
  return {
    ...doc,
    blocks: doc.blocks.map((b) => ({ ...b, id: Math.random().toString(36).substring(2, 9) })),
  };
};

export default function Index() {
  const [doc, setDoc, undo, redo, resetHistory] = useHistory<CheatsheetDoc>(() => deepCloneDoc(cheatsheetTemplates[0].doc));
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedBlock = selectedBlockId ? doc.blocks.find((b) => b.id === selectedBlockId) || null : null;

  // Listen for global Undo/Redo shortcuts (Ctrl+Z, Ctrl+Y/Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept shortcuts if the user is typing in a form field or editing block content directly
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' || 
        target.isContentEditable
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault(); // Stop standard browser action
        if (e.shiftKey) {
          redo();
          toast('Redo', { position: 'top-center' });
        } else {
          undo();
          toast('Undo', { position: 'top-center' });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        toast('Redo', { position: 'top-center' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const updateDoc = useCallback((updates: Partial<CheatsheetDoc>) => {
    setDoc((prev) => ({ ...prev, ...updates }));
  }, [setDoc]);

  const addBlock = useCallback((type: BlockType) => {
    const block = createBlock(type);
    
    // Slight offset if there are multiple blocks to avoid precise overlapping stack
    const offset = (doc.blocks.length % 5) * 20;
    block.x += offset;
    block.y += offset;

    setDoc((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
    setSelectedBlockId(block.id);
  }, [doc.blocks.length, setDoc]);

  const deleteBlock = useCallback((id: string) => {
    setDoc((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
    setSelectedBlockId(null);
  }, [setDoc]);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setDoc((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } as Block : b)),
    }));
  }, [setDoc]);

  const loadTemplate = useCallback((templateDoc: CheatsheetDoc) => {
    resetHistory(deepCloneDoc(templateDoc));
    setSelectedBlockId(null);
  }, [resetHistory]);

  const exportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      // Temporarily deselect for clean export without resize handles 
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
  }, [doc.bgColor, doc.title]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      
      {/* Left Sidebar: Tools & Settings */}
      <ToolsPanel
        doc={doc}
        onUpdateDoc={updateDoc}
        onAddBlock={addBlock}
        onLoadTemplate={loadTemplate}
        onExportPdf={exportPdf}
        isExporting={isExporting}
      />

      {/* Center Artboard Area */}
      <div 
        className="flex-1 overflow-auto bg-neutral-100/50 p-8 relative flex shadow-inner" 
        onClick={() => setSelectedBlockId(null)}
      >
        {/* We use margin auto to keep it centered if infinite, or strictly centered if A4 */}
        <div className="m-auto animate-fade-in">
          <CanvasArtboard
            ref={previewRef}
            doc={doc}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlock={updateBlock}
          />
        </div>
      </div>

      {/* Right Sidebar: Selected Block Properties */}
      <PropertiesPanel
        selectedBlockId={selectedBlockId}
        selectedBlock={selectedBlock}
        onDeleteBlock={deleteBlock}
        onUpdateBlock={updateBlock}
      />

    </div>
  );
}
