import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { UseVisitor } from '../context/VisitorContext';

const facts = [
  { icon: '🎓', label: 'Education', value: 'B.Tech CS (Cybersecurity)' },
  { icon: '📍', label: 'Based in', value: 'Nagpur, India' },
  { icon: '🧠', label: 'Focus', value: 'Agentic AI & RAG Systems' },
  { icon: '🔐', label: 'Background', value: 'Cybercrime Investigation' },
]

const aboutLines = [
  "I'm a Full Stack Developer passionate about crafting digital experiences that are both beautiful and technically solid.",
  "From pixel-perfect UIs to scalable backend systems — I care about every layer.",
  "When I'm not coding, I'm exploring cybersecurity, contributing to open source, or breaking things in my homelab to understand how they work.",
]

const codeLines: [string, string][] = [
  ['#E2E8F0', 'const developer = {'],
  ['#A78BFA', '  name: "Shubhrato Badole",'],
  ['#A78BFA', '  role: "Full Stack Dev",'],
  ['#E2E8F0', '  loves: ['],
  ['#34D399', '    "React", "TypeScript",'],
  ['#34D399', '    "Node.js", "PostgreSQL",'],
  ['#E2E8F0', '  ],'],
  ['#F59E0B', '  focus: "AI + Cybersecurity",'],
  ['#06B6D4', '  solve: (p) => ☕ + code'],
  ['#E2E8F0', '}'],
]

const lineDelay = 0.12

function FactCard({ fact, delay }: { fact: typeof facts[number]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
      }}
      className="bg-white/[0.03] border border-purple-400/[0.3] rounded-xl p-4 hover:bg-purple-600/[0.05] hover:border-violet-400/60 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-colors duration-500 ease-out"
    >
      <span className="text-2xl mr-3">{fact.icon}</span> <br />
      <span className="text-slate-400 mb-0.5">{fact.label} </span> <br />
      <span className="text-white">{fact.value}</span>
    </motion.div>
  )
}

function About() {
  const { visitorName } = UseVisitor()

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[12px] tracking-[0.25em] text-slate-500 uppercase mb-3"
      >
        01 / About
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Syne'] font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Hey {visitorName}, <br />
            <span style={{ color: '#a78bfa' }}>I build things.</span>
          </motion.h2>

          {aboutLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.15 + i * lineDelay, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-400 mt-4 first:mt-0"
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.15 + aboutLines.length * lineDelay, ease: [0.22, 1, 0.36, 1] }}
            className="text-purple-400 mt-6"
          >
            I believe the best code is code that solves real problems for real people — elegantly.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10" style={{ perspective: '600px' }}>
            {facts.map((fact, i) => (
              <FactCard
                key={fact.icon}
                fact={fact}
                delay={0.15 + (aboutLines.length + 1) * lineDelay + i * 0.08}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-violet-500/20"
          style={{ background: '#0a0118', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
            <div className="font-mono text-[11px] text-slate-600 ml-auto">developer.ts</div>
          </div>
          <div className="p-8 font-mono text-[15px] leading-8 overflow-x-auto" style={{ minHeight: '320px' }}>
            {codeLines.map(([color, text], i) => {
              const isLast = i === codeLines.length - 1
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                >
                  <span className="text-slate-700 text-[11px] w-4 text-right select-none">
                    {i + 1}
                  </span>
                  <span style={{ color }} className="font-mono text-[15px]">
                    {text}
                    {isLast && (
                      <span
                        className="inline-block w-[8px] h-[16px] ml-1 align-middle bg-violet-400"
                        style={{ animation: 'blink 1s step-end infinite' }}
                      />
                    )}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About;