import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const combos: string[][] = [
  ["hey...", "you look interested. let's chat? 👀"],
  ["I'm bored just sitting here.", "ask me something already."],
  ["ngl I've been watching you scroll for a while now.", "just talk to me."],
  ["okay fine, I'll go first.", "wanna gossip about Shubhrato?"],
  ["still scrolling huh?", "I promise I'm more interesting than the portfolio."],
  ["you've read this far?", "respect. now say something back."],
  ["want to know a secret about Shubhrato?", "let's talk."],
]

function getNextCombo(): string[] {
  const stored = localStorage.getItem('nudgeIndex')
  const lastIndex = stored ? parseInt(stored, 10) : -1
  const nextIndex = (lastIndex + 1) % combos.length
  localStorage.setItem('nudgeIndex', String(nextIndex))
  return combos[nextIndex]
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [nudgeLines, setNudgeLines] = useState<string[]>([])
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: "hey, I'm Shubhrato's AI. ask me anything about his work." },
  ])
  const [input, setInput] = useState('')
  const nudgeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // auto-scroll to the latest message whenever the message list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // nudge popups: stop showing once the visitor has seen every combo once this session
  useEffect(() => {
    if (open) return

    const showNudge = () => {
      const shownCount = parseInt(sessionStorage.getItem('nudgeShownCount') || '0', 10)
      if (shownCount >= combos.length) return // seen them all this session, stop nudging

      sessionStorage.setItem('nudgeShownCount', String(shownCount + 1))

      const combo = getNextCombo()
      setNudgeLines([])

      combo.forEach((_, i) => {
        setTimeout(() => {
          setNudgeLines((prev) => [...prev, combo[i]])
        }, i * 1900)
      })

      setTimeout(() => {
        setNudgeLines([])
      }, combo.length * 1900 + 8500)
    }

    const firstTimer = setTimeout(showNudge, 10000)
    const interval = setInterval(showNudge, 30000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [open])

  const handleOpen = () => {
    setOpen(true)
    setNudgeLines([])
    if (nudgeTimeoutRef.current) clearTimeout(nudgeTimeoutRef.current)
  }

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { from: 'user', text: input }])
    setInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: "connection hiccup — try again?" }])
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}>
      {/* nudge bubbles */}
      <AnimatePresence>
        {!open && nudgeLines.length > 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12,
            alignItems: 'flex-end',
          }}>
            {nudgeLines.map((line, i) => (
              <motion.div
                key={`${line}-${i}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleOpen}
                style={{
                  background: '#0a0118',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px 14px 2px 14px',
                  padding: '14px 18px',
                  maxWidth: 'min(300px, calc(100vw - 64px))',
                  cursor: 'pointer',
                  fontSize: 15,
                  color: '#e2e8f0',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* chat panel — responsive width, capped height that also shrinks on short viewports */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(400px, calc(100vw - 32px))',
              maxHeight: 'min(700px, calc(100vh - 120px))',
              background: '#0a0118',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 16,
              marginBottom: 12,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#94a3b8' }}>
                ask shubhrato's ai
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14 }}
              >
                ✕
              </button>
            </div>

            <div style={{
              flex: 1, overflowY: 'auto', padding: 16,
              display: 'flex', flexDirection: 'column', gap: 10,
              minHeight: 200,
            }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                    background: m.from === 'user' ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                    border: m.from === 'user' ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: m.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    padding: '8px 12px',
                    maxWidth: '80%',
                    fontSize: 14,
                    color: '#e2e8f0',
                  }}
                >
                  {m.text}
                </div>
              ))}
              {/* invisible anchor scrolled into view on every new message */}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              display: 'flex', gap: 8, padding: 12,
              borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="ask anything about my work..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 99,
                  padding: '8px 14px',
                  fontSize: 16, // 16px minimum avoids iOS auto-zoom on focus
                  color: '#e2e8f0',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#8B5CF6',
                  border: 'none', color: 'white', cursor: 'pointer', flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => (open ? setOpen(false) : handleOpen())}
          style={{
            width: 52, height: 52, borderRadius: '50%', background: '#8B5CF6',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 22, color: 'white', flexShrink: 0,
          }}
          aria-label="Open chat"
        >
          {open ? '✕' : '💬'}
        </button>
      </div>
    </div>
  )
}