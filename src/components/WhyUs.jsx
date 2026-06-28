import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_FEATURES } from '../data/vehicles';

const ACCENT_COLORS = [
  '#F59E0B', '#FF6B35', '#10B981', '#6366F1', '#EC4899', '#0EA5E9',
];

function FeatureCard({ feat, index, inView }) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, boxShadow: `0 24px 56px rgba(12,15,26,0.14), 0 0 0 1px ${color}33` }}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--r-xl)',
        padding: '36px 30px',
        border: '1px solid var(--border)',
        cursor: 'default',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, transparent)`,
          transformOrigin: 'left',
          borderRadius: '4px 4px 0 0',
        }}
      />

      {/* Hover glow bg */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      }} />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        style={{
          width: 56, height: 56, borderRadius: 16,
          background: `${color}14`,
          border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 20,
        }}
      >
        {feat.icon}
      </motion.div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 21, fontWeight: 800,
        color: 'var(--ink)', marginBottom: 10,
        letterSpacing: '-0.2px',
      }}>
        {feat.title}
      </h3>
      <p style={{
        fontSize: 14, color: 'var(--muted)',
        lineHeight: 1.72, fontWeight: 300,
      }}>
        {feat.description}
      </p>

      {/* Bottom tag */}
      <div style={{
        marginTop: 20,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11.5, fontWeight: 700,
        color: color,
        background: `${color}10`,
        border: `1px solid ${color}20`,
        borderRadius: 100, padding: '4px 12px',
        letterSpacing: '0.5px',
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block' }} />
        VNR Standard
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="why" ref={ref} style={{ background: 'var(--cream)', padding: '110px 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 56 }}
        >
          <div className="eyebrow">Why VNR Dewan</div>
          <h2 className="section-title">
            Strong Build. Safe Battery.{' '}
            <span className="accent">Low Running Cost.</span>
          </h2>
          <p className="section-sub">
            Six reasons thousands of drivers and dealers choose VNR Green Automobiles
            over every alternative in the market.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 22,
        }} className="why-grid-resp">
          {WHY_FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 48,
            background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink3) 100%)',
            borderRadius: 'var(--r-xl)',
            padding: '36px 48px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(245,158,11,0.1)',
          }}
        >
          <div style={{
            position: 'absolute', right: -40, top: '50%',
            transform: 'translateY(-50%)',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26, fontWeight: 800, color: '#fff',
              marginBottom: 6, letterSpacing: '-0.3px',
            }}>
              Ready to Switch to Electric?
            </div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
              Speak with our team today — no pressure, just facts.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <a href="#quote" className="btn btn-primary">
              Get a Free Quote →
            </a>
            <a
              href="https://wa.me/917065214954"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-grid-resp { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .why-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
