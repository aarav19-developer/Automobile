import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar     from './components/shared/Navbar';
import Footer     from './components/shared/Footer';
import Home       from './pages/Home';
import About      from './pages/About';
import Vehicles   from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Technology from './pages/Technology';
import Dealership from './pages/Dealership';
import Contact    from './pages/Contact';
import { COMPANY } from './data/vehicles';

function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Premium WhatsApp floating button */
function FloatWA() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1400); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <motion.a
      initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
      transition={{ type:'spring', stiffness:300, damping:20 }}
      href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`}
      target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      whileHover={{ scale:1.1, y:-3 }}
      style={{ position:'fixed', bottom:28, right:28, zIndex:999,
        width:56, height:56, borderRadius:'50%',
        background:'linear-gradient(135deg,#128C7E,#25D366)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 4px 20px rgba(37,211,102,0.45)',
        border:'2px solid rgba(255,255,255,0.25)', transition:'box-shadow 0.25s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow='0 8px 36px rgba(37,211,102,0.65)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow='0 4px 20px rgba(37,211,102,0.45)'}>
      {/* Premium WhatsApp SVG */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
}

/* Scroll-to-top — green gradient circle with clean arrow */
function ScrollTopBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!show) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      whileHover={{ y: -4, scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed', bottom: 28, right: 96, zIndex: 998,
        width: 46, height: 46, borderRadius: '50%',
        background: 'linear-gradient(145deg, #0F6B31, #22C060)',
        border: '2px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#fff',
        boxShadow: '0 4px 16px rgba(20,128,64,0.45), 0 1px 0 rgba(255,255,255,0.15) inset',
        transition: 'box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(20,128,64,0.65), 0 1px 0 rgba(255,255,255,0.2) inset'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,128,64,0.45), 0 1px 0 rgba(255,255,255,0.15) inset'; }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </motion.button>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollRestore />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/vehicles"       element={<Vehicles />} />
        <Route path="/vehicles/:slug" element={<VehicleDetail />} />
        <Route path="/technology"     element={<Technology />} />
        <Route path="/dealership"     element={<Dealership />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="*"               element={<Home />} />
      </Routes>
      <Footer />
      <FloatWA />
      <ScrollTopBtn />
    </>
  );
}
