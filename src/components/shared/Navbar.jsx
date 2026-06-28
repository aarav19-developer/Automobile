import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { COMPANY } from '../../data/vehicles';

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  {
    label: 'Products', to: '/products',
    dropdown: [
      { label: 'All Products',            to: '/products',                   icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="15" y="15" width="7" height="7"/><rect x="2" y="15" width="7" height="7"/></svg> },
      { label: 'Electric Scooty',         to: '/products?cat=2-wheeler',     icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 15V9l6-3 3 6h3"/><path d="M12 6V3"/></svg> },
      { label: 'Electric Rickshaw',       to: '/products?cat=3w-passenger',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M3 18V8l3-3h10l4 5v8"/><path d="M3 13h18"/></svg> },
      { label: 'Electric Loader',         to: '/products?cat=3w-cargo',      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/></svg> },
      { label: 'Electric Garbage Loader', to: '/products?cat=garbage',       icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg> },
      { label: 'Battery',                 to: '/products?cat=battery-mfg',   icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2"/><path d="M7 10v4M11 10v4"/></svg> },
      { label: 'Electric Auto',           to: '/products?cat=3w-passenger',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5"/><circle cx="15" cy="17" r="2"/><circle cx="7.5" cy="17" r="2"/><path d="M14 17H9.5"/></svg>, tag: 'Soon' },
    ],
  },
  { label: 'Technology', to: '/technology' },
  { label: 'Dealership', to: '/dealership' },
  { label: 'Contact',    to: '/contact' },
];

export default function Navbar() {
  const [hidden,     setHidden]     = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown,   setDropdown]   = useState(null);
  const dropTimer = useRef(null);
  const location = useLocation();
  const isHome   = location.pathname === '/';
  const lastY    = useRef(0);

  const openDrop  = (label) => { clearTimeout(dropTimer.current); setDropdown(label); };
  const closeDrop = ()      => { dropTimer.current = setTimeout(() => setDropdown(null), 120); };

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const dir = y > lastY.current ? 'down' : 'up';
      if (dir === 'down' && y > 120) setHidden(true);
      if (dir === 'up')               setHidden(false);
      setScrolled(y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setHidden(false); }, [location]);

  const isTransparent = !scrolled;
  const pillBg     = isTransparent ? 'rgba(8,8,8,0.52)' : 'rgba(10,10,10,0.97)';
  const pillBorder = isTransparent ? '1px solid rgba(34,192,96,0.22)' : '1px solid rgba(255,255,255,0.08)';
  const pillShadow = isTransparent
    ? '0 2px 20px rgba(0,0,0,0.35)'
    : '0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,192,96,0.06)';

  return (
    <>
      {/* ── Centered pill wrapper ── */}
      <div style={{
        position: 'fixed', top: 14,
        left: 0, right: 0,
        zIndex: 1000,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <motion.div
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 20px',
            pointerEvents: hidden ? 'none' : 'all',
          }}
        >
          {/* Pill inner */}
          <div style={{
            height: 68,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 10px 0 16px',
            borderRadius: 100,
            background: pillBg,
            border: pillBorder,
            boxShadow: pillShadow,
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}>

            {/* Logo */}
            <Logo variant="light" size="sm" />

            {/* Desktop nav links */}
            <nav className="nav-desk-links" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {NAV_LINKS.map(l => (
                l.dropdown ? (
                  <div key={l.to} style={{ position: 'relative' }}
                    onMouseEnter={() => openDrop(l.label)}
                    onMouseLeave={closeDrop}>
                    <NavLink to={l.to} end={false} style={{ textDecoration: 'none' }}>
                      {({ isActive }) => (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '6px 13px', borderRadius: 100,
                          fontFamily: 'var(--font-display)', fontSize: 13.5,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.62)',
                          background: isActive || dropdown === l.label ? 'rgba(34,192,96,0.18)' : 'transparent',
                          transition: 'all 0.22s', cursor: 'pointer',
                        }}>
                          {l.label}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            style={{ opacity: 0.6, transition: 'transform 0.2s', transform: dropdown === l.label ? 'rotate(180deg)' : 'none' }}>
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </span>
                      )}
                    </NavLink>
                    <AnimatePresence>
                      {dropdown === l.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22,1,0.36,1] }}
                          onMouseEnter={() => openDrop(l.label)}
                          onMouseLeave={closeDrop}
                          style={{
                            position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(10,10,10,0.97)',
                            border: '1px solid rgba(34,192,96,0.2)',
                            borderRadius: 16, padding: '8px 6px',
                            minWidth: 230, zIndex: 2000,
                            boxShadow: '0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,192,96,0.08)',
                          }}>
                          {/* Arrow tip */}
                          <div style={{
                            position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                            width: 12, height: 12, background: 'rgba(10,10,10,0.97)',
                            border: '1px solid rgba(34,192,96,0.2)', borderRadius: 2,
                            rotate: '45deg', borderBottom: 'none', borderRight: 'none',
                          }} />
                          {l.dropdown.map((item) => (
                            <Link key={item.to + item.label} to={item.to}
                              onClick={() => setDropdown(null)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '9px 14px', borderRadius: 10,
                                textDecoration: 'none', transition: 'background 0.18s',
                                color: 'rgba(255,255,255,0.75)',
                                fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500,
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,192,96,0.12)'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}>
                              <span style={{ fontSize: 16 }}>{item.icon}</span>
                              <span style={{ flex: 1 }}>{item.label}</span>
                              {item.tag && (
                                <span style={{
                                  fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
                                  background: 'linear-gradient(135deg,#D97706,#F59E0B)',
                                  color: '#fff', padding: '2px 7px', borderRadius: 100,
                                }}>{item.tag}</span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink key={l.to} to={l.to} end={l.to === '/'} style={{ textDecoration: 'none' }}>
                    {({ isActive }) => (
                      <span style={{
                        display: 'inline-block', padding: '6px 13px', borderRadius: 100,
                        fontFamily: 'var(--font-display)', fontSize: 13.5,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.62)',
                        background: isActive ? 'rgba(34,192,96,0.18)' : 'transparent',
                        transition: 'all 0.22s', cursor: 'pointer',
                      }}
                        onMouseEnter={e => {
                          if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(34,192,96,0.12)'; }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) { e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; e.currentTarget.style.background = 'transparent'; }
                        }}
                      >
                        {l.label}
                      </span>
                    )}
                  </NavLink>
                )
              ))}
            </nav>

            {/* Right actions */}
            <div className="nav-desk-links" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a href={`tel:${COMPANY.phone1}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.52)', padding: '7px 13px', borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(34,192,96,0.5)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(34,192,96,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.52)'; e.currentTarget.style.background='transparent'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-.95a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call
              </a>

              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
                background: 'linear-gradient(135deg, var(--g-600), var(--g-400))',
                color: '#fff', padding: '8px 20px', borderRadius: 100,
                boxShadow: '0 3px 14px rgba(20,128,64,0.38)',
                textDecoration: 'none', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='linear-gradient(135deg,var(--g-700),var(--g-500))'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 6px 22px rgba(20,128,64,0.50)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='linear-gradient(135deg,var(--g-600),var(--g-400))'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 3px 14px rgba(20,128,64,0.38)'; }}
              >
                Get Quote
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Hamburger — shows on mobile */}
            <button onClick={() => setMobileOpen(o => !o)} className="nav-ham-btn"
              aria-label="Toggle menu"
              style={{ display: 'none', flexDirection: 'column', gap: 5, padding: '8px 10px', cursor: 'pointer', background: 'none', border: 'none' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 1.8, background: '#fff',
                  borderRadius: 1, transition: 'all 0.3s',
                  transform: mobileOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
                  opacity: mobileOpen && i===1 ? 0 : 1,
                }} />
              ))}
            </button>

          </div>{/* end pill inner */}
        </motion.div>
      </div>{/* end centered wrapper */}

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22,1,0.36,1] }}
            style={{
              position: 'fixed', top: 80, left: 14, right: 14, zIndex: 999,
              background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)',
              borderRadius: 20, border: '1px solid rgba(34,192,96,0.15)',
              padding: '14px 18px 20px', boxShadow: '0 16px 60px rgba(0,0,0,0.55)',
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.045 }}>
                <NavLink to={l.to} end={l.to === '/'}
                  style={({ isActive }) => ({
                    display: 'block', padding: '11px 4px',
                    fontFamily: 'var(--font-display)', fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--g-300)' : 'rgba(255,255,255,0.72)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'color 0.2s',
                  })}>
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href={`tel:${COMPANY.phone1}`} style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center',
                padding:'10px', borderRadius:100, fontSize:13, fontWeight:600,
                border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)',
                textDecoration:'none', fontFamily:'var(--font-display)',
              }}>
                Call Us
              </a>
              <Link to="/contact" style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center',
                padding:'10px', borderRadius:100, fontSize:13, fontWeight:700,
                background:'linear-gradient(135deg,var(--g-600),var(--g-400))',
                color:'#fff', textDecoration:'none', fontFamily:'var(--font-display)',
                boxShadow:'0 4px 14px rgba(20,128,64,0.3)',
              }}>
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desk-links { display: none !important; }
          .nav-ham-btn    { display: flex !important; }
        }
        .page-wrap { padding-top: 86px !important; }
      `}</style>
    </>
  );
}
