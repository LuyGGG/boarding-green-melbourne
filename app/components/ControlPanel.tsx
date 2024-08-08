import * as React from 'react';
import styles from '../styles/SafetyData.module.css';

function ControlPanel() {
  const handleLinkClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to leave this page?');
    if (confirmed) {
      // If confirmed, proceed to the link
      window.open('https://ntpc.arrb.com.au/road-safety.html', '_blank');
    }
  };

  return (
    <div className={styles.controlPanel}>
      <div style={{ width: '100%', height: 'auto' }}>
        <img src="/more-data.png" alt="More Data" style={{ width: '100%', height: 'auto' }} />
      </div>
      <p>If you are interested in getting more safety insights about cycling in Melbourne, please visit the National Transport Performance Centre.</p>
      <div className="source-link">
        <div className={styles.controlButton}>
          <a 
            href="https://ntpc.arrb.com.au/road-safety.html"
            target="_blank"
            onClick={handleLinkClick} // Attach the click handler
          >
            View Web ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
