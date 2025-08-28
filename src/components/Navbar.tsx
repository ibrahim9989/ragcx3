import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
      style={{ marginLeft: "25px", marginRight: "25px" }}
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div
            className="text-3xl font-bold"
            style={{
              background:
                "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            RAG.CX
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#careers"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Careers
            </a>

            {/* Request Access Button */}
            <Link
              to="/request-access"
              className="text-white px-3 py-2 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 inline-block"
              style={{
                background:
                  "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #5b21b6, #7c3aed, #9333ea)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.3)";
              }}
            >
              Request Access
            </Link>

            {/* Theme Toggle Button */}
            <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white p-2 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-6 py-4 border-t transition-all duration-300 ${
            isScrolled
              ? "bg-black/30 backdrop-blur-md border-white/10"
              : "bg-gray-900/95 backdrop-blur-sm border-gray-700"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Pricing
            </a>
            <a
              href="#careers"
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Careers
            </a>

            {/* Mobile Request Access Button */}
            <Link
              to="/request-access"
              className="text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 mt-4 inline-block"
              style={{
                background:
                  "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #5b21b6, #7c3aed, #9333ea)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.3)";
              }}
              onClick={toggleMobileMenu}
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
