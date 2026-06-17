
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
    title: 'Spur AI Support Agent',
    year: '2026',
    desc: 'AI-powered customer support agent that answers questions about company policies using Gemini AI, with PostgreSQL persistence, Redis caching, and conversation history management.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Gemini AI'],
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
];

export default PROJECTS;