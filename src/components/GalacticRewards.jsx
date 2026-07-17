import "./GalacticRewards.css";

const prizes = [
  {
    place: "01",
    title: "Champion",
    amount: "₹50,000",
    desc: "+ Goodies & fast-track interviews",
    cls: "first"
  },
  {
    place: "02",
    title: "Runner Up",
    amount: "₹30,000",
    desc: "+ Sponsor swag bundle",
    cls: "second"
  },
  {
    place: "03",
    title: "Second Runner Up",
    amount: "₹20,000",
    desc: "+ Sponsor swag bundle",
    cls: "third"
  },
  {
    place: "Track",
    title: "Best Track Awards",
    amount: "₹5,000",
    desc: "Per track, across all categories",
    cls: "track"
  }
];

// Helper to render distinct SVGs based on prize class
const getPrizeIcon = (cls) => {
  if (cls === 'first') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-first" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd700"/>
            <stop offset="50%" stopColor="#ff8c00"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>
        {/* Crown / Trophy shape */}
        <path d="M20,40 L35,80 L60,105 L85,80 L100,40 L70,55 L60,20 L50,55 Z" fill="url(#grad-first)" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="60" cy="20" r="6" fill="#fff" />
        <circle cx="20" cy="40" r="4" fill="#fff" />
        <circle cx="100" cy="40" r="4" fill="#fff" />
      </svg>
    );
  } else if (cls === 'second') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-second" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0e0e0"/>
            <stop offset="50%" stopColor="#8a9ba8"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>
        {/* Diamond / Shield shape */}
        <polygon points="60,10 100,45 60,110 20,45" fill="url(#grad-second)" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <polygon points="60,10 80,45 60,90 40,45" fill="rgba(255,255,255,0.4)" />
      </svg>
    );
  } else if (cls === 'third') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-third" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cd7f32"/>
            <stop offset="50%" stopColor="#a0522d"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>
        {/* Hexagon / Core shape */}
        <polygon points="60,15 95,35 95,85 60,105 25,85 25,35" fill="url(#grad-third)" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="60" cy="60" r="20" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="1"/>
      </svg>
    );
  } else {
    // Track Prize
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-track" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f2fe"/>
            <stop offset="50%" stopColor="#4facfe"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>
        {/* Tech Insignia */}
        <rect x="35" y="35" width="50" height="50" rx="10" fill="url(#grad-track)" stroke="#fff" strokeWidth="2" transform="rotate(45 60 60)"/>
        <circle cx="60" cy="60" r="10" fill="#fff"/>
        <path d="M10,60 L30,60 M90,60 L110,60 M60,10 L60,30 M60,90 L60,110" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
};

export default function GalacticRewards() {

  return (

<section id="prizes" className="galacticRewards">

<div className="bgGrid"></div>
<div className="bgGlow glowA"></div>
<div className="bgGlow glowB"></div>
<div className="scanLines"></div>

<div className="titleWrap">

<p className="eyebrow" data-reveal="true">
GALACTIC REWARDS
</p>

<h2 data-reveal="true">
Win <span>Epic Prizes</span>
</h2>

<p className="subtitle" data-reveal="true">
Push your limits, dominate the leaderboard and claim futuristic rewards.
</p>

</div>

<div className="rewardWrap">

{prizes.map((p, i)=>(

<div
key={p.place + p.title}
className={`rewardCard ${p.cls}`}
data-reveal="true"
style={{ transitionDelay: `${i * 100}ms` }}
>

<div className="cursorGlow"></div>

<div className="energyRing ring1"></div>
<div className="energyRing ring2"></div>

<div className="crystal">
  {getPrizeIcon(p.cls)}
</div>

<div className="place">
{p.place}
</div>

<h3>
{p.title}
</h3>

<div className="amount">
{p.amount}
</div>

<div className="prize-card-desc">
{p.desc}
</div>

<div className="divider"></div>

<div className="bottomGlow"></div>

</div>

))}

</div>

<div className="particles">

{Array.from({length:45}).map((_,i)=>(

<span
key={i}
style={{
left:`${Math.random()*100}%`,
animationDelay:`${Math.random()*8}s`,
animationDuration:`${5+Math.random()*5}s`
}}
></span>

))}

</div>

</section>

  );

}
