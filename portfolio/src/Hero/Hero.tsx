import { UseVisitor } from "../context/VisitorContext";
import { useEffect, useState } from "react";
import Canvas  from    '../components/StarCanvas'


const ROLES = [
  'Full Stack Developer',
  'UI / UX Enthusiast',
  'Cybersecurity Explorer',
  'Problem Solver',
  'Open Source Contributor',
]

function Hero () {
    const { visitorName } = UseVisitor()
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
       const currentText:string = ROLES[index];
       const timeout = setTimeout(() => {
        if(!deleting){
          setText(currentText.slice(0, text.length + 1));
          if(currentText === text){
            setTimeout(() =>  setDeleting(true), 1000)
          }
        }else{
            setText(text.slice(0,text.length-1))

            if(text === ""){
            setDeleting(false)
            setIndex((index + 1) % ROLES.length)
            }
          }
    } , deleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [text, deleting, index])
    
    return(
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Canvas />

         <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute top-4 left-4 font-mono text-[13px] text-slate-500 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
        welcome, <span className="text-violet-400 ">{visitorName}</span>
      </div>
       <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[11px] text-violet-300 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Available for work
      </div>
      <div className="text-center z-10 px-6 max-w-4xl">

        <div className="font-mono text-[11px] text-violet-400/80 tracking-[0.3em] uppercase mb-4">
          Hello World ·/·
        </div>

        <h1 className="font-['Syne'] font-bold leading-none mb-5"
          style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' ,  transitionProperty: 'all',
  transitionDuration: '700ms',
  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)'}}>
          <span className="text-white">SHUBHRATO </span>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            BADOLE
          </span>
        </h1>

        <div className="font-['Syne'] font-bold text-[clamp(1.8rem,5vw,1.5rem)] mb-8 h-8  text-slate-300 transtion-all duration-300  tracking-wide">
           {text}
         
        </div>

        <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed text-[15px]">
          I build fast, beautiful, and secure web apps. Passionate about
          clean code, great UX, and cybersecurity.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="#projects"
            className="px-6 py-3 rounded-xl font-['Syne'] font-medium text-white text-sm bg-gradient-to-r from-violet-700 to-violet-500 border border-violet-500/50 hover:bg-violet-400/50 hover:border-violet-400/50 hover:-translate-y-1 transition-colors duration-500 ease-out">
            View My Work
          </a>
          <a href="#contact"
            className="px-6 py-3 rounded-xl font-['Syne'] font-medium text-violet-300 text-sm border border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/10 hover:-translate-y-1 transition-colors duration-300">
            Hire Me
          </a>
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