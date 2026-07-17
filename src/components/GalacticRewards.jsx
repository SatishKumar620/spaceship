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
  }
];

// Helper to render distinct SVGs based on prize class
const getPrizeIcon = (cls) => {
  if (cls === 'first') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffdf00"/>
            <stop offset="50%" stopColor="#d4af37"/>
            <stop offset="100%" stopColor="#ffdf00"/>
          </linearGradient>
          <linearGradient id="grad-gold-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4af37"/>
            <stop offset="100%" stopColor="#996515"/>
          </linearGradient>
        </defs>
        {/* Real Trophy Shape */}
        {/* Base */}
        <path d="M40,110 L80,110 L85,115 L35,115 Z" fill="url(#grad-gold-dark)" stroke="#fff" strokeWidth="1"/>
        <path d="M45,100 L75,100 L80,110 L40,110 Z" fill="url(#grad-gold)" stroke="#fff" strokeWidth="1"/>
        {/* Stem */}
        <path d="M55,70 L65,70 L60,100 Z" fill="url(#grad-gold-dark)" stroke="#fff" strokeWidth="1"/>
        {/* Cup */}
        <path d="M30,20 C30,60 40,70 60,70 C80,70 90,60 90,20 Z" fill="url(#grad-gold)" stroke="#fff" strokeWidth="1.5"/>
        {/* Handles */}
        <path d="M30,30 C15,30 15,50 35,55" fill="none" stroke="url(#grad-gold-dark)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M90,30 C105,30 105,50 85,55" fill="none" stroke="url(#grad-gold-dark)" strokeWidth="4" strokeLinecap="round"/>
        {/* Top Rim */}
        <ellipse cx="60" cy="20" rx="30" ry="8" fill="url(#grad-gold-dark)" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="60" cy="20" rx="26" ry="5" fill="#4a3b00"/>
        {/* Star Sparkle */}
        <path d="M60,35 L62,45 L72,47 L62,49 L60,59 L58,49 L48,47 L58,45 Z" fill="#fff"/>
      </svg>
    );
  } else if (cls === 'second') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-silver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5f5f5"/>
            <stop offset="50%" stopColor="#c0c0c0"/>
            <stop offset="100%" stopColor="#e0e0e0"/>
          </linearGradient>
          <linearGradient id="grad-silver-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a9a9a9"/>
            <stop offset="100%" stopColor="#808080"/>
          </linearGradient>
        </defs>
        {/* Base */}
        <path d="M42,105 L78,105 L82,110 L38,110 Z" fill="url(#grad-silver-dark)" stroke="#fff" strokeWidth="1"/>
        <path d="M47,95 L73,95 L78,105 L42,105 Z" fill="url(#grad-silver)" stroke="#fff" strokeWidth="1"/>
        {/* Stem */}
        <path d="M56,70 L64,70 L60,95 Z" fill="url(#grad-silver-dark)" stroke="#fff" strokeWidth="1"/>
        {/* Cup */}
        <path d="M35,25 C35,55 45,70 60,70 C75,70 85,55 85,25 Z" fill="url(#grad-silver)" stroke="#fff" strokeWidth="1.5"/>
        {/* Handles */}
        <path d="M35,35 C22,35 22,50 40,55" fill="none" stroke="url(#grad-silver-dark)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M85,35 C98,35 98,50 80,55" fill="none" stroke="url(#grad-silver-dark)" strokeWidth="3" strokeLinecap="round"/>
        {/* Top Rim */}
        <ellipse cx="60" cy="25" rx="25" ry="6" fill="url(#grad-silver-dark)" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="60" cy="25" rx="21" ry="3" fill="#333333"/>
      </svg>
    );
  } else if (cls === 'third') {
    return (
      <svg viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="grad-bronze" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cd7f32"/>
            <stop offset="50%" stopColor="#b87333"/>
            <stop offset="100%" stopColor="#8c5226"/>
          </linearGradient>
          <linearGradient id="grad-bronze-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8c5226"/>
            <stop offset="100%" stopColor="#5c3317"/>
          </linearGradient>
        </defs>
        {/* Base */}
        <path d="M45,100 L75,100 L79,105 L41,105 Z" fill="url(#grad-bronze-dark)" stroke="#fff" strokeWidth="1"/>
        <path d="M49,90 L71,90 L75,100 L45,100 Z" fill="url(#grad-bronze)" stroke="#fff" strokeWidth="1"/>
        {/* Stem */}
        <path d="M57,65 L63,65 L60,90 Z" fill="url(#grad-bronze-dark)" stroke="#fff" strokeWidth="1"/>
        {/* Cup */}
        <path d="M40,30 C40,55 48,65 60,65 C72,65 80,55 80,30 Z" fill="url(#grad-bronze)" stroke="#fff" strokeWidth="1.5"/>
        {/* Handles */}
        <path d="M40,40 C30,40 30,52 44,55" fill="none" stroke="url(#grad-bronze-dark)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M80,40 C90,40 90,52 76,55" fill="none" stroke="url(#grad-bronze-dark)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Top Rim */}
        <ellipse cx="60" cy="30" rx="20" ry="5" fill="url(#grad-bronze-dark)" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="60" cy="30" rx="17" ry="2.5" fill="#331c0e"/>
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
