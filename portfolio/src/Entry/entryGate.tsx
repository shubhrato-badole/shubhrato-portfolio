import { useState , useEffect , useRef } from "react";
import VibeCheck from './VibeCheck'

type EntryGateProps = {
  onDone: (name: string) => void;
}; 
function EntryGate({onDone}:EntryGateProps) {
const [phase, setPhase] = useState("typing");
const [showInput, setShowInput] = useState(false)
const [val, setVal] = useState("");
const [gretting , setGretting] = useState("");
const [curser , setCurser] = useState(true);
const [name , setName] = useState("");

const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const  text = "who's there?" ; let i = 0;
    const interval = setInterval(() => {
       setGretting(text.slice(0 , i+1)); i++;
       if(i >= text.length){
        clearInterval(interval);
        setTimeout(()=> setShowInput(true), 400)
       } },  80)
        
         return () => clearInterval(interval)
    
    },[])



  useEffect(() => {
    const intervial  = setInterval(() => 
        setCurser(prev => !prev)  ,530)
return () =>clearInterval(intervial)
} ,[])


  useEffect (()=>{
    if(showInput)
setTimeout(()=> inputRef.current?.focus(), 200)
    
}, [showInput] )


const submit = () => {const n = val.trim(); if(!n) return ; setName(n); setPhase("vibecheck")}

if(phase === "vibecheck") return <VibeCheck name={name} onDone={() => onDone(name)} />


return(
    <div className="min-h-screen bg-[#030010] flex items-center justify-center relative overflow-hidden">
  <div className=" absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[80px] pointer-events-none"/>
    <div className="text-center z-10 px-6">
        
        <div className="font-mono text-l font-mono text-[13px] uppercase text-slate-300 mb-10 ">
          {gretting} <span className="inline-block w-[2px] h-[1em] bg-violet-500 align-middle ml-[3px]" style={{ opacity: curser ? 1 : 0 }}></span>
        </div>


    {showInput && (
   <div className="flex flex-col items-center gap-6 animate-fadeUp">
     
     <div className="relative">
            <input type="text" 
           ref={inputRef}
           spellCheck={false}
            value={val}
            onChange={(e) => setVal(e.target.value)}
             onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="your name "
            className="bg-transparent font-['Syne'] text-[clamp(1.8rem,5vw,2.5rem)] text-white text-center outline-none w-[300px] pb-[10px] border-none border-b border-b-violet-500/35 caret-violet-500"
             />
            

            <div
  className="absolute bottom-0 left-0 h-[1px] bg-violet-500 transition-all duration-300"
  style={{ width: val ? "100%" : "0%" }}
/>
      </div>

            <div
            className="flex items-center gap-2 font-mono text-xs text-slate-700 transition-opacity duration-300"
            style={{ opacity: val ? 1 : 0 }}
          >
            press

            <kbd className="border border-violet-500/30 bg-violet-500/10 text-slate-400 px-2 py-[2px] rounded text-[11px]">
              ENTER
            </kbd>

            to start your vibe check
          </div>

       </div>
        
)}

  </div>
    </div>
)


}
export default EntryGate;










