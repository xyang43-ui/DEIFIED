import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATABASE } from '../data/projects';

const ArchiveView: React.FC = () => {
  // Generate pseudo-log data based on projects
  const logEntries = Object.values(PROJECTS_DATABASE).map((p, index) => ({
    hash: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
    projectId: p.id,
    timestamp: p.date.replace('.', '-'),
    version: `v${(index % 3) + 1}.0.${Math.floor(Math.random() * 9)}`,
    status: p.status
  }));

  return (
    <div className="archive-view mono">
      <header style={{ marginBottom: '32px' }}>
        <h2 className="all-caps" style={{ fontSize: 'var(--fs-l)', color: 'var(--accent-color)' }}>
          {'>'} PROCESS_ARCHIVE_LOGS
        </h2>
        <div style={{ color: 'var(--dim-color)', fontSize: 'var(--fs-s)' }}>
          // RAW_SYSTEM_DATA_RETRIEVED: {logEntries.length} ENTRIES_FOUND
        </div>
      </header>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--dim-color)' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>// HASH</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>PROJECT_ID</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>TIMESTAMP</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }} className="hide-mobile">VERSION</th>
            <th style={{ textAlign: 'right', padding: '12px 8px' }}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {logEntries.map(entry => (
            <tr 
              key={entry.hash} 
              style={{ borderBottom: '1px solid var(--dim-color)', cursor: 'default' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dim-color)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={{ padding: '12px 8px', color: 'var(--fg-color)' }}>{entry.hash}</td>
              <td style={{ padding: '12px 8px' }}>
                <Link to={`/project/${entry.projectId}`} style={{ textDecoration: 'underline' }}>
                  {entry.projectId}
                </Link>
              </td>
              <td style={{ padding: '12px 8px' }}>{entry.timestamp}</td>
              <td style={{ padding: '12px 8px' }} className="hide-mobile">{entry.version}</td>
              <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '11px', opacity: 0.8 }}>
                [{entry.status}]
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer style={{ marginTop: '48px', color: 'var(--dim-color)', fontSize: '11px' }}>
        *** END OF ARCHIVE LOG ***
        <br />
        SECURE_CONNECTION_ESTABLISHED // METHODOLOGY_V1.0
      </footer>
    </div>
  );
};

export default ArchiveView;
