import { useState, useEffect, useRef, useCallback } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
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
    const el = previewRef.current;
    setIsExporting(true);
    setSelectedBlockId(null);

    // Wait for React to flush the deselect + load all fonts
    await new Promise((r) => setTimeout(r, 300));
    await document.fonts.ready;

    // Toggle CSS class that strips border/shadow/dividers (see index.css)
    el.classList.add('exporting');
    // Force browser reflow so the class takes effect before capture
    el.getBoundingClientRect();

    const A4_W = 794;
    const A4_H = 1123;
    const pages = doc.totalPages || 1;

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null, // use element's own bg
        width: A4_W,
        height: A4_H * pages,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: async (clonedDoc) => {
          const clonedEl = clonedDoc.querySelector('.canvas-artboard') as HTMLElement;
          if (clonedEl) {
            clonedEl.style.border = 'none';
            clonedEl.style.boxShadow = 'none';
            clonedEl.style.overflow = 'visible';
            clonedEl.querySelectorAll('.page-divider').forEach((d) => d.remove());

            // Fix html2canvas letter-spacing bug:
            // html2canvas renders each character individually when letter-spacing != 0,
            // causing visible gaps. Reset to normal on ALL elements inside the canvas.
            clonedEl.querySelectorAll<HTMLElement>('*').forEach((node) => {
              node.style.letterSpacing = 'normal';
              node.style.wordSpacing = 'normal';
            });
            clonedEl.style.letterSpacing = 'normal';
            clonedEl.style.wordSpacing = 'normal';
          }

          // Inject the Google Fonts stylesheet into the cloned document
          const fontLink = clonedDoc.createElement('link');
          fontLink.rel = 'stylesheet';
          fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@400;500;600;700&display=swap';
          clonedDoc.head.appendChild(fontLink);

          await new Promise((resolve) => {
            fontLink.onload = resolve;
            fontLink.onerror = resolve;
            setTimeout(resolve, 3000);
          });
          await clonedDoc.fonts.ready;
        },
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const sliceH = Math.round(canvas.height / pages);

      for (let pg = 0; pg < pages; pg++) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceH;
        const ctx = pageCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, pg * sliceH, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

        if (pg > 0) pdf.addPage('a4', 'portrait');
        pdf.addImage(pageCanvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, 210, 297);
      }

      pdf.save(`${doc.title.replace(/\s+/g, '_').toLowerCase() || 'cheatsheet'}.pdf`);
      toast.success('PDF exported!');
    } catch (err) {
      console.error('[PDF Export]', err);
      toast.error('Export failed.');
    } finally {
      el.classList.remove('exporting');
      setIsExporting(false);
    }
  }, [doc]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id === 'canvas-droppable') {
      const type = active.data.current?.type as BlockType;
      if (type) {
        const activeRect = active.rect.current.translated;
        const overRect = over.rect;
        const dropX = (activeRect && overRect) ? Math.max(0, activeRect.left - overRect.left) : 50;
        const dropY = (activeRect && overRect) ? Math.max(0, activeRect.top - overRect.top) : 50;
        
        const block = createBlock(type);
        block.x = Math.round(dropX);
        block.y = Math.round(dropY);
        setDoc((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
        setSelectedBlockId(block.id);
      }
    }
  }, [setDoc]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
        className="flex-1 overflow-auto bg-neutral-100/50 p-8 relative flex flex-col items-center gap-8 shadow-inner" 
        onClick={() => setSelectedBlockId(null)}
      >
        <div className="animate-fade-in flex-shrink-0">
          <CanvasArtboard
            ref={previewRef}
            doc={doc}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlock={updateBlock}
          />
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); updateDoc({ totalPages: (doc.totalPages || 1) + 1 }) }}
          className="px-4 py-2 bg-white border border-border shadow-sm rounded-md text-sm font-medium text-muted-foreground hover:bg-neutral-50 hover:text-foreground transition-all flex items-center gap-2 mb-12 flex-shrink-0"
        >
          Add New Page
        </button>
      </div>

      {/* Right Sidebar: Selected Block Properties */}
      <PropertiesPanel
        selectedBlockId={selectedBlockId}
        selectedBlock={selectedBlock}
        onDeleteBlock={deleteBlock}
        onUpdateBlock={updateBlock}
      />

      </div>
    </DndContext>
  );
}
