import { useState, useEffect } from "react"

const STEPS = [
  { msg: "checking linkedin... last updated 3 years ago. bold strategy.",  },
  { msg: 'googled "center a div" this week... we don\'t judge.',  },
  { msg: "coffee intake: 4 cups before 9am. this is fine. this is fine.", },
  { msg: "side projects found: 14. shipped: 0. respectable.", },
  { msg: "vibe certified. welcome to the good side.", },
]

interface Props { name: string; onDone: () => void }

export default function VibeCheck({ name, onDone }: Props) {
  const [current, setCurrent] = useState(0)
  const [prog,    setProg]    = useState(0)
  const [hired,   setHired]   = useState(false)

  useEffect(() => {
    STEPS.forEach((_, i) => {
      setTimeout(() => setCurrent(i + 1), 800 + i * 1250)
    })

    const total = 800 + STEPS.length * 1200 + 600
    let elapsed = 0
    const bar = setInterval(() => {
      elapsed += 30
      setProg(Math.min(100, Math.round((elapsed / total) * 100)))
      if (elapsed >= total) {
        clearInterval(bar)
        setHired(true)
        setTimeout(onDone, 3100)
      }
    }, 30)

    return () => clearInterval(bar)
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#04010f" }}
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

      
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: 460,
          background: "rgba(255,255,255,0.02)",
          border: hired
            ? "1px solid rgba(74,222,128,0.2)"
            : "1px solid rgba(139,92,246,0.2)",
          borderRadius: 20,
          padding: "32px 28px",
          backdropFilter: "blur(10px)",
          transition: "border-color 1.5s",
        }}
      >
        
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
          <span style={{ color: hired ? "#4ADE80" : "#8B5CF6" }}>
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
              fontSize: "clamp(2rem, 8vw, 2rem)",
              letterSpacing: "-1.5px",
              lineHeight: 1,
              background: hired
                ? "linear-gradient(135deg, #4ade80, #86efac)"
                : "linear-gradient(135deg, #ffffff 30%, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "all 1.5s",
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
          {STEPS.map((step, i) => {
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
                    transition: "color 0.5s",
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
                    transition: "color 0.5s",
                  }}
                >
                   {step.msg}
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
          <div
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
          </div>
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
      </div>
    </div>
  )
}