import { Link } from 'react-router-dom';

/**
 * VNR Green Premium Logo
 * Mark: Double-leaf crown with central lightning bolt — luxury EV symbol
 * variant: 'dark' | 'light'
 */
export default function Logo({ size = 'md', linkTo = '/', variant = 'dark' }) {
  const h          = size === 'lg' ? 46 : size === 'sm' ? 30 : 38;
  const textColor  = variant === 'light' ? '#FFFFFF' : '#0F172A';
  const subColor   = variant === 'light' ? 'rgba(255,255,255,0.42)' : '#64748B';
  const greenWord  = variant === 'light' ? '#4ADE80' : '#148040';
  const nameSz     = size === 'lg' ? 21 : size === 'sm' ? 14 : 17.5;
  const subSz      = size === 'sm' ? 7 : 8.5;

  return (
    <Link to={linkTo} style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', userSelect: 'none' }}>
      {/* ── Premium Mark ── */}
      <svg width={h} height={h} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="mark-outer" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%"   stopColor="#22C060"/>
            <stop offset="45%"  stopColor="#148040"/>
            <stop offset="100%" stopColor="#052E14"/>
          </linearGradient>
          <linearGradient id="mark-inner" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%"   stopColor="#45D678"/>
            <stop offset="100%" stopColor="#0F6B31"/>
          </linearGradient>
          <filter id="mark-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Outer diamond/rhombus background */}
        <path d="M24 2L44 24L24 46L4 24Z" fill="url(#mark-outer)" />
        {/* Inner diamond border */}
        <path d="M24 7L39 24L24 41L9 24Z" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"/>

        {/* Left leaf */}
        <path d="M12 18C12 18 10 22 12 26C14 30 18 29 18 29C18 29 20 25 18 21C16 17 12 18 12 18Z"
          fill="rgba(255,255,255,0.55)" />
        {/* Right leaf */}
        <path d="M36 18C36 18 38 22 36 26C34 30 30 29 30 29C30 29 28 25 30 21C32 17 36 18 36 18Z"
          fill="rgba(255,255,255,0.35)" />

        {/* Central Lightning bolt — premium EV symbol */}
        <path d="M26 9L16 25H23.5L21 39L32 23H24.5L26 9Z"
          fill="white" filter="url(#mark-glow)"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))' }}/>

        {/* Small shine dot top */}
        <circle cx="24" cy="5" r="1.5" fill="rgba(255,255,255,0.6)"/>
      </svg>

      {/* ── Wordmark ── */}
      <div>
        <div style={{
          fontFamily: "'Montserrat', system-ui, sans-serif",
          fontSize: nameSz, fontWeight: 800,
          letterSpacing: '-0.02em', lineHeight: 1.1,
          color: textColor,
          display: 'flex', alignItems: 'baseline', gap: 3,
        }}>
          VNR
          <span style={{
            color: greenWord,
            fontWeight: 900,
            marginLeft: 1,
          }}>Green</span>
        </div>
        <div style={{
          fontFamily: "'Open Sans', system-ui, sans-serif",
          fontSize: subSz, fontWeight: 600,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: subColor, lineHeight: 1, marginTop: 2.5,
        }}>
          Automobiles
        </div>
      </div>
    </Link>
  );
}
