import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    location: "Mumbai, MH",
    initials: "PS",
    rating: 5,
    text: "TR Financial made my dream of expanding my boutique a reality. The process was incredibly smooth — I had funds in my account within 24 hours. Their team is professional and always available to help.",
    loan: "Business Loan",
    amount: "₹5,00,000",
    color: "#fbcf4e",
  },
  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    location: "Hyderabad, TS",
    initials: "RM",
    rating: 5,
    text: "I was skeptical about applying for a personal loan online, but TR Financial completely changed my perspective. Transparent terms, zero hidden charges, and a team that actually listens.",
    loan: "Personal Loan",
    amount: "₹2,00,000",
    color: "#111",
  },
  {
    name: "Anjali Reddy",
    role: "Homemaker & Entrepreneur",
    location: "Bengaluru, KA",
    initials: "AR",
    rating: 5,
    text: "Getting a home loan felt intimidating but TR Financial guided me every step of the way. Their interest rates are the best I found after comparing 6 lenders. Truly a trustworthy partner.",
    loan: "Home Loan",
    amount: "₹35,00,000",
    color: "#fbcf4e",
  },
  {
    name: "Vikram Singh",
    role: "Logistics Entrepreneur",
    location: "Delhi, DL",
    initials: "VS",
    rating: 5,
    text: "Needed an auto loan urgently for my delivery fleet. TR Financial processed everything in under 2 hours. The EMI structure is flexible and perfectly tailored to my cash flow.",
    loan: "Auto Loan",
    amount: "₹8,00,000",
    color: "#111",
  },
  {
    name: "Meena Iyer",
    role: "Chartered Accountant",
    location: "Chennai, TN",
    initials: "MI",
    rating: 5,
    text: "As a CA I scrutinize every financial product carefully. TR Financial's offerings are genuinely competitive — low processing fees, fast disbursal, and a support team that knows what they're doing.",
    loan: "Personal Loan",
    amount: "₹3,50,000",
    color: "#fbcf4e",
  },
  {
    name: "Arjun Nair",
    role: "Restaurant Owner",
    location: "Kochi, KL",
    initials: "AN",
    rating: 4,
    text: "Used TR Financial to renovate my restaurant. The business loan application took literally 5 minutes to fill. Approval was same day. I've already referred three of my friends to them.",
    loan: "Business Loan",
    amount: "₹12,00,000",
    color: "#111",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i <= count ? "#fbcf4e" : "#e5e5e5"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color }) {
  const isDark = color === "#111";
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
      style={{
        background: isDark ? "#111" : "#fbcf4e",
        color: isDark ? "#fbcf4e" : "#111",
        letterSpacing: "1px",
      }}
    >
      {initials}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 20c0-5.3 3.2-10 9.6-13.6L15 8.8C11.6 10.8 9.6 13.2 9.2 16H13v10H4V20zm15 0c0-5.3 3.2-10 9.6-13.6L30 8.8c-3.4 2-5.4 4.4-5.8 7.2H28v10H19V20z"
        fill="#fbcf4e" opacity="0.25" />
    </svg>
  );
}

export default function Testimonials() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);

  const total = testimonials.length;

  const goTo = (index, dir = 1) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive((index + total) % total);
      setAnimating(false);
    }, 320);
  };

  const prev = () => goTo(active - 1, -1);
  const next = () => goTo(active + 1, 1);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => goTo(active + 1, 1), 5000);
    return () => clearInterval(autoRef.current);
  }, [active]);

  const t = testimonials[active];

  // Visible grid cards (always show 3 on desktop)
  const visibleIndexes = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ];

  return (
    <section
      className="w-full bg-white overflow-hidden"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Yellow top accent */}
      <div className="w-full h-1" style={{ background: "#fbcf4e" }} />

      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-20"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[3px] w-10 rounded-full" style={{ background: "#fbcf4e" }} />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: "#111" }}>
              Real People,{" "}
              <span
                style={{
                  borderBottom: "5px solid #fbcf4e",
                  paddingBottom: "2px",
                  display: "inline-block",
                  lineHeight: 1.3,
                }}
              >
                Real Stories
              </span>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5"
              style={{ borderColor: "#e5e5e5", color: "#111" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-bold" style={{ color: "#ccc" }}>
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:translate-x-0.5"
              style={{ background: "#fbcf4e", color: "#111", border: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── FEATURED CARD (mobile + tablet) ── */}
        <div className="lg:hidden mb-8">
          <div
            className="rounded-3xl p-8 border relative overflow-hidden"
            style={{
              borderColor: "#f0f0f0",
              boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction * 40}px)`
                : "translateX(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="absolute top-6 right-6 opacity-30">
              <QuoteIcon />
            </div>
            <StarRating count={t.rating} />
            <p className="text-base leading-relaxed my-5" style={{ color: "#444" }}>
              "{t.text}"
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} color={t.color} />
                <div>
                  <p className="font-black text-sm" style={{ color: "#111" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#aaa" }}>{t.role} · {t.location}</p>
                </div>
              </div>
              <div
                className="px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wide"
                style={{ background: "#fff7d6", color: "#111" }}
              >
                {t.loan} · {t.amount}
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP CARDS GRID (3 visible) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
          {visibleIndexes.map((idx, pos) => {
            const card = testimonials[idx];
            const isCenter = pos === 1;
            return (
              <div
                key={idx}
                onClick={() => !isCenter && goTo(idx, pos === 0 ? -1 : 1)}
                className="rounded-3xl p-7 border relative overflow-hidden transition-all duration-400"
                style={{
                  borderColor: isCenter ? "#fbcf4e" : "#f0f0f0",
                  boxShadow: isCenter
                    ? "0 12px 50px rgba(251,207,78,0.2)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                  transform: isCenter ? "translateY(-6px) scale(1.02)" : "scale(0.97)",
                  cursor: isCenter ? "default" : "pointer",
                  opacity: animating ? 0.5 : 1,
                  transition: "all 0.35s ease",
                  background: isCenter ? "#fff" : "#fafafa",
                }}
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-5">
                  <QuoteIcon />
                </div>

                <StarRating count={card.rating} />

                <p
                  className="text-sm leading-relaxed my-5 line-clamp-4"
                  style={{
                    color: isCenter ? "#333" : "#888",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  "{card.text}"
                </p>

                <div
                  className="h-px w-full mb-5"
                  style={{ background: isCenter ? "#f5e87a33" : "#f0f0f0" }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <Avatar initials={card.initials} color={card.color} />
                  <div>
                    <p className="font-black text-sm" style={{ color: "#111" }}>{card.name}</p>
                    <p className="text-[11px]" style={{ color: "#aaa" }}>{card.role}</p>
                    <p className="text-[11px]" style={{ color: "#ccc" }}>{card.location}</p>
                  </div>
                </div>

                <div
                  className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide"
                  style={{ background: isCenter ? "#fff7d6" : "#f5f5f5", color: "#111" }}
                >
                  {card.loan} · {card.amount}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Dot Indicators ── */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                background: i === active ? "#fbcf4e" : "#e5e5e5",
              }}
            />
          ))}
        </div>

        {/* ── Bottom Stats Strip ── */}
        <div
          className="mt-14 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{ background: "#111" }}
        >
          {[
            { value: "12,000+", label: "Happy Customers" },
            { value: "4.9 / 5", label: "Average Rating" },
            { value: "98%",     label: "Would Recommend" },
            { value: "15+",     label: "Years Trusted" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl font-black" style={{ color: "#fbcf4e" }}>{s.value}</div>
              <div className="text-[11px] tracking-widest uppercase mt-1 font-semibold" style={{ color: "#555" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}