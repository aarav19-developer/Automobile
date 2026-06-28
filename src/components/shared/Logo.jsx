import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', linkTo = '/', variant = 'dark' }) {
  /* Logo height capped so it fits inside navbar (56px pill height) */
  const h         = size === 'lg' ? 68 : size === 'sm' ? 56 : 62;
  const textColor = variant === 'light' ? '#FFFFFF' : '#0F172A';
  const subColor  = variant === 'light' ? 'rgba(255,255,255,0.55)' : '#64748B';
  const greenWord = variant === 'light' ? '#4ADE80' : '#148040';
  const nameSz    = size === 'lg' ? 30 : size === 'sm' ? 26 : 28;
  const subSz     = size === 'sm' ? 10 : 11;

  return (
    <Link
      to={linkTo}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* ── Logo image — fits within navbar pill ── */}
      <div style={{
        width: h, height: h, flexShrink: 0,
        mixBlendMode: 'luminosity',
        filter: 'brightness(1.1) contrast(1.1)',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
      >
        <picture>
          <source srcSet="/Logo.webp" type="image/webp" />
          <img
            src="/Logo.png"
            alt="VNR Green Automobiles"
            width={h}
            height={h}
            fetchpriority="high"
            decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </picture>
      </div>

      {/* ── Wordmark — left aligned so Automobiles sits under VNR Green ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',   /* left align both lines */
        justifyContent: 'center',
      }}>
        {/* VNR Green — main company name, bigger than nav links */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: nameSz,
          fontWeight: 900,
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          color: textColor,
          whiteSpace: 'nowrap',
        }}>
          VNR
          <span style={{ color: greenWord, marginLeft: 3 }}>Green</span>
        </div>

        {/* Automobiles — sits directly under VNR Green */}
        <div style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: subSz,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: subColor,
          lineHeight: 1,
          marginTop: 2,
          whiteSpace: 'nowrap',
        }}>
          Automobiles
        </div>
      </div>
    </Link>
  );
}
