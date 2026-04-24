import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery: React.FC<{ 
  id: string; 
  images: string[]; 
  onClose: () => void 
}> = ({ id, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fullscreen-gallery"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.95)', zIndex: 5000,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      {/* GALLERY METADATA (Parallax) */}
      <motion.div 
        animate={{ x: currentIndex * -20 }}
        className="mono"
        style={{ position: 'absolute', top: '100px', left: '20px', color: 'var(--accent-color)', fontSize: '10px', zIndex: 5001 }}
      >
        // VIEWPORT_ARCHIVE: {id} // IMG_{currentIndex + 1}_OF_{images.length}
      </motion.div>

      {/* IMAGE SLIDER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="gallery-image-container"
          style={{ width: '90vw', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{
            width: '100%', height: '100%', background: '#111',
            border: '1px solid var(--accent-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(51, 255, 51, 0.2)',
            position: 'relative'
          }}>
            <div className="mono glow" style={{ fontSize: '18px', textAlign: 'center', padding: '20px' }}>
              [ DATA_BLOCK: {images[currentIndex]} ]
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CONTROLS */}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '10vh', display: 'flex', gap: '40px', zIndex: 5002 }}>
          <button onClick={prev} style={{ background: 'none', border: '1px solid var(--accent-color)', color: 'var(--fg-color)', padding: '10px' }}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} style={{ background: 'none', border: '1px solid var(--accent-color)', color: 'var(--fg-color)', padding: '10px' }}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div className="mono" style={{ position: 'absolute', bottom: '40px', color: 'var(--dim-color)', fontSize: '9px' }}>
        // TAP_ANYWHERE_TO_EXIT_LOG //
      </div>
    </motion.div>
  );
};
