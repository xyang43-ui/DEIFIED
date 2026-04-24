import React, { useState, useEffect, useRef } from 'react';

interface ImagePhysics {
  id: string;
  src: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  element: HTMLElement | null;
  type: 'image' | 'video' | 'youtube';
}

interface FloatingImagesProps {
  sources: string[];
  onFocusChange?: (isFocused: boolean) => void;
}

const FloatingImages: React.FC<FloatingImagesProps> = ({ sources, onFocusChange }) => {
  const [items, setItems] = useState<ImagePhysics[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const physicsRef = useRef<ImagePhysics[]>([]);
  const requestRef = useRef<number>(0);
  const isExpandedRef = useRef<string | null>(null);
  
  const BASE_SPEED = 0.5; 

  // Helper to extract YouTube ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    isExpandedRef.current = expandedId;
    if (onFocusChange) onFocusChange(expandedId !== null);

    physicsRef.current.forEach(img => {
      if (img.type === 'video' && img.element instanceof HTMLVideoElement) {
        img.element.muted = expandedId !== img.id;
        if (expandedId === img.id) {
          img.element.play().catch(e => console.log("Audio play blocked", e));
        }
      }
    });
  }, [expandedId, onFocusChange]);

  // Sync state and physics ref when sources change
  useEffect(() => {
    const existing = new Map(physicsRef.current.map(p => [p.src, p]));
    
    const newItems: ImagePhysics[] = sources.map((src, i) => {
      const isYoutube = src.includes('youtube.com') || src.includes('youtu.be');
      const fullSrc = isYoutube ? src : (src.startsWith('/') ? src : `/images/${src}`);
      
      if (existing.has(fullSrc)) {
        return existing.get(fullSrc)!;
      }

      const isVideo = !isYoutube && src.toLowerCase().endsWith('.mp4');
      const width = (isVideo || isYoutube) ? 240 : 180 + Math.random() * 50;
      const height = (isVideo || isYoutube) ? 180 : 130 + Math.random() * 50;
      const angle = Math.random() * Math.PI * 2;
      
      return {
        id: `${fullSrc}-${i}`, // Stable ID
        src: fullSrc,
        x: window.innerWidth * (0.6 + Math.random() * 0.3),
        y: window.innerHeight * (0.1 + Math.random() * 0.8),
        vx: Math.cos(angle) * BASE_SPEED,
        vy: Math.sin(angle) * BASE_SPEED,
        width,
        height,
        element: null,
        type: isYoutube ? 'youtube' : (isVideo ? 'video' : 'image')
      };
    });

    setItems(newItems);
    physicsRef.current = newItems;
  }, [sources]);

  useEffect(() => {
    const update = () => {
      physicsRef.current.forEach(img => {
        if (!img.element || isExpandedRef.current === img.id) return;

        img.x += img.vx;
        img.y += img.vy;

        const lb = window.innerWidth / 2;
        const rb = window.innerWidth - img.width;
        const tb = 0;
        const bb = window.innerHeight - img.height;

        if (img.x < lb) { img.x = lb; img.vx = Math.abs(img.vx); }
        if (img.x > rb) { img.x = rb; img.vx = -Math.abs(img.vx); }
        if (img.y < tb) { img.y = tb; img.vy = Math.abs(img.vy); }
        if (img.y > bb) { img.y = bb; img.vy = -Math.abs(img.vy); }

        img.element.style.transform = `translate3d(${img.x}px, ${img.y}px, 0)`;
      });
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      {expandedId && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, cursor: 'pointer'
          }} 
          onClick={() => setExpandedId(null)}
        />
      )}

      {items.map((img) => {
        const isExpanded = expandedId === img.id;
        
        const style: React.CSSProperties = {
          position: 'fixed',
          left: 0,
          top: 0,
          width: isExpanded ? '100vw' : `${img.width}px`,
          height: isExpanded ? '100vh' : 'auto',
          objectFit: 'contain',
          backgroundColor: isExpanded ? 'black' : 'transparent',
          border: isExpanded ? 'none' : '1px solid var(--fg-color)',
          opacity: isExpanded ? 1 : (expandedId ? 0 : 0.8),
          pointerEvents: isExpanded ? 'auto' : (expandedId ? 'none' : 'auto'),
          zIndex: isExpanded ? 2100 : 500,
          cursor: 'pointer',
          transition: isExpanded || !expandedId ? 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), width 0.8s cubic-bezier(0.19, 1, 0.22, 1), height 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease' : 'none',
          transform: isExpanded ? 'translate3d(0, 0, 0)' : `translate3d(${img.x}px, ${img.y}px, 0)`,
        };

        const handleClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          setExpandedId(prev => (prev === img.id ? null : img.id));
        };

        if (img.type === 'video') {
          return (
            <video 
              key={img.id} 
              ref={el => { img.element = el; }} 
              src={img.src} 
              onClick={handleClick} 
              style={style} 
              autoPlay 
              muted
              loop 
              playsInline 
            />
          );
        }

        if (img.type === 'youtube') {
          const ytId = getYoutubeId(img.src);
          // 0.jpg is the most reliable fallback thumbnail for unlisted videos
          const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/0.jpg` : null;

          return (
            <div 
              key={img.id} 
              ref={el => { img.element = el; }} 
              onClick={handleClick}
              style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: isExpanded ? 'black' : 'rgba(var(--fg-rgb), 0.1)',
                height: isExpanded ? '100vh' : 'auto'
              }}
            >
              {isExpanded && (
                <div 
                  onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                  style={{
                    position: 'fixed',
                    top: '40px',
                    right: '40px',
                    zIndex: 2200,
                    color: 'var(--fg-color)',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '10px 20px',
                    border: '1px solid var(--fg-color)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  [ CLOSE_X ]
                </div>
              )}

              {isExpanded ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${img.src}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 'none' }}
                ></iframe>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {thumbUrl ? (
                    <img 
                      src={thumbUrl} 
                      alt="YouTube Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
                      onError={(e) => {
                        // If 0.jpg somehow fails, fallback to mqdefault
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
                      }}
                    />
                  ) : (
                    <div style={{ color: 'var(--fg-color)', fontSize: '0.8rem', textAlign: 'center' }}>[ YOUTUBE_VIDEO ]</div>
                  )}
                  <div style={{ 
                    position: 'absolute', 
                    color: 'var(--fg-color)', 
                    fontSize: '0.6rem', 
                    background: 'rgba(0,0,0,0.7)', 
                    padding: '4px 8px',
                    border: '1px solid var(--fg-color)',
                    fontFamily: 'var(--font-mono)',
                    pointerEvents: 'none'
                  }}>
                    PLAY_STREAM
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <img 
            key={img.id} 
            ref={el => { img.element = el; }} 
            src={img.src} 
            alt="" 
            onClick={handleClick} 
            style={style} 
          />
        );
      })}
    </>
  );
};

export default FloatingImages;
