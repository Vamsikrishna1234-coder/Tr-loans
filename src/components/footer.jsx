import React, { useState } from "react";
import tactLogo from "../assets/images/tact favicon.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contacts", href: "#" },
];

const services = [
  "Personal Loans",
  "Business Loans",
  "Home Equity Loans",
  "Vehicle Loans",
  "Education Loans",
];

const contacts = [
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    text: "+91 9100 110 113",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    text: "trfinancial@gmail.com",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "11-73, Om Vihar Colony, Medipally, Hyderabad, Telangana 500098",
  },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/189cJS4yCG/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/TRFinServices",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.6 1.64.9a4.52 4.52 0 0 0-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 0 1-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.54 4.54 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.07 9.07 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "http://linkedin.com/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/trfinservices/",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

function FooterLink({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 text-sm transition-colors duration-200"
      style={{ color: hovered ? "#fbcf4e" : "#ffffff", textDecoration: "none" }}
    >
      <span
        style={{
          display: "inline-block",
          width: hovered ? "16px" : "8px",
          height: "1.5px",
          background: "#fbcf4e",
          transition: "width 0.25s ease",
          flexShrink: 0,
        }}
      />
      {children}
    </a>
  );
}

function SocialIcon({ href, label, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        background: hovered ? "#fbcf4e" : "#fbc44e",
        color: "#ffffff",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

function ApplyModal({ open, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    loanType: "",
    amount: "",
    city: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({
      fullName: "",
      phone: "",
      email: "",
      loanType: "",
      amount: "",
      city: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <div className="px-6 sm:px-8 py-6" style={{ background: "#fbcf4e" }}>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#111" }}>
            Apply in 2 Minutes
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#333" }}>
            Fill in your details and our team will contact you shortly.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-green-600">Application Submitted!</h3>
              <p className="mt-3 text-gray-600">
                Thanks for applying. Our team will get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 rounded-lg font-semibold"
                style={{ background: "#111", color: "#fff" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400 sm:col-span-1"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400 sm:col-span-2"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400 sm:col-span-1"
                required
              />
              <select
                name="loanType"
                value={form.loanType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400 sm:col-span-1"
                required
              >
                <option value="">Select Loan Type</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Home Equity Loan">Home Equity Loan</option>
                <option value="Vehicle Loan">Vehicle Loan</option>
                <option value="Education Loan">Education Loan</option>
              </select>
              

              <button
                type="submit"
                className="sm:col-span-2 mt-2 w-full rounded-lg px-4 py-3 font-black tracking-wide transition hover:opacity-90"
                style={{ background: "#fbcf4e", color: "#111" }}
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <footer style={{ background: "#111", fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ background: "#fbcf4e" }} className="w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-9 h-9 rounded-full border-[2.5px] flex items-center justify-center flex-shrink-0"
                style={{ borderColor: "#111" }}
              >
                <svg viewBox="0 0 36 36" width="20" height="20" fill="none">
                  <path
                    d="M18 6C10 6 6 12 6 18C6 24 10 30 18 30"
                    stroke="#111"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 6C26 6 30 12 30 18"
                    stroke="#111"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="18" cy="18" r="3.5" fill="#111" />
                  <path d="M22 22L28 28" stroke="#111" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <p className="font-black text-base tracking-wider" style={{ color: "#111" }}>
                  TR FinancialServices
                </p>
                <p className="text-[10px] tracking-widest font-semibold" style={{ color: "#555" }}>
                  EASY LOAN MONEY COMPANY
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold text-center sm:text-right" style={{ color: "#111" }}>
              Ready to fund your dreams?{" "}
              <button
                onClick={() => setShowApplyForm(true)}
                className="no-underline font-black"
                style={{ color: "#111", background: "transparent", border: "none", cursor: "pointer" }}
              >
                Apply in 2 minutes →
              </button>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <p
                className="text-xs font-black tracking-[0.25em] uppercase mb-4"
                style={{ color: "#fbcf4e" }}
              >
                About Us
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#ffffff" }}>
                TR FinancialServices is a trusted lending partner helping individuals and small
                businesses get fast, fair financing with no hidden fees and industry-low rates.
              </p>

              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <SocialIcon key={s.label} href={s.href} label={s.label}>
                    {s.icon}
                  </SocialIcon>
                ))}
              </div>
            </div>

            <div>
              <p
                className="text-xs font-black tracking-[0.25em] uppercase mb-6"
                style={{ color: "#fbcf4e" }}
              >
                Quick Links
              </p>
              <ul className="flex flex-col gap-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-xs font-black tracking-[0.25em] uppercase mb-6"
                style={{ color: "#fbcf4e" }}
              >
                Our Services
              </p>
              <ul className="flex flex-col gap-3">
                {services.map((s) => (
                  <li key={s}>
                    <FooterLink href="#">{s}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-xs font-black tracking-[0.25em] uppercase mb-6"
                style={{ color: "#fbcf4e" }}
              >
                Find us
              </p>

              <ul className="flex flex-col gap-3">
                {contacts.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: "#fbcf4e", marginTop: "2px", flexShrink: 0 }}>
                      {c.icon}
                    </span>
                    <span className="text-sm" style={{ color: "#ffffff" }}>
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 mb-6 relative">
            <div className="w-full h-px" style={{ background: "#222" }} />
            <div
              className="absolute left-0 top-0 h-px w-full"
              style={{ background: "#fbcf4e" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  <p className="text-xs text-center sm:text-left" style={{ color: "#ffffff" }}>
    © {new Date().getFullYear()} TR FinancialServices. All rights reserved.
  </p>

  <div className="flex flex-wrap items-center justify-center gap-5">
    

    <a
      href="https://tactadvertising.in"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs transition-opacity duration-200 hover:opacity-80"
      style={{ color: "#ffffff", textDecoration: "none" }}
    >
      <span>Designed by</span>
      <img
        src={tactLogo}
        alt="Tact Advertising Logo"
        className="h-4 w-auto object-contain"
      />
      <span>
        <strong>Tact Advertising</strong>
      </span>
    </a>
  </div>
</div>
        </div>
      </footer>

      <ApplyModal open={showApplyForm} onClose={() => setShowApplyForm(false)} />
    </>
  );
}