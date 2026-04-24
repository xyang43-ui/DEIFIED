import React, { useState, useEffect, useRef } from 'react';

interface SectionProps {
  id: string;
  title: string;
  content: string;
  hasIllustration?: boolean;
  images?: string[];
  onOpenGallery?: (id: string, images: string[]) => void;
  index: number;
}

const Section: React.FC<SectionProps> = ({ id, title, content, hasIllustration, images, onOpenGallery, index }) => {
  const [transform, setTransform] = useState({ y: 0, x: 0, scale: 1, opacity: 1 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const dist = rect.top + rect.height / 2 - centerY;
        
        const isMobile = window.innerWidth <= 768;
        const speedY = (index % 3 + 1) * (isMobile ? 0.1 : 0.2);
        const speedX = (index % 2 === 0 ? 1 : -1) * (isMobile ? 0.03 : 0.08);
        
        const scale = Math.max(0.65, 1 - Math.abs(dist) / (window.innerHeight * 0.8));
        const opacity = Math.max(0.2, 1 - Math.abs(dist) / (window.innerHeight * 0.5));
        
        setTransform({ y: dist * speedY, x: dist * speedX, scale, opacity });
      }
    };

    const parent = document.querySelector('.statement-overlay');
    if (parent) {
      parent.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => parent.removeEventListener('scroll', handleScroll);
    }
  }, [index]);

  return (
    <article 
      ref={sectionRef}
      className="statement-section parallax-item" 
      style={{ 
        marginBottom: '20vh', 
        maxWidth: '650px',
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
        opacity: transform.opacity,
        marginLeft: index % 2 === 0 ? '2vw' : 'auto',
        marginRight: index % 2 === 0 ? 'auto' : '2vw',
        transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.15s ease-out',
        pointerEvents: transform.opacity < 0.3 ? 'none' : 'auto'
      }}
    >
      <header className="mono glow" style={{ color: 'var(--fg-color)', fontSize: 'var(--fs-s)', marginBottom: '12px' }}>
        {'>'} SECTION_{id} // {title}
      </header>
      <div className="section-body" style={{ 
        fontSize: 'var(--fs-m)', 
        lineHeight: '1.7', 
        background: 'rgba(0,0,0,0.85)', 
        padding: '32px',
        border: '1px solid var(--border-color)',
        boxShadow: `0 0 ${20 * transform.scale}px rgba(51, 255, 51, 0.15)`
      }}>
        {content}
      </div>
      {hasIllustration && (
        <button 
          className="mono glow" 
          onClick={() => onOpenGallery?.(id, images || [])}
          style={{ 
            marginTop: '20px', 
            background: 'none', 
            border: '1px solid var(--border-color)', 
            color: 'var(--fg-color)',
            padding: '8px 18px',
            fontSize: 'var(--fs-s)',
            cursor: 'pointer'
          }}
        >
          [ EXECUTE_IMAGE_LOG ]
        </button>
      )}
    </article>
  );
};

const StatementView: React.FC<{ onOpenGallery: (id: string, images: string[]) => void }> = ({ onOpenGallery }) => {
  const sections = [
    {
      id: '01',
      title: 'THE_CURATORIAL_STANCE',
      content: 'Designers are a kind of curator, collagist, VJs working with found materials from the cultural sphere. For my thesis, I lean into this idea by embracing the iterative process as methodology. I select my source material from mundane everyday things (such as songs, images, and toys) and transform these into something new through the processes that I construct. My methods dance between material and digital processes and embrace the changes that emerge in translation.\n\nMy research through making explores the patterns, habits, and small evolutions that shape how we create. Each piece along the journey becomes a checkpoint. Making is a way of thinking. Each act of design becomes a moment of reflection: not after the work is done, but right in the middle of it. The process is a conversation between the hand, the material, and the act of making.'
    },
    {
      id: '02',
      title: 'RULES_&_LOGIC',
      content: 'A recurring procedure is the use of rules, constraints, and conditional logic, such as TouchDesigner patches, generative websites, AI music workflows, or physical systems like cheating dice and A/B-testing mazes. These processes operate independently once set in motion. They are often incomplete or unstable by design. I am less interested in optimization than in observing what emerges when control is partially handed over to algorithms, materials, or users. In this way, my role shifts from author to curator or facilitator, assembling conditions rather than prescribing outcomes.\n\nThis thesis comprises X number of projects.'
    },
    {
      id: '03',
      title: 'SOFTWARE_NODES',
      content: 'The first uses the software, TouchDesigner, a node-based, visual program designed for real-time interactive media, 3D graphics, and sound data manipulation. The project, “Untitled” is a more substantial and ongoing process within my thesis journey. It has evolved into a framework for exploring communication between humans and machines through non-semantic sound. By introducing onomatopoeic vocal samples - extracted, sliced, and reassembled from AI-generated music - the system foregrounds how meaning can emerge without language. Gestures and interactions do not result in clear messages but in responses that feel almost communicative, highlighting moments of misunderstanding, delay, or repetition. This process aligns closely with my broader interest in sampling, recontextualization, and bootlegging as creative strategies: taking existing material apart and rebuilding it into something that resists singular authorship.',
      hasIllustration: true,
      images: ['TD_UNTITLED_01.PNG', 'TD_UNTITLED_NODE_GRAPH.PNG', 'TD_UNTITLED_SPECTRAL.PNG']
    },
    { id: '04', title: 'LOGIC_FLOW', content: '[ CORE_LOGIC_PENDING_REVIEW ]', hasIllustration: true, images: ['FLOW_01.PNG', 'FLOW_02.PNG'] },
    { id: '05', title: 'INTERFACE_TEST', content: '[ INTERACTION_PATTERN_OBSERVED ]', hasIllustration: true, images: ['TEST_A.PNG', 'TEST_B.PNG', 'TEST_C.PNG'] },
    { id: '06', title: 'SYNTHETIC_SOUND', content: '[ SPECTRAL_ANALYSIS_LOGGED ]', hasIllustration: true, images: ['AUDIO_WAVE_01.PNG'] },
    { id: '07', title: 'VISUAL_FEEDBACK', content: '[ RENDERING_PIPELINE_STABLE ]', hasIllustration: true, images: ['RENDER_01.PNG', 'RENDER_02.PNG'] },
    {
      id: '08',
      title: 'REPETITION_AS_ENDURANCE',
      content: 'Across projects, repetition functions not only as a visual or sonic device but as an endurance-based methodology. Rebuilding similar systems again and again, with multiple demo websites, iterative audio engines, successive prototypes, reveals patterns in how I work, how I fail, and how intuition accumulates. Failure becomes informative rather than corrective. For example, unusable 3D prints, overlapping visual mappings, or barely perceptible audio differences are not endpoints but data points that guide subsequent decisions.'
    },
    {
      id: '09',
      title: 'COLLECTIVITY',
      content: 'Another key thread is collectivity. Many projects are designed to allow users to interact with them, remix, or generate new outputs, even when they do not fully understand the system. This raises questions around the notion of the designer as sole author. If a project is defined by a set of instructions, parameters, or rules, authorship becomes distributed. The work becomes relational and socially oriented, closer to a game or protocol than a fixed object.'
    },
    {
      id: '10',
      title: 'CONCLUSION',
      content: 'Ultimately, my thesis is less about mastering a specific medium than about developing a different way of working. TouchDesigner, web code, AI tools, and fabrication techniques are all treated as materials within a larger inquiry into how processes think for us, with us, and sometimes against us. Through repetition, I am not refining toward a single solution, but building a vocabulary of methods that allow complexity, ambiguity, and discovery to remain central to my design practice.'
    }
  ];

  return (
    <div className="statement-container" style={{ paddingTop: '15vh', paddingBottom: '40vh' }}>
      {sections.map((section, idx) => (
        <Section 
          key={section.id} 
          index={idx}
          {...section} 
          onOpenGallery={onOpenGallery}
        />
      ))}
    </div>
  );
};

export default StatementView;
