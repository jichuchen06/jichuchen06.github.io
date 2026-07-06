'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/data/projects';
import ProjectModalV2 from './ProjectModalV2';

type WorkGridV2Props = {
  projects: Project[];
};

const filters = [
  { key: 'all', label: 'All' },
  { key: 'shorts', label: 'Shorts' },
  { key: 'commercials', label: 'Commercials' },
  { key: 'prompts', label: 'AIGC / Prompt' },
] as const;

export default function WorkGridV2({ projects }: WorkGridV2Props) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['key']>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="works" className="bg-[#050505] px-5 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#E5A93B]">{'// 01 Cinematic Archive'}</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">Selected Works</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">保留作品卡片、详情弹窗与外部链接跳转；以移动端优先的玻璃卡片重建作品目录。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${activeFilter === filter.key ? 'border-[#E5A93B]/60 bg-[#E5A93B]/10 text-white' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-white'}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <article key={project.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-2 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#E5A93B]/40">
              <button type="button" onClick={() => setSelectedProject(project)} className="block w-full text-left">
                <div className={`overflow-hidden rounded-[1.35rem] bg-zinc-950 ${project.aspectRatio === 'vertical' ? 'aspect-[9/16] sm:mx-auto sm:max-w-[330px]' : 'aspect-video'}`}>
                  <img src={project.coverSrc} alt={project.title} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    <span className="rounded-full border border-white/10 px-2 py-1">{project.category}</span>
                    <span className="rounded-full border border-white/10 px-2 py-1">{project.aspectRatio === 'vertical' ? '9:16' : '16:9'}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.03em] text-white transition group-hover:text-[#E5A93B]">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{project.subtitle}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">View Blueprint</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <ProjectModalV2 project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
