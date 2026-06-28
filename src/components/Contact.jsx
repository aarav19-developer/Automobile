import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle } from 'lucide-react';
import { COMPANY } from '../data/vehicles';

const CONTACT_POINTS = [
  {
    icon: <MapPin size={20} />,
    label: 'Address',
    value: 'Plot D-26, Sector 1, Shatabdi Nagar, Delhi Road, Meerut, UP 250103',
    href: 'https://maps.google.com/?q=VNR+Green+Automobiles+Meerut',
    color: '#F59E0B',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: `${COMPANY.phone1}  ·  ${COMPANY.phone2}`,
    href: `tel:${COMPANY.phone1}`,
    color: '#10B981',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    color: '#6366F1',
  },
  {
    icon: <Globe size={20} />,
    label: 'Website',
    value: COMPANY.website,
    href: `https://${COMPANY.website}`,
    color: '#0EA5E9',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
  };

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--cream)', padding: '110px 0' }}>
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}
          className="contact-grid-resp"
        >
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">Contact Us</div>
            <h2 className="section-title">
              Let's Talk <span className="accent">EV</span>
            </h2>
            <p className="section-sub" style={{ marginTop: 14 }}>
              Our team is available 6 days a week. WhatsApp is the fastest way — we typically reply within the hour.
            </p>

            {/* Contact point cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 32 }}>
              {CONTACT_POINTS.map((pt, i) => (
                <motion.a
                  key={pt.label}
                  href={pt.href}
                  target={pt.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ x: 6, borderColor: `${pt.color}44` }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    padding: '18px 20px',
                    transition: 'all 0.25s',
                    boxShadow: 'none',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 28px rgba(12,15,26,0.08)`;
                    e.currentTarget.style.background = 'var(--warm-white)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'var(--white)';
                  }}
                >
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    borderRadius: 12,
                    background: `${pt.color}12`,
                    border: `1px solid ${pt.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: pt.color,
                  }}>
                    {pt.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 10.5, fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '1.5px',
                      color: 'var(--muted)', marginBottom: 4,
                    }}>
                      {pt.label}
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
                      {pt.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(37,211,102,0.35)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#25D366',
                color: '#fff', borderRadius: 'var(--r-md)',
                padding: '14px 28px', marginTop: 24,
                fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700,
                boxShadow: '0 4px 20px rgba(37,211,102,0.28)',
                transition: 'all 0.25s',
              }}
            >
              <span style={{ fontSize: 20 }}>💬</span>
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Right — quick message form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              padding: '40px 36px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg, var(--amber), var(--coral))',
            }} />

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26, fontWeight: 800,
              color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.3px',
            }}>
              Send a Quick Message
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28, fontWeight: 300 }}>
              We'll get back to you within one business day.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Mobile *</label>
                  <input type="tel" placeholder="+91" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Product enquiry / dealership / other" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we help you?" />
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'rgba(16,185,129,0.08)',
                      border: '1px solid rgba(16,185,129,0.25)',
                      borderRadius: 'var(--r-md)',
                      padding: '14px 18px',
                      marginTop: 8,
                    }}
                  >
                    <CheckCircle size={20} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#065f46' }}>
                      Message sent! We'll reply shortly.
                    </span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(245,158,11,0.40)' }}
                    whileTap={{ scale: 0.98 }}
                    className="form-submit"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Map embed placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 64,
            background: 'var(--ink)',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            height: 240,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', border: '1px solid rgba(245,158,11,0.12)',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📍</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800,
              color: '#fff', marginBottom: 8,
            }}>
              VNR Green Automobiles
            </div>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
              Plot D-26, Sector 1, Shatabdi Nagar, Delhi Road, Meerut UP 250103
            </div>
            <a
              href="https://maps.google.com/?q=VNR+Green+Automobiles+Meerut"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ marginTop: 16 }}
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid-resp { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-row-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
