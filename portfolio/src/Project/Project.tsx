import { useState, useEffect, useRef } from 'react';
import ProjectData from './ProjectData';

function Project() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [visible, setVisible] = useState<Set<number>>(new Set())
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-project-id'))
            setVisible((prev) => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.15 }
    )

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <div className="font-['Syne'] text-slate-500 font-mono text-[12px] tracking-[0.25em] text-primary uppercase mb-3">
        03 / Projects
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <h2
          className="font-['Syne'] font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Things I've{' '}
          <span style={{ color: '#a78bfa' }}>
            Built
          </span>
        </h2>

        <a href="https://github.com/shubhrato-badole"
          target="_blank" rel="noopener noreferrer"
          className="font-mono text-slate-500 font-['Syne'] text-[14px] hover:text-white transition-colors duration-300">
          View all on GitHub →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ProjectData.map((project, i) => {
          const isHovered = hovered === project.id
          const isVisible = visible.has(project.id)
          return (
            <div key={project.id}
              ref={(el) => { cardRefs.current[project.id] = el }}
              data-project-id={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-xl overflow-hidden cursor-default"
              style={{
                background: '#0a0118',
                border: `1px solid ${isHovered ? project.color + '40' : 'rgba(255,255,255,0.07)'}`,
                transform: isVisible
                  ? (isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
                  : 'translateY(24px) scale(1)',
                opacity: isVisible ? 1 : 0,
                boxShadow: isHovered
                  ? `0 24px 48px rgba(0,0,0,0.45), 0 0 40px ${project.color}20`
                  : '0 0 0 rgba(0,0,0,0)',
                transition: `transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, box-shadow 0.5s ease, border-color 0.3s ease`,
                transitionDelay: isVisible ? `${i * 80}ms` : '0ms',
              }}>
              <div
                className="transition-all duration-500"
                style={{
                  height: isHovered ? '5px' : '3px',
                  background: project.color,
                }}
              ></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-[11px] text-slate-600 mb-1">
                      {project.year}
                    </div>
                    <h3 className="font-['Syne'] font-bold text-white text-lg">
                      {project.title}
                    </h3>
                  </div>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 transition-transform duration-500"
                    style={{
                      background: project.color + '20',
                      border: `1px solid ${project.color}40`,
                      color: project.color,
                      transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                    }}
                  >
                    ⬡
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {project.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech}
                      className="font-mono text-[11px] px-2 py-1 rounded-full"
                      style={{
                        background: project.color + '15',
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                      }}>
                      {tech}
                    </span>
                  ))}

                  {project.tech.length > 4 &&
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full text-slate-600 border border-slate-800">
                      +{project.tech.length - 4}
                    </span>
                  }
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-600 font-mono">click to explore →</span>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <span className="font-mono text-xs text-slate-500 hover:text-white transition-colors">
                          GitHub
                        </span>
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <span className="font-mono text-xs hover:text-white transition-colors"
                          style={{ color: project.color }}>
                          Live ↗
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Project;