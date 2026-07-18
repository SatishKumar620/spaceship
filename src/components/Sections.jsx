import React, { useState } from 'react';
import './Sections.css';
import { SatelliteIcon, DockIcon, RadarIcon, BeaconIcon } from './SponsorIcons';
import SpaceEventsScene from './SpaceEventsScene';

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

<div className="problems-space-bg" aria-hidden="true">

<div className="shooting-stars">

  <span className="shooting-star s1"></span>
  <span className="shooting-star s2"></span>
  <span className="shooting-star s3"></span>
  <span className="shooting-star s4"></span>
  <span className="shooting-star s5"></span>
  <span className="shooting-star s6"></span>

</div>



<svg
className="space-svg"
viewBox="0 0 1600 900"
preserveAspectRatio="none">

<defs>

<radialGradient id="nebulaA">
<stop offset="0%" stop-color="#5de4ff" stop-opacity=".35"/>
<stop offset="100%" stop-color="#5de4ff" stop-opacity="0"/>
</radialGradient>

<radialGradient id="nebulaB">
<stop offset="0%" stop-color="#ff2d8a" stop-opacity=".30"/>
<stop offset="100%" stop-color="#ff2d8a" stop-opacity="0"/>
</radialGradient>

<filter id="blurLarge">
<feGaussianBlur stdDeviation="90"/>
</filter>

<filter id="blurSmall">
<feGaussianBlur stdDeviation="35"/>
</filter>

</defs>

<circle cx="1309" cy="114" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.22s"
begin="5.93s"
repeatCount="indefinite"/>
</circle>

<circle cx="285" cy="754" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.46s"
begin="5.41s"
repeatCount="indefinite"/>
</circle>

<circle cx="178" cy="604" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.47s"
begin="0.25s"
repeatCount="indefinite"/>
</circle>

<circle cx="476" cy="517" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.99s"
begin="0.21s"
repeatCount="indefinite"/>
</circle>

<circle cx="1330" cy="718" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.25s"
begin="3.36s"
repeatCount="indefinite"/>
</circle>

<circle cx="569" cy="828" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.8s"
begin="6.07s"
repeatCount="indefinite"/>
</circle>

<circle cx="865" cy="348" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.79s"
begin="1.24s"
repeatCount="indefinite"/>
</circle>

<circle cx="689" cy="104" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.79s"
begin="3.04s"
repeatCount="indefinite"/>
</circle>

<circle cx="704" cy="618" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.65s"
begin="6.46s"
repeatCount="indefinite"/>
</circle>

<circle cx="1098" cy="127" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.47s"
begin="0.63s"
repeatCount="indefinite"/>
</circle>

<circle cx="1287" cy="633" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.52s"
begin="4.62s"
repeatCount="indefinite"/>
</circle>

<circle cx="93" cy="677" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.93s"
begin="6.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="476" cy="887" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.27s"
begin="3.04s"
repeatCount="indefinite"/>
</circle>

<circle cx="747" cy="166" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.35s"
begin="2.84s"
repeatCount="indefinite"/>
</circle>

<circle cx="1437" cy="699" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.17s"
begin="0.57s"
repeatCount="indefinite"/>
</circle>

<circle cx="1093" cy="746" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.9s"
begin="1.31s"
repeatCount="indefinite"/>
</circle>

<circle cx="1310" cy="704" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.62s"
begin="1.76s"
repeatCount="indefinite"/>
</circle>

<circle cx="1573" cy="794" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.16s"
begin="1.83s"
repeatCount="indefinite"/>
</circle>

<circle cx="646" cy="410" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.57s"
begin="0.53s"
repeatCount="indefinite"/>
</circle>

<circle cx="1161" cy="897" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.28s"
begin="2.52s"
repeatCount="indefinite"/>
</circle>

<circle cx="810" cy="658" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.7s"
begin="1.14s"
repeatCount="indefinite"/>
</circle>

<circle cx="1525" cy="574" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.92s"
begin="2.1s"
repeatCount="indefinite"/>
</circle>

<circle cx="1195" cy="408" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.99s"
begin="1.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="1043" cy="505" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.31s"
begin="6.05s"
repeatCount="indefinite"/>
</circle>

<circle cx="313" cy="642" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.11s"
begin="6.34s"
repeatCount="indefinite"/>
</circle>

<circle cx="130" cy="394" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.34s"
begin="4.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="514" cy="566" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.57s"
begin="5.44s"
repeatCount="indefinite"/>
</circle>

<circle cx="1099" cy="768" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.7s"
begin="6.15s"
repeatCount="indefinite"/>
</circle>

<circle cx="601" cy="445" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.77s"
begin="3.63s"
repeatCount="indefinite"/>
</circle>

<circle cx="1473" cy="269" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.54s"
begin="6.1s"
repeatCount="indefinite"/>
</circle>

<circle cx="217" cy="891" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.19s"
begin="2.39s"
repeatCount="indefinite"/>
</circle>

<circle cx="1247" cy="203" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.81s"
begin="2.99s"
repeatCount="indefinite"/>
</circle>

<circle cx="1594" cy="543" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.44s"
begin="4.79s"
repeatCount="indefinite"/>
</circle>

<circle cx="229" cy="371" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.2s"
begin="1.92s"
repeatCount="indefinite"/>
</circle>

<circle cx="1161" cy="80" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.08s"
begin="5.86s"
repeatCount="indefinite"/>
</circle>

<circle cx="1557" cy="545" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.38s"
begin="1.03s"
repeatCount="indefinite"/>
</circle>

<circle cx="1125" cy="169" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.03s"
begin="4.22s"
repeatCount="indefinite"/>
</circle>

<circle cx="433" cy="552" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.56s"
begin="5.52s"
repeatCount="indefinite"/>
</circle>

<circle cx="817" cy="687" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.5s"
begin="2.99s"
repeatCount="indefinite"/>
</circle>

<circle cx="924" cy="123" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.69s"
begin="1.8s"
repeatCount="indefinite"/>
</circle>

<circle cx="1204" cy="567" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.04s"
begin="4.71s"
repeatCount="indefinite"/>
</circle>

<circle cx="1449" cy="646" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.53s"
begin="1.83s"
repeatCount="indefinite"/>
</circle>

<circle cx="676" cy="72" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.34s"
begin="1.9s"
repeatCount="indefinite"/>
</circle>

<circle cx="438" cy="552" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.41s"
begin="5.79s"
repeatCount="indefinite"/>
</circle>

<circle cx="1180" cy="484" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.04s"
begin="6.28s"
repeatCount="indefinite"/>
</circle>

<circle cx="389" cy="96" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.77s"
begin="5.27s"
repeatCount="indefinite"/>
</circle>

<circle cx="841" cy="478" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.27s"
begin="0.43s"
repeatCount="indefinite"/>
</circle>

<circle cx="1323" cy="100" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.7s"
begin="3.22s"
repeatCount="indefinite"/>
</circle>

<circle cx="223" cy="254" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.24s"
begin="1.52s"
repeatCount="indefinite"/>
</circle>

<circle cx="864" cy="187" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.37s"
begin="3.7s"
repeatCount="indefinite"/>
</circle>

<circle cx="154" cy="453" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.26s"
begin="0.78s"
repeatCount="indefinite"/>
</circle>

<circle cx="1107" cy="856" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.63s"
begin="7.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="484" cy="170" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.07s"
begin="3.89s"
repeatCount="indefinite"/>
</circle>

<circle cx="821" cy="60" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.93s"
begin="3.03s"
repeatCount="indefinite"/>
</circle>

<circle cx="543" cy="802" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.48s"
begin="2.28s"
repeatCount="indefinite"/>
</circle>

<circle cx="1496" cy="802" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.43s"
begin="5.29s"
repeatCount="indefinite"/>
</circle>

<circle cx="388" cy="303" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.9s"
begin="7.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="1110" cy="62" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.25s"
begin="2.51s"
repeatCount="indefinite"/>
</circle>

<circle cx="976" cy="514" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.8s"
begin="1.26s"
repeatCount="indefinite"/>
</circle>

<circle cx="164" cy="871" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.34s"
begin="0.55s"
repeatCount="indefinite"/>
</circle>

<circle cx="481" cy="413" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.85s"
begin="7.53s"
repeatCount="indefinite"/>
</circle>

<circle cx="1185" cy="608" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.1s"
begin="4.96s"
repeatCount="indefinite"/>
</circle>

<circle cx="1195" cy="578" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.3s"
begin="2.53s"
repeatCount="indefinite"/>
</circle>

<circle cx="1371" cy="733" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.98s"
begin="1.91s"
repeatCount="indefinite"/>
</circle>

<circle cx="1375" cy="660" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.65s"
begin="3.66s"
repeatCount="indefinite"/>
</circle>

<circle cx="148" cy="9" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.81s"
begin="4.97s"
repeatCount="indefinite"/>
</circle>

<circle cx="204" cy="75" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.33s"
begin="1.71s"
repeatCount="indefinite"/>
</circle>

<circle cx="714" cy="70" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.79s"
begin="2.96s"
repeatCount="indefinite"/>
</circle>

<circle cx="1112" cy="720" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.94s"
begin="4.89s"
repeatCount="indefinite"/>
</circle>

<circle cx="1339" cy="541" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.77s"
begin="5.34s"
repeatCount="indefinite"/>
</circle>

<circle cx="1358" cy="106" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.45s"
begin="2.12s"
repeatCount="indefinite"/>
</circle>

<circle cx="1520" cy="566" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.02s"
begin="2.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="1469" cy="351" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.26s"
begin="5.5s"
repeatCount="indefinite"/>
</circle>

<circle cx="1035" cy="500" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.23s"
begin="7.24s"
repeatCount="indefinite"/>
</circle>

<circle cx="189" cy="649" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.22s"
begin="6.63s"
repeatCount="indefinite"/>
</circle>

<circle cx="683" cy="789" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.31s"
begin="5.1s"
repeatCount="indefinite"/>
</circle>

<circle cx="1518" cy="452" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.8s"
begin="5.65s"
repeatCount="indefinite"/>
</circle>

<circle cx="229" cy="77" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.73s"
begin="7.23s"
repeatCount="indefinite"/>
</circle>

<circle cx="756" cy="596" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.64s"
begin="1.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="631" cy="373" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.05s"
begin="7.19s"
repeatCount="indefinite"/>
</circle>

<circle cx="511" cy="682" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.8s"
begin="2.83s"
repeatCount="indefinite"/>
</circle>

<circle cx="832" cy="635" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.65s"
begin="1.24s"
repeatCount="indefinite"/>
</circle>

<circle cx="332" cy="819" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.12s"
begin="7.05s"
repeatCount="indefinite"/>
</circle>

<circle cx="1508" cy="340" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.32s"
begin="6.42s"
repeatCount="indefinite"/>
</circle>

<circle cx="508" cy="273" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.54s"
begin="6.3s"
repeatCount="indefinite"/>
</circle>

<circle cx="79" cy="879" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.08s"
begin="1.78s"
repeatCount="indefinite"/>
</circle>

<circle cx="942" cy="358" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.36s"
begin="6.56s"
repeatCount="indefinite"/>
</circle>

<circle cx="456" cy="24" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.64s"
begin="1.55s"
repeatCount="indefinite"/>
</circle>

<circle cx="142" cy="791" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.55s"
begin="2.81s"
repeatCount="indefinite"/>
</circle>

<circle cx="1391" cy="863" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.14s"
begin="2.65s"
repeatCount="indefinite"/>
</circle>

<circle cx="534" cy="182" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.33s"
begin="7.7s"
repeatCount="indefinite"/>
</circle>

<circle cx="222" cy="610" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.93s"
begin="2.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="893" cy="620" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.5s"
begin="0.93s"
repeatCount="indefinite"/>
</circle>

<circle cx="389" cy="260" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.01s"
begin="5.67s"
repeatCount="indefinite"/>
</circle>

<circle cx="1102" cy="703" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.69s"
begin="7.52s"
repeatCount="indefinite"/>
</circle>

<circle cx="403" cy="372" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.32s"
begin="0.56s"
repeatCount="indefinite"/>
</circle>

<circle cx="676" cy="638" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.62s"
begin="5.31s"
repeatCount="indefinite"/>
</circle>

<circle cx="615" cy="519" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.63s"
begin="5.34s"
repeatCount="indefinite"/>
</circle>

<circle cx="1427" cy="302" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.1s"
begin="1.02s"
repeatCount="indefinite"/>
</circle>

<circle cx="776" cy="693" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.08s"
begin="7.22s"
repeatCount="indefinite"/>
</circle>

<circle cx="616" cy="415" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.52s"
begin="6.67s"
repeatCount="indefinite"/>
</circle>

<circle cx="430" cy="440" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.61s"
begin="4.85s"
repeatCount="indefinite"/>
</circle>

<circle cx="904" cy="452" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.37s"
begin="1.71s"
repeatCount="indefinite"/>
</circle>

<circle cx="1507" cy="173" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.58s"
begin="0.68s"
repeatCount="indefinite"/>
</circle>

<circle cx="1296" cy="634" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.76s"
begin="0.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="481" cy="688" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.0s"
begin="1.8s"
repeatCount="indefinite"/>
</circle>

<circle cx="50" cy="47" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.06s"
begin="7.87s"
repeatCount="indefinite"/>
</circle>

<circle cx="1573" cy="74" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.15s"
begin="3.32s"
repeatCount="indefinite"/>
</circle>

<circle cx="398" cy="735" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.0s"
begin="3.07s"
repeatCount="indefinite"/>
</circle>

<circle cx="302" cy="671" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.75s"
begin="0.04s"
repeatCount="indefinite"/>
</circle>

<circle cx="1577" cy="109" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.02s"
begin="1.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="1425" cy="530" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.25s"
begin="0.4s"
repeatCount="indefinite"/>
</circle>

<circle cx="248" cy="467" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.34s"
begin="6.41s"
repeatCount="indefinite"/>
</circle>

<circle cx="1144" cy="609" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.46s"
begin="7.6s"
repeatCount="indefinite"/>
</circle>

<circle cx="1254" cy="834" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.13s"
begin="7.14s"
repeatCount="indefinite"/>
</circle>

<circle cx="1122" cy="456" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.37s"
begin="5.95s"
repeatCount="indefinite"/>
</circle>

<circle cx="530" cy="769" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.39s"
begin="6.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="1592" cy="533" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.37s"
begin="5.01s"
repeatCount="indefinite"/>
</circle>

<circle cx="158" cy="730" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.68s"
begin="1.88s"
repeatCount="indefinite"/>
</circle>

<circle cx="1106" cy="82" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.92s"
begin="1.21s"
repeatCount="indefinite"/>
</circle>

<circle cx="312" cy="723" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.04s"
begin="0.51s"
repeatCount="indefinite"/>
</circle>

<circle cx="1111" cy="477" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.16s"
begin="0.5s"
repeatCount="indefinite"/>
</circle>

<circle cx="797" cy="788" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.1s"
begin="7.57s"
repeatCount="indefinite"/>
</circle>

<circle cx="1567" cy="589" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.71s"
begin="3.82s"
repeatCount="indefinite"/>
</circle>

<circle cx="611" cy="771" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.77s"
begin="6.83s"
repeatCount="indefinite"/>
</circle>

<circle cx="858" cy="551" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.0s"
begin="5.88s"
repeatCount="indefinite"/>
</circle>

<circle cx="451" cy="499" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.43s"
begin="2.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="796" cy="344" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.02s"
begin="5.43s"
repeatCount="indefinite"/>
</circle>

<circle cx="338" cy="860" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.9s"
begin="7.36s"
repeatCount="indefinite"/>
</circle>

<circle cx="1093" cy="27" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.31s"
begin="4.74s"
repeatCount="indefinite"/>
</circle>

<circle cx="171" cy="658" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.31s"
begin="1.09s"
repeatCount="indefinite"/>
</circle>

<circle cx="102" cy="266" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.27s"
begin="2.62s"
repeatCount="indefinite"/>
</circle>

<circle cx="691" cy="779" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.76s"
begin="2.23s"
repeatCount="indefinite"/>
</circle>

<circle cx="863" cy="258" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.75s"
begin="3.76s"
repeatCount="indefinite"/>
</circle>

<circle cx="106" cy="358" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.91s"
begin="5.2s"
repeatCount="indefinite"/>
</circle>

<circle cx="1334" cy="41" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.0s"
begin="7.6s"
repeatCount="indefinite"/>
</circle>

<circle cx="41" cy="636" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.37s"
begin="1.91s"
repeatCount="indefinite"/>
</circle>

<circle cx="234" cy="577" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.28s"
begin="3.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="755" cy="171" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.74s"
begin="4.86s"
repeatCount="indefinite"/>
</circle>

<circle cx="234" cy="796" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.54s"
begin="7.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="52" cy="319" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.79s"
begin="5.42s"
repeatCount="indefinite"/>
</circle>

<circle cx="812" cy="732" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.45s"
begin="0.61s"
repeatCount="indefinite"/>
</circle>

<circle cx="1284" cy="248" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.51s"
begin="5.58s"
repeatCount="indefinite"/>
</circle>

<circle cx="1401" cy="614" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.83s"
begin="6.37s"
repeatCount="indefinite"/>
</circle>

<circle cx="84" cy="355" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.85s"
begin="3.43s"
repeatCount="indefinite"/>
</circle>

<circle cx="1036" cy="663" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.1s"
begin="0.1s"
repeatCount="indefinite"/>
</circle>

<circle cx="1003" cy="108" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.18s"
begin="7.69s"
repeatCount="indefinite"/>
</circle>

<circle cx="941" cy="724" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.67s"
begin="3.48s"
repeatCount="indefinite"/>
</circle>

<circle cx="1332" cy="276" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.69s"
begin="6.47s"
repeatCount="indefinite"/>
</circle>

<circle cx="990" cy="476" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.96s"
begin="6.61s"
repeatCount="indefinite"/>
</circle>

<circle cx="660" cy="872" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.43s"
begin="6.65s"
repeatCount="indefinite"/>
</circle>

<circle cx="923" cy="249" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.34s"
begin="4.56s"
repeatCount="indefinite"/>
</circle>

<circle cx="688" cy="29" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.91s"
begin="6.81s"
repeatCount="indefinite"/>
</circle>

<circle cx="434" cy="363" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.4s"
begin="2.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="1436" cy="282" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.74s"
begin="0.08s"
repeatCount="indefinite"/>
</circle>

<circle cx="175" cy="247" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.78s"
begin="3.25s"
repeatCount="indefinite"/>
</circle>

<circle cx="492" cy="707" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.45s"
begin="5.17s"
repeatCount="indefinite"/>
</circle>

<circle cx="35" cy="95" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.46s"
begin="1.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="627" cy="679" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.77s"
begin="2.95s"
repeatCount="indefinite"/>
</circle>

<circle cx="704" cy="435" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.76s"
begin="4.4s"
repeatCount="indefinite"/>
</circle>

<circle cx="929" cy="277" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.6s"
begin="2.01s"
repeatCount="indefinite"/>
</circle>

<circle cx="394" cy="323" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.75s"
begin="5.94s"
repeatCount="indefinite"/>
</circle>

<circle cx="1413" cy="189" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.42s"
begin="1.73s"
repeatCount="indefinite"/>
</circle>

<circle cx="1483" cy="603" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.9s"
begin="4.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="397" cy="303" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.51s"
begin="2.89s"
repeatCount="indefinite"/>
</circle>

<circle cx="1450" cy="546" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.87s"
begin="2.19s"
repeatCount="indefinite"/>
</circle>

<circle cx="1133" cy="299" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.19s"
begin="7.55s"
repeatCount="indefinite"/>
</circle>

<circle cx="1541" cy="502" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.87s"
begin="6.98s"
repeatCount="indefinite"/>
</circle>

<circle cx="961" cy="490" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.83s"
begin="2.73s"
repeatCount="indefinite"/>
</circle>

<circle cx="517" cy="882" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.33s"
begin="0.91s"
repeatCount="indefinite"/>
</circle>

<circle cx="1007" cy="75" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.27s"
begin="5.04s"
repeatCount="indefinite"/>
</circle>

<circle cx="305" cy="830" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.43s"
begin="7.59s"
repeatCount="indefinite"/>
</circle>

<circle cx="508" cy="121" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.03s"
begin="6.12s"
repeatCount="indefinite"/>
</circle>

<circle cx="1266" cy="231" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.54s"
begin="3.04s"
repeatCount="indefinite"/>
</circle>

<circle cx="608" cy="880" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.53s"
begin="7.92s"
repeatCount="indefinite"/>
</circle>

<circle cx="1271" cy="61" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.5s"
begin="7.68s"
repeatCount="indefinite"/>
</circle>

<circle cx="1562" cy="212" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.3s"
begin="1.69s"
repeatCount="indefinite"/>
</circle>

<circle cx="321" cy="245" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.78s"
begin="4.42s"
repeatCount="indefinite"/>
</circle>

<circle cx="836" cy="461" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.46s"
begin="4.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="474" cy="295" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.3s"
begin="2.26s"
repeatCount="indefinite"/>
</circle>

<circle cx="145" cy="703" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.94s"
begin="7.39s"
repeatCount="indefinite"/>
</circle>

<circle cx="1280" cy="603" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.99s"
begin="6.43s"
repeatCount="indefinite"/>
</circle>

<circle cx="235" cy="557" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.54s"
begin="5.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="291" cy="73" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.54s"
begin="1.33s"
repeatCount="indefinite"/>
</circle>

<circle cx="1533" cy="844" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.2s"
begin="7.37s"
repeatCount="indefinite"/>
</circle>

<circle cx="959" cy="705" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.71s"
begin="5.6s"
repeatCount="indefinite"/>
</circle>

<circle cx="1024" cy="552" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.99s"
begin="3.5s"
repeatCount="indefinite"/>
</circle>

<circle cx="884" cy="752" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.13s"
begin="4.83s"
repeatCount="indefinite"/>
</circle>

<circle cx="468" cy="690" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.1s"
begin="4.7s"
repeatCount="indefinite"/>
</circle>

<circle cx="1566" cy="688" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.82s"
begin="4.61s"
repeatCount="indefinite"/>
</circle>

<circle cx="358" cy="481" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.58s"
begin="5.21s"
repeatCount="indefinite"/>
</circle>

<circle cx="371" cy="599" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.46s"
begin="5.08s"
repeatCount="indefinite"/>
</circle>

<circle cx="186" cy="481" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.61s"
begin="3.27s"
repeatCount="indefinite"/>
</circle>

<circle cx="214" cy="878" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.47s"
begin="2.64s"
repeatCount="indefinite"/>
</circle>

<circle cx="590" cy="678" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.75s"
begin="6.51s"
repeatCount="indefinite"/>
</circle>

<circle cx="931" cy="90" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.58s"
begin="2.02s"
repeatCount="indefinite"/>
</circle>

<circle cx="1582" cy="413" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.01s"
begin="6.6s"
repeatCount="indefinite"/>
</circle>

<circle cx="1111" cy="473" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.59s"
begin="0.43s"
repeatCount="indefinite"/>
</circle>

<circle cx="1275" cy="774" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.8s"
begin="5.0s"
repeatCount="indefinite"/>
</circle>

<circle cx="416" cy="273" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.44s"
begin="1.05s"
repeatCount="indefinite"/>
</circle>

<circle cx="1430" cy="496" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.15s"
begin="0.23s"
repeatCount="indefinite"/>
</circle>

<circle cx="490" cy="726" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.07s"
begin="2.49s"
repeatCount="indefinite"/>
</circle>

<circle cx="835" cy="95" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.56s"
begin="7.94s"
repeatCount="indefinite"/>
</circle>

<circle cx="945" cy="120" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.49s"
begin="6.66s"
repeatCount="indefinite"/>
</circle>

<circle cx="1467" cy="298" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.08s"
begin="5.64s"
repeatCount="indefinite"/>
</circle>

<circle cx="988" cy="483" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.72s"
begin="3.65s"
repeatCount="indefinite"/>
</circle>

<circle cx="390" cy="613" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.68s"
begin="5.97s"
repeatCount="indefinite"/>
</circle>

<circle cx="142" cy="282" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.94s"
begin="2.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="547" cy="840" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.49s"
begin="2.26s"
repeatCount="indefinite"/>
</circle>

<circle cx="1202" cy="593" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.74s"
begin="3.92s"
repeatCount="indefinite"/>
</circle>

<circle cx="1103" cy="495" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.81s"
begin="2.66s"
repeatCount="indefinite"/>
</circle>

<circle cx="772" cy="466" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.9s"
begin="6.96s"
repeatCount="indefinite"/>
</circle>

<circle cx="489" cy="585" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.88s"
begin="1.87s"
repeatCount="indefinite"/>
</circle>

<circle cx="89" cy="325" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.57s"
begin="3.78s"
repeatCount="indefinite"/>
</circle>

<circle cx="780" cy="395" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.26s"
begin="6.34s"
repeatCount="indefinite"/>
</circle>

<circle cx="311" cy="507" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.83s"
begin="1.01s"
repeatCount="indefinite"/>
</circle>

<circle cx="679" cy="890" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.2s"
begin="6.99s"
repeatCount="indefinite"/>
</circle>

<circle cx="1077" cy="467" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.05s"
begin="5.78s"
repeatCount="indefinite"/>
</circle>

<circle cx="1340" cy="158" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.85s"
begin="3.76s"
repeatCount="indefinite"/>
</circle>

<circle cx="693" cy="638" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.4s"
begin="3.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="672" cy="872" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.9s"
begin="6.87s"
repeatCount="indefinite"/>
</circle>

<circle cx="648" cy="641" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.44s"
begin="7.1s"
repeatCount="indefinite"/>
</circle>

<circle cx="1108" cy="36" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.16s"
begin="0.55s"
repeatCount="indefinite"/>
</circle>

<circle cx="588" cy="232" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.89s"
begin="0.72s"
repeatCount="indefinite"/>
</circle>

<circle cx="1557" cy="648" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.22s"
begin="6.98s"
repeatCount="indefinite"/>
</circle>

<circle cx="1421" cy="306" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.98s"
begin="0.37s"
repeatCount="indefinite"/>
</circle>

<circle cx="600" cy="367" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.22s"
begin="3.45s"
repeatCount="indefinite"/>
</circle>

<circle cx="843" cy="579" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.85s"
begin="6.34s"
repeatCount="indefinite"/>
</circle>

<circle cx="161" cy="624" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.2s"
begin="4.96s"
repeatCount="indefinite"/>
</circle>

<circle cx="1194" cy="146" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.27s"
begin="3.69s"
repeatCount="indefinite"/>
</circle>

<circle cx="522" cy="682" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.33s"
begin="7.19s"
repeatCount="indefinite"/>
</circle>

<circle cx="589" cy="693" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.21s"
begin="1.26s"
repeatCount="indefinite"/>
</circle>

<circle cx="707" cy="601" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.12s"
begin="5.11s"
repeatCount="indefinite"/>
</circle>

<circle cx="512" cy="467" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.92s"
begin="1.59s"
repeatCount="indefinite"/>
</circle>

<circle cx="989" cy="109" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.79s"
begin="3.05s"
repeatCount="indefinite"/>
</circle>

<circle cx="605" cy="716" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.15s"
begin="0.18s"
repeatCount="indefinite"/>
</circle>

<circle cx="810" cy="281" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.43s"
begin="4.53s"
repeatCount="indefinite"/>
</circle>

<circle cx="1525" cy="50" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.16s"
begin="5.96s"
repeatCount="indefinite"/>
</circle>

<circle cx="586" cy="794" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.76s"
begin="4.86s"
repeatCount="indefinite"/>
</circle>

<circle cx="1303" cy="194" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.78s"
begin="2.01s"
repeatCount="indefinite"/>
</circle>

<circle cx="1571" cy="675" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.14s"
begin="6.71s"
repeatCount="indefinite"/>
</circle>

<circle cx="1285" cy="661" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.2s"
begin="2.47s"
repeatCount="indefinite"/>
</circle>

<circle cx="1186" cy="373" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.55s"
begin="1.05s"
repeatCount="indefinite"/>
</circle>

<circle cx="669" cy="765" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.66s"
begin="1.41s"
repeatCount="indefinite"/>
</circle>

<circle cx="1104" cy="897" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.57s"
begin="4.25s"
repeatCount="indefinite"/>
</circle>

<circle cx="336" cy="263" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.48s"
begin="7.74s"
repeatCount="indefinite"/>
</circle>

<circle cx="693" cy="823" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.38s"
begin="3.75s"
repeatCount="indefinite"/>
</circle>

<circle cx="1544" cy="231" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.9s"
begin="5.79s"
repeatCount="indefinite"/>
</circle>

<circle cx="1141" cy="374" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.07s"
begin="6.33s"
repeatCount="indefinite"/>
</circle>

<circle cx="1098" cy="126" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.75s"
begin="2.95s"
repeatCount="indefinite"/>
</circle>

<circle cx="536" cy="598" r="1.2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="7.7s"
begin="6.58s"
repeatCount="indefinite"/>
</circle>

<circle cx="221" cy="691" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.1s"
begin="3.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="1149" cy="335" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.32s"
begin="1.77s"
repeatCount="indefinite"/>
</circle>

<circle cx="950" cy="717" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.58s"
begin="5.19s"
repeatCount="indefinite"/>
</circle>

<circle cx="92" cy="38" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="3.58s"
begin="7.97s"
repeatCount="indefinite"/>
</circle>

<circle cx="480" cy="550" r="0.7" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.86s"
begin="3.11s"
repeatCount="indefinite"/>
</circle>

<circle cx="1521" cy="713" r="1.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.71s"
begin="3.35s"
repeatCount="indefinite"/>
</circle>

<circle cx="316" cy="424" r="2" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="5.45s"
begin="0.79s"
repeatCount="indefinite"/>
</circle>

<circle cx="835" cy="286" r="0.5" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="4.09s"
begin="5.52s"
repeatCount="indefinite"/>
</circle>

<circle cx="910" cy="241" r="1" fill="white" opacity=".15">
<animate attributeName="opacity"
values=".1;.95;.1"
dur="6.43s"
begin="0.79s"
repeatCount="indefinite"/>
</circle>

<circle
cx="250"
cy="180"
r="180"
fill="url(#nebulaA)"
filter="url(#blurLarge)">
<animate
attributeName="cx"
values="250;320;250"
dur="18s"
repeatCount="indefinite"/>
</circle>

<circle
cx="1250"
cy="650"
r="220"
fill="url(#nebulaB)"
filter="url(#blurLarge)">
<animate
attributeName="cy"
values="650;610;650"
dur="22s"
repeatCount="indefinite"/>
</circle>

<circle
cx="760"
cy="340"
r="120"
fill="#63d7ff"
opacity=".10"
filter="url(#blurSmall)"/>

</svg>

<svg
className="orbit-svg"
viewBox="0 0 1600 900"
preserveAspectRatio="none">

<g opacity=".22">

<circle
cx="1240"
cy="170"
r="90"
className="orbit-ring"/>

<circle
cx="1240"
cy="170"
r="150"
className="orbit-ring delay1"/>

<circle
cx="1240"
cy="170"
r="210"
className="orbit-ring delay2"/>

<circle
cx="360"
cy="700"
r="80"
className="orbit-ring"/>

<circle
cx="360"
cy="700"
r="145"
className="orbit-ring delay2"/>

</g>

<g className="radar-group">

<circle
cx="1240"
cy="170"
r="8"
className="radar-core"/>

<circle
cx="1240"
cy="170"
r="12"
className="radar-wave"/>

<circle
cx="360"
cy="700"
r="8"
className="radar-core"/>

<circle
cx="360"
cy="700"
r="12"
className="radar-wave delay2"/>

</g>

</svg>



</div>

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
        
<div className="aurora-layer">
  <div className="aurora aurora-a"></div>
  <div className="aurora aurora-b"></div>
  <div className="aurora aurora-c"></div>
</div>


<div className="constellation-layer" aria-hidden="true">
<svg viewBox="0 0 1600 900" preserveAspectRatio="none">

<line x1="180" y1="180" x2="420" y2="260" className="const-line"/>
<line x1="420" y1="260" x2="650" y2="160" className="const-line"/>
<line x1="650" y1="160" x2="900" y2="280" className="const-line"/>
<line x1="900" y1="280" x2="1220" y2="200" className="const-line"/>

<circle cx="180" cy="180" r="3" className="const-star"/>
<circle cx="420" cy="260" r="3" className="const-star"/>
<circle cx="650" cy="160" r="3" className="const-star"/>
<circle cx="900" cy="280" r="3" className="const-star"/>
<circle cx="1220" cy="200" r="3" className="const-star"/>

</svg>
</div>

<div className="tracks-grid">


          {filteredTracks.map((t, i) => {
            const types = ['astronaut', 'spaceship', 'spacestation', 'meteor'];
            const watermarkType = types[i % types.length];

            return (
              <div
                className={`track-card premium-track ${getCategoryClass(t.category)}`}
                key={t.code}
                data-reveal="true"
                onMouseMove={(e)=>{
                  const r=e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx',(e.clientX-r.left)+'px');
                  e.currentTarget.style.setProperty('--my',(e.clientY-r.top)+'px');
                }}
                onClick={() => setSelectedTrack(t)}
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                

<div className="hud-corners">
<span className="hud tl"></span>
<span className="hud tr"></span>
<span className="hud bl"></span>
<span className="hud br"></span>
</div>


<div className="track-border"></div>


<div className="particle-field">

<span className="dust d1"></span>
<span className="dust d2"></span>
<span className="dust d3"></span>
<span className="dust d4"></span>
<span className="dust d5"></span>
<span className="dust d6"></span>
<span className="dust d7"></span>
<span className="dust d8"></span>

</div>

<div className="orbit-system">

  <span className="orbit orbit1">
    <span className="satellite"></span>
  </span>

  <span className="orbit orbit2">
    <span className="satellite pink"></span>
  </span>
</div>


<div className="track-glow"></div>

<div className="track-shine"></div>
<div className="track-watermark">

                  {watermarkType === 'astronaut' && (
                    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
                      <path d="M50 10 C35 10, 25 25, 25 40 C25 50, 30 60, 35 70 L35 90 L65 90 L65 70 C70 60, 75 50, 75 40 C75 25, 65 10, 50 10 Z M50 20 C60 20, 65 30, 65 40 L35 40 C35 30, 40 20, 50 20 Z" />
                      <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="4"/>
                    </svg>
                  )}
                  {watermarkType === 'spaceship' && (
                    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
                      <path d="M50 10 L65 40 L70 70 L80 90 L50 80 L20 90 L30 70 L35 40 Z" />
                      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="4"/>
                    </svg>
                  )}
                  {watermarkType === 'spacestation' && (
                    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
                      <rect x="20" y="40" width="60" height="20" />
                      <rect x="10" y="20" width="20" height="60" />
                      <rect x="70" y="20" width="20" height="60" />
                      <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                    </svg>
                  )}
                  {watermarkType === 'meteor' && (
                    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
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
      <SpaceEventsScene />
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
    icon: <SatelliteIcon />
  },
  {
    title: 'Direct Engagement',
    desc: 'Host customized tech-talk sessions, workshops, API-specific tracks, or mentor desks on the hack floor.',
    icon: <DockIcon />
  },
  {
    title: 'Talent Acquisition',
    desc: 'Access resumes database and run fast-tracked interviews to recruit elite engineering students.',
    icon: <RadarIcon />
  },
  {
    title: 'Post-Event Marketing',
    desc: 'Post-hack summary articles, demo-day video showcases, and targeted sponsor newsletter dispatches.',
    icon: <BeaconIcon />
  }
];;

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
      'Top-tier branding: "HackQubit 2.O presented by [You]"',
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
      
      {/* Holographic Earth Background */}
      <div className="holo-earth-bg">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(50, 255, 121, 0.2)" />
              <stop offset="70%" stopColor="rgba(50, 255, 121, 0.08)" />
              <stop offset="100%" stopColor="rgba(50, 255, 121, 0)" />
            </radialGradient>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <circle cx="400" cy="400" r="300" fill="url(#earthGlow)" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="rgba(50, 255, 121, 0.4)" strokeWidth="2" filter="url(#neonGlow)" />
          
          {/* Lat/Lng Grid Lines */}
          <ellipse cx="400" cy="400" rx="300" ry="100" fill="none" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" />
          <ellipse cx="400" cy="400" rx="300" ry="200" fill="none" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" />
          
          <ellipse cx="400" cy="400" rx="100" ry="300" fill="none" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" />
          <ellipse cx="400" cy="400" rx="200" ry="300" fill="none" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" />
          
          {/* Spreading connecting lines */}
          <line x1="400" y1="100" x2="400" y2="-100" stroke="rgba(50, 255, 121, 0.35)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="400" y1="700" x2="400" y2="900" stroke="rgba(50, 255, 121, 0.35)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="100" y1="400" x2="-100" y2="400" stroke="rgba(50, 255, 121, 0.35)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="700" y1="400" x2="900" y2="400" stroke="rgba(50, 255, 121, 0.35)" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Diagonal spreading lines */}
          <line x1="187" y1="187" x2="50" y2="50" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="613" y1="187" x2="750" y2="50" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="187" y1="613" x2="50" y2="750" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="613" y1="613" x2="750" y2="750" stroke="rgba(50, 255, 121, 0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      </div>

      <div className="site-section-inner">
        {/* Section Header */}
        <div className="site-eyebrow" data-reveal="true">
          <span className="site-hud-line"></span> PARTNERSHIPS <span className="site-hud-line"></span>
        </div>
        <h2 className="site-title" data-reveal="true">
          SPONSOR <span className="site-title-accent">BENEFITS</span>
        </h2>
        <p className="site-desc" data-reveal="true">
          Partner with HackQubit 2.O to connect with hundreds of future innovators, promote your APIs, and recruit elite developers.
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
          <a href="mailto:partnerships@hackqubit.com?subject=HackQubit%202.O%20Sponsorship%20Inquiry" className="btn btn-primary">
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
