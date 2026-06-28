import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { VEHICLES, CATEGORIES } from '../data/vehicles';

function ProductCard({ vehicle, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      layout
      whileHover={{ y: -10 }}
      onClick={() => onOpen(vehicle)}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--r-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s, border-color 0.3s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 24px 60px rgba(12,15,26,0.15), 0 0 0 1px ${vehicle.accentColor}33`;
        e.currentTarget.style.borderColor = `${vehicle.accentColor}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Badge */}
      {vehicle.badge && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 3,
          background: vehicle.accentColor,
          color: '#fff', borderRadius: 100,
          padding: '4px 12px',
          fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: 800,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          boxShadow: `0 4px 12px ${vehicle.accentColor}55`,
        }}>
          {vehicle.badge}
        </div>
      )}

      {/* Image area */}
      <div style={{
        height: 200,
        background: `linear-gradient(145deg, #0c0f1a 0%, ${vehicle.accentColor}22 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 60%, ${vehicle.accentColor}18 0%, transparent 70%)`,
        }} />
        {/* Emoji */}
        <motion.span
          whileHover={{ scale: 1.15, rotate: [-2, 2, -2, 0] }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: 72, position: 'relative', zIndex: 2,
            filter: `drop-shadow(0 0 24px ${vehicle.accentColor}66)`,
            display: 'block',
          }}
        >
          {vehicle.emoji}
        </motion.span>
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(transparent, rgba(12,15,26,0.4))',
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 24px' }}>
        <div style={{
          fontSize: 10.5, fontWeight: 800,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: vehicle.accentColor, marginBottom: 6,
        }}>
          {vehicle.category.replace(/-/g, ' ')}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 21, fontWeight: 800,
          color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.3px',
        }}>
          {vehicle.name}
        </h3>

        <div style={{
          fontSize: 12.5, fontWeight: 600, fontStyle: 'italic',
          color: 'var(--muted)', marginBottom: 10,
        }}>
          {vehicle.tagline}
        </div>

        <p style={{
          fontSize: 13.5, color: 'var(--muted)',
          lineHeight: 1.62, marginBottom: 16, fontWeight: 300,
        }}>
          {vehicle.description.substring(0, 100)}...
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {vehicle.tags.slice(0, 4).map((tag) => (
            <span key={tag} style={{
              fontSize: 11, fontWeight: 700,
              background: `${vehicle.accentColor}14`,
              color: vehicle.accentColor,
              border: `1px solid ${vehicle.accentColor}22`,
              padding: '3px 10px', borderRadius: 100,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14, borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {vehicle.specs[0]?.value}
          </span>
          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 700,
              color: vehicle.accentColor,
              background: `${vehicle.accentColor}12`,
              border: `1px solid ${vehicle.accentColor}22`,
              padding: '8px 16px', borderRadius: 8,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = vehicle.accentColor;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${vehicle.accentColor}12`;
              e.currentTarget.style.color = vehicle.accentColor;
            }}
            onClick={(e) => { e.stopPropagation(); onOpen(vehicle); }}
          >
            View Details <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function VehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(12,15,26,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)', borderRadius: 'var(--r-xl)',
          width: '100%', maxWidth: 760,
          maxHeight: '88vh', overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Top banner */}
        <div style={{
          height: 220,
          background: `linear-gradient(145deg, var(--ink) 0%, ${vehicle.accentColor}33 100%)`,
          borderRadius: '28px 28px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 70%, ${vehicle.accentColor}25 0%, transparent 70%)`,
          }} />
          <div style={{
            fontSize: 90,
            filter: `drop-shadow(0 0 30px ${vehicle.accentColor}88)`,
            position: 'relative', zIndex: 2,
          }}>
            {vehicle.emoji}
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, color: '#fff', padding: 8, cursor: 'pointer',
              display: 'flex', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <X size={18} />
          </button>
          {vehicle.badge && (
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: vehicle.accentColor, color: '#fff',
              borderRadius: 100, padding: '5px 14px',
              fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase',
            }}>
              {vehicle.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '32px 36px 36px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: vehicle.accentColor, marginBottom: 6 }}>
            {vehicle.category.replace(/-/g, ' ')}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 800, color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.5px' }}>
            {vehicle.name}
          </h2>
          <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--muted)', marginBottom: 14 }}>
            {vehicle.tagline}
          </p>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.72, marginBottom: 28, fontWeight: 300 }}>
            {vehicle.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {/* Specs */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--muted)', marginBottom: 14 }}>
                Specifications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {vehicle.specs.map((spec) => (
                  <div key={spec.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 14px', borderRadius: 8,
                    background: 'var(--paper)', border: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400 }}>{spec.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--muted)', marginBottom: 14 }}>
                Key Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {vehicle.features.map((feat) => (
                  <div key={feat} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 13.5, color: 'var(--ink)', fontWeight: 500,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: `${vehicle.accentColor}18`,
                      border: `1px solid ${vehicle.accentColor}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: vehicle.accentColor }} />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <a href="#quote" onClick={onClose}
              className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', background: `linear-gradient(135deg, ${vehicle.accentColor}, #FF6B35)` }}>
              Enquire Now <ArrowRight size={16} />
            </a>
            <a href={`https://wa.me/${COMPANY_WA}?text=Hi, I'm interested in the ${vehicle.name}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-dark" style={{ flex: 1, justifyContent: 'center' }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Company WA for modal CTA
const COMPANY_WA = '917065214954';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });

  const filtered = VEHICLES.filter(
    (v) => activeCategory === 'all' || v.category === activeCategory
  );

  return (
    <section id="products" style={{ background: 'var(--cream)', padding: '110px 0' }}>
      <div className="container">
        {/* Head */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Complete EV Range
          </div>
          <h2 className="section-title">
            Built for Every Road &amp;{' '}
            <span className="accent">Every Business</span>
          </h2>
          <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
            From passenger E-Rickshaws to heavy-duty loaders — the full VNR Dewan lineup,
            commercial-tough and smart-battery powered.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700,
                padding: '10px 24px', borderRadius: 'var(--r)',
                border: '1.5px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderColor: activeCategory === cat.id ? '#F59E0B' : 'var(--border)',
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, #F59E0B, #FF6B35)'
                  : 'var(--white)',
                color: activeCategory === cat.id ? '#fff' : 'var(--muted)',
                boxShadow: activeCategory === cat.id
                  ? '0 4px 16px rgba(245,158,11,0.30)' : 'none',
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
          className="products-grid-resp"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle, i) => (
              <ProductCard
                key={vehicle.id}
                vehicle={vehicle}
                index={i}
                onOpen={setSelectedVehicle}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Vehicle detail modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .products-grid-resp { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .products-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
