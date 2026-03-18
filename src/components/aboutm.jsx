import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const stats = [
  { value: "12K+", label: "Loans Funded" },
  { value: "98%",  label: "Approval Rate" },
  { value: "3%",   label: "Interest Rate" },
  { value: "15+",  label: "Years Experience" },
];

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trusted & Secure",
    desc: "Your financial data is protected with bank-grade security.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Fast Approvals",
    desc: "Get a decision in minutes, funds in your account same day.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Lowest Rates",
    desc: "Competitive interest rates tailored to your credit profile.",
  },
];

function AnimatedNumber({ value }) {
  const [ref, visible] = useInView(0.5);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!visible) return;
    const num = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[\d]/g, "");
    let current = 0;
    const steps = 40;
    const increment = Math.ceil(num / steps);
    const id = setInterval(() => {
      current += increment;
      if (current >= num) { setDisplay(num + suffix); clearInterval(id); }
      else setDisplay(current + suffix);
    }, 35);
    return () => clearInterval(id);
  }, [visible, value]);

  return <span ref={ref}>{display}</span>;
}

export default function AboutHero() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [pillarsRef, pillarsVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.2);
    const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff" }}>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="w-full bg-white overflow-hidden relative">

        {/* Yellow top bar */}
        <div className="w-full h-1" style={{ background: "#fbcf4e" }} />

        {/* Background large text watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          style={{
            fontSize: "200px",
            fontWeight: 900,
            color: "#f5f5f5",
            lineHeight: 1,
            letterSpacing: "-8px",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          TR
        </div>

        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-14"
        >
          {/* ── LEFT TEXT ── */}
          <div
            className="flex-1 max-w-2xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Tag */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
              <span
                className="text-[11px] font-black tracking-[0.3em] uppercase"
                style={{ color: "#fbcf4e" }}
              >
                About TR Financial
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-6"
              style={{ color: "#111" }}
            >
              Funding Your
              <br />
              <span
                style={{
                  color: "#111",
                  borderBottom: "5px solid #fbcf4e",
                  paddingBottom: "2px",
                  display: "inline-block",
                  lineHeight: 1.2,
                }}
              >
                Future,
              </span>{" "}
              <span style={{ color: "#c8c8c8", fontWeight: 300 }}>Today.</span>
            </h1>

            {/* Body */}
            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-lg">
              TR Financial Services was built on a single belief — everyone deserves access to
              fair, fast, and flexible financing. From personal loans to business funding, we've
              helped over 12,000 clients across India achieve their financial goals since 2009.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => (window.location.href = "/services")}
                className="flex items-center gap-3 px-7 py-3.5 text-sm font-black tracking-wide rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                style={{ background: "#fbcf4e", color: "#111" }}
              >
                Explore Our Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => (window.location.href = "/contacts")}
                className="px-8 py-4 text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: "#fbcf4e", color: "#111" }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* ── RIGHT VISUAL ── */}
          <div
            className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 relative"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Decorative yellow square behind image */}
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-2xl z-0"
              style={{ background: "#fbcf4e", opacity: 0.15 }}
            />
            {/* Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden w-full" style={{ aspectRatio: "4/3" }}>
              <img
                src="../src/assets/images/hloan.png"
                alt="TR Financial Services team"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
                onError={(e) => {
                  e.currentTarget.parentElement.style.background = "#f3f3f3";
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Badge overlay */}
              <div
                className="absolute bottom-5 left-5 px-5 py-3 rounded-xl"
                style={{ background: "#111" }}
              >
                <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#fbcf4e" }}>
                  Est. 2009
                </p>
                <p className="text-white font-black text-sm">TR Financial Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section style={{ background: "#111" }}>
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                opacity: statsVisible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: "#fbcf4e" }}>
                <AnimatedNumber value={s.value} />
              </div>
              <div className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#6b7280" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          3 PILLARS
      ══════════════════════════════════════ */}
      <section className="w-full bg-white">
        <div
          ref={pillarsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
              Why Choose Us
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <PillarCard
                key={i}
                pillar={p}
                index={i}
                visible={pillarsVisible}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function PillarCard({ pillar, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-8 overflow-hidden cursor-default border transition-all duration-300"
      style={{
        background: "#fff",
        borderColor: hovered ? "#fbcf4e" : "#efefef",
        boxShadow: hovered ? "0 12px 40px rgba(251,207,78,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Animated left bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: hovered ? "4px" : "0px",
          height: "100%",
          background: "#fbcf4e",
          transition: "width 0.3s ease",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Number */}
      <span className="text-[11px] font-black tracking-widest mb-4 block" style={{ color: "#fbcf4e" }}>
        0{index + 1}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: hovered ? "#fbcf4e" : "#fff7d6",
          color: hovered ? "#111" : "#b8860b",
          transform: hovered ? "rotate(-5deg) scale(1.1)" : "none",
        }}
      >
        {pillar.icon}
      </div>

      <h3 className="text-base font-black mb-2" style={{ color: "#111" }}>{pillar.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>

      {/* Hover arrow */}
      <div
        className="mt-5 text-lg font-black"
        style={{
          color: "#fbcf4e",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-10px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        →
      </div>
    </div>
  );
}