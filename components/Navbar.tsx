'use client'

import { useEffect, useState } from 'react'

const NAV_SECTIONS = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('hero')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)

      const scrollY = window.scrollY + 120
      const ids = ['hero', ...NAV_SECTIONS]
      let current = 'hero'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on link click
  function scrollTo(id: string) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
    window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' })
  }

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-container">
          {/* Brand */}
          <a href="#hero" className="nav-brand" onClick={e => { e.preventDefault(); scrollTo('hero') }} aria-label="Home">
            <span className="brand-initials">M<span className="accent">U</span></span>
            <span className="brand-name">Muhammad Usman Al Haq</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_SECTIONS.map(id => (
              <li key={id}>
                <button
                  className={`nav-link${active === id ? ' active' : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-current={active === id ? 'page' : undefined}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/Muhammad_Usman_AlHaq_Resume.pdf"
                download
                className="btn btn-ghost btn-sm"
                id="nav-resume-btn"
              >
                Resume <span className="btn-icon">↓</span>
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-nav-links">
          {NAV_SECTIONS.map(id => (
            <li key={id}>
              <button className="mobile-nav-link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/Muhammad_Usman_AlHaq_Resume.pdf"
              download
              className="btn btn-accent btn-full"
              id="mobile-resume-btn"
              onClick={() => setMenuOpen(false)}
            >
              Download Resume ↓
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
