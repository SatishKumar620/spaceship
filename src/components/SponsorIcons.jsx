import React from "react";


export function SatelliteIcon() {
  return (
    <svg viewBox="0 0 64 64" className="sponsor-svg" fill="none" xmlns="http://www.w3.org/2000/svg">

      <defs>

        <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9aa9"/>
          <stop offset="100%" stopColor="#ff214f"/>
        </linearGradient>

        <radialGradient id="coreGrad">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset=".45" stopColor="#ff5778"/>
          <stop offset="1" stopColor="#ff214f"/>
        </radialGradient>

        <filter id="satGlow">
          <feGaussianBlur stdDeviation="2.4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

      </defs>

      <g className="orbitRing">
        <circle
          cx="32"
          cy="32"
          r="25"
          stroke="url(#satGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          opacity=".45"
        />
      </g>

      <path
        d="M43 20Q56 32 43 44"
        stroke="url(#satGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#satGlow)"
      />

      <path
        d="M48 15Q63 32 48 49"
        stroke="url(#satGrad)"
        strokeWidth="1.5"
        opacity=".6"
        strokeLinecap="round"
      />

      <rect
        x="10"
        y="24"
        width="11"
        height="16"
        rx="1.5"
        stroke="url(#satGrad)"
        strokeWidth="1.5"
      />

      <rect
        x="43"
        y="24"
        width="11"
        height="16"
        rx="1.5"
        stroke="url(#satGrad)"
        strokeWidth="1.5"
      />

      <line x1="21" y1="32" x2="26" y2="32" stroke="url(#satGrad)" strokeWidth="2"/>
      <line x1="38" y1="32" x2="43" y2="32" stroke="url(#satGrad)" strokeWidth="2"/>

      <rect
        x="26"
        y="24"
        width="12"
        height="16"
        rx="2"
        fill="#111"
        stroke="url(#satGrad)"
        strokeWidth="1.6"
        filter="url(#satGlow)"
      />

      <circle
        cx="32"
        cy="32"
        r="3.5"
        fill="url(#coreGrad)"
      >
        <animate attributeName="r"
                 values="3.5;4.3;3.5"
                 dur="2s"
                 repeatCount="indefinite"/>
      </circle>

      <circle
        cx="32"
        cy="16"
        r="2"
        fill="#ff3558"
      >
        <animate attributeName="opacity"
                 values="1;.2;1"
                 dur="1.4s"
                 repeatCount="indefinite"/>
      </circle>

      <line
        x1="32"
        y1="24"
        x2="32"
        y2="18"
        stroke="url(#satGrad)"
        strokeWidth="1.5"
      />

    </svg>
  );
}




export const DockIcon = () => (
<svg viewBox="0 0 64 64" className="sponsor-svg" fill="none">

<defs>

<linearGradient id="dockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#ff8aa5"/>
<stop offset="100%" stopColor="#ff214f"/>
</linearGradient>

<filter id="dockGlow">
<feGaussianBlur stdDeviation="2.2" result="blur"/>
<feMerge>
<feMergeNode in="blur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>

</defs>

<g className="orbitRing">

<circle
cx="32"
cy="32"
r="24"
stroke="url(#dockGrad)"
strokeWidth="1.4"
strokeDasharray="6 5"
opacity=".45"
/>

</g>

<circle
cx="32"
cy="32"
r="10"
stroke="url(#dockGrad)"
strokeWidth="2"
filter="url(#dockGlow)"
/>

<circle
cx="32"
cy="32"
r="5"
fill="#111"
stroke="url(#dockGrad)"
strokeWidth="1.5"
/>

<line x1="32" y1="8" x2="32" y2="18"
stroke="url(#dockGrad)"
strokeWidth="2"/>

<line x1="32" y1="46" x2="32" y2="56"
stroke="url(#dockGrad)"
strokeWidth="2"/>

<line x1="8" y1="32" x2="18" y2="32"
stroke="url(#dockGrad)"
strokeWidth="2"/>

<line x1="46" y1="32" x2="56" y2="32"
stroke="url(#dockGrad)"
strokeWidth="2"/>

<circle
cx="32"
cy="32"
r="2.8"
fill="#ff3558">

<animate
attributeName="r"
values="2.8;3.8;2.8"
dur="2s"
repeatCount="indefinite"/>

</circle>

<circle cx="32" cy="8" r="1.2" fill="#ff3558"/>
<circle cx="56" cy="32" r="1.2" fill="#ff3558"/>
<circle cx="32" cy="56" r="1.2" fill="#ff3558"/>
<circle cx="8" cy="32" r="1.2" fill="#ff3558"/>

</svg>
);



export const RadarIcon = () => (
<svg viewBox="0 0 64 64" className="sponsor-svg" fill="none">

<defs>

<linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#7df9ff"/>
<stop offset="100%" stopColor="#008cff"/>
</linearGradient>

<filter id="radarGlow">
<feGaussianBlur stdDeviation="2"/>
<feMerge>
<feMergeNode in="blur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>

</defs>

<g transform="translate(32 32)">

<circle
r="25"
stroke="url(#radarGrad)"
strokeWidth="1.2"
strokeDasharray="4 6"
opacity=".35"
/>

<circle
r="18"
stroke="url(#radarGrad)"
strokeWidth="1.5"
opacity=".55"
/>

<circle
r="9"
stroke="url(#radarGrad)"
strokeWidth="2"
filter="url(#radarGlow)"
/>

<path
d="M0 0 L0 -22 A22 22 0 0 1 18 10 Z"
fill="#00c8ff"
opacity=".18">

<animateTransform
attributeName="transform"
type="rotate"
from="0"
to="360"
dur="4s"
repeatCount="indefinite"/>

</path>

<line
x1="-26"
y1="0"
x2="26"
y2="0"
stroke="url(#radarGrad)"
strokeWidth="1"
opacity=".35"
/>

<line
x1="0"
y1="-26"
x2="0"
y2="26"
stroke="url(#radarGrad)"
strokeWidth="1"
opacity=".35"
/>

<circle
r="3"
fill="#00eaff">

<animate
attributeName="r"
values="3;5;3"
dur="1.8s"
repeatCount="indefinite"/>

</circle>

<circle
cx="12"
cy="-9"
r="2"
fill="#7df9ff">

<animate
attributeName="opacity"
values="1;.2;1"
dur="1.5s"
repeatCount="indefinite"/>

</circle>

<circle
cx="-15"
cy="7"
r="1.5"
fill="#7df9ff"/>

</g>

</svg>
);



export const BeaconIcon = () => (
<svg viewBox="0 0 64 64" className="sponsor-svg" fill="none">

<defs>

<linearGradient id="beaconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#ffe27a"/>
<stop offset="100%" stopColor="#ff8c00"/>
</linearGradient>

<filter id="beaconGlow">
<feGaussianBlur stdDeviation="2.5" result="blur"/>
<feMerge>
<feMergeNode in="blur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>

</defs>

<g>

{/* Signal waves */}

<path
d="M32 12 C45 18 45 46 32 52"
stroke="url(#beaconGrad)"
strokeWidth="1.5"
opacity=".35">

<animate
attributeName="opacity"
values=".2;.8;.2"
dur="2s"
repeatCount="indefinite"/>

</path>

<path
d="M32 18 C40 22 40 42 32 46"
stroke="url(#beaconGrad)"
strokeWidth="1.8"
opacity=".55">

<animate
attributeName="opacity"
values=".3;1;.3"
dur="2s"
repeatCount="indefinite"/>

</path>


{/* Beacon tower */}

<path
d="M26 48 L32 14 L38 48 Z"
fill="#111"
stroke="url(#beaconGrad)"
strokeWidth="2"
filter="url(#beaconGlow)"
/>

<line
x1="32"
y1="20"
x2="32"
y2="42"
stroke="url(#beaconGrad)"
strokeWidth="2"
/>


{/* Energy core */}

<circle
cx="32"
cy="14"
r="5"
fill="#ffcc33"
filter="url(#beaconGlow)">

<animate
attributeName="r"
values="5;7;5"
dur="1.6s"
repeatCount="indefinite"/>

</circle>


{/* Base */}

<path
d="M20 50 H44"
stroke="url(#beaconGrad)"
strokeWidth="3"
strokeLinecap="round"
/>

<circle
cx="32"
cy="50"
r="2"
fill="#fff2a6"/>

</g>

</svg>
);


