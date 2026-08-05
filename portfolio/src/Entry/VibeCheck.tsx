import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const STEPS = [
  { msg: "checking linkedin... last updated 3 years ago. bold strategy." },
  { msg: 'googled "center a div" this week... we don\'t judge.' },
  { msg: "coffee intake: 4 cups before 9am. this is fine. this is fine." },
  { msg: "side projects found: 14. shipped: 0. respectable." },
  { msg: "vibe certified. welcome to the good side." },
]

const TOTAL_MS = 800 + STEPS.length * 1300 + 900 

interface Props { name: string; onDone: () => void }

export default function VibeCheck({ name, onDone }: Props) {
  const [current, setCurrent] = useState(0)
  const [typed, setTyped] = useState<string[]>(Array(STEPS.length).fill(""))
  const [prog, setProg] = useState(0)
  const [hired, setHired] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const [exiting, setExiting] = useState(false)
  const typeTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  
  function typeStep(i: number) {
    if (i >= STEPS.length) return
    setCurrent(i + 1)
    const msg = STEPS[i].msg
    let charIdx = 0
    const tick = () => {
      charIdx++
      setTyped(prev => {
        const next = [...prev]
        next[i] = msg.slice(0, charIdx)
        return next
      })
      if (charIdx < msg.length) {
        typeTimers.current.push(setTimeout(tick, 16))
      } else {
        typeTimers.current.push(setTimeout(() => typeStep(i + 1), 380))
      }
    }
    tick()
  }

  useEffect(() => {
    typeTimers.current.push(setTimeout(() => typeStep(0), 700))

    let elapsed = 0
    const bar = setInterval(() => {
      elapsed += 30
      setProg(Math.min(100, Math.round((elapsed / TOTAL_MS) * 100)))
      if (elapsed >= TOTAL_MS) {
        clearInterval(bar)
        setGlitching(true)
        setTimeout(() => {
          setGlitching(false)
          setHired(true)
        }, 450) // glitch flicker window before settling green
        setTimeout(() => setExiting(true), 450 + 1900) // hold on HIRED, then start exit fade
        setTimeout(onDone, 450 + 1900 + 900) // unmount only after exit transition finishes
      }
    }, 30)

    return () => {
      clearInterval(bar)
      typeTimers.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#04010f" }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 0.94 : 1, y: exiting ? -16 : 0 }}
      transition={{ duration: 0.9, ease: [0.4, 0.2, 0.2, 1] }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: hired
            ? "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          transition: "background 1.5s",
        }}
      />

      {hired && (
        <>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 40, height: 40,
                top: "50%", left: "50%",
                border: "1.5px solid rgba(74,222,128,0.5)",
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                animation: `burstRing 1.1s ease-out forwards`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </>
      )}

      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 460,
          background: "rgba(255,255,255,0.02)",
          border: hired
            ? "1px solid rgba(74,222,128,0.2)"
            : "1px solid rgba(139,92,246,0.2)",
          borderRadius: 20,
          padding: "32px 28px",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        {/* scanning laser sweep, only while actively scanning */}
        {!hired && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #A78BFA, transparent)",
              boxShadow: "0 0 12px 2px rgba(167,139,250,0.6)",
              animation: "scanSweep 2.4s ease-in-out infinite",
            }}
          />
        )}

        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "#334155",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>shubhrato corp™</span>
          <span style={{ color: hired ? "#4ADE80" : "#8B5CF6", transition: "color 1s" }}>
            {hired ? "● approved" : "● scanning"}
          </span>
        </div>

        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#334155",
              letterSpacing: "0.2em",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            candidate
          </div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: `clamp(1rem, ${Math.min(8, 62 / Math.max(name.length, 1))}vw, 2.5rem)`,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              display: "inline-block",
              color: hired ? "#4ADE80" : "#ffffff",
              textShadow: glitching
                ? "2px 0 #ff3b3b, -2px 0 #22d3ee"
                : "none",
              transition: glitching ? "none" : "color 1.5s, text-shadow 0.3s",
            }}
          >
            {name.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.05)",
            marginBottom: 24,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {STEPS.map((_, i) => {
            const done    = current > i + 1
            const active  = current === i + 1
            const pending = current <= i
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  opacity: pending ? 0.1 : 1,
                  transition: "opacity 0.5s",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    flexShrink: 0,
                    marginTop: 1,
                    color: done ? "#4ADE80" : active ? "#A78BFA" : "#334155",
                    transition: "color 0.7s ease",
                  }}
                >
                  {done ? "✓" : active ? "◎" : "○"}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: done ? "#475569" : active ? "#E2E8F0" : "#1a1a2e",
                    transition: "color 0.7s ease",
                  }}
                >
                  {active || done ? typed[i] : ""}
                </span>
              </div>
            )
          })}
        </div>

        <div
          style={{
            height: 2,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 99,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${prog}%`,
              borderRadius: 99,
              background: hired
                ? "linear-gradient(90deg, #4ade80, #86efac)"
                : "linear-gradient(90deg, #8B5CF6, #06B6D4)",
              transition: "width 0.03s linear, background 1.5s",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 10,
            color: "#334155",
          }}
        >
          <span>{hired ? "✓ cleared" : `${prog}% · please hold`}</span>
        </div>

        <div
          style={{
            overflow: "hidden",
            maxHeight: hired ? 80 : 0,
            opacity: hired ? 1 : 0,
            transition: "all 1s ease",
            marginTop: hired ? 20 : 0,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={hired ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.3 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#4ADE80",
              letterSpacing: "0.05em",
              marginBottom: 6,
            }}
          >
            CANDIDATE HIRED ✓
          </motion.div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#334155",
            }}
          >
            hr will not be in touch. they never are.
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}