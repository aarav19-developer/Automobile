import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Zap } from 'lucide-react';
import { COMPANY } from '../data/vehicles';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Vehicles', href: '#products' },
  { label: 'Battery', href: '#battery' },
  { label: 'Dealership', href: '#dealer' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled
            ? 'rgba(12, 15, 26, 0.95)'
            : 'rgba(12, 15, 26, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(245,158,11,0.15)'
            : '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 70,
          }}>
            {/* Logo */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
                }}
              >
                <Zap size={20} color="#fff" fill="#fff" />
              </motion.div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18, fontWeight: 800,
                  color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.1,
                }}>
                  VNR Dewan
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9.5, fontWeight: 700,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                }}>
                  Green Automobiles
                </div>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              className="nav-desktop-links">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ color: '#F59E0B' }}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13.5, fontWeight: 500,
                    color: 'rgba(255,255,255,0.65)',
                    padding: '8px 16px', borderRadius: 8,
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(245,158,11,0.1)';
                    e.currentTarget.style.color = '#F59E0B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              className="nav-desktop-actions">
              <a
                href={`tel:${COMPANY.phone1}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  padding: '8px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)';
                  e.currentTarget.style.color = '#F59E0B';
                  e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Phone size={14} />
                Call
              </a>
              <motion.a
                href="#quote"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700,
                  background: 'linear-gradient(135deg, #F59E0B, #FF6B35)',
                  color: '#fff', padding: '9px 22px', borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                  letterSpacing: '0.2px',
                }}
              >
                Get Quote
              </motion.a>
            </div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', color: '#fff',
                padding: 8, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              className="hamburger-btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 70, left: 0, right: 0, zIndex: 999,
              background: 'rgba(12, 15, 26, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(245,158,11,0.15)',
              padding: '20px 24px 28px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 600,
                  color: 'rgba(255,255,255,0.75)',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href={`tel:${COMPANY.phone1}`}
                className="btn btn-ghost-light btn-sm" style={{ flex: 1, justifyContent: 'center' }}
                onClick={closeMenu}>
                📞 Call
              </a>
              <a href="#quote"
                className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}
                onClick={closeMenu}>
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links, .nav-desktop-actions { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
