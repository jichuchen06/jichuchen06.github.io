"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "all" | "shorts" | "commercials" | "prompts";
type ProjectId = "cyber-noir" | "gold-liquid" | "matrix-dream" | "analog-rust";

type Project = {
  id: ProjectId;
  category: Exclude<Category, "all">;
  title: string;
  subtitle: string;
  image: string;
  engine: string;
  prompt: string;
  concept: string;
  role: string;
  pipeline: string;
  seed: string;
  grading: string;
  year: string;
};

const projects: Project[] = [
  { id: "cyber-noir", category: "shorts", title: "《新潮汐 / NEOTIDE》", subtitle: "AIGC 科幻先锋短片 - 荣获 AI 影展最佳叙事奖", image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1200", engine: "// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS", prompt: "A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0", concept: "《新潮汐》是一部探索AI幻觉、后数字文明末日的实验短片。整个短片的生成过程避开了传统的镜头，完全依赖Midjourney生成的高保真帧图，并结合Runway的深度运动控制引擎来进行动态渲染。", role: "AI Video Director / Editor / Sound Design", pipeline: "Midjourney V6 + Runway Gen-3 + DaVinci", seed: "33092817293", grading: "Neo-noir Cyan and Decaying Amber", year: "2026" },
  { id: "gold-liquid", category: "commercials", title: "《液态重力 / LIQUID GRAVITY》", subtitle: "奢华概念广告 - AI 生成流体光影融合美学", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", engine: "// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING", prompt: "Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture --ar 16:9", concept: "此项目是为知名奢侈品牌定制的AI概念先导片。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的缠绕流动。", role: "AIGC Art Director / Keyframe Designer", pipeline: "Stable Diffusion + MJ V6 + Kling AI", seed: "5561029418", grading: "Warm Champagne Gold & Pitch Black", year: "2025" },
  { id: "matrix-dream", category: "prompts", title: "《母体纠缠 / MATRIX ENTANGLEMENT》", subtitle: "深度 Prompt 控制流 - 多维复杂提示词分镜系统", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200", engine: "// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW", prompt: "A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically --ar 2.39:1 --style raw", concept: "建立结构化提示词系统，通过精确控制噪点比例与语义解析分级，实现长镜头序列中物体和光影一致性。", role: "Lead Prompt Architect", pipeline: "Midjourney Matrix Blueprinting", seed: "998412039", grading: "Terminal Green & Monochromatic Shadows", year: "2026" },
  { id: "analog-rust", category: "shorts", title: "《旧磁铁与荒野 / ANALOG RUST》", subtitle: "35mm 模拟颗粒风格短片 - AIGC 怀旧主义探索", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200", engine: "// SYSTEM: SORA-COHESION_TEST_PROTOTYPE", prompt: "Earthy cinematic medium shot of a rusted retro magnetic recorder resting on damp tall grass, moody overcast sky, volumetric godrays --ar 16:9 --style raw", concept: "逆向探索70年代胶片杂质感和光学缺陷，强化粗糙现实属性。", role: "Director / Editor", pipeline: "Sora Beta + Luma Dream Machine", seed: "197410293", grading: "Faded Kodachrome Film emulation", year: "2026" },
];

export default function Home() {
  const [category, setCategory] = useState<Category>("all");
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    const els = document.querySelectorAll<HTMLElement>(".liquid-glass-btn");
    els.forEach((el) => el.addEventListener("mousemove", handler));
    return () => els.forEach((el) => el.removeEventListener("mousemove", handler));
  }, []);

  const filtered = useMemo(() => (category === "all" ? projects : projects.filter((p) => p.category === category)), [category]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] antialiased">
      <div className="film-grain" />
      <div className="mx-auto w-[95%] py-6 md:w-[78%] md:py-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#070707] shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(229,169,59,0.05),transparent_50%)]" />
          <nav className="glass-nav relative z-30 border-b border-white/5">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-3"><span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#FF3B30]" /><span className="text-sm font-bold uppercase tracking-[0.2em]">AIGC.STUDIO</span></div>
              <div className="hidden items-center space-x-6 text-xs tracking-widest text-gray-400 md:flex">
                <a href="#work-section" className="liquid-glass-btn rounded-lg px-2 py-1 hover:text-white">01 // WORK</a>
                <a href="#studio-section" className="liquid-glass-btn rounded-lg px-2 py-1 hover:text-white">02 // STUDIO</a>
                <a href="#about-section" className="liquid-glass-btn rounded-lg px-2 py-1 hover:text-white">03 // ABOUT</a>
                <a href="mailto:director@aigc.studio" className="liquid-glass-btn rounded-lg px-4 py-2 text-white">DIRECT CONTACT</a>
              </div>
            </div>
          </nav>

          <header className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden px-6 pb-12 pt-28 md:min-h-screen md:pt-36">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-25 brightness-[0.4] contrast-[1.1]"><source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3dc26d36e2f69421df65f72439&profile_id=139&oauth2_token_id=57447761" type="video/mp4" /></video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
            </div>
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center">
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#E5A93B]">// WORLD-BUILDING VIA LATENT SPACE</p>
              <h1 className="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl">DIRECTING <br /><span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent">THE LATENT ERA.</span></h1>
              <p className="mb-10 max-w-xl text-sm leading-relaxed text-gray-300 md:text-xl">我是 AIGC 视觉导演、Prompt 架构师。通过潜空间、扩散模型以及时序模型，重构电影镜头美学，探索数字叙事的物理边界。</p>
              <div className="flex flex-wrap gap-4"><a href="#work-section" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wider text-white">浏览最新作品（SHORTS）</a><a href="#studio-section" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm tracking-wider text-gray-300">// 进入 AIGC 控制台</a></div>
            </div>
            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 border-t border-white/5 pt-16 text-xs text-gray-500 md:grid-cols-4">
              <div><p className="text-gray-300">// CORE ENGINE</p><p className="mt-1">Midjourney V6 / Runway Gen-3 / Sora</p></div>
              <div><p className="text-gray-300">// RECENT ACCOLADES</p><p className="mt-1">AI Film Fest Gold Winner '25</p></div>
              <div><p className="text-gray-300">// ACTIVE REGION</p><p className="mt-1">Tokyo / Las Vegas / Decentered</p></div>
              <div><p className="text-gray-300">// STATUS</p><p className="mt-1 flex items-center gap-1 text-[#E5A93B]"><span className="h-1.5 w-1.5 rounded-full bg-[#E5A93B]" /> GENERATING NEXT</p></div>
            </div>
          </header>

          <section id="work-section" className="relative z-10 mx-auto max-w-7xl border-t border-white/5 px-6 py-24">
            <span className="text-xs tracking-[0.2em] text-[#E5A93B]">// 01 / CINEMATIC ARCHIVES</span>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">{filtered.map((p) => <button key={p.id} onClick={() => setActive(p)} className="project-card group text-left"><div className="relative overflow-hidden rounded border border-white/5"><img src={p.image} alt={p.title} className="aspect-video w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" /></div><div className="mt-4 flex justify-between"><div><h3 className="text-xl font-bold group-hover:text-[#E5A93B]">{p.title}</h3><p className="mt-1 text-xs text-gray-500">{p.subtitle}</p></div><span className="text-xs text-gray-500">// {p.year}</span></div></button>)}</div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs">{(["all","shorts","commercials","prompts"] as Category[]).map((c)=><button key={c} onClick={()=>setCategory(c)} className={`liquid-glass-btn rounded-lg px-4 py-2 ${category===c?"border-[#E5A93B]/40 text-white":"text-gray-400"}`}>{c.toUpperCase()}</button>)}</div>
          </section>
        </div>
      </div>

      {active && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 p-6 backdrop-blur-2xl"><div className="mx-auto max-w-5xl"><button onClick={() => setActive(null)} className="liquid-glass-btn mb-6 rounded-full px-4 py-2 text-xs">CLOSE / EXIT ✕</button><img src={active.image} alt={active.title} className="aspect-video w-full rounded border border-white/10 object-cover" /><h2 className="mt-6 text-4xl font-black">{active.title}</h2><p className="mt-2 text-gray-400">{active.subtitle}</p><p className="mt-4 text-sm text-gray-300">{active.prompt}</p></div></div>}
    </div>
  );
}
