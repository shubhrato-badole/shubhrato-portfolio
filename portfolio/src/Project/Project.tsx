import { useState } from 'react';
import ProjectData from './ProjectData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

function Project() {
  const [selected, setSelected] = useState<typeof ProjectData[number] | null>(null)

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <div className="font-['Syne'] text-slate-500 font-mono text-[12px] tracking-[0.25em] text-primary uppercase mb-3">
        03 / Projects
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <h2
          className="font-['Syne'] font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Things I've{' '}
          <span style={{ color: '#a78bfa' }}>
            Built
          </span>
        </h2>

        <a href="https://github.com/shubhrato-badole"
          target="_blank" rel="noopener noreferrer"
          className="font-mono text-slate-500 font-['Syne'] text-[14px] hover:text-white transition-colors duration-300">
          View all on GitHub →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ProjectData.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

export default Project;