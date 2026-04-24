import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface ProjectMetadata {
  id: string;
  title: string;
  date: string;
  tool: string;
  status: string;
  type: string;
  description: string;
}

// Mock Database for Projects
const PROJECTS_DB: Record<string, ProjectMetadata> = {
  'PRC-001': {
    id: 'PRC-001',
    title: 'Hand-Controlled Techno Interface',
    date: '2026.03',
    tool: 'TouchDesigner / MediaPipe',
    status: 'ACTIVE',
    type: 'Interactive System',
    description: 'A real-time, gesture-controlled musical instrument. The system uses MediaPipe hand tracking to allow a performer to "conduct" a Techno EDM track using two hands. This project explores the friction between human gesture and digital precision.'
  },
  'PRC-002': {
    id: 'PRC-002',
    title: 'Processing as Methodology',
    date: '2026.03',
    tool: 'React / TypeScript / Vite',
    status: 'IN_PROGRESS',
    type: 'Web Narrative',
    description: 'The main thesis vessel. It documents and reflects on a large volume of project work to extract and define a cohesive Design Methodology. The site itself is an embodiment of the methodology: structured, data-informed, and transparent.'
  }
};

const ProjectEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? PROJECTS_DB[id] : null;

  if (!project) {
    return (
      <div className="mono" style={{ padding: 'var(--gap)', color: 'var(--accent-color)' }}>
        [ ERROR: PROJECT_ID_NOT_FOUND ]
        <br />
        <Link to="/" style={{ textDecoration: 'underline' }}>{'>'} RETURN_TO_BASE</Link>
      </div>
    );
  }

  return (
    <div className="project-entry">
      {/* METADATA HEADER GRID */}
      <header className="entry-header mono" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1px', 
        background: 'var(--border-color)',
        border: '1px solid var(--border-color)',
        marginBottom: '48px'
      }}>
        {[
          { label: 'IDENTIFIER', value: project.id },
          { label: 'DATE_STAMP', value: project.date },
          { label: 'TOOL_CHAIN', value: project.tool },
          { label: 'PROCESS_STATUS', value: project.status },
          { label: 'OUTPUT_TYPE', value: project.type }
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--bg-color)', padding: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--dim-color)', marginBottom: '4px' }}>// {item.label}</div>
            <div style={{ fontSize: '14px' }}>{item.value}</div>
          </div>
        ))}
      </header>

      {/* PROJECT TITLE */}
      <h2 className="all-caps" style={{ fontSize: 'var(--fs-l)', marginBottom: '24px', borderLeft: '4px solid var(--accent-color)', paddingLeft: '16px' }}>
        {project.title}
      </h2>

      {/* MEDIA PLACEHOLDER */}
      <div className="entry-media" style={{ 
        width: '100%', 
        aspectRatio: '16/9', 
        background: 'var(--dim-color)', 
        border: '1px solid var(--border-color)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '32px',
        position: 'relative'
      }}>
        <div className="mono" style={{ fontSize: 'var(--fs-s)', textAlign: 'center' }}>
          [ NO_MEDIA_LOADED ]
          <br />
          <span style={{ opacity: 0.5 }}>// REFERENCE: ASSET_LIB/{project.id}_v01.MOV</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="entry-description" style={{ maxWidth: '700px', marginBottom: '64px' }}>
        <h3 className="mono" style={{ fontSize: 'var(--fs-s)', color: 'var(--dim-color)', marginBottom: '16px' }}>
          // PROJECT_BRIEF
        </h3>
        <p style={{ fontSize: 'var(--fs-m)', lineHeight: '1.7' }}>
          {project.description}
        </p>
      </section>

      {/* TERMINAL FOOTER DATA */}
      <footer className="entry-footer mono" style={{ 
        paddingTop: '24px', 
        borderTop: '1px solid var(--dim-color)',
        fontSize: '10px',
        color: 'var(--dim-color)',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>SYSTEM_REF: {project.id}_ALPHA_RELEASE</span>
        <span>LAST_MODIFIED: {new Date().toISOString()}</span>
      </footer>
    </div>
  );
};

export default ProjectEntry;
