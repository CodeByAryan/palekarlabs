import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import logoImg from "./assets/logo.png";
import "./App.css";

const HERO_PHRASES = [
  "websites",
  "digital systems",
  "business tools",
  "booking systems",
  "automation",
];

const services = [
  {
    number: "01",
    tag: "ESSENTIAL",
    icon: "globe",
    title: "Business Website",
    timeline: "Live in 5–7 days",
    text: "A fast, professional website that brings your business online — built to get you found and get you enquiries.",
    price: "₹8,000",
    features: [
      "Mobile-friendly design",
      "Contact form → straight to your WhatsApp",
      "Google Maps & location integration",
      "Basic SEO so people find you on Google",
      "Live in 5–7 days",
    ],
  },
  {
    number: "02",
    tag: "MOST POPULAR",
    icon: "calendar",
    title: "Website + Booking System",
    timeline: "Live in 10–14 days",
    text: "Everything in a business website, plus a booking or slot-management system so customers can check availability and book — without messaging you back and forth.",
    price: "₹15,000",
    featured: true,
    features: [
      "Everything in Business Website",
      "Slot/appointment booking built in",
      "Real-time availability",
      "WhatsApp-linked booking confirmations",
      "Live in 10–14 days",
    ],
  },
  {
    number: "03",
    tag: "ENTERPRISE",
    icon: "database",
    title: "Custom Business Management System",
    timeline: "Delivered in 2–4 weeks",
    text: "A full admin dashboard built for how your business runs — manage customers, records, payments, and reports from one place.",
    price: "₹25,000",
    features: [
      "Custom admin login & dashboard",
      "Manage residents/patients/students/inventory",
      "Role-based access for your team",
      "Reports & PDF export",
      "Delivered in 2–4 weeks",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Meditiya Sathi",
    category: "Community platform",
    headline: "Connecting local communities through intuitive member directories and real-time announcements.",
    text: "A digital platform designed to connect and serve a local community with clarity and care. Features custom member directories, verified profiles, community notices, and instant WhatsApp alerts.",
    tone: "blue",
    metrics: [
      { label: "Active Members", val: "1,200+" },
      { label: "Daily Enquiries", val: "85+" },
      { label: "System Uptime", val: "99.9%" },
    ],
    tags: ["Product design", "Web development", "Custom database", "WhatsApp alerts"],
  },
  {
    number: "02",
    title: "Digital Solutions",
    category: "Web experience & Business OS",
    headline: "High-performance operational platform that automates bookings and replaces messy spreadsheets.",
    text: "Professional digital experiences focused on simplicity, performance and usability. Built with real-time slot scheduling, client portal, automated WhatsApp reminders, and role-based staff analytics.",
    tone: "dark",
    metrics: [
      { label: "Booking Growth", val: "+148%" },
      { label: "Admin Time Saved", val: "14 hrs/wk" },
      { label: "Page Speed Score", val: "99/100" },
    ],
    tags: ["Strategy", "Responsive web", "Admin dashboard", "Automation"],
  },
];

const processSteps = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understand the business and workflow.",
    description: "We dive deep into how your business operates, mapping user journeys, pain points, and commercial targets before writing a single line of code.",
    accent: "Deep dive & roadmap",
  },
  {
    number: "02",
    phase: "DESIGN",
    title: "Design a solution around the actual requirements.",
    description: "We craft clean, high-conversion visual interfaces and interactive prototypes tailored precisely to your brand and customer psychology.",
    accent: "Custom UI/UX architecture",
  },
  {
    number: "03",
    phase: "BUILD",
    title: "Develop and integrate the complete system.",
    description: "We build clean, robust, and lightning-fast software with database schemas, role access controls, and direct WhatsApp integrations.",
    accent: "Modern engineering & APIs",
  },
  {
    number: "04",
    phase: "LAUNCH",
    title: "Deploy, test, optimize, and support.",
    description: "We test across real devices, optimize SEO and load speed, deploy securely to cloud infrastructure, and provide dedicated support.",
    accent: "Zero-downtime deployment",
  },
];

const solutions = [
  { title: "Business management", desc: "Centralized control for daily workflows, team & revenue." },
  { title: "School management", desc: "Student records, attendance, fee tracking & parent alerts." },
  { title: "Residential management", desc: "Society maintenance, visitor logs, notices & accounts." },
  { title: "Inventory management", desc: "Real-time stock levels, low-stock alerts & barcode tracking." },
  { title: "Employee management", desc: "Shift scheduling, attendance logs & performance metrics." },
  { title: "Booking management", desc: "Interactive slot calendars & automated WhatsApp reminders." },
  { title: "Event management", desc: "Online registrations, ticketing, QR check-ins & attendee lists." },
  { title: "Customer management", desc: "Lead pipeline, client profiles & automated communication." },
  { title: "Custom admin dashboards", desc: "Tailor-made analytics, role-based controls & PDF exports." },
];

const whyPoints = [
  {
    number: "01",
    title: "Custom built",
    text: "Your requirements lead the product, not the other way around. Zero clunky generic templates.",
    badge: "100% Bespoke",
  },
  {
    number: "02",
    title: "Modern technology",
    text: "Maintainable foundations that are ultra-fast, secure, and ready for what comes next.",
    badge: "Future-proof",
  },
  {
    number: "03",
    title: "Responsive by default",
    text: "A considered experience across every screen, mobile viewport, and tablet device.",
    badge: "Pixel-perfect",
  },
  {
    number: "04",
    title: "Secure & reliable",
    text: "Good practices, clear communication, regular updates, and dependable ongoing support.",
    badge: "Direct Founder Access",
  },
];

const WHATSAPP_URL = `https://wa.me/918928221297?text=${encodeURIComponent("Hi Palekar Labs, I'm interested in your services. I'd like to discuss my project.")}`;
const INSTAGRAM_URL = "https://www.instagram.com/palekarlabs/";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function HeroRotatingWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("active");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("exit");
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % HERO_PHRASES.length);
        setPhase("enter");
        requestAnimationFrame(() => {
          setTimeout(() => {
            setPhase("active");
          }, 35);
        });
      }, 320);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hero-roller-container" aria-live="polite">
      <span className={`hero-roller-item ${phase}`}>
        {HERO_PHRASES[index]}
      </span>
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeService, setActiveService] = useState(0);
  const [activeDemoTab, setActiveDemoTab] = useState<"overview" | "bookings" | "admin" | "automation">("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("palekarlabs-theme") as "light" | "dark" | null;
    const preferredTheme = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark");
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("palekarlabs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  const selectService = (index: number) => {
    setActiveService(index);
    if (servicesRef.current) {
      const card = servicesRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const openWhatsApp = (service: (typeof services)[number]) => {
    const message = `Hi Palekar Labs, I'm interested in your ${service.title} package starting at ${service.price}. I'd like to discuss my requirements.`;
    window.open(`https://wa.me/918928221297?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const openWhatsAppGeneral = (context?: string) => {
    const msg = context
      ? `Hi Palekar Labs, I'd like to discuss: ${context}`
      : "Hi Palekar Labs, I'm interested in your services. I'd like to discuss my project.";
    window.open(`https://wa.me/918928221297?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setSubmitted(false);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const message = `Hi Palekar Labs, I'd like to inquire about a project.\n\nName: ${data.name}\nCompany: ${data.businessName || "-"}\nEmail: ${data.email || "-"}\nPhone: ${data.phone || "-"}\nService: ${data.service || "-"}\nBudget: ${data.budget || "-"}\n\nProject details:\n${data.message}`;

    // Immediate WhatsApp link
    window.open(`https://wa.me/918928221297?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          businessName: data.businessName || "",
          email: data.email || "",
          phone: data.phone || "",
          message: `${data.service ? `Service: ${data.service}\n` : ""}${data.budget ? `Budget: ${data.budget}\n` : ""}${data.message}`,
        }),
      });

      if (!res.ok) {
        // WhatsApp was opened, backend is best effort
      }
    } catch {
      // Best-effort backend save
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <div className="app">
      {/* Dynamic Ambient Background Glows */}
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-2" aria-hidden="true" />
      <div className="ambient-grid-overlay" aria-hidden="true" />

      {/* Floating Modern Header */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Palekar Labs">
          <img src={logoImg} alt="Palekar Labs" className="brand-logo-img" />
          <div className="brand-text-wrap">
            <span className="brand-name">Palekar</span>
            <span className="brand-tag">Labs</span>
          </div>
        </button>

        <nav className="desktop-nav" aria-label="Main Navigation">
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("solutions")}>Solutions</button>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
        </nav>

        <div className="nav-actions">
          <a
            className="social-icon"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Palekar Labs on WhatsApp"
            title="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            className="social-icon"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Palekar Labs on Instagram"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="theme-toggle-icon">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
          <button className="nav-cta" onClick={() => scrollTo("contact")}>
            <span>Let's Talk →</span>
          </button>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      <div
        className={`drawer-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Right-Side Slide Drawer */}
      <aside className={`mobile-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen} aria-label="Mobile Navigation">
        <div className="drawer-header">
          <button className="drawer-brand" onClick={() => scrollTo("home")} aria-label="Palekar Labs Home">
            <img src={logoImg} alt="Palekar Labs" className="brand-logo-img" />
            <div className="brand-text-wrap">
              <span className="brand-name">Palekar</span>
              <span className="brand-tag">Labs</span>
            </div>
          </button>
          <button
            className="drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-nav-list">
          {[
            { id: "home", label: "Home" },
            { id: "services", label: "Services" },
            { id: "solutions", label: "Solutions" },
            { id: "work", label: "Work" },
            { id: "about", label: "About" },
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="drawer-nav-link"
              style={{ transitionDelay: `${(index + 1) * 35}ms` }}
            >
              <span>{item.label}</span>
              <span className="drawer-link-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="drawer-divider" />

        <div className="drawer-actions-section">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="drawer-action-row"
            aria-label="Chat on WhatsApp"
          >
            <div className="drawer-icon-box wa">
              <WhatsAppIcon />
            </div>
            <span className="drawer-action-text">WhatsApp</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="drawer-action-row"
            aria-label="Follow on Instagram"
          >
            <div className="drawer-icon-box ig">
              <InstagramIcon />
            </div>
            <span className="drawer-action-text">Instagram</span>
          </a>

          <div className="drawer-theme-row">
            <div className="drawer-theme-info">
              <span className="drawer-icon-box">
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </span>
              <span className="drawer-action-text">Theme ({theme === "dark" ? "Dark" : "Light"})</span>
            </div>
            <button
              className="drawer-theme-switch"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark/light theme"
            >
              {theme === "dark" ? "Switch to Light ☀️" : "Switch to Dark 🌙"}
            </button>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="button-primary full drawer-cta" onClick={() => scrollTo("contact")}>
            <span>Let's Talk</span>
            <ArrowRightIcon />
          </button>
        </div>
      </aside>

      <main id="home">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow reveal">
                <span className="pulse-dot" />
                <span>MUMBAI STUDIO · HIGH-PERFORMANCE DIGITAL PRODUCTS</span>
              </div>

              <h1 className="hero-heading reveal">
                We build <HeroRotatingWord /> &amp; digital systems that grow your business.
              </h1>

              <p className="hero-description reveal">
                From high-converting business websites to custom operational dashboards and automated booking platforms, we engineer tailored digital products built for real commercial growth.
              </p>

              <div className="hero-actions reveal">
                <button className="button-primary hero-btn-main" onClick={() => scrollTo("contact")}>
                  <span>Start your project</span>
                  <ArrowUpRightIcon />
                </button>
                <button className="button-secondary" onClick={() => scrollTo("work")}>
                  <span>Explore selected work</span>
                  <span className="btn-arrow-down">↓</span>
                </button>
                <button className="button-wa-quick" onClick={() => openWhatsAppGeneral("Quick consultation from Hero")}>
                  <WhatsAppIcon />
                  <span>Chat directly</span>
                </button>
              </div>

              <div className="hero-note reveal">
                <span className="status-dot-live" />
                <span className="note-text">
                  <strong>Available for Q2/Q3 projects</strong> · Design / Build / Long-term Support
                </span>
              </div>
            </div>

            {/* HERO VISUAL MOCKUP */}
            <div className="hero-visual reveal">
              <div className="visual-halo" />
              <div className="studio-window">
                <div className="window-header">
                  <div className="traffic-lights">
                    <span className="light light-red" />
                    <span className="light light-yellow" />
                    <span className="light light-green" />
                  </div>
                  <div className="window-title">
                    <span className="title-mono">PALEKAR LABS // CORE ENGINE v2.4</span>
                  </div>
                  <div className="window-status">
                    <span className="live-badge">● LIVE</span>
                    <span className="latency-badge">38ms</span>
                  </div>
                </div>

                <div className="window-tabs">
                  {[
                    { id: "overview", label: "01 Overview" },
                    { id: "bookings", label: "02 Bookings" },
                    { id: "admin", label: "03 Admin OS" },
                    { id: "automation", label: "04 Automations" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`win-tab ${activeDemoTab === tab.id ? "active" : ""}`}
                      onClick={() => setActiveDemoTab(tab.id as typeof activeDemoTab)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="window-content">
                  {activeDemoTab === "overview" && (
                    <div className="tab-view tab-overview">
                      <div className="dash-kpis">
                        <div className="kpi-card">
                          <small>CONVERSION BOOST</small>
                          <strong>+148%</strong>
                          <span className="kpi-tag positive">↑ Verified</span>
                        </div>
                        <div className="kpi-card">
                          <small>SERVER RESPONSE</small>
                          <strong>42ms</strong>
                          <span className="kpi-tag">Global Edge</span>
                        </div>
                        <div className="kpi-card">
                          <small>UPTIME SLA</small>
                          <strong>99.98%</strong>
                          <span className="kpi-tag highlight">Active</span>
                        </div>
                      </div>

                      <div className="chart-container">
                        <div className="chart-header">
                          <span>Real-Time Inquiries &amp; Conversions</span>
                          <span className="chart-live-val">2.4k req/min</span>
                        </div>
                        <div className="mini-sparkline">
                          <svg viewBox="0 0 300 60" className="sparkline-svg" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1677ff" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#1677ff" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path d="M0,45 Q30,40 60,25 T120,30 T180,10 T240,20 T300,5 L300,60 L0,60 Z" fill="url(#chartGlow)" />
                            <path d="M0,45 Q30,40 60,25 T120,30 T180,10 T240,20 T300,5" fill="none" stroke="#1677ff" strokeWidth="2.5" />
                          </svg>
                        </div>
                      </div>

                      <div className="dash-activity-row">
                        <div className="activity-item">
                          <span className="act-dot" />
                          <span>WhatsApp Lead API: Instant routing active</span>
                          <span className="act-time">Just now</span>
                        </div>
                        <div className="activity-item">
                          <span className="act-dot" />
                          <span>Auto-scheduler synced 4 appointments</span>
                          <span className="act-time">2m ago</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === "bookings" && (
                    <div className="tab-view tab-bookings">
                      <div className="booking-mockup-grid">
                        <div className="slot-pill booked">09:00 AM · Reserved</div>
                        <div className="slot-pill available">10:30 AM · Available</div>
                        <div className="slot-pill booked">01:00 PM · Reserved</div>
                        <div className="slot-pill available">03:30 PM · Available</div>
                      </div>
                      <div className="system-msg-box">
                        <WhatsAppIcon />
                        <div>
                          <strong>WhatsApp Confirmation Bot</strong>
                          <p>Instant booking tokens &amp; calendar invites dispatched to customer.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === "admin" && (
                    <div className="tab-view tab-admin">
                      <div className="admin-records-preview">
                        <div className="rec-row header">
                          <span>Record ID</span>
                          <span>Module</span>
                          <span>Role</span>
                          <span>Status</span>
                        </div>
                        <div className="rec-row">
                          <code>#PL-9021</code>
                          <span>Society Maintenance</span>
                          <span>Admin</span>
                          <span className="badge-ok">Paid ✓</span>
                        </div>
                        <div className="rec-row">
                          <code>#PL-9022</code>
                          <span>Student Roster</span>
                          <span>Faculty</span>
                          <span className="badge-ok">Active ✓</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === "automation" && (
                    <div className="tab-view tab-automation">
                      <div className="flow-steps">
                        <div className="flow-step">
                          <span>01</span>
                          <strong>Inquiry Form</strong>
                          <small>Lead Submitted</small>
                        </div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-step active">
                          <span>02</span>
                          <strong>WhatsApp Dispatch</strong>
                          <small>Instant Ping</small>
                        </div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-step">
                          <span>03</span>
                          <strong>CRM Sync</strong>
                          <small>DB Saved</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Accent Badges */}
              <div className="float-pill float-pill-1">
                <span className="float-icon">⚡</span>
                <div className="float-text">
                  <strong>5–7 Days Delivery</strong>
                  <small>For Business Websites</small>
                </div>
              </div>

              <div className="float-pill float-pill-2">
                <span className="float-icon">↗</span>
                <div className="float-text">
                  <strong>100% Bespoke Code</strong>
                  <small>No Clunky Generic Templates</small>
                </div>
              </div>

              <div className="float-pill float-pill-3">
                <span className="float-icon">✓</span>
                <div className="float-text">
                  <strong>Direct WhatsApp CRM</strong>
                  <small>Zero Lost Leads</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-bottom-bar">
            <button className="scroll-indicator" onClick={() => scrollTo("services")}>
              <span>EXPLORE CAPABILITIES</span>
              <span className="scroll-chevron">↓</span>
            </button>
          </div>
        </section>

        {/* MARQUEE 1: IMMEDIATELY BELOW HERO */}
        <section className="marquee-section marquee-top" aria-label="Key Services Ticker">
          <div className="marquee-container">
            <div className="marquee-track">
              {[1, 2, 3, 4].map((repeat) => (
                <div className="marquee-content" key={repeat}>
                  <span>DIGITAL PRODUCTS</span>
                  <span className="marquee-dot">·</span>
                  <span>WEB DEVELOPMENT</span>
                  <span className="marquee-dot">·</span>
                  <span>BUSINESS SYSTEMS</span>
                  <span className="marquee-dot">·</span>
                  <span>BOOKING SYSTEMS</span>
                  <span className="marquee-dot">·</span>
                  <span>AUTOMATION</span>
                  <span className="marquee-dot">·</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO / STUDIO DIFFERENCE */}
        <section className="intro section">
          <div className="intro-container">
            <div className="section-label reveal">/ 01 — THE DIFFERENCE</div>
            <div className="intro-grid">
              <div className="intro-headline reveal">
                <h2>
                  Technology should make <em>business feel simpler.</em>
                </h2>
              </div>
              <div className="intro-body reveal">
                <p>
                  Most businesses struggle with fragile templates or bloated software that requires hours of manual work. We help ambitious companies build custom, high-speed digital tools crafted specifically for their exact workflow.
                </p>
                <p>
                  Every engagement is grounded in engineering clarity, thoughtful visual design, and software that works tirelessly behind the scenes so you can focus on growing your revenue.
                </p>
              </div>
            </div>

            <div className="metrics-strip reveal">
              <div className="metric-box">
                <strong>100%</strong>
                <span>Custom Engineered Code</span>
              </div>
              <div className="metric-box">
                <strong>5–14d</strong>
                <span>Average Turnaround Time</span>
              </div>
              <div className="metric-box">
                <strong>100%</strong>
                <span>Responsive on Every Screen</span>
              </div>
              <div className="metric-box">
                <strong>Direct</strong>
                <span>Founder &amp; Developer Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section services">
          <div className="services-container">
            <div className="section-heading reveal">
              <div className="section-label">/ 02 — CAPABILITIES</div>
              <h2>What We Build</h2>
              <p>
                Websites and digital systems built around how your business actually works — not generic templates.
              </p>
            </div>

            <div className="services-carousel-wrapper">
              <div
                className="services-grid pricing-grid"
                ref={servicesRef}
                onScroll={(event) => {
                  const element = event.currentTarget;
                  const itemWidth = element.scrollWidth / services.length;
                  const index = Math.round(element.scrollLeft / itemWidth);
                  if (index !== activeService && index >= 0 && index < services.length) {
                    setActiveService(index);
                  }
                }}
              >
                {services.map((service, index) => (
                  <article
                    className={`service-card pricing-card reveal reveal-card-${index + 1} ${service.featured ? "featured" : ""}`}
                    key={service.number}
                  >
                    {service.featured && (
                      <div className="popular-badge">
                        <span className="badge-spark">✦</span> MOST POPULAR
                      </div>
                    )}

                    <div className="service-card-top">
                      <div className="service-number-tag">{service.number}</div>
                      <span className="service-tier-tag">{service.tag}</span>
                    </div>

                    <div className="service-header-info">
                      <h3>{service.title}</h3>
                      <div className="timeline-badge">
                        <span className="time-icon">⏱</span> {service.timeline}
                      </div>
                    </div>

                    <p className="service-desc">{service.text}</p>

                    <div className="pricing-price-box">
                      <small>STARTING AT</small>
                      <div className="price-num">
                        <strong>{service.price}</strong>
                        <span className="price-suffix">/ project</span>
                      </div>
                    </div>

                    <button className="pricing-cta" onClick={() => openWhatsApp(service)}>
                      <span>Get started</span>
                      <ArrowUpRightIcon />
                    </button>

                    <div className="pricing-divider" />

                    <div className="feature-list-header">INCLUDES:</div>
                    <ul className="feature-list">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <span className="check-icon-wrap">
                            <CheckIcon />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              {/* Mobile Carousel Pagination */}
              <div className="service-pagination" aria-label="Service packages slider pagination">
                {services.map((service, index) => (
                  <button
                    key={service.number}
                    className={`pagination-dot ${activeService === index ? "active" : ""}`}
                    onClick={() => selectService(index)}
                    aria-label={`Show ${service.title}`}
                  />
                ))}
              </div>
            </div>

            {/* TRUST LINE */}
            <div className="trust-banner reveal">
              <div className="trust-icon-box">
                <ShieldCheckIcon />
              </div>
              <div className="trust-content">
                <p>
                  <strong>Every project is custom-built for your business — not a copy-paste template.</strong> Free consultation before you commit to anything.
                </p>
              </div>
              <button className="trust-cta" onClick={() => openWhatsAppGeneral("Free consultation request")}>
                <span>Claim Free Consultation</span>
                <ArrowUpRightIcon />
              </button>
            </div>
          </div>
        </section>

        {/* WORK / SELECTED PROJECTS */}
        <section id="work" className="section work">
          <div className="work-inner">
            <div className="section-heading reveal">
              <div className="section-label">/ 03 — SELECTED WORK</div>
              <h2>Made with <em>purpose.</em></h2>
              <p>Real digital work focused on people, problems, and meaningful commercial experiences.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project, idx) => (
                <article
                  className={`project-card reveal ${idx % 2 === 1 ? "layout-reversed" : ""}`}
                  key={project.number}
                >
                  <div className={`project-visual-frame ${project.tone}`}>
                    <div className="case-window">
                      <div className="case-window-header">
                        <div className="window-dots">
                          <i />
                          <i />
                          <i />
                        </div>
                        <span className="case-tag-mono">{project.category}</span>
                      </div>

                      <div className="case-window-screen">
                        <div className="case-brand-row">
                          <div className="case-logo-badge">PL</div>
                          <div className="case-title-box">
                            <strong>{project.title}</strong>
                            <small>Live Production System</small>
                          </div>
                        </div>

                        <div className="case-mock-stats">
                          {project.metrics.map((m) => (
                            <div className="mock-stat-pill" key={m.label}>
                              <span className="mock-stat-val">{m.val}</span>
                              <span className="mock-stat-lbl">{m.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="case-preview-lines">
                          <span className="p-line full" />
                          <span className="p-line half" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="project-details">
                    <div className="project-meta-top">
                      <span className="project-index">{project.number}</span>
                      <span className="project-cat-badge">{project.category}</span>
                    </div>

                    <h3 className="project-name">{project.title}</h3>
                    <p className="project-lead">{project.headline}</p>
                    <p className="project-narrative">{project.text}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span className="tag-pill" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-cta-wrap">
                      <button
                        className="button-primary project-cta"
                        onClick={() => openWhatsAppGeneral(`I'm interested in a project similar to ${project.title}`)}
                      >
                        <span>Discuss a similar project</span>
                        <ArrowUpRightIcon />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="section process">
          <div className="process-container">
            <div className="section-heading reveal">
              <div className="section-label">/ 04 — HOW WE WORK</div>
              <h2>A clear path from <em>idea to impact.</em></h2>
              <p>Simple, intentional, and collaborative from the first conversation to launch day.</p>
            </div>

            <div className="process-timeline">
              <div className="process-track-line" aria-hidden="true" />
              <div className="process-steps-grid">
                {processSteps.map((step) => (
                  <article className="process-card reveal" key={step.number}>
                    <div className="step-badge-wrap">
                      <div className="step-circle">{step.number}</div>
                      <span className="step-phase">{step.phase}</span>
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                    <div className="step-accent-tag">
                      <span className="accent-dot" /> {step.accent}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="solutions section">
          <div className="solutions-container">
            <div className="section-heading reveal">
              <div className="section-label">/ 05 — SYSTEMS WE BUILD</div>
              <h2>From daily tasks to <em>big ideas.</em></h2>
              <p>Flexible software solutions for the operations that keep your business moving.</p>
            </div>

            <div className="solutions-grid">
              {solutions.map((item, index) => (
                <div
                  className="solution-card reveal"
                  key={item.title}
                  onClick={() => openWhatsAppGeneral(`Inquiry about ${item.title}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openWhatsAppGeneral(`Inquiry about ${item.title}`)}
                >
                  <div className="sol-top">
                    <span className="sol-index">0{index + 1}</span>
                    <span className="sol-arrow"><ArrowUpRightIcon /></span>
                  </div>
                  <strong className="sol-title">{item.title}</strong>
                  <p className="sol-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PALEKAR LABS */}
        <section className="why section">
          <div className="why-container">
            <div className="section-heading reveal">
              <div className="section-label">/ 06 — WHY PALEKAR LABS</div>
              <h2>Built around <em>your reality.</em></h2>
              <p>No off-the-shelf thinking. We make the right solution for the way your business works.</p>
            </div>

            <div className="why-grid">
              {whyPoints.map((item) => (
                <article className="why-card reveal" key={item.title}>
                  <div className="why-card-header">
                    <span className="why-num">{item.number}</span>
                    <span className="why-badge">{item.badge}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE 2: REVERSE / LOWER WEBSITE */}
        <section className="marquee-section marquee-bottom" aria-label="Brand Mantra Ticker">
          <div className="marquee-container">
            <div className="marquee-track-reverse">
              {[1, 2, 3, 4, 5, 6].map((repeat) => (
                <div className="marquee-content" key={repeat}>
                  <span>BUILD</span>
                  <span className="marquee-dot">·</span>
                  <span>INNOVATE</span>
                  <span className="marquee-dot">·</span>
                  <span>AUTOMATE</span>
                  <span className="marquee-dot">·</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section about">
          <div className="about-container">
            <div className="about-glass-box reveal">
              <div className="about-visual">
                <div className="about-ring-outer" />
                <div className="about-ring-inner" />
                <div className="about-logo-frame">
                  <img src={logoImg} alt="Palekar Labs" className="about-logo-img" />
                </div>
                <div className="studio-location-pill">
                  <span className="loc-dot" /> Mumbai Studio · Serving Worldwide
                </div>
              </div>

              <div className="about-content">
                <div className="section-label">/ 07 — ABOUT PALEKAR LABS</div>
                <h2>A technology partner for <em>what's next.</em></h2>
                <p>
                  Palekar Labs is an independent digital product studio based in Mumbai. We build fast, beautiful websites, mission-critical business management systems, and automated operations tools that eliminate manual friction.
                </p>
                <p>
                  We care intensely about the craftsmanship — from the first wireframe to the final database index, ensuring your digital presence is built to scale and convert.
                </p>

                <div className="about-actions">
                  <button className="button-primary" onClick={() => scrollTo("contact")}>
                    <span>Work with us</span>
                    <ArrowUpRightIcon />
                  </button>
                  <a
                    className="button-secondary wa-inline"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section contact">
          <div className="contact-container">
            <div className="contact-header reveal">
              <div className="section-label">/ 08 — START A CONVERSATION</div>
              <h2>Have a project in mind? <em>Let's build it.</em></h2>
              <p>
                Tell us about your business goals. We will review your requirements and respond with a structured plan within 24 hours.
              </p>

              <div className="direct-contact-group">
                <a
                  className="direct-channel direct-wa"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Palekar Labs on WhatsApp"
                >
                  <div className="channel-icon">
                    <WhatsAppIcon />
                  </div>
                  <div className="channel-info">
                    <small>INSTANT RESPONSE</small>
                    <strong>Chat on WhatsApp</strong>
                  </div>
                  <ArrowUpRightIcon />
                </a>

                <a
                  className="direct-channel direct-ig"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow Palekar Labs on Instagram"
                >
                  <div className="channel-icon">
                    <InstagramIcon />
                  </div>
                  <div className="channel-info">
                    <small>STUDIO UPDATES</small>
                    <strong>Instagram @palekarlabs</strong>
                  </div>
                  <ArrowUpRightIcon />
                </a>
              </div>
            </div>

            {/* INQUIRY FORM */}
            <form className="contact-form reveal" onSubmit={submitInquiry}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name-input">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    id="name-input"
                    name="name"
                    required
                    minLength={2}
                    maxLength={120}
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="biz-input">Company / Business Name</label>
                  <input
                    id="biz-input"
                    name="businessName"
                    maxLength={160}
                    placeholder="e.g. Acme Clinics / Logistics"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email-input">Email Address</label>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone-input">Phone / WhatsApp</label>
                  <input
                    id="phone-input"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service-select">Service Required</label>
                  <select id="service-select" name="service" defaultValue="">
                    <option value="" disabled>Select a capability</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title} ({service.price})
                      </option>
                    ))}
                    <option value="Other Custom Digital Solution">Other Custom Digital Solution</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget-select">Budget Range</label>
                  <select id="budget-select" name="budget" defaultValue="">
                    <option value="" disabled>Select target budget</option>
                    <option value="₹8,000 – ₹15,000">₹8,000 – ₹15,000</option>
                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                    <option value="₹30,000 – ₹60,000">₹30,000 – ₹60,000</option>
                    <option value="₹60,000+">₹60,000+</option>
                    <option value="Let's discuss requirements">Let's discuss requirements</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message-input">
                    Project Description <span className="req">*</span>
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                    placeholder="Tell us what you would like to build, your key goals, and any specific requirements..."
                  />
                </div>

                <div className="form-submit-row full-width">
                  <button
                    className="button-primary submit-btn"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>{submitting ? "Opening WhatsApp..." : "Send Inquiry & Open WhatsApp"}</span>
                    <ArrowUpRightIcon />
                  </button>

                  {submitted && (
                    <div className="form-alert success-alert" role="alert">
                      <CheckIcon />
                      <span>Thanks! Your inquiry is open in WhatsApp and saved to our system.</span>
                    </div>
                  )}

                  {formError && (
                    <div className="form-alert error-alert" role="alert">
                      <span>{formError}</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="footer-brand-header">
                <img src={logoImg} alt="Palekar Labs" className="footer-logo-img" />
                <span className="footer-brand-name">Labs</span>
              </div>
              <div className="footer-brand-text">
                <p className="footer-desc">
                  Digital products &amp; custom software systems engineered for ambitious businesses.
                </p>
                <div className="footer-mantra">
                  <span>BUILD</span>
                  <span className="mantra-dot">·</span>
                  <span>INNOVATE</span>
                  <span className="mantra-dot">·</span>
                  <span>AUTOMATE</span>
                </div>
              </div>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-head">Capabilities</span>
              <button onClick={() => scrollTo("services")}>Business Websites</button>
              <button onClick={() => scrollTo("services")}>Booking Systems</button>
              <button onClick={() => scrollTo("services")}>Custom Dashboards</button>
              <button onClick={() => scrollTo("solutions")}>All 9 Systems</button>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-head">Studio</span>
              <button onClick={() => scrollTo("work")}>Selected Work</button>
              <button onClick={() => scrollTo("process")}>Our Process</button>
              <button onClick={() => scrollTo("about")}>About Palekar Labs</button>
              <button onClick={() => scrollTo("contact")}>Contact &amp; Consult</button>
            </div>

            <div className="footer-social-col">
              <span className="footer-col-head">Connect</span>
              <div className="footer-social-links">
                <a
                  className="footer-soc-btn"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  className="footer-soc-btn"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                  <span>@palekarlabs</span>
                </a>
              </div>
              <div className="footer-location-badge">
                <span className="loc-pulse" />
                <span>Mumbai, MH, India · Available Worldwide</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} Palekar Labs. All rights reserved.
            </div>
            <button className="back-to-top" onClick={() => scrollTo("home")}>
              <span>Back to top</span>
              <span className="top-arrow">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
