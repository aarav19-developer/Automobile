import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { VEHICLES, CATEGORIES } from '../data/vehicles';

/* Battery manufacturing SVG icon */
function BatteryIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="48" height="32" rx="6" fill="rgba(20,128,64,0.15)" stroke="#22C060" strokeWidth="2.5"/>
      <rect x="52" y="24" width="8" height="16" rx="3" fill="#22C060"/>
      <path d="M20 32h8l-4-8 8 8h-8l4 8-8-8z" fill="#22C060"/>
      <circle cx="14" cy="32" r="2.5" fill="#45D678"/>
      <circle cx="38" cy="32" r="2.5" fill="#45D678"/>
      <rect x="10" y="28" width="8" height="8" rx="2" fill="rgba(34,192,96,0.3)" stroke="#22C060" strokeWidth="1.5"/>
      <rect x="34" y="28" width="8" height="8" rx="2" fill="rgba(34,192,96,0.3)" stroke="#22C060" strokeWidth="1.5"/>
    </svg>
  );
}

/* Battery card — links to detail page */
function BatteryCard({ v }) {
  return (
    <Link to={`/products/${v.slug}`} style={{ textDecoration:'none' }}>
      <div style={{
        background:'linear-gradient(145deg,#021A0A,#052E14)',
        border:'1.5px solid rgba(34,192,96,0.35)',
        borderRadius:20, overflow:'hidden', cursor:'pointer',
        transition:'border-color 0.3s, transform 0.3s, box-shadow 0.3s', position:'relative',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(34,192,96,0.7)'; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(20,128,64,0.30)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(34,192,96,0.35)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
      >
        <div style={{ height:3, background:'linear-gradient(90deg,#0A4A22,#22C060,#45D678)' }} />
        <div style={{ height:196, display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative', overflow:'hidden',
          background:'radial-gradient(circle at 50% 60%, rgba(34,192,96,0.12) 0%, transparent 70%)' }}>
          <span style={{ position:'absolute', top:12, left:12,
            background:'linear-gradient(135deg,var(--g-700),var(--g-500))',
            color:'#fff', borderRadius:100, padding:'4px 12px',
            fontSize:10, fontWeight:800, letterSpacing:'0.12em',
            textTransform:'uppercase', fontFamily:'var(--font-display)',
            boxShadow:'0 3px 10px rgba(20,128,64,0.45)' }}>Manufactured In-House</span>
          <div style={{ zIndex:1, filter:'drop-shadow(0 10px 28px rgba(34,192,96,0.4))' }}>
            <BatteryIcon />
          </div>
        </div>
        <div style={{ padding:'18px 20px 24px' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700,
            letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--g-300)', marginBottom:5 }}>
            Battery
          </div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, color:'#fff', marginBottom:4 }}>{v.name}</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--g-300)', fontStyle:'italic', marginBottom:12, fontWeight:500 }}>{v.tagline}</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.62, marginBottom:14 }}>
            {v.description.substring(0,90)}…
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
            {['Blast Proof','Fire Proof','7–8 Yr Life','Smart BMS'].map(t => (
              <span key={t} style={{ padding:'3px 10px', borderRadius:100, fontSize:10.5, fontWeight:700,
                background:'rgba(34,192,96,0.15)', border:'1px solid rgba(34,192,96,0.35)',
                color:'var(--g-300)', fontFamily:'var(--font-display)' }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            paddingTop:12, borderTop:'1px solid rgba(34,192,96,0.15)' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--g-400)' }}>2500+ Cycles · 7–8 Yrs</span>
            <span style={{ fontFamily:'var(--font-display)', fontSize:11.5, fontWeight:700,
              color:'var(--g-300)', display:'flex', alignItems:'center', gap:4 }}>
              View Details
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Coming soon card */
function ComingSoonCard({ v }) {
  return (
    <div style={{
      background:'linear-gradient(145deg,#f9fdf9,#fff)',
      border:'1.5px dashed rgba(217,119,6,0.45)',
      borderRadius:20, overflow:'hidden', position:'relative',
      transition:'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(217,119,6,0.7)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(217,119,6,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(217,119,6,0.45)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
    >
      <span style={{ position:'absolute', top:12, right:12,
        background:'linear-gradient(135deg,#D97706,#F59E0B)', color:'#fff', borderRadius:100,
        padding:'4px 12px', fontSize:10, fontWeight:800, letterSpacing:'0.12em',
        textTransform:'uppercase', boxShadow:'0 3px 10px rgba(217,119,6,0.4)',
        fontFamily:'var(--font-display)' }}>Coming Soon</span>
      <div style={{ height:196, display:'flex', alignItems:'center', justifyContent:'center',
        background:'linear-gradient(145deg,rgba(217,119,6,0.04),rgba(245,158,11,0.02))', position:'relative' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:64, marginBottom:8, filter:'grayscale(0.3) opacity(0.7)' }}>{v.icon}</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:700,
            letterSpacing:'0.15em', textTransform:'uppercase', color:'#D97706' }}>Launching Soon</div>
        </div>
      </div>
      <div style={{ padding:'18px 20px 22px' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700,
          letterSpacing:'0.18em', textTransform:'uppercase', color:'#D97706', marginBottom:5 }}>Electric Auto</div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{v.name}</h3>
        <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'#D97706', fontStyle:'italic', marginBottom:12, fontWeight:500 }}>{v.tagline}</p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)', lineHeight:1.62, marginBottom:14 }}>
          {v.description.substring(0,90)}…
        </p>
        <Link to="/contact" style={{
          display:'inline-flex', alignItems:'center', gap:7,
          padding:'9px 20px', borderRadius:100, fontSize:13, fontWeight:700,
          background:'linear-gradient(135deg,#D97706,#F59E0B)', color:'#fff', textDecoration:'none',
          fontFamily:'var(--font-display)', boxShadow:'0 4px 14px rgba(217,119,6,0.35)', transition:'all 0.25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(217,119,6,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 14px rgba(217,119,6,0.35)'; }}
        >Register Interest →</Link>
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive]   = useState('all');
  const [fadeKey, setFadeKey] = useState(0);
  const titleRef  = useReveal();
  const location  = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) setActive(cat);
  }, [location.search]);

  const handleTabChange = (id) => { setActive(id); setFadeKey(k => k + 1); };

  const filtered = active === 'all' ? VEHICLES : VEHICLES.filter(v => v.category === active);

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div style={{
        background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)',
        padding:'44px 0 40px', borderBottom:'1px solid rgba(20,128,64,0.1)',
        position:'relative', overflow:'hidden',
      }}>
        <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.4 }} />
        <div style={{ position:'absolute', right:'5%', top:'50%', transform:'translateY(-50%)',
          width:340, height:340, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.08) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={titleRef} className="reveal">
            <div className="eyebrow">Our Products</div>
            <h1 className="section-title">Complete <span className="text-green">Product Range</span></h1>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              maxWidth:560, marginTop:12, lineHeight:1.75 }}>
              Electric Scooty, Electric Loader, Electric Rickshaw, Electric Garbage Loader
              — and India's safest in-house manufactured LFP Battery.
            </p>
          </div>
        </div>
      </div>

      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:44 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => handleTabChange(cat.id)}
                style={{
                  padding:'9px 22px', borderRadius:10,
                  fontFamily:'var(--font-display)', fontSize:13, fontWeight:700,
                  cursor:'pointer', transition:'all 0.25s',
                  border: active===cat.id ? 'none' : '1.5px solid rgba(20,128,64,0.2)',
                  background: active===cat.id ? 'linear-gradient(135deg,var(--g-700),var(--g-500))' : 'rgba(20,128,64,0.03)',
                  color: active===cat.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: active===cat.id ? '0 4px 20px rgba(20,128,64,0.30)' : 'none',
                  transform: active===cat.id ? 'translateY(-1px)' : 'none',
                }}>{cat.label}</button>
            ))}
          </div>

          {/* Grid */}
          <div key={fadeKey} className="veh-grid"
            style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, animation:'prodFadeIn 0.28s ease' }}>
            {filtered.map((v) => {
              if (v.isBattery)  return <BatteryCard key={v.id} v={v} />;
              if (v.comingSoon) return <ComingSoonCard key={v.id} v={v} />;
              return (
                <Link key={v.id} to={`/products/${v.slug}`} style={{ textDecoration:'none' }}>
                  <div style={{
                    background:'var(--white)', border:'1px solid rgba(20,128,64,0.12)',
                    borderRadius:20, overflow:'hidden', cursor:'pointer', height:'100%',
                    transition:'border-color 0.3s, transform 0.3s, box-shadow 0.3s', position:'relative',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(20,128,64,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    {/* Image */}
                    <div style={{ height:196, position:'relative',
                      background:'linear-gradient(145deg,#EDF8F1,#F4FAF6)',
                      display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, rgba(20,128,64,0.1), transparent 65%)' }} />
                      <div style={{ fontSize:74, zIndex:1, userSelect:'none',
                        filter:'drop-shadow(0 10px 20px rgba(20,128,64,0.2))', transition:'transform 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.15) translateY(-8px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform='none'; }}>
                        {v.icon}
                      </div>
                      {v.badge && (
                        <span className={`badge ${v.badgeType==='amber'?'badge-black':v.badgeType==='outline'?'badge-outline':'badge-green'}`}
                          style={{ position:'absolute', top:12, left:12 }}>{v.badge}</span>
                      )}
                      <div style={{ position:'absolute', bottom:10, right:10,
                        background:'rgba(10,74,34,0.82)', color:'#86ECA8', borderRadius:100,
                        padding:'4px 10px', fontSize:9.5, fontWeight:700, letterSpacing:'0.1em',
                        display:'flex', alignItems:'center', gap:5, fontFamily:'var(--font-display)' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                        </svg>360°
                      </div>
                      <div style={{ position:'absolute', bottom:10, left:12, display:'flex', gap:4 }}>
                        {(v.colors||[]).slice(0,5).map(c => (
                          <div key={c.id} style={{ width:10, height:10, borderRadius:'50%',
                            background:c.hex, border:'1.5px solid rgba(255,255,255,0.8)',
                            boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }} />
                        ))}
                      </div>
                    </div>
                    {/* Body */}
                    <div style={{ padding:'18px 20px 22px' }}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700,
                        letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--g-600)', marginBottom:5 }}>
                        {v.category.replace(/-/g,' ')}
                      </div>
                      <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{v.name}</h3>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--g-600)', fontStyle:'italic', marginBottom:12, fontWeight:500 }}>{v.tagline}</p>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)', lineHeight:1.62, marginBottom:14 }}>
                        {v.description.substring(0,88)}…
                      </p>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                        {v.tags.slice(0,3).map(t => <span key={t} className="tag" style={{ fontSize:10.5 }}>{t}</span>)}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                        paddingTop:12, borderTop:'1px solid rgba(20,128,64,0.1)' }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>
                          {v.specs?.[0]?.value}
                        </span>
                        <span style={{ fontFamily:'var(--font-display)', fontSize:11.5, fontWeight:700,
                          color:'var(--g-600)', display:'flex', alignItems:'center', gap:4 }}>
                          Details + 360°
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){.veh-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:560px){.veh-grid{grid-template-columns:1fr !important;}}
        @keyframes prodFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
}
