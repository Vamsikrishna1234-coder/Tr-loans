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

const services = [
  {
    id: "home",
    title: "Home Loans",
    tagline: "Own Your Dream Home",
    desc: "Finance your perfect home with competitive rates starting at just 8% p.a. Flexible repayment up to 30 years with minimal documentation.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    rate: "8% p.a.",
    tenure: "Up to 30 yrs",
    amount: "Up to ₹2 Cr",
    highlight: true,
  },
  {
    id: "personal",
    title: "Personal Loans",
    tagline: "Fund Any Goal Instantly",
    desc: "Quick personal loans for travel, medical, education, or any personal need. No collateral required. Approval in under 60 minutes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    rate: "12% p.a.",
    tenure: "Up to 5 yrs",
    amount: "Up to ₹10 L",
    highlight: false,
  },
  {
    id: "business",
    title: "Business Loans",
    tagline: "Grow Without Limits",
    desc: "Expand your business, purchase equipment, or manage working capital. Customized loan structures designed for your business needs.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    rate: "14% p.a.",
    tenure: "Up to 7 yrs",
    amount: "Up to ₹50 L",
    highlight: false,
  },
  {
    id: "vehicle",
    title: "Vehicle Loans",
    tagline: "Drive Your Ambition",
    desc: "Two-wheeler or four-wheeler, new or used — get financed fast. Competitive rates with flexible down payment options starting at 10%.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    rate: "10% p.a.",
    tenure: "Up to 7 yrs",
    amount: "Up to ₹30 L",
    highlight: false,
  },
  {
    id: "lap",
    title: "Loan Against Property",
    tagline: "Unlock Hidden Value",
    desc: "Leverage your residential or commercial property to get high-value loans. Best suited for business expansion or large personal needs.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    rate: "9% p.a.",
    tenure: "Up to 15 yrs",
    amount: "Up to ₹5 Cr",
    highlight: false,
  },
  {
    id: "education",
    title: "Education Loans",
    tagline: "Invest in Your Future",
    desc: "Fund your higher education in India or abroad. Covers tuition, living expenses, and study material with repayment starting after course completion.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    rate: "9.5% p.a.",
    tenure: "Up to 10 yrs",
    amount: "Up to ₹75 L",
    highlight: false,
  },
];

const loanOptions = services.map((s) => s.title);

/* ── Thank You Overlay ── */
function ThankYou({ data, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(0.85) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes checkDraw { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
        @keyframes ringPop { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes rain { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(90px) rotate(400deg);opacity:0} }
      `}</style>

      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden relative"
        style={{ background: "#fff", boxShadow: "0 40px 100px rgba(0,0,0,0.25)", animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <div className="w-full h-2" style={{ background: "#fbcf4e" }} />

        {/* confetti */}
        <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none" style={{ height: 70 }}>
          {["15%","28%","42%","58%","70%","82%","35%"].map((l, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full"
              style={{ left: l, top: 0, background: i % 2 === 0 ? "#fbcf4e" : "#111",
                animation: `rain 0.9s ease ${i * 0.08}s both` }} />
          ))}
        </div>

        <div className="px-8 pt-8 pb-10">
          {/* check */}
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

          <div className="text-center mb-7">
            <h3 className="text-2xl font-black mb-2" style={{ color: "#111" }}>Application Received! 🎉</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Thank you, <span className="font-bold" style={{ color: "#111" }}>{data.name}</span>! Your{" "}
              <span className="font-bold" style={{ color: "#111" }}>{data.loanType}</span> application has been submitted.
              We'll reach out on <span className="font-bold" style={{ color: "#111" }}>{data.phone}</span> within 24 hours.
            </p>
          </div>

          {/* summary */}
          <div className="rounded-2xl p-5 mb-5" style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}>
            <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: "#ccc" }}>Summary</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Name",      value: data.name },
                { label: "Email",     value: data.email },
                { label: "Loan Type", value: data.loanType },
              ].map((r, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span style={{ color: "#aaa" }}>{r.label}</span>
                  <span className="font-bold" style={{ color: "#111" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* reference */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-6"
            style={{ background: "#fff7d6" }}>
            <span className="text-xs font-semibold" style={{ color: "#888" }}>Reference No.</span>
            <span className="text-sm font-black" style={{ color: "#111" }}>
              TRF-{Math.floor(100000 + Math.random() * 900000)}
            </span>
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

/* ── Service Card ── */
function ServiceCard({ service, index, visible, onApply }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border overflow-hidden flex flex-col"
      style={{
        borderColor: hovered ? "#fbcf4e" : service.highlight ? "#fbcf4e" : "#efefef",
        background: "#fff",
        boxShadow: hovered ? "0 16px 50px rgba(251,207,78,0.18)" : service.highlight ? "0 8px 30px rgba(251,207,78,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Top accent bar */}
      <div className="w-full h-1" style={{ background: hovered || service.highlight ? "#fbcf4e" : "#f5f5f5", transition: "background 0.3s" }} />

      <div className="p-7 flex flex-col flex-1 gap-4">
        {/* Icon + badge */}
        <div className="flex items-start justify-between">
          <div
            className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? "#fbcf4e" : "#fff7d6",
              color: hovered ? "#111" : "#b8860b",
              transform: hovered ? "rotate(-5deg) scale(1.08)" : "none",
            }}
          >
            {service.icon}
          </div>
          {service.highlight && (
            <span className="text-[10px] font-black tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#fbcf4e", color: "#111" }}>
              POPULAR
            </span>
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-1" style={{ color: "#fbcf4e" }}>
            {service.tagline}
          </p>
          <h3 className="text-lg font-black mb-2" style={{ color: "#111" }}>{service.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b" style={{ borderColor: "#f5f5f5" }}>
          {[
            { label: "Rate", value: service.rate },
            { label: "Tenure", value: service.tenure },
            { label: "Amount", value: service.amount },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-black" style={{ color: "#111" }}>{s.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#ccc" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onApply(service.title)}
          className="mt-auto w-full py-3 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{
            background: hovered ? "#fbcf4e" : "#111",
            color: hovered ? "#111" : "#fbcf4e",
            transition: "background 0.3s, color 0.3s, transform 0.2s",
          }}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  const [headerRef, headerVisible] = useInView(0.1);
  const [cardsRef, cardsVisible]   = useInView(0.05);
  const [formRef, formVisible]     = useInView(0.1);

  const [form, setForm] = useState({ name: "", email: "", phone: "", loanType: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApply = (loanType) => {
    setForm((f) => ({ ...f, loanType }));
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit phone required";
    if (!form.loanType) e.loanType = "Please select a loan type";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmittedData({ ...form });
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", loanType: "" });
    setErrors({});
  };

  const inputStyle = (field) => ({
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
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff" }} >

      {submitted && submittedData && (
        <ThankYou data={submittedData} onClose={handleClose} />
      )}

      {/* ══════════════ HERO HEADER ══════════════ */}
      <section className="w-full relative overflow-hidden py-10" style={{ background: "#111" }}>
        <div className="w-full h-1" style={{ background: "#fbcf4e" }} />

        {/* BG watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span style={{ fontSize: "clamp(100px,20vw,240px)", fontWeight: 900, color: "#fff", opacity: 0.03, letterSpacing: "-8px" }}>
            LOANS
          </span>
        </div>

        <div
          ref={headerRef}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
              Our Services
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ color: "#fff" }}>
            For Every Loan,<br />
            <span style={{ color: "#fbcf4e" }}>One Destination.</span>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "#6b7280" }}>
            TR Financial Services offers a complete suite of loan products tailored for every stage
            of life — personal goals, homeownership, business growth, and beyond.
          </p>

          {/* quick stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[["6", "Loan Products"], ["3%", "Starting Rate"], ["24hr", "Disbursal"], ["₹5 Cr", "Max Limit"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-black" style={{ color: "#fbcf4e" }}>{v}</div>
                <div className="text-[11px] tracking-widest uppercase" style={{ color: "#555" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICE CARDS ══════════════ */}
      <section className="w-full bg-white">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} visible={cardsVisible} onApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ APPLY FORM ══════════════ */}
      <section id="apply-form" className="w-full" style={{ background: "#fafafa" }}>
        <div className="w-full h-px" style={{ background: "#f0f0f0" }} />
        <div
          ref={formRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* LEFT — text */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
                <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
                  Apply Now
                </span>
              </div>
              <h2 className="text-4xl font-black leading-tight mb-5" style={{ color: "#111" }}>
                Start Your
                <br />
                <span style={{ borderBottom: "5px solid #fbcf4e", paddingBottom: "2px", display: "inline-block", lineHeight: 1.3 }}>
                  Application
                </span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                Fill in your details and one of our loan advisors will reach out within 24 hours with a
                personalised offer — no obligation, no hidden charges.
              </p>

              {/* perks */}
              {[
                "Zero processing fee on first application",
                "Dedicated loan advisor assigned to you",
                "Paperless, 100% online process",
                "Approval decision within 60 minutes",
              ].map((p) => (
                <div key={p} className="flex items-start gap-3 mb-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#fbcf4e" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 12 9 17 20 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">{p}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — Form */}
            <div
              className="w-full lg:max-w-xl flex-1 rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.09)", background: "#fff" }}
            >
              <div className="w-full h-1.5" style={{ background: "#fbcf4e" }} />
              <div className="p-8 md:p-10">
                <h3 className="text-lg font-black mb-7" style={{ color: "#111" }}>Loan Application Form</h3>

                <div className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      style={inputStyle("name")}
                      onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? "#ef4444" : "#e5e5e5")}
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priya@email.com"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                      style={inputStyle("email")}
                      onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "#e5e5e5")}
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                      style={inputStyle("phone")}
                      onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                      onBlur={(e) => (e.target.style.borderColor = errors.phone ? "#ef4444" : "#e5e5e5")}
                    />
                    {errors.phone && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.phone}</p>}
                  </div>

                  {/* Loan Type */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase block mb-2" style={{ color: "#999" }}>
                      Loan Type
                    </label>
                    <select
                      value={form.loanType}
                      onChange={(e) => { setForm({ ...form, loanType: e.target.value }); setErrors({ ...errors, loanType: "" }); }}
                      style={{ ...inputStyle("loanType"), cursor: "pointer", appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
                        color: form.loanType ? "#111" : "#aaa",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#fbcf4e")}
                      onBlur={(e) => (e.target.style.borderColor = errors.loanType ? "#ef4444" : "#e5e5e5")}
                    >
                      <option value="" disabled>Select a loan type</option>
                      {loanOptions.map((o) => (
                        <option key={o} value={o} style={{ color: "#111" }}>{o}</option>
                      ))}
                    </select>
                    {errors.loanType && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.loanType}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-95 flex items-center justify-center gap-3 mt-2"
                    style={{
                      background: loading ? "#e5c840" : "#111",
                      color: "#fbcf4e",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Submit Application →</>
                    )}
                  </button>

                  <p className="text-center text-[11px]" style={{ color: "#ccc" }}>
                    🔒 Your information is encrypted and 100% confidential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}