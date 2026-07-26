import { UseVisitor } from "../context/VisitorContext";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Canvas  from    '../components/StarCanvas'
import { smoothScrollTo } from "../components/scrollUtils";


const ROLES = [
  'Full Stack Developer',
  'Agentic AI / RAG Engineer',
  'Cybersecurity Enthusiast',
  'LangGraph Builder',
  'Caffeine-Powered Debugger',
]

interface MagneticButtonProps {
  href: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className: string
  children: React.ReactNode
}

function MagneticButton({ href, onClick, className, children }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

function Hero () {
    const { visitorName } = UseVisitor()
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // raw cursor position relative to viewport center, smoothed with a spring
    // so the glow orbs drift toward the mouse instead of snapping to it
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 55, damping: 18 })
    const smoothY = useSpring(mouseY, { stiffness: 55, damping: 18 })

    const orb1X = useTransform(smoothX, [-1, 1], [-55, 55])
    const orb1Y = useTransform(smoothY, [-1, 1], [-40, 40])
    const orb2X = useTransform(smoothX, [-1, 1], [45, -45])
    const orb2Y = useTransform(smoothY, [-1, 1], [30, -30])

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const relX = (e.clientX / window.innerWidth) * 2 - 1
        const relY = (e.clientY / window.innerHeight) * 2 - 1
        mouseX.set(relX)
        mouseY.set(relY)
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    useEffect(() => {
  const currentText = ROLES[index]


  if (!deleting && text === currentText) {
    const pause = setTimeout(() => setDeleting(true), 1500)
    return () => clearTimeout(pause)
  }

  const jitter = Math.random() * 30
  const speed = deleting ? 35 + jitter : 70 + jitter

  const timeout = setTimeout(() => {
    if (!deleting) {
      setText(currentText.slice(0, text.length + 1))
    } else {
      setText(text.slice(0, text.length - 1))
      if (text === '') {
        setDeleting(false)
        setIndex((index + 1) % ROLES.length)
      }
    }
  }, speed)

  return () => clearTimeout(timeout)
}, [text, deleting, index])

    return(
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Canvas />

         <motion.div
           className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none"
           style={{ x: orb1X, y: orb1Y }}
         />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"
        style={{ x: orb2X, y: orb2Y }}
      />

      <div className="absolute top-24 left-0 right-0 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="font-mono text-[12px] sm:text-[13px] text-slate-500 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            welcome, <span className="text-violet-400">{visitorName}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-violet-300 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for work
          </div>
        </div>
      </div>

      <div className="text-center z-10 px-6 max-w-4xl pt-16">

        <div className="font-mono text-[11px] text-violet-400/80 tracking-[0.3em] uppercase mb-4">
          Hello World ·/·
        </div>

        <h1 className="font-['Syne'] font-bold leading-none mb-5"
          style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}>
          <span className="text-white">SHUBHRATO </span>
          <span style={{ color: '#22d3ee' }}>
            BADOLE
          </span>
        </h1>

        <div className="font-['Syne'] font-bold mb-8 min-h-8 text-slate-300 tracking-wide"
          style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)' }}>
           {text}
           <span className="inline-block w-[2px] ml-1 bg-violet-400" style={{ animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
        </div>

        <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed text-[15px]">
          I build fast, beautiful, and secure web apps. Passionate about
          clean code, great UX, and cybersecurity.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <MagneticButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector('#projects')
              if (target) smoothScrollTo(target, 900, 80)
            }}
            className="px-6 py-3 rounded-xl font-['Syne'] font-medium text-white text-sm bg-gradient-to-r from-violet-700 to-violet-500 border border-violet-500/50 hover:bg-violet-400/50 hover:border-violet-400/50 transition-colors duration-500 ease-out inline-block"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector('#contact')
              if (target) smoothScrollTo(target, 900, 80)
            }}
            className="px-6 py-3 rounded-xl font-['Syne'] font-medium text-violet-300 text-sm border border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/10 transition-colors duration-300 inline-block"
          >
            Hire Me
          </MagneticButton>
        </div>

      </div>


      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-slate-700 tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-7 bg-gradient-to-b from-slate-700 to-transparent" />
      </div>

        </section>
    )
}

export default Hero