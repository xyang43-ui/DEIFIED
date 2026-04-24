import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import IndexView from './components/IndexView';
import CustomCursor from './components/CustomCursor';
import WorkView from './components/WorkView';
import NotesView from './components/NotesView';
import ArchiveView from './components/ArchiveView';
import StatementView from './components/StatementView';
import ProcessView from './components/ProcessView';
import { ScrambledText } from './components/Common';

const App: React.FC = () => {
  const [word, setWord] = useState('');
  const [cursor, setCursor] = useState<'left' | 'right' | 'default'>('default');
  const [time, setTime] = useState(new Date());
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    const tid = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(tid); 
  }, []);

  const getTheme = () => {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const totalMinutes = h * 60 + m + s / 60;
    
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

    let bg = [0, 0, 0];
    let fg = [0, 255, 0];

    // Define specific windows in minutes
    const sunriseStart = 6 * 60 + 45; // 06:45
    const sunriseEnd = 6 * 60 + 55;   // 06:55
    const afternoonStart = 16 * 60;   // 16:00
    const afternoonEnd = 19 * 60;     // 19:00
    const sunsetStart = 19 * 60 + 45; // 19:45
    const sunsetEnd = 19 * 60 + 55;   // 19:55

    if (totalMinutes < sunriseStart) {
      // Night
      bg = [0, 0, 0]; fg = [0, 255, 0];
    } else if (totalMinutes < sunriseEnd) {
      // Sunrise Transition (10 mins)
      const t = clamp((totalMinutes - sunriseStart) / 10);
      bg = [lerp(0, 255, t), lerp(0, 255, t), lerp(0, 255, t)];
      fg = [lerp(0, 255, t), lerp(255, 0, t), 0];
    } else if (totalMinutes < afternoonStart) {
      // Full Day
      bg = [255, 255, 255]; fg = [255, 0, 0];
    } else if (totalMinutes < afternoonEnd) {
      // Afternoon Transition (3 hours)
      const t = clamp((totalMinutes - afternoonStart) / 180);
      bg = [lerp(255, 198, t), lerp(255, 204, t), lerp(255, 204, t)];
      fg = [255, lerp(0, 119, t), lerp(0, 13, t)];
    } else if (totalMinutes < sunsetStart) {
      // Stable Afternoon
      bg = [198, 204, 204]; fg = [255, 119, 13];
    } else if (totalMinutes < sunsetEnd) {
      // Sunset Transition (10 mins)
      const t = clamp((totalMinutes - sunsetStart) / 10);
      bg = [lerp(198, 0, t), lerp(204, 0, t), lerp(204, 0, t)];
      fg = [lerp(255, 0, t), lerp(119, 255, t), lerp(13, 0, t)];
    } else {
      // Back to Night
      bg = [0, 0, 0]; fg = [0, 255, 0];
    }
    
    return { 
      '--bg-color': `rgb(${bg[0]},${bg[1]},${bg[2]})`, 
      '--fg-color': `rgb(${fg[0]},${fg[1]},${fg[2]})`, 
      '--fg-rgb': `${fg[0]},${fg[1]},${fg[2]}`, 
      '--bg-rgb': `${bg[0]},${bg[1]},${bg[2]}` 
    } as React.CSSProperties;
  };

  const handleNavigate = (newView: string, selectedWord?: string) => {
    if (selectedWord) setWord(selectedWord);
    if (newView === 'index') navigate('/');
    else navigate(`/${newView}`);
  };

  const isIndex = location.pathname === '/';

  return (
    <div className="app-container" style={getTheme()}>
      <CustomCursor type={cursor} />
      
      <Routes>
        <Route path="/" element={<IndexView onNavigate={handleNavigate} setCursor={setCursor} />} />
        <Route path="/work" element={<WorkView onBack={() => navigate('/')} />} />
        <Route path="/notes" element={<NotesView onBack={() => navigate('/')} />} />
        <Route path="/archive" element={<ArchiveView />} />
        <Route path="/statement" element={<StatementView onOpenGallery={() => {}} />} />
        
        <Route path="/detail" element={
          <div className="view-layer detail-layout">
            <div className="detail-left">
              <ScrambledText text="WHAT IF" isFrozen={true} isScrambling={false} onClick={() => navigate('/')} />
              <ScrambledText text="IS A KIND OF" isFrozen={true} isScrambling={false} onClick={() => navigate('/')} />
            </div>
            <div className="detail-right">
              <h2 style={{ marginBottom: '1.5em', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DEIFIED: Exploring process-oriented making using AI-generated content</h2>
              <p>Designers are a kind of curator, collagist, VJs working with found materials from the cultural sphere. For my thesis, I lean into this idea by embracing the iterative process as methodology. I select my source material from mundane everyday things (such as songs, images, and toys) and transform these into something new through the processes that I construct. My methods dance between material and digital processes and embrace the changes that emerge in translation.</p>
              <p style={{ marginTop: '1.5em' }}>My research through making explores the patterns, habits, and small evolutions that shape how we create. Each piece along the journey becomes a checkpoint. Making is a way of thinking. Each act of design becomes a moment of reflection: not after the work is done, but right in the middle of it. The process is a conversation between the hand, the material, and the act of making.</p>
              <p style={{ marginTop: '1.5em' }}>A recurring procedure is the use of rules, constraints, and conditional logic, such as TouchDesigner patches, generative websites, AI music workflows, or physical systems like cheating dice and A/B-testing mazes. Once set in motion, these processes operate independently. They are often incomplete or unstable by design. I am less interested in optimization than in observing what emerges when control is partially handed over to algorithms, materials, or users. In this way, my role shifts from author to curator or facilitator, assembling conditions rather than prescribing outcomes.</p>
              <div style={{ marginTop: '2em', cursor: 'pointer', opacity: 0.5 }} onClick={() => navigate('/')}>[ BACK TO INDEX ]</div>
            </div>
          </div>
        } />
        
        <Route path="/process" element={<ProcessView word={word} />} />
      </Routes>

      <div className="footer" style={{ opacity: isIndex ? 1 : 0.2 }}>
        &gt; xinyi yang {time.toLocaleTimeString('en-GB', { hour12: false })} {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </div>
    </div>
  );
};

export default App;
