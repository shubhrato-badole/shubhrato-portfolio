import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    year: string
    desc: string
    tech: string[]
    color: string
    github?: string
    live?: string
  }
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // raw cursor position within the card, smoothed with a spring so motion
  // feels fluid instead of snapping directly to the mouse every frame
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])

  // glow position follows the raw (unsprung) cursor for a crisper, more direct feel
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glowBackground = useMotionTemplate`radial-gradient(280px at ${glowX}px ${glowY}px, ${project.color}22, transparent 75%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        background: '#0a0118',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: glowBackground }}
      />

      <div className="h-[3px] relative z-20" style={{ background: project.color }} />

      <div className="p-6 relative z-20">
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
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{
              background: project.color + '20',
              border: `1px solid ${project.color}40`,
              color: project.color,
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
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs text-slate-500 hover:text-white transition-colors">
                GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs hover:text-white transition-colors"
                style={{ color: project.color }}>
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}