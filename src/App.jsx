import React, { useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';
import VesselViewer from './components/VesselViewer';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';

// Lazy-load all below-fold sections for faster initial page load
const AboutSection = lazy(() => import('./components/AboutSection'));
const VenueSectionNew = lazy(() => import('./components/VenueSection'));
const GalacticRewards = lazy(() => import('./components/GalacticRewards'));
const ScheduleSection = lazy(() => import('./components/ScheduleSection'));
const Footer = lazy(() => import('./components/Footer'));

// Sections.jsx exports multiple named exports — wrap each in a lazy loader
const ProblemsSection = lazy(() => import('./components/Sections').then(m => ({ default: m.ProblemsSection })));
const EventsSection = lazy(() => import('./components/Sections').then(m => ({ default: m.EventsSection })));
const SponsorsSection = lazy(() => import('./components/Sections').then(m => ({ default: m.SponsorsSection })));
const FaqSection = lazy(() => import('./components/Sections').then(m => ({ default: m.FaqSection })));


export default function App() {
  const [isExploded, setIsExploded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

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
          return prev + Math.floor(Math.random() * 15) + 3;
        });
      }, 30);
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
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 860;
    if (isTouch) {
      window.lenis = null;
      return;
    }

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
        
        // 1. Animate loading screen elements out
        tl.to('#loadingScreen .loading-content', {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in'
        });
        
        tl.to('#loadingScreen', {
          opacity: 0,
          scale: 1.12,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsLoaderActive(false);
          }
        }, '-=0.25');

        // 2. Animate landing page hero elements in (overlapping with loading screen fade-out)
        gsap.set('#introEyebrow', { opacity: 0, y: 16 });
        gsap.set('#introHeading', { opacity: 0, y: 34 });
        gsap.set('#introSub', { opacity: 0, y: 20 });
        gsap.set('#introCta', { opacity: 0, y: 16 });
        
        tl.to('#introEyebrow', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
          .to('#introHeading', { opacity: 1, y: 0, duration: 0.9 }, '-=0.45')
          .to('#introSub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
          .to('#introCta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
      } catch (e) {
        // If GSAP fails for any reason, ensure loader is deactivated and elements visible
        console.warn('GSAP animation skipped:', e);
        setIsLoaderActive(false);
      }

      // Lightweight CSS reveal logic for data-reveal elements
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      setTimeout(() => {
        document.querySelectorAll('[data-reveal="true"]').forEach(el => observer.observe(el));
      }, 100);

      // Refresh ScrollTrigger after a short delay to ensure layout has settled
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(refreshTimer);
    }
  }, [isLoaded]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (!el) return;
    // Dispatch a custom event so AboutSection can force-reveal its content
    window.dispatchEvent(new CustomEvent('forceReveal'));
    const yOffset = -80;
    if (window.lenis) {
      // fix: was calling lenis.stop() before scrolling, which adds the
      // "lenis-stopped" class (overflow:hidden) and blocked the very
      // window.scrollTo() call for ~1.2s. Use Lenis's own scrollTo instead.
      window.lenis.scrollTo(el, { offset: yOffset, duration: 1.2 });
    } else {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading screen overlay */}
      {isLoaderActive && (
        <div id="loadingScreen" className="loading-screen">
          <div className="loading-content">
            <svg className="premium-loader-svg" viewBox="0 0 300 300">
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(57, 168, 255, 0.25)" />
                  <stop offset="100%" stopColor="rgba(138, 43, 226, 0)" />
                </radialGradient>
                
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39a8ff" />
                  <stop offset="50%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#ff2d3b" />
                </linearGradient>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Background Center Orb */}
              <circle cx="150" cy="150" r="85" fill="url(#centerGlow)" />

              {/* Tech Reticle Target Lines */}
              <line x1="150" y1="25" x2="150" y2="275" stroke="rgba(57, 168, 255, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="25" y1="150" x2="275" y2="150" stroke="rgba(57, 168, 255, 0.15)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Dynamic Telemetry Degrees */}
              <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
              
              {/* Outer Dashed Rotating HUD Ring */}
              <circle className="hud-outer-ring" cx="150" cy="150" r="115" fill="none" stroke="rgba(57, 168, 255, 0.2)" strokeWidth="1" strokeDasharray="4,6" />

              {/* Middle Precision Tick Marks */}
              <circle className="hud-tick-ring" cx="150" cy="150" r="100" fill="none" stroke="rgba(138, 43, 226, 0.3)" strokeWidth="1.5" strokeDasharray="2,8" />

              {/* Orbiting telemetry dot */}
              <g className="hud-orbit-group">
                <circle cx="150" cy="50" r="3.5" fill="#ff2d3b" filter="url(#neonGlow)" />
              </g>

              {/* Main SVG Circular Progress Ring */}
              <circle 
                cx="150" 
                cy="150" 
                r="85" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.03)" 
                strokeWidth="3.5" 
              />
              <circle 
                className="hud-progress-arc"
                cx="150" 
                cy="150" 
                r="85" 
                fill="none" 
                stroke="url(#progressGrad)" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeDasharray="534" 
                strokeDashoffset={534 - (534 * loadingPercent) / 100}
                filter="url(#neonGlow)"
              />

              {/* Integrated Typography */}
              <text x="150" y="125" className="svg-text-small" textAnchor="middle">INITIALIZING SYSTEM</text>
              
              <text x="150" y="152" className="svg-text-logo" textAnchor="middle">HACKQUBIT</text>
              <text x="150" y="176" className="svg-text-version" textAnchor="middle">2.O</text>
              
              <text x="150" y="210" className="svg-text-percent" textAnchor="middle">{loadingPercent}%</text>
            </svg>

            <div className="loading-log">
              {loadingPercent < 30 && "INITIALIZING QUANTUM ENGINES..."}
              {loadingPercent >= 30 && loadingPercent < 60 && "STABILIZING WARP FOLD CORE..."}
              {loadingPercent >= 60 && loadingPercent < 90 && "SYNCING ORBITAL TELEMETRY..."}
              {loadingPercent >= 90 && "READY FOR DOCKING..."}
            </div>

            <div className="loading-telemetry">
              <span>SYS.LOC: ORBIT_X5</span>
              <span>VOLTS: {(4.1 + (loadingPercent / 100) * 8.4).toFixed(2)}V</span>
              <span>SIG: {loadingPercent < 90 ? "ACQUIRING" : "SECURE"}</span>
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
        <div className="hero-ui" style={{ pointerEvents: 'none' }}>
          <div className="top-row" style={{ pointerEvents: 'none' }}>
            <div className="brand">HACKQUBIT<span>2.O</span></div>
            <div className="hud-readout">
              SYS.STATUS: <b>NOMINAL</b><br />
              POWER.CORE: <b>100%</b><br />
              VECTOR.LOCK: <b>ORBIT</b>
            </div>
          </div>

          <div className="hero-copy" style={{ pointerEvents: 'none' }}>
            <div id="introEyebrow" className="eyebrow">SPACE SPRINT CHALLENGE</div>
            <h1 id="introHeading">
              <span className="h1-line">HACKQUBIT</span>
              <span className="h1-line h1-accent" data-text="2.O">2.O</span>
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



      <Suspense fallback={null}>
        <AboutSection />
        <VenueSectionNew />
        <GalacticRewards />
        <ScheduleSection />
        <ProblemsSection />
        <EventsSection />
        <SponsorsSection />
        <FaqSection />
        <Footer />
      </Suspense>

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
            <p className="modal-subtitle">Register your crew for HackQubit 2.O</p>
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
