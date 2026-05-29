import { useEffect, useState } from "react";



function Navbar() {
 const [scrolled, setScrolled] = useState(false);


const LINKS =[
    {lable:'about ', href:"#about"},
    {lable: 'Skills',   href: '#skills' },
    {lable: 'projects', href:"#projects"},
    {lable:'contact ', href:"#contact"},  
]

useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

    return(
         <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         style={{
        background: scrolled ? 'rgba(3,0,16,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
         
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-88">
          <span className="font-['Syne'] font-bold text-white ml-5 text-lg">
          SB<span className="text-violet-400">.</span>
        </span>
       
        <div className= "hidden md:flex items-center gap-8">
        {LINKS.map((links, i) =>
            <div key={i} onClick={() => window.location.href = links.href}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer">
                {links.lable}
            </div>
        )}
       </div>


          </div>
         </nav>
    )
}

export default Navbar;