import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';
import { COMPANY } from '../data/vehicles';

const PERKS = [
  { sym:'◈', title:'Exclusive Territory Rights', desc:'Lock your city or district with exclusive sales rights. No competitor dealer within your zone. Your investment is protected from Day 1.', highlight:'Exclusive Zone' },
  { sym:'◉', title:'Full Product Portfolio', desc:'All VNR Green models available from activation — E-Rickshaws, Loaders, Scooties. A complete EV showroom, not just a single product.', highlight:'10+ Models' },
  { sym:'◆', title:'Comprehensive Training', desc:'3-day on-site product training, sales methodology, service basics. Annual refresher program. Your team will know the products better than anyone.', highlight:'3-Day Program' },
  { sym:'▲', title:'Complete Marketing Kit', desc:'Brand guidelines, banners, digital assets, product brochures, POS materials — all delivered before launch. Zero design cost for dealers.', highlight:'₹0 Design Cost' },
  { sym:'✦', title:'Growing EV Market', desc:'India\'s EV market growing at 49% CAGR. Be a first mover in your district. The operators switching now will be your long-term customers.', highlight:'49% CAGR' },
  { sym:'⬡', title:'Priority After-Sales Support', desc:'Dedicated dealer relationship manager, 48-hour spare parts delivery, direct factory technical escalation. Your customers stay happy; your business grows.', highlight:'48hr Spares' },
  { sym:'◈', title:'Financial Assistance Guidance', desc:'Assistance with dealer loan applications, EV subsidy documentation, and FAME II benefits. We have helped 20+ dealers secure financing.', highlight:'FAME II Support' },
  { sym:'◉', title:'Digital Marketing Support', desc:'Social media templates, Google Business setup, WhatsApp broadcast support. We help you get found online in your local market.', highlight:'Digital Ready' },
];

const STEPS = [
  { num:'01', title:'Submit Application', desc:'Fill the enquiry form with your location, business background and investment capacity. Our dealer relations team reviews within 48 hours.' },
  { num:'02', title:'Qualification Call', desc:'30-minute video call to understand your market, competition, showroom potential and investment timeline. No pressure — just facts.' },
  { num:'03', title:'Site Verification', desc:'Our territory manager visits your location to assess showroom visibility, catchment population and competitive landscape.' },
  { num:'04', title:'Agreement & Setup', desc:'Dealer agreement signed. Branding kit dispatched. Training scheduled. Your showroom setup guided by our design team.' },
  { num:'05', title:'Training & Stock', desc:'3-day product and sales training at our Meerut facility. Initial demo stock dispatched. Marketing materials delivered.' },
  { num:'06', title:'Grand Launch', desc:'You\'re live — with a complete product portfolio, trained staff, and full marketing and operational support from Day 1.' },
];

export default function Dealership() {
  const titleRef = useReveal();
  const perksRef = useStaggerReveal('[data-perk]');
  const stepsRef = useStaggerReveal('[data-step]');

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,rgba(20,128,64,0.04) 0%,rgba(240,250,244,1) 40%,#ffffff 100%)', padding:'44px 0 40px',
        borderBottom:'1px solid rgba(20,128,64,0.1)', position:'relative', overflow:'hidden' }}>
        <div className="bg-dots" style={{ position:'absolute', inset:0, opacity:0.25 }} />
        <div style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)',
          width:360, height:360, borderRadius:'50%', pointerEvents:'none',
          background:'radial-gradient(circle,rgba(20,128,64,0.09) 0%,transparent 65%)' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="eyebrow">Dealership Opportunity</div>
          <h1 className="section-title">Become a VNR Green <span className="text-green">Dealer</span></h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:16, color:'var(--text-muted)',
            maxWidth:540, marginTop:14, lineHeight:1.78 }}>
            Partner with India's fastest-growing commercial EV brand. Territory rights, full product portfolio,
            comprehensive training and marketing support — everything you need to build a profitable EV dealership
            in your district from Day 1.
          </p>
          <div style={{ display:'flex', gap:14, marginTop:32, flexWrap:'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Apply for Dealership →</Link>
            <a href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hi, I am interested in VNR Green Dealership')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'15px 28px',
                borderRadius:12, fontSize:15, fontWeight:700, background:'#25D366', color:'#fff',
                textDecoration:'none', boxShadow:'0 4px 16px rgba(37,211,102,0.30)',
                fontFamily:'var(--font-display)', transition:'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#128C7E'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.transform='none'; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* What You Get */}
      <section className="section" style={{ background:'var(--white)' }}>
        <div className="container">
          <div ref={titleRef} className="reveal" style={{ marginBottom:52 }}>
            <div className="eyebrow">What You Get</div>
            <h2 className="section-title">8 Advantages that Make <span className="text-green">VNR Dealers Succeed</span></h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
              marginTop:10, maxWidth:500 }}>
              We don't just give you products to sell. We give you everything needed to build
              a sustainable, profitable EV dealership business in your market.
            </p>
          </div>
          <div ref={perksRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }} className="perks-grid">
            {PERKS.map(p => (
              <div key={p.title} data-perk className="card reveal"
                style={{ padding:'26px 22px', cursor:'default', border:'1px solid rgba(20,128,64,0.12)',
                  background:'linear-gradient(145deg,#fff,#f7fdf9)', transition:'all 0.35s var(--ease)',
                  position:'relative' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--g-300)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(20,128,64,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(20,128,64,0.12)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                  background:'linear-gradient(90deg,var(--g-500),var(--g-300),transparent)',
                  borderRadius:'16px 16px 0 0', opacity:0, transition:'opacity 0.3s' }}
                  ref={el => { if(el) el.parentElement?.addEventListener('mouseenter', ()=>el.style.opacity='1'); el?.parentElement?.addEventListener('mouseleave', ()=>el.style.opacity='0'); }} />
                <div style={{ width:46, height:46, borderRadius:12, background:'var(--g-50)',
                  border:'1px solid var(--primary-border)', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:20, fontFamily:'var(--font-display)',
                  fontWeight:800, color:'var(--g-600)', marginBottom:12 }}>{p.sym}</div>
                <div style={{ display:'inline-block', background:'var(--g-600)', color:'#fff',
                  borderRadius:100, padding:'3px 10px', fontSize:9.5, fontWeight:800,
                  letterSpacing:'0.08em', fontFamily:'var(--font-display)', marginBottom:10 }}>
                  {p.highlight}
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:14.5, fontWeight:700,
                  color:'var(--text-primary)', marginBottom:8 }}>{p.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--text-muted)',
                  lineHeight:1.68 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1200px){.perks-grid{grid-template-columns:repeat(3,1fr) !important;}}
          @media(max-width:900px){.perks-grid{grid-template-columns:repeat(2,1fr) !important;}}
          @media(max-width:560px){.perks-grid{grid-template-columns:1fr !important;}}
        `}</style>
      </section>

      {/* Process + Investment */}
      <section className="section" style={{ background:'linear-gradient(180deg,#F0FAF4,#ffffff)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }} className="deal-grid">
            <div>
              <div className="eyebrow">Onboarding Process</div>
              <h2 className="section-title">6 Steps to <span className="text-green">Launch Day</span></h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--text-muted)',
                marginTop:14, marginBottom:28 }}>
                From application to first sales day in under 4 weeks for most locations.
                Our team is with you at every step.
              </p>
              <div style={{ padding:'24px 26px', background:'linear-gradient(135deg,var(--g-50),rgba(20,128,64,0.04))',
                border:'1px solid var(--primary-border)', borderRadius:16, marginBottom:16 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:800,
                  color:'var(--g-700)', marginBottom:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  Investment Range
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:800,
                  color:'var(--text-primary)', letterSpacing:'-0.03em' }}>₹5L – ₹50L+</div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                  marginTop:6, lineHeight:1.65 }}>
                  Flexible entry points depending on showroom scale and market size.
                  Financing assistance available through partner banks.
                </p>
              </div>
              <div style={{ padding:'20px 22px', background:'var(--gray-900)',
                border:'1px solid rgba(34,192,96,0.2)', borderRadius:14 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:800,
                  color:'var(--g-300)', marginBottom:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  Current Openings
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.6)',
                  lineHeight:1.65 }}>
                  Territories available across Uttar Pradesh, Uttarakhand, Haryana, and Delhi NCR.
                  First-come-first-served for exclusive territory assignment.
                </p>
              </div>
            </div>
            <div ref={stepsRef}>
              {STEPS.map(step => (
                <div key={step.num} data-step className="process-step reveal">
                  <div className="step-num" style={{ fontFamily:'var(--font-mono)' }}>{step.num}</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700,
                    color:'var(--text-primary)', marginBottom:5 }}>{step.title}</h4>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'var(--text-muted)',
                    lineHeight:1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.deal-grid{grid-template-columns:1fr !important;gap:48px !important;}}`}</style>
      </section>
    </div>
  );
}
