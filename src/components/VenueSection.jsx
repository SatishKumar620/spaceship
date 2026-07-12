import "./VenueSection.css";

const info = [
  {
    title:"Location",
    value1:"RVSCET Jamshedpur",
    value2:"Jharkhand, India",
    color:"red",
    icon:(
<svg viewBox="0 0 64 64">
<path d="M32 58C32 58 48 41 48 26C48 17.2 40.8 10 32 10S16 17.2 16 26C16 41 32 58 32 58Z"/>
<circle cx="32" cy="26" r="6"/>
</svg>
)
  },

  {
    title:"Mission Date",
    value1:"October 7-8",
    value2:"2025",
    color:"blue",
    icon:(
<svg viewBox="0 0 64 64">
<rect x="10" y="14" width="44" height="40" rx="5"/>
<line x1="10" y1="24" x2="54" y2="24"/>
<line x1="22" y1="8" x2="22" y2="20"/>
<line x1="42" y1="8" x2="42" y2="20"/>
</svg>
)
  },

  {
    title:"Duration",
    value1:"24 Hours",
    value2:"09:00 AM Start",
    color:"silver",
    icon:(
<svg viewBox="0 0 64 64">
<circle cx="32" cy="32" r="20"/>
<line x1="32" y1="32" x2="32" y2="20"/>
<line x1="32" y1="32" x2="42" y2="38"/>
</svg>
)
  },

  {
    title:"Crew Capacity",
    value1:"200+ Participants",
    value2:"Teams of 2-4",
    color:"green",
    icon:(
<svg viewBox="0 0 64 64">
<circle cx="22" cy="22" r="6"/>
<circle cx="42" cy="22" r="6"/>
<circle cx="32" cy="18" r="7"/>
<path d="M16 46c2-7 8-10 16-10s14 3 16 10"/>
</svg>
)
  }

];

export default function VenueSection(){

return(

<section id="venue" className="venueSection">

<div className="spaceGrid"></div>
<div className="nebula red"></div>
<div className="nebula blue"></div>
<div className="scanBeam"></div>

<div className="heading">

<p>GALACTIC DOCKING BAY</p>

<h2>

Race <span>Location</span>

</h2>

<p className="desc">

Mission coordinates locked.
Prepare your crew for launch.

</p>

</div>

<div className="terminal">

<div className="cards">


{

info.map((item,index)=>(

<div
className={`infoCard ${item.color}`}
key={index}
>

<div className="icon">

{item.icon}

</div>

<div>

<h3>

{item.title}

</h3>

<h4>

{item.value1}

</h4>

<p>

{item.value2}

</p>

</div>

</div>

))

}

</div>

</div>

<div className="stars">

{

Array.from({length:80}).map((_,i)=>

<span
key={i}
style={{
left:`${Math.random()*100}%`,
animationDelay:`${Math.random()*6}s`,
animationDuration:`${5+Math.random()*6}s`
}}
></span>

)

}

</div>

</section>

)

}
