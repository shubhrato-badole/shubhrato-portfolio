import { useState , useEffect} from "react";

   const SCAN_STEPS = [
  "Scanning visitor...",
  "Checking vibe... ✓",
  "Measuring curiosity level... HIGH ✓",
  "Detecting coffee dependency... CRITICAL ✓",
  "Vibe check passed. Welcome aboard 🚀",
]

interface VibeCheckProps {
  name: string
  onDone: () => void
}

function VibeCheck({name , onDone}:VibeCheckProps){
  const [steps ,setSteps ] = useState(0);
  const [prog, setProg]   = useState(0)
  const [rot,  setRot]    = useState(0)

  useEffect(() => {
     SCAN_STEPS.forEach((_,i) =>{
     setTimeout(() => {
        setSteps(i+1)
     }, i*700 ) });

    const total = 3600
    let elapsed = 0;
  const bar =   setInterval(()=>{
    elapsed += 30 
    setProg(Math.min(100 , Math.round((elapsed / total)*100))) 
    if(elapsed >= total){
        clearInterval(bar);
        setTimeout(onDone, 300)
    }
  }, 30)

const spin = setInterval(() => {
    setRot(r => r + 4)
}, 16);

return () => {
      clearInterval(bar)
      clearInterval(spin)
    }


  }, [])


return(
    <div className="min-h-screen bg-[#030010] flex items-center justify-center relative overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-md w-full">
        <div className=" w-16 h-16 rounded-full bg-gradient-to-br from-violet-700 to-violet-500 mx-auto mb-6 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)]"
        style={{ transform: `rotate(${rot}deg)` }}>
                      ⚡
        </div>
           <div className="text-sm text-slate-500 font-mono tracking-[0.25em] uppercase mb-3">VIBE CHECK</div>
           <div className="font-['Syne'] font-bold text-[clamp(1.8rem,5vw,2.8rem)] mb-8 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{name}</div>
         
         
         <div className="bg-white/[0.02] border border-violet-500/15 p-4 rounded-xl mb-6 text-left">
            {SCAN_STEPS.map((s , i ) =>
              <div key={i} className="flex items-center gap-3 py-[5px] font-mono text-[13px] transition-opacity duration-300">
                <span
                className="text-[15px] flex-shrink-0 transition-colors duration-300"
                style={{ color: steps > i ? '#4ADE80' : '#334155' }}
              >
                  {steps > i ? '✓' : '○'}
                 </span>
                <span style={{ color: steps > i ? '#94A3B8' : '#334155' }}>
                {s}
              </span>
              </div>
            )}
         </div>
  

         <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-[30ms]"
            style={{width:`${prog}%`}} />
            </div>
                 <div className="font-mono text-[11px] text-slate-700">{prog}%  
             </div>
               </div>
    </div>

)



}

export default VibeCheck