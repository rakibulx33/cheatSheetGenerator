import { forwardRef } from 'react';
import type { CheatsheetConfig } from '@/data/cheatsheetData';

interface Props {
  config: CheatsheetConfig;
}

const CheatsheetPreview = forwardRef<HTMLDivElement, Props>(({ config }, ref) => {
  const { title, subtitle, template, sections, customColors, font } = config;
  const cols = template.columns;

  const headerStyle: React.CSSProperties = {
    background: template.headerStyle === 'gradient'
      ? `linear-gradient(135deg, ${customColors.headerBg}, ${adjustColor(customColors.headerBg, 30)})`
      : template.headerStyle === 'solid'
      ? customColors.headerBg
      : 'transparent',
    color: customColors.headerText,
    padding: template.headerStyle === 'minimal' ? '24px 32px 12px' : '32px',
    borderBottom: template.headerStyle === 'minimal' ? `2px solid ${customColors.headerBg}` : 'none',
    fontFamily: font,
  };

  const borderRadius = template.borderStyle === 'rounded' ? '8px' : template.borderStyle === 'sharp' ? '2px' : '0';

  return (
    <div
      ref={ref}
      style={{
        background: customColors.pageBg,
        fontFamily: font,
        minHeight: '100%',
        padding: 0,
      }}
    >
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '6px', margin: 0 }}>{subtitle}</p>}
      </div>

      {/* Sections Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '16px',
          padding: '24px',
        }}
      >
        {sections.map((section) => (
          <div
            key={section.id}
            style={{
              background: customColors.sectionBg,
              borderRadius,
              overflow: 'hidden',
              border: template.borderStyle === 'none' ? 'none' : `1px solid ${customColors.sectionBg}33`,
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                fontWeight: 600,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: customColors.sectionTitle,
                borderBottom: `1px solid ${customColors.codeBg}`,
              }}
            >
              {section.title}
            </div>
            <div style={{ padding: '8px 12px' }}>
              {section.items.map((item) => (
                <div key={item.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: customColors.labelText, whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                    {template.showDescriptions && item.description && (
                      <span style={{ fontSize: '10px', color: customColors.labelText, opacity: 0.6 }}>
                        — {item.description}
                      </span>
                    )}
                  </div>
                  <code
                    style={{
                      display: 'block',
                      background: customColors.codeBg,
                      color: customColors.codeText,
                      padding: '6px 10px',
                      borderRadius: template.borderStyle === 'rounded' ? '4px' : '1px',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

CheatsheetPreview.displayName = 'CheatsheetPreview';
export default CheatsheetPreview;
