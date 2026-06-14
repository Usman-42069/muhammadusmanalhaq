'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

type Filter = 'all' | 'web' | 'mobile' | 'hpc' | 'ai'

/* ── Lightbox component ─────────────────────────────────────── */
function Lightbox({ images, startIdx, onClose }: {
  images: string[]; startIdx: number; onClose: () => void
}) {
  const [idx, setIdx] = useState(startIdx)

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, prev, next])

  const isPdf = images[idx]?.endsWith('.pdf')

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

        {isPdf ? (
          <div className="lightbox-pdf-wrap">
            <div className="lightbox-pdf-msg">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <p>UI Design PDF</p>
              <a href={images[idx]} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Open PDF ↗
              </a>
            </div>
          </div>
        ) : images[idx]?.endsWith('.mp4') ? (
          <div className="lightbox-video-wrap" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video src={images[idx]} controls autoPlay playsInline preload="auto" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px' }} />
          </div>
        ) : (
          <div className="lightbox-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[idx]} alt={`Screenshot ${idx + 1}`} className="lightbox-img" loading="lazy" />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">‹</button>
            <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">›</button>
            <div className="lightbox-dots">
              {images.map((_, i) => (
                <button key={i} className={`lightbox-dot${i === idx ? ' active' : ''}`}
                  onClick={() => setIdx(i)} aria-label={`Go to image ${i + 1}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Image thumbnail strip ──────────────────────────────────── */
function ProjectImages({ images, label }: { images: string[]; label: string }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (!images.length) return null
  const isPdf = images[0]?.endsWith('.pdf')

  return (
    <>
      <div className="project-images">
        {isPdf ? (
          <button
            className="project-pdf-thumb"
            onClick={() => setLightboxIdx(0)}
            aria-label={`Open ${label} UI PDF`}
            style={images[1] ? { padding: 0, border: 'none', background: 'transparent', overflow: 'hidden', position: 'relative' } : undefined}
          >
            {images[1] ? (
              <Image src={images[1]} alt={`${label} cover`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', borderRadius: '12px' }} />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>View UI PDF</span>
              </>
            )}
          </button>
        ) : (
          <div className="project-thumbs">
            {images.slice(0, 4).map((src, i) => (
              <button
                key={i}
                className="project-thumb"
                onClick={() => setLightboxIdx(i)}
                aria-label={`View screenshot ${i + 1}`}
              >
                <Image src={src} alt={`${label} screenshot ${i + 1}`} className="project-thumb-img" fill sizes="(max-width: 768px) 50vw, 25vw" />
                {i === 3 && images.length > 4 && (
                  <div className="project-thumb-more">+{images.length - 4}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {lightboxIdx !== null && (
        <Lightbox images={images} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}

/* ── Project data ───────────────────────────────────────────── */
const POS_IMGS = [
  '/projects/pos/login.PNG',
  '/projects/pos/dashboard.PNG',
  '/projects/pos/POS.PNG',
  '/projects/pos/Manage Products.PNG',
  '/projects/pos/Manage Cashiers.png',
  '/projects/pos/Manage Discounts.png',
  '/projects/pos/Manage Managers.png',
  '/projects/pos/Sales Reports.png',
  '/projects/pos/Inventory Reports.png',
  '/projects/pos/Cashier Performance.png',
  '/projects/pos/Discount Reports.png',
  '/projects/pos/Flop Products.png',
]

const FASTPAY_IMGS = [
  '/projects/fastpay/authentication.png',
  '/projects/fastpay/dashboard.png',
  '/projects/fastpay/send_money.png',
  '/projects/fastpay/bills_payment.png',
  '/projects/fastpay/qr_code_slip.png',
  '/projects/fastpay/transaction_log.png',
  '/projects/fastpay/new_partition.png',
  '/projects/fastpay/add_money_dialog.png',
  '/projects/fastpay/bank_topup.png',
  '/projects/fastpay/manage_card.png',
  '/projects/fastpay/raast.png',
  '/projects/fastpay/mobile_topup.png',
  '/projects/fastpay/donations.png',
]

const LISTIT_IMGS = ['/projects/ListIt-UI.pdf', '/projects/list-it-cover.png']

const RACE_IMGS = [
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_06.png',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_35.png',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_20.png',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_32_05.png',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_45.png',
]

type ProjectData = {
  id: string
  category: Filter
  badgeClass: string
  badgeLabel: string
  stat: string
  title: string
  summary: string
  finding: string | null
  tech: string[]
  href: string
  images: string[]
}

const PROJECTS: ProjectData[] = [
  {
    id: 'hpc-research',
    category: 'hpc',
    badgeClass: 'badge-hpc',
    badgeLabel: 'HPC / Research',
    stat: 'Performance Analysis',
    title: 'Parallel Computing Research: 2D Image Convolution',
    summary:
      'I benchmarked 2D Gaussian convolution across multiple implementations, including sequential C++, CUDA shared-memory tiling, and AVX2 with OpenMP. I analyzed the performance across different image resolutions to understand hardware-level bottlenecks.',
    finding: 'Analyzed PCIe transfer overhead and its impact on overall GPU compute time.',
    tech: ['C++', 'CUDA 12.0', 'OpenMP', 'AVX2 SIMD', 'Ubuntu 24.04'],
    href: '#',
    images: [],
  },
  {
    id: 'cinebook',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Full-Stack Web',
    stat: 'JWT & Role Auth',
    title: 'CineBook Pro: Online Cinema Ticket Booking System',
    summary:
      'I built a production-grade cinema booking platform with TMDB API integration, interactive seat maps with Framer Motion, JWT "Remember Me" sessions, bcrypt auth, a role-based admin dashboard, and deployed it on Vercel.',
    finding: null,
    tech: ['Next.js 14', 'MongoDB', 'NextAuth.js', 'TMDB API', 'Tailwind', 'Vercel'],
    href: '#',
    images: [
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-2026-06-14-07_28_02.png',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-6a05681cb48251208c4a6a46-2026-06-14-07_28_30.png',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-profile-bookings-2026-06-14-07_26_18.png',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-2026-06-14-07_27_03.png',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-halls-2026-06-14-07_27_23.png',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-users-2026-06-14-07_27_41.png',
    ],
  },
  {
    id: 'fastpay',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Fintech · Full-Stack',
    stat: 'ACID ledger · RLS',
    title: 'FastPay: Enterprise Digital Wallet & P2P Ledger',
    summary:
      'I designed and built a dual-interface fintech ecosystem — a JavaFX desktop client and a Next.js web portal. I implemented an ACID double-entry ledger, virtual budget partitioning, QR payment slips, 26+ utility billers with O(1) filtering, and Postgres Row Level Security.',
    finding: null,
    tech: ['Java 17', 'JavaFX', 'Next.js 14', 'Supabase', 'PostgreSQL', 'TypeScript'],
    href: '#',
    images: FASTPAY_IMGS,
  },
  {
    id: 'listit',
    category: 'mobile',
    badgeClass: 'badge-mobile',
    badgeLabel: 'Android App',
    stat: 'Offline-first sync',
    title: 'List It: C2C Classified Marketplace App',
    summary:
      'I built a full-featured OLX-style Android marketplace. I designed an offline-first SQLite caching system with auto-sync, a monetary offer flow, multi-image uploads, Google Maps location picker, real-time chat, and Agora voice/video calling.',
    finding: null,
    tech: ['Kotlin', 'Firebase', 'MySQL', 'PHP', 'Agora API', 'SQLite'],
    href: '#',
    images: LISTIT_IMGS,
  },
  {
    id: 'race',
    category: 'ai',
    badgeClass: 'badge-ai',
    badgeLabel: 'AI / ML',
    stat: '50% accuracy · 70K rows',
    title: 'RACE: Reading Comprehension & Quiz Generation',
    summary:
      'I trained a quiz generation system on the RACE dataset (70K+ rows) using zero deep learning — entirely classical ML. My dual-pipeline approach covers MCQ generation and distractor synthesis. Using Label Spreading with only 10% labeled data, I achieved 50% accuracy.',
    finding: null,
    tech: ['Python', 'Scikit-learn', 'Streamlit', 'TF-IDF', 'NLP'],
    href: '#',
    images: RACE_IMGS,
  },
  {
    id: 'socially',
    category: 'mobile',
    badgeClass: 'badge-mobile',
    badgeLabel: 'Android App',
    stat: 'Figma → Kotlin',
    title: 'Socially: Instagram-Clone Android App',
    summary:
      'I designed every screen in Figma first, then replicated them in Kotlin. I built a complete Instagram reimagining with post feed, stories, likes, comments, real-time Firestore sync, Agora voice/video calling, and Firebase Cloud Messaging.',
    finding: null,
    tech: ['Kotlin', 'Firebase Firestore', 'Agora API', 'FCM', 'Figma'],
    href: '#',
    images: [],
  },
  {
    id: 'swiftcart',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Desktop POS',
    stat: 'ACID transactions',
    title: 'SwiftCart: Desktop POS System',
    summary:
      'I built a retail POS navigable entirely by keyboard shortcuts with ACID transactions, cashier/manager roles, and real-time inventory.',
    finding: null,
    tech: ['JavaFX', 'SQL Server'],
    href: '#',
    images: POS_IMGS,
  },
]

const MORE = [
  { name: 'TravelEase – Travel Management App', tech: 'C# · .NET WinForms',   desc: 'I implemented 6 user roles and custom SQL profit/loss and travel trend reports.', images: [] },
  { name: 'Airplane Sync Simulation',           tech: 'C++ · Semaphores',     desc: 'I modelled a three-track airport with semaphore/mutex priority scheduling and a custom real-time GUI.', images: [] },
  { name: 'Plant vs. Zombies Clone',            tech: 'C++ · SFML',           desc: 'I built a fully playable PvZ clone from scratch with custom game loop, collision, and wave systems.', images: ['/projects/plantsvszombie.mp4'] },
  { name: 'Centipede Arcade Game',              tech: 'C++ · SFML',           desc: 'I cloned the classic Centipede arcade game with progressive difficulty and a scoreboard.', images: [] },
  { name: 'Mini GitHub (Git Clone)',             tech: 'C++ · Data Structures', desc: 'I built a command-line VCS replicating core git operations using custom data structures.', images: [] },
]

/* ── More project item with optional gallery ────────────────── */
function MoreProjectItem({ item }: { item: typeof MORE[0] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  return (
    <div className="more-project-item glass-card">
      <div className="more-project-header">
        <span className="more-project-name">{item.name}</span>
        <span className="more-project-tech mono">{item.tech}</span>
      </div>
      <p className="more-project-desc">{item.desc}</p>
      {item.images.length > 0 && (
        <>
          {item.images[0]?.endsWith('.mp4') ? (
            <div className="more-project-thumbs" style={{ marginTop: '1rem' }}>
              <video 
                src={`${item.images[0]}#t=0.1`} 
                preload="metadata"
                onClick={() => setLightboxIdx(0)}
                title={`Play ${item.name} Video`}
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px', display: 'block', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} 
              />
            </div>
          ) : (
            <div className="more-project-thumbs">
              {item.images.slice(0, 3).map((src, i) => (
                <button key={i} className="more-project-thumb" onClick={() => setLightboxIdx(i)} aria-label={`View screenshot ${i + 1}`}>
                  <Image src={src} alt={`Screenshot ${i + 1}`} className="more-project-thumb-img" fill sizes="(max-width: 768px) 33vw, 20vw" />
                  {i === 2 && item.images.length > 3 && (
                    <div className="project-thumb-more">+{item.images.length - 3}</div>
                  )}
                </button>
              ))}
            </div>
          )}
          {lightboxIdx !== null && (
            <Lightbox images={item.images} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
          )}
        </>
      )}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const visible = PROJECTS.filter(p => filter === 'all' ? p.id !== 'socially' : p.category === filter)

  return (
    <section id="projects" className="section" ref={sectionRef} aria-label="Featured projects">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">What I&apos;ve Built</div>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter bar */}
        <div className="filter-bar reveal" role="tablist" aria-label="Filter by category">
          {(['all', 'web', 'mobile', 'hpc', 'ai'] as Filter[]).map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {f === 'all' ? 'All' : f === 'hpc' ? 'HPC / Systems' : f === 'ai' ? 'AI / ML' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="projects-grid" role="list">
          {visible.map(p => (
            <div
              key={p.id}
              className="project-card fade-in reveal"
              role="listitem"
            >
              <div className="card-top-border" />

              {/* Project images if available */}
              {p.images.length > 0 && (
                <ProjectImages images={p.images} label={p.title} />
              )}

              <div className="card-body">
                <div className="card-header">
                  <span className={`card-category-badge ${p.badgeClass}`}>{p.badgeLabel}</span>
                  <div className="card-stat-badge">
                    <span className="stat-badge-dot" />
                    {p.stat}
                  </div>
                </div>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-summary">{p.summary}</p>
                {p.finding && (
                  <div className="card-finding">
                    <span className="finding-label">Key Finding</span>
                    <span className="finding-text">{p.finding}</span>
                  </div>
                )}
                <div className="card-tech">
                  {p.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More projects */}
        <div className="more-projects-section reveal">
          <h3 className="more-projects-title">More Projects</h3>
          <div className="more-projects-grid">
            {MORE.map(m => <MoreProjectItem key={m.name} item={m} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
