import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Github, Linkedin, Mail, Menu, X, ExternalLink } from 'lucide-react'

function useBackendHello() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    const url = `${import.meta.env.VITE_BACKEND_URL || ''}/api/hello`
    fetch(url)
      .then(r => r.ok ? r.json() : null)
      .then(d => setMessage(d?.message || ''))
      .catch(() => setMessage(''))
  }, [])
  return message
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = useMemo(() => ([
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]), [])

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="font-semibold text-lg tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">MyPortfolio</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-sm bg-gray-900 text-white rounded-full px-4 py-2 hover:bg-gray-800 transition-colors">Hire me</a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen((v)=>!v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="py-2 text-gray-800">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={()=>setOpen(false)} className="py-2 text-white bg-gray-900 rounded-lg text-center">Hire me</a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const backendHello = useBackendHello()
  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/70" />
        <div className="max-w-6xl mx-auto px-4 pt-32 md:pt-40 pb-16 md:pb-24 relative">
          <div className="max-w-2xl">
            <p className="text-sm md:text-base text-gray-700 mb-3">{backendHello || '—'}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Hi, I’m <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Your Name</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 leading-relaxed">
              I build modern, fast web apps with delightful interactions. Explore my work, read about me, and let’s create something great together.
            </p>
            <div className="mt-6 md:mt-8 flex items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full hover:bg-gray-800 transition-colors">
                View projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 hover:border-gray-400">
                Contact me
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-gray-900 inline-flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-gray-900 inline-flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 inline-flex items-center gap-2">
                <Mail size={18} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About me</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              I’m a full‑stack developer focused on crafting smooth, responsive experiences. I care about performance, accessibility, and clean design. When I’m not coding, I’m exploring creative tech and playful interactions.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 text-gray-900 font-medium">
                Explore my work <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="rounded-2xl border bg-gray-50 p-6">
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li className="p-4 rounded-xl bg-white shadow-sm border">React / Vite</li>
              <li className="p-4 rounded-xl bg-white shadow-sm border">FastAPI</li>
              <li className="p-4 rounded-xl bg-white shadow-sm border">MongoDB</li>
              <li className="p-4 rounded-xl bg-white shadow-sm border">Tailwind CSS</li>
              <li className="p-4 rounded-xl bg-white shadow-sm border">Framer Motion</li>
              <li className="p-4 rounded-xl bg-white shadow-sm border">Spline 3D</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const items = [
    {
      title: 'Interactive 3D Landing',
      desc: 'A playful hero powered by Spline and smooth UI layers.',
      link: '#',
    },
    {
      title: 'Realtime Dashboard',
      desc: 'Streaming metrics with elegant visualizations and alerts.',
      link: '#',
    },
    {
      title: 'E‑commerce Starter',
      desc: 'Fast storefront with secure checkout and product search.',
      link: '#',
    },
  ]
  return (
    <section id="projects" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured projects</h2>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-gray-900 font-medium">
            See all <ExternalLink size={18} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <a key={i} href={p.link} className="group rounded-2xl border bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="h-36 rounded-xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 group-hover:underline">{p.title}</h3>
              <p className="mt-2 text-gray-700 text-sm">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Let’s work together</h2>
          <p className="mt-3 text-gray-700">Tell me a bit about your project and I’ll get back to you shortly.</p>
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e)=>e.preventDefault()}>
            <input className="border rounded-lg px-4 py-3" placeholder="Your name" required />
            <input type="email" className="border rounded-lg px-4 py-3" placeholder="Email address" required />
            <input className="md:col-span-2 border rounded-lg px-4 py-3" placeholder="Company or website" />
            <textarea className="md:col-span-2 border rounded-lg px-4 py-3 h-32" placeholder="Project details" />
            <div className="md:col-span-2 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full hover:bg-gray-800 transition-colors">
                Send message <ArrowRight size={18} />
              </button>
              <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 hover:border-gray-400">
                Or email me directly <Mail size={18} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="border-t py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://github.com" className="inline-flex items-center gap-2 hover:text-gray-900 text-gray-700"><Github size={16}/> GitHub</a>
            <a href="https://linkedin.com" className="inline-flex items-center gap-2 hover:text-gray-900 text-gray-700"><Linkedin size={16}/> LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
