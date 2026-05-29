import {useState} from 'react';


const SKILLS = [
  { name: 'React',       icon: '⚛️',  level: 70, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript',  icon: '🔷',  level: 65, category: 'frontend', color: '#3178C6' },
  { name: 'Next.js',     icon: '▲',   level: 60, category: 'frontend', color: '#ffffff' },
  { name: 'Tailwind',    icon: '🎨',  level: 70, category: 'frontend', color: '#06B6D4' },
  { name: 'Node.js',     icon: '🟢',  level: 60, category: 'backend',  color: '#339933' },
  { name: 'Python',      icon: '🐍',  level: 55, category: 'backend',  color: '#3776AB' },
  { name: 'PostgreSQL',  icon: '🐘',  level: 50, category: 'backend',  color: '#4169E1' },
  { name: 'Docker',      icon: '🐳',  level: 45, category: 'tools',    color: '#2496ED' },
  { name: 'Git',         icon: '📦',  level: 75, category: 'tools',    color: '#F05032' },

];

 type Category = 'all' | 'frontend' | 'backend' | 'tools'

 function Skills(){
    const [ category, setCategory] = useState<Category>('all')
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
   
    const filteredSkills = category === 'all' ? SKILLS : SKILLS.filter(skills => skills.category === category)
  


    return(
        <section id="skills" className="max-w-6xl mx-auto px-6 py-24" > 
        <div className = " font-[Syne] text-slate-500 text-[15px] tracking-[0.25em] uppercase mb-3 ">
         02 / Skills
        </div>
        
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 ">
           <h2 className="font-[Syne] text-white font-bold"
         style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}> Tech I  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Work With</span> </h2>


            <div className = "flex items-center gap-4">
            {(['all', 'frontend', 'backend', 'tools']as Category[]).map((cat) =>(
                <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className= "px-4 py-2 rounded-full font-mono text-[11px] capitalize transition-all duration-200"
                style={{
                background:   category === cat ? 'rgba(139,92,246,0.2)' : 'transparent',
                border:       `1px solid ${category === cat ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
                color:        category === cat ? '#A78BFA' : '#475569',
              }}>
                    {cat.toUpperCase()}
                </button>
            ))}

            </div>
             </div>

           <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {filteredSkills.map((skill =>
        <div  key={skill.name} 
        className="relative font-[Syne] text-slate-400 rounded-xl p-5 flex flex-col items-center justify-center gap-3 min-h-[110px] text-center transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
        style={{
              background:  hoveredSkill === skill.name ? `${skill.color}18` : 'rgba(255,255,255,0.03)',
              border:      `1px solid ${hoveredSkill === skill.name ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
              transform:   hoveredSkill === skill.name ? 'translateY(-3px) scale(1.04)'  : 'none',
              boxShadow:   hoveredSkill === skill.name ? `0 0 30px ${skill.color}22` : 'none',
            }}>
            <span className="text-2xl">{skill.icon}</span> 
            <span className="font-mono text-xs text-slate-400">{skill.name}</span>
            
            
            
            
            {hoveredSkill === skill.name && (
            <div  className="absolute -top-16 left-1/2 w-44 rounded-xl p-3 z-20 "
        style={{
          background: 'rgba(10,1,24,0.96)',
          border: `1px solid ${skill.color}40`,
          opacity: hoveredSkill === skill.name ? 1 : 0,
          transform: `translate(-50%, ${hoveredSkill === skill.name ? '0px' : '8px'})`,
          transition: ' opacity 0.2s ease, transform 0.2s ease',
          boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
          backdropFilter: 'blur(12px)',
        }}>
             <div className="flex justify-between items-center font-mono text-[10px] mb-1">
                <span>level</span>
                <span style={{ color: skill.color }}>{skill.level}%</span>
             </div>
             <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, background: skill.color }}
                  />
                </div>
                <div
             className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
          style={{ background: '#0a0118', border: `0 0 1px 1px ${skill.color}40` }}
     
        />
            </div>
            )}   
            </div>
        ))}
           </div>


        



        </section>
    )
}

export default Skills;