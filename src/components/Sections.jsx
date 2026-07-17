import React, { useState } from 'react';
import './Sections.css';

/* ============================================================
   RICH TRACK DATASET WITH IDEAS AND TECH STACKS
   ============================================================ */
const TRACKS = [
  {
    code: 'TH-01',
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'Develop intelligent systems using machine learning, deep learning, NLP, and generative AI.',
    category: 'AI & Data Science',
    tags: ['Neural Nets', 'LLMs', 'PyTorch', 'GenAI'],
    ideas: [
      'Real-time deepfake audio/video detection tool',
      'AI assistant to translate sign language to speech',
      'Predictive model for early localized flood warning'
    ],
    tech: ['Python', 'TensorFlow', 'HuggingFace', 'OpenCV']
  },
  {
    code: 'TH-02',
    title: 'Cybersecurity & Privacy',
    desc: 'Build secure applications for threat detection, cryptography, digital forensics, and cyber defense.',
    category: 'Software & FinTech',
    tags: ['Zero-Trust', 'Crypto', 'WAF', 'OSINT'],
    ideas: [
      'Phishing link analyzer browser extension powered by heuristics',
      'Decentralized self-sovereign identity manager using WebAuthn',
      'Zero-knowledge proof authentication gateway'
    ],
    tech: ['Rust', 'Go', 'WebAssembly', 'Docker']
  },
  {
    code: 'TH-03',
    title: 'Healthcare & MedTech',
    desc: 'Improve medical diagnosis, patient care, health accessibility, and hospital management systems.',
    category: 'Bio & Social Impact',
    tags: ['Diagnostics', 'Wearables', 'Telehealth', 'A11y'],
    ideas: [
      'Symptom-checking offline app utilizing on-device lightweight models',
      'Real-time posture and ergonomics monitoring screen widget',
      'IoT smart pill bottle dispatcher with automated family alerts'
    ],
    tech: ['React Native', 'Node.js', 'FastAPI', 'Bluetooth Web API']
  },
  {
    code: 'TH-04',
    title: 'Smart Agriculture & FarmTech',
    desc: 'Create precision farming, automated irrigation, soil metrics tracking, and supply chain solutions.',
    category: 'Bio & Social Impact',
    tags: ['Smart Irrigation', 'Precision Ag', 'Logistics', 'Soil Metrics'],
    ideas: [
      'Automated soil moisture & weather API integrated irrigation switch',
      'P2P crop trading platform connecting local growers directly with stores',
      'Computer vision app to measure fruit ripeness indices'
    ],
    tech: ['Python', 'Raspberry Pi', 'GraphQL', 'Next.js']
  },
  {
    code: 'TH-05',
    title: 'FinTech & Blockchain',
    desc: 'Innovate in digital payments, neo-banking, micro-loans, and decentralized finance.',
    category: 'Software & FinTech',
    tags: ['Blockchain', 'DeFi', 'Payments', 'Micro-loans'],
    ideas: [
      'Micro-savings bot that rounds up change and builds automated portfolios',
      'Decentralized peer-to-peer crop insurance portal for smallholder farmers',
      'Voice-based payment terminal for low-connectivity rural regions'
    ],
    tech: ['Solidity', 'Express', 'React', 'MongoDB']
  },
  {
    code: 'TH-06',
    title: 'Open Innovation',
    desc: 'Unleash your creativity. Solve any real-world challenge with your own original software/hardware idea.',
    category: 'Software & FinTech',
    tags: ['Hack', 'Prototype', 'Custom Build', 'Impact'],
    ideas: [
      'Local-first collaborative scratchpad with automated backup networks',
      'P2P tools locker for neighborhood resource sharing',
      'Modular dashboard collecting custom widgets offline'
    ],
    tech: ['Vite', 'PWA', 'DexieJS', 'Tailwind']
  }
];

export function ProblemsSection() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedTrack, setSelectedTrack] = useState(null);

  const categories = ['ALL', 'AI & Data Science', 'Software & FinTech', 'Bio & Social Impact'];

  const filteredTracks = activeTab === 'ALL'
    ? TRACKS
    : TRACKS.filter((t) => t.category === activeTab);

  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'AI & Data Science': return 'cat-ai';
      case 'Software & FinTech': return 'cat-software';
      case 'IoT & Emerging Tech': return 'cat-iot';
      case 'Bio & Social Impact': return 'cat-impact';
      default: return 'cat-default';
    }
  };

  return (
    <section className="site-section problems-section" id="problems">
      <div className="site-section-inner">
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> MISSION THEMES <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          PROBLEM <span className="site-title-accent">TRACKS</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Select an innovation domain. Explore details, sample project statements, and recommended tech stacks by clicking on any track card.
        </p>

        {/* Categories Tabs Grid */}
        <div className="problems-tabs-container">
          <div className="problems-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`problems-tab ${activeTab === cat ? 'active' : ''} ${getCategoryClass(cat)}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid Layout */}
        <div className="tracks-grid">
          {filteredTracks.map((t, i) => {
            const types = ['astronaut', 'spaceship', 'spacestation', 'meteor'];
            const watermarkType = types[i % types.length];

            return (
              <div
                className={`track-card ${getCategoryClass(t.category)}`}
                key={t.code}
                data-reveal="true"
                onClick={() => setSelectedTrack(t)}
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                <div className="track-watermark">
                  {watermarkType === 'astronaut' && (
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 10 C35 10, 25 25, 25 40 C25 50, 30 60, 35 70 L35 90 L65 90 L65 70 C70 60, 75 50, 75 40 C75 25, 65 10, 50 10 Z M50 20 C60 20, 65 30, 65 40 L35 40 C35 30, 40 20, 50 20 Z" />
                      <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="4"/>
                    </svg>
                  )}
                  {watermarkType === 'spaceship' && (
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 10 L65 40 L70 70 L80 90 L50 80 L20 90 L30 70 L35 40 Z" />
                      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="4"/>
                    </svg>
                  )}
                  {watermarkType === 'spacestation' && (
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <rect x="20" y="40" width="60" height="20" />
                      <rect x="10" y="20" width="20" height="60" />
                      <rect x="70" y="20" width="20" height="60" />
                      <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                    </svg>
                  )}
                  {watermarkType === 'meteor' && (
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <path d="M80 20 L60 30 L40 20 L20 40 L30 60 L20 80 L50 70 L70 90 L80 60 L100 50 Z" />
                      <path d="M70 30 L90 10 M80 40 L100 20" stroke="currentColor" strokeWidth="4"/>
                    </svg>
                  )}
                </div>
                <div className="track-card-header">
                <div className="track-code">{t.code}</div>
                <div className="track-category">{t.category}</div>
              </div>
              <h3 className="track-title">{t.title}</h3>
              <p className="track-desc">{t.desc}</p>
              
              <div className="track-tags">
                {t.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="track-tag">{tag}</span>
                ))}
                {t.tags.length > 3 && <span className="track-tag-more">+{t.tags.length - 3}</span>}
              </div>

              <div className="track-card-footer">
                <span>VIEW SPECIFICATIONS</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Slide-Over Drawer */}
      {selectedTrack && (
        <div className="drawer-overlay" onClick={() => setSelectedTrack(null)}>
          <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-meta">
                <span className={`drawer-code-badge ${getCategoryClass(selectedTrack.category)}`}>
                  {selectedTrack.code}
                </span>
                <span className="drawer-category">{selectedTrack.category}</span>
              </div>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setSelectedTrack(null)}
                aria-label="Close details"
              >
                &times;
              </button>
            </div>

            {/* Drawer Content Scroll area */}
            <div className="drawer-body">
              <h2 className="drawer-title">{selectedTrack.title}</h2>
              <p className="drawer-desc">{selectedTrack.desc}</p>

              {/* Technology Stack Grid */}
              <div className="drawer-section">
                <h4>RECOMMENDED TECH STACK</h4>
                <div className="drawer-tech-grid">
                  {selectedTrack.tech.map((tech) => (
                    <div key={tech} className="drawer-tech-chip">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Project Ideas */}
              <div className="drawer-section">
                <h4>SAMPLE MISSION BRIEFS (IDEAS)</h4>
                <div className="drawer-ideas-list">
                  {selectedTrack.ideas.map((idea, index) => (
                    <div key={index} className="drawer-idea-card">
                      <div className="drawer-idea-index">0{index + 1}</div>
                      <div className="drawer-idea-text">{idea}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={`btn btn-primary drawer-action-btn ${getCategoryClass(selectedTrack.category)}`}
                onClick={() => {
                  alert(`Track selected: ${selectedTrack.title}. Make sure to update this track selection in the Registration portal!`);
                  setSelectedTrack(null);
                }}
              >
                SELECT THIS MISSION TRACK
              </button>
            </div>
          </div>
        </div>
      )}
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
   SPONSORS & PARTNERSHIPS
   ============================================================ */
const SPONSOR_TIERS = [
  { tier: 'Platform Partners', names: ['GitHub', 'MongoDB', 'Postman', 'Google Cloud'] },
  { tier: 'Regional Partners', names: ['Tata Steel', 'TCS'] },
];

const SPONSOR_PERKS = [
  {
    title: 'Brand Visibility',
    desc: 'Features across digital banners, merchandise, shirts, and stage placement seen by hundreds of developers.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Direct Engagement',
    desc: 'Host customized tech-talk sessions, workshops, API-specific tracks, or mentor desks on the hack floor.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Talent Acquisition',
    desc: 'Access resumes database and run fast-tracked interviews to recruit elite engineering students.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="19" y1="8" x2="19" y2="14" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="22" y1="11" x2="16" y2="11" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Post-Event Marketing',
    desc: 'Post-hack summary articles, demo-day video showcases, and targeted sponsor newsletter dispatches.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const PACKAGES = [
  {
    tier: 'SILVER',
    price: '₹20,000',
    accent: 'var(--sx-fog)',
    benefits: [
      'Medium logo placement on site & banners',
      'Option to place custom swag in registers kit',
      '1 crew representative pass',
      'General Discord server mentions'
    ]
  },
  {
    tier: 'TITLE',
    price: 'From ₹40,000',
    accent: 'var(--sx-red-2)',
    popular: true,
    benefits: [
      'Top-tier branding: "HackQubit V2 presented by [You]"',
      '10-minute keynote/opening slot',
      'Premium physical booth space',
      '4 crew representative passes',
      'Resumes database & custom evaluation track API access'
    ]
  },
  {
    tier: 'GOLD',
    price: '₹30,000',
    accent: 'var(--sx-amber)',
    benefits: [
      'Large logo placement on site & official shirts',
      'Standard physical booth space',
      '2 crew representative passes',
      'Fast-track interviews slot'
    ]
  }
];

export function SponsorsSection() {
  return (
    <section className="site-section sponsors-section" id="sponsors">
      <div className="site-section-inner">
        {/* Section Header */}
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> PARTNERSHIPS <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          SPONSOR <span className="site-title-accent">BENEFITS</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Partner with HackQubit V2 to connect with hundreds of future innovators, promote your APIs, and recruit elite developers.
        </p>

        {/* Perks Grid */}
        <div className="perks-grid">
          {SPONSOR_PERKS.map((perk, i) => (
            <div className="perk-card" key={perk.title} data-reveal="true" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="perk-icon-wrap">{perk.icon}</div>
              <h3 className="perk-title">{perk.title}</h3>
              <p className="perk-desc">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Package Tiers Grid */}
        <div className="packages-subtitle" data-reveal="true">
          <span className="site-hud-line"></span> SPONSORSHIP PACKAGES <span className="site-hud-line"></span>
        </div>
        
        <div className="packages-grid">
          {PACKAGES.map((pkg, i) => (
            <div 
              className={`package-card ${pkg.popular ? 'is-popular' : ''}`} 
              key={pkg.tier} 
              data-reveal="true" 
              style={{ 
                transitionDelay: `${i * 60}ms`,
                '--tier-color': pkg.accent 
              }}
            >
              {pkg.popular && <div className="package-tag">RECOMMENDED</div>}
              <div className="package-tier">{pkg.tier}</div>
              <div className="package-price">{pkg.price}</div>
              <ul className="package-benefits">
                {pkg.benefits.map((b, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sponsor CTA */}
        <div className="sponsor-cta-box" data-reveal="true">
          <h3>CONNECT WITH OUR PARTNERSHIP TEAM</h3>
          <p>Ready to warp your brand visibility? Request our full sponsor pitch prospectus deck.</p>
          <a href="mailto:partnerships@hackqubit.com?subject=HackQubit%20V2%20Sponsorship%20Inquiry" className="btn btn-primary">
            BE OUR SPONSOR
          </a>
        </div>

        {/* Past Sponsors Infinite Ticker */}
        <div className="past-sponsors-section" data-reveal="true">
          <div className="past-sponsors-header">
            <span className="site-hud-line"></span> ALUMNI PARTNERS & PAST SPONSORS <span className="site-hud-line"></span>
          </div>

          <div className="ticker-container">
            {/* Ticker Row 1: Scroll Left */}
            <div className="ticker-track scroll-left">
              <div className="ticker-group">
                <img src="/hdfc.svg" alt="HDFC Bank" className="ticker-logo" />
                <img src="/orbinger.svg" alt="Orbinger" className="ticker-logo" />
                <img src="/izzki.svg" alt="Izzki Tech Solutions" className="ticker-logo" />
                <div className="ticker-logo-text">TATA STEEL</div>
                <div className="ticker-logo-text">GITHUB</div>
                <div className="ticker-logo-text">MONGODB</div>
              </div>
              <div className="ticker-group" aria-hidden="true">
                <img src="/hdfc.svg" alt="HDFC Bank" className="ticker-logo" />
                <img src="/orbinger.svg" alt="Orbinger" className="ticker-logo" />
                <img src="/izzki.svg" alt="Izzki Tech Solutions" className="ticker-logo" />
                <div className="ticker-logo-text">TATA STEEL</div>
                <div className="ticker-logo-text">GITHUB</div>
                <div className="ticker-logo-text">MONGODB</div>
              </div>
            </div>

            {/* Ticker Row 2: Scroll Right */}
            <div className="ticker-track scroll-right">
              <div className="ticker-group">
                <div className="ticker-logo-text">GOOGLE CLOUD</div>
                <div className="ticker-logo-text">POSTMAN</div>
                <div className="ticker-logo-text">TCS</div>
                <img src="/hdfc.svg" alt="HDFC Bank" className="ticker-logo" />
                <img src="/orbinger.svg" alt="Orbinger" className="ticker-logo" />
                <img src="/izzki.svg" alt="Izzki Tech Solutions" className="ticker-logo" />
              </div>
              <div className="ticker-group" aria-hidden="true">
                <div className="ticker-logo-text">GOOGLE CLOUD</div>
                <div className="ticker-logo-text">POSTMAN</div>
                <div className="ticker-logo-text">TCS</div>
                <img src="/hdfc.svg" alt="HDFC Bank" className="ticker-logo" />
                <img src="/orbinger.svg" alt="Orbinger" className="ticker-logo" />
                <img src="/izzki.svg" alt="Izzki Tech Solutions" className="ticker-logo" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Sponsors logos */}
        <div className="current-sponsors-section" data-reveal="true">
          <div className="current-sponsors-title">PREVIOUS & PLATFORM PARTNERS</div>
          {SPONSOR_TIERS.map((tier) => (
            <div className="sponsor-tier-row" key={tier.tier}>
              <div className="sponsor-tier-row-label">{tier.tier}</div>
              <div className="sponsor-row">
                {tier.names.map((n) => (
                  <div className="sponsor-chip" key={n}>{n}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

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
