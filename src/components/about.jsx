import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/ploan.png"

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full bg-white overflow-hidden relative py-22"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* Background decorative circles */}
      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-hidden">
        {[
          { size: 160, left: "2%",  bottom: "-60px" },
          { size: 120, left: "14%", bottom: "-40px" },
          { size: 90,  left: "24%", bottom: "-30px" },
          { size: 140, left: "38%", bottom: "-70px" },
          { size: 100, left: "52%", bottom: "-20px" },
          { size: 80,  left: "63%", bottom: "-30px" },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gray-200"
            style={{ width: c.size, height: c.size, left: c.left, bottom: c.bottom, opacity: 0.5 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">

          {/* ── Left Content ── */}
          <div className="flex-1 max-w-xl">
            {/* Tag */}
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "#fbcf4e" }}
            >
              About Company
            </p>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl leading-tight mb-6" style={{ color: "#111" }}>
              <strong className="font-black">Small Business</strong>{" "}
              <span className="font-light">Loans</span>
              <br />
              <span className="font-light">For a Daily Expenses</span>
            </h2>

            {/* Body */}
            <p
              className="text-sm md:text-base text-gray-500 leading-relaxed mb-10"
              style={{ fontFamily: "'Segoe UI', sans-serif" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat
            </p>

            {/* CTA Button */}
            <div className="flex items-stretch w-fit">
             <button
  onClick={() => (window.location.href = "/about")}
  className="px-8 py-4 text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-90"
  style={{ backgroundColor: "#fbcf4e", color: "#111" }}
>
  Discover More
</button>
              <button
                className="w-14 flex items-center justify-center text-lg font-bold transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: "#e6b800", color: "#111" }}
                aria-label="Arrow"
              >
                →
              </button>
            </div>
          </div>

          {/* ── Right Image ── */}
          <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <img
              src={img1}
              loading="lazy"
              alt="Small business owners"
              className="w-full h-auto object-cover"
              style={{ display: "block", minHeight: "480px", backgroundColor: "#f3f3f3" }}
              onError={(e) => {
                // fallback: show a colored placeholder box if image still fails
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.style.background = "#f3f3f3";
                e.currentTarget.parentElement.style.minHeight = "320px";
                e.currentTarget.parentElement.innerHTML =
                  '<div style="width:100%;height:320px;background:#f3f3f3;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:14px;font-family:sans-serif;">Add your image here</div>';
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}