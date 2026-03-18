import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const loanTypes = [
  "Home Loans",
  "Personal Loans",
  "Business Loans",
  "Vehicle Loans",
  "Loan Against Property",
  "Education Loan",
  "Other / Not Sure",
];

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9100 110 113",
    href: "tel:+919100110113",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "trfinancial@gmail.com",
    href: "mailto:trfinancial@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "11-73, Om Vihar Colony, Medipally, Hyderabad, Telangana 500098",
    href: "https://maps.google.com/?q=Medipally+Hyderabad+Telangana",
  },
];

const faqs = [
  { q: "How long does approval take?", a: "Most applications receive a decision within 60 minutes during business hours." },
  { q: "What documents do I need?", a: "Basic KYC (Aadhaar, PAN), income proof, and bank statements for the last 3 months." },
  { q: "Is there a processing fee?", a: "Zero processing fee on your first application with TR Financial Services." },
  { q: "Can I apply for multiple loans?", a: "Yes, you can apply for multiple loan types. Our advisor will guide you to the best option." },
];

/* ── Thank You Modal ── */
function ThankYouModal({ data, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`
        @keyframes popIn{from{opacity:0;transform:scale(0.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes checkDraw{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
        @keyframes ringPop{0%{transform:scale(0.7);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        @keyframes rain{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(90px) rotate(400deg);opacity:0}}
      `}</style>
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden relative"
        style={{ background: "#fff", boxShadow: "0 40px 100px rgba(0,0,0,0.25)", animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <div className="w-full h-2" style={{ background: "#fbcf4e" }} />

        {/* confetti */}
        <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none" style={{ height: 70 }}>
          {["12%","25%","40%","55%","68%","80%","90%"].map((l, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full"
              style={{ left: l, top: 0, background: i % 2 === 0 ? "#fbcf4e" : "#111", animation: `rain 0.9s ease ${i * 0.08}s both` }} />
          ))}
        </div>

        <div className="px-8 pt-8 pb-10">
          {/* Check */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "#fff7d6", border: "3px solid #fbcf4e", animation: "ringPop 0.5s ease 0.1s both" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <polyline points="4 12 9 17 20 7" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="60" strokeDashoffset="60"
                  style={{ animation: "checkDraw 0.5s ease 0.35s forwards" }} />
              </svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-black mb-2" style={{ color: "#111" }}>Message Sent! 🎉</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Thank you, <span className="font-bold" style={{ color: "#111" }}>{data.name}</span>! We've received your enquiry about{" "}
              <span className="font-bold" style={{ color: "#111" }}>{data.loanType}</span>.
              Our team will call you on <span className="font-bold" style={{ color: "#111" }}>{data.phone}</span> within 24 hours.
            </p>
          </div>

          {/* Summary */}
          <div className="rounded-2xl p-4 mb-5" style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}>
            {[
              { label: "Name",      val: data.name },
              { label: "Email",     val: data.email },
              { label: "Loan Type", val: data.loanType },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-1.5" style={{ borderBottom: i < 2 ? "1px solid #f5f5f5" : "none" }}>
                <span className="text-xs" style={{ color: "#aaa" }}>{r.label}</span>
                <span className="text-xs font-black" style={{ color: "#111" }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Ref number */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-5" style={{ background: "#fff7d6" }}>
            <span className="text-xs font-semibold" style={{ color: "#888" }}>Reference No.</span>
            <span className="text-sm font-black" style={{ color: "#111" }}>TRF-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>

          <button onClick={onClose}
            className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#111", color: "#fbcf4e" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Item ── */
function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-300"
      style={{ borderColor: open ? "#fbcf4e" : "#efefef" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
        style={{ background: open ? "#fffbea" : "#fff" }}
      >
        <span className="text-sm font-black pr-4" style={{ color: "#111" }}>{faq.q}</span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? "#fbcf4e" : "#f5f5f5", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? "#111" : "#888"} strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-4" style={{ background: "#fffbea" }}>
          <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ══ MAIN COMPONENT ══ */
export default function ContactPage() {
  const [heroRef, heroVisible] = useInView(0.05);
  const [formRef, formVisible] = useInView(0.05);
  const [faqRef,  faqVisible]  = useInView(0.05);

  const [form, setForm]         = useState({ name: "", email: "", phone: "", loanType: "", message: "" });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmit]  = useState(false);
  const [submittedData, setSD]  = useState(null);

  const set = (key, val) => { setForm((f) => ({ ...f, [key]: val })); setErrors((e) => ({ ...e, [key]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit number required";
    if (!form.loanType)      e.loanType = "Please select a loan type";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSD({ ...form }); setSubmit(true); }, 1200);
  };

  const handleClose = () => { setSubmit(false); setForm({ name: "", email: "", phone: "", loanType: "", message: "" }); setErrors({}); };

  const inp = (field) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "#e5e5e5"}`,
    outline: "none",
    fontSize: "14px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#111",
    background: "#fff",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff", overflowX: "hidden" }}>
      {submitted && submittedData && <ThankYouModal data={submittedData} onClose={handleClose} />}

      {/* ══ HERO ══ */}
      <section className="w-full relative overflow-hidden" style={{ background: "#111" }}>
        <div className="w-full h-1.5" style={{ background: "#fbcf4e" }} />

        {/* BG watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none select-none overflow-hidden">
          <span style={{ fontSize: "clamp(100px,18vw,220px)", fontWeight: 900, color: "#fff", opacity: 0.03, letterSpacing: "-6px" }}>
            CONTACT
          </span>
        </div>

        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>Contact Us</span>
          </div>
          <h1 className="font-black leading-[1.05] mb-4" style={{ color: "#fff", fontSize: "clamp(36px,6vw,72px)", letterSpacing: "-2px" }}>
            Let's Talk
            <br />
            <span style={{ color: "#fbcf4e" }}>About Your Loan.</span>
          </h1>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: "#6b7280" }}>
            Have questions or ready to apply? Our team is here to guide you through every step
            — from choosing the right loan to final disbursal.
          </p>

          {/* Quick contact chips */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="tel:+919100110113"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: "rgba(251,207,78,0.12)", border: "1px solid rgba(251,207,78,0.25)", color: "#fbcf4e", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 9100 110 113
            </a>
            <a href="mailto:hello@quickcash.com"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: "rgba(251,207,78,0.12)", border: "1px solid rgba(251,207,78,0.25)", color: "#fbcf4e", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
                trfinancial@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ══ CONTACT CARDS + FORM ══ */}
      <section className="w-full bg-white">
        <div
          ref={formRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* ── LEFT: Contact Info + Map ── */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5">

              {/* Info Cards */}
              {contactInfo.map((c, i) => (
                <ContactInfoCard key={i} info={c} index={i} />
              ))}

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#efefef", height: "220px" }}>
                <iframe
                  title="TR Financial Services Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2342.2551994523487!2d78.59617404848996!3d17.407268044600343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9eedbff6e973%3A0x9b2a5a82da500c9f!2sOm%20Vihar%20Colony%2C%20Medipally%2C%20Canara%20Nagar%2C%20Peerzadiguda%2C%20Hyderabad%2C%20Telangana%20500098!5e1!3m2!1sen!2sin!4v1773840589827!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={(e) => {
                    e.currentTarget.parentElement.innerHTML =
                      `<div style="width:100%;height:220px;background:#f5f5f5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#aaa;font-family:sans-serif;font-size:13px">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbcf4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>Medipally, Hyderabad</span>
                      </div>`;
                  }}
                />
              </div>

              
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}>
                <div className="w-full h-1.5" style={{ background: "#fbcf4e" }} />
                <div className="p-8 md:p-10 bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[3px] w-8 rounded-full" style={{ background: "#fbcf4e" }} />
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>Enquiry Form</span>
                  </div>
                  <h2 className="text-2xl font-black mb-8" style={{ color: "#111" }}>Send Us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <div className="sm:col-span-1">
                      <label className="text-[11px] font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>Full Name *</label>
                      <input type="text" placeholder="e.g. Rahul Mehta" value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        style={inp("name")}
                        onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                        onBlur={(e) => (e.target.style.borderColor = errors.name ? "#ef4444" : "#e5e5e5")}
                      />
                      {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-1">
                      <label className="text-[11px] font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>Email Address *</label>
                      <input type="email" placeholder="e.g. rahul@email.com" value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        style={inp("email")}
                        onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "#e5e5e5")}
                      />
                      {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-1">
                      <label className="text-[11px] font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>Phone Number *</label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 rounded-xl border text-sm font-bold flex-shrink-0"
                          style={{ borderColor: "#e5e5e5", color: "#888", background: "#fafafa", height: "48px" }}>
                          +91
                        </div>
                        <div className="flex-1">
                          <input type="tel" placeholder="10-digit mobile" value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            style={{ ...inp("phone") }}
                            onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                            onBlur={(e) => (e.target.style.borderColor = errors.phone ? "#ef4444" : "#e5e5e5")}
                          />
                        </div>
                      </div>
                      {errors.phone && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.phone}</p>}
                    </div>

                    {/* Loan Type */}
                    <div className="sm:col-span-1">
                      <label className="text-[11px] font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>Loan Type *</label>
                      <select value={form.loanType}
                        onChange={(e) => set("loanType", e.target.value)}
                        style={{
                          ...inp("loanType"),
                          cursor: "pointer",
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          color: form.loanType ? "#111" : "#aaa",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                        onBlur={(e) => (e.target.style.borderColor = errors.loanType ? "#ef4444" : "#e5e5e5")}
                      >
                        <option value="" disabled>Select loan type</option>
                        {loanTypes.map((l) => <option key={l} value={l} style={{ color: "#111" }}>{l}</option>)}
                      </select>
                      {errors.loanType && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.loanType}</p>}
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>Message (Optional)</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more about your requirements..."
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        style={{ ...inp("message"), resize: "vertical", lineHeight: "1.6" }}
                        onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                        onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                      />
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-2">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-95"
                        style={{ background: loading ? "#e6ba00" : "#111", color: "#fbcf4e", cursor: loading ? "wait" : "pointer" }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            </svg>
                            Sending...
                          </>
                        ) : "Send Message →"}
                      </button>
                      <p className="text-center text-[11px] mt-3" style={{ color: "#ccc" }}>
                        🔒 Your details are encrypted and 100% confidential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="w-full" style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
        <div
          ref={faqRef}
          className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
          style={{
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[3px] w-8 rounded-full" style={{ background: "#fbcf4e" }} />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>FAQ</span>
              <div className="h-[3px] w-8 rounded-full" style={{ background: "#fbcf4e" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#111" }}>
              Quick{" "}
              <span style={{ borderBottom: "4px solid #fbcf4e", paddingBottom: "2px", display: "inline-block", lineHeight: 1.3 }}>
                Answers
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => <FaqItem key={i} faq={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ FOOTER STRIP ══ */}
      <section style={{ background: "#111" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-sm font-black mb-1" style={{ color: "#fbcf4e" }}>TR Financial Services</p>
            <p className="text-xs" style={{ color: "#444" }}>© {new Date().getFullYear()} All rights reserved · Medipally, Hyderabad</p>
          </div>
          <a href="tel:+919100110113"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "#fbcf4e", color: "#111", textDecoration: "none" }}>
            Call Us Now →
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Contact Info Card ── */
function ContactInfoCard({ info, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={info.href}
      target={info.label === "Address" ? "_blank" : "_self"}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300"
      style={{
        borderColor: hovered ? "#fbcf4e" : "#efefef",
        background: hovered ? "#fffbea" : "#fff",
        boxShadow: hovered ? "0 8px 30px rgba(251,207,78,0.15)" : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        textDecoration: "none",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: hovered ? "#fbcf4e" : "#fff7d6", color: hovered ? "#111" : "#b8860b" }}
      >
        {info.icon}
      </div>
      <div>
        <p className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: "#ccc" }}>{info.label}</p>
        <p className="text-sm font-bold leading-snug" style={{ color: "#111" }}>{info.value}</p>
      </div>
    </a>
  );
}