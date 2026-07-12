import React, { useState } from 'react';
import './App.css';
import VesselViewer from './components/VesselViewer';
import AboutSection from './components/AboutSection';
import Navbar from './components/Navbar';
import GalacticRewards from "./components/GalacticRewards";
import VenueSectionNew from "./components/VenueSection";
import {
  ProblemsSection,
  EventsSection,
  SponsorsSection,
  FaqSection,
} from "./components/Sections";

import ScheduleSection from "./components/ScheduleSection";

export default function App() {
  const [isExploded, setIsExploded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading screen overlay */}
      <div id="loadingScreen" className={isLoaded ? 'hidden' : ''}>
        <div className="load-mark">VANGUARD</div>
        <div className="load-bar"></div>
      </div>

      <Navbar />

      <section className="hero-section" id="home">
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
              <span className="h1-line">VANGUARD-CLASS</span>
              <span className="h1-line h1-accent" data-text="EXPLORATION VESSEL">EXPLORATION VESSEL</span>
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
              <button className="btn btn-ghost" onClick={scrollToAbout}>
                MISSION BRIEF
              </button>
            </div>
          </div>

          <button
            type="button"
            className="scroll-cue"
            onClick={scrollToAbout}
            aria-label="Scroll to mission brief"
          >
            <span>SCROLL TO BRIEF</span>
            <div className="scroll-cue-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      <AboutSection />
      <VenueSectionNew />
      <GalacticRewards />
      <ScheduleSection />
      <ProblemsSection />
      <EventsSection />
      <SponsorsSection />
      <FaqSection />
</>
  );
}
