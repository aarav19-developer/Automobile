import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const CUSTOMER_PRODUCTS = [
  'E-Rickshaw', 'EV Loader', 'EV Scooty', 'LFP Battery', 'Garbage Loader', 'Custom Loader',
];
const PURPOSES = ['Personal Use', 'Commercial', 'Business / Fleet'];
const INVESTMENT = ['₹5–10 Lakh', '₹10–25 Lakh', '₹25–50 Lakh', '₹50+ Lakh'];

function InputField({ label, children }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {children}
    </div>
  );
}

function SuccessToast({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      style={{
        position: 'fixed', bottom: 30, right: 30, zIndex: 3000,
        background: 'var(--ink)',
        border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 'var(--r-md)',
        padding: '18px 24px',
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        maxWidth: 360,
      }}
    >
      <CheckCircle size={24} style={{ color: '#10B981', flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
          Enquiry Sent!
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
          Our team will contact you within 24 hours.
        </div>
      </div>
    </motion.div>
  );
}

export default function Quote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [mode, setMode] = useState('customer'); // 'customer' | 'dealer'
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    e.target.reset();
  };

  return (
    <section id="quote" ref={ref} style={{ background: 'var(--paper)', padding: '110px 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 0 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Get a Quote</div>
          <h2 className="section-title">What Brings You Here?</h2>
          <p className="section-sub" style={{ margin: '10px auto 0', textAlign: 'center' }}>
            Tell us your intent and we'll connect you with the right team within 24 hours.
          </p>
        </motion.div>

        {/* Mode toggle cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '44px 0 28px' }}
          className="quote-toggle-resp"
        >
          {[
            { id: 'customer', icon: '🛒', title: "I'm a Customer", desc: 'Looking to buy an E-Rickshaw, Loader, Scooty or Battery for personal or commercial use.' },
            { id: 'dealer', icon: '🏪', title: 'I Want a Dealership', desc: 'Interested in becoming an authorized VNR Dewan dealer in my city or territory.' },
          ].map((opt) => (
            <motion.div
              key={opt.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode(opt.id)}
              style={{
                background: 'var(--white)',
                border: `2px solid ${mode === opt.id ? 'var(--amber)' : 'var(--border)'}`,
                borderRadius: 'var(--r-xl)',
                padding: '28px 26px',
                cursor: 'pointer',
                transition: 'all 0.25s',
                textAlign: 'center',
                boxShadow: mode === opt.id ? '0 0 0 4px var(--amber-glow), 0 8px 32px rgba(245,158,11,0.12)' : 'none',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{opt.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                {opt.title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                {opt.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding: '44px 40px',
          }}
          className="quote-form-resp"
        >
          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {['customer', 'dealer'].map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 'var(--r)',
                  fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: `1.5px solid ${mode === tab ? 'var(--amber)' : 'var(--border)'}`,
                  background: mode === tab
                    ? 'linear-gradient(135deg, var(--amber), var(--coral))'
                    : 'var(--paper)',
                  color: mode === tab ? '#fff' : 'var(--muted)',
                  boxShadow: mode === tab ? '0 4px 16px rgba(245,158,11,0.25)' : 'none',
                }}
              >
                {tab === 'customer' ? '🛒 Customer Enquiry' : '🏪 Dealer Application'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'customer' ? (
              <motion.form
                key="customer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Full Name *">
                    <input type="text" placeholder="Your full name" required />
                  </InputField>
                  <InputField label="Mobile / WhatsApp *">
                    <input type="tel" placeholder="+91 00000 00000" required />
                  </InputField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Email ID">
                    <input type="email" placeholder="your@email.com" />
                  </InputField>
                  <InputField label="City / State *">
                    <input type="text" placeholder="Meerut, UP" required />
                  </InputField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Product Interest *">
                    <select required>
                      <option value="">Select product</option>
                      {CUSTOMER_PRODUCTS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </InputField>
                  <InputField label="Purpose">
                    <select>
                      <option value="">Select purpose</option>
                      {PURPOSES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </InputField>
                </div>
                <InputField label="Message / Requirement">
                  <textarea placeholder="Tell us more about your requirement..." />
                </InputField>
                <button type="submit" className="form-submit">
                  <Send size={16} style={{ marginRight: 8 }} />
                  Send Enquiry — Get Callback in 24 hrs
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="dealer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Full Name *">
                    <input type="text" placeholder="Your full name" required />
                  </InputField>
                  <InputField label="Business / Firm Name *">
                    <input type="text" placeholder="Your firm name" required />
                  </InputField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Mobile / WhatsApp *">
                    <input type="tel" placeholder="+91 00000 00000" required />
                  </InputField>
                  <InputField label="Email ID *">
                    <input type="email" placeholder="your@email.com" required />
                  </InputField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="City & State *">
                    <input type="text" placeholder="City, State" required />
                  </InputField>
                  <InputField label="Investment Capacity">
                    <select>
                      <option>Select range</option>
                      {INVESTMENT.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </InputField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row-resp">
                  <InputField label="Showroom Space?">
                    <select>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Planning</option>
                    </select>
                  </InputField>
                  <InputField label="EV / Auto Experience?">
                    <select>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </InputField>
                </div>
                <InputField label="Business Profile / Message">
                  <textarea placeholder="Tell us about your business background..." />
                </InputField>
                <button type="submit" className="form-submit">
                  <Send size={16} style={{ marginRight: 8 }} />
                  Apply for Dealership
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {submitted && <SuccessToast onClose={() => setSubmitted(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 700px) {
          .quote-toggle-resp { grid-template-columns: 1fr !important; }
          .quote-form-resp { padding: 28px 20px !important; }
          .form-row-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
