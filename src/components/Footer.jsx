import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        
        {/* Top Row: Links and Branding */}
        <div className="footer-main">
          
          {/* Logo & Description */}
          <div className="footer-brand">
            <h2 className="footer-logo glow-text">
              HACKQUBIT <span className="footer-logo-accent">2.O</span>
            </h2>
            <p className="footer-description">
              A 24-hour interstellar coding odyssey. Build high-performance applications, push limits, and secure prizes.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4>NAVIGATE</h4>
            <ul>
              <li><button type="button" onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')}>Mission</button></li>
              <li><button type="button" onClick={() => scrollToSection('prizes')}>Prizes</button></li>
              <li><button type="button" onClick={() => scrollToSection('schedule')}>Schedule</button></li>
              <li><button type="button" onClick={() => scrollToSection('problems')}>Tracks</button></li>
              <li><button type="button" onClick={() => scrollToSection('sponsors')}>Sponsors</button></li>
              <li><button type="button" onClick={() => scrollToSection('faq')}>FAQ</button></li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div className="footer-links-col">
            <h4>POLICIES</h4>
            <ul>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: All cookies are stored locally to optimize warp diagnostics."); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Crew members must participate fairly under the code of conduct."); }}>Terms & Conditions</a></li>
              <li><a href="#rules" onClick={(e) => { e.preventDefault(); alert("Rules: Submissions must lock by Day 2, 10:00 AM IST."); }}>Hackathon Rules</a></li>
              <li><a href="#conduct" onClick={(e) => { e.preventDefault(); alert("Code of Conduct: Respect all crews and commanders."); }}>Code of Conduct</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row: copyright */}
        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {currentYear} HackQubit. Organized by RVS College of Engineering & Technology. All rights reserved.
          </div>
          <div className="footer-vector-status">
            <span className="status-dot"></span> ALL SHIELD SECTORS: OPERATIONAL
          </div>
        </div>

      </div>
    </footer>
  );
}
