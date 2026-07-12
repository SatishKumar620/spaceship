import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';
import VesselViewer from './components/VesselViewer';

gsap.registerPlugin(ScrollTrigger);
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
import Footer from './components/Footer';

export default function App() {
  const [isExploded, setIsExploded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [heroPassed, setHeroPassed] = useState(false);

  // iOS scroll lock: overflow:hidden on html/body doesn't work on iOS Safari
  // Must use position:fixed with saved scroll position
  React.useEffect(() => {
    if (showRegModal) {
      const scrollY = window.scrollY;
      document.body.classList.add('scroll-locked');
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = parseInt(document.body.style.top || '0') * -1;
      document.body.classList.remove('scroll-locked');
      document.body.style.top = '';
      if (scrollY) window.scrollTo(0, scrollY);
    }
  }, [showRegModal]);

  React.useEffect(() => {
    if (!isLoaded) {
      const interval = setInterval(() => {
        setLoadingPercent((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            return 99;
          }
          return prev + Math.floor(Math.random() * 8) + 1;
        });
      }, 150);
      return () => clearInterval(interval);
    } else {
      setLoadingPercent(100);
    }
  }, [isLoaded]);

  React.useEffect(() => {
    // Safety timeout fallback: if WebGL canvas load takes too long on phone, force load landing page
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn("WebGL safety fallback triggered.");
        setIsLoaded(true);
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  React.useEffect(() => {
    // Initialize Lenis smooth scroll safely (handling Vite ES Module interop)
    const LenisClass = Lenis.default || Lenis;
    const lenis = new LenisClass({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Let mobile touch scroll naturally
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Hide hero-ui once user scrolls past the hero section
  // This prevents it from blocking clicks on sections below
  React.useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('home');
      const threshold = heroEl ? heroEl.offsetHeight * 0.85 : window.innerHeight * 0.85;
      setHeroPassed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      // First ensure elements are immediately visible (safety net for mobile)
      ['#introEyebrow', '#introHeading', '#introSub', '#introCta'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      // Then layer on the animation as a progressive enhancement
      try {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        gsap.set('#introEyebrow', { opacity: 0, y: 16 });
        gsap.set('#introHeading', { opacity: 0, y: 34 });
        gsap.set('#introSub', { opacity: 0, y: 20 });
        gsap.set('#introCta', { opacity: 0, y: 16 });
        tl.to('#introEyebrow', { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
          .to('#introHeading', { opacity: 1, y: 0, duration: 0.9 }, '-=0.45')
          .to('#introSub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
          .to('#introCta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
      } catch (e) {
        // If GSAP fails for any reason, elements are already visible above
        console.warn('GSAP animation skipped:', e);
      }
    }
  }, [isLoaded]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (!el) return;
    // Dispatch a custom event so AboutSection can force-reveal its content
    window.dispatchEvent(new CustomEvent('forceReveal'));
    const yOffset = -80;
    // Stop Lenis momentarily then scroll — fixes mobile Lenis blocking native scroll
    if (window.lenis) {
      window.lenis.stop();
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { if (window.lenis) window.lenis.start(); }, 1200);
    } else {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading screen overlay */}
      {!isLoaded && (
        <div id="loadingScreen" className="loading-screen">
          <div className="loading-content">
            <div className="loader-scanner">
              <div className="scanner-circle"></div>
              <div className="scanner-line"></div>
              <div className="scanner-pct">{loadingPercent}%</div>
            </div>
            <h1 className="loading-logo glow-text">HACKQUBIT <span className="logo-v2">// V2</span></h1>
            <div className="loading-status-bar">
              <div className="loading-status-fill" style={{ width: `${loadingPercent}%` }}></div>
            </div>
            <div className="loading-log">
              {loadingPercent < 30 && "INITIALIZING QUANTUM ENGINES..."}
              {loadingPercent >= 30 && loadingPercent < 60 && "STABILIZING WARP FOLD CORE..."}
              {loadingPercent >= 60 && loadingPercent < 90 && "SYNCING ORBITAL TELEMETRY..."}
              {loadingPercent >= 90 && "READY FOR DOCKING..."}
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <section className="hero-section" id="home">
        {/* Three.js interactive canvas wrapper */}
        <VesselViewer
          isExploded={isExploded}
          setIsExploded={setIsExploded}
          onLoaded={() => setIsLoaded(true)}
        />

        {/* HUD overlay — pointer-events:none on container, restored on interactive children */}
        {/* heroPassed: hide (opacity 0 + pointer-events:none) once user scrolls past hero */}
        <div className={`hero-ui${heroPassed ? ' hero-ui--passed' : ''}`} style={{ pointerEvents: 'none' }}>
          <div className="top-row" style={{ pointerEvents: 'none' }}>
            <div className="brand">HACKQUBIT<span>// V2</span></div>
            <div className="hud-readout">
              SYS.STATUS: <b>NOMINAL</b><br />
              POWER.CORE: <b>100%</b><br />
              VECTOR.LOCK: <b>ORBIT</b>
            </div>
          </div>

          <div className="hero-copy" style={{ pointerEvents: 'none' }}>
            <div id="introEyebrow" className="eyebrow">SPACE SPRINT CHALLENGE</div>
            <h1 id="introHeading">
              <span className="h1-line">LAUNCH YOUR</span>
              <span className="h1-line h1-accent" data-text="INNOVATION">INNOVATION</span>
            </h1>
            <p id="introSub" className="sub">
              Join hundreds of creators for a 24-hour orbital build sprint at RVSCET. Prototype solutions in AI, FinTech, and healthcare to win massive rewards.
            </p>
            {/* CTA Row — explicit pointer-events:auto overrides parent none */}
            <div id="introCta" className="cta-row" style={{ pointerEvents: 'auto' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
                onClick={() => setShowRegModal(true)}
              >
                REGISTRATION
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
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
            style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
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
      <Footer />

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
