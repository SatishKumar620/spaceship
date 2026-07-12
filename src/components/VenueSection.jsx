import React from 'react';
import './VenueSection.css';

export default function VenueSection() {
  return (
    <section id="venue" className="venue-section">
      <div className="venue-bg-grid" />
      <div className="venue-glow-overlay" />

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

        {/* Telemetry Dashboard Grid */}
        <div className="venue-dashboard">
          
          {/* Left Panel: Telemetry HUD */}
          <div className="telemetry-panel" data-reveal="true">
            <div className="panel-header">
              <div className="panel-dot"></div>
              <h3>SYS_TELEMETRY_LOG</h3>
              <div className="panel-code">ID: RVSCET-JSR</div>
            </div>
            
            <div className="telemetry-grid">
              <div className="telemetry-item">
                <div className="item-label">SECTOR / DESTINATION</div>
                <div className="item-value">RVS College of Engineering & Technology</div>
                <div className="item-sub">Jamshedpur, Jharkhand, India</div>
              </div>

              <div className="telemetry-item">
                <div className="item-label">TEMPORAL WINDOW</div>
                <div className="item-value">October 7 - 8, 2025</div>
                <div className="item-sub">Sol 01 (09:00 AM) - Sol 02 (09:00 AM)</div>
              </div>

              <div className="telemetry-row-split">
                <div className="telemetry-item">
                  <div className="item-label">MISSION DURATION</div>
                  <div className="item-value">24 Hours</div>
                  <div className="item-sub">Non-stop sprint</div>
                </div>

                <div className="telemetry-item">
                  <div className="item-label">CREW CAPACITY</div>
                  <div className="item-value">200+ Hackers</div>
                  <div className="item-sub">Teams of 2-4</div>
                </div>
              </div>

              <div className="telemetry-row-split">
                <div className="telemetry-item">
                  <div className="item-label">LATITUDE</div>
                  <div className="item-value">22.7844° N</div>
                </div>
                <div className="telemetry-item">
                  <div className="item-label">LONGITUDE</div>
                  <div className="item-value">86.2028° E</div>
                </div>
              </div>
            </div>

            <div className="telemetry-footer">
              <div className="status-indicator">
                <span className="status-glow"></span>
                <span>DOCKING AUTOLOCK: ENGAGED</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Radar/Map */}
          <div className="radar-map-panel" data-reveal="true">
            <div className="panel-header">
              <div className="panel-dot yellow"></div>
              <h3>COORDINATES_VISUALIZER</h3>
              <div className="panel-code">MODE: ACTIVE_RADAR</div>
            </div>

            <div className="map-wrapper">
              <iframe
                title="RVSCET Jamshedpur Map"
                src="https://www.google.com/maps?q=RVS+College+of+Engineering+and+Technology+Jamshedpur&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay-scanline" />
              <div className="map-hud-marker top-left"></div>
              <div className="map-hud-marker top-right"></div>
              <div className="map-hud-marker bottom-left"></div>
              <div className="map-hud-marker bottom-right"></div>
            </div>

            <div className="map-actions">
              <a
                href="https://maps.google.com/?q=RVS+College+of+Engineering+and+Technology+Jamshedpur"
                target="_blank"
                rel="noopener noreferrer"
                className="map-nav-btn"
              >
                <span>PLOT VECTOR IN GOOGLE MAPS</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
