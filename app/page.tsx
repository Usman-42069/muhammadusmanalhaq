'use client'

import Navbar     from '@/components/Navbar'
import Hero       from '@/components/Hero'
import About      from '@/components/About'
import Skills     from '@/components/Skills'
import Projects   from '@/components/Projects'
import Experience from '@/components/Experience'
import Education  from '@/components/Education'
import Achievements from '@/components/Achievements'
import Contact    from '@/components/Contact'
import Footer     from '@/components/Footer'
import ScrollTop  from '@/components/ScrollTop'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
