"use client";

import React, { useEffect, useState, type MouseEvent } from "react";

function onLiquidMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

const heroVideoSrc =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3dc26d36e2f69421df65f72439&profile_id=139&oauth2_token_id=57447761";

interface Project {
  id: string;
  category: "shorts" | "commercials" | "prompts";
  title: string;
  subtitle: string;
  videoSrc: string;
  aspectRatio: "horizontal" | "vertical";
  engine: string;
  prompt: string;
  concept: string;
  role: string;
  pipeline: string;
  seed: string;
  grading: string;
}

interface SkillItem {
  title: string;
  name: string;
  keywords: string[];
  description: string;
}

const projectsData: Record<string, Project> = {
  "cyber-noir": { id: "cyber-noir", category: "shorts", title: "《新潮汐 / NEOTIDE》", subtitle: "AIGC 电影质感科幻短片 - AI电影节最佳叙事大奖作品", videoSrc: "/works/work-01-preview.mp4", aspectRatio: "horizontal", engine: "// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS", prompt: "A wide anamorphic shot...", concept: "《新潮汐》是一部探索AI幻觉...", role: "AI Video Director / Editor / Sound Design", pipeline: "Midjourney V6 + Runway Gen-3 + DaVinci", seed: "33092817293", grading: "Neo-noir Cyan and Decaying Amber" },
  "matrix-dream": { id: "matrix-dream", category: "prompts", title: "《母体纠缠 / MATRIX ENTANGLEMENT》", subtitle: "基于超级变量与负向调度的多维视觉框架体系", videoSrc: "/works/work-03-preview.mp4", aspectRatio: "horizontal", engine: "// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW", prompt: "A high-contrast cinematic scan...", concept: "本系统展示了 AIGC 的控图边界...", role: "Lead Prompt Architect", pipeline: "Midjourney Matrix Blueprinting", seed: "998412039", grading: "Terminal Green & Monochromatic Shadows" },
  "dust-odyssey": { id: "dust-odyssey", category: "shorts", title: "《尘埃奥德赛 / DUST ODYSSEY》", subtitle: "写实废土风格叙事镜头 - 探索微观尘埃粒子动力学", videoSrc: "/works/work-01-preview.mp4", aspectRatio: "horizontal", engine: "// SYSTEM: SORA-PARTICLE_SIMULATION_V2", prompt: "Earthy dramatic anamorphic...", concept: "《尘埃奥德赛》重点在于...", role: "Director / Visual Lead", pipeline: "Midjourney + Sora + Stable Diffusion Lora", seed: "10928374921", grading: "Muted Earthy Ochre & Deep Amber" },
  "synthetic-dawn": { id: "synthetic-dawn", category: "prompts", title: "《合成黎明 / SYNTHETIC DAWN》", subtitle: "多模态时序融合框架 - 模拟极端自然气候与工业共生", videoSrc: "/works/work-03-preview.mp4", aspectRatio: "horizontal", engine: "// SYSTEM: COGNITIVE-FLOW_WEATHER_EMULATOR", prompt: "Extreme cinematic wide shot...", concept: "此框架深入探讨了...", role: "Technical Prompt Director", pipeline: "Midjourney V6 + Runway Gen-3 + DaVinci Resolve", seed: "44820193872", grading: "Electric Turquoise & Liquid Silver" },
  "gold-liquid": { id: "gold-liquid", category: "commercials", title: "《液态重力 / LIQUID GRAVITY》", subtitle: "X-LUXURY 品牌 AI 概念广告特辑", videoSrc: "/works/work-02-preview.mp4", aspectRatio: "vertical", engine: "// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING", prompt: "Hyper-abstract luxury dynamic...", concept: "此项目是为知名奢侈品牌定制...", role: "AIGC Art Director / Keyframe Designer", pipeline: "Stable Diffusion + MJ V6 + Kling AI", seed: "5561029418", grading: "Warm Champagne Gold & Pitch Black" },
  "analog-rust": { id: "analog-rust", category: "shorts", title: "《旧磁铁与荒野 / ANALOG RUST》", subtitle: "35mm 模拟怀旧电影短片先导视觉", videoSrc: "/works/work-04-preview.mp4", aspectRatio: "vertical", engine: "// SYSTEM: SORA-COHESION_TEST_PROTOTYPE", prompt: "Earthy cinematic portrait shot...", concept: "《旧磁铁与荒野》通过 AIGC 的生成...", role: "Director / Editor", pipeline: "Sora Beta + Luma Dream Machine", seed: "197410293", grading: "Faded Kodachrome Film emulation" },
  "neon-pulse": { id: "neon-pulse", category: "commercials", title: "《霓虹脉冲 / NEON PULSE》", subtitle: "时尚先锋垂直视感广告 - 情感算法流动视觉", videoSrc: "/works/work-02-preview.mp4", aspectRatio: "vertical", engine: "// SYSTEM: COGNITIVE-FLOW_PORTRAIT_STREAM", prompt: "A fast-paced vertical portrait...", concept: "本作品深入探讨时尚媒介的移动化...", role: "Visual Director / Stylist", pipeline: "SDXL ControlNet + Runway Gen-3", seed: "88390129381", grading: "Vibrant Acid Magenta & Deep Onyx" },
};

const coreCapabilities: SkillItem[] = [
  { title: "01 // LATENT COMPOSITION", name: "潜空间镜头与光影掌控", keywords: ["Anamorphic Rules", "Rembrandt Lighting"], description: "基于经典电影美学参数化控制图像生成。" },
  { title: "02 // TIME-SERIES DIRECTION", name: "多模态时序流镜头控制", keywords: ["Temporal Cohesion", "Motion Vectors"], description: "精通 AIGC 时序生成的动力学模拟和镜头平移。" },
  { title: "03 // PROMPT ARCHITECTURE", name: "结构化语义编译与调度", keywords: ["Token Weights", "Attention Anchors"], description: "将自然语言创意编译为高度可预测的底层逻辑描述。" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("scroll-visible");
      });
    }, { threshold: 0.05 });
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;
  const filtered = Object.values(projectsData).filter((p) => activeCategory === "all" || p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
      <div className="film-grain" />
      <nav className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3"><span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#FF3B30]" /><span className="text-sm font-bold tracking-[0.2em] text-white uppercase">AIGC.STUDIO</span></div>
          <div className="flex items-center gap-6 text-[11px] font-mono tracking-[0.2em] text-gray-300 uppercase"><a href="#work" className="transition hover:text-white">01 // WORK</a><a href="#about" className="transition hover:text-white">02 // ABOUT</a><a href="#contact" className="transition hover:text-white">DIRECT CONTACT</a></div>
        </div>
      </nav>

      <main className="relative z-10 px-4 pb-10 pt-28 md:px-8">
        <section className="relative mx-auto min-h-[calc(100vh-8rem)] w-full max-w-7xl overflow-hidden rounded-[38px] border border-white/8 bg-[#0d0d0d]">
          <div className="absolute inset-0"><video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-25 brightness-[0.4] contrast-[1.1]"><source src={heroVideoSrc} type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" /></div>
          <header className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-between px-6 pb-12 pt-14 md:px-10 md:pt-20"><div className="max-w-4xl"><p className="mb-6 text-xs tracking-[0.3em] text-[#E5A93B] uppercase font-mono">// I am turning imagination into reality.</p><h1 className="mb-8 text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase md:text-8xl">JICHU CHEN <br /><span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent">VISUAL WORKS.</span></h1><p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-gray-400 md:text-xl">我是影像创作者。拥有丰富的视频制作经验，熟悉拍摄、剪辑、调色及AIGC视频创作流程，了解短片、广告及 微电影等全流程；具备甲方工作思维，能够理解业务需求、统筹项目并协调多部门高效落地内容 , 关注作品传播效果与商业价值。</p><div className="flex flex-wrap gap-4"><a onMouseMove={onLiquidMove} href="#work" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wider text-white">浏览最新作品 (SHORTS)</a><a onMouseMove={onLiquidMove} href="#about" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm tracking-wider text-gray-300 font-mono">关于与联系 (ABOUT)</a></div></div></header>
        </section>

        <section id="work" className="mx-auto mt-12 w-full max-w-7xl rounded-[38px] border border-white/10 bg-[#090909] px-6 py-12 md:px-10">
          <div className="mb-6 flex flex-wrap gap-3">{["all", "shorts", "commercials", "prompts"].map((c) => <button key={c} onClick={() => setActiveCategory(c)} className={`rounded-full border px-4 py-2 text-xs uppercase ${activeCategory === c ? "border-[#E5A93B] text-white" : "border-white/20 text-gray-300"}`}>{c}</button>)}</div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <article key={p.id} onClick={() => setSelectedProjectId(p.id)} className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/50"><div className={p.aspectRatio === "vertical" ? "relative aspect-[9/16]" : "relative aspect-video"}><video src={p.videoSrc} autoPlay muted loop playsInline onError={(e) => { e.currentTarget.style.display = "none"; }} className="h-full w-full object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" /></div><div className="p-4"><h3 className="text-white">{p.title}</h3><p className="text-xs text-gray-400">{p.subtitle}</p></div></article>)}</div>
        </section>

        <section id="about" className="mx-auto mt-12 w-full max-w-7xl rounded-[38px] border border-white/10 bg-[#090909] px-6 py-12 md:px-10">
          <h2 className="text-3xl font-black text-white">关于导演。</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{coreCapabilities.map((s) => <div key={s.title} className="rounded-xl border border-white/10 p-4"><p className="text-xs text-[#E5A93B]">{s.title}</p><h3 className="mt-2 text-white">{s.name}</h3><p className="mt-2 text-sm text-gray-400">{s.description}</p></div>)}</div>
        </section>

        <section id="contact" className="mx-auto mt-12 w-full max-w-7xl rounded-[38px] border border-white/10 bg-[#090909] px-6 py-12 md:px-10">
          <p className="text-gray-400">collaboration@aigc.studio</p>
        </section>
      </main>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#111] p-6">
            <button onClick={() => setSelectedProjectId(null)} className="mb-4 text-xs text-gray-400">CLOSE</button>
            <video src={selectedProject.videoSrc} autoPlay muted loop playsInline className={selectedProject.aspectRatio === "vertical" ? "mx-auto aspect-[9/16] max-h-[60vh]" : "aspect-video w-full"} />
            <h3 className="mt-4 text-2xl text-white">{selectedProject.title}</h3>
            <p className="text-gray-400">{selectedProject.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
