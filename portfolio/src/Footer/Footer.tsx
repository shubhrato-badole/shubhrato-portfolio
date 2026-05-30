export default function Footer() {
  return (
    <footer
      className="text-center py-8 border-t border-white/[0.04]"
    >
      <p className="font-mono text-xs text-slate-700">
        Designed & built by{' '}
        <span className="text-violet-400">Shubhrato Badole</span>
        {' '}· {new Date().getFullYear()}
      </p>
      <p className="font-mono text-xs text-slate-800 mt-1">
        Made with React + TypeScript + Tailwind
      </p>
    </footer>
  )
}