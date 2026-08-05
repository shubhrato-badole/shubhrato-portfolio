import { AnimatePresence, motion } from "framer-motion"
import EntryGate from "./Entry/entryGate";
import { UseVisitor } from './context/VisitorContext'
import Hero from './Hero/Hero'
import  Navbar from './navbar/navbar'
import About from './about/about'
import Skills from "./Skills/skills"
import Projects from "./Project/Project";
import Contact from "./Contact/Contact"
import Footer from "./Footer/Footer"
import ChatWidget from './components/ChatWidget'


export default function App() {
  const { hasEntered, setHasEntered, setVisitorName } = UseVisitor()

  return (
    <AnimatePresence mode="wait">
      {!hasEntered ? (
        <EntryGate
          key="entry"
          onDone={(name: string) => {
            setVisitorName(name);
            setHasEntered(true);
          }}
        />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen bg-[#030010]"
        >
          <Navbar />
          <ChatWidget />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}