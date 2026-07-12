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
  const [showRegModal, setShowRegModal] = useState(false);

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
                type="button"
                className="btn btn-primary"
                onClick={() => setShowRegModal(true)}
              >
                REGISTRATION
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={scrollToAbout}
              >
                LEARN MORE
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

      {showRegModal && (
        <div className="modal-overlay" onClick={() => setShowRegModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowRegModal(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3>SECURE YOUR PORT</h3>
            <p className="modal-subtitle">Register your crew for HackQubit V2</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Registration successful! Crew credentials dispatched to warp coordinate.");
              setShowRegModal(false);
            }}>
              <div className="form-group">
                <label htmlFor="teamName">CREW NAME (TEAM)</label>
                <input id="teamName" type="text" placeholder="e.g. Apollo 11" required />
              </div>
              <div className="form-group">
                <label htmlFor="leaderEmail">COMMANDER EMAIL</label>
                <input id="leaderEmail" type="email" placeholder="commander@galaxy.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="crewSize">CREW SIZE</label>
                <select id="crewSize">
                  <option>1 Specialist (Solo)</option>
                  <option>2 Specialists</option>
                  <option>3 Specialists</option>
                  <option>4 Specialists (Full Crew)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="missionTrack">MISSION TRACK</label>
                <select id="missionTrack">
                  <option>AI & Machine Learning</option>
                  <option>Cybersecurity</option>
                  <option>IoT & Robotics</option>
                  <option>Bio & Social Impact</option>
                  <option>Open Innovation</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">LAUNCH MISSION</button>
            </form>
          </div>
        </div>
      )}
</>
  );
}
