import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import { VEHICLES, COMPANY } from '../data/vehicles';
import VehicleModal from '../components/VehicleModal';

export default function VehicleDetail() {
  const { slug } = useParams();
  const v = VEHICLES.find(x => x.slug === slug);
  if (!v) return <Navigate to="/vehicles" replace />;

  const [modal, setModal] = useState(false);
  const specsRef = useReveal();
  const featRef  = useReveal();
  const related  = VEHICLES.filter(x => x.category === v.category && x.id !== v.id).slice(0, 3);

  return (
    <div className="page-wrap">
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '13px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--text-muted)' }}>
          <Link to="/" style={{ transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--g-600)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Home</Link>
          <span>/</span>
          <Link to="/vehicles" style={{ transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--g-600)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Vehicles</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{v.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'var(--gray-50)', padding: '64px 0', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="det-hero-grid">
            <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--g-600)', background: 'var(--g-50)', border: '1px solid var(--primary-border)', padding: '4px 12px', borderRadius: 100 }}>{v.category.replace(/-/g,' ')}</span>
                {v.badge && <span className={`badge ${v.badgeType === 'amber' ? 'badge-black' : 'badge-green'}`}>{v.badge}</span>}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 8 }}>{v.name}</h1>
              <p style={{ fontSize: 16, color: 'var(--g-600)', fontStyle: 'italic', marginBottom: 18, fontWeight: 500 }}>{v.tagline}</p>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.78, fontWeight: 300, marginBottom: 30, maxWidth: 440 }}>{v.description}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => setModal(true)}>
                  360° View + Details
                </button>
                <Link to="/contact" className="btn btn-outline btn-lg">Request Quote →</Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              onClick={() => setModal(true)}>
              <div style={{ position: 'relative', background: 'linear-gradient(145deg,var(--g-50),var(--white))', borderRadius: 28, padding: '40px', border: '1.5px solid var(--primary-border)', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ fontSize: 160, userSelect: 'none', filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.15))`, lineHeight: 1, animation: 'float 5s ease-in-out infinite' }}>{v.icon}</div>
                <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'var(--g-600)', color: '#fff', borderRadius: 100, padding: '5px 14px', fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/></svg>
                  Click for 360°
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Specs + Features */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }} className="specs-grid">
            <div ref={specsRef} className="reveal">
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>Technical Specifications</div>
              <div style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                {v.specs.map((s, i) => (
                  <div key={s.label} className="spec-row" style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.8)' }}>
                    <span className="spec-label">{s.label}</span>
                    <span className="spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={featRef} className="reveal d2">
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>Key Features</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {v.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'var(--gray-50)', border: '1px solid var(--border)', transition: 'all 0.22s', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--g-50)'; e.currentTarget.style.borderColor = 'var(--primary-border)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--g-50)', border: '1.5px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--g-600)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 20 }}>
                {v.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 52, background: 'var(--g-50)', border: '1px solid var(--primary-border)', borderRadius: 20, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>Interested in {v.name}?</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>Get pricing, availability and demo details from our team.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={() => setModal(true)}>360° Explore</button>
              <Link to="/contact" className="btn btn-outline">Request Quote →</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-sm" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>Related Vehicles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="rel-grid">
              {related.map(r => (
                <Link key={r.id} to={`/vehicles/${r.slug}`} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
                  <div style={{ fontSize: 40, flexShrink: 0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{r.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`
            @media(max-width:768px){.rel-grid{grid-template-columns:1fr !important;}}
            @media(max-width:900px){.det-hero-grid{grid-template-columns:1fr !important;} .det-hero-grid>div:last-child{display:none;}}
            @media(max-width:768px){.specs-grid{grid-template-columns:1fr !important;}}
          `}</style>
        </section>
      )}

      <AnimatePresence>{modal && <VehicleModal vehicle={v} onClose={() => setModal(false)} />}</AnimatePresence>
    </div>
  );
}
