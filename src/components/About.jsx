import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { COMPANY, LEGACY_STATS } from '../data/vehicles';

const STORY_POINTS = [
  {
    icon: '🏭',
    title: 'Real Manufacturing Strength',
    desc: 'In-house production with phosphating pre-treatment, liquid paint finish and heavy chassis build for lasting commercial use.',
  },
  {
    icon: '🔋',
    title: 'Smart LFP Battery Technology',
    desc: 'Bluetooth app control, Smart BMS, blastproof and fireproof safety positioning — a complete smart energy system.',
  },
  {
    icon: '🏆',
    title: 'Branded Components Only',
    desc: 'CY Gold Motor & Controller, CEAT Tyres, Trontek Lithium Battery — every part chosen for commercial durability.',
  },
  {
    icon: '🤝',
    title: 'Growing Dealer Network',
    desc: 'Territory rights, product training and marketing support — a business you can build on top of ours.',
  },
];

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(245,158,11,0.4)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(245,158,11,0.2)',
      }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 'var(--r-md)',
        padding: '22px 20px',
        cursor: 'default',
        transition: 'all 0.3s',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 32, fontWeight: 800,
        background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1, marginBottom: 6,
      }}>
        {stat.value}
      </div>
      <div style={{
        fontSize: 12, fontWeight: 500,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.3px',
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="about" style={{ background: 'var(--white)', padding: '110px 0' }}>
      <div className="container" ref={sectionRef}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'center',
        }}
          className="about-grid-resp">

          {/* Left — Legacy Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: 'var(--ink)',
              borderRadius: 'var(--r-xl)',
              padding: '48px 44px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Ghost text background */}
              <div style={{
                position: 'absolute', bottom: -20, right: -10,
                fontFamily: 'var(--font-display)',
                fontSize: 110, fontWeight: 800,
                color: 'rgba(255,255,255,0.025)',
                lineHeight: 1, letterSpacing: -4,
                pointerEvents: 'none', userSelect: 'none',
              }}>
                Dewan
              </div>

              {/* Ambient glow */}
              <div style={{
                position: 'absolute', bottom: -60, right: -60,
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: 100, padding: '6px 14px', marginBottom: 20,
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#F59E0B' }}>
                    LEGACY
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 30, fontWeight: 800, color: '#fff',
                  marginBottom: 10, letterSpacing: '-0.5px',
                }}>
                  Backed by<br />Dewan Group
                </h3>
                <p style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.72, marginBottom: 32, fontWeight: 300, maxWidth: 320,
                }}>
                  Dewan Group has built trust across industrial and educational sectors
                  in Meerut for decades — rubber/tyre manufacturing, reputed institutions,
                  and now EV mobility.
                </p>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {LEGACY_STATS.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Location chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'var(--amber-pale)', border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: 100, padding: '10px 20px', marginTop: 18,
                fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600,
                color: '#D97706',
              }}
            >
              <MapPin size={13} />
              {COMPANY.address}
            </motion.div>
          </motion.div>

          {/* Right — Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="eyebrow">Our Story</div>
            <h2 className="section-title">
              Building a Safer,{' '}
              <span className="accent">Smarter</span>{' '}
              EV Future
            </h2>
            <p className="section-sub">
              VNR Green Automobiles isn't just selling electric vehicles — we're building
              reliable electric mobility for India with established business values and
              genuine manufacturing strength.
            </p>

            {/* Story points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
              {STORY_POINTS.map((pt, i) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.55 }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex', gap: 18, alignItems: 'flex-start',
                    padding: '18px 20px', borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--paper)',
                    cursor: 'default',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)';
                    e.currentTarget.style.background = 'var(--amber-pale)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--paper)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    borderRadius: 12,
                    background: 'var(--amber-glow)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {pt.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4,
                    }}>
                      {pt.title}
                    </h4>
                    <p style={{
                      fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300,
                    }}>
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid-resp { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
