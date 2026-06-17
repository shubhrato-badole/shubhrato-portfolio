import EntryGate from "./Entry/entryGate";
import { UseVisitor } from './context/VisitorContext'
import Hero from './Hero/Hero'
import  Navbar from './navbar/navbar'
import About from './about/about'
import Skills from "./Skills/skills"
import Projects from "./Project/Project";
import Contact from "./Contact/Contact"
import Footer from "./Footer/Footer"


export default function App() {
    const { hasEntered, setHasEntered, setVisitorName } = UseVisitor()

   
  
  if(!hasEntered){
    return (<EntryGate
  onDone={(name: string) => {
    setVisitorName(name);
    setHasEntered(true);
  }}
/>)
  }

  return (
 
 <div className="min-h-screen bg-[#030010]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
     < Footer />
    </div>
  )
}

