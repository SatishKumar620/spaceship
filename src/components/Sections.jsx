import React, { useState } from 'react';
import './Sections.css';

/* ============================================================
   RICH TRACK DATASET WITH IDEAS AND TECH STACKS
   ============================================================ */
const TRACKS = [
  {
    code: 'TH-01',
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'Develop intelligent systems using machine learning, deep learning, NLP and generative AI.',
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
    title: 'Cybersecurity',
    desc: 'Build secure applications for authentication, privacy, digital forensics and cyber defence.',
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
    title: 'Computer Vision',
    desc: 'Create image and video understanding solutions using modern vision techniques.',
    category: 'AI & Data Science',
    tags: ['YOLO', 'Segment Anything', 'OCR', 'Object Detect'],
    ideas: [
      'Automated gesture-controlled screen interface for surgical suites',
      'Real-time retail shelf-stocking and anomaly alert tracker',
      'AR navigation assistant for visually impaired pedestrians'
    ],
    tech: ['C++', 'Python', 'OpenCV', 'PyTorch', 'CUDA']
  },
  {
    code: 'TH-04',
    title: 'Healthcare & MedTech',
    desc: 'Improve medical diagnosis, patient care, health accessibility and hospital management.',
    category: 'Bio & Social Impact',
    tags: ['EHR Sync', 'Diagnostics', 'Wearables', 'Telehealth'],
    ideas: [
      'Symptom-checking offline app utilizing on-device lightweight models',
      'Real-time posture and ergonomics monitoring screen widget',
      'IoT smart pill bottle dispatcher with automated family alerts'
    ],
    tech: ['React Native', 'Node.js', 'FastAPI', 'Bluetooth Web API']
  },
  {
    code: 'TH-05',
    title: 'FinTech',
    desc: 'Innovate in digital payments, neo-banking, investment platforms and financial inclusion.',
    category: 'Software & FinTech',
    tags: ['Blockchain', 'Defi', 'Payments', 'Micro-loans'],
    ideas: [
      'Micro-savings bot that rounds up change and builds automated portfolios',
      'Decentralized peer-to-peer crop insurance portal for smallholder farmers',
      'Voice-based payment terminal for low-connectivity rural regions'
    ],
    tech: ['Solidity', 'Express', 'React', 'MongoDB']
  },
  {
    code: 'TH-06',
    title: 'Education & EdTech',
    desc: 'Design technology that enhances personalized learning, remote classrooms and skill development.',
    category: 'Software & FinTech',
    tags: ['Gamification', 'Accessibility', 'LMS', 'Interactives'],
    ideas: [
      'Interactive visual playground for learning abstract mathematics',
      'Real-time classroom focus analyzer that doesn\'t record face feeds',
      'Automated quiz generator from open educational resources'
    ],
    tech: ['Vue.js', 'D3.js', 'Firebase', 'FastAPI']
  },
  {
    code: 'TH-07',
    title: 'Agriculture & FoodTech',
    desc: 'Create smart farming, automated irrigation, crop optimization and supply chain solutions.',
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
    code: 'TH-08',
    title: 'Smart Cities & IoT',
    desc: 'Develop connected urban infrastructure, smart grid management and intelligent sensor networks.',
    category: 'IoT & Emerging Tech',
    tags: ['Sensors', 'M2M', 'Smart Parking', 'Grid Sync'],
    ideas: [
      'P2P EV charger sharing database and reservation panel',
      'Mesh network tracker for emergency reporting during telecom blackouts',
      'Real-time city noise pollution level heatmapper'
    ],
    tech: ['Arduino', 'MQTT', 'InfluxDB', 'Grafana']
  },
  {
    code: 'TH-09',
    title: 'Sustainability & Climate Tech',
    desc: 'Build solutions for carbon footprint tracking, renewable energy and waste recycling.',
    category: 'Bio & Social Impact',
    tags: ['Carbon Index', 'Recycle', 'Renewables', 'Green Web'],
    ideas: [
      'Browser plugin tracking shipping emissions on e-commerce carts',
      'Smart waste bin classifier scanning item barcodes for recycling routes',
      'Solar energy broker letting neighbors trade excess battery storage'
    ],
    tech: ['React', 'PostgreSQL', 'Tailwind', 'Thirdweb']
  },
  {
    code: 'TH-10',
    title: 'Data Science & Analytics',
    desc: 'Transform complex raw data into actionable visual insights using statistics.',
    category: 'AI & Data Science',
    tags: ['Dashboards', 'Big Data', 'Anomaly Detect', 'Scrapers'],
    ideas: [
      'Public transport latency analyzer correlating weather feeds',
      'Automated financial report scraper and anomaly detection alert',
      'Open-source dashboard tracking water quality metrics globally'
    ],
    tech: ['R', 'Pandas', 'Streamlit', 'ElasticSearch']
  },
  {
    code: 'TH-11',
    title: 'AR / VR & Immersive Experiences',
    desc: 'Create immersive augmented, virtual, or mixed reality training tools.',
    category: 'IoT & Emerging Tech',
    tags: ['WebXR', 'Three.js', 'Unity', 'spatial-audio'],
    ideas: [
      'WebXR dashboard for molecular visualization in 3D space',
      'Interactive history museum exhibit mapping virtual structures',
      'VR panic therapy simulator with bio-feedback triggers'
    ],
    tech: ['Three.js', 'A-Frame', 'WebXR API', 'Blender']
  },
  {
    code: 'TH-12',
    title: 'Industry 4.0 & Automation',
    desc: 'Develop robotic arm interfaces, factory dashboards and automated inventory tracking.',
    category: 'IoT & Emerging Tech',
    tags: ['Robotics', 'SCADA', 'Inventory', 'Predictive Maintenance'],
    ideas: [
      'Web-based cockpit for industrial robotic arm telemetry',
      'Predictive vibration analyzer for factory motor failures',
      'Automated inventory scanner utilizing depth cameras'
    ],
    tech: ['ROS', 'WebSockets', 'Python', 'React']
  },
  {
    code: 'TH-13',
    title: 'Accessibility & Inclusive Technology',
    desc: 'Design assistive technology that makes computing accessible for disabled users.',
    category: 'Bio & Social Impact',
    tags: ['A11y', 'Screenreaders', 'Assistive', 'Captioning'],
    ideas: [
      'Keyboard-only web navigator browser overlay with audio beacons',
      'Real-time AI captioning tool with customizable emotional indicators',
      'Tactile visual feedback system for deaf-blind users'
    ],
    tech: ['Vanilla JS', 'Speech Recognition API', 'CSS Grid', 'Tailwind']
  },
  {
    code: 'TH-14',
    title: 'Space Technology',
    desc: 'Build innovative software inspired by orbit tracking, satellite communications and astronomy.',
    category: 'IoT & Emerging Tech',
    tags: ['Satellites', 'Kessler Orbit', 'TLEs', 'Telemetry'],
    ideas: [
      'TLE orbit visualizer mapping debris densities',
      'Decentralized satellite imagery annotation platform',
      'Ham radio antenna pointer tracking active satellites'
    ],
    tech: ['Three.js', 'CesiumJS', 'FastAPI', 'Leaflet']
  },
  {
    code: 'TH-15',
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

  const categories = ['ALL', 'AI & Data Science', 'Software & FinTech', 'IoT & Emerging Tech', 'Bio & Social Impact'];

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
          {filteredTracks.map((t, i) => (
            <div
              className={`track-card ${getCategoryClass(t.category)}`}
              key={t.code}
              data-reveal="true"
              onClick={() => setSelectedTrack(t)}
              style={{ transitionDelay: `${i * 35}ms` }}
            >
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
            </div>
          ))}
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
