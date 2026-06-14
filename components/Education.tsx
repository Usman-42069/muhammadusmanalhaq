'use client'

import { useEffect, useRef } from 'react'

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 120, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="education" className="section" ref={sectionRef} aria-label="Education">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Academic Background</div>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="edu-grid">
          <div className="edu-card glass-card reveal">
            <div className="edu-icon" aria-hidden="true">🎓</div>
            <div className="edu-body">
              <h3 className="edu-degree">Bachelor of Science in Computer Science</h3>
              <div className="edu-school">National University of Computer &amp; Emerging Sciences (FAST-NUCES)</div>
              <div className="edu-location">Islamabad Campus</div>
              <div className="edu-period">August 2023 – Present</div>
              <div className="edu-status">6th Semester · Entering Final Year August 2026</div>
            </div>
          </div>

          <div className="edu-card glass-card reveal">
            <div className="edu-icon" aria-hidden="true">📚</div>
            <div className="edu-body">
              <h3 className="edu-degree">HSSC Pre-Engineering — FBISE Board</h3>
              <div className="edu-school">International School of Pakistan (ISP)</div>
              <div className="edu-location">Kuwait</div>
              <div className="edu-period">2020 – 2022</div>
              <div className="edu-status">Score: 957 / 1100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
