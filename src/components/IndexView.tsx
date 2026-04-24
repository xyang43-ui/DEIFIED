import React, { useState, useEffect } from 'react';
import { ScrambledText, TypewriterText } from './Common';

interface IndexViewProps {
  onNavigate: (view: any, word?: string) => void;
  setCursor: (cursor: 'left' | 'right' | 'default') => void;
}

const IndexView: React.FC<IndexViewProps> = ({ onNavigate, setCursor }) => {
  const [viewState, setViewState] = useState<'home' | 'archive'>('home');
  const [hovered, setHovered] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [archiveFocus, setArchiveFocus] = useState<number | null>(null);

  useEffect(() => {
    const scroll = (e: WheelEvent) => {
      setProgress(prev => {
        const next = Math.min(Math.max(prev + e.deltaY * 0.6, 0), 1000);
        if (next >= 1000) setViewState('archive');
        if (next <= 0) setViewState('home');
        return next;
      });
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY; // Update for continuous movement

      setProgress(prev => {
        const next = Math.min(Math.max(prev + deltaY * 2.5, 0), 1000);
        if (next >= 1000) setViewState('archive');
        if (next <= 0) setViewState('home');
        return next;
      });
    };

    window.addEventListener('wheel', scroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', scroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const p = progress / 1000;

  return (
    <>
      <div className="custom-scrollbar"><div className="scrollbar-thumb" style={{ height: `${p * 100}%` }} /></div>
      
      <div className="view-layer home-layout mobile-stack" style={{ 
        opacity: 1 - p, 
        transform: `scale(${1 - p * 0.1}) translateY(${-p * 50}vh)`, 
        pointerEvents: viewState === 'home' ? 'auto' : 'none' 
      }}>
        <ScrambledText text="WHAT IF" isScrambling={hovered === 1} className="line-1 text-line" onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)} onClick={() => onNavigate('detail')} />
        <TypewriterText initialText="MAKING" targetText="THINKING" isActive={hovered === 2} className="line-2 text-line" onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(null)} onClick={(w: string) => onNavigate('process', w)} />
        <ScrambledText text="IS A KIND OF" isScrambling={hovered === 3} className="line-3 text-line" onMouseEnter={() => setHovered(3)} onMouseLeave={() => setHovered(null)} onClick={() => onNavigate('detail')} />
        <TypewriterText initialText="THINKING" targetText="MAKING" isActive={hovered === 4} className="line-4 text-line" onMouseEnter={() => setHovered(4)} onMouseLeave={() => setHovered(null)} onClick={(w: string) => onNavigate('process', w)} />
      </div>

      <div className="view-layer archive-layout" style={{ 
        opacity: p, 
        transform: `scale(${0.9 + p * 0.1}) translateY(${(1 - p) * 50}vh)`, 
        pointerEvents: viewState === 'archive' ? 'auto' : 'none' 
      }}>
        {[
          { t: "METHODOLOGY_ARCHIVE", c: 'left' as const },
          { t: "WORK_ARCHIVE", c: 'right' as const },
          { t: "NOTE_ARCHIVE", c: 'right' as const }
        ].map((row, i) => (
          <div key={row.t} className={`archive-row ${archiveFocus !== null && archiveFocus !== i ? 'dimmed' : ''}`} 
            onMouseEnter={() => { setArchiveFocus(i); setCursor(row.c); }} 
            onMouseLeave={() => { setArchiveFocus(null); setCursor('default'); }}
            onClick={() => {
              if (i === 0) { setViewState('home'); setProgress(0); }
              else if (i === 1) onNavigate('work');
              else onNavigate('notes');
              setCursor('default');
            }}
          >
            <div className={`marquee-content ${archiveFocus === i ? 'slow' : 'fast'}`}>{(row.t + " _ ").repeat(8)}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default IndexView;
