import { useState, useEffect, useRef } from "react";

export default function BlogComingSoon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const countRef = useRef({ days: 0, hours: 0, mins: 0, secs: 0 });

  // ── Countdown (30 days from now) ──
  const [countdown, setCountdown] = useState({ days: 30, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);
    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      setCountdown({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Canvas animation: floating loan icons ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const YELLOW = "#fbcf4e";
    const DARK   = "#111111";

    // Particle types: coin, house, chart, percent, rupee
    const icons = ["₹", "%", "⌂", "↗", "✦", "◈", "⊕"];

    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.3 - Math.random() * 0.5,
      size: 12 + Math.random() * 20,
      opacity: 0.06 + Math.random() * 0.12,
      icon: icons[i % icons.length],
      color: i % 3 === 0 ? YELLOW : DARK,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `bold ${p.size}px 'Segoe UI', sans-serif`;
        ctx.fillStyle = p.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.icon, 0, 0);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y < -30) { p.y = canvas.height + 30; p.x = Math.random() * canvas.width; }
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");
    setSubscribed(true);
  };

  const topics = [
    { icon: "🏠", label: "Home Buying Tips" },
    { icon: "📈", label: "Credit Score Hacks" },
    { icon: "💼", label: "Business Finance" },
    { icon: "🎓", label: "Education Funding" },
    { icon: "🚗", label: "Auto Loan Guide" },
    { icon: "💡", label: "EMI Planning" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#fff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section
        className="relative w-full"
        style={{ background: "#111", minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Yellow top bar */}
        <div className="w-full h-1.5" style={{ background: "#fbcf4e" }} />

        {/* Animated canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20"
          style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }}
        >
          {/* Brand pill */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10"
            style={{ background: "rgba(251,207,78,0.12)", border: "1px solid rgba(251,207,78,0.25)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#fbcf4e", animation: "pulse 1.5s ease-in-out infinite" }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
              TR Financial · Blog
            </span>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.4)}}`}</style>
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.0] mb-6"
            style={{
              color: "#fff",
              fontSize: "clamp(40px, 8vw, 88px)",
              letterSpacing: "-2px",
            }}
          >
            Smart Money
            <br />
            <span style={{ color: "#fbcf4e" }}>Insights</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>Coming Soon.</span>
          </h1>

          <p className="text-base leading-relaxed mb-12 max-w-lg" style={{ color: "#6b7280" }}>
            We're crafting expert articles on home loans, credit scores, EMI planning, and everything
            you need to make smarter financial decisions. Be the first to read.
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-4 sm:gap-8 mb-12 flex-wrap justify-center">
            {[
              { val: countdown.days,  label: "Days" },
              { val: countdown.hours, label: "Hours" },
              { val: countdown.mins,  label: "Minutes" },
              { val: countdown.secs,  label: "Seconds" },
            ].map((c, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl mb-1.5"
                  style={{
                    background: "rgba(251,207,78,0.1)",
                    border: "1px solid rgba(251,207,78,0.2)",
                    color: "#fbcf4e",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(c.val).padStart(2, "0")}
                </div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: "#555" }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Email subscribe */}
          {subscribed ? (
            <div
              className="flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{
                background: "rgba(251,207,78,0.12)",
                border: "1px solid rgba(251,207,78,0.3)",
                animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}`}</style>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#fbcf4e" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 12 9 17 20 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-black" style={{ color: "#fbcf4e" }}>You're on the list!</p>
                <p className="text-xs" style={{ color: "#6b7280" }}>We'll notify you the moment we go live.</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      border: `1.5px solid ${emailError ? "#ef4444" : "rgba(255,255,255,0.12)"}`,
                      background: "rgba(255,255,255,0.07)",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      fontFamily: "'Segoe UI', sans-serif",
                    }}
                  />
                  {emailError && (
                    <p className="text-xs mt-1.5 text-left" style={{ color: "#ef4444" }}>{emailError}</p>
                  )}
                </div>
                <button
                  onClick={handleSubscribe}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                  style={{ background: "#fbcf4e", color: "#111" }}
                >
                  Notify Me →
                </button>
              </div>
              <p className="text-[11px] mt-3" style={{ color: "#444" }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ TOPICS PREVIEW ══════════════ */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-20">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[3px] w-8 rounded-full" style={{ background: "#fbcf4e" }} />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#fbcf4e" }}>
                What's Coming
              </span>
              <div className="h-[3px] w-8 rounded-full" style={{ background: "#fbcf4e" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#111" }}>
              Topics We're{" "}
              <span style={{ borderBottom: "4px solid #fbcf4e", paddingBottom: "1px" }}>Writing About</span>
            </h2>
          </div>

          {/* Topic pills grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
            {topics.map((t, i) => (
              <TopicCard key={i} topic={t} index={i} />
            ))}
          </div>

          {/* Ghost article previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: "Home Loans", title: "How to Improve Your Home Loan Eligibility in 2025", mins: "6 min read" },
              { tag: "Credit",     title: "7 Habits That Are Silently Killing Your CIBIL Score", mins: "5 min read" },
              { tag: "Business",   title: "MSME Loans Explained: Which One Is Right for You?",  mins: "8 min read" },
            ].map((a, i) => (
              <GhostCard key={i} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section style={{ background: "#111" }}>
        <div className="w-full h-px" style={{ background: "#1f1f1f" }} />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-black mb-1" style={{ color: "#fbcf4e" }}>TR Financial Services</p>
            <p className="text-xs" style={{ color: "#444" }}>
              © {new Date().getFullYear()} All rights reserved. Blog launching soon.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black tracking-wide transition-all duration-200 hover:opacity-90"
            style={{ background: "#fbcf4e", color: "#111" }}
          >
            Explore Our Loans →
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Topic Card with hover ── */
function TopicCard({ topic, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-5 flex items-center gap-4 cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? "#fbcf4e" : "#efefef",
        background: hovered ? "#fffbea" : "#fff",
        boxShadow: hovered ? "0 8px 30px rgba(251,207,78,0.15)" : "none",
        transform: hovered ? "translateY(-3px)" : "none",
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <span style={{ fontSize: "24px", lineHeight: 1 }}>{topic.icon}</span>
      <span className="text-sm font-black" style={{ color: "#111" }}>{topic.label}</span>
      <span
        className="ml-auto text-base font-black transition-all duration-300"
        style={{ color: hovered ? "#fbcf4e" : "#e5e5e5" }}
      >
        →
      </span>
    </div>
  );
}

/* ── Ghost (skeleton) article card ── */
function GhostCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border overflow-hidden cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? "#fbcf4e" : "#efefef",
        boxShadow: hovered ? "0 12px 40px rgba(251,207,78,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* Skeleton image with shimmer */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: "160px", background: "#f5f5f5" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(251,207,78,0.2) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: `shimmer 2s ease-in-out ${index * 0.3}s infinite`,
          }}
        />
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        {/* Coming soon badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
          style={{ background: "#fbcf4e", color: "#111" }}
        >
          Coming Soon
        </div>
        {/* Tag */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black"
          style={{ background: "#111", color: "#fbcf4e" }}
        >
          {article.tag}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-black leading-snug mb-3" style={{ color: "#111" }}>
          {article.title}
        </h3>

        {/* skeleton lines */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="h-2.5 rounded-full" style={{ background: "#f0f0f0", width: "90%" }} />
          <div className="h-2.5 rounded-full" style={{ background: "#f0f0f0", width: "70%" }} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "#ccc" }}>{article.mins}</span>
          <span
            className="text-[11px] font-black transition-colors duration-200"
            style={{ color: hovered ? "#fbcf4e" : "#ccc" }}
          >
            Notify Me →
          </span>
        </div>
      </div>
    </div>
  );
}