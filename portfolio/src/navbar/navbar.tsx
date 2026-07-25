import { useEffect, useState } from "react";
import { UseVisitor } from "../context/VisitorContext";

function Navbar() {
  const { visitorName } = UseVisitor()
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const LINKS = [
    { label: 'About',    href: "#about" },
    { label: 'Skills',   href: '#skills' },
    { label: 'Projects', href: "#projects" },
    { label: 'Contact',  href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href:any) => {
    setMenuOpen(false)
    window.location.href = href
  }

  return (
    <>
      {/* terminal status strip -- hidden on very small screens to save vertical space */}
      <div className="hidden sm:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-6 h-7"
        style={{
          background: 'rgba(4,1,15,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
        <span className="font-mono text-[10px] text-slate-500 truncate">
          shubhrato@portfolio — <span className="text-violet-400">welcome, {visitorName}</span>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-400 flex-shrink-0 ml-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          online
        </span>
      </div>

      <nav className="fixed left-0 right-0 z-50 transition-all duration-300 top-0 sm:top-7"
        style={{
          background: scrolled || menuOpen ? 'rgba(3,0,16,0.9)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-['Syne'] font-bold text-white text-lg">
            SB<span className="text-violet-400">.</span>
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link, i) =>
              <div key={i} onClick={() => handleLinkClick(link.href)}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer">
                {link.label}
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 relative z-50"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-out"
          style={{
            maxHeight: menuOpen ? 300 : 0,
            borderTop: menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-5">
            {LINKS.map((link, i) =>
              <div key={i} onClick={() => handleLinkClick(link.href)}
                className="font-mono text-[13px] tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">
                {link.label}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;