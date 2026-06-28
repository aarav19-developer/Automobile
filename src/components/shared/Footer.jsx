import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { COMPANY } from '../../data/vehicles';

/* ── Proper SVG social icons ── */
const SOCIALS = [
  {
    label: 'WhatsApp',
    href:  `https://wa.me/${COMPANY.whatsapp}`,
    color: '#25D366',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  COMPANY.socials.instagram,
    color: '#E1306C',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href:  COMPANY.socials.youtube,
    color: '#FF0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href:  COMPANY.socials.facebook,
    color: '#1877F2',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  COMPANY.socials.linkedin,
    color: '#0A66C2',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const FOOTER_NAV = {
  Products: [
    { label:'Electric Scooty',     to:'/products' },
    { label:'Electric Rickshaw',   to:'/products' },
    { label:'Electric Loader',     to:'/products' },
    { label:'Garbage Loader EV',   to:'/products' },
    { label:'LFP Battery Mfg',     to:'/products' },
    { label:'Electric Auto',       to:'/products' },
  ],
  Company: [
    { label:'About Us',    to:'/about' },
    { label:'Technology',  to:'/technology' },
    { label:'Dealership',  to:'/dealership' },
    { label:'Contact',     to:'/contact' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background:'var(--gray-900)', paddingTop:72 }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr',
          gap:52, paddingBottom:56,
          borderBottom:'1px solid rgba(255,255,255,0.07)' }}
          className="footer-grid">

          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p style={{ fontFamily:'var(--font-body)', fontSize:13.5,
              color:'rgba(255,255,255,0.38)', lineHeight:1.75,
              margin:'18px 0 18px', fontWeight:400, maxWidth:260 }}>
              Meerut mein bana. India ke commercial operators ke liye. Dewan Group ki legacy ke saath.
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:12,
              color:'rgba(255,255,255,0.18)', lineHeight:1.65,
              fontWeight:300, marginBottom:22 }}>
              📍 {COMPANY.address}
            </p>
            {/* Social icons — proper SVG */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y:-3, scale:1.1 }}
                  style={{ width:38, height:38, borderRadius:10,
                    background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.09)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'rgba(255,255,255,0.55)',
                    transition:'all 0.25s', textDecoration:'none' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = s.color;
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${s.color}55`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily:'var(--font-display)', fontSize:10.5,
                fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.7)', marginBottom:18 }}>
                {title}
              </h4>
              <ul style={{ display:'flex', flexDirection:'column', gap:11 }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to}
                      style={{ fontFamily:'var(--font-body)', fontSize:13.5,
                        color:'rgba(255,255,255,0.35)', fontWeight:400,
                        transition:'color 0.2s', display:'inline-block' }}
                      onMouseEnter={e => e.currentTarget.style.color='var(--g-300)'}
                      onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily:'var(--font-display)', fontSize:10.5,
              fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.7)', marginBottom:18 }}>
              Contact
            </h4>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {[COMPANY.phone1, COMPANY.phone2, COMPANY.email].map(v => (
                <a key={v}
                  href={v.includes('@') ? `mailto:${v}` : `tel:${v}`}
                  style={{ fontFamily:'var(--font-body)', fontSize:13,
                    color:'rgba(255,255,255,0.35)', fontWeight:400,
                    transition:'color 0.2s', textDecoration:'none' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--g-300)'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
                  {v}
                </a>
              ))}
            </div>
            {/* WhatsApp CTA with proper icon */}
            <a href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:9,
                marginTop:20, padding:'10px 20px', borderRadius:8,
                background:'#25D366', color:'#fff',
                fontFamily:'var(--font-display)', fontSize:13, fontWeight:700,
                textDecoration:'none', boxShadow:'0 4px 16px rgba(37,211,102,0.30)',
                transition:'all 0.25s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform='translateY(-2px)';
                e.currentTarget.style.boxShadow='0 8px 28px rgba(37,211,102,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform='none';
                e.currentTarget.style.boxShadow='0 4px 16px rgba(37,211,102,0.30)';
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding:'22px 0', display:'flex', alignItems:'center',
          justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:12,
            color:'rgba(255,255,255,0.18)' }}>
            © {new Date().getFullYear()} VNR Green Automobiles Pvt. Ltd. All rights reserved.
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:12,
            color:'rgba(255,255,255,0.12)' }}>
            Meerut se. India ke liye. Electric.
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important;}}
        @media(max-width:560px){.footer-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </footer>
  );
}
