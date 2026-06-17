import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { UseVisitor } from "../context/VisitorContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type Status = "idle" | "sending" | "sent" | "error";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/shubhrato-badole",
    icon: FaGithub,
    color: "#ffffff",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shubhrato-badole-5096381ba/",
    icon: FaLinkedin,
    color: "#0A66C2",
  },
];

const inputClass = `w-full bg-transparent font-body text-white outline-none py-3 transition-colors placeholder:text-slate-700`
  const inputStyle = { borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '15px' }
  const focusStyle = 'focus:border-primary'

function Contact() {
  const { visitorName } = UseVisitor();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    console.log({
  from_name: form.name,
  from_email: form.email,
  message: form.message,
});
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: visitorName || '', email: '', message: '' })
    } catch(error){
     console.error("EmailJS Error:", error);
  setStatus("error");
    }
  }






  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <div className="font-['Syne'] text-slate-400 font-mono text-[12px] mb-4">
        {" "}
        04 / CONTACT
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
      <h2 className="text-3xl font-bold text-white font-['Syne'] mb-3 text-xl"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }} >{visitorName}, let's  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> build together.</span></h2>
      
       <p className="text-slate-400 leading-relaxed mb-10" style={{ fontSize: '15px' }}>
              I'm always open to new projects, interesting ideas, and great teams.
              Whether you have a job offer, a collaboration, or just want to say hi —
              my inbox is open.
            </p>
      
          <div className="space-y-4 mb-10">
            <a
                href="mailto:bshubhrato@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <span className="text-primary text-slate-500">@</span>
                </div>
                <span className="font-mono text-sm text-slate-400 group-hover:text-white transition-colors">
                  bshubhrato@gmail.com
                </span>
              </a>

          </div>
          <div className="flex gap-2">
            {socials.map((social) => {
  const Icon = social.icon;

  return (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={24} color={social.color} />
    </a>
  );
})}
          </div>
      </div>
      <div >
        {status === 'sent' ? (<motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" h-full flex flex-col items-center justify-center text-center gap-4 py-12"
        >  <div className="text-5xl">🚀</div>
                <div className="font-display text-2xl text-white font-bold">Message sent!</div>
                <p className="text-slate-400 text-sm">
                  Thanks{visitorName ? `, ${visitorName}` : ''}! I'll reply within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-xs text-primary mt-2 bg-purple-600 text-white text-bold text-sm border border-purple-600 rounded-full px-4 py-2 hover:bg-primary/20 transition-colors duration-200"
                >
                  Send another →
                </button>

        </motion.div>) : <form className="space-y-6" onSubmit={handleSubmit}>{(['name', 'email', 'message']as const).map((f, i) =>
        <div key={f}>
            <label  className="font-mono text-xs text-slate-600 tracking-widest block mb-2 uppercase">
                {f}
            </label>
            {f === 'message' ?(
                <textarea name={f} 
                value = {form[f]}
                onChange={handleChange}
                rows={4}
                placeholder={f === 'message' ? "What's on your mind?" : ''}
                        className={`${inputClass} ${focusStyle} resize-none`}
                        style={inputStyle}
                >

                </textarea>
            ):(
            <input type={f === 'email' ? 'email' : 'text'} 
                    name={f}
                    value ={form[f]}
                    onChange={handleChange}
                    placeholder={f === 'name' ? 'Your name' : 'your@email.com'}
                    className={`${inputClass} ${focusStyle}`}
                        style={{
                          ...inputStyle,
                          transitionDelay: `${i * 50}ms`,
                        }}
            />
                    )}
             </div> )
                }
             
               <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full font-display text-sm py-4 bg-purple-600 text-white font-['Syne'] rounded-lg disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </span>
                  ) : 'Send Message →'}
                </button>
                 {status === 'error' && (
                  <p className="font-mono text-xs text-red-400 text-center">
                    Something went wrong. Try emailing directly.
                  </p>
                )}

              
         </form> }
      </div>

      </div>
    </section>
  );
}

export default Contact;
