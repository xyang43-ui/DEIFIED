import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingImages from './FloatingImages';

interface ProcessViewProps {
  word: string;
}

const ProcessView: React.FC<ProcessViewProps> = ({ word }) => {
  const navigate = useNavigate();
  const [section, setSection] = useState(0); // 0, 1, 2
  const [pullProgress, setPullProgress] = useState(0); // 0 to 100
  const [isVisualFocused, setIsVisualFocused] = useState(false); // Track if an image/video is expanded
  const sectionRef = useRef(0);
  const lastSwitchTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 0,
      sources: ['voiced01.mp4', 'voiced02.jpg', 'voiced03.mp4'],
      content: (
        <>
          <p>This thesis comprises three projects.</p>
          <p style={{ marginTop: '1.5em' }}>I.</p>
          <p style={{ marginTop: '1.5em' }}>The first uses the software, TouchDesigner, a node-based, visual program designed for real-time interactive media, 3D graphics, and sound data manipulation. The project, “<i>VOICED</i>,” is a more substantial and ongoing process within my thesis journey. It has evolved into a framework for exploring communication between humans and machines through non-semantic sound. By introducing onomatopoeic vocal samples - extracted, sliced, and reassembled from AI-generated music - the system foregrounds how meaning can emerge without language. Gestures and interactions do not result in clear messages but in responses that feel almost communicative, highlighting moments of misunderstanding, delay, or repetition. This process aligns closely with my broader interest in sampling, recontextualization, and bootlegging as creative strategies: taking existing material apart and rebuilding it into something that resists singular authorship.</p>
        </>
      )
    },
    {
      id: 1,
      sources: ['屏幕截图 2026-03-05 123646.jpg', 'https://www.youtube.com/embed/I1N5WH3Rirg'],
      content: (
        <>
          <p>II.</p>
          <p style={{ marginTop: '1.5em' }}>The second is divided into two main parts. First, I built a Techno EDM capacitive touchpad prototype beat generator. Based on this small web-based Arduino prototype, I then developed the second part, <i>GESTURED</i>, which is a hand-interaction Techno EDM melody generator.</p>
          <p style={{ marginTop: '1.5em' }}>I don’t have any formal background in music theory, and I’ve never studied musical composition. The only things I really understand are very basic concepts like BPM and time signatures. So I asked AI about the typical track structure of Techno EDM music. From a beginner’s perspective, I simplified it into four tracks. These tracks can have their beats easily modified and are built from very basic low-frequency waveforms. With a few simple jumping wires soldered to a capacitive touchpad, signals are sent to the web interface to generate simple EDM beats.</p>
          <p style={{ marginTop: '1.5em' }}>Based on this small prototype, I felt confident enough to bring the idea into TouchDesigner. The goal was to replace the capacitive touch triggers with gesture-based interaction, allowing hand movements to trigger the system. In theory, this would allow non-experts to perform live Techno EDM using just their hands.</p>
          <p style={{ marginTop: '1.5em' }}>However, it quickly became clear that everything has to develop step by step. Gesture interaction is much more complex and can easily cause false triggers. With ten fingers involved, the system also requires a logical, efficient, and comfortable layout—something that is almost impossible to get right immediately. It requires repeated failures and iterations before a workable strategy and layout can gradually emerge. My initial idea of building the entire base melody system from scratch ultimately failed. Instead, it turned out that the system requires pre-existing sample tracks, which can then be controlled and modified using different filter parameters to engage all ten fingers as controls.</p>
          <p style={{ marginTop: '1.5em' }}>Within this generative project, my role as a designer is to create a tool that invites the audience to become new authors, allowing them to complete and perform their own unique versions of the composition.</p>
        </>
      )
    },
    {
      id: 2,
      sources: [
        'samplesong1.fold.mp4', 
        'samplesong1.gravity.mp4', 
        'samplesong1.mp4', 
        'samplesong1.tracking.mp4',
        'samplesong2.fold.mp4',
        'samplesong2.gravity.mp4',
        'samplesong2.mp4',
        'samplesong2.tracking.mp4'
      ],
      content: (
        <>
          <p>III.</p>
          <p style={{ marginTop: '1.5em' }}>The third project is called <i>COMPOSED</i>. It’s a web-based project where AI-generated music and AI onomatopoeic lyrics that I deconstructed are arranged and presented through different visual interactions controlled by the user’s mouse.</p>
          <p style={{ marginTop: '1.5em' }}>As users move and click their mouse, the lyrics appear on the screen in different visual forms and get combined into music in real time. The background track may be the same AI-generated piece that I rewrote, but because the deconstructed onomatopoeic lyrics are triggered at different positions and at different clicking frequencies, they randomly combine with the background music to form different compositions. Each interaction can therefore generate a unique music video with animated text.</p>
        </>
      )
    }
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If a visual is focused, we block scrolling/pulling entirely
      if (word !== 'THINKING' || isVisualFocused) return;

      const now = Date.now();
      if (now - lastSwitchTime.current < 1000) return;

      const container = containerRef.current;
      if (!container) return;

      const isAtTop = container.scrollTop <= 5;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      const currentSection = sectionRef.current;

      if (isAtBottom && e.deltaY > 0) {
        if (currentSection < sections.length - 1) {
          e.preventDefault();
          setPullProgress(prev => {
            const next = prev + Math.abs(e.deltaY) * 0.1;
            if (next >= 100) {
              const nextSec = currentSection + 1;
              sectionRef.current = nextSec;
              setSection(nextSec);
              lastSwitchTime.current = Date.now();
              container.scrollTop = 0;
              return 0;
            }
            return next;
          });
          return;
        }
      } else if (isAtTop && e.deltaY < 0) {
        if (currentSection > 0) {
          e.preventDefault();
          setPullProgress(prev => {
            const next = prev + Math.abs(e.deltaY) * 0.1;
            if (next >= 100) {
              const nextSec = currentSection - 1;
              sectionRef.current = nextSec;
              setSection(nextSec);
              lastSwitchTime.current = Date.now();
              container.scrollTop = 0;
              return 0;
            }
            return next;
          });
          return;
        }
      }
      
      if (pullProgress > 0) setPullProgress(0);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [word, sections.length, isVisualFocused]);

  useEffect(() => {
    setSection(0);
    sectionRef.current = 0;
    setPullProgress(0);
    setIsVisualFocused(false);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [word]);

  const [glitchWord, setGlitchWord] = useState('');

  const summaryText = `In summary, across these three projects, repetition functions not only as a visual or sonic device but as an endurance-based methodology. Rebuilding similar systems again and again, with multiple demo websites, iterative audio engines, and successive prototypes, reveals patterns in how I work, how I fail, and how intuition accumulates. Failure becomes informative rather than corrective. For example, unusable 3D prints, overlapping visual mappings, or barely perceptible audio differences are not endpoints, but data points that guide subsequent decisions. Another key thread is collectivity. My projects are designed to allow users to interact with them, remix, or generate new outputs, even when they do not fully understand the system. This raises questions around the notion of the designer as sole author. If a project is defined by a set of instructions, parameters, or rules, authorship becomes distributed. The work becomes relational and socially oriented, closer to a game or protocol than a fixed object. Ultimately, my thesis is less about mastering a specific medium than about developing a different way of working. TouchDesigner, web code, AI tools, and fabrication techniques are all treated as materials within a larger inquiry into how processes think for us, with us, and sometimes against us. Through repetition, I am not refining toward a single solution, but building a vocabulary of methods that allow complexity, ambiguity, and discovery to remain central to my design practice.`;
  const wordsArray = summaryText.split(/\s+/).filter(w => w.length > 0);

  useEffect(() => {
    if (word === 'THINKING') return;
    
    let i = 0;
    const interval = setInterval(() => {
      setGlitchWord(wordsArray[i % wordsArray.length].toUpperCase());
      i++;
    }, 200); // Slower cycle
    
    return () => clearInterval(interval);
  }, [word]);

  const renderContent = () => {
    if (word === 'THINKING') {
      return sections[section].content;
    } else {
      return (
        <>
          <p>In summary, across these three projects, repetition functions not only as a visual or sonic device but as an endurance-based methodology. Rebuilding similar systems again and again, with multiple demo websites, iterative audio engines, and successive prototypes, reveals patterns in how I work, how I fail, and how intuition accumulates. Failure becomes informative rather than corrective. For example, unusable 3D prints, overlapping visual mappings, or barely perceptible audio differences are not endpoints, but data points that guide subsequent decisions.</p>
          <p style={{ marginTop: '1.5em' }}>Another key thread is collectivity. My projects are designed to allow users to interact with them, remix, or generate new outputs, even when they do not fully understand the system. This raises questions around the notion of the designer as sole author. If a project is defined by a set of instructions, parameters, or rules, authorship becomes distributed. The work becomes relational and socially oriented, closer to a game or protocol than a fixed object.</p>
          <p style={{ marginTop: '1.5em' }}>Ultimately, my thesis is less about mastering a specific medium than about developing a different way of working. TouchDesigner, web code, AI tools, and fabrication techniques are all treated as materials within a larger inquiry into how processes think for us, with us, and sometimes against us. Through repetition, I am not refining toward a single solution, but building a vocabulary of methods that allow complexity, ambiguity, and discovery to remain central to my design practice.</p>
        </>
      );
    }
  };

  const currentSources = word === 'THINKING' ? sections[section].sources : [];

  const handleBackToIndex = (e: React.MouseEvent) => {
    if (isVisualFocused) {
      e.stopPropagation();
      return;
    }
    navigate('/');
  };

  const isMobile = window.innerWidth < 768;

  const handleNextSection = () => {
    if (section < sections.length - 1) {
      const nextSec = section + 1;
      sectionRef.current = nextSec;
      setSection(nextSec);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }
  };

  const handlePrevSection = () => {
    if (section > 0) {
      const nextSec = section - 1;
      sectionRef.current = nextSec;
      setSection(nextSec);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="view-layer process-layout">
      <div className="process-word" onClick={handleBackToIndex} style={{ 
        opacity: isVisualFocused ? 0.2 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        {word === 'THINKING' ? word : glitchWord}
        {word === 'THINKING' && (
          <div style={{ fontSize: '0.3em', marginTop: '1em', opacity: 0.5, textAlign: 'center' }}>
            SECTION {section + 1} / 3
          </div>
        )}
      </div>

      <FloatingImages sources={currentSources} onFocusChange={setIsVisualFocused} />
      
      {pullProgress > 0 && !isVisualFocused && (
        <div style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          [section === 0 || (section === 1 && pullProgress > 0 && containerRef.current && containerRef.current.scrollTop <= 5) ? 'top' : 'bottom']: '10vh',
          width: '2px',
          height: `${pullProgress * 0.5}vh`,
          backgroundColor: 'var(--fg-color)',
          zIndex: 1000,
          transition: 'height 0.1s ease-out'
        }} />
      )}

      {/* Mobile Section Navigation */}
      {isMobile && word === 'THINKING' && !isVisualFocused && (
        <div className="mobile-process-nav" style={{
          position: 'fixed',
          bottom: '100px',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 2000
        }}>
          {section > 0 && (
            <div className="nav-tab-btn" onClick={handlePrevSection}>
              [ PREV SECTION ]
            </div>
          )}
          {section < sections.length - 1 && (
            <div className="nav-tab-btn" onClick={handleNextSection}>
              [ NEXT SECTION ]
            </div>
          )}
        </div>
      )}

      <div className="process-text" ref={containerRef} style={{ 
        scrollBehavior: 'smooth', 
        opacity: isVisualFocused ? 0.2 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        {renderContent()}
        <div style={{ marginTop: '2em', cursor: 'pointer', opacity: 0.5 }} onClick={handleBackToIndex}>[ BACK TO INDEX ]</div>
      </div>
    </div>
  );
};

export default ProcessView;
