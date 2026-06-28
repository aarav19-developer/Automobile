import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import { COMPANY } from '../data/vehicles';

/* ── SVG Icon components ── */
const IconCart = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);
const IconBattery = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2"/><path d="M7 10v4M11 10v4"/>
  </svg>
);
const IconStore = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5"/><path d="M21 9v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9"/>
    <path d="M9 21V9m6 0v12"/>
  </svg>
);
const IconWrench = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconMessage = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const TYPES = [
  { value:'vehicle',    label:'Buy a Vehicle',   icon: <IconCart /> },
  { value:'battery',    label:'Battery Enquiry',  icon: <IconBattery /> },
  { value:'dealership', label:'Dealership',       icon: <IconStore /> },
  { value:'service',    label:'Service',          icon: <IconWrench /> },
  { value:'other',      label:'General',          icon: <IconMessage /> },
];
const PRODUCTS = ['E-Rickshaw','EV Loader','Garbage Loader','EV Scooty','LFP Battery','Custom Loader','Not sure yet'];
const INVEST   = ['₹5–10 Lakh','₹10–25 Lakh','₹25–50 Lakh','₹50+ Lakh'];

const CONTACTS = [
  {
    label:'Address', href:'https://maps.google.com/?q=VNR+Green+Automobiles+Meerut',
    value:'Plot D-26, Sector 1, Shatabdi Nagar, Delhi Road, Meerut UP 250103',
    icon:(
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ), color:'var(--g-600)',
  },
  {
    label:'Phone', href:`tel:${COMPANY.phone1}`,
    value:`${COMPANY.phone1}  ·  ${COMPANY.phone2}`,
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.91a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.17-.88a2 2 0 012.11-.45c.94.35 1.9.59 2.91.72A2 2 0 0122 16.92z"/>
      </svg>
    ), color:'var(--g-500)',
  },
  {
    label:'Email', href:`mailto:${COMPANY.email}`,
    value: COMPANY.email,
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ), color:'var(--g-600)',
  },
  {
    label:'Website', href:`https://${COMPANY.website}`, external:true,
    value: COMPANY.website,
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ), color:'var(--g-500)',
  },
];

export default function Contact() {
  const formRef = useReveal();
  const infoRef = useReveal();
  const mapRef  = useReveal();
  const [type,    setType]    = useState('vehicle');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
    setType('vehicle');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="page-wrap">
      {/* Page hero */}
      <div style={{ background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)',
        padding:'44px 0 40px', borderBottom:'1px solid rgba(20,128,64,0.08)',
        position:'relative', overflow:'hidden' }}>
        <div className="bg-grid-light" style={{ position:'absolute', inset:0, opacity:0.4 }} />
        <div style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)',
          width:300, height:300, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.07) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="eyebrow">Get In Touch</div>
          <h1 className="section-title">
            Let's Talk <span className="text-green">Electric</span>
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15,
            color:'var(--text-muted)', maxWidth:440, marginTop:14, lineHeight:1.75 }}>
            Our team responds within 24 hours. WhatsApp is fastest — typically within 1 hour.
          </p>
        </div>
      </div>

      <section className="section" style={{ background:'var(--gray-50)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr',
            gap:48, alignItems:'start' }} className="contact-grid">

            {/* Info column */}
            <div ref={infoRef} className="reveal">
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
                {CONTACTS.map(c => (
                  <motion.a key={c.label}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ x:5 }}
                    style={{ display:'flex', alignItems:'flex-start', gap:14,
                      background:'var(--white)', border:'1px solid var(--border)',
                      borderRadius:14, padding:'16px 18px',
                      textDecoration:'none', transition:'all 0.25s',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--primary-border)';
                      e.currentTarget.style.background = 'var(--g-50)';
                      e.currentTarget.style.boxShadow = '0 6px 24px rgba(20,128,64,0.10)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'var(--white)';
                      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                    }}>
                    <div style={{ width:42, height:42, borderRadius:11, flexShrink:0,
                      background:'var(--g-50)', border:'1px solid var(--primary-border)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:c.color, transition:'all 0.25s' }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:10.5,
                        fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
                        color:'var(--text-muted)', marginBottom:3 }}>
                        {c.label}
                      </div>
                      <div style={{ fontFamily:'var(--font-body)', fontSize:13.5,
                        fontWeight:600, color:'var(--text-primary)', lineHeight:1.5 }}>
                        {c.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp button */}
              <motion.a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y:-3 }}
                style={{ display:'flex', alignItems:'center', gap:14, width:'100%',
                  background:'linear-gradient(135deg,#128C7E,#25D366)',
                  borderRadius:14, padding:'16px 20px', textDecoration:'none',
                  color:'#fff', boxShadow:'0 4px 18px rgba(37,211,102,0.25)',
                  transition:'box-shadow 0.28s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow='0 10px 32px rgba(37,211,102,0.40)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow='0 4px 18px rgba(37,211,102,0.25)'}>
                <div style={{ width:44, height:44, borderRadius:11,
                  background:'rgba(255,255,255,0.15)',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:15,
                    fontWeight:700, marginBottom:2 }}>Chat on WhatsApp</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:12.5,
                    opacity:0.75, fontWeight:400 }}>Typically replies within 1 hour</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" style={{ marginLeft:'auto' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </div>

            {/* Form */}
            <div ref={formRef} className="reveal d2">
              <div className="enquiry-wrap" style={{ padding:'36px 32px' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:22,
                  fontWeight:800, color:'var(--text-primary)', marginBottom:5 }}>
                  Send an Enquiry
                </h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5,
                  color:'var(--text-muted)', fontWeight:400, marginBottom:26 }}>
                  One form. All enquiries. We'll connect you with the right person.
                </p>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div key="ok"
                      initial={{ opacity:0, scale:0.95 }}
                      animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0 }}
                      style={{ textAlign:'center', padding:'52px 20px' }}>
                      <div style={{ fontSize:56, marginBottom:18 }}>✅</div>
                      <h4 style={{ fontFamily:'var(--font-display)', fontSize:22,
                        fontWeight:800, color:'var(--text-primary)', marginBottom:8 }}>
                        Enquiry Sent!
                      </h4>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:14,
                        color:'var(--text-muted)', fontWeight:400 }}>
                        Our team contacts you within 24 hours.<br />
                        Urgent? <a href={`tel:${COMPANY.phone1}`}
                          style={{ color:'var(--g-600)', fontWeight:700 }}>
                          {COMPANY.phone1}
                        </a>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit}
                      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

                      {/* Type selector pills */}
                      <div className="form-group">
                        <label className="form-label">Enquiry Type *</label>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:4 }}>
                          {TYPES.map(t => (
                            <button key={t.value} type="button"
                              onClick={() => setType(t.value)}
                              className={`type-pill${type===t.value?' active':''}`}
                              style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                              {t.icon}
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name + Phone */}
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}
                        className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input className="form-input" type="text"
                            placeholder="Your name" required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Mobile / WhatsApp *</label>
                          <input className="form-input" type="tel"
                            placeholder="+91 00000 00000" required />
                        </div>
                      </div>

                      {/* Email + City */}
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}
                        className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input className="form-input" type="email"
                            placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">City / State *</label>
                          <input className="form-input" type="text"
                            placeholder="Meerut, UP" required />
                        </div>
                      </div>

                      {/* Conditional fields */}
                      {(type==='vehicle'||type==='battery') && (
                        <div className="form-group">
                          <label className="form-label">Product of Interest</label>
                          <select className="form-input">
                            <option value="">Select product</option>
                            {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      )}
                      {type==='dealership' && (
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}
                          className="form-row-2">
                          <div className="form-group">
                            <label className="form-label">Firm / Business Name</label>
                            <input className="form-input" type="text"
                              placeholder="Your firm name" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Investment Capacity</label>
                            <select className="form-input">
                              <option value="">Select range</option>
                              {INVEST.map(i => <option key={i}>{i}</option>)}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Message */}
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="form-input"
                          placeholder={type==='dealership'
                            ? 'Tell us about your business background…'
                            : 'Tell us about your requirement…'} />
                      </div>

                      <button type="submit" className="btn-submit-premium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                        Send Enquiry — We Reply in 24 Hours
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Google Maps embed ── */}
          <div ref={mapRef} className="reveal"
            style={{ marginTop:64 }}>
            <div style={{ marginBottom:20 }}>
              <div className="eyebrow">Find Us</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,34px)',
                fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.02em' }}>
                Visit Our <span className="text-green">Facility</span>
              </h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:14,
                color:'var(--text-muted)', marginTop:8 }}>
                📍 Plot D-26, Sector 1, Shatabdi Nagar, Delhi Road, Meerut, UP 250103
              </p>
            </div>
            <div style={{ position:'relative', borderRadius:20, overflow:'hidden',
              border:'1px solid var(--border)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
              height:420, transition:'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 48px rgba(20,128,64,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.08)'}>
              <iframe
                title="VNR Green Automobiles Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.4!2d77.6889!3d28.9845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65b0c9f6bfdd%3A0x1!2sShatabdi+Nagar%2C+Meerut%2C+Uttar+Pradesh+250103!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border:0, display:'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay badge */}
              <div style={{ position:'absolute', bottom:16, left:16,
                background:'var(--white)', borderRadius:12, padding:'12px 18px',
                boxShadow:'0 4px 20px rgba(0,0,0,0.15)',
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:9,
                  background:'var(--g-50)', border:'1px solid var(--primary-border)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'var(--g-600)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:13,
                    fontWeight:700, color:'var(--text-primary)' }}>
                    VNR Green Automobiles
                  </div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:11.5,
                    color:'var(--text-muted)' }}>
                    Shatabdi Nagar, Meerut
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Shatabdi+Nagar+Meerut+UP+250103"
                  target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft:8, fontFamily:'var(--font-display)',
                    fontSize:12, fontWeight:700, color:'var(--g-600)',
                    display:'flex', alignItems:'center', gap:4,
                    textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--g-700)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--g-600)'}>
                  Get Directions
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:36px!important;}}
        @media(max-width:560px){.form-row-2{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}
