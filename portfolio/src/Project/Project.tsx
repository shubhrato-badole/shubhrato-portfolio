import {useState} from 'react';
import ProjectData from './ProjectData';




function Project (){
    const [hovered, setHovered] = useState<number | null>(null)

    return(
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
    <div className="font-['Syne'] text-slate-500 font-mono text-[12px] tracking-[0.25em] text-primary uppercase mb-3">
          03 / Projects
    </div>
     <div className="flex items-end justify-between mb-12">
        <h2
          className="font-['Syne'] font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Things I've{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Built
          </span>
        </h2>

        <a href="https://github.com/shubhrato-badole"
        className="font-mono text-slate-500 font-['Syne'] text-[14px] hover:text-white transition-colors duration-300" >View
all on GitHub →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {ProjectData.map((project) => (
            <div key={project.id}
              onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)} 
            className= "rounded-xl overflow-hidden transition-all duration-300 cursor-default"
            style={{
                 background:  '#0a0118',
                  border:      '1px solid rgba(255,255,255,0.07)',
                 transform:   hovered === project.id ? 'translateY(-6px) scale(1.05)' : 'none' ,
                  boxShadow:   hovered === project.id
                ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${project.color}18`
                : 'none',
            }}>
             <div className="h-[3px] " style={{ background: project.color }}></div>
             <div className="p-6">
                <div className= "flex items-start justify-between mb-3">
                    <div>
                  <div className="font-mono text-[11px] text-slate-600 mb-1">
                    {project.year}
                  </div>
                  <h3 className="font-['Syne'] font-bold text-white text-lg">
                    {project.title}
                  </h3>
                </div>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{
                    background: project.color + '20',
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                  }}
                >
                  ⬡
                </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {project.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    {project.tech.slice(0, 4).map((tech=>
                    <span key={tech}
                    className="text-sm text-mono text-[11px] px-2 py-1 rounded-full "
                    style={{
                        background: project.color + '15',
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                    }}>
                
                        {tech}
                        </span>
                    ))}
                     
                     {project.tech.length > 4 &&
                     <span className="font-mono text-xs px-2.5 py-1 rounded-full text-slate-600 border border-slate-800">
                        +{project.tech.length - 4}
                     </span>
                     }

                </div>
                <div className=" flex items-senter justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-600 font-mono">click to explore →</span>
                  <div>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <span  className="font-mono text-xs text-slate-500 hover:text-white transition-colors"
                      > GitHub</span>
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <span  className="font-mono text-xs hover:text-white transition-colors"
                          style={{ color: project.color, marginLeft: '12px'}}
                          > Live ↗</span>
                        </a>
                    )}
                  </div>
                  
                </div>


             </div>
            

                
            
            </div>
        ))}
        </div>
    </section>
    )

}

export default Project;