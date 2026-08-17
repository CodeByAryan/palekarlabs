import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

const services = [
  { number: "01", icon: "◈", title: "Business Website", text: "A fast, professional website that brings your business online — built to get you found and get you enquiries.", price: "₹8,000", features: ["Mobile-friendly design", "Contact form → straight to your WhatsApp", "Google Maps & location integration", "Basic SEO so people find you on Google", "Live in 5–7 days"] },
  { number: "02", icon: "◷", title: "Website + Booking System", text: "Everything in a business website, plus a booking or slot-management system so customers can check availability and book — without messaging you back and forth.", price: "₹15,000", featured: true, features: ["Everything in Business Website", "Slot/appointment booking built in", "Real-time availability", "WhatsApp-linked booking confirmations", "Live in 10–14 days"] },
  { number: "03", icon: "▦", title: "Custom Business Management System", text: "A full admin dashboard built for how your business runs — manage customers, records, payments, and reports from one place.", price: "₹25,000", features: ["Custom admin login & dashboard", "Manage residents/patients/students/inventory", "Role-based access for your team", "Reports & PDF export", "Delivered in 2–4 weeks"] },
];

const projects = [
  { number: "01", title: "Meditiya Sathi", category: "Community platform", text: "A digital platform designed to connect and serve a local community with clarity and care.", tone: "blue", tags: ["Product design", "Web development"] },
  { number: "02", title: "Digital Solutions", category: "Web experience", text: "Professional digital experiences focused on simplicity, performance and usability.", tone: "dark", tags: ["Strategy", "Responsive web"] },
];

const process = [
  ["01", "Discuss", "We understand your business, users and goals before making recommendations."],
  ["02", "Plan", "We shape the scope, features, architecture and delivery plan together."],
  ["03", "Design", "We create a clear visual system and user experience that feels like you."],
  ["04", "Develop", "We build the responsive, maintainable product with care and transparency."],
  ["05", "Test", "We check real devices, flows, accessibility and performance before launch."],
  ["06", "Deploy", "We launch confidently and stay available for ongoing improvements."],
];

const solutions = ["Business management", "School management", "Residential management", "Inventory management", "Employee management", "Booking management", "Event management", "Customer management", "Custom admin dashboards"];

const WHATSAPP_URL = `https://wa.me/918928221297?text=${encodeURIComponent("Hi Palekar Labs, I'm interested in your services. I'd like to discuss my project.")}`;
const INSTAGRAM_URL = "https://www.instagram.com/palekarlabs/";

const WhatsAppIcon = () => (
 <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

const InstagramIcon = () => (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeService, setActiveService] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("palekarlabs-theme") as "light" | "dark" | null;
    const preferredTheme = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("palekarlabs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const selectService = (index: number) => {
    setActiveService(index);
    servicesRef.current?.children[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const openWhatsApp = (service: (typeof services)[number]) => {
    const message = `Hi Palekar Labs, I'm interested in your ${service.title} package starting at ${service.price}. I'd like to discuss my requirements.`;
    window.open(`https://wa.me/918928221297?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setFormError(""); setSubmitted(false);
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries());
    const message = `Hi Palekar Labs, I'd like to inquire about a project.\n\nName: ${data.name}\nCompany: ${data.businessName || "-"}\nEmail: ${data.email || "-"}\nPhone: ${data.phone || "-"}\nService: ${data.service || "-"}\nBudget: ${data.budget || "-"}\n\nProject details:\n${data.message}`;
    window.open(`https://wa.me/918928221297?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    try {
      await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.name, businessName: data.businessName, email: data.email, phone: data.phone, message: `${data.service ? `Service: ${data.service}\n` : ""}${data.budget ? `Budget: ${data.budget}\n` : ""}${data.message}` }) });
    } catch { /* WhatsApp is the primary channel; backend save is best-effort */ }
    setSubmitted(true); form.reset();
  };

  return <div className="app">
    <header className="navbar"><button className="brand" onClick={() => scrollTo("home")}><img src="/logo.png" alt="PalekarLabs logo" /><span>Palekar<span>Labs</span></span></button><nav className="desktop-nav"><button onClick={() => scrollTo("services")}>Services</button><button onClick={() => scrollTo("solutions")}>Solutions</button><button onClick={() => scrollTo("work")}>Work</button><button onClick={() => scrollTo("about")}>About</button></nav><div className="nav-actions"><a className="social-icon" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Palekar Labs on WhatsApp"><WhatsAppIcon /></a><a className="social-icon" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Follow Palekar Labs on Instagram"><InstagramIcon /></a><button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? "☀️" : "🌙"}</button><button className="nav-cta" onClick={() => scrollTo("contact")}>Get started <b>↗</b></button></div><button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button></header>
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>{["services", "solutions", "work", "about", "contact"].map((item, index) => <button key={item} onClick={() => scrollTo(item)}><span>0{index + 1}</span>{item}<b>↗</b></button>)}<div className="mobile-social"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Palekar Labs on WhatsApp"><WhatsAppIcon /><span>WhatsApp</span></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Follow Palekar Labs on Instagram"><InstagramIcon /><span>Instagram</span></a></div></div>

    <main id="home">
      <section className="hero"><div className="hero-grid"><div className="hero-copy reveal"><div className="eyebrow"><i /> DIGITAL PRODUCTS FOR AMBITIOUS BUSINESSES</div><h1>We build <em>websites</em> & digital systems that grow your business.</h1><p>From modern business websites to custom management systems, we design and develop reliable digital solutions tailored to your needs.</p><div className="hero-actions"><button className="button-primary" onClick={() => scrollTo("contact")}>Start your project <span>↗</span></button><button className="button-link" onClick={() => scrollTo("work")}>View our work <span>↓</span></button></div><div className="hero-note"><span className="status-dot" /> Available for select projects <span>·</span> Design / Build / Support</div></div><div className="hero-visual reveal"><div className="visual-grid" /><div className="orb orb-one" /><div className="orb orb-two" /><div className="dashboard"><div className="dash-top"><span>PALEKARLABS / SYSTEM 01</span><span>● LIVE</span></div><div className="dash-main"><div className="dash-brand"><img src="/logo.png" alt="" /><div><strong>Business OS</strong><small>Everything in one place.</small></div></div><div className="dash-chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="dash-cards"><i /><i /><i /></div></div></div><div className="float-card float-one"><b>01</b><span>Strategy</span></div><div className="float-card float-two"><b>↗</b><span>Built to scale</span></div></div></div><div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div></section>

      <section className="intro section reveal"><div className="section-label">/ 01 — THE DIFFERENCE</div><div className="intro-grid"><h2>Technology should make <em>business feel simpler.</em></h2><div><p>We help businesses transform their ideas and workflows into modern digital products — from professional websites to powerful custom systems.</p><p>Every engagement is grounded in clarity, thoughtful design and technology that works hard behind the scenes.</p></div></div></section>

      <section id="services" className="section services"><div className="section-heading reveal"><div className="section-label">/ 02 — CAPABILITIES</div><h2>Everything you need to <em>move forward.</em></h2><p>One focused partner for your next website, platform or business system.</p></div><div className="services-carousel"><div className="services-grid pricing-grid" ref={servicesRef} onScroll={(event) => { const element = event.currentTarget; const index = Math.round(element.scrollLeft / element.clientWidth); if (index !== activeService) setActiveService(index); }}>{services.map((service) => <article className={`service-card pricing-card reveal ${service.featured ? "featured" : ""}`} key={service.number}>{service.featured && <div className="popular-badge">Most popular</div>}<div className="service-head"><span>{service.number}</span><strong>{service.icon}</strong></div><h3>{service.title}</h3><p>{service.text}</p><div className="pricing-price"><small>Starting at</small><strong>{service.price}</strong></div><button className="pricing-cta" onClick={() => openWhatsApp(service)}>Get started <b>↗</b></button><div className="pricing-divider" /><ul className="feature-list">{service.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul></article>)}</div><div className="service-pagination" aria-label="Service packages">{services.map((service, index) => <button key={service.number} className={activeService === index ? "active" : ""} onClick={() => selectService(index)} aria-label={`Show ${service.title}`} />)}</div></div></section>

      <section className="why section"><div className="section-heading reveal"><div className="section-label">/ 03 — WHY PALEKARLABS</div><h2>Built around <em>your reality.</em></h2><p>No off-the-shelf thinking. We make the right solution for the way your business works.</p></div><div className="why-grid">{[["Custom built", "Your requirements lead the product, not the other way around."], ["Modern technology", "Maintainable foundations that are ready for what comes next."], ["Responsive by default", "A considered experience across every screen and device."], ["Secure & reliable", "Good practices, clear communication and dependable support."]].map(([title, text], index) => <article className="why-card reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="solutions" className="solutions section"><div className="section-heading reveal"><div className="section-label">/ 04 — SYSTEMS WE BUILD</div><h2>From daily tasks to <em>big ideas.</em></h2><p>Flexible solutions for the operations that keep your business moving.</p></div><div className="solution-list">{solutions.map((solution, index) => <div className="solution-item reveal" key={solution}><span>0{index + 1}</span><strong>{solution}</strong><b>↗</b></div>)}</div></section>

      <section id="work" className="work"><div className="section work-inner"><div className="section-heading reveal"><div className="section-label">/ 05 — SELECTED WORK</div><h2>Made with <em>purpose.</em></h2><p>Real digital work focused on people, problems and meaningful experiences.</p></div><div className="projects">{projects.map((project) => <article className="project reveal" key={project.number}><div className={`project-visual ${project.tone}`}><div className="window"><div className="window-bar"><i /><i /><i /><span>{project.category}</span></div><div className="window-body"><img src="/logo.png" alt="" /><h4>{project.title}</h4><div className="fake-line long" /><div className="fake-line" /><div className="fake-blocks"><i /><i /><i /></div></div></div></div><div className="project-info"><div><span>{project.number} / {project.category}</span><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div><button onClick={() => scrollTo("contact")}>Discuss a similar project ↗</button></div></article>)}</div></div></section>

      <section id="process" className="section process"><div className="section-heading reveal"><div className="section-label">/ 06 — HOW WE WORK</div><h2>A clear path from <em>idea to impact.</em></h2><p>Simple, intentional and collaborative from the first conversation to launch day.</p></div><div className="process-grid">{process.map(([number, title, text]) => <article className="process-item reveal" key={number}><span>{number}</span><div className="process-line" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="about" className="section about"><div className="about-box"><div className="about-art reveal"><div className="about-ring" /><img src="/logo.png" alt="PalekarLabs" /></div><div className="about-copy reveal"><div className="section-label">/ 07 — ABOUT PALEKARLABS</div><h2>A technology partner for <em>what's next.</em></h2><p>PalekarLabs helps businesses move their operations online with professional websites, useful interfaces and custom systems built around real needs.</p><p>We care about the details — from the first conversation to the final deployment and the support that follows.</p><button className="button-primary" onClick={() => scrollTo("contact")}>Work with us <span>↗</span></button></div></div></section>

      <section id="contact" className="section contact"><div className="contact-heading reveal"><div className="section-label">/ 08 — START A CONVERSATION</div><h2>Have a project in mind? <em>Let's build it.</em></h2><p>Tell us what you are working on. We will get back to you with thoughtful next steps.</p><div className="direct-contact"><a className="direct-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Palekar Labs on WhatsApp"><WhatsAppIcon /><span>Chat on WhatsApp</span></a><a className="direct-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Follow Palekar Labs on Instagram"><InstagramIcon /><span>Instagram @palekarlabs</span></a></div></div><form className="contact-form reveal" onSubmit={submitInquiry}><label>Name<input name="name" required minLength={2} placeholder="Your name" /></label><label>Company / business<input name="businessName" placeholder="Optional" /></label><label>Email<input name="email" type="email" placeholder="you@company.com" /></label><label>Phone<input name="phone" placeholder="Optional" /></label><label>Service required<select name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label>Budget range<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under $2,000</option><option>$2,000 – $5,000</option><option>$5,000+</option><option>Let's discuss</option></select></label><label className="full">Project description<textarea name="message" required minLength={10} placeholder="What would you like to build?"></textarea></label><div className="form-submit full"><button className="button-primary" type="submit">Send inquiry <span>↗</span></button>{submitted && <strong className="success">Thanks — your inquiry is on its way to our WhatsApp.</strong>}{formError && <strong className="error">{formError}</strong>}</div></form></section>
    </main>
    <footer className="footer"><div className="footer-brand"><img src="/logo.png" alt="PalekarLabs logo" /><div><strong>Palekar<span>Labs</span></strong><small>Websites & digital systems for real businesses.</small></div></div><div className="footer-links"><button onClick={() => scrollTo("services")}>Services</button><button onClick={() => scrollTo("work")}>Work</button><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("contact")}>Contact</button></div><div className="footer-social"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Palekar Labs on WhatsApp"><WhatsAppIcon /><span>WhatsApp</span></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Follow Palekar Labs on Instagram"><InstagramIcon /><span>Instagram @palekarlabs</span></a></div><span>© {new Date().getFullYear()} PalekarLabs</span></footer>
  </div>;
}

export default App;
