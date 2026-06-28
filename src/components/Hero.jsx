import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Shield, Award, MapPin } from 'lucide-react';
import { COMPANY, HERO_STATS, TICKER_ITEMS } from '../data/vehicles';

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const TRUST_BADGES = [
  { icon: <Shield size={14} />, text: 'Blast & Fire Proof' },
  { icon: <Award size={14} />, text: 'CY Gold Motor' },
  { icon: <Zap size={14} />, text: 'Smart LFP Battery' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} style={{
      minHeight: '100vh', paddingTop: 70,
      background: 'var(--ink)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Background gradients */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        {/* Amber radial top-right */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)',
        }} />
        {/* Coral radial bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 65%)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Main hero content */}
      <motion.div style={{ y, opacity, flex: 1, position: 'relative', zIndex: 1 }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 60, alignItems: 'center',
          minHeight: 'calc(100vh - 70px)',
          padding: '60px 32px',
        }}>
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: 100, padding: '6px 16px', marginBottom: 28,
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#F59E0B', display: 'inline-block',
                boxShadow: '0 0 8px #F59E0B',
              }} />
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase', color: '#F59E0B',
              }}>
                Meerut · India's Safest EV
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 6vw, 80px)',
                fontWeight: 800, lineHeight: 1.0,
                color: '#fff', letterSpacing: '-2px',
                marginBottom: 24,
              }}
            >
              Drive India's{' '}
              <span className="text-gradient">Electric</span>
              <br />
              Future — Zero
              <br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Compromise.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 300,
                fontSize: 16, color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.78, marginBottom: 36, maxWidth: 440,
              }}
            >
              VNR Green Automobiles manufactures premium E-Rickshaws, E-Loaders,
              EV Scooties and Smart LFP Batteries — commercial-grade durability,
              backed by a legacy you can trust.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}
            >
              <a href="#products" className="btn btn-primary btn-lg">
                Explore Vehicles <ArrowRight size={16} />
              </a>
              <a href="#quote" className="btn btn-ghost-light btn-lg">
                Get a Quote
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
            >
              {TRUST_BADGES.map((b) => (
                <div key={b.text} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '8px 14px',
                  fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600,
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  <span style={{ color: '#F59E0B' }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 28,
                fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 500,
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              <MapPin size={13} style={{ color: '#F59E0B' }} />
              {COMPANY.city}, {COMPANY.state}
            </motion.div>
          </motion.div>

          {/* Right — Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Outer ring glow */}
            <div style={{
              position: 'absolute', inset: -40,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Central visual card */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{
                width: 340, height: 340,
                borderRadius: '50%',
                border: '1px solid rgba(245,158,11,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Rotating orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -20,
                  borderRadius: '50%',
                  border: '1px dashed rgba(245,158,11,0.2)',
                }}
              />

              {/* Orbit dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -20,
                  borderRadius: '50%',
                }}
              >
                <div style={{
                  position: 'absolute', top: -5, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#F59E0B',
                  boxShadow: '0 0 14px #F59E0B',
                }} />
              </motion.div>

              {/* Inner core */}
              <div style={{
                width: 240, height: 240, borderRadius: '50%',
                background: 'linear-gradient(145deg, #1a1f35, #0c0f1a)',
                border: '1px solid rgba(245,158,11,0.2)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 60px rgba(245,158,11,0.1), inset 0 0 40px rgba(245,158,11,0.04)',
                gap: 6,
              }}>
                <div style={{ fontSize: 64, lineHeight: 1, filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.6))' }}>
                  ⚡
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 800,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '3px', textTransform: 'uppercase',
                }}>
                  Pure Electric
                </div>
              </div>
            </motion.div>

            {/* Floating stat cards */}
            {HERO_STATS.map((stat, i) => {
              const positions = [
                { top: '10%', left: '-10%' },
                { top: '10%', right: '-12%' },
                { bottom: '18%', left: '-14%' },
                { bottom: '18%', right: '-10%' },
              ];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  style={{
                    position: 'absolute',
                    ...positions[i],
                    background: 'rgba(26,31,53,0.9)',
                    border: '1px solid rgba(245,158,11,0.18)',
                    borderRadius: 14,
                    padding: '14px 18px',
                    textAlign: 'center',
                    backdropFilter: 'blur(12px)',
                    cursor: 'default',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    minWidth: 90,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26, fontWeight: 800,
                    background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    lineHeight: 1, marginBottom: 4,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker bar */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,107,53,0.08))',
        borderTop: '1px solid rgba(245,158,11,0.15)',
        padding: '14px 0', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ x: [0, -1800] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#F59E0B',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(245,158,11,0.6)',
              }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #home .container {
            grid-template-columns: 1fr !important;
            padding: 48px 20px !important;
            gap: 40px !important;
          }
          #home .container > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
