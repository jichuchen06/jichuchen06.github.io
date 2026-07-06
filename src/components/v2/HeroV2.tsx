import type { Project } from '@/data/projects';

type HeroV2Props = {
  featuredProjects: Project[];
};

export default function HeroV2({ featuredProjects }: HeroV2Props) {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden border-b border-white/10 bg-[#050505] px-5 pb-14 pt-28 text-white sm:px-6 lg:px-10">
      <div className="absolute inset-0 -z-20">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-35 brightness-75 contrast-125">
          <source src="/backgrounds/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(229,169,59,0.18),transparent_28%),linear-gradient(180deg,rgba(5,5,5,0.75),#050505_88%)]" />

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff3b30] shadow-[0_0_18px_rgba(255,59,48,0.8)]" />
            AIGC.STUDIO V2
          </a>
          <div className="hidden items-center gap-6 text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400 sm:flex">
            <a href="#works" className="transition hover:text-white">Works</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-[#E5A93B]/60">Contact</a>
          </div>
        </div>
      </nav>

      <div id="top" className="mx-auto flex max-w-7xl flex-col gap-12 lg:min-h-[72svh] lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl pt-14">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-[#E5A93B]">{'// Filmic AIGC Portfolio'}</p>
          <h1 className="text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl">
            Visual Works<br />in the AI Era.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            黑色电影感的 AIGC 作品集，聚焦广告短片、AI MV、实拍影像与竖屏社媒内容。先以稳定、静态、可维护的方式呈现作品本身。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#works" className="rounded-full border border-[#E5A93B]/50 bg-[#E5A93B]/10 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-[#E5A93B]/20">View Works</a>
            <a href="#contact" className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur transition hover:border-white/35">Start a Project</a>
          </div>
        </div>

        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3 lg:max-w-md">
          {featuredProjects.slice(0, 3).map((project) => (
            <a key={project.id} href="#works" className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md transition hover:border-[#E5A93B]/40">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
                <img src={project.coverSrc} alt={project.title} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              </div>
              <p className="mt-3 line-clamp-1 px-1 text-xs font-bold text-white">{project.title}</p>
              <p className="px-1 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">{project.aspectRatio}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
