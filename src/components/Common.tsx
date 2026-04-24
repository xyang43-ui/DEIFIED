import React, { useState, useEffect } from 'react';

const SYMBOLS = "!@#$%^&*()_+{}:\"<>?|[];',./`~".split("");

export const ScrambledText: React.FC<any> = ({ text, isScrambling, className = "", onClick, onMouseEnter, onMouseLeave, forceScramble = false, isFrozen = false }) => {
  const [disp, setDisp] = useState(text);
  useEffect(() => {
    if (isFrozen) {
      setDisp(text.split("").map((c: string) => (c === " " ? " " : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])).join(""));
      return;
    }
    if (isScrambling || forceScramble) {
      const id = setInterval(() => setDisp(text.split("").map((c: string) => (c === " " ? " " : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])).join("")), 50);
      return () => clearInterval(id);
    } else setDisp(text);
  }, [isScrambling, forceScramble, text, isFrozen]);
  return <div className={`text-line ${className}`} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{disp}</div>;
};

export const TypewriterText: React.FC<any> = ({ initialText, targetText, isActive, className = "", onClick, onMouseEnter, onMouseLeave }) => {
  const [disp, setDisp] = useState(initialText);
  useEffect(() => {
    if (isActive) {
      let i = 0;
      const maxLength = Math.max(initialText.length, targetText.length);
      const id = setInterval(() => { 
        if (i <= maxLength) { 
          setDisp(targetText.slice(0, i) + (i < initialText.length ? initialText.slice(i) : "")); 
          i++; 
        } else clearInterval(id); 
      }, 80);
      return () => clearInterval(id);
    } else setDisp(initialText);
  }, [isActive, initialText, targetText]);
  return <div className={`text-line ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => onClick(targetText)}>{disp}</div>;
};
