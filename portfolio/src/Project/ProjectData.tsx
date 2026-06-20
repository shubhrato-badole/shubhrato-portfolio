
// interface Project {
//   id:     number
//   title:  string
//   year:   string
//   desc:   string
//   tech:   string[]
//   github: string
//   live:   string
//   color:  string
// }
const PROJECTS = [
  {
    id: 1,
    title: 'JobFit — AI Job Matching Platform',
    year: '2026',
    desc: 'Full-stack AI platform that analyzes resumes against job descriptions, generates match scores, identifies missing skills, and provides personalized career guidance using Gemini AI.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Gemini AI'],
    github: 'https://github.com/shubhrato-badole/JobFit.git',
    live: 'https://job-fit-murex.vercel.app',
    color: '#8B5CF6',
  },
{
  id: 2,
  title: 'Spur — AI Support Agent',
  year: '2026',
  desc: 'Production RAG pipeline built from scratch — PDF parsing, Gemini embeddings, and pgvector semantic search via a Python FastAPI microservice, with Node.js handling business logic.',
  tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Gemini AI'],
  github: 'https://github.com/shubhrato-badole/spur-chat',
  live: 'https://spur-ai-support-agent-kappa.vercel.app',
  color: '#06B6D4',
},
  {
    id: 3,
    title: 'SafeSpeak',
    year: '2026',
    desc: 'Anonymous harassment evidence collection platform that enables victims to securely record, encrypt, and report incidents while protecting their identity through panic mode and privacy-first features.',
    tech: ['Flutter', 'Firebase', 'AES-256', 'SHA-256', 'PWA'],
    github: 'https://github.com/shubhrato-badole/secureharbor-evidence-collector.git',
    color: '#F59E0B',
  },

  {
  id: 4,
  title: 'SecureVault API',
  year: '2025',
  desc: 'Secure full-stack notes and task management app with JWT authentication, bcrypt password hashing, and encrypted protected routes via middleware.',
  tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'bcrypt'],
  github: 'https://github.com/shubhrato-badole/securevault-api',
  live: '',
  color: '#10B981',
},
];

export default PROJECTS;