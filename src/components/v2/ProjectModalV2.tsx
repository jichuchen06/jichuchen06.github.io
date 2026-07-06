'use client';

import { useEffect } from 'react';
import type { Project } from '@/data/projects';

type ProjectModalV2Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModalV2({ project, onClose }: ProjectModalV2Props) {
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/95 px-4 py-5 text-white backdrop-blur-xl sm:px-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="mx-auto min-h-[100dvh] w-full max-w-6xl py-6 sm:py-10">
        <button onClick={onClose} className="sticky top-4 z-10 mb-5 rounded-full border border-white/15 bg-black/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 backdrop-blur transition hover:border-[#E5A93B]/60 hover:text-white">
          ← Back
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-2xl">
          <a href={project.fullVideoUrl.trim()} target="_blank" rel="noopener noreferrer" className="group relative block border-b border-white/10 bg-zinc-950 p-2">
            <div className={`mx-auto overflow-hidden rounded-[1.5rem] ${project.aspectRatio === 'vertical' ? 'aspect-[9/16] max-w-sm' : 'aspect-video'}`}>
              <img src={project.coverSrc} alt={project.title} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
              <span className="rounded-full border border-white/20 bg-black/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em]">Open External Link ↗</span>
            </div>
          </a>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.6fr_0.9fr] lg:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#E5A93B]">{project.engine}</p>
              <h2 id="project-modal-title" className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">{project.title}</h2>
              <p className="mt-3 text-base leading-7 text-zinc-400">{project.subtitle}</p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-[#E5A93B]">Creative Workflow</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{project.workflow}</p>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">Directing Concept</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{project.concept}</p>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/40 p-5 font-mono text-xs">
              <h3 className="border-b border-white/10 pb-4 uppercase tracking-[0.22em] text-white">Project Metadata</h3>
              <dl className="mt-5 space-y-5">
                {[
                  ['ROLE', project.role],
                  ['PIPELINE', project.pipeline],
                  ['DURATION', project.duration],
                  ['FORMAT', project.format],
                  ['STRATEGY', project.visualStrategy],
                  ['GRADING', project.grading],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-zinc-500">{label}</dt>
                    <dd className="mt-1 leading-6 text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>
              <a href={project.fullVideoUrl.trim()} target="_blank" rel="noopener noreferrer" className="mt-8 block rounded-full border border-[#E5A93B]/45 bg-[#E5A93B]/10 px-5 py-3 text-center uppercase tracking-[0.2em] text-white transition hover:bg-[#E5A93B]/20">
                Watch Work ↗
              </a>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
