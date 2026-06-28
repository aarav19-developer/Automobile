import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal, useStaggerReveal, useCounter } from '../hooks/useReveal';
import { COMPANY, STRENGTHS, PROCESS_STEPS, CORE_VALUES, ABOUT_OWNER, MISSION_VISION } from '../data/vehicles';

const LEGACY_STATS = [
  { value:'2500', suffix:'+', label:'Battery Charge Cycles' },
  { value:'90',   suffix:'+', label:'km Range per Charge' },
  { value:'7',    suffix:'+', label:'Years Battery Life' },
  { value:'100',  suffix:'%', label:'RTO Approved Models' },
];

function LStat({ stat }) {
  const ref = useCounter(stat.value);
  return (
    <div style={{ padding:'20px 18px', background:'rgba(255,255,255,0.06)',
      border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
      transition:'all 0.3s', cursor:'default' }}
      onMouseEnter={e => { e.currentTarget.style.background='rgba(34,192,96,0.12)'; e.currentTarget.style.borderColor='rgba(34,192,96,0.3)'; e.currentTarget.style.transform='translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; }}>
      <div style={{ display:'flex', alignItems:'flex-start', lineHeight:1, marginBottom:6 }}>
        <span ref={ref} style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:800,
          letterSpacing:'-0.04em', background:'linear-gradient(135deg,var(--g-300),var(--g-200))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>0</span>
        <span style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800,
          color:'var(--g-300)', marginTop:4 }}>{stat.suffix}</span>
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:600,
        letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)' }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const [expandedValue, setExpandedValue] = useState(null);
  const titleRef  = useReveal();
  const legacyRef = useReveal();
  const valRef    = useStaggerReveal('[data-val]');
  const teamRef   = useStaggerReveal('[data-team]');
  const procRef   = useStaggerReveal('[data-proc]');

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)', padding:'44px 0 40px',
        borderBottom:'1px solid rgba(20,128,64,0.1)', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.4 }} />
        <div style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)',
          width:360, height:360, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.08) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="eyebrow">About Us</div>
          <h1 className="section-title" style={{ maxWidth:640 }}>VNR Green — <span className="text-green">Meerut Se. India Ke Liye.</span></h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15.5, color:'var(--text-muted)',
            maxWidth:560, marginTop:12, lineHeight:1.75 }}>
            VNR Green Automobiles — Dewan Group ki 40+ saal ki industrial legacy ke saath Meerut mein bana ek EV manufacturer.
            Commercial operators ke liye safe, strong aur profitable vehicles — jo real India ki roads ke liye bane hain.
          </p>
        </div>
      </div>

      {/* Legacy + Mission/Vision */}
      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}
            className="about-grid">
            {/* Legacy Card */}
            <div ref={legacyRef} className="reveal">
              <div style={{ background:'linear-gradient(145deg,var(--g-900),var(--g-800))',
                borderRadius:24, padding:'44px 38px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', bottom:-20, right:-10,
                  fontFamily:'var(--font-display)', fontSize:100, fontWeight:800,
                  color:'rgba(255,255,255,0.025)', lineHeight:1, letterSpacing:-4,
                  userSelect:'none', pointerEvents:'none' }}>Dewan</div>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
                  background:'linear-gradient(90deg,var(--g-400),var(--g-300),transparent)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0,
                  background:'radial-gradient(ellipse at bottom,rgba(34,192,96,0.08) 0%,transparent 70%)',
                  height:200, pointerEvents:'none' }} />
                <div style={{ fontFamily:'var(--font-display)', fontSize:10.5, fontWeight:700,
                  letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--g-300)', marginBottom:14 }}>
                  Legacy Since 1984
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:800,
                  color:'#fff', marginBottom:12, letterSpacing:'-0.02em' }}>
                  Backed by Dewan Group
                </h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.45)',
                  lineHeight:1.78, fontWeight:400, marginBottom:28 }}>
                  Dewan Group is one of Meerut's most respected industrial houses — operating rubber &amp; tyre manufacturing,
                  premium educational institutions (VNR Institute), and now spearheading India's electric vehicle revolution.
                  When VNR Green says its vehicles are reliable, it is backed by a group that has never broken a promise to its customers.
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {LEGACY_STATS.map(s => <LStat key={s.label} stat={s} />)}
                </div>
                <div style={{ marginTop:20, display:'inline-flex', alignItems:'center', gap:8,
                  background:'rgba(34,192,96,0.12)', border:'1px solid rgba(34,192,96,0.25)',
                  borderRadius:100, padding:'8px 16px', fontSize:12, fontWeight:600, color:'var(--g-300)',
                  fontFamily:'var(--font-display)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {COMPANY.city}, {COMPANY.state}
                </div>
              </div>
            </div>

            {/* Mission + Vision */}
            <div ref={titleRef} className="reveal d2">
              <div className="eyebrow">Our Purpose</div>
              <h2 className="section-title">Mission. Vision. <span className="text-green">Values.</span></h2>

              {/* Mission */}
              <div style={{ marginTop:24, padding:'22px 24px', borderRadius:16,
                background:'linear-gradient(135deg,var(--g-50),rgba(20,128,64,0.04))',
                border:'1px solid var(--primary-border)', marginBottom:14,
                transition:'all 0.3s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(20,128,64,0.12)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <span style={{ fontSize:20 }}>◆</span>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:800,
                    letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--g-700)' }}>Our Mission</div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'var(--text-secondary)',
                  lineHeight:1.78, fontWeight:400, fontStyle:'italic' }}>
                  "{MISSION_VISION.mission}"
                </p>
              </div>

              {/* Vision */}
              <div style={{ padding:'22px 24px', borderRadius:16,
                background:'linear-gradient(135deg,var(--gray-900),var(--g-900))',
                border:'1px solid rgba(34,192,96,0.2)', marginBottom:24,
                transition:'all 0.3s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(20,128,64,0.2)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <span style={{ fontSize:20, color:'var(--g-300)' }}>◉</span>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:800,
                    letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--g-300)' }}>Our Vision</div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'rgba(255,255,255,0.7)',
                  lineHeight:1.78, fontWeight:400, fontStyle:'italic' }}>
                  "{MISSION_VISION.vision}"
                </p>
              </div>

              {['Founded 2022 under Dewan Group umbrella',
                'Manufacturing facility in Meerut, UP',
                'Full RTO approvals across all models',
                'Expanding dealer network across North India',
                'LFP battery technology — safest in class',
                'Branded components — CY Gold, CEAT, Trontek'].map(pt => (
                <div key={pt} style={{ display:'flex', alignItems:'center', gap:11, marginBottom:11 }}>
                  <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--g-50)',
                    border:'1.5px solid var(--primary-border)', display:'flex',
                    alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--g-600)" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--text-secondary)', fontWeight:500 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values — click to expand */}
      <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4,#ffffff)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Core Values</div>
            <h2 className="section-title">{MISSION_VISION.values_heading}</h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--text-muted)',
              marginTop:10 }}>Click any value to read more</p>
          </div>
          <div ref={valRef} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="val-grid">
            {CORE_VALUES.map((v,i) => (
              <div key={v.title} data-val className="card reveal"
                style={{ padding:'28px 24px', cursor:'pointer', border:'1px solid rgba(20,128,64,0.12)',
                  background:'linear-gradient(145deg,#fff,#f7fdf9)',
                  transition:'all 0.35s var(--ease)', position:'relative', overflow:'hidden' }}
                onClick={() => setExpandedValue(expandedValue===i ? null : i)}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(20,128,64,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform=expandedValue===i?'none':'none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                  background:'linear-gradient(90deg,var(--g-500),var(--g-300),transparent)',
                  opacity: expandedValue===i ? 1 : 0, transition:'opacity 0.3s' }} />
                <div style={{ width:52, height:52, borderRadius:14, background:'var(--g-50)',
                  border:'1px solid var(--primary-border)', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:22, marginBottom:16,
                  fontFamily:'var(--font-display)', fontWeight:800, color:'var(--g-600)',
                  transition:'all 0.3s' }}>
                  {v.symbol}
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700,
                  color:'var(--text-primary)', marginBottom:8 }}>{v.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                  lineHeight:1.7 }}>{v.short}</p>
                <AnimatePresence>
                  {expandedValue===i && (
                    <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                      exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
                      style={{ overflow:'hidden' }}>
                      <div style={{ marginTop:14, padding:'12px 14px', borderRadius:10,
                        background:'var(--g-50)', border:'1px solid var(--primary-border)',
                        fontFamily:'var(--font-body)', fontSize:13, color:'var(--g-800)', lineHeight:1.72 }}>
                        {v.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ marginTop:12, fontSize:11, color:'var(--g-500)', fontWeight:700,
                  fontFamily:'var(--font-display)', letterSpacing:'0.06em' }}>
                  {expandedValue===i ? '▲ Collapse' : '▼ Read more'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){.val-grid{grid-template-columns:repeat(2,1fr) !important;}}
          @media(max-width:560px){.val-grid{grid-template-columns:1fr !important;}}
        `}</style>
      </section>

      {/* Team / Owner Section */}
      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Leadership</div>
            <h2 className="section-title">The People Behind <span className="text-green">VNR Green</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              maxWidth:460, margin:'12px auto 0', lineHeight:1.75 }}>
              Manufacturing, technology aur business — teeno fields mein decades ka experience. Sab ek kaam ke liye: India mein best EV banana.
            </p>
          </div>
          <div ref={teamRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:22 }} className="team-grid">
            {ABOUT_OWNER.map((m,i) => (
              <motion.div key={m.name} data-team
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.6 }}
                style={{ background:'var(--white)', border:'1px solid rgba(20,128,64,0.12)',
                  borderRadius:20, overflow:'hidden', textAlign:'center', cursor:'default',
                  transition:'all 0.35s var(--ease)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(20,128,64,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div className="img-placeholder" style={{ borderRadius:0, minHeight:200,
                  background:'linear-gradient(160deg,var(--g-50),rgba(20,128,64,0.06))',
                  border:'none', borderBottom:'1px dashed var(--g-200)' }}>
                  <div style={{ width:76, height:76, borderRadius:'50%',
                    background:'linear-gradient(135deg,var(--g-600),var(--g-400))',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'#fff',
                    boxShadow:'0 8px 24px rgba(20,128,64,0.25)' }}>{m.initials}</div>
                  <span className="img-placeholder-label" style={{ marginTop:10 }}>Photo</span>
                  <span className="img-placeholder-sub">Add portrait</span>
                </div>
                <div style={{ padding:'18px 16px 22px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
                    gap:6, marginBottom:6 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700,
                      color:'var(--text-primary)' }}>{m.name}</div>
                  </div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--g-600)',
                    fontWeight:600, marginBottom:8 }}>{m.role}</div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--text-muted)',
                    lineHeight:1.65, fontWeight:400 }}>{m.desc}</p>
                  <div style={{ marginTop:10, display:'inline-block',
                    background:'var(--g-50)', border:'1px solid var(--primary-border)',
                    borderRadius:100, padding:'4px 12px',
                    fontFamily:'var(--font-display)', fontSize:10.5, fontWeight:700,
                    color:'var(--g-700)', letterSpacing:'0.06em' }}>
                    {m.experience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){.team-grid{grid-template-columns:repeat(2,1fr) !important;}}
          @media(max-width:560px){.team-grid{grid-template-columns:1fr 1fr !important;}}
          @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:48px !important;}}
        `}</style>
      </section>

      {/* Manufacturing Process */}
      <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4,#fff)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }} className="about-grid">
            <div>
              <div className="eyebrow">How We Build</div>
              <h2 className="section-title">5-Stage <span className="text-green">Quality Process</span></h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
                lineHeight:1.78, marginTop:14 }}>
                From raw steel to road-ready — every vehicle passes a rigorous manufacturing and QA sequence.
                No vehicle leaves our facility without completing all 5 stages and passing final road validation.
              </p>
            </div>
            <div ref={procRef}>
              {PROCESS_STEPS.map(step => (
                <div key={step.num} data-proc className="process-step reveal">
                  <div className="step-num" style={{ fontFamily:'var(--font-mono)' }}>{step.num}</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700,
                    color:'var(--text-primary)', marginBottom:5 }}>{step.title}</h4>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                    lineHeight:1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
