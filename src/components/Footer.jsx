import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-glow" />


      <div className="footer-stars"></div>

      <svg
        className="footer-horizon"
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="planetGlow" x1="0" x2="0">
            <stop offset="0%" stopColor="#ff234f" stopOpacity="0.65"/>
            <stop offset="100%" stopColor="#ff234f" stopOpacity="0"/>
          </linearGradient>
        </defs>

        <ellipse
          cx="800"
          cy="330"
          rx="820"
          ry="170"
          fill="url(#planetGlow)"
        />

        <path
          d="M0 240 C300 180 600 210 800 205 C1040 198 1290 175 1600 225"
          stroke="#ff234f"
          strokeWidth="2"
          fill="none"
          opacity=".45"
        />
      </svg>

      <div className="footer-orbit orbit1"></div>
      <div className="footer-orbit orbit2"></div>

      <div className="footer-inner">

        <div className="footer-main">

          <div className="footer-brand">

            <span className="footer-tag">
              TRANSMISSION ONLINE
            </span>

            <h2 className="footer-logo">
              HACKQUBIT
              <span>2.0</span>
            </h2>

            <p className="footer-description">
              The signal never ends. Continue building, innovating and
              exploring beyond the horizon with India's next generation
              of creators.
            </p>

          </div>

          <div className="footer-links-col">
            <h4>NAVIGATION</h4>

            <button onClick={()=>scrollTo("home")}>Home</button>
            <button onClick={()=>scrollTo("about")}>Mission</button>
            <button onClick={()=>scrollTo("schedule")}>Schedule</button>
            <button onClick={()=>scrollTo("prizes")}>Prizes</button>
            <button onClick={()=>scrollTo("faq")}>FAQ</button>
          </div>

          <div className="footer-links-col">

            <h4>MISSION STATUS</h4>

            <div className="footer-status-card">

              <div>
                <span>CORE</span>
                <strong>ONLINE</strong>
              </div>

              <div>
                <span>NETWORK</span>
                <strong>STABLE</strong>
              </div>

              <div>
                <span>LATENCY</span>
                <strong>2.1 ms</strong>
              </div>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {year} HackQubit • RVS College of Engineering &
            Technology • All Rights Reserved
          </p>

          <span className="footer-status">
            ● SIGNAL LOCKED
          </span>

        </div>

      </div>

    </footer>
  );
}

      {/* Decorative Space Elements */}

      <div className="footer-space-decoration">

        <svg className="footer-satellite" viewBox="0 0 140 140" aria-hidden="true">

          <g fill="none" stroke="currentColor" strokeWidth="2">

            <rect x="55" y="55" width="30" height="30" rx="4"/>

            <rect x="15" y="58" width="30" height="24"/>

            <rect x="95" y="58" width="30" height="24"/>

            <line x1="45" y1="70" x2="55" y2="70"/>

            <line x1="85" y1="70" x2="95" y2="70"/>

            <circle cx="70" cy="70" r="6"/>

          </g>

        </svg>

        <svg className="footer-rocket" viewBox="0 0 120 120" aria-hidden="true">

          <g fill="none" stroke="currentColor" strokeWidth="2">

            <path d="M60 18
                     C76 28 86 48 82 66
                     L60 88
                     L38 66
                     C34 48 44 28 60 18Z"/>

            <circle cx="60" cy="48" r="7"/>

            <path d="M48 82 L38 102"/>

            <path d="M72 82 L82 102"/>

            <path d="M60 88 L60 108"/>

          </g>

        </svg>

        <div className="footer-beacon"></div>

      </div>


      <div className="footer-radar" aria-hidden="true">
        <div className="footer-radar-ring ring1"></div>
        <div className="footer-radar-ring ring2"></div>
        <div className="footer-radar-ring ring3"></div>
        <div className="footer-radar-sweep"></div>
        <div className="footer-radar-core"></div>
      </div>

