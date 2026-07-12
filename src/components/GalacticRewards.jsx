import "./GalacticRewards.css";

const prizes = [
  {
    place: "01",
    title: "Champion",
    amount: "₹15,000",
    cls: "first"
  },
  {
    place: "02",
    title: "Runner Up",
    amount: "₹10,000",
    cls: "second"
  },
  {
    place: "03",
    title: "Second Runner Up",
    amount: "₹5,000",
    cls: "third"
  }
];

export default function GalacticRewards() {

  return (

<section className="galacticRewards">

<div className="bgGrid"></div>
<div className="bgGlow glowA"></div>
<div className="bgGlow glowB"></div>
<div className="scanLines"></div>

<div className="titleWrap">

<p className="eyebrow">
GALACTIC REWARDS
</p>

<h2>
Win <span>Epic Prizes</span>
</h2>

<p className="subtitle">
Push your limits, dominate the leaderboard and claim futuristic rewards.
</p>

</div>

<div className="rewardWrap">

{prizes.map((p)=>(

<div
key={p.place}
className={`rewardCard ${p.cls}`}
>

<div className="cursorGlow"></div>

<div className="energyRing ring1"></div>
<div className="energyRing ring2"></div>

<div className="crystal">

<svg
viewBox="0 0 120 120"
fill="none"
>

<defs>

<linearGradient
id="crystal"
x1="0"
y1="0"
x2="1"
y2="1"
>

<stop offset="0%" stopColor="#6ff"/>
<stop offset="50%" stopColor="#ff355b"/>
<stop offset="100%" stopColor="#ffffff"/>

</linearGradient>

</defs>

<polygon
points="60,6 98,34 82,110 38,110 22,34"
fill="url(#crystal)"
stroke="#fff"
strokeWidth="2"
/>

</svg>

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
