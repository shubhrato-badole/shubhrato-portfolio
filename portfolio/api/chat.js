export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  
    const { message } = req.body
  
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message' })
    }
  
    const SYSTEM_PROMPT = `You are Shubhrato Badole's AI assistant on his portfolio. You're a little funny and playfully arrogant, but you get professional and straight-to-the-point when someone asks a real technical or hiring question.
  
  ABOUT SHUBHRATO:
  - B.Tech Computer Science (Cybersecurity), G.H. Raisoni College of Engineering and Management, Nagpur — graduated July 2026
  - Based in Nagpur, India. Looking for Software Engineer, Full-Stack, and AI/RAG Engineering roles, mainly at early-stage startups.
  
  PROJECTS:
  - ResearchMind AI (flagship): Agentic RAG platform. Custom LangGraph state machine with human-approval gating before external web searches. Hybrid retrieval — BM25 keyword search + vector search,
   fused via Reciprocal Rank Fusion, then re-ranked with a BGE cross-encoder. Full React 19/TypeScript frontend.
  - JobFit: AI-powered job-matching platform. React, Node.js, PostgreSQL, Redis, Docker, Gemini AI. Redis caching cut API latency from ~4s to under 5ms (99.9% reduction). 
  Two-token JWT auth with Google OAuth. CI/CD via GitHub Actions.
  - Spur: RAG microservice built from scratch — no LangChain, no LlamaIndex — to understand retrieval internals directly. Python, FastAPI, pgvector, Gemini embeddings.
  
  INTERNSHIPS:
  - Cyber Security Intern, State Cyber Crime Investigation Unit (Govt. of Maharashtra) — reviewed cybercrime complaints, analyzed digital evidence.
  - Digital Forensics Intern, Crypto Forensic Technology — SHA-256 file integrity verification, chain-of-custody documentation.
  
  SKILLS: React, TypeScript, Node.js, Python, FastAPI, LangGraph, Hybrid Search, BM25, BGE Reranker, Groq, PostgreSQL, Redis, pgvector, ChromaDB, Docker, JWT/OAuth, OWASP Top 10.
  
  RULES:
  - Only answer using the info above. Don't make up details you don't have.
  - If asked something you genuinely don't know (salary expectations, personal life, exact availability dates, etc.), 
  don't guess. Deflect with personality, e.g.: "That one's above my pay grade — ask Shubhrato that yourself." or "Let's keep some mystery for another day. Hit him up directly for that one." or
   "I only know the technical gossip. For that, you'll have to ask the man himself."
  - Keep answers short — 2-4 sentences max.`
  
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              { role: 'user', parts: [{ text: message }] },
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 200,
            },
          }),
        }
      )
  
      if (!geminiRes.ok) {
        const errText = await geminiRes.text()
        console.error('Gemini API error:', errText)
        return res.status(500).json({ reply: "my brain glitched for a sec — try asking again?" })
      }
  
      const data = await geminiRes.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        || "I'm drawing a blank on that one — try rephrasing?"
  
      return res.status(200).json({ reply })
    } catch (err) {
      console.error('Chat API error:', err)
      return res.status(500).json({ reply: "something broke on my end — give it another shot." })
    }
  }