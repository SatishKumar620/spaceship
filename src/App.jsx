import React, { useState } from 'react';
import './App.css';
import VesselViewer from './components/VesselViewer';
import AboutSection from './components/AboutSection';

export default function App() {
  const [isExploded, setIsExploded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToSpecs = () => {
    const el = document.querySelector('.specs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading screen overlay */}
      <div id="loadingScreen" className={isLoaded ? 'hidden' : ''}>
        <div className="load-mark">VANGUARD</div>
        <div className="load-bar"></div>
      </div>

      <section className="hero-section">
        {/* Three.js interactive canvas wrapper */}
        <VesselViewer
          isExploded={isExploded}
          setIsExploded={setIsExploded}
          onLoaded={() => setIsLoaded(true)}
        />

        {/* HUD overlay */}
        <div className="hero-ui">
          <div className="top-row">
            <div className="brand">VANGUARD<span>// SYSTEMS</span></div>
            <div className="hud-readout">
              SYS.STATUS: <b>NOMINAL</b><br />
              POWER.CORE: <b>100%</b><br />
              VECTOR.LOCK: <b>ORBIT</b>
            </div>
          </div>

          <div className="hero-copy">
            <div id="introEyebrow" className="eyebrow">INTERACTIVE MANUAL</div>
            <h1 id="introHeading">
              VANGUARD-CLASS<br />EXPLORATION VESSEL
            </h1>
            <p id="introSub" className="sub">
              Designed for long-range deep space transit, visualised here in orbit around Kepler-186f. Explore components, subsystem details, and engine arrays interactively.
            </p>
            <div id="introCta" className="cta-row">
              <button
                className="btn btn-primary"
                onClick={() => setIsExploded(!isExploded)}
              >
                {isExploded ? 'REASSEMBLE HULL' : 'EXPLODE HULL'}
              </button>
              <button className="btn btn-ghost" onClick={scrollToSpecs}>
                SPEC SHEET
              </button>
            </div>
          </div>

          <button
            type="button"
            className="scroll-cue"
            onClick={scrollToSpecs}
            aria-label="Scroll to specifications"
          >
            <span>SCROLL TO SPECS</span>
            <div className="scroll-cue-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </section>

        <AboutSection />

      {/* Specifications Section */}
      <section className="specs-section">
        <div className="specs-head" data-reveal="true">
          <div className="eyebrow">SPECIFICATIONS</div>
          <h2 className="specs-title">VESSEL CORE DATA</h2>
        </div>
        <div className="specs-grid">
          <div className="spec-card" data-reveal="true">
            <div className="num">82.4<span>m</span></div>
            <div className="lbl">Total Hull Length</div>
          </div>
          <div className="spec-card" data-reveal="true">
            <div className="num">3,400<span>t</span></div>
            <div className="lbl">Dry Mass</div>
          </div>
          <div className="spec-card" data-reveal="true">
            <div className="num">Fusion</div>
            <div className="lbl">Primary Reactor Type</div>
          </div>
          <div className="spec-card" data-reveal="true">
            <div className="num">0.86<span>c</span></div>
            <div className="lbl">Max Warp Velocity</div>
          </div>
        </div>
      </section>
    </>
  );
}
