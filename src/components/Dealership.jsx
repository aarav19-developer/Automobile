import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin, TrendingUp, Users, Package } from 'lucide-react';
import { COMPANY } from '../data/vehicles';

const PERKS = [
  { icon: <MapPin size={18} />, title: 'Territory Rights', desc: 'Exclusive sales territory in your city or region.' },
  { icon: <Package size={18} />, title: 'Full Product Portfolio', desc: 'Access to all VNR Dewan models from Day 1.' },
  { icon: <Users size={18} />, title: 'Training & Support', desc: 'Technical, sales, and marketing training provided.' },
  { icon: <TrendingUp size={18} />, title: 'Growing Market', desc: 'Ride India\'s fastest-growing EV demand curve.' },
];

export default function Dealership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="dealer" ref={ref} style={{ background: 'var(--white)', padding: '110px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--ink)',
            borderRadius: 'var(--r-2xl)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Background elements */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', top: '-20%', right: '-5%',
              width: 500, height: 500, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '-10%', left: '-5%',
              width: 350, height: 350, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%)',
            }} />
            {/* Ghost text */}
            <div style={{
              position: 'absolute', right: -20, bottom: -30,
              fontFamily: 'var(--font-display)',
              fontSize: 160, fontWeight: 800,
              color: 'rgba(255,255,255,0.025)',
              lineHeight: 1, letterSpacing: -6,
              userSelect: 'none',
            }}>
              Dealer
            </div>
            {/* Grid pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Main content */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 60, alignItems: 'center',
            padding: '72px 64px',
            position: 'relative', zIndex: 1,
          }} className="dealer-inner-resp">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: 100, padding: '6px 16px', marginBottom: 24,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#FCD34D' }}>
                  Dealership Opportunity
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 800, color: '#fff',
                  marginBottom: 14, letterSpacing: '-0.8px', lineHeight: 1.1,
                }}
              >
                Become a VNR Dewan{' '}
                <span className="text-gradient">Dealer</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: 15, color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.72, maxWidth: 500, fontWeight: 300, marginBottom: 36,
                }}
              >
                Join India's growing EV revolution with a brand backed by Dewan Group legacy.
                Get territory rights, product training, marketing support and a ready portfolio from Day 1.
              </motion.p>

              {/* Perks grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 580 }}
                className="perks-grid-resp"
              >
                {PERKS.map((perk, i) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    whileHover={{
                      borderColor: 'rgba(245,158,11,0.35)',
                      background: 'rgba(245,158,11,0.06)',
                      y: -3,
                    }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 'var(--r-md)',
                      padding: '16px 18px',
                      cursor: 'default',
                      transition: 'all 0.25s',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, flexShrink: 0,
                      borderRadius: 9,
                      background: 'rgba(245,158,11,0.12)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#F59E0B',
                    }}>
                      {perk.icon}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700,
                        color: '#fff', marginBottom: 3,
                      }}>
                        {perk.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.32)', fontWeight: 300, lineHeight: 1.55 }}>
                        {perk.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right CTA stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45 }}
              style={{
                display: 'flex', flexDirection: 'column', gap: 12,
                flexShrink: 0, minWidth: 220,
              }}
              className="dealer-cta-resp"
            >
              <a href="#quote" className="btn btn-primary btn-lg" style={{ whiteSpace: 'nowrap', justifyContent: 'center' }}>
                Apply for Dealership <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hi, I am interested in VNR Dewan Dealership')}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost-light btn-lg"
                style={{ whiteSpace: 'nowrap', justifyContent: 'center' }}
              >
                💬 WhatsApp Us
              </a>
              <a href={`tel:${COMPANY.phone1}`}
                className="btn btn-dark btn-lg"
                style={{ whiteSpace: 'nowrap', justifyContent: 'center' }}>
                📞 {COMPANY.phone1}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dealer-inner-resp { grid-template-columns: 1fr !important; padding: 48px 32px !important; gap: 36px !important; }
          .dealer-cta-resp { flex-direction: row !important; flex-wrap: wrap; }
          .dealer-cta-resp a { flex: 1 !important; min-width: 160px; }
          .perks-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
