"use client";

import { useMemo, useState } from "react";

type Category = "all" | "shorts" | "commercials" | "prompts";

type Project = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  subtitle: string;
  image: string;
  year: string;
  engine: string;
  prompt: string;
  concept: string;
  role: string;
  pipeline: string;
  seed: string;
  grading: string;
};

const projects: Project[] = [
  {
    id: "cyber-noir",
    category: "shorts",
    title: "《新潮汐 / NEOTIDE》",
    subtitle: "AIGC 科幻先锋短片 - 荣获 AI 影展最佳叙事奖",
    image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    engine: "RUNWAY_G3",
    prompt:
      "A wide anamorphic shot of a futuristic Tokyo harbor at midnight, volumetric rain, decaying holograms, cinematic low-key lighting --ar 2.39:1",
    concept:
      "以潜空间叙事为核心，利用关键帧一致性与时序插值构建后数字城市的连续镜头。",
    role: "AI Video Director / Editor",
    pipeline: "Midjourney V6 + Runway Gen-3 + DaVinci",
    seed: "33092817293",
    grading: "Neo-noir Cyan + Decaying Amber",
  },
  {
    id: "gold-liquid",
    category: "commercials",
    title: "《液态重力 / LIQUID GRAVITY》",
    subtitle: "奢华概念广告 - AI 生成流体光影融合美学",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    engine: "MIDJOURNEY_V6",
    prompt:
      "Hyper-abstract gold liquid swirling in vacuum, macro lens, obsidian reflections, high-end metallic texture --ar 16:9",
    concept: "聚焦材质真实感，通过镜头语义和负向权重减少塑料感，提升商业质感。",
    role: "AIGC Art Director",
    pipeline: "Stable Diffusion + MJ V6 + Kling",
    seed: "5561029418",
    grading: "Warm Champagne Gold",
  },
  {
    id: "matrix-dream",
    category: "prompts",
    title: "《母体纠缠 / MATRIX ENTANGLEMENT》",
    subtitle: "多维 Prompt 控制流与视觉系统",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    engine: "PROMPT_FLOW",
    prompt:
      "Glowing biometric cables piercing a monolith, minimal gallery, volumetric mist, architectural lighting --ar 2.39:1",
    concept: "通过结构化提示词矩阵实现长序列画面中的风格稳定与主体一致。",
    role: "Lead Prompt Architect",
    pipeline: "Midjourney Matrix Blueprinting",
    seed: "998412039",
    grading: "Terminal Green + Mono Shadow",
  },
  {
    id: "analog-rust",
    category: "shorts",
    title: "《旧磁铁与荒野 / ANALOG RUST》",
    subtitle: "35mm 怀旧颗粒实验短片",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    engine: "SORA_TEST",
    prompt:
      "Rusted recorder on damp grass, overcast sky, soft film grain, nostalgic analog texture --ar 16:9",
    concept: "反向模拟胶片缺陷，构建粗粝且真实的记忆视觉。",
    role: "Director / Editor",
    pipeline: "Sora Beta + Luma",
    seed: "197410293",
    grading: "Faded Kodachrome",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  return (
    <div className="bg-[#050505] text-[#ededed]">
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(229,169,59,0.09),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,59,48,0.07),transparent_40%)]" />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FF3B30]" />
            <span className="text-xs font-bold tracking-[0.24em]">AIGC.STUDIO</span>
          </div>
          <div className="hidden items-center gap-6 text-xs text-gray-300 md:flex">
            <a href="#work">01 // WORK</a><a href="#studio">02 // STUDIO</a><a href="#about">03 // ABOUT</a>
            <a href="mailto:collaboration@aigc.studio" className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 hover:border-[#E5A93B]/50">DIRECT CONTACT</a>
          </div>
        </div>
      </nav>

      <header className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pb-14 pt-32 md:px-8">
        <p className="mb-5 text-xs tracking-[0.3em] text-[#E5A93B]">// WORLD-BUILDING VIA LATENT SPACE</p>
        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl">Jichu Chen<br /><span className="bg-gradient-to-r from-gray-100 via-gray-400 to-gray-700 bg-clip-text text-transparent">Directing the Latent Era.</span></h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-xl">AI Video Creator / Prompt Director / AIGC Visual Designer。通过扩散模型与时序引擎重构镜头叙事，打造高一致性、高辨识度的 AI 视觉作品。</p>
      </header>

      <main className="relative z-20">
        <section id="work" className="mx-auto w-full max-w-7xl border-t border-white/10 px-5 py-20 md:px-8">
          <h2 className="text-3xl font-black md:text-5xl">作品目录</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            {(["all", "shorts", "commercials", "prompts"] as Category[]).map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-lg border px-4 py-2 transition ${activeCategory === cat ? "border-[#E5A93B]/70 text-white" : "border-white/10 text-gray-400 hover:text-white"}`}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <button key={project.id} onClick={() => setActiveProjectId(project.id)} className="group text-left">
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <img src={project.image} alt={project.title} className="aspect-video w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div><h3 className="text-xl font-bold group-hover:text-[#E5A93B]">{project.title}</h3><p className="mt-1 text-sm text-gray-400">{project.subtitle}</p></div>
                  <span className="text-xs text-gray-500">// {project.year}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="studio" className="mx-auto w-full max-w-7xl border-t border-white/10 bg-[#090909] px-5 py-20 md:px-8">
          <h2 className="text-3xl font-black md:text-5xl">AI 导演工作台</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-400">核心工具：Midjourney / Runway / Sora / Stable Diffusion。可用于品牌广告、AI 短片、视觉系统搭建与 Prompt 工程咨询。</p>
        </section>

        <section id="about" className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 border-t border-white/10 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-black md:text-5xl">关于我</h2>
            <p className="mt-6 leading-relaxed text-gray-300">我专注于 AIGC 视觉体系与 Prompt 架构设计，把文本、镜头、运动和叙事编排为可复制的生产流程，让创意从概念快速落地为可发布的影像资产。</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6 lg:col-span-7">
            <p className="text-sm text-[#E5A93B]">COGNITIVE TECH STACK</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Diffusion Control: ControlNet / IP-Adapter / LoRA</li>
              <li>• Temporal Engines: Runway Gen-3 / Sora / Kling</li>
              <li>• Prompt Systemics: Structured Blueprinting</li>
              <li>• Pipeline: Resolve / Unreal Engine 5</li>
            </ul>
            <a href="mailto:collaboration@aigc.studio" className="mt-8 inline-block rounded-lg border border-[#E5A93B]/40 px-5 py-3 text-sm font-semibold hover:bg-[#E5A93B]/10">发送提案</a>
          </div>
        </section>
      </main>

      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-5 backdrop-blur-sm md:p-10">
          <div className="mx-auto max-w-4xl rounded-xl border border-white/15 bg-[#0b0b0b] p-5 md:p-8">
            <button onClick={() => setActiveProjectId(null)} className="mb-5 rounded-md border border-white/20 px-3 py-1 text-xs">CLOSE</button>
            <img src={activeProject.image} alt={activeProject.title} className="aspect-video w-full rounded-md object-cover" />
            <h3 className="mt-5 text-3xl font-black">{activeProject.title}</h3>
            <p className="mt-2 text-gray-300">{activeProject.subtitle}</p>
            <p className="mt-4 text-sm text-gray-400">{activeProject.concept}</p>
            <div className="mt-5 grid gap-3 text-xs text-gray-300 md:grid-cols-2">
              <p><span className="text-[#E5A93B]">ENGINE:</span> {activeProject.engine}</p>
              <p><span className="text-[#E5A93B]">SEED:</span> {activeProject.seed}</p>
              <p><span className="text-[#E5A93B]">ROLE:</span> {activeProject.role}</p>
              <p><span className="text-[#E5A93B]">GRADING:</span> {activeProject.grading}</p>
            </div>
            <p className="mt-4 rounded-md border border-white/10 bg-black/30 p-3 font-mono text-xs text-gray-300">{activeProject.prompt}</p>
            <p className="mt-3 text-xs text-gray-500">PIPELINE: {activeProject.pipeline}</p>
          </div>
        </div>
      )}
    </div>
  );
}
