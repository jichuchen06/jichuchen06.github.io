'use client';

import React, { useEffect, useState, type MouseEvent } from 'react';

interface Project {
  id: string;
  category: 'shorts' | 'commercials' | 'prompts';
  title: string;
  subtitle: string;
  videoSrc: string;
  aspectRatio: 'horizontal' | 'vertical';
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
  'cyber-noir': { id: 'cyber-noir', category: 'shorts', title: '《新潮汐 / NEOTIDE》', subtitle: 'AIGC 电影质感科幻短片 - AI电影节最佳叙事大奖作品', videoSrc: '/works/work-01-preview.mp4', aspectRatio: 'horizontal', engine: '// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS', prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0', concept: '《新潮汐》是一部探索AI幻觉、后数字文明末日的实验短片。整个短片的生成过程避开了传统的镜头，完全依赖Midjourney生成的高保真帧图，并结合Runway的深度运动控制引擎来进行动态渲染。整部影片在微弱的冷色调与刺眼的霓虹光污染之间保持微妙的张力。', role: 'AI Video Director / Editor / Sound Design', pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci', seed: '33092817293', grading: 'Neo-noir Cyan and Decaying Amber' },
  'matrix-dream': { id: 'matrix-dream', category: 'prompts', title: '《母体纠缠 / MATRIX ENTANGLEMENT》', subtitle: '基于超级变量与负向调度的多维视觉框架体系', videoSrc: '/works/work-03-preview.mp4', aspectRatio: 'horizontal', engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW', prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw', concept: '本系统展示了 AIGC 的控图边界。我们建立了一套“结构化母体提示词（Structured Matrix Prompting）”系统。通过精确控制噪点比例（Denoising Strength）和语义解析分级，实现在长镜头序列中保持物体 and 光影的一致性。', role: 'Lead Prompt Architect', pipeline: 'Midjourney Matrix Blueprinting', seed: '998412039', grading: 'Terminal Green & Monochromatic Shadows' },
  'dust-odyssey': { id: 'dust-odyssey', category: 'shorts', title: '《尘埃奥德赛 / DUST ODYSSEY》', subtitle: '写实废土风格叙事镜头 - 探索微观尘埃粒子动力学', videoSrc: '/works/work-01-preview.mp4', aspectRatio: 'horizontal', engine: '// SYSTEM: SORA-PARTICLE_SIMULATION_V2', prompt: 'Earthy dramatic anamorphic medium shot of a solo astronaut walking slowly through a giant rusty metallic desert, atmospheric dust particles floating in back-light, golden hour sunset glow, highly detailed, photorealistic, cinematic movie grade --ar 2.39:1 --style raw', concept: '《尘埃奥德赛》重点在于对重力物理学和微观悬浮物质的AI算法控制。我们利用了高强度的粒度调节，使得环境中的沙尘在斜阳的林布兰光影下呈现出极具感官实感的分离运动。', role: 'Director / Visual Lead', pipeline: 'Midjourney + Sora + Stable Diffusion Lora', seed: '10928374921', grading: 'Muted Earthy Ochre & Deep Amber' },
  'synthetic-dawn': { id: 'synthetic-dawn', category: 'prompts', title: '《合成黎明 / SYNTHETIC DAWN》', subtitle: '多模态时序融合框架 - 模拟极端自然气候与工业共生', videoSrc: '/works/work-03-preview.mp4', aspectRatio: 'horizontal', engine: '// SYSTEM: COGNITIVE-FLOW_WEATHER_EMULATOR', prompt: 'Extreme cinematic wide shot of an automated lithium refinery during an electric blizzard, crackling turquoise lightning bolts striking the towering silver exhaust stacks, dramatic high-contrast atmospheric grading, 35mm cinematic lens --ar 2.39:1', concept: '此框架深入探讨了在时序生成模型中对气象学剧烈运动的干预。通过结合局部动态遮罩与闪电瞬间的高光曝光反差，使得冰川暴雪与数字火花产生的物理交互感达到影院级品质。', role: 'Technical Prompt Director', pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci Resolve', seed: '44820193872', grading: 'Electric Turquoise & Liquid Silver' },
  'gold-liquid': { id: 'gold-liquid', category: 'commercials', title: '《液态重力 / LIQUID GRAVITY》', subtitle: 'X-LUXURY 品牌 AI 概念广告特辑', videoSrc: '/works/work-02-preview.mp4', aspectRatio: 'vertical', engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING', prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 9:16 --stylize 750', concept: '此项目是为知名奢侈品牌定制的 9:16 竖屏全案概念广告。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的转换流动。竖屏构图能够极好地在移动端传递视觉流的张力。', role: 'AIGC Art Director / Keyframe Designer', pipeline: 'Stable Diffusion + MJ V6 + Kling AI', seed: '5561029418', grading: 'Warm Champagne Gold & Pitch Black' },
  'analog-rust': { id: 'analog-rust', category: 'shorts', title: '《旧磁铁与荒野 / ANALOG RUST》', subtitle: '35mm 模拟怀旧电影短片先导视觉', videoSrc: '/works/work-04-preview.mp4', aspectRatio: 'vertical', engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE', prompt: 'Earthy cinematic portrait shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 9:16 --style raw', concept: '《旧磁铁与荒野》通过 AIGC 的生成，逆向探索上世纪70年代胶片的杂质感和光学缺陷。为了适应现代短视频的分发场景，本片实验性地使用了 9:16 构图。', role: 'Director / Editor', pipeline: 'Sora Beta + Luma Dream Machine', seed: '197410293', grading: 'Faded Kodachrome Film emulation' },
  'neon-pulse': { id: 'neon-pulse', category: 'commercials', title: '《霓虹脉冲 / NEON PULSE》', subtitle: '时尚先锋垂直视感广告 - 情感算法流动视觉', videoSrc: '/works/work-02-preview.mp4', aspectRatio: 'vertical', engine: '// SYSTEM: COGNITIVE-FLOW_PORTRAIT_STREAM', prompt: 'A fast-paced vertical portrait of a model wrapped in liquid neon light-wires, cyberpunk wet skin aesthetic, high speed camera pans, dynamic volumetric lighting, hyper-real textures --ar 9:16', concept: '本作品深入探讨时尚媒介的移动化。9:16 的物理视框被视为一个流动发光体，我们将模特的脸庞与无序交织的液态光轨作为核心语言。', role: 'Visual Director / Stylist', pipeline: 'SDXL ControlNet + Runway Gen-3', seed: '88390129381', grading: 'Vibrant Acid Magenta & Deep Onyx' }
};

const coreCapabilities: SkillItem[] = [
  { title: '01 // LATENT COMPOSITION', name: '潜空间镜头与光影掌控', keywords: ['Anamorphic Rules', 'Rembrandt Lighting', 'Atmospheric Gradients'], description: '基于经典电影美学参数化控制图像生成，精准调度画面镜头焦距、气候介质、光衰减与视野范围，构建具有强质感的院线级画幅资产。' },
  { title: '02 // TIME-SERIES DIRECTION', name: '多模态时序流镜头控制', keywords: ['Temporal Cohesion', 'Fluid Dynamics', 'Motion Vectors'], description: '精通 AIGC 时序生成的动力学模拟和镜头平移，能够在高频粒子碰撞与湍流计算下，确保渲染序列的逻辑连贯性与物理真实性。' },
  { title: '03 // PROMPT ARCHITECTURE', name: '结构化语义编译与调度', keywords: ['Token Weights', 'Negative Vectors', 'Attention Anchors'], description: '将自然语言创意编译为高度可预测的底层逻辑描述。利用动态权重、负向矢量约束与跨框架语义链，实现视觉品牌资产的精准控制。' }
];

const heroVideoSrc = 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3dc26d36e2f69421df65f72439&profile_id=139&oauth2_token_id=57447761';

function onLiquidMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const visible = Object.values(projectsData).filter((p) => activeCategory === 'all' || p.category === activeCategory);

  return <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
    <div className="film-grain pointer-events-none" />
    <nav className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-white/5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3"><span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#FF3B30]" /><span className="text-sm font-bold tracking-[0.2em] text-white uppercase">AIGC.STUDIO</span></div>
        <div className="flex items-center gap-6 text-[11px] font-mono tracking-[0.2em] text-gray-300 uppercase">
          <a href="#work" className="transition hover:text-white">01 // WORK</a><a href="#about" className="transition hover:text-white">02 // ABOUT</a><a href="#contact" className="transition hover:text-white">DIRECT CONTACT</a>
        </div>
      </div>
    </nav>
    <main className="relative z-10 px-4 pb-20 pt-28 md:px-8">
      <section className="relative mx-auto min-h-[calc(100vh-8rem)] w-full max-w-7xl overflow-hidden rounded-[38px] border border-white/8 bg-[#0d0d0d]">
        <div className="absolute inset-0"><video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-25 brightness-[0.4] contrast-[1.1]"><source src={heroVideoSrc} type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" /></div>
        <header className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-between px-6 pb-12 pt-14 md:px-10 md:pt-20"><div className="max-w-4xl"><p className="mb-6 text-xs tracking-[0.3em] text-[#E5A93B] uppercase font-mono">// I am turning imagination into reality.</p><h1 className="mb-8 text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase md:text-8xl">JICHU CHEN <br /><span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent">VISUAL WORKS.</span></h1><p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-gray-400 md:text-xl">我是影像创作者。拥有丰富的视频制作经验，熟悉拍摄、剪辑、调色及AIGC视频创作流程，了解短片、广告及 微电影等全流程；具备甲方工作思维，能够理解业务需求、统筹项目并协调多部门高效落地内容 , 关注作品传播效果与商业价值。</p><div className="flex flex-wrap gap-4"><a onMouseMove={onLiquidMove} href="#work" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wider text-white">浏览最新作品 (SHORTS)</a><a onMouseMove={onLiquidMove} href="#about" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm tracking-wider text-gray-300 font-mono">关于与联系 (ABOUT)</a></div></div></header>
      </section>

      <section id="work" className="mx-auto mt-24 w-full max-w-7xl scroll-animate">
        <div className="mb-8 flex flex-wrap gap-3">{['all', 'shorts', 'commercials', 'prompts'].map((cat) => <button key={cat} onClick={() => setActiveCategory(cat)} onMouseMove={onLiquidMove} className={`liquid-glass-btn rounded-lg px-4 py-2 text-xs font-mono uppercase ${activeCategory === cat ? 'text-white border-[#E5A93B]/40' : 'text-gray-400'}`}>{cat}</button>)}</div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <div key={project.id} className="group cursor-pointer scroll-animate" onClick={() => setSelectedProject(project)}><div className={`overflow-hidden rounded border border-white/10 bg-black ${project.aspectRatio === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'}`}><video src={project.videoSrc} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-80 transition group-hover:scale-105" /><div className="pointer-events-none absolute inset-0" /></div><h3 className="mt-3 text-lg font-bold text-white">{project.title}</h3><p className="text-xs text-gray-400">{project.subtitle}</p></div>)}</div>
      </section>

      <section id="about" className="mx-auto mt-24 grid w-full max-w-7xl gap-10 border-t border-white/10 pt-20 md:grid-cols-2">
        <div><h2 className="text-4xl font-black">关于导演。</h2><p className="mt-6 text-gray-300">在传统实拍电影向潜空间叙事让步的拐点，作为 Prompt Director，我认为文字不仅是表达的媒介，更是雕刻视觉光影的参数剪刀。</p></div>
        <div className="space-y-4">{coreCapabilities.map((skill) => <div key={skill.title} className="rounded-xl border border-white/10 bg-neutral-950 p-4"><p className="text-xs text-[#E5A93B]">{skill.title}</p><h3 className="mt-1 text-base font-bold">{skill.name}</h3><p className="mt-2 text-sm text-gray-400">{skill.description}</p></div>)}</div>
      </section>

      <section id="contact" className="mx-auto mt-20 w-full max-w-7xl border-t border-white/10 pt-12">
        <p className="text-sm text-gray-400">期待开展品牌联合、短片创作与商业顾问</p>
        <a href="mailto:jichuchen06@gmail.com" className="mt-2 inline-block text-xl font-bold text-white">jichuchen06@gmail.com</a>
      </section>
    </main>

    {selectedProject && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"><div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl border border-white/20 bg-[#111] p-6"><button onClick={() => setSelectedProject(null)} className="liquid-glass-btn mb-6 rounded-lg px-4 py-2 text-xs">CLOSE</button><div className="grid gap-6 lg:grid-cols-3"><div className="lg:col-span-2"><video src={selectedProject.videoSrc} autoPlay muted loop playsInline className={`w-full rounded ${selectedProject.aspectRatio === 'vertical' ? 'max-w-[360px]' : ''}`} /><h3 className="mt-4 text-3xl font-black">{selectedProject.title}</h3><p className="mt-2 text-gray-400">{selectedProject.subtitle}</p><p className="mt-4 text-sm text-gray-300 whitespace-pre-wrap">{selectedProject.prompt}</p><p className="mt-4 text-gray-300">{selectedProject.concept}</p></div><div className="space-y-3 text-sm text-gray-300"><p>{selectedProject.engine}</p><p>{selectedProject.role}</p><p>{selectedProject.pipeline}</p><p>{selectedProject.seed}</p><p>{selectedProject.grading}</p></div></div></div></div>}
  </div>;
}
