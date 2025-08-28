import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackgroundGradient from "../components/BackgroundGradient";
import RAGWidgets from "../components/RAGWidgets";

// Hero Text Component
const HeroText: React.FC = () => {
  return (
    <>
      {/* Main Title */}
      <h1
        className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-8"
        style={{ lineHeight: "1.0" }}
      >
        Build Intelligent
        <br />
        <span
          className="font-inherit"
          style={{
            background: "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          RAG widgets
        </span>
        <br />
        Faster
      </h1>

      {/* Description */}
      <p
        className="text-lg lg:text-xl text-gray-400 font-normal mb-12"
        style={{ lineHeight: "1.6" }}
      >
        RAG.CX is a fast,{" "}
        <span className="font-semibold text-white">
          seamless widget generator
        </span>
        <br />
        for building intuitive knowledge retrieval products.
      </p>
    </>
  );
};
// Hero Button Component
const HeroButton: React.FC = () => {
  return (
    <Link
      to="/request-access"
      className="inline-block px-4 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
      style={{
        background: "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
        boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(to right, #5b21b6, #7c3aed, #9333ea)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.3)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(99, 102, 241, 0.3)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.4)";
      }}
    >
      Get Started
    </Link>
  );
};
// Hero Content Component (renamed from HeroSection to avoid conflict)
const HeroContent: React.FC = () => {
  return (
    <div className="flex-1 justify-start px-0 mb-30" id="home">
      <HeroText />
      <HeroButton />
    </div>
  );
};
// Hero Section Component (contains entire hero layout)
const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div
          className="flex items-center justify-center min-h-screen"
          style={{ marginLeft: "25px", marginRight: "25px" }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex flex-col lg:flex-row items-center relative">
              {/* Hero Content - Left Side */}
              <HeroContent />

              {/* RAG Widgets - Right Side */}
              <RAGWidgets />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Features Component
const Features: React.FC = () => {
  const features = [
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Smart Search",
      description:
        "Advanced RAG-powered search that understands context and delivers precise results",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      title: "AI Agents",
      description:
        "Deploy intelligent assistants that can handle complex queries and tasks",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Research Assistant",
      description:
        "Get comprehensive research support with AI-driven insights and analysis",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Support Chat",
      description:
        "Provide instant, intelligent customer support with context-aware responses",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Data Analytics",
      description:
        "Transform your data into interactive, queryable knowledge bases",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Fast Integration",
      description: "Deploy RAG widgets in minutes with our simple embed code",
    },
  ];

  return (
    <section className="pb-30 px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-5xl text-white mb-3">
            Powerful RAG Features
          </h2>
          <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to build intelligent knowledge retrieval systems
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-5 rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-3">
                <div className="w-9 h-9 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover Effect Gradient Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Component
const Pricing: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const monthlyPlans = [
    {
      name: "Starter",
      description: "Perfect for getting started with RAG applications",
      price: "$79",
      period: "/month",
      originalPrice: undefined,
      discount: undefined,
      billedAnnually: undefined,
      features: [
        { text: "Up to 1,000 documents", included: true },
        { text: "Basic search functionality", included: true },
        { text: "Email support", included: true },
        { text: "API access", included: true },
        { text: "Custom widgets", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Priority support", included: false },
        { text: "Custom integrations", included: false },
      ],
      buttonText: "Choose Starter",
      popular: false,
    },
    {
      name: "Professional",
      description: "Advanced features for growing businesses",
      price: "$149",
      period: "/month",
      originalPrice: undefined,
      discount: undefined,
      billedAnnually: undefined,
      features: [
        { text: "Up to 10,000 documents", included: true },
        { text: "Advanced search & filtering", included: true },
        { text: "Priority email support", included: true },
        { text: "Full API access", included: true },
        { text: "Custom widgets", included: true },
        { text: "Basic analytics", included: true },
        { text: "Chat support", included: true },
        { text: "Custom integrations", included: false },
      ],
      buttonText: "Choose Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Complete solution for large-scale operations",
      price: "$199",
      period: "/month",
      originalPrice: undefined,
      discount: undefined,
      billedAnnually: undefined,
      features: [
        { text: "Unlimited documents", included: true },
        { text: "AI-powered search", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Full API & SDK access", included: true },
        { text: "Custom widgets & themes", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom integrations & SSO", included: true },
      ],
      buttonText: "Choose Enterprise",
      popular: false,
    },
  ];

  const annualPlans = [
    {
      name: "Starter",
      description: "Perfect for getting started with RAG applications",
      price: "$49",
      period: "/month",
      originalPrice: "$99/mo",
      discount: "38% off",
      billedAnnually: "Billed annually ($588 total)",
      features: [
        { text: "Up to 1,000 documents", included: true },
        { text: "Basic search functionality", included: true },
        { text: "Email support", included: true },
        { text: "API access", included: true },
        { text: "Custom widgets", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Priority support", included: false },
        { text: "Custom integrations", included: false },
      ],
      buttonText: "Choose Starter",
      popular: false,
    },
    {
      name: "Professional",
      description: "Advanced features for growing businesses",
      price: "$99",
      period: "/month",
      originalPrice: "$199/mo",
      discount: "34% off",
      billedAnnually: "Billed annually ($1188 total)",
      features: [
        { text: "Up to 10,000 documents", included: true },
        { text: "Advanced search & filtering", included: true },
        { text: "Priority email support", included: true },
        { text: "Full API access", included: true },
        { text: "Custom widgets", included: true },
        { text: "Basic analytics", included: true },
        { text: "Chat support", included: true },
        { text: "Custom integrations", included: false },
      ],
      buttonText: "Choose Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Complete solution for large-scale operations",
      price: "$149",
      period: "/month",
      originalPrice: "$249/mo",
      discount: "25% off",
      billedAnnually: "Billed annually ($1788 total)",
      features: [
        { text: "Unlimited documents", included: true },
        { text: "AI-powered search", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Full API & SDK access", included: true },
        { text: "Custom widgets & themes", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom integrations & SSO", included: true },
      ],
      buttonText: "Choose Enterprise",
      popular: false,
    },
  ];

  const currentPlans = isMonthly ? monthlyPlans : annualPlans;

  return (
    <section className="py-14 px-4 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl text-white mb-4">
            Pricing for every stage
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Choose the perfect plan for your RAG applications
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center bg-gray-800 rounded-full p-1 border border-gray-700">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isMonthly
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isMonthly
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                Annual
                {!isMonthly && (
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-full">
                    Save 50%
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-2xl ${
                plan.popular
                  ? "border-purple-500/50 bg-gray-800/60 shadow-lg shadow-purple-500/20"
                  : "border-gray-700/50 bg-gray-800/40 hover:border-gray-600/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-7">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-1 text-base">
                      {plan.period}
                    </span>
                  </div>

                  {/* Annual Plan Discount Info */}
                  {!isMonthly && plan.originalPrice && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through text-sm">
                          {plan.originalPrice}
                        </span>
                        <span className="text-green-400 text-sm font-medium">
                          {plan.discount}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        {plan.billedAnnually}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="mb-7">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <svg
                            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span
                          className={`text-sm leading-relaxed ${
                            feature.included ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 hover:transform hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          VAT may be applicable depending on your location.
        </p>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer
      style={{ backgroundColor: "#030207" }}
      className="py-12 px-4 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div
              className="text-2xl font-bold mb-4"
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
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Build intelligent RAG widgets faster with our seamless widget
              generator for intuitive knowledge retrieval products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 RAG.CX. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#privacy"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section with Background Gradient */}
      <div className="relative bg-gray-900">
        <BackgroundGradient height="100%" />
        <Navbar />
        <div className="pt-20">
          <HeroSection />
        </div>
      </div>

      {/* Features Section - No Background Gradient */}
      <div id="features" style={{ backgroundColor: "#030207" }}>
        <Features />
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        style={{
          background: `linear-gradient(60deg, #301B57 0%, #1A0B3D 2%, #000000 100%)`,
          minHeight: "100vh",
        }}
      >
        <Pricing />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
