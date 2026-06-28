import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';
import { BATTERY_TECH, WHY_FEATURES, BATTERY_STATS_LEFT, BATTERY_STATS_RIGHT } from '../data/vehicles';

const SPECS = [
  { label:'Chemistry',      value:'LFP — Lithium Iron Phosphate', bar:1.0 },
  { label:'Cycle Life',     value:'2500+ charge cycles',          bar:0.95 },
  { label:'Thermal Range',  value:'-20°C to +60°C',              bar:0.88 },
  { label:'Charge Time',    value:'4–8 hours',                    bar:0.65 },
  { label:'Fast Charge',    value:'Compatible',                    bar:0.80 },
  { label:'Warranty',       value:'1 Year Pack',                  bar:1.0 },
];

const COMPARE = [
  { metric:'Thermal Safety',  lfp:'Excellent', nmc:'Moderate',   la:'Good',     winner:true },
  { metric:'Cycle Life',      lfp:'2500+',     nmc:'800–1200',   la:'500–800',  winner:true },
  { metric:'India Climate',   lfp:'Excellent', nmc:'Moderate',   la:'Moderate', winner:true },
  { metric:'Smart BMS',       lfp:'Standard',  nmc:'Optional',   la:'No',       winner:true },
  { metric:'Running Cost',    lfp:'Lowest',    nmc:'Medium',     la:'Low',      winner:true },
  { metric:'Fire Safety',     lfp:'Highest',   nmc:'Medium',     la:'Medium',   winner:true },
  { metric:'App Monitoring',  lfp:'Yes',       nmc:'Rare',       la:'No',       winner:true },
  { metric:'5-Year Ownership',lfp:'Best ROI',  nmc:'High Cost',  la:'Replacements', winner:true },
];

function ProgressBar({ value, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <div ref={ref} style={{ height:4, background:'rgba(20,128,64,0.1)', borderRadius:2, overflow:'hidden', marginTop:8 }}>
      <motion.div initial={{ scaleX:0 }} animate={inView ? { scaleX:value } : {}}
        transition={{ duration:1.2, delay, ease:[0.22,1,0.36,1] }}
        style={{ height:'100%', background:'linear-gradient(90deg,var(--g-700),var(--g-400))',
          borderRadius:2, transformOrigin:'left' }} />
    </div>
  );
}

export default function Technology() {
  const titleRef  = useReveal();
  const featRef   = useStaggerReveal('[data-tf]');
  const specsRef  = useReveal();
  const whyRef    = useStaggerReveal('[data-why]');

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)', padding:'44px 0 40px',
        borderBottom:'1px solid rgba(20,128,64,0.1)', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.4 }} />
        <div style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)',
          width:400, height:400, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.08) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="eyebrow">Battery Technology</div>
          <h1 className="section-title">Smart LFP Battery — <span className="text-green">Safety Engineered</span></h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15.5, color:'var(--text-muted)',
            maxWidth:520, marginTop:12, lineHeight:1.75 }}>
            Not just a power source — a complete smart energy system. Bluetooth monitoring,
            advanced BMS, India's most rigorous safety testing. LFP means no fire, no explosion, no compromise.
          </p>
        </div>
      </div>

      {/* LFP Features */}
      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          <div ref={titleRef} className="reveal" style={{ marginBottom:52 }}>
            <div className="eyebrow">Why LFP</div>
            <h2 className="section-title">6 Reasons LFP is <span className="text-green">The Only Choice</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)', marginTop:12, maxWidth:500 }}>
              LFP doesn't catch fire under abuse. It doesn't explode. It operates in any Indian climate.
              That's why every VNR Green vehicle runs on LFP — not because it's trendy, because it's safe.
            </p>
          </div>
          <div ref={featRef} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="tech-feat-grid">
            {BATTERY_TECH.map((f,i) => (
              <div key={f.title} data-tf className="card reveal"
                style={{ padding:'30px 26px', cursor:'default', border:'1px solid rgba(20,128,64,0.12)',
                  background:'linear-gradient(145deg,#fff,#f7fdf9)', transition:'all 0.35s var(--ease)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(20,128,64,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'var(--g-50)',
                  border:'1px solid var(--primary-border)', display:'flex', alignItems:'center',
                  justifyContent:'center', marginBottom:16, fontSize:22,
                  fontFamily:'var(--font-display)', fontWeight:800, color:'var(--g-600)',
                  transition:'all 0.3s' }}>
                  {f.symbol}
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700,
                  color:'var(--text-primary)', marginBottom:8 }}>{f.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                  lineHeight:1.72 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:1024px){.tech-feat-grid{grid-template-columns:repeat(2,1fr) !important;}} @media(max-width:560px){.tech-feat-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* Spec bars */}
      <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4,#ffffff)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }} className="spec-split">
            <div>
              <div className="eyebrow">Performance Numbers</div>
              <h2 className="section-title">Battery <span className="text-green">Specifications</span></h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
                marginTop:12, marginBottom:28, lineHeight:1.75 }}>
                Every pack individually assembled, cycled and calibrated. Smart BMS maintains
                cell balance automatically throughout the battery's lifetime — no manual maintenance required.
              </p>
              {/* Highlights */}
              {[
                { sym:'◉', title:'Bluetooth App', desc:'Real-time SOC, temp, voltage on iOS & Android' },
                { sym:'◆', title:'Blastproof Casing', desc:'Rated to contain internal thermal events' },
                { sym:'▲', title:'Smart BMS', desc:'Auto cell balancing, overcharge & short-circuit protection' },
              ].map(h => (
                <div key={h.title} style={{ display:'flex', gap:14, padding:'13px 16px', marginBottom:10,
                  background:'linear-gradient(135deg,var(--g-50),rgba(20,128,64,0.03))',
                  border:'1px solid var(--primary-border)', borderRadius:12,
                  transition:'all 0.25s', cursor:'default' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 6px 20px rgba(20,128,64,0.1)'; e.currentTarget.style.transform='translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'var(--g-600)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#fff', fontSize:16, fontWeight:800, fontFamily:'var(--font-display)', flexShrink:0 }}>
                    {h.sym}
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{h.title}</div>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--text-muted)' }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={specsRef} className="reveal">
              {SPECS.map((spec,i) => (
                <div key={spec.label} style={{ marginBottom:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:12.5, color:'var(--text-muted)', fontWeight:600 }}>{spec.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--text-primary)', fontWeight:600 }}>{spec.value}</span>
                  </div>
                  <ProgressBar value={spec.bar} delay={0.2 + i*0.08} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.spec-split{grid-template-columns:1fr !important;gap:48px !important;}}`}</style>
      </section>

      {/* Comparison */}
      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Comparison</div>
            <h2 className="section-title">LFP vs <span className="text-green">Every Alternative</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              maxWidth:480, margin:'10px auto 0' }}>
              Not all batteries are equal. Here's why operators who switch to VNR Green never go back.
            </p>
          </div>
          <div style={{ background:'var(--white)', border:'1px solid rgba(20,128,64,0.15)',
            borderRadius:20, overflow:'hidden', boxShadow:'0 8px 32px rgba(20,128,64,0.08)' }}>
            {/* Header */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1.4fr 1.4fr 1.4fr',
              background:'linear-gradient(135deg,var(--g-800),var(--g-700))', padding:'16px 24px' }}>
              {['Metric','LFP — VNR Green','NMC Li-ion','Lead Acid'].map((h,i) => (
                <div key={h} style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:700,
                  letterSpacing:'0.12em', textTransform:'uppercase',
                  color: i===1 ? 'var(--g-200)' : 'rgba(255,255,255,0.4)' }}>{h}</div>
              ))}
            </div>
            {COMPARE.map((row,i) => (
              <motion.div key={row.metric}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.05 }}
                style={{ display:'grid', gridTemplateColumns:'2fr 1.4fr 1.4fr 1.4fr',
                  padding:'14px 24px', borderBottom:'1px solid rgba(20,128,64,0.06)',
                  background: i%2===0 ? 'transparent' : 'rgba(20,128,64,0.015)',
                  transition:'background 0.2s', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(20,128,64,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background=i%2===0?'transparent':'rgba(20,128,64,0.015)'}>
                <span style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)' }}>{row.metric}</span>
                <span style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:700,
                  color:'var(--g-700)' }}>{row.lfp}</span>
                <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)' }}>{row.nmc}</span>
                <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)' }}>{row.la}</span>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:36 }}>
            <Link to="/vehicles/lfp-battery" className="btn btn-primary btn-lg">
              Enquire About LFP Battery →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4,#ffffff)' }}>
        <div className="container">
          <div style={{ marginBottom:48 }}>
            <div className="eyebrow">Why Choose VNR</div>
            <h2 className="section-title">6 Reasons Smart Operators <span className="text-green">Choose VNR Green</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              marginTop:10, maxWidth:520 }}>
              These are not marketing claims. These are engineering decisions that directly affect
              your daily earnings, maintenance costs, and vehicle lifespan.
            </p>
          </div>
          <div ref={whyRef} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="why-grid">
            {WHY_FEATURES.map((f,i) => (
              <div key={f.title} data-why className="card reveal"
                style={{ padding:'28px 24px', cursor:'default',
                  border:'1px solid rgba(20,128,64,0.12)',
                  background:'linear-gradient(145deg,#fff,#f7fdf9)',
                  transition:'all 0.35s var(--ease)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(20,128,64,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:'var(--g-50)',
                    border:'1px solid var(--primary-border)', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:22, fontFamily:'var(--font-display)',
                    fontWeight:800, color:'var(--g-600)', transition:'all 0.3s' }}>
                    {f.symbol}
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800,
                      background:'linear-gradient(135deg,var(--g-700),var(--g-400))',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                      backgroundClip:'text', lineHeight:1 }}>{f.metric}</div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:9.5, fontWeight:700,
                      letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)' }}>
                      {f.metricLabel}
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700,
                  color:'var(--text-primary)', marginBottom:8 }}>{f.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                  lineHeight:1.72 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:1024px){.why-grid{grid-template-columns:repeat(2,1fr) !important;}} @media(max-width:560px){.why-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </div>
  );
}
