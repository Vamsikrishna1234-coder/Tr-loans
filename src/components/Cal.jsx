import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
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

function formatINR(num) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num);
}

const loanTypes = [
  { label: "Personal", icon: "👤", minAmt: 10000,   maxAmt: 1000000,  defaultAmt: 200000,  defaultRate: 12, defaultTenure: 24 },
  { label: "Business", icon: "🏢", minAmt: 50000,   maxAmt: 5000000,  defaultAmt: 500000,  defaultRate: 14, defaultTenure: 36 },
  { label: "Home",     icon: "🏠", minAmt: 500000,  maxAmt: 20000000, defaultAmt: 3000000, defaultRate: 8,  defaultTenure: 180 },
  { label: "Vehicle",     icon: "🚗", minAmt: 100000,  maxAmt: 3000000,  defaultAmt: 600000,  defaultRate: 10, defaultTenure: 60 },
];

/* ── Donut Chart ── */
function DonutChart({ principal, interest }) {
  const total = principal + interest;
  const r = 70, cx = 90, cy = 90;
  const circumference = 2 * Math.PI * r;
  const principalRatio = total > 0 ? principal / total : 0.5;
  const principalDash = principalRatio * circumference;
  const interestDash  = circumference - principalDash;
  return (
    <svg viewBox="0 0 180 180" width="180" height="180" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f3f3" strokeWidth="22" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fbcf4e" strokeWidth="22"
        strokeDasharray={`${interestDash} ${principalDash}`} strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#111" strokeWidth="22"
        strokeDasharray={`${principalDash} ${interestDash}`} strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <text x={cx} y={cy - 8}  textAnchor="middle" fontSize="11" fill="#999" fontFamily="Segoe UI, sans-serif">Total</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="13" fontWeight="700" fill="#111" fontFamily="Segoe UI, sans-serif">
        ₹{formatINR(total)}
      </text>
    </svg>
  );
}

/* ── Slider ── */
function Slider({ min, max, value, onChange, step = 1 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full" style={{ paddingTop: "4px" }}>
      <div className="absolute top-1/2 left-0 h-[4px] rounded-full pointer-events-none"
        style={{ width: `${pct}%`, background: "#fbcf4e", transform: "translateY(-50%)", zIndex: 1 }} />
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none outline-none cursor-pointer"
        style={{ height: "4px", borderRadius: "2px", background: "#e5e5e5", position: "relative", zIndex: 2, accentColor: "#fbcf4e" }} />
    </div>
  );
}

/* ── Thank You Modal ── */
function ThankYouModal({ isOpen, onClose, loanType, amount, emi, tenure }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "#fff",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
          animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.85) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes checkDraw {
            from { stroke-dashoffset: 60; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes ringPulse {
            0%   { transform: scale(0.8); opacity: 0; }
            60%  { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes confettiFall {
            0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
          }
        `}</style>

        {/* Yellow top band */}
        <div className="w-full h-2" style={{ background: "#fbcf4e" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-gray-100"
          style={{ color: "#999" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-10">

          {/* Animated checkmark */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "#fff7d6",
                border: "3px solid #fbcf4e",
                animation: "ringPulse 0.5s ease 0.1s both",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="4 12 9 17 20 7"
                  stroke="#111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="60"
                  strokeDashoffset="60"
                  style={{ animation: "checkDraw 0.5s ease 0.3s forwards" }}
                />
              </svg>
            </div>
          </div>

          {/* Confetti dots */}
          <div className="absolute top-16 left-0 w-full pointer-events-none overflow-hidden" style={{ height: "60px" }}>
            {[
              { left: "15%", delay: "0.1s", color: "#fbcf4e" },
              { left: "30%", delay: "0.2s", color: "#111" },
              { left: "50%", delay: "0.05s", color: "#fbcf4e" },
              { left: "65%", delay: "0.15s", color: "#111" },
              { left: "80%", delay: "0.25s", color: "#fbcf4e" },
              { left: "22%", delay: "0.3s",  color: "#ffd000" },
              { left: "72%", delay: "0.08s", color: "#333" },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: c.left, top: "0",
                  background: c.color,
                  animation: `confettiFall 0.8s ease ${c.delay} both`,
                }}
              />
            ))}
          </div>

          {/* Text */}
          <div className="text-center mb-7">
            <h3 className="text-2xl font-black mb-2" style={{ color: "#111" }}>
              Thank You! 🎉
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your{" "}
              <span className="font-bold" style={{ color: "#111" }}>{loanType} Loan</span>{" "}
              application has been received. Our team will contact you within{" "}
              <span className="font-bold" style={{ color: "#111" }}>24 hours.</span>
            </p>
          </div>

          {/* Summary card */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}
          >
            <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: "#ccc" }}>
              Application Summary
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Loan Amount", value: `₹${formatINR(amount)}` },
                { label: "Monthly EMI", value: `₹${formatINR(emi)}` },
                { label: "Tenure",      value: `${tenure} mo` },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-base font-black" style={{ color: "#111" }}>{s.value}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference number */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl mb-6"
            style={{ background: "#fff7d6" }}
          >
            <span className="text-xs font-semibold" style={{ color: "#888" }}>Reference No.</span>
            <span className="text-sm font-black" style={{ color: "#111" }}>
              TRF-{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#111", color: "#fbcf4e" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function LoanCalculator() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [activeType, setActiveType] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const lt = loanTypes[activeType];
  const [amount, setAmount] = useState(lt.defaultAmt);
  const [rate,   setRate]   = useState(lt.defaultRate);
  const [tenure, setTenure] = useState(lt.defaultTenure);

  useEffect(() => {
    const t = loanTypes[activeType];
    setAmount(t.defaultAmt);
    setRate(t.defaultRate);
    setTenure(t.defaultTenure);
  }, [activeType]);

  const monthlyRate   = rate / 12 / 100;
  const emi           = monthlyRate > 0
    ? Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1))
    : Math.round(amount / tenure);
  const totalPayable  = emi * tenure;
  const totalInterest = totalPayable - amount;

  return (
    <>
      <ThankYouModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        loanType={loanTypes[activeType].label}
        amount={amount}
        emi={emi}
        tenure={tenure}
      />

      <section className="w-full bg-white overflow-hidden" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <div
          ref={sectionRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-14"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
              Loan Calculator
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: "#111" }}>
              Plan Your{" "}
              <span style={{ borderBottom: "5px solid #fbcf4e", paddingBottom: "2px", display: "inline-block", lineHeight: 1.3 }}>
                Repayment
              </span>
            </h2>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed md:text-right">
              Estimate your monthly EMI instantly. No sign-up required.
            </p>
          </div>

          {/* Loan Type Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {loanTypes.map((t, i) => (
              <button key={i} onClick={() => setActiveType(i)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 border"
                style={{
                  background: activeType === i ? "#fbcf4e" : "#fff",
                  color: activeType === i ? "#111" : "#888",
                  borderColor: activeType === i ? "#fbcf4e" : "#e5e5e5",
                  transform: activeType === i ? "translateY(-2px)" : "none",
                  boxShadow: activeType === i ? "0 6px 20px rgba(251,207,78,0.3)" : "none",
                }}>
                <span style={{ fontSize: "16px" }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Calculator Card */}
          <div className="rounded-3xl border overflow-hidden"
            style={{ borderColor: "#efefef", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* LEFT — Sliders */}
              <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "#f0f0f0" }}>

                {/* Amount */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-black tracking-widest uppercase" style={{ color: "#999" }}>Loan Amount</label>
                    <div className="px-4 py-1.5 rounded-lg text-sm font-black" style={{ background: "#fff7d6", color: "#111" }}>
                      ₹{formatINR(amount)}
                    </div>
                  </div>
                  <Slider min={lt.minAmt} max={lt.maxAmt} step={lt.minAmt / 10} value={amount} onChange={setAmount} />
                  <div className="flex justify-between mt-2 text-[11px]" style={{ color: "#ccc" }}>
                    <span>₹{formatINR(lt.minAmt)}</span><span>₹{formatINR(lt.maxAmt)}</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-black tracking-widest uppercase" style={{ color: "#999" }}>Interest Rate (p.a.)</label>
                    <div className="px-4 py-1.5 rounded-lg text-sm font-black" style={{ background: "#fff7d6", color: "#111" }}>
                      {rate}%
                    </div>
                  </div>
                  <Slider min={1} max={30} step={0.5} value={rate} onChange={setRate} />
                  <div className="flex justify-between mt-2 text-[11px]" style={{ color: "#ccc" }}>
                    <span>1%</span><span>30%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-black tracking-widest uppercase" style={{ color: "#999" }}>Tenure (Months)</label>
                    <div className="px-4 py-1.5 rounded-lg text-sm font-black" style={{ background: "#fff7d6", color: "#111" }}>
                      {tenure} mo
                    </div>
                  </div>
                  <Slider min={6} max={360} step={6} value={tenure} onChange={setTenure} />
                  <div className="flex justify-between mt-2 text-[11px]" style={{ color: "#ccc" }}>
                    <span>6 mo</span><span>360 mo</span>
                  </div>
                </div>

                {/* Apply CTA */}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 mt-2"
                  style={{ background: "#111", color: "#fbcf4e" }}
                >
                  Apply for This Loan →
                </button>
              </div>

              {/* RIGHT — Results */}
              <div className="p-8 md:p-10 flex flex-col justify-between gap-8" style={{ background: "#fafafa" }}>
                <div>
                  <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#ccc" }}>Monthly EMI</p>
                  <div className="text-5xl md:text-6xl font-black" style={{ color: "#111", letterSpacing: "-2px" }}>
                    ₹{formatINR(emi)}
                  </div>
                  <div className="mt-2 h-[3px] w-16 rounded-full" style={{ background: "#fbcf4e" }} />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <DonutChart principal={amount} interest={totalInterest} />
                  <div className="flex flex-col gap-5 w-full">
                    {[
                      { label: "Principal",      value: amount,        color: "#111" },
                      { label: "Total Interest", value: totalInterest, color: "#fbcf4e" },
                      { label: "Total Payable",  value: totalPayable,  color: "#111", bold: true },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: row.color }} />
                            <span className="text-xs font-semibold" style={{ color: "#888" }}>{row.label}</span>
                          </div>
                          <span className="text-sm" style={{ color: "#111", fontWeight: row.bold ? 900 : 600 }}>
                            ₹{formatINR(row.value)}
                          </span>
                        </div>
                        <div className="mt-1.5 h-[1px] w-full" style={{ background: "#efefef" }} />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed" style={{ color: "#bbb" }}>
                  * Indicative estimate only. Actual EMI may vary based on your credit profile,
                  processing fees, and applicable taxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}