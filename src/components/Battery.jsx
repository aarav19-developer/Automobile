import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BATTERY_STATS_LEFT, BATTERY_STATS_RIGHT, BATTERY_FEATURES } from '../data/vehicles';

function StatBrick({ stat, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      whileHover={{
        borderColor: 'rgba(245,158,11,0.5)',
        background: 'rgba(245,158,11,0.06)',
        y: -4,
      }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(245,158,11,0.12)',
        borderRadius: 'var(--r-md)',
        padding: '26px 24px',
        cursor: 'default',
        transition: 'all 0.3s',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 44, fontWeight: 800,
        background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1, marginBottom: 8,
      }}>
        {stat.value}
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 4 }}>
        {stat.label}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
        {stat.sub}
      </div>
    </motion.div>
  );
}

export default function Battery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="battery" ref={ref} style={{
      background: 'var(--ink)',
      padding: '110px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background ambience */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 16 }}>
            Battery Technology
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.08,
            color: '#fff', marginBottom: 14,
          }}>
            Smart LFP Battery —{' '}
            <span className="text-gradient">Safety Engineered</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16,
            color: 'rgba(255,255,255,0.35)', lineHeight: 1.78,
            maxWidth: 520, margin: '0 auto', fontWeight: 300,
          }}>
            Not just a power source — a smart energy system with Bluetooth control,
            advanced BMS and industry-leading safety design.
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr 1fr',
          gap: 24, alignItems: 'start',
        }} className="bat-grid-resp">

          {/* Left stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BATTERY_STATS_LEFT.map((s, i) => (
              <StatBrick key={s.label} stat={s} index={i} inView={inView} />
            ))}
          </div>

          {/* Center feature card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(160deg, rgba(245,158,11,0.1), rgba(12,15,26,0.6))',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 'var(--r-xl)',
              padding: '44px 32px',
              textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Inner glow */}
            <div style={{
              position: 'absolute', top: -40, left: '50%',
              transform: 'translateX(-50%)',
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Battery icon */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: 80, marginBottom: 20, display: 'block', lineHeight: 1,
                filter: 'drop-shadow(0 0 24px rgba(245,158,11,0.5))',
                position: 'relative', zIndex: 1,
              }}
            >
              🔋
            </motion.div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22, fontWeight: 800,
              color: '#fff', marginBottom: 12, letterSpacing: '-0.3px',
            }}>
              Lithium Iron Phosphate
            </h3>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.72, fontWeight: 300, marginBottom: 28,
            }}>
              LFP is the safest, most thermally stable lithium chemistry available.
              VNR Dewan pairs it with a Smart BMS for real-time monitoring
              and Bluetooth app control.
            </p>

            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BATTERY_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ x: 4, background: 'rgba(245,158,11,0.08)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 13.5, color: 'rgba(255,255,255,0.55)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '11px 16px', borderRadius: 10,
                    fontWeight: 400, textAlign: 'left',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.2s', cursor: 'default',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{feat.icon}</span>
                  {feat.text}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#quote"
              className="btn btn-primary"
              style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
            >
              Get Battery Quote →
            </a>
          </motion.div>

          {/* Right stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BATTERY_STATS_RIGHT.map((s, i) => (
              <StatBrick key={s.label} stat={s} index={i} inView={inView} />
            ))}

            {/* Extra CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,107,53,0.4)' }}
              style={{
                background: 'rgba(255,107,53,0.06)',
                border: '1px solid rgba(255,107,53,0.15)',
                borderRadius: 'var(--r-md)',
                padding: '22px 20px',
                transition: 'all 0.3s', cursor: 'default',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🌡️</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                India-Ready
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.6 }}>
                Thermally stable across Indian climate conditions — extreme heat, monsoon & cold
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bat-grid-resp { grid-template-columns: 1fr 1fr !important; }
          .bat-grid-resp > div:last-child { display: none; }
        }
        @media (max-width: 640px) {
          .bat-grid-resp { grid-template-columns: 1fr !important; }
          .bat-grid-resp > div:last-child { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
