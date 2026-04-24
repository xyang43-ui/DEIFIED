import React, { useState, useEffect, useRef } from 'react';
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
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    const scroll = (e: WheelEvent) => {
      setProgress(prev => {
        const next = Math.min(Math.max(prev + e.deltaY * 0.8, 0), 1000);
        if (next >= 1000) setViewState('archive');
        if (next <= 0) setViewState('home');
        return next;
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].pageY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].pageY;
      const deltaY = (touchStartY.current - touchY) * 2; // Sensitivity
      touchStartY.current = touchY;

      setProgress(prev => {
        const next = Math.min(Math.max(prev + deltaY * 4, 0), 1000);
        if (next >= 1000) setViewState('archive');
        if (next <= 0) setViewState('home');
        return next;
      });

      // Prevent native scroll/bounce
      if (e.cancelable) e.preventDefault();
    };

    window.addEventListener('wheel', scroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', scroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const p = progress / 1000;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none', overflow: 'hidden' }}>
      <div className="custom-scrollbar"><div className="scrollbar-thumb" style={{ height: `${p * 100}%` }} /></div>
      
      <div className="view-layer home-layout mobile-stack" style={{ 
        opacity: 1 - p, 
        transform: `scale(${1 - p * 0.1}) translateY(${-p * 50}vh)`, 
        pointerEvents: viewState === 'home' ? 'auto' : 'none',
        visibility: p > 0.99 ? 'hidden' : 'visible'
      }}>
        <ScrambledText text="WHAT IF" isScrambling={hovered === 1} className="line-1 text-line" onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)} onClick={() => onNavigate('detail')} />
        <TypewriterText initialText="MAKING" targetText="THINKING" isActive={hovered === 2} className="line-2 text-line" onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(null)} onClick={(w: string) => onNavigate('process', w)} />
        <ScrambledText text="IS A KIND OF" isScrambling={hovered === 3} className="line-3 text-line" onMouseEnter={() => setHovered(3)} onMouseLeave={() => setHovered(null)} onClick={() => onNavigate('detail')} />
        <TypewriterText initialText="THINKING" targetText="MAKING" isActive={hovered === 4} className="line-4 text-line" onMouseEnter={() => setHovered(4)} onMouseLeave={() => setHovered(null)} onClick={(w: string) => onNavigate('process', w)} />
      </div>

      <div className="view-layer archive-layout" style={{ 
        opacity: p, 
        transform: `scale(${0.9 + p * 0.1}) translateY(${(1 - p) * 50}vh)`, 
        pointerEvents: viewState === 'archive' ? 'auto' : 'none',
        visibility: p < 0.01 ? 'hidden' : 'visible'
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
              if (i === 0) { setProgress(0); setViewState('home'); }
              else if (i === 1) onNavigate('work');
              else onNavigate('notes');
              setCursor('default');
            }}
          >
            <div className={`marquee-content ${archiveFocus === i ? 'slow' : 'fast'}`}>{(row.t + " _ ").repeat(8)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexView;
