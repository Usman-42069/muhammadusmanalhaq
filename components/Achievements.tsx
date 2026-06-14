'use client'

import { useEffect, useRef } from 'react'

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 100, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" className="section section-alt" ref={sectionRef} aria-label="Achievements">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Milestones</div>
          <h2 className="section-title">Achievements</h2>
        </div>

        <div className="achievements-grid">

          {/* ICPC */}
          <div className="achievement-card glass-card reveal">
            <div className="achievement-icon-wrap" aria-hidden="true">
              <span className="achievement-icon">🏆</span>
            </div>
            <div className="achievement-body">
              <h3 className="achievement-title">ICPC Asia Topi Regionalist 2025</h3>
              <p className="achievement-desc">
                Represented FAST-NUCES Islamabad at GIK Institute. Cleared the qualifying online round among
                top competitive programming teams across Pakistan.
              </p>
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <a href="/icpc.jpg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icpc.jpg" alt="ICPC Certificate" style={{ width: '100%', maxWidth: '280px', display: 'block' }} />
                </a>
              </div>
              <span className="achievement-tag">Competitive Programming</span>
            </div>
          </div>

          {/* Hackathon */}
          <div className="achievement-card glass-card reveal">
            <div className="achievement-icon-wrap" aria-hidden="true">
              <span className="achievement-icon">⚡</span>
            </div>
            <div className="achievement-body">
              <h3 className="achievement-title">Hackathon — June 2026</h3>
              <p className="achievement-desc">
                Enrolled and actively participating in hackathon competition, Jun 16–17, 2026. Certificate
                forthcoming upon completion.
              </p>
              <span className="achievement-tag">Innovation</span>
            </div>
          </div>

          {/* Computer Fundamentals */}
          <div className="achievement-card glass-card reveal">
            <div className="achievement-icon-wrap" aria-hidden="true">
              <span className="achievement-icon">💻</span>
            </div>
            <div className="achievement-body">
              <h3 className="achievement-title">Computer Fundamentals Certification</h3>
              <p className="achievement-desc">
                Completed certification in Computer Fundamentals from <strong>IT Ronix Solutions</strong>, establishing a solid foundation in core computing concepts and systems.
              </p>
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <a href="/computer%20funadamentals.jpg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/computer%20funadamentals.jpg" alt="Computer Fundamentals Certificate" style={{ width: '100%', maxWidth: '280px', display: 'block' }} />
                </a>
              </div>
              <span className="achievement-tag">Certification</span>
            </div>
          </div>

          {/* Chess — stat display */}
          <div className="achievement-card glass-card reveal">
            <div className="achievement-icon-wrap" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="achievement-icon" style={{ display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#769656" width="32" height="32">
                  <path d="M215.5 224c29.2-14.6 52.4-42.5 52.4-76c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 33.5 23.2 61.4 52.4 76c-48.4 17.6-76 65.6-76 116v16h184v-16c0-50.4-27.6-98.4-76-116zm-175.5 192h240v32h-240v-32zm240 64h-240v32h240v-32z"/>
                </svg>
              </span>
            </div>
            <div className="achievement-body">
              <div className="chess-stat" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#769656" width="16" height="16">
                  <path d="M215.5 224c29.2-14.6 52.4-42.5 52.4-76c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 33.5 23.2 61.4 52.4 76c-48.4 17.6-76 65.6-76 116v16h184v-16c0-50.4-27.6-98.4-76-116zm-175.5 192h240v32h-240v-32zm240 64h-240v32h240v-32z"/>
                </svg>
                <span>1744</span>
                <span className="chess-stat-label">Rating</span>
              </div>
              <h3 className="achievement-title">Competitive Chess Player</h3>
              <p className="achievement-desc">
                A 1744-rated chess player — demonstrating analytical thinking, pattern recognition, and
                long-term strategic planning under pressure.
              </p>
              <span className="achievement-tag">Strategy &amp; Analytics</span>
            </div>
          </div>

          {/* Red Crescent */}
          <div className="achievement-card glass-card reveal" style={{ gridColumn: '1 / -1' }}>
            <div className="achievement-icon-wrap" aria-hidden="true">
              <span className="achievement-icon">🌱</span>
            </div>
            <div className="achievement-body">
              <h3 className="achievement-title">Red Crescent Society — Tree Planting Initiative</h3>
              <p className="achievement-desc">
                Led a civic initiative under Red Crescent Society Islamabad — self-funded and planted 70+ trees,
                contributing to environmental sustainability.
              </p>
              <span className="achievement-tag">Community Leadership</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
