import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC<{ type: 'left' | 'right' | 'default' }> = ({ type }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  if (type === 'default') return null;
  return (
    <div className={`custom-cursor ${type === 'right' ? 'solid' : ''}`} style={{ left: pos.x, top: pos.y }}>
      {type === 'left' && <svg className="cursor-arrow" viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>}
      {type === 'right' && <svg className="cursor-arrow" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>}
    </div>
  );
};

export default CustomCursor;
