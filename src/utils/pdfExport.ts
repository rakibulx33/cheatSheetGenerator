import jsPDF from 'jspdf';
import type { CheatsheetDoc, Block } from '../data/cheatsheetData';

// ── Constants ────────────────────────────────────────────────────────────────
const MM = 0.264583; // 1px → mm
const p = (px: number) => px * MM;
const A4_H_PX = 1123;

// ── Font cache ───────────────────────────────────────────────────────────────
const _b64Cache   = new Map<string, string | null>(); // "Inter:400" → base64 | null
const _fontLoaded = new Map<string, string>();         // docFont → jsPDF font-name

// Exact monospace names → use built-in Courier (close enough for code blocks)
const MONO_EXACT = new Set([
  'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Roboto Mono', 'Courier New', 'Courier',
]);

function builtinFallback(family: string) {
  if (MONO_EXACT.has(family)) return 'courier';
  return 'helvetica';
}
function isMonospace(family: string) { return MONO_EXACT.has(family); }

// ── Helpers ──────────────────────────────────────────────────────────────────
async function bufToB64(buf: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(new Blob([buf]));
  });
}

/**
 * Try to detect if a base64 blob is a valid TTF/OTF (starts with 0x00010000 or 'OTTO').
 * WOFF2 starts with 'wOF2' — jsPDF doesn't support it reliably, so we return null.
 */
function isTTFCompatible(b64: string): boolean {
  try {
    const head = atob(b64.slice(0, 8));
    const sig = head.charCodeAt(0).toString(16).padStart(2,'0')
              + head.charCodeAt(1).toString(16).padStart(2,'0')
              + head.charCodeAt(2).toString(16).padStart(2,'0')
              + head.charCodeAt(3).toString(16).padStart(2,'0');
    // Valid: 00010000 (TrueType), 4f54544f (OTTO/CFF), 74727565 (true)
    // Invalid: 774f4632 = wOF2 (WOFF2, not supported by jsPDF)
    return sig !== '774f4632' && sig !== '774f4646'; // not WOFF2 or WOFF
  } catch { return false; }
}

async function fetchGFontB64(family: string, weight: 400 | 700): Promise<string | null> {
  const key = `${family}:${weight}`;
  if (_b64Cache.has(key)) return _b64Cache.get(key)!;
  try {
    const enc = family.replace(/ /g, '+');
    // Request CSS — browser UA returns WOFF2, so we try to get all @font-face blocks
    // and pick a TTF-compatible one if available; otherwise we'll detect format later.
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${enc}:wght@${weight}&display=swap`
    ).then(r => { if (!r.ok) throw r.status; return r.text(); });

    // Collect ALL gstatic URLs in this CSS response
    const allUrls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)]
      .map(m => m[1]);
    if (!allUrls.length) throw new Error('no url');

    // Try each URL; prefer non-WOFF2 if available, otherwise use last (latin)
    const candidates = allUrls.filter(u => !u.includes('.woff2'));
    const fontUrl = candidates.length ? candidates[candidates.length - 1] : allUrls[allUrls.length - 1];

    const buf = await fetch(fontUrl).then(r => { if (!r.ok) throw r.status; return r.arrayBuffer(); });
    const b64 = await bufToB64(buf);

    // If jsPDF can't handle this format (WOFF2), cache null so we fall back to built-in
    if (!isTTFCompatible(b64)) {
      console.info(`[PDF] "${family}" w${weight}: WOFF2 detected, using built-in font fallback`);
      _b64Cache.set(key, null);
      return null;
    }

    _b64Cache.set(key, b64);
    return b64;
  } catch (e) {
    console.warn(`[PDF] Font fetch failed "${family}" w${weight}`, e);
    _b64Cache.set(key, null);
    return null;
  }
}

/**
 * Embeds the Google Font into this pdf instance (regular + bold).
 * If bold can't be fetched, the regular variant is also registered as bold
 * so pdf.setFont(name,'bold') never fails silently.
 * Returns the jsPDF font-name string to use.
 */
async function embedFont(pdf: jsPDF, family: string): Promise<string> {
  if (_fontLoaded.has(family)) return _fontLoaded.get(family)!;
  if (isMonospace(family)) { _fontLoaded.set(family, 'Courier'); return 'Courier'; }

  const fontId = family.replace(/ /g, '_');
  let embeddedNormal = false;

  try {
    const b400 = await fetchGFontB64(family, 400);
    if (b400) {
      pdf.addFileToVFS(`${fontId}_400.woff2`, b400);
      pdf.addFont(`${fontId}_400.woff2`, fontId, 'normal');
      embeddedNormal = true;
    }

    const b700 = await fetchGFontB64(family, 700);
    if (b700) {
      pdf.addFileToVFS(`${fontId}_700.woff2`, b700);
      pdf.addFont(`${fontId}_700.woff2`, fontId, 'bold');
    } else if (embeddedNormal && b400) {
      // Bold fetch failed — register normal as bold so setFont(name,'bold') never breaks
      pdf.addFileToVFS(`${fontId}_bold_fb.woff2`, b400);
      pdf.addFont(`${fontId}_bold_fb.woff2`, fontId, 'bold');
    }
  } catch (e) {
    console.warn(`[PDF] Embed failed "${family}"`, e);
  }

  const result = embeddedNormal ? fontId : builtinFallback(family);
  _fontLoaded.set(family, result);
  return result;
}

/** Safe font setter — guaranteed to never throw. Falls back to helvetica. */
function setFont(pdf: jsPDF, name: string, style: 'normal' | 'bold' | 'italic') {
  try { pdf.setFont(name, style); return; } catch { /* */ }
  try { pdf.setFont(name, 'normal'); return; } catch { /* */ }
  try { pdf.setFont('helvetica', style as string); return; } catch { /* */ }
  pdf.setFont('helvetica', 'normal'); // built-in, always works
}

// ── Color helpers ─────────────────────────────────────────────────────────────
function hex2rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').padEnd(6, '0');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
const setFill = (pdf: jsPDF, hex: string) => pdf.setFillColor(...hex2rgb(hex));
const setDraw = (pdf: jsPDF, hex: string) => pdf.setDrawColor(...hex2rgb(hex));
const setTxt  = (pdf: jsPDF, hex: string) => pdf.setTextColor(...hex2rgb(hex));

function blockW(block: Block) { return typeof block.width === 'number' ? block.width : 330; }

// ── Block renderers ───────────────────────────────────────────────────────────
function drawBlock(pdf: jsPDF, block: Block, pageOffsetY: number, font: string) {
  const bx = p(block.x);
  const by = p(block.y - pageOffsetY);
  const bw = p(blockW(block));

  switch (block.type) {
    /* ── Heading ─────────────────────────────────────────────────────── */
    case 'heading': {
      const sizes: Record<1|2|3, number> = { 1: 22, 2: 14, 3: 11 };
      const sz = sizes[block.level];
      setFont(pdf, font, 'bold');
      pdf.setFontSize(sz);
      setTxt(pdf, block.color);
      const txt   = block.level > 1 ? block.content.toUpperCase() : block.content;
      const lines = pdf.splitTextToSize(txt, bw);
      const tx    = block.align === 'center' ? bx + bw / 2
                  : block.align === 'right'  ? bx + bw : bx;
      pdf.text(lines, tx, by + p(block.level === 1 ? 10 : 7), { align: block.align });
      break;
    }

    /* ── Text ────────────────────────────────────────────────────────── */
    case 'text': {
      const style = block.italic ? 'italic' : block.bold ? 'bold' : 'normal';
      setFont(pdf, font, style);
      pdf.setFontSize(Math.max(7, block.fontSize * 0.72));
      setTxt(pdf, block.color);
      const lines = pdf.splitTextToSize(block.content, bw);
      const tx    = block.align === 'center' ? bx + bw / 2
                  : block.align === 'right'  ? bx + bw : bx;
      pdf.text(lines, tx, by + p(8), { align: block.align });
      break;
    }

    /* ── Code ────────────────────────────────────────────────────────── */
    case 'code': {
      const codeLines = block.code.split('\n');
      const labelH    = block.showLabel ? p(20) : 0;
      const codeH     = codeLines.length * p(14) + p(16);
      const totalH    = labelH + codeH;

      // Background
      setFill(pdf, block.bgColor);
      pdf.roundedRect(bx, by, bw, totalH, 1.5, 1.5, 'F');

      // Subtle border matching the code block edge
      const [br, bg, bb] = hex2rgb(block.bgColor);
      const darken = (c: number) => Math.max(0, c - 30);
      pdf.setDrawColor(darken(br), darken(bg), darken(bb));
      pdf.setLineWidth(0.3);
      pdf.roundedRect(bx, by, bw, totalH, 1.5, 1.5, 'S');

      // Label bar
      if (block.showLabel) {
        pdf.setFillColor(darken(br), darken(bg), darken(bb));
        pdf.roundedRect(bx, by, bw, labelH, 1.5, 1.5, 'F');
        pdf.setFont('Courier', 'normal');
        pdf.setFontSize(7);
        const [tr, tg, tb] = hex2rgb(block.textColor);
        pdf.setTextColor(Math.round(tr*0.6), Math.round(tg*0.6), Math.round(tb*0.6));
        pdf.text(`${block.label}  \u2014  ${block.language}`, bx + p(8), by + p(13));
      }

      // Code text
      pdf.setFont('Courier', 'normal');
      pdf.setFontSize(8.5);
      setTxt(pdf, block.textColor);
      const startY = by + labelH + p(12);
      codeLines.forEach((line, i) => pdf.text(line, bx + p(10), startY + i * p(14)));
      break;
    }

    /* ── Divider ─────────────────────────────────────────────────────── */
    case 'divider': {
      setDraw(pdf, block.color);
      pdf.setLineWidth(Math.max(0.3, p(block.thickness)));
      if (block.style === 'dashed')      pdf.setLineDashPattern([2.5, 2.5], 0);
      else if (block.style === 'dotted') pdf.setLineDashPattern([0.5, 2], 0);
      else                               pdf.setLineDashPattern([], 0);
      pdf.line(bx, by + p(10), bx + bw, by + p(10));
      pdf.setLineDashPattern([], 0);
      pdf.setLineWidth(0.2);
      break;
    }

    /* ── List ────────────────────────────────────────────────────────── */
    case 'list': {
      setFont(pdf, font, 'normal');
      pdf.setFontSize(Math.max(7, block.fontSize * 0.72));
      setTxt(pdf, block.color);
      block.items.forEach((item, i) => {
        const lineY = by + p(10) + i * p(15);
        if (block.ordered) {
          pdf.text(`${i + 1}.`, bx + p(4), lineY);
        } else {
          // Draw a small filled circle as bullet (avoids glyph substitution issues)
          setFill(pdf, block.color);
          pdf.circle(bx + p(6), lineY - p(3), 0.8, 'F');
          setTxt(pdf, block.color);
        }
        pdf.text(item, bx + p(14), lineY);
      });
      break;
    }

    /* ── Table ───────────────────────────────────────────────────────── */
    case 'table': {
      const cols = block.rows[0]?.length || 1;
      const colW = bw / cols;
      const rowH = p(22);

      block.rows.forEach((row, ri) => {
        const isHdr = ri === 0;
        row.forEach((cell, ci) => {
          const cx = bx + ci * colW;
          const ry = by + ri * rowH;

          // Cell background
          setFill(pdf, isHdr ? block.headerBg : block.cellBg);
          pdf.rect(cx, ry, colW, rowH, 'F');

          // Cell border — use specified border color
          setDraw(pdf, block.borderColor);
          pdf.setLineWidth(0.3);
          pdf.rect(cx, ry, colW, rowH, 'S');

          // Cell text
          setTxt(pdf, isHdr ? block.headerText : block.cellText);
          setFont(pdf, font, isHdr ? 'bold' : 'normal');
          pdf.setFontSize(isHdr ? 7 : 8.5);
          const label = isHdr ? cell.toUpperCase() : cell;
          const wrapped = pdf.splitTextToSize(label, colW - p(8));
          pdf.text(wrapped, cx + p(5), ry + p(14));
        });
      });
      break;
    }

    default:
      break;
  }
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function exportDocToPdf(doc: CheatsheetDoc): Promise<void> {
  const totalPages = doc.totalPages || 1;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Fetch + embed the document font before any drawing
  const font = await embedFont(pdf, doc.font);

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) pdf.addPage('a4', 'portrait');

    // Page background
    setFill(pdf, doc.bgColor);
    pdf.rect(0, 0, 210, 297, 'F');

    const pageStartY = page * A4_H_PX;
    const pageEndY   = pageStartY + A4_H_PX;
    const pageBlocks = doc.blocks.filter(b => b.y >= pageStartY - 50 && b.y < pageEndY);

    for (const block of pageBlocks) {
      try { drawBlock(pdf, block, pageStartY, font); }
      catch (e) { console.warn('[PDF] Block skipped:', block.type, e); }
    }
  }

  pdf.save(`${doc.title.replace(/\s+/g, '_').toLowerCase() || 'cheatsheet'}.pdf`);
}
