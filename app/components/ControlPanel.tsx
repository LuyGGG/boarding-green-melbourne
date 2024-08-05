import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Safety Data</h3>
      <p>Explore more Safety Data from National Transport Performance Center</p>
      <div className="source-link">
        <a
          href="https://ntpc.arrb.com.au/road-safety.html"
          target="_new"
        >
          View Web ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);