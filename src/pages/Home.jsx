import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal, useStaggerReveal, useCounter } from '../hooks/useReveal';
import { COMPANY, HERO_STATS, STRENGTHS, PROCESS_STEPS, VEHICLES, TRUST_ITEMS, TICKER_ITEMS } from '../data/vehicles';
import VehicleModal from '../components/VehicleModal';

/* ── SVG icon map — replaces emojis in strength cards ── */
const STRENGTH_ICONS = {
  factory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7-6-7 6v2l-6 4v6z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  ),
  battery: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="2"/>
      <path d="M23 13v-2"/>
      <path d="M7 10v4M11 10v4"/>
    </svg>
  ),
  award: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  ),
};

const TAGLINE_SUB = 'Meerut mein bana. India ke liye. Asli roads ke liye.';

function EVBoltRing() {
  return (
    <div style={{ position:'relative', width:'clamp(220px,32vw,300px)', height:'clamp(220px,32vw,300px)', flexShrink:0 }}>
      <motion.div animate={{ scale:[1,1.07,1], opacity:[0.35,0.65,0.35] }}
        transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', inset:-22, borderRadius:'50%', border:'1.5px solid rgba(20,128,64,0.22)' }} />
      <motion.div animate={{ rotate:360 }} transition={{ duration:18, repeat:Infinity, ease:'linear' }}
        style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1.5px dashed rgba(20,128,64,0.15)' }}>
        <div style={{ position:'absolute', top:-6, left:'50%', transform:'translateX(-50%)',
          width:12, height:12, borderRadius:'50%', background:'var(--g-500)', boxShadow:'0 0 18px rgba(20,128,64,0.7)' }} />
      </motion.div>
      <motion.div animate={{ rotate:-360 }} transition={{ duration:12, repeat:Infinity, ease:'linear' }}
        style={{ position:'absolute', inset:40, borderRadius:'50%', border:'1px solid rgba(20,128,64,0.1)' }}>
        <div style={{ position:'absolute', top:-5, left:'50%', transform:'translateX(-50%)',
          width:9, height:9, borderRadius:'50%', background:'var(--g-300)', boxShadow:'0 0 12px rgba(34,192,96,0.6)' }} />
      </motion.div>
      <motion.div animate={{ rotate:360 }} transition={{ duration:28, repeat:Infinity, ease:'linear' }}
        style={{ position:'absolute', inset:16, borderRadius:'50%', border:'0.5px solid rgba(20,128,64,0.07)' }}>
        <div style={{ position:'absolute', bottom:-4, left:'50%', transform:'translateX(-50%)',
          width:7, height:7, borderRadius:'50%', background:'var(--g-400)', boxShadow:'0 0 10px rgba(20,128,64,0.5)' }} />
      </motion.div>
      <div style={{ position:'absolute', inset:72, borderRadius:'50%',
        background:'linear-gradient(145deg,#fff,var(--g-50))', border:'2px solid var(--primary-border)',
        boxShadow:'0 0 48px rgba(20,128,64,0.12),inset 0 0 20px rgba(20,128,64,0.05)',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div animate={{ scale:[1,1.12,1] }} transition={{ duration:2.5, repeat:Infinity }}>
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <path d="M24 2L44 24L24 46L4 24Z" fill="url(#hg3)" />
            <path d="M26 9L16 25H23.5L21 39L32 23H24.5L26 9Z" fill="white" />
            <defs><linearGradient id="hg3" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#22C060"/><stop offset="100%" stopColor="#052E14"/>
            </linearGradient></defs>
          </svg>
        </motion.div>
      </div>
      <div style={{ position:'absolute', bottom:-44, left:'50%', transform:'translateX(-50%)',
        width:130, height:6, background:'rgba(20,128,64,0.1)', borderRadius:3, overflow:'hidden' }}>
        <motion.div style={{ height:'100%', background:'linear-gradient(90deg,var(--g-600),var(--g-300))', borderRadius:3 }}
          animate={{ width:['0%','88%','88%','0%'] }}
          transition={{ duration:3.2, repeat:Infinity, times:[0,0.5,0.8,1], ease:'easeInOut' }} />
      </div>
      <div style={{ position:'absolute', bottom:-62, left:'50%', transform:'translateX(-50%)',
        fontSize:9.5, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase',
        color:'var(--g-500)', whiteSpace:'nowrap', fontFamily:'var(--font-display)' }}>Charging…</div>
    </div>
  );
}

function Counter({ value, suffix }) {
  const ref = useCounter(value);
  return (
    <div style={{ display:'flex', alignItems:'flex-start', lineHeight:1, justifyContent:'center' }}>
      <span ref={ref} style={{ fontFamily:'var(--font-display)', fontSize:'clamp(34px,4.5vw,52px)',
        fontWeight:800, letterSpacing:'-0.04em',
        background:'linear-gradient(135deg,var(--g-700),var(--g-400))',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>0</span>
      <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2.5vw,26px)',
        fontWeight:800, color:'var(--g-500)', marginTop:4 }}>{suffix}</span>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow:'hidden', background:'var(--gray-900)', padding:'14px 0',
      borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(34,192,96,0.1)' }}>
      <motion.div animate={{ x:[0,-2800] }} transition={{ duration:42, repeat:Infinity, ease:'linear' }}
        style={{ display:'flex', gap:48, whiteSpace:'nowrap', width:'max-content' }}>
        {items.map((item,i) => (
          <span key={i} style={{ display:'flex', alignItems:'center', gap:14, fontSize:10.5,
            fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.28)', fontFamily:'var(--font-display)' }}>
            <span style={{ width:4, height:4, borderRadius:'50%', background:'var(--g-400)',
              display:'inline-block', boxShadow:'0 0 6px var(--g-400)' }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:'100vh', position:'relative', display:'flex',
      alignItems:'center', background:'#F4FAF6', overflow:'hidden', paddingTop:'var(--nav-h)' }}>
      <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.6 }} />
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600,
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(20,128,64,0.09) 0%,transparent 65%)' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:480, height:480,
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(34,192,96,0.06) 0%,transparent 65%)' }} />
      <div className="container hero-grid" style={{ position:'relative', zIndex:1,
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)',
        alignItems:'center', padding:'clamp(48px,8vw,100px) clamp(16px,3vw,40px)' }}>
        <div>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.6 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:9,
              background:'var(--g-50)', border:'1px solid var(--primary-border)',
              borderRadius:100, padding:'6px 18px', marginBottom:26 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--g-500)',
                display:'inline-block', boxShadow:'0 0 8px rgba(20,128,64,0.6)' }} />
              <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:700,
                letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--g-700)' }}>
                Backed by Dewan Group · Meerut, UP
              </span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8 }}
            style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(36px,5vw,68px)',
              letterSpacing:'-0.04em', lineHeight:1.02, color:'var(--gray-900)', marginBottom:18 }}>
            Charge Forward.<br />
            <span style={{ background:'linear-gradient(135deg,var(--g-600),var(--g-400))',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Drive Clean.
            </span><br />Lead India.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.34, duration:0.7 }}
            style={{ fontFamily:'var(--font-body)', fontSize:15, fontStyle:'italic', color:'var(--g-700)',
              lineHeight:1.75, fontWeight:400, maxWidth:420, marginBottom:10 }}>
            {TAGLINE_SUB}
          </motion.p>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.7 }}
            style={{ fontFamily:'var(--font-body)', fontSize:15.5, color:'var(--text-secondary)',
              lineHeight:1.78, fontWeight:400, maxWidth:420, marginBottom:36 }}>
            Premium E-Rickshaws, E-Loaders, EV Scooties and Smart LFP Batteries —
            commercial-grade durability backed by decades of industrial trust.
          </motion.p>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:40 }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore Products
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Request Quote</Link>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.64 }}
            style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['RTO Approved','CY Gold Motor','Smart LFP','CEAT Tyres','Dewan Group'].map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:6,
                fontFamily:'var(--font-display)', fontSize:11.5, fontWeight:600, color:'var(--text-muted)',
                background:'rgba(20,128,64,0.05)', border:'1px solid rgba(20,128,64,0.15)',
                borderRadius:8, padding:'6px 12px', transition:'all 0.25s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--g-700)'; e.currentTarget.style.background='var(--g-50)'; e.currentTarget.style.borderColor='var(--primary-border)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(20,128,64,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.background='rgba(20,128,64,0.05)'; e.currentTarget.style.borderColor='rgba(20,128,64,0.15)'; e.currentTarget.style.boxShadow='none'; }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--g-500)', display:'inline-block' }} />{t}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.26, duration:1, ease:[0.22,1,0.36,1] }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'relative' }}>
            <EVBoltRing />
            {HERO_STATS.map((s,i) => {
              const pos=[{top:'2%',left:'-22%'},{top:'2%',right:'-24%'},{bottom:'16%',left:'-24%'},{bottom:'16%',right:'-20%'}][i];
              return (
                <motion.div key={s.label} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.7+i*0.12, type:'spring', stiffness:200 }}
                  style={{ position:'absolute', ...pos, background:'var(--white)',
                    border:'1px solid rgba(20,128,64,0.15)', borderRadius:14, padding:'10px 13px',
                    textAlign:'center', minWidth:'clamp(72px,9vw,88px)', boxShadow:'0 8px 28px rgba(0,0,0,0.08)',
                    transition:'all 0.3s var(--ease)', cursor:'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary-border)'; e.currentTarget.style.background='var(--g-50)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(20,128,64,0.15)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.15)'; e.currentTarget.style.background='var(--white)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='none'; }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px,2.2vw,24px)', fontWeight:800,
                    letterSpacing:'-0.04em', lineHeight:1, marginBottom:4,
                    background:'linear-gradient(135deg,var(--g-700),var(--g-400))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    {s.value}{s.suffix}
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(7px,0.9vw,9.5px)', fontWeight:700,
                    letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity }}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:2, cursor:'default' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:9.5, fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-faint)' }}>Scroll</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--g-400)" strokeWidth="2.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr !important;gap:40px !important;} .hero-grid>div:last-child{display:none !important;}}`}</style>
    </section>
  );
}

function StatsBar() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ background:'var(--white)',
      borderTop:'1px solid rgba(20,128,64,0.1)', borderBottom:'1px solid rgba(20,128,64,0.1)', padding:'44px 0' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }} className="stats-grid">
          {HERO_STATS.map((s,i) => (
            <div key={s.label} className="stat-card-hover"
              style={{ textAlign:'center', padding:'16px 12px', borderRadius:14, border:'1px solid transparent', transition:'all 0.3s' }}>
              <Counter value={s.value} suffix={s.suffix} />
              <div style={{ fontFamily:'var(--font-display)', fontSize:10.5, fontWeight:700,
                letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-muted)', marginTop:7 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.stats-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </div>
  );
}

function Strengths() {
  const titleRef = useReveal();
  const gridRef  = useStaggerReveal('[data-stagger]');
  const [expanded, setExpanded] = useState(null);
  return (
    <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4 0%,#ffffff 100%)' }}>
      <div className="container">
        <div ref={titleRef} className="reveal" style={{ marginBottom:52 }}>
          <div className="eyebrow">Why VNR Green</div>
          <h2 className="section-title">Built Different. <span className="text-green">Engineered Right.</span></h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)', marginTop:12, maxWidth:500 }}>
            Four pillars that make every VNR Green vehicle a smarter investment than any alternative.
          </p>
        </div>
        <div ref={gridRef} style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }} className="str-grid">
          {STRENGTHS.map((s,i) => (
            <div key={s.title} data-stagger className="card strength-card reveal"
              style={{ padding:'32px 28px', border:'1px solid rgba(20,128,64,0.12)',
                background:'linear-gradient(145deg,#ffffff,#f7fdf9)', cursor:'pointer' }}
              onClick={() => setExpanded(expanded===i ? null : i)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
                <div className="s-icon" style={{ width:52, height:52, borderRadius:14,
                  background:'var(--g-50)', border:'1px solid var(--primary-border)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'var(--g-600)',
                  transition:'all 0.3s' }}>{STRENGTH_ICONS[s.icon] || s.icon}</div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:800,
                    background:'linear-gradient(135deg,var(--g-700),var(--g-400))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1 }}>{s.stat}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700,
                    letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginTop:2 }}>{s.statLabel}</div>
                </div>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700,
                color:'var(--text-primary)', marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--text-muted)',
                lineHeight:1.75, fontWeight:400 }}>{s.desc}</p>
              <AnimatePresence>
                {expanded===i && (
                  <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                    exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
                    style={{ overflow:'hidden' }}>
                    <div style={{ marginTop:14, padding:'14px 16px', borderRadius:10,
                      background:'var(--g-50)', border:'1px solid var(--primary-border)',
                      fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--g-800)',
                      lineHeight:1.72 }}>{s.detail}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:14 }}>
                <div className="prog-track" style={{ flex:1 }}>
                  <div className="prog-fill" ref={el=>{ if(el) setTimeout(()=>el.classList.add('on'),500+i*150); }} />
                </div>
                <span style={{ fontSize:11, color:'var(--g-600)', fontWeight:700, fontFamily:'var(--font-display)',
                  transition:'all 0.2s' }}>{expanded===i ? '▲ Less' : '▼ More'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.str-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function FeaturedVehicles() {
  const titleRef = useReveal();
  const [modal, setModal] = useState(null);
  /* Show highlighted + a few more for 6 total, always even rows */
  const highlighted = VEHICLES.filter(v => v.highlight);
  const rest = VEHICLES.filter(v => !v.highlight).slice(0, 6 - highlighted.length);
  const featured = [...highlighted, ...rest].slice(0, 6);

  return (
    <section className="section" style={{ background:'linear-gradient(180deg,#ffffff 0%,#F0FAF4 100%)' }}>
      <div className="container">
        <div ref={titleRef} className="reveal"
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48, flexWrap:'wrap', gap:16 }}>
          <div>
            <div className="eyebrow">Featured Vehicles</div>
            <h2 className="section-title">Our <span className="text-green">Flagship</span> Range</h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)', marginTop:8, maxWidth:400 }}>
              Click any card to explore 360° view, color variants and full specifications.
            </p>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All Products
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="feat-grid">
          {featured.map((v,idx) => (
            <motion.div key={v.id}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:idx*0.07, duration:0.55, ease:[0.22,1,0.36,1] }}
              className="feat-card"
              style={{ background:'var(--white)', border:'1px solid rgba(20,128,64,0.12)',
                borderRadius:20, overflow:'hidden', cursor:'pointer', position:'relative' }}
              onClick={() => setModal(v)}
              whileHover={{ y:-8, boxShadow:'0 24px 60px rgba(20,128,64,0.15)' }}>
              {/* Image area */}
              <div style={{ height:210, position:'relative',
                background:`linear-gradient(145deg,#EDF8F1,#F4FAF6)`,
                display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                {/* Glow behind vehicle */}
                <div style={{ position:'absolute', inset:0,
                  background:`radial-gradient(circle at 50% 65%, rgba(20,128,64,0.1), transparent 65%)` }} />
                {/* Vehicle icon with hover lift */}
                <motion.div whileHover={{ scale:1.15, y:-8 }} transition={{ type:'spring', stiffness:300, damping:20 }}
                  style={{ fontSize:80, zIndex:1, userSelect:'none',
                    filter:'drop-shadow(0 10px 20px rgba(20,128,64,0.2))' }}>
                  {v.icon}
                </motion.div>
                {/* Badge */}
                {v.badge && (
                  <span className={`badge ${v.badgeType==='amber'?'badge-black':v.badgeType==='outline'?'badge-outline':'badge-green'}`}
                    style={{ position:'absolute', top:12, left:12 }}>{v.badge}</span>
                )}
                {/* 360 tag */}
                <div style={{ position:'absolute', bottom:10, right:10,
                  background:'rgba(10,74,34,0.82)', color:'#86ECA8', borderRadius:100,
                  padding:'4px 10px', fontSize:9.5, fontWeight:700, letterSpacing:'0.1em',
                  display:'flex', alignItems:'center', gap:5, fontFamily:'var(--font-display)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                  </svg>360°
                </div>
                {/* Color dots preview */}
                <div style={{ position:'absolute', bottom:10, left:12, display:'flex', gap:4 }}>
                  {(v.colors||[]).slice(0,4).map(c => (
                    <div key={c.id} style={{ width:10, height:10, borderRadius:'50%',
                      background:c.hex, border:'1.5px solid rgba(255,255,255,0.8)',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }} />
                  ))}
                </div>
                {/* Hover overlay */}
                <div style={{ position:'absolute', inset:0,
                  background:'linear-gradient(transparent 60%,rgba(20,128,64,0.06))',
                  transition:'opacity 0.3s' }} />
              </div>

              {/* Body */}
              <div style={{ padding:'20px 22px 24px' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700,
                  letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--g-600)', marginBottom:5 }}>
                  {v.category.replace(/-/g,' ')}
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700,
                  color:'var(--text-primary)', marginBottom:4 }}>{v.name}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--g-600)',
                  fontStyle:'italic', marginBottom:10, fontWeight:500 }}>{v.tagline}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)',
                  lineHeight:1.65, marginBottom:14, fontWeight:400 }}>
                  {v.description.substring(0,90)}…
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:16 }}>
                  {v.tags.slice(0,3).map(t => <span key={t} className="tag" style={{ fontSize:10.5 }}>{t}</span>)}
                </div>
                {/* Footer */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                  paddingTop:14, borderTop:'1px solid rgba(20,128,64,0.1)' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>
                    {v.specs?.[0]?.value}
                  </span>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:700,
                    color:'var(--g-600)', display:'flex', alignItems:'center', gap:4,
                    background:'var(--g-50)', padding:'5px 12px', borderRadius:100,
                    border:'1px solid var(--primary-border)', transition:'all 0.22s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='var(--g-600)'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='var(--g-50)'; e.currentTarget.style.color='var(--g-600)'; }}>
                    Explore + 360°
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {modal && <VehicleModal vehicle={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
      <style>{`
        @media(max-width:1024px){.feat-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:580px){.feat-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  );
}

function ProcessSection() {
  const titleRef = useReveal();
  const stepsRef = useStaggerReveal('[data-stagger]');
  return (
    <section className="section" style={{ background:'var(--white)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }} className="proc-grid">
          <div ref={titleRef} className="reveal">
            <div className="eyebrow">Manufacturing</div>
            <h2 className="section-title">From Steel to <span className="text-green">Road-Ready</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              lineHeight:1.75, marginTop:14, maxWidth:340 }}>
              Every VNR Green vehicle passes a 5-stage manufacturing and QA process. No shortcuts. No compromises. Just vehicles built to last.
            </p>
            <div className="img-placeholder" style={{ minHeight:220, borderRadius:20, marginTop:32 }}>
              <span className="img-placeholder-icon">🏭</span>
              <span className="img-placeholder-label">Factory Image</span>
              <span className="img-placeholder-sub">Add production floor photo — 4:3 ratio</span>
            </div>
          </div>
          <div ref={stepsRef}>
            {PROCESS_STEPS.map(s => (
              <div key={s.num} data-stagger className="process-step reveal">
                <div className="step-num" style={{ fontFamily:'var(--font-mono)' }}>{s.num}</div>
                <h4 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:'var(--text-primary)', marginBottom:6 }}>{s.title}</h4>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.proc-grid{grid-template-columns:1fr !important;gap:48px !important;}}`}</style>
    </section>
  );
}

function TrustBar() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ background:'var(--gray-900)', padding:'32px 0' }}>
      <div className="container">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap' }}>
          {TRUST_ITEMS.map((t,i) => (
            <div key={t.label} style={{ display:'flex', alignItems:'center' }}>
              <div style={{ textAlign:'center', padding:'0 28px', transition:'all 0.25s', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:12.5, fontWeight:700,
                  color:'rgba(255,255,255,0.75)', transition:'color 0.22s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--g-300)'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>
                  {t.label}
                </div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:10.5, color:'rgba(255,255,255,0.25)' }}>{t.detail}</div>
              </div>
              {i < TRUST_ITEMS.length-1 && <div style={{ width:1, height:28, background:'rgba(255,255,255,0.08)' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTABanner() {
  const ref = useReveal();
  return (
    <section className="section-sm" style={{ background:'linear-gradient(180deg,#F0FAF4 0%,#ffffff 100%)' }}>
      <div className="container">
        <div ref={ref} className="reveal"
          style={{ background:'linear-gradient(135deg,var(--g-900),var(--g-700))',
            borderRadius:28, padding:'64px 56px', display:'flex', alignItems:'center',
            justifyContent:'space-between', gap:36, flexWrap:'wrap',
            position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
            background:'linear-gradient(90deg,transparent,var(--g-300),var(--g-200),transparent)' }} />
          <div style={{ position:'absolute', right:-40, top:'50%', transform:'translateY(-50%)',
            width:360, height:360, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:10.5, fontWeight:700,
              letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--g-300)',
              marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:18, height:1.5, background:'var(--g-400)', display:'inline-block' }} />
              Start Your Electric Journey
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3.5vw,42px)',
              fontWeight:800, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:10 }}>
              Ready to Go Electric?
            </h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'rgba(255,255,255,0.5)',
              maxWidth:420, lineHeight:1.7 }}>
              Talk to our team — product demos, pricing, dealership enquiries. We respond within 24 hours.
            </p>
          </div>
          <div style={{ display:'flex', gap:14, flexShrink:0, position:'relative', zIndex:1 }}>
            <Link to="/contact" className="btn btn-white btn-lg">Contact Us →</Link>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:10,
                padding:'15px 28px', borderRadius:12, fontSize:15, fontWeight:700,
                background:'rgba(255,255,255,0.1)', color:'#fff',
                border:'1.5px solid rgba(255,255,255,0.2)', textDecoration:'none',
                transition:'all 0.28s', fontFamily:'var(--font-display)' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(37,211,102,0.2)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.5)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.transform='none'; }}>
              {/* Premium WhatsApp SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Ticker />
      <StatsBar />
      <Strengths />
      <FeaturedVehicles />
      <ProcessSection />
      <TrustBar />
      <CTABanner />
    </div>
  );
}
