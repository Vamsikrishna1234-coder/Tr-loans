import { useState } from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/images/trlogo.png";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "ABOUT US", to: "/about" },
  { label: "SERVICES", to: "/services" },
  { label: "BLOG", to: "/blog" },
  { label: "CONTACTS", to: "/contacts" },
];

export default function QuickCashNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white overflow-x-hidden"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      <div className="flex h-[88px] w-full items-stretch lg:h-[100px]">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center border-r border-gray-100 px-4 sm:px-6 md:px-8 lg:px-16">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={LogoImg}
              alt="Quick Cash Logo"
              className="h-16 w-auto object-contain sm:h-18 md:h-20 lg:h-24"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          {navItems.map((item, i) => (
            <div key={item.label} className="flex items-center">
              <Link
                to={item.to}
                className="group relative flex h-16 items-center px-[25px] text-[13px] font-bold tracking-[0.12em] text-black transition-colors duration-200 hover:text-[#fbcf4e]"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-t-sm bg-[#fbcf4e] transition-all duration-300 group-hover:w-3/5" />
              </Link>
              {i < navItems.length - 1 && (
                <span className="select-none text-sm text-gray-300">/</span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex flex-shrink-0 items-center border-l border-gray-100">
          <div className="flex items-center gap-2 px-7 text-gray-600">
            <svg
              className="h-[14px] w-[14px] flex-shrink-0"
              fill="none"
              stroke="#fbcf4e"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line
                x1="12"
                y1="18"
                x2="12.01"
                y2="18"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="whitespace-nowrap text-[12px] font-semibold tracking-wide">
              +91 9100 110 113
            </span>
          </div>

          <Link
            to="/contacts"
            className="flex h-[100px] items-center gap-2 whitespace-nowrap bg-[#fbcf4e] px-5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-yellow-500"
          >
            <svg
              className="h-[18px] w-[18px] flex-shrink-0"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l2.5 2.5" />
            </svg>
            Request Funding
          </Link>
        </div>

        {/* Hamburger for mobile + tablet only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto flex items-center px-4 text-gray-700 focus:outline-none sm:px-5 lg:hidden"
          aria-label="Toggle menu"
          type="button"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile + Tablet Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-md lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-gray-100 px-6 py-4 text-[12px] font-bold tracking-[0.12em] text-gray-700 transition-colors hover:bg-yellow-50 hover:text-[#fbcf4e]"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4 text-gray-600">
            <svg
              className="h-[13px] w-[13px]"
              fill="none"
              stroke="#fbcf4e"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line
                x1="12"
                y1="18"
                x2="12.01"
                y2="18"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[12px] font-semibold">+91 9100 110 113</span>
          </div>

          <div className="p-4">
            <Link
              to="/contacts"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded bg-[#fbcf4e] py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-yellow-500"
            >
              Request Funding
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}