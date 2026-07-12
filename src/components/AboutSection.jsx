import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';

const STATS = [
  { value: '48', suffix: 'HRS', label: 'Non-Stop Build Sprint' },
  { value: '500', suffix: '+', label: 'Innovators Nationwide' },
  { value: '50', suffix: '+', label: 'Colleges Represented' },
  { value: '1L', suffix: '+', label: 'Prize Pool (₹)' },
];

function StatCard({ value, suffix, label, index }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`about-stat-card ${active ? 'is-active' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <div className="about-stat-icon" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <circle className="about-stat-ring" cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.6" strokeDasharray="20 88" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3.4" fill="currentColor" />
        </svg>
      </div>
      <div className="about-stat-value">
        {value}<span className="about-stat-suffix">{suffix}</span>
      </div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${inView ? 'is-in-view' : ''}`}
      id="about"
    >
      {/* animated circuit background */}
      <svg className="about-circuit" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="about-circuit-path"
          d="M0 120 H220 L260 160 H460 L500 120 H700 L740 160 H1000"
          fill="none" stroke="currentColor" strokeWidth="1"
        />
        <path
          className="about-circuit-path about-circuit-path--delay"
          d="M0 480 H180 L220 440 H420 L460 480 H660 L700 440 H1000"
          fill="none" stroke="currentColor" strokeWidth="1"
        />
        <circle className="about-circuit-node" cx="260" cy="160" r="4" />
        <circle className="about-circuit-node about-circuit-node--d2" cx="500" cy="120" r="4" />
        <circle className="about-circuit-node about-circuit-node--d3" cx="740" cy="160" r="4" />
        <circle className="about-circuit-node about-circuit-node--d4" cx="220" cy="440" r="4" />
        <circle className="about-circuit-node about-circuit-node--d5" cx="460" cy="480" r="4" />
      </svg>

      <div className="about-inner">
        <div className="about-header">
          <div className="about-eyebrow">
            <span className="about-hud-line"></span>
            NATIONAL LEVEL HACKATHON
            <span className="about-hud-line"></span>
          </div>
          <h2 className="about-title">
            ABOUT <span className="about-title-accent">HACKQUBIT V2</span>
          </h2>
          <p className="about-desc">
            HackQubit V2 is the next chapter of our flagship national-level hackathon —
            a 48-hour arena where students from across the country converge to design,
            build, and ship real solutions under pressure. Powered by mentorship from
            industry engineers and judged by builders who've shipped at scale, it's
            where ideas get pressure-tested into products.
          </p>
        </div>

        <div className="about-stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} index={i} {...s} />
          ))}
        </div>

        <div className="about-orbit-wrap" aria-hidden="true">
          <div className="about-orbit-ring about-orbit-ring--1">
            <span className="about-orbit-dot"></span>
          </div>
          <div className="about-orbit-ring about-orbit-ring--2">
            <span className="about-orbit-dot about-orbit-dot--alt"></span>
          </div>
          <div className="about-orbit-core">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
