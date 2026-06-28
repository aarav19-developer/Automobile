import { motion } from 'framer-motion';
import { Zap, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '../data/vehicles';

const FOOTER_LINKS = {
  Products: [
    { label: 'E-Rickshaw', href: '#products' },
    { label: 'EV Loader', href: '#products' },
    { label: 'Garbage Loader', href: '#products' },
    { label: 'EV Scooty', href: '#products' },
    { label: 'LFP Battery', href: '#products' },
    { label: 'Custom Loaders', href: '#products' },
  ],
  Company: [
    { label: 'About VNR Dewan', href: '#about' },
    { label: 'Battery Technology', href: '#battery' },
    { label: 'Why Choose Us', href: '#why' },
    { label: 'Become a Dealer', href: '#dealer' },
    { label: 'Get Quote', href: '#quote' },
    { label: 'Contact Us', href: '#contact' },
  ],
  Contact: [
    { label: COMPANY.phone1, href: `tel:${COMPANY.phone1}` },
    { label: COMPANY.phone2, href: `tel:${COMPANY.phone2}` },
    { label: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { label: COMPANY.website, href: `https://${COMPANY.website}`, external: true },
  ],
};

const SOCIAL_LINKS = [
  { emoji: '📘', label: 'Facebook', href: COMPANY.socials.facebook },
  { emoji: '📸', label: 'Instagram', href: COMPANY.socials.instagram },
  { emoji: '▶️', label: 'YouTube', href: COMPANY.socials.youtube },
  { emoji: '💼', label: 'LinkedIn', href: COMPANY.socials.linkedin },
  { emoji: '💬', label: 'WhatsApp', href: `https://wa.me/${COMPANY.whatsapp}` },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', paddingTop: 80 }}>
      {/* Main grid */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
            gap: 52,
            paddingBottom: 64,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
          className="footer-grid-resp"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
              }}>
                <Zap size={20} color="#fff" fill="#fff" />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800,
                  color: '#fff', letterSpacing: '-0.2px', lineHeight: 1.1,
                }}>
                  VNR Dewan
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '2.5px',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                }}>
                  Green Automobiles
                </div>
              </div>
            </a>

            <p style={{
              fontSize: 13.5, color: 'rgba(255,255,255,0.28)',
              lineHeight: 1.78, marginBottom: 24, fontWeight: 300, maxWidth: 260,
            }}>
              Building safe, smart and reliable electric mobility for India —
              backed by Dewan Group legacy and genuine manufacturing strength.
            </p>

            {/* Address */}
            <p style={{
              fontSize: 12, color: 'rgba(255,255,255,0.18)',
              lineHeight: 1.7, marginBottom: 24, fontWeight: 300,
            }}>
              📍 {COMPANY.address}
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B, #FF6B35)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {s.emoji}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 800,
                color: '#fff', marginBottom: 20,
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>
                {title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 4, color: '#F59E0B' }}
                      style={{
                        fontSize: 13.5, color: 'rgba(255,255,255,0.32)',
                        fontWeight: 300, transition: 'color 0.2s',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {link.label}
                      {link.external && <ArrowUpRight size={11} style={{ opacity: 0.4 }} />}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '22px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} VNR Green Automobiles Pvt. Ltd. All rights reserved.
            Under{' '}
            <a href="#about" style={{ color: 'var(--amber)', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Dewan Group
            </a>.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.18)' }}>
            Made with ⚡ for India's Electric Future
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-resp { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
