import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectModalProps {
  project: {
    title: string
    year: string
    desc: string
    longDesc?: string
    challenges?: string[]
    tech: string[]
    color: string
    github?: string
    live?: string
  }
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ background: '#0a0118', border: '1px solid rgba(255,255,255,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
        >
          <div className="h-1.5 w-full" style={{ background: project.color }} />

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-xs text-slate-600 mb-2">{project.year}</div>
                <h2 className="font-['Syne'] text-3xl font-bold text-white">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors flex-shrink-0"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed mb-8">
              {project.longDesc || project.desc}
            </p>

            <div className="mb-8">
              <h4 className="font-mono text-xs text-slate-500 tracking-widest mb-3">TECH STACK</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-full"
                    style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.challenges && project.challenges.length > 0 && (
              <div className="mb-8">
                <h4 className="font-mono text-xs text-slate-500 tracking-widest mb-3">KEY CHALLENGES</h4>
                <div className="space-y-3">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span style={{ color: project.color }} className="mt-0.5 text-xs">▸</span>
                      <span className="text-slate-400 text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg font-['Syne'] text-sm font-medium text-white"
                  style={{ background: project.color }}>
                  View Live ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg font-['Syne'] text-sm font-medium text-slate-300"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}