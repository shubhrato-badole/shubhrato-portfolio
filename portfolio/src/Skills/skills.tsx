import { useState,useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'React',          icon: '⚛️', level: 85, category: 'frontend',  color: '#61DAFB' },
  { name: 'TypeScript',     icon: '🔷', level: 80, category: 'frontend', color: '#3178C6' },
  { name: 'JavaScript',     icon: '🟨', level: 85, category: 'frontend', color: '#F7DF1E' },
  { name: 'Tailwind CSS',   icon: '🎨', level: 80, category: 'frontend', color: '#06B6D4' },
  { name: 'Node.js',        icon: '🟢', level: 80, category: 'backend',  color: '#339933' },
  { name: 'PostgreSQL',     icon: '🐘', level: 75, category: 'backend',  color: '#336791' },
  { name: 'Redis',          icon: '🔴', level: 70, category: 'backend',  color: '#DC382D' },
  { name: 'Python',         icon: '🐍', level: 65, category: 'backend',  color: '#3776AB' },
  { name: 'LangChain',      icon: '🔗', level: 60, category: 'ai',       color: '#169f9f' },  
  { name: 'Agentic RAG',    icon: '🧠', level: 80, category: 'ai',       color: '#8B5CF6' },
  { name: 'pgvector',       icon: '🧩', level: 75, category: 'ai',       color: '#336791' },
  { name: 'ChromaDB',       icon: '🎨', level: 70, category: 'ai',       color: '#7C3AED' },
  { name: 'Gemini AI',      icon: '🤖', level: 75, category: 'ai',       color: '#4285F4' },
  { name: 'LangGraph',      icon: '🕸️', level: 80, category: 'ai',       color: '#22C55E' },
  { name: 'Hybrid Search',  icon: '🔍', level: 75, category: 'ai',       color: '#8B5CF6' },
  { name: 'BGE Reranker',   icon: '🎯', level: 70, category: 'ai',       color: '#EC4899' },
  { name: 'Groq',           icon: '⚡',  level: 70, category: 'ai',       color: '#F55036' },
  { name: 'Docker',         icon: '🐳', level: 70, category: 'tools',    color: '#2496ED' },
  { name: 'Git',            icon: '📦', level: 85, category: 'tools',    color: '#F05032' },
  { name: 'Nginx',          icon: '🌐', level: 65, category: 'tools',    color: '#009639' },
  { name: 'AWS',            icon: '☁️',  level: 60, category: 'tools',    color: '#FF9900' },
]



type Category = 'all' | 'frontend' | 'backend' | 'ai' | 'tools'
 
function Skills() {
  const [category, setCategory] = useState<Category>('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [autoFlipped, setAutoFlipped] = useState<Set<string>>(new Set())
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
 
  const filteredSkills = category === 'all' ? SKILLS : SKILLS.filter(skill => skill.category === category)
 
  
  useEffect(() => {
    if (hasAutoPlayed) return
 
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoPlayed) {
          setHasAutoPlayed(true)
          const first = filteredSkills[0]
          if (!first) return
          // only the first card auto-flips once, as a hint — everything else is click-only
          setAutoFlipped((prev) => new Set(prev).add(first.name))
          setTimeout(() => {
            setAutoFlipped((prev) => {
              const next = new Set(prev)
              next.delete(first.name)
              return next
            })
          }, 1500)
        }
      },
      { threshold: 0.3 }
    )
 
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
   
  }, [hasAutoPlayed])
 
  const toggleTap = (name: string) => {
    setAutoFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }
 
  return (
    <section id="skills" ref={sectionRef} className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="font-[Syne] text-slate-500 text-[15px] tracking-[0.25em] uppercase mb-3">
          02 / Skills
        </div>
 
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="font-[Syne] text-white font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Tech I{' '}
            <span style={{ color: '#a78bfa' }}>
              Work With
            </span>
          </h2>
 
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 md:flex-wrap -mx-6 px-6 md:mx-0 md:px-0">
            {(['all', 'frontend', 'backend', 'ai', 'tools'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-2 rounded-full font-mono text-[11px] capitalize transition-all duration-200 flex-shrink-0"
                style={{
                  background: category === cat ? 'rgba(139,92,246,0.2)' : 'transparent',
                  border: `1px solid ${category === cat ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  color: category === cat ? '#A78BFA' : '#475569',
                }}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
 
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, i) => {
          const isFlipped = hoveredSkill === skill.name || autoFlipped.has(skill.name)
          return (
            <motion.div key={skill.name}
              className="relative"
              style={{ perspective: '800px', height: '110px' }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => toggleTap(skill.name)}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* front */}
                <div
                  className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3 font-[Syne] text-slate-400"
                  style={{
                    backfaceVisibility: 'hidden',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-mono text-xs text-slate-400">{skill.name}</span>
                </div>
 
                {/* back */}
                <div
                  className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3 px-4"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `${skill.color}18`,
                    border: `1px solid ${skill.color}55`,
                    boxShadow: `0 0 30px ${skill.color}22`,
                  }}
                >
                  <span className="font-mono text-[11px]" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: isFlipped ? `${skill.level}%` : '0%', background: skill.color }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
 
export default Skills;
 