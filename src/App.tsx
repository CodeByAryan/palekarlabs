import { useState } from 'react'

type InquiryForm = {
  name: string
  businessName: string
  email: string
  phone: string
  message: string
}

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Get a Mockup', href: '#mockup' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  {
    title: 'Business website',
    price: 'Starting ₹6,000',
    description: 'A fast, professional website for your business.',
    features: ['Mobile-friendly design', 'Clear business information', 'Lead generation pages', 'Fast, low-maintenance setup'],
  },
  {
    title: 'Business management system',
    price: 'Starting ₹15,000',
    description: 'Custom admin dashboards to manage your operations — residents, patients, students, inventory.',
    features: ['Custom workflows', 'Inventory and records', 'Role-based admin dashboards', 'Reports and tracking'],
  },
  {
    title: 'Website + booking/management combo',
    price: 'Starting ₹18,000',
    description: 'A website plus a booking or member-management system built in.',
    features: ['Online booking flows', 'Member access tools', 'Automated reminders', 'Integrated management panel'],
  },
]

const processSteps = ['Understand your business', 'Build a custom solution', 'Launch & support', 'Ongoing maintenance']

const initialForm: InquiryForm = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  message: '',
}

function App() {
  const [form, setForm] = useState<InquiryForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: [] }))
  }

  const openWhatsApp = () => {
    const phoneNumber = '918928221297'
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hi, I'd like to know more about your services")}`
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })
    setFieldErrors({})

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitState({
          type: 'error',
          message: result.message ?? 'Please review your details and try again.',
        })
        setFieldErrors(result.errors ?? {})
        return
      }

      setSubmitState({
        type: 'success',
        message: result.message ?? 'Thanks! Your inquiry has been received.',
      })
      setForm(initialForm)
    } catch (error) {
      console.error(error)
      setSubmitState({
        type: 'error',
        message: 'Unable to submit the form right now. Please send a WhatsApp message instead.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Palekar Labs home">
            <img src="/logo.png" alt="Palekar Labs logo" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="text-lg font-semibold tracking-wide text-white">Palekar Labs</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Build. Innovate. Automate.</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={openWhatsApp}
            className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(96,165,250,0.35)] transition hover:brightness-110"
          >
            Get in touch
          </button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_38%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-200">
                Software & digital solutions
              </div>
              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                We help local businesses run better — with websites and software built around how you actually work.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                From booking systems to custom dashboards, we design practical digital tools that make operations smoother, faster, and easier to manage.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition hover:brightness-110"
                >
                  Start a project
                </a>
                <a
                  href="#mockup"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/10"
                >
                  Get a mockup
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
                <div>
                  <div className="text-2xl font-semibold text-white">₹6k+</div>
                  <div>starter packages</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">Custom</div>
                  <div>built for your workflow</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">Local</div>
                  <div>based in Mumbai/Thane</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-blue-950/30">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#111827] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                      Dashboard
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Operations overview</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-slate-950/60 p-3">
                          <div className="text-slate-400">Residents</div>
                          <div className="mt-1 text-2xl font-semibold text-white">486</div>
                        </div>
                        <div className="rounded-xl bg-slate-950/60 p-3">
                          <div className="text-slate-400">Bookings</div>
                          <div className="mt-1 text-2xl font-semibold text-white">128</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                        <span>Upcoming tasks</span>
                        <span className="text-blue-300">This week</span>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2">
                          <span>Society dues</span>
                          <span className="text-emerald-300">₹24.5k</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2">
                          <span>Clinic slots</span>
                          <span className="text-violet-300">14 booked</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2">
                          <span>Institute fees</span>
                          <span className="text-blue-300">82 pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-200">Services</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Practical digital systems for businesses that want to grow without chaos.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-200">
                    {service.price}
                  </span>
                </div>
                <p className="text-base text-slate-300">{service.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="mockup" className="bg-slate-950/60 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-200">Get a free mockup</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Not sure what you need? Get a free mockup — no obligation.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                Message us about your business, get a free mockup or consultation within 24–48 hours, and decide afterward if you want to move forward.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  'Message us your business type',
                  'We send a free mockup/consultation',
                  'You decide if you want to move forward',
                ].map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-[#101827] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white">
                      0{index + 1}
                    </div>
                    <p className="text-base text-slate-200">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition hover:brightness-110"
                >
                  DM us on WhatsApp
                </button>
                <a
                  href="https://www.instagram.com/palekarlabs/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/10"
                >
                  DM us on Instagram
                </a>
              </div>

              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p>Custom-built for your business — not a template.</p>
                <p>Transparent, upfront pricing.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-200">About</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Built by someone who understands both business reality and software craftsmanship.</h2>
              <p className="mt-6 text-lg text-slate-300">
                Palekar Labs is led by a hands-on builder focused on helping local businesses work smarter. The approach is simple: build custom solutions that fit real-world operations instead of forcing businesses into template-based tools.
              </p>
              <p className="mt-4 text-lg text-slate-300">
                Based in the Mumbai/Thane region, we work directly with clinics, housing societies, coaching institutes, shops, and other local businesses to create systems that are practical, reliable, and easy to use.
              </p>
              <p className="mt-4 text-lg text-slate-300">
                I’ve built real operational tools already, including a full community/society management system with resident management, festival &amp; donation tracking, admin dashboards, and WhatsApp integration.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-200">Process</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">A straightforward way to turn business friction into a working system.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <p className="text-lg font-medium text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-slate-950/70 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-200">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Tell us what you need, and we’ll figure out the simplest way to build it.</h2>

              <div className="mt-8 space-y-4 text-slate-300">
                <button type="button" onClick={openWhatsApp} className="flex w-full items-center justify-between rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-left text-green-200 transition hover:bg-green-500/15">
                  <span>WhatsApp</span>
                  <span className="text-sm">Start a conversation</span>
                </button>
                <a href="mailto:codebyaryan01@gmail.com" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-200 transition hover:bg-white/10">
                  <span>Email</span>
                  <span className="text-sm">codebyaryan01@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/palekarlabs/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-200 transition hover:bg-white/10">
                  <span>Instagram</span>
                  <span className="text-sm">@palekarlabs</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-slate-200 sm:col-span-1">
                  <span className="mb-2 block">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    placeholder="Your name"
                    required
                  />
                  {fieldErrors.name && <span className="mt-2 block text-xs text-red-300">{fieldErrors.name[0]}</span>}
                </label>

                <label className="block text-sm text-slate-200 sm:col-span-1">
                  <span className="mb-2 block">Business name</span>
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    placeholder="Clinic / society / shop"
                  />
                </label>

                <label className="block text-sm text-slate-200 sm:col-span-1">
                  <span className="mb-2 block">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    placeholder="you@example.com"
                  />
                  {fieldErrors.email && <span className="mt-2 block text-xs text-red-300">{fieldErrors.email[0]}</span>}
                </label>

                <label className="block text-sm text-slate-200 sm:col-span-1">
                  <span className="mb-2 block">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    placeholder="+91 98xxx xx123"
                  />
                  {fieldErrors.phone && <span className="mt-2 block text-xs text-red-300">{fieldErrors.phone[0]}</span>}
                </label>

                <label className="block text-sm text-slate-200 sm:col-span-2">
                  <span className="mb-2 block">What you need</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    placeholder="Tell us about your business, current pain points, and what you'd like to improve."
                    required
                  />
                  {fieldErrors.message && <span className="mt-2 block text-xs text-red-300">{fieldErrors.message[0]}</span>}
                </label>
              </div>

              {submitState.type !== 'idle' && (
                <div className={`mt-5 rounded-xl border px-4 py-3 text-sm ${submitState.type === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-red-500/40 bg-red-500/10 text-red-200'}`}>
                  {submitState.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send inquiry'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0a0a0f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Palekar Labs logo" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="font-medium text-white">Palekar Labs</p>
              <p>Build. Innovate. Automate.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href="https://www.instagram.com/palekarlabs/" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            <a href="mailto:codebyaryan01@gmail.com" className="hover:text-white">Email</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <p>© Palekar Labs</p>
        </div>
      </footer>
    </div>
  )
}

export default App
