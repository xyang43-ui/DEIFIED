import React, { useState, useEffect, useRef } from 'react';

const NODE_DATA_MAP: Record<string, any[]> = {
  'root': [
    { 
      label: '[GENERATIVE EXPERIMENT]', 
      type: 'music', 
      content: 'A generative experiment uses simple rules to produce unpredictable outcomes.' 
    },
    {
      label: '[INTERACTIVE SITE]',
      type: 'interactive_site',
      content: 'Prototype sites using interaction to release and process emotions'
    },
    {
      label: '[SOUND]',
      type: 'sound',
      content: 'Music tracks and sound experiments across different media'
    }
  ],
  'sound': [
    { label: '[KEY SWITCH]', type: 'key_switch', content: 'A keyboard switch network mapping different effects and simulated natural sounds', image: '/KEYSWITCH.gif' },
    { label: '[MULTITRACK_V1]', type: 'multitrack_v1', content: 'An interactive multi-track audio-visual experience project', image: '/MULTITRACK_V1.gif' },
    { label: '[MULTITRACK_V2]', type: 'multitrack_v2', content: 'Multitrack v2 introduces a dual-layer track switching system', image: '/MULTITRACK_V2.png' }
  ],
  'key_switch': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/thesis-keyswitch/' }
  ],
  'multitrack_v1': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/multitrack_v1/' }
  ],
  'multitrack_v2': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/multitrack_v2/' }
  ],
  'interactive_site': [
    { label: '[MOSAIC]', type: 'mosaic', content: 'Flip each tile to explore visible and invisible fear', image: '/MOSAIC.gif' },
    { label: '[SENSORY]', type: 'sensory', content: "What's in the box?", image: '/SENSORY.gif' },
    { label: '[METAPHYSICAL]', type: 'metaphysical', content: 'An immersive dreamcore space exploring the fear of being watched', image: '/METAPHYSICAL.gif' },
    { label: '[VALLEY OF FEAR]', type: 'valley_of_fear', content: 'An interactive presentation website developed for a fear project', image: '/VALLEYOFFEAR.gif' },
    { label: '[ZOOMED]', type: 'zoomed', content: 'An interactive scrolling site with parallax layers over a dreamcore Windows-style background with surreal textures', image: '/ZOOMED.gif' }
  ],
  'mosaic': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/mosaic/' }
  ],
  'sensory': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/sensory/' }
  ],
  'metaphysical': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/metaphysical/' }
  ],
  'valley_of_fear': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/valley_of_fear/' }
  ],
  'zoomed': [
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://xyang43-ui.github.io/zoomed/' }
  ],
  'music': [
    { label: '[COMPOSED]', type: 'project', content: 'Web project: recomposed AI music, deconstructed onomatopoeic lyrics, mouse-controlled visuals', video: '/gravity_2.mp4' },
    { label: '[GESTURED]', type: 'gestured', content: 'A hand-interaction Techno EDM melody generator', image: '/gestured.gif' },
    { label: '[VOICED]', type: 'voiced', content: 'A hand-interaction reassembly of AI-generated music', video: '/images/voiced01.mp4' },
    { label: '[RANDOM]', type: 'random', content: 'A internet platform to generate, share, and explore random prompts for inspiration', image: '/random.gif' }
  ],
  'project': [
    { label: '[COLLECTIVITY]', type: 'keyword' },
    { label: '[ENDURANCE]', type: 'keyword' },
    { label: '[REPETITION]', type: 'keyword' },
    { label: '[AI]', type: 'keyword' },
    { label: '[DECONSTRUCTION]', type: 'keyword' },
    { label: '[INTERACTION]', type: 'keyword' },
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://thesis-webmv.vercel.app/?_vercel_share=STqY6jWJSpEquvJQK6yYnfgO4AE87Iqj' }
  ],
  'gestured': [
    { label: '[COLLECTIVITY]', type: 'keyword' },
    { label: '[SYMPHONY]', type: 'keyword' },
    { label: '[FINGER]', type: 'keyword' },
    { label: '[TOUCHDESIGNER]', type: 'keyword' },
    { label: '[AUTHOR]', type: 'keyword' },
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://youtu.be/I1N5WH3Rirg' }
  ],
  'voiced': [
    { label: '[COLLECTIVITY]', type: 'keyword' },
    { label: '[AI]', type: 'keyword' },
    { label: '[RECONTEXTUALIZATION]', type: 'keyword' },
    { label: '[GESTURE]', type: 'keyword' },
    { label: '[AUTHOR]', type: 'keyword' },
    { label: '[TOUCHDESIGNER]', type: 'keyword' }
  ],
  'random': [
    { label: '[COLLECTIVITY]', type: 'keyword' },
    { label: '[GENERATOR]', type: 'keyword' },
    { label: '[INTERACTIVE]', type: 'keyword' },
    { label: '[RANDOMNESS]', type: 'keyword' },
    { label: '[COMMUNITY]', type: 'keyword' },
    { label: '[URL]CLICK HERE TO REDIRECT.', type: 'link', url: 'https://random-prompt-generator.vercel.app?_vercel_share=jcOAr5rjwFT1gs9warBUw3s1D5nHsZ8S' }
  ]
};

const WorkView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [nodes, setNodes] = useState<any[]>([{ id: 'root', x: 0, y: 0, label: '[THESIS_CORE]', type: 'root', content: 'System initialized. Click to expand.' }]);
  const [transform, setTransform] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const dragDist = useRef(0);

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    dragDist.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
    dragDist.current += Math.sqrt(dx * dx + dy * dy);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = -e.deltaY * 0.001, newScale = Math.min(Math.max(0.2, transform.scale + delta), 3);
    const mX = e.clientX, mY = e.clientY, wX = (mX - transform.x) / transform.scale, wY = (mY - transform.y) / transform.scale;
    setTransform({ scale: newScale, x: mX - wX * newScale, y: mY - wY * newScale });
  };

  const toggleNode = (node: any) => {
    if (dragDist.current > 8) return;

    const getDescendantIds = (parentId: string, allNodes: any[]): string[] => {
      let ids: string[] = [];
      const children = allNodes.filter(n => n.parentId === parentId);
      children.forEach(child => {
        ids.push(child.id);
        ids = [...ids, ...getDescendantIds(child.id, allNodes)];
      });
      return ids;
    };

    if (nodes.some(n => n.parentId === node.id)) {
      const idsToRemove = getDescendantIds(node.id, nodes);
      setNodes(prev => prev.filter(n => !idsToRemove.includes(n.id)));
    } else {
      const sub = NODE_DATA_MAP[node.type];
      if (!sub) return;

      const timestamp = Date.now();
      
      // Calculate base angle from parent to current node
      let baseAngle = 0;
      const parentNode = nodes.find(n => n.id === node.parentId);
      if (parentNode) {
        baseAngle = Math.atan2(node.y - parentNode.y, node.x - parentNode.x);
      } else if (node.id === 'root') {
        baseAngle = -0.15; 
      }

      const newNodes: any[] = [];
      const currentNodes = [...nodes];
      
      sub.forEach((d, i) => {
        let bestX = 0;
        let bestY = 0;
        let placed = false;
        
        // Try up to 20 times to find a non-overlapping spot
        for (let attempt = 0; attempt < 20; attempt++) {
          const distance = 350 + Math.random() * 350;
          // Wider spread for more organic feel (+/- 120 degrees jittered)
          const angleJitter = (Math.random() - 0.5) * Math.PI * 1.5;
          const angle = baseAngle + angleJitter;
          
          const tx = node.x + Math.cos(angle) * distance;
          const ty = node.y + Math.sin(angle) * distance;
          
          // Check collision with ALL existing nodes and already placed new nodes
          const allPlaced = [...currentNodes, ...newNodes];
          const collision = allPlaced.some(n => {
            const dx = n.x - tx;
            const dy = n.y - ty;
            return Math.sqrt(dx * dx + dy * dy) < 250; // Min distance between nodes
          });
          
          if (!collision || attempt === 19) {
            bestX = tx;
            bestY = ty;
            placed = true;
            break;
          }
        }
        
        if (placed) {
          newNodes.push({
            ...d,
            id: `${node.id}-${i}-${timestamp}`,
            x: bestX,
            y: bestY,
            parentId: node.id
          });
        }
      });

      setNodes(prev => [...prev, ...newNodes]);

      // --- AUTO PAN & ZOOM LOGIC ---
      // Calculate the center of the new cluster
      const centerX = newNodes.reduce((acc, n) => acc + n.x, 0) / newNodes.length;
      const centerY = newNodes.reduce((acc, n) => acc + n.y, 0) / newNodes.length;

      // Responsive scale: much smaller on mobile to fit narrow screens
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 0.5 : 0.9;

      setTransform({
        x: window.innerWidth / 2 - centerX * targetScale,
        y: window.innerHeight / 2 - centerY * targetScale,
        scale: targetScale
      });
      }
      };

  return (
    <div className="view-layer work-layout" 
      onPointerDown={handlePointerDown} 
      onPointerMove={handlePointerMove} 
      onWheel={handleWheel}
    >
      <div id="work-ui">
        <div className="title">thesis_project_practice</div>
        <div className="status">DRAG: Pan | SCROLL: Zoom | CLICK: Expand</div>
        <div style={{ pointerEvents: 'auto', marginTop: '10px', cursor: 'pointer', opacity: 0.5 }} onClick={onBack}>[ EXIT ]</div>
      </div>
      <div style={{ 
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`, 
        transformOrigin: '0 0', 
        position: 'absolute', 
        willChange: 'transform',
        transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
        width: '100%',
        height: '100%'
      }}>
        <svg style={{ 
          position: 'absolute', 
          overflow: 'visible', 
          top: 0, 
          left: 0, 
          width: '1px', 
          height: '1px', 
          pointerEvents: 'none' 
        }}>
          {nodes.map(n => {
            if (!n.parentId) return null;
            const p = nodes.find(x => x.id === n.parentId);
            if (!p) return null;
            return (
              <g key={`${n.id}-group`}>
                <line 
                  x1={p.x} y1={p.y} 
                  x2={n.x} y2={n.y} 
                  className="graph-line"
                  style={{ 
                    stroke: 'var(--fg-color)', 
                    strokeWidth: 1, 
                    opacity: 0.6,
                    transition: 'all 0.5s ease'
                  }}
                />
                <circle cx={p.x} cy={p.y} r={4} fill="var(--fg-color)" />
                <circle cx={n.x} cy={n.y} r={4} fill="var(--fg-color)" />
              </g>
            );
          })}
        </svg>
        {nodes.map(n => {
          const isExpanded = nodes.some(x => x.parentId === n.id);
          const hasChildren = !!NODE_DATA_MAP[n.type];

          return (
            <div key={n.id} className={`graph-node ${isExpanded ? 'expanded' : ''}`} 
              style={{ 
                left: n.x, 
                top: n.y, 
                cursor: 'pointer',
                animation: 'node-appear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }} 
              onPointerDown={(e) => {
                e.stopPropagation();
                dragDist.current = 0; // Reset drag distance when clicking a node
                lastPos.current = { x: e.clientX, y: e.clientY };
                setIsDragging(true); // Allow dragging the view even starting from a node
              }} 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (n.type === 'link' && n.url) {
                  window.open(n.url, '_blank');
                } else {
                  toggleNode(n); 
                }
              }}
            >
              <div className="node-label">
                {n.label.includes('[') && n.label.includes(']') ? <b>{n.label}</b> : n.label} {hasChildren && (isExpanded ? '[ - ]' : '[ + ]')}
              </div>
              <div className="node-content">{n.content}</div>
              {n.video && <video className="node-video" src={n.video} autoPlay loop muted playsInline style={{ width: '100%', marginTop: '8px', pointerEvents: 'none' }} />}
              {n.image && <img className="node-video" src={n.image} alt="" style={{ width: '100%', marginTop: '8px', display: 'block', pointerEvents: 'none' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkView;
