import React, { useState } from 'react';
import './Sections.css';

/* ============================================================
   VENUE
   ============================================================ */
export function VenueSection() {
  return (
    <section className="site-section venue-section" id="venue">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> LOCATION <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          MISSION <span className="site-title-accent">VENUE</span>
        </h2>
        <div className="venue-grid">
          <div className="venue-card" data-reveal="true">
            <div className="venue-card-label">Host Campus</div>
            <div className="venue-card-value">RVS College of Engineering &amp; Technology</div>
            <div className="venue-card-sub">Jamshedpur, Jharkhand — hosted by Helix, the Tech &amp; AI Club</div>
          </div>
          <div className="venue-card" data-reveal="true">
            <div className="venue-card-label">Format</div>
            <div className="venue-card-value">On-Campus, In-Person</div>
            <div className="venue-card-sub">Dedicated build zones, mentor desks &amp; a 24/7 hacker lounge</div>
          </div>
          <div className="venue-card" data-reveal="true">
            <div className="venue-card-label">Arrival</div>
            <div className="venue-card-value">Reporting opens 08:00 IST</div>
            <div className="venue-card-sub">Check-in, kits &amp; team allotment before kickoff</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRIZES
   ============================================================ */
const PRIZES = [
  { rank: 'CHAMPION', amount: '₹50,000', note: '+ goodies & fast-track interviews' },
  { rank: 'RUNNER-UP', amount: '₹30,000', note: '+ sponsor swag bundle' },
  { rank: 'SECOND RUNNER-UP', amount: '₹20,000', note: '+ sponsor swag bundle' },
  { rank: 'BEST TRACK AWARDS', amount: '₹5,000', note: 'per track, across all categories' },
];

export function PrizesSection() {
  return (
    <section className="site-section prizes-section" id="prizes">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> REWARDS <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          PRIZE <span className="site-title-accent">POOL</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Over ₹1,00,000 in prizes across the overall leaderboard and individual problem tracks.
        </p>
        <div className="prizes-grid">
          {PRIZES.map((p, i) => (
            <div className="prize-card" key={p.rank} data-reveal="true" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="prize-rank">{p.rank}</div>
              <div className="prize-amount">{p.amount}</div>
              <div className="prize-note">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SCHEDULE
   ============================================================ */
const SCHEDULE = [
  { time: 'Day 1 · 08:00', title: 'Check-in & Team Reporting', tag: 'LOGISTICS' },
  { time: 'Day 1 · 10:00', title: 'Opening Ceremony & Problem Reveal', tag: 'KICKOFF' },
  { time: 'Day 1 · 11:00', title: 'Hacking Begins', tag: 'BUILD' },
  { time: 'Day 1 · 20:00', title: 'Mentor Rounds & Midnight Snacks', tag: 'SUPPORT' },
  { time: 'Day 2 · 08:00', title: 'Progress Checkpoint', tag: 'REVIEW' },
  { time: 'Day 2 · 10:00', title: 'Hacking Ends — Submissions Lock', tag: 'DEADLINE' },
  { time: 'Day 2 · 12:00', title: 'Judging & Finalist Pitches', tag: 'JUDGING' },
  { time: 'Day 2 · 16:00', title: 'Closing Ceremony & Prize Distribution', tag: 'CLOSING' },
];

export function ScheduleSection() {
  return (
    <section className="site-section schedule-section" id="schedule">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> TIMELINE <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          24-HOUR <span className="site-title-accent">SCHEDULE</span>
        </h2>
        <div className="schedule-track">
          {SCHEDULE.map((s, i) => (
            <div className="schedule-row" key={s.title} data-reveal="true" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="schedule-time">{s.time}</div>
              <div className="schedule-dot"></div>
              <div className="schedule-body">
                <div className="schedule-title">{s.title}</div>
                <div className="schedule-tag">{s.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROBLEM STATEMENTS / TRACKS
   ============================================================ */
const TRACKS = [
  { code: 'TRK-01', title: 'AI / Machine Learning', desc: 'Applied ML systems solving real, messy problems.' },
  { code: 'TRK-02', title: 'Web3 & Blockchain', desc: 'Decentralized tooling, on-chain infra, trust systems.' },
  { code: 'TRK-03', title: 'FinTech', desc: 'Payments, credit access, and financial tooling at scale.' },
  { code: 'TRK-04', title: 'HealthTech', desc: 'Tools that improve access, diagnosis, or care delivery.' },
  { code: 'TRK-05', title: 'Sustainability', desc: 'Climate, energy, and resource-efficiency solutions.' },
  { code: 'TRK-06', title: 'Open Innovation', desc: 'Anything else worth building — your call.' },
];

export function ProblemsSection() {
  return (
    <section className="site-section problems-section" id="problems">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> TRACKS <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          PROBLEM <span className="site-title-accent">STATEMENTS</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Detailed problem statements drop at opening ceremony. Pick a track, or pitch your own under Open Innovation.
        </p>
        <div className="tracks-grid">
          {TRACKS.map((t, i) => (
            <div className="track-card" key={t.code} data-reveal="true" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="track-code">{t.code}</div>
              <div className="track-title">{t.title}</div>
              <div className="track-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EVENTS / SIDE ACTIVITIES
   ============================================================ */
const EVENTS = [
  { title: 'Pre-Hack Workshop', desc: 'Hands-on primer for teams new to hackathons.' },
  { title: 'Mentor Office Hours', desc: 'Rotating industry engineers on the floor all night.' },
  { title: 'Gaming & Chill Zone', desc: 'Breaks matter — take one between sprints.' },
  { title: 'Sponsor Booths', desc: 'Live demos, swag, and on-the-spot tech talks.' },
];

export function EventsSection() {
  return (
    <section className="site-section events-section" id="events">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> ALONGSIDE THE HACK <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          SIDE <span className="site-title-accent">EVENTS</span>
        </h2>
        <div className="events-grid">
          {EVENTS.map((e, i) => (
            <div className="event-card" key={e.title} data-reveal="true" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="event-title">{e.title}</div>
              <div className="event-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SPONSORS
   ============================================================ */
const SPONSOR_TIERS = [
  { tier: 'Platform Partners', names: ['GitHub', 'MongoDB', 'Postman', 'Google Cloud'] },
  { tier: 'Regional Partners', names: ['Tata Steel', 'TCS'] },
];

export function SponsorsSection() {
  return (
    <section className="site-section sponsors-section" id="sponsors">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> BACKED BY <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          OUR <span className="site-title-accent">SPONSORS</span>
        </h2>
        {SPONSOR_TIERS.map((tier) => (
          <div className="sponsor-tier" key={tier.tier} data-reveal="true">
            <div className="sponsor-tier-label">{tier.tier}</div>
            <div className="sponsor-row">
              {tier.names.map((n) => (
                <div className="sponsor-chip" key={n}>{n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
const FAQS = [
  { q: 'Who can participate?', a: 'Any student currently enrolled at a college or university — solo or in teams of up to 4.' },
  { q: 'Is there a registration fee?', a: 'No, HackQubit is completely free to participate in.' },
  { q: 'Do I need prior hackathon experience?', a: 'No. Mentors are on the floor throughout to help teams at every skill level.' },
  { q: 'Is accommodation provided?', a: 'Yes, for outstation participants — details are shared after registration confirmation.' },
  { q: 'Can I switch teams or tracks later?', a: 'Team rosters lock a short window after opening ceremony; track selection stays flexible until submission.' },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="site-section faq-section" id="faq">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> GOOD TO KNOW <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          FREQUENTLY ASKED <span className="site-title-accent">QUESTIONS</span>
        </h2>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq-item ${open ? 'is-open' : ''}`} key={f.q} data-reveal="true">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                >
                  {f.q}
                  <span className="faq-toggle">{open ? '−' : '+'}</span>
                </button>
                <div className="faq-answer" style={{ maxHeight: open ? '200px' : '0px' }}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
