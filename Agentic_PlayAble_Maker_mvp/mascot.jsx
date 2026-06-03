// AirvanaMaker v2 — Forge Mascot
// Friendly companion character: round body, soft eyes, gentle glow.
// Used in sidebar greeting, workbench, agent contexts.

const Mascot = ({ size = 64, mood = "happy", style }) => {
  const eyes = mood === "thinking"
    ? <g>
        <ellipse cx="38" cy="48" rx="4" ry="1.5" fill="#18172a"/>
        <ellipse cx="62" cy="48" rx="4" ry="1.5" fill="#18172a"/>
      </g>
    : mood === "wink"
    ? <g>
        <circle cx="38" cy="48" r="4" fill="#18172a"/>
        <circle cx="38" cy="46.5" r="1.3" fill="#fff"/>
        <path d="M58 48 Q62 45 66 48" stroke="#18172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </g>
    : <g>
        <circle cx="38" cy="48" r="4.5" fill="#18172a"/>
        <circle cx="62" cy="48" r="4.5" fill="#18172a"/>
        <circle cx="36.8" cy="46.4" r="1.6" fill="#fff"/>
        <circle cx="60.8" cy="46.4" r="1.6" fill="#fff"/>
      </g>;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0, ...style }}>
      <defs>
        <radialGradient id={`m-grad-${mood}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8c80ff"/>
          <stop offset="50%" stopColor="#5b4dff"/>
          <stop offset="100%" stopColor="#3c2fd0"/>
        </radialGradient>
        <radialGradient id={`m-highlight-${mood}`} cx="35%" cy="25%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,.5)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      {/* soft glow */}
      <circle cx="50" cy="55" r="44" fill={`url(#m-grad-${mood})`} opacity=".18"/>

      {/* main body — soft squircle */}
      <path
        d="M50 12 C76 12 88 26 88 52 C88 76 76 88 50 88 C24 88 12 76 12 52 C12 26 24 12 50 12 Z"
        fill={`url(#m-grad-${mood})`}
      />

      {/* highlight */}
      <ellipse cx="38" cy="32" rx="22" ry="14" fill={`url(#m-highlight-${mood})`}/>

      {/* antenna */}
      <circle cx="50" cy="8" r="3.5" fill="#ff7a3d"/>
      <line x1="50" y1="15" x2="50" y2="12" stroke="#ff7a3d" strokeWidth="2" strokeLinecap="round"/>

      {/* cheek blush */}
      <circle cx="30" cy="60" r="4" fill="#ff7a3d" opacity=".35"/>
      <circle cx="70" cy="60" r="4" fill="#ff7a3d" opacity=".35"/>

      {/* eyes */}
      {eyes}

      {/* smile */}
      <path
        d="M42 64 Q50 70 58 64"
        stroke="#18172a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

window.Mascot = Mascot;
