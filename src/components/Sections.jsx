import React, { useState } from 'react';
import './Sections.css';

/* ============================================================
   PROBLEM STATEMENTS / TRACKS
   ============================================================ */
const TRACKS = [
  {
    code: 'TH-01',
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'Develop intelligent systems using machine learning, deep learning, NLP and generative AI.',
    category: 'AI & Data Science'
  },
  {
    code: 'TH-02',
    title: 'Cybersecurity',
    desc: 'Build secure applications for authentication, privacy, digital forensics and cyber defence.',
    category: 'Software & FinTech'
  },
  {
    code: 'TH-03',
    title: 'Computer Vision',
    desc: 'Create image and video understanding solutions using modern vision techniques.',
    category: 'AI & Data Science'
  },
  {
    code: 'TH-04',
    title: 'Healthcare & MedTech',
    desc: 'Improve diagnosis, patient care, accessibility and healthcare management.',
    category: 'Bio & Social Impact'
  },
  {
    code: 'TH-05',
    title: 'FinTech',
    desc: 'Innovate in digital payments, banking, investment and financial inclusion.',
    category: 'Software & FinTech'
  },
  {
    code: 'TH-06',
    title: 'Education & EdTech',
    desc: 'Design technology that enhances learning and skill development.',
    category: 'Software & FinTech'
  },
  {
    code: 'TH-07',
    title: 'Agriculture & FoodTech',
    desc: 'Create smart farming, irrigation and food supply chain solutions.',
    category: 'Bio & Social Impact'
  },
  {
    code: 'TH-08',
    title: 'Smart Cities & IoT',
    desc: 'Develop connected infrastructure, sensors and intelligent urban systems.',
    category: 'IoT & Emerging Tech'
  },
  {
    code: 'TH-09',
    title: 'Sustainability & Climate Tech',
    desc: 'Build solutions for renewable energy, conservation and climate resilience.',
    category: 'Bio & Social Impact'
  },
  {
    code: 'TH-10',
    title: 'Data Science & Analytics',
    desc: 'Transform complex data into actionable insights using analytics.',
    category: 'AI & Data Science'
  },
  {
    code: 'TH-11',
    title: 'AR / VR & Immersive Experiences',
    desc: 'Create immersive augmented and virtual reality experiences.',
    category: 'IoT & Emerging Tech'
  },
  {
    code: 'TH-12',
    title: 'Industry 4.0 & Automation',
    desc: 'Develop robotics, manufacturing and industrial automation solutions.',
    category: 'IoT & Emerging Tech'
  },
  {
    code: 'TH-13',
    title: 'Accessibility & Inclusive Technology',
    desc: 'Design technology that is accessible and inclusive for everyone.',
    category: 'Bio & Social Impact'
  },
  {
    code: 'TH-14',
    title: 'Space Technology',
    desc: 'Build innovative software inspired by satellites, astronomy and exploration.',
    category: 'IoT & Emerging Tech'
  },
  {
    code: 'TH-15',
    title: 'Open Innovation',
    desc: 'Solve any real-world challenge with your own original idea.',
    category: 'Software & FinTech'
  },
];

export function ProblemsSection() {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', 'AI & Data Science', 'Software & FinTech', 'IoT & Emerging Tech', 'Bio & Social Impact'];

  const filteredTracks = activeTab === 'ALL'
    ? TRACKS
    : TRACKS.filter((t) => t.category === activeTab);

  return (
    <section className="site-section problems-section" id="problems">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> TRACKS <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          PROBLEM <span className="site-title-accent">THEMES</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Choose one innovation theme for your project. Teams are free to solve any real-world problem within their selected domain.
        </p>

        <div className="problems-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`problems-tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="tracks-grid">
          {filteredTracks.map((t, i) => (
            <div className="track-card" key={t.code} data-reveal="true" style={{ transitionDelay: `${i * 45}ms` }}>
              <div className="track-code">{t.code} <span className="track-category-tag">// {t.category}</span></div>
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
