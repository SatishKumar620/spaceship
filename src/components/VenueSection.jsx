import React from 'react';
import './VenueSection.css';

export default function VenueSection() {
  return (
    <section id="venue" className="venue-section">
      <div className="venue-bg-grid" />
      <div className="venue-glow-overlay cyan" />
      <div className="venue-glow-overlay magenta" />

      <div className="venue-inner">
        {/* Section Header */}
        <div className="venue-header" data-reveal="true">
          <div className="venue-eyebrow">
            <span className="site-hud-line"></span> DOCKING PROTOCOLS <span className="site-hud-line"></span>
          </div>
          <h2 className="venue-title">
            MISSION <span className="venue-title-accent">CONTROL</span>
          </h2>
          <p className="venue-desc">
            Establish connection with coordinates. Review docking bay details, timelines, and transit coordinates below.
          </p>
        </div>

        {/* Monolithic Dashboard */}
        <div className="venue-monolithic-dashboard">
          
          <div className="dashboard-header-bar">
            <div className="bar-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="bar-title">RVSCET_ORBITAL_STATION // DOCKING_BAY_01</div>
            <div className="bar-status">STATUS: ONLINE</div>
          </div>

          <div className="dashboard-grid">
            
            {/* Radar Panel */}
            <div className="dashboard-map-panel">
              <div className="map-wrapper">
                <iframe
                  title="RVSCET Jamshedpur Map"
                  src="https://www.google.com/maps?q=RVS+College+of+Engineering+and+Technology+Jamshedpur&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-overlay-scanline" />
                <div className="map-crosshair">
                  <div className="crosshair-v"></div>
                  <div className="crosshair-h"></div>
                </div>
              </div>
              <div className="map-footer">
                <span className="coord">LAT: 22.7844° N</span>
                <span className="coord">LNG: 86.2028° E</span>
              </div>
            </div>

            {/* Telemetry Panel */}
            <div className="dashboard-telemetry-panel">
              
              <div className="telemetry-block">
                <div className="block-label">TARGET VECTOR</div>
                <div className="block-value highlight">RVS College of Eng & Tech</div>
                <div className="block-sub">Jamshedpur, Jharkhand, India</div>
              </div>

              <div className="telemetry-divider"></div>

              <div className="telemetry-block">
                <div className="block-label">TEMPORAL WINDOW</div>
                <div className="block-value">Oct 7 - 8, 2025</div>
                <div className="block-sub">09:00 AM (Sol 1) to 09:00 AM (Sol 2)</div>
              </div>

              <div className="telemetry-divider"></div>

              <div className="telemetry-stats-row">
                <div className="stat-box">
                  <div className="stat-val">24H</div>
                  <div className="stat-lbl">SPRINT</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val">200+</div>
                  <div className="stat-lbl">CREW</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val">4</div>
                  <div className="stat-lbl">DOMAINS</div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=RVS+College+of+Engineering+and+Technology+Jamshedpur"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-action-btn"
              >
                <span>INITIALIZE NAV SYSTEM</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
