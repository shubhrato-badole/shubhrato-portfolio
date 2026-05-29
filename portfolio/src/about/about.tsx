import { UseVisitor } from "../context/VisitorContext";


function About (){
const {visitorName} = UseVisitor()

const facts = [
  { icon: '🎓', label: 'Degree', value: 'B.Tech Computer Science' },
  { icon: '📍', label: 'Location', value: 'Nagpur, India' },
  { icon: '🌱', label: 'Experience', value: 'Fresher' },
  { icon: '🚀', label: 'Projects', value: '4+ Built' },
]


return(
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
    <div className="fotn['Syne] text-slate-500 font-mono text-[12px] tracking-[0.25em] text-primary uppercase mb-3">
        01 / About
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
     <div className= "flex-1 felx-col">
     <h2 className="font-['Syne'] font-bold text-white mb-6 
      " style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>Hey {visitorName}, <br /> 
    <span className="text-primary bg-gradient-to-r 
      from-violet-400 to-cyan-400 bg-clip-text text-transparent"> I build things.</span>
      </h2>

      <p className="text-slate-400 ">I'm a Full Stack Developer passionate about 
        crafting digital experiences that are both beautiful and 
        technically solid. From pixel-perfect Uls to scalable backend 
        systems — I care about every layer.</p>
        
        <p className="text-slate-400 mt-5">When I'm not coding, I'm exploring cybersecurity, contributing to open 
            source, or breaking things in my homelab to 
            understand how they work.</p>

            <p className="text-purple-400 mt-6">I believe the best code is code that solves real problems for real people - elegantly.</p>
            <div className="grid grid-cols-2 gap-4 mt-10"> 
              {facts.map((fact) => (
                <div key={fact.icon} className="bg-white/[0.03] border border-purple-400/[0.3] rounded-xl p-4 hover:bg-purple-600/[0.05] hover:border-violet-400/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-500 ease-out ">
                 <span className="text-2xl mr-3">{fact.icon}</span> <br />
                 <span className="text-slate-400 mb-0.5 ">{fact.label} </span> <br /> 
                 <span className="text-white ">{fact.value}</span>
                </div>
              ))}
            </div>
     </div>

     <div className="flex-1 relative rounded-2xl overflow-hidden border border-violet-500/20"
     style={{ background: '#0a0118', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
       <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06] "
        style={{ background: 'rgba(255,255,255,0.03)' }} >
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        <div className="font-mono text-[11px] text-slate-600 ml-auto">developer.ts</div>
        </div>
         
         <div className="p-8 font-mono text-[15px] leading-8 "style={{ minHeight: '320px' }}>
            {[
              ['#E2E8F0', 'const developer = {'],
              ['#A78BFA', '  name: "Shubhrato Badole",'],
              ['#A78BFA', '  role: "Full Stack Dev",'],
              ['#E2E8F0', '  loves: ['],
              ['#34D399', '    "TypeScript", "React",'],
              ['#34D399', '    "Clean Code", "UX",'],
              ['#E2E8F0', '  ],'],
              ['#F59E0B', '  isAvailable: true,'],
              ['#06B6D4', '  solve: (p) => ☕ + code'],
              ['#E2E8F0', '}'],
            ].map(([color, text ], i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-700 text-[11px] w-4 text-right select-none">
                  {i + 1}
                </span>
                <span style={{ color }} className="font-mono text-[15px]">
                  {text}
                </span>
              </div>
            ))}
         </div>
       </div>
        
    </div>
    </section>
)
}

export default About;




  {/* <div className="rounded-2xl overflow-hidden border border-violet-500/20"
          style={{ background: '#0a0118', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>

          {/* Window chrome */}
          {/* <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
            <span className="font-mono text-[11px] text-slate-600 ml-auto">developer.ts</span>
          </div>

          {/* Code lines */}
          {/* <div className="p-6 font-mono text-sm leading-7">
            {[
              ['#E2E8F0', 'const developer = {'],
              ['#A78BFA', '  name: "Shubhrato Badole",'],
              ['#A78BFA', '  role: "Full Stack Dev",'],
              ['#E2E8F0', '  loves: ['],
              ['#34D399', '    "TypeScript", "React",'],
              ['#34D399', '    "Clean Code", "UX",'],
              ['#E2E8F0', '  ],'],
              ['#F59E0B', '  isAvailable: true,'],
              ['#06B6D4', '  solve: (p) => ☕ + code'],
              ['#E2E8F0', '}'],
            ].map(([color, text], i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-700 text-[11px] w-4 text-right select-none">
                  {i + 1}
                </span>
                <span style={{ color }}>{text}</span>
              </div>
            ))}
          </div>

        </div> */} 