import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import { VEHICLES, CATEGORIES } from '../data/vehicles';
import VehicleModal from '../components/VehicleModal';

export default function Vehicles() {
  const [active, setActive] = useState('all');
  const [modal,  setModal]  = useState(null);
  const titleRef = useReveal();
  /* Remove battery from categories */
  const cats = CATEGORIES.filter(c => c.id !== 'battery');
  const filtered = active === 'all' ? VEHICLES : VEHICLES.filter(v => v.category === active);

  return (
    <div className="page-wrap">
      <div style={{ background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)', padding:'44px 0 40px',
        borderBottom:'1px solid rgba(20,128,64,0.1)',
        position:'relative', overflow:'hidden' }}>
        <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.4 }} />
        <div style={{ position:'absolute', right:'5%', top:'50%', transform:'translateY(-50%)',
          width:340, height:340, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.08) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="eyebrow">Our Products</div>
          <h1 className="section-title">Complete <span className="text-green">EV Range</span></h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
            maxWidth:500, marginTop:12, lineHeight:1.75 }}>
            Click any vehicle card to explore 360° view, available colors, full specifications and special features.
          </p>
        </div>
      </div>

      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:44 }}>
            {cats.map(cat => (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                style={{ padding:'9px 22px', borderRadius:10, fontFamily:'var(--font-display)',
                  fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.25s',
                  border: active===cat.id ? 'none' : '1.5px solid rgba(20,128,64,0.2)',
                  background: active===cat.id
                    ? 'linear-gradient(135deg,var(--g-700),var(--g-500))'
                    : 'rgba(20,128,64,0.03)',
                  color: active===cat.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: active===cat.id ? '0 4px 20px rgba(20,128,64,0.30)' : 'none',
                  transform: active===cat.id ? 'translateY(-1px)' : 'none' }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid — always even rows */}
          <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}
            className="veh-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((v, i) => (
                <motion.div key={v.id} layout
                  initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, scale:0.95 }}
                  transition={{ delay: (i%3)*0.06, duration:0.48 }}
                  style={{ background:'var(--white)', border:'1px solid rgba(20,128,64,0.12)',
                    borderRadius:20, overflow:'hidden', cursor:'pointer',
                    transition:'all 0.35s var(--ease)', position:'relative' }}
                  onClick={() => setModal(v)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(20,128,64,0.14)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                  {/* Image */}
                  <div style={{ height:196, position:'relative',
                    background:'linear-gradient(145deg,#EDF8F1,#F4FAF6)',
                    display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    <div style={{ position:'absolute', inset:0,
                      background:`radial-gradient(circle at 50% 65%, rgba(20,128,64,0.1), transparent 65%)` }} />
                    <motion.div whileHover={{ scale:1.15, y:-8 }}
                      transition={{ type:'spring', stiffness:300, damping:20 }}
                      style={{ fontSize:74, zIndex:1, userSelect:'none',
                        filter:'drop-shadow(0 10px 20px rgba(20,128,64,0.2))' }}>
                      {v.icon}
                    </motion.div>
                    {v.badge && (
                      <span className={`badge ${v.badgeType==='amber'?'badge-black':v.badgeType==='outline'?'badge-outline':'badge-green'}`}
                        style={{ position:'absolute', top:12, left:12 }}>{v.badge}</span>
                    )}
                    {/* 360 */}
                    <div style={{ position:'absolute', bottom:10, right:10,
                      background:'rgba(10,74,34,0.82)', color:'#86ECA8', borderRadius:100,
                      padding:'4px 10px', fontSize:9.5, fontWeight:700, letterSpacing:'0.1em',
                      display:'flex', alignItems:'center', gap:5, fontFamily:'var(--font-display)' }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                      </svg>360°
                    </div>
                    {/* Color dots */}
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
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700,
                      color:'var(--text-primary)', marginBottom:4 }}>{v.name}</h3>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--g-600)',
                      fontStyle:'italic', marginBottom:12, fontWeight:500 }}>{v.tagline}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)',
                      lineHeight:1.62, marginBottom:14 }}>
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
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>{modal && <VehicleModal vehicle={modal} onClose={() => setModal(null)} />}</AnimatePresence>
      <style>{`
        @media(max-width:1024px){.veh-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:560px){.veh-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </div>
  );
}
