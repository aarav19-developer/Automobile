import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import { VEHICLES, COMPANY } from '../data/vehicles';

/* ── Inline 360° viewer ── */
function View360({ vehicle, activeColor }) {
  const [angle, setAngle]       = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const startX    = useRef(null);
  const startAngle = useRef(0);

  useEffect(() => { if (dragging) setShowHint(false); }, [dragging]);

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true); startX.current = e.clientX; startAngle.current = angle;
  }, [angle]);
  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    setAngle(startAngle.current + (e.clientX - startX.current) * 1.2);
  }, [dragging]);
  const onPointerUp = useCallback(() => setDragging(false), []);

  const normalised  = ((angle % 360) + 360) % 360;
  const perspective = Math.cos((normalised / 180) * Math.PI);
  const scaleX      = 0.78 + 0.22 * Math.abs(perspective);
  const brightness  = 0.75 + 0.25 * Math.abs(perspective);

  return (
    <div onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
      style={{
        position:'relative', borderRadius:24, overflow:'hidden', cursor:'grab',
        userSelect:'none', aspectRatio:'4/3', width:'100%',
        background: activeColor?.bg || 'linear-gradient(145deg,var(--g-50),var(--white))',
        border:'1.5px solid var(--primary-border)',
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'background 0.4s',
      }}>
      {/* Ground shadow */}
      <div style={{ position:'absolute', bottom:'10%', left:'50%', transform:'translateX(-50%)',
        width:`${scaleX*55}%`, height:14, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(0,0,0,0.10) 0%, transparent 70%)' }} />
      {/* Vehicle icon */}
      <div style={{
        fontSize:'clamp(100px,20vw,160px)',
        transform:`scaleX(${perspective < 0 ? -scaleX : scaleX})`,
        filter:`brightness(${brightness}) drop-shadow(0 12px 24px rgba(0,0,0,0.13)) ${activeColor?.filter||''}`,
        transition:'filter 0.3s', userSelect:'none', lineHeight:1,
      }}>{vehicle.icon}</div>
      {/* Angle arc */}
      <div style={{ position:'absolute', bottom:12, right:12, width:38, height:38 }}>
        <svg viewBox="0 0 38 38" fill="none" width="38" height="38">
          <circle cx="19" cy="19" r="16" stroke="rgba(20,128,64,0.15)" strokeWidth="2"/>
          <circle cx="19" cy="19" r="16" stroke="var(--g-500)" strokeWidth="2"
            strokeDasharray={`${(normalised/360)*100.5} 100.5`} strokeLinecap="round"
            transform="rotate(-90 19 19)" style={{ transition:'stroke-dasharray 0.05s' }}/>
          <text x="19" y="23" textAnchor="middle" fontSize="7.5" fontWeight="700"
            fill="var(--g-700)" fontFamily="var(--font-mono)">{Math.round(normalised)}°</text>
        </svg>
      </div>
      {/* Drag hint */}
      {showHint && (
        <div style={{
          position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)',
          background:'rgba(0,0,0,0.55)', color:'#fff', borderRadius:100,
          padding:'5px 14px', fontSize:11.5, fontWeight:600, letterSpacing:'0.06em',
          display:'flex', alignItems:'center', gap:7, pointerEvents:'none',
          whiteSpace:'nowrap',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 16l-4-4 4-4M17 8l4 4-4 4"/>
          </svg>
          Drag to rotate 360°
        </div>
      )}
    </div>
  );
}

export default function VehicleDetail() {
  const { slug } = useParams();
  const v = VEHICLES.find(x => x.slug === slug);
  if (!v) return <Navigate to="/products" replace />;

  const colors     = v.colors || [{ id:'green', label:'Forest Green', hex:'#22C060', bg:'#F0FDF4', filter:'hue-rotate(0deg)' }];
  const firstColor = colors[0];
  const [activeColor, setActiveColor] = useState({ ...firstColor, bg: firstColor.bg || '#F0FDF4' });
  const [tab,   setTab]   = useState('overview');
  const specsRef = useReveal();
  const related  = VEHICLES.filter(x => x.category === v.category && x.id !== v.id && !x.comingSoon && !x.isBattery).slice(0,3);

  const tabs = [
    { id:'overview', label:'Overview' },
    { id:'specs',    label:'Specs' },
    { id:'features', label:'Features' },
    { id:'special',  label:'Why Choose' },
  ];

  return (
    <div className="page-wrap">

      {/* ── Breadcrumb ── */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--border)', padding:'13px 0' }}>
        <div className="container" style={{ display:'flex', alignItems:'center', gap:8, fontSize:12.5, color:'var(--text-muted)', flexWrap:'wrap' }}>
          <Link to="/" style={{ transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--g-600)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--g-600)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Products</Link>
          <span>/</span>
          <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{v.name}</span>
        </div>
      </div>

      {/* ── Main Detail Section ── */}
      <section style={{ background:'var(--white)', padding:'32px 0 48px' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }} className="det-main-grid">

            {/* LEFT — 360° viewer + color picker */}
            <div>
              <View360 vehicle={v} activeColor={activeColor} />

              {/* Color swatches */}
              <div style={{ marginTop:18 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:10.5, fontWeight:700,
                  letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:10 }}>
                  Color — <span style={{ color:'var(--g-700)' }}>{activeColor.label}</span>
                </div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  {colors.map(c => (
                    <button key={c.id} title={c.label}
                      onClick={() => setActiveColor({ ...c, bg: c.bg || '#F0FDF4' })}
                      style={{ width:32, height:32, borderRadius:'50%', cursor:'pointer',
                        background:c.hex,
                        border: activeColor.id===c.id ? '3px solid var(--g-600)' : '3px solid rgba(0,0,0,0.08)',
                        transform: activeColor.id===c.id ? 'scale(1.2)' : 'scale(1)',
                        transition:'all 0.22s', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Quick specs grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:18 }}>
                {v.specs.slice(0,4).map(s => (
                  <div key={s.label} style={{ background:'var(--gray-50)', borderRadius:10,
                    padding:'10px 14px', border:'1px solid var(--border)' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:9.5, fontWeight:700,
                      letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:3 }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:12.5, fontWeight:700, color:'var(--text-primary)' }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — name, tabs, content, CTAs */}
            <div>
              {/* Badges */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.18em',
                  textTransform:'uppercase', color:'var(--g-600)', background:'var(--g-50)',
                  border:'1px solid var(--primary-border)', padding:'4px 12px', borderRadius:100 }}>
                  {v.category.replace(/-/g,' ')}
                </span>
                {v.badge && <span className={`badge ${v.badgeType==='amber'?'badge-black':v.badgeType==='outline'?'badge-outline':'badge-green'}`}>{v.badge}</span>}
              </div>

              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,4vw,42px)',
                fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:6 }}>
                {v.name}
              </h1>
              <p style={{ fontSize:15, color:'var(--g-600)', fontStyle:'italic', marginBottom:6, fontWeight:500 }}>{v.tagline}</p>
              <p style={{ fontSize:13.5, color:'var(--text-muted)', marginBottom:20, fontWeight:300 }}>{v.subtitle}</p>

              {/* Tab bar */}
              <div style={{ display:'flex', gap:3, marginBottom:20,
                background:'rgba(20,128,64,0.05)', borderRadius:10, padding:4 }}>
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    style={{ flex:1, padding:'8px 6px', borderRadius:7, fontSize:12, fontWeight:700,
                      cursor:'pointer', border:'none', fontFamily:'var(--font-display)',
                      background: tab===t.id ? 'var(--white)' : 'transparent',
                      color: tab===t.id ? 'var(--g-700)' : 'var(--text-muted)',
                      boxShadow: tab===t.id ? '0 2px 8px rgba(20,128,64,0.1)' : 'none',
                      transition:'all 0.2s' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ minHeight:180 }}>
                {tab==='overview' && (
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--text-secondary)', lineHeight:1.78, marginBottom:16 }}>
                      {v.description}
                    </p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {v.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                )}
                {tab==='specs' && (
                  <div style={{ background:'var(--gray-50)', borderRadius:12, overflow:'hidden', border:'1px solid rgba(20,128,64,0.12)' }}>
                    {v.specs.map((s,i) => (
                      <div key={s.label} className="spec-row" style={{ background: i%2===0 ? 'transparent' : 'rgba(20,128,64,0.02)' }}>
                        <span className="spec-label">{s.label}</span>
                        <span className="spec-value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab==='features' && (
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {v.features.map(f => (
                      <div key={f} style={{ display:'flex', alignItems:'center', gap:10,
                        padding:'10px 13px', borderRadius:8, background:'var(--gray-50)',
                        border:'1px solid rgba(20,128,64,0.1)', transition:'all 0.2s', cursor:'default' }}
                        onMouseEnter={e => { e.currentTarget.style.background='var(--g-50)'; e.currentTarget.style.borderColor='var(--primary-border)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='var(--gray-50)'; e.currentTarget.style.borderColor='rgba(20,128,64,0.1)'; }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:'var(--g-50)',
                          border:'1.5px solid var(--primary-border)', display:'flex', alignItems:'center',
                          justifyContent:'center', flexShrink:0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--g-600)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <span style={{ fontSize:13.5, color:'var(--text-secondary)', fontWeight:500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab==='special' && (
                  <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                    {(v.specialFeatures||[]).map((f,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12,
                        padding:'11px 14px', borderRadius:10,
                        background:'linear-gradient(135deg,var(--g-50),rgba(20,128,64,0.03))',
                        border:'1px solid var(--primary-border)', cursor:'default' }}>
                        <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0,
                          background:'var(--g-600)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <span style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--g-800)', fontWeight:500, lineHeight:1.55 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div style={{ display:'flex', gap:10, marginTop:24, paddingTop:20, borderTop:'1px solid rgba(20,128,64,0.1)', flexWrap:'wrap' }}>
                <Link to="/contact" className="btn btn-primary btn-lg" style={{ flex:1, justifyContent:'center', minWidth:140 }}>
                  Request Quote →
                </Link>
                <a href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${v.name}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex:1, minWidth:140, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    padding:'14px 16px', borderRadius:10, background:'#25D366', color:'#fff',
                    fontFamily:'var(--font-display)', fontSize:14, fontWeight:700,
                    textDecoration:'none', boxShadow:'0 4px 16px rgba(37,211,102,0.30)',
                    transition:'background 0.22s, transform 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#128C7E'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.transform='none'; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Vehicles ── */}
      {related.length > 0 && (
        <section style={{ background:'var(--gray-50)', padding:'32px 0 48px', borderTop:'1px solid var(--border)' }}>
          <div className="container">
            <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.18em',
              textTransform:'uppercase', color:'var(--text-muted)', marginBottom:20 }}>Related Products</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="rel-grid">
              {related.map(r => (
                <Link key={r.id} to={`/products/${r.slug}`} className="card"
                  style={{ padding:'18px 20px', display:'flex', alignItems:'center', gap:16, textDecoration:'none' }}>
                  <div style={{ fontSize:40, flexShrink:0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{r.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)', fontStyle:'italic' }}>{r.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media(max-width:900px){
          .det-main-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media(max-width:768px){
          .rel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
