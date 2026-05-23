'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  category: 'shorts' | 'commercials' | 'prompts';
  title: string;
  subtitle: string;
  videoSrc: string;
  engine: string;
  prompt: string;
  concept: string;
  role: string;
  pipeline: string;
  seed: string;
  grading: string;
}

const projectsData: Record<string, Project> = {
  'cyber-noir': {
    id: 'cyber-noir',
    category: 'shorts',
    title: '《新潮汐 / NEOTIDE》',
    subtitle: 'AIGC 电影质感科幻短片 - AI电影节最佳叙事大奖作品',
    videoSrc: '/works/work-01-preview.mp4',
    engine: '// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS',
    prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0',
    concept: '《新潮汐》是一部探索AI幻觉、后数字文明末日的实验短片。整个短片的生成过程避开了传统的镜头，完全依赖Midjourney生成的高保真帧图，并结合Runway的深度运动控制引擎来进行动态渲染。整部影片在微弱的冷色调与刺眼的霓虹光污染之间保持微妙的张力。',
    role: 'AI Video Director / Editor / Sound Design',
    pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci',
    seed: '33092817293',
    grading: 'Neo-noir Cyan and Decaying Amber'
  },
  'gold-liquid': {
    id: 'gold-liquid',
    category: 'commercials',
    title: '《液态重力 / LIQUID GRAVITY》',
    subtitle: 'X-LUXURY 品牌 AI 概念广告特辑',
    videoSrc: '/works/work-02-preview.mp4',
    engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING',
    prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 16:9 --stylize 750',
    concept: '此项目是为知名奢侈品牌定制的AI概念先导片。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的缠绕流动。该作核心挑战在于流体的微距光影控制，我们使用了复杂的材质修饰词（pristine obsidian, polished platinum）来诱导引擎生成近乎实体质感的物理折射。',
    role: 'AIGC Art Director / Keyframe Designer',
    pipeline: 'Stable Diffusion + MJ V6 + Kling AI',
    seed: '5561029418',
    grading: 'Warm Champagne Gold & Pitch Black'
  },
  'matrix-dream': {
    id: 'matrix-dream',
    category: 'prompts',
    title: '《母体纠缠 / MATRIX ENTANGLEMENT》',
    subtitle: '基于超级变量与负向调度的多维视觉框架体系',
    videoSrc: '/works/work-03-preview.mp4',
    engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW',
    prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw',
    concept: '本系统展示了 AIGC 的控图边界。我们并不单方面依靠AI的随机创造力，而是建立了一套“结构化母体提示词（Structured Matrix Prompting）”系统。通过精确控制噪点比例（Denoising Strength）和语义解析分级，实实现在长镜头序列中保持物体和光影的一致性。',
    role: 'Lead Prompt Architect',
    pipeline: 'Midjourney Matrix Blueprinting',
    seed: '998412039',
    grading: 'Terminal Green & Monochromatic Shadows'
  },
  'analog-rust': {
    id: 'analog-rust',
    category: 'shorts',
    title: '《旧磁铁与荒野 / ANALOG RUST》',
    subtitle: '35mm 模拟怀旧电影短片先导视觉',
    videoSrc: '/works/work-04-preview.mp4',
    engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE',
    prompt: 'Earthy cinematic medium shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 16:9 --style raw',
    concept: '《旧磁铁与荒野》通过 AIGC 的生成，逆向探索上世纪70年代胶片的杂质感和光学缺陷（如镜头眩光、暗角 and 感光乳剂不均）。提示词中特意去除了常规“超清/4k”等现代描述，转而堆叠了“damp, rusted, film grain, analog style”等带有粗糙现实属性的自然语素。',
    role: 'Director / Editor',
    pipeline: 'Sora Beta + Luma Dream Machine',
    seed: '197410293',
    grading: 'Faded Kodachrome Film emulation'
  }
};

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [wxCopied, setWxCopied] = useState<boolean>(false);

  const copyDetailPrompt = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyWeChatID = (wechatId: string) => {
    const el = document.createElement('textarea');
    el.value = wechatId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setWxCopied(true);
    setTimeout(() => setWxCopied(false), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  const openProjectDetail = (id: string) => setSelectedProjectId(id);
  const closeProjectDetail = () => setSelectedProjectId(null);

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen antialiased relative selection:bg-[#E5A93B]/30 select-none">
      <style dangerouslySetInnerHTML={{ __html: `.film-grain{position:fixed;top:0;left:0;width:100%;height:100%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:99;}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}.rec-dot{animation:pulse 1.5s infinite;}.liquid-glass-btn{position:relative;overflow:hidden;background:rgba(255,255,255,.03);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1.5px solid rgba(255,255,255,.07);box-shadow:0 4px 30px rgba(0,0,0,.4),inset 0 1px 1px rgba(255,255,255,.15),inset 0 -1px 2px rgba(0,0,0,.5);transition:transform .5s cubic-bezier(.16,1,.3,1),border-color .4s ease,box-shadow .4s ease,background-color .4s ease;}.liquid-glass-btn::before{content:'';position:absolute;top:var(--y,50%);left:var(--x,50%);width:180px;height:180px;background:radial-gradient(circle,rgba(229,169,59,.28) 0%,rgba(229,169,59,.03) 55%,transparent 75%);transform:translate(-50%,-50%) scale(0);transition:transform .8s cubic-bezier(.16,1,.3,1),opacity .5s ease;pointer-events:none;mix-blend-mode:screen;}.liquid-glass-btn:hover::before{transform:translate(-50%,-50%) scale(1.4);}.liquid-glass-btn:hover{transform:scale(1.03) translateY(-1px);border-color:rgba(229,169,59,.25);box-shadow:0 15px 35px rgba(229,169,59,.1),inset 0 1.5px 2px rgba(255,255,255,.35);}.liquid-glass-btn:active{transform:scale(.97) translateY(0);transition:transform .1s ease;}` }} />
      <div className="film-grain" />
      <section id="work-section" className="pt-32 pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap gap-3 mb-8 font-mono text-xs">
          <button onClick={() => setActiveCategory('all')} className="liquid-glass-btn px-4 py-2 rounded-lg">ALL PROJECTS</button>
          <button onClick={() => setActiveCategory('shorts')} className="liquid-glass-btn px-4 py-2 rounded-lg">AI FILMS</button>
          <button onClick={() => setActiveCategory('commercials')} className="liquid-glass-btn px-4 py-2 rounded-lg">COMMERCIALS</button>
          <button onClick={() => setActiveCategory('prompts')} className="liquid-glass-btn px-4 py-2 rounded-lg">SYSTEM / PROMPTS</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.values(projectsData).filter((p) => activeCategory === 'all' || p.category === activeCategory).map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => openProjectDetail(project.id)}>
              <div className="relative aspect-video w-full overflow-hidden border border-white/5 rounded bg-gradient-to-br from-neutral-900 to-[#0c0c0c]">
                <video src={project.videoSrc} muted autoPlay loop playsInline className="w-full h-full object-cover opacity-60 bg-neutral-900" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div className="mt-4"><h3 className="text-xl font-bold text-white">{project.title}</h3><p className="text-xs font-mono text-gray-500 mt-1">{project.subtitle}</p></div>
            </div>
          ))}
        </div>
      </section>
      {selectedProject && <div className="fixed inset-0 z-50 bg-black/95"><button onClick={closeProjectDetail} onMouseMove={handleMouseMove} className="liquid-glass-btn absolute top-6 right-6 px-4 py-2 rounded-full">CLOSE</button><div className="max-w-5xl mx-auto p-6 pt-20"><video src={selectedProject.videoSrc} muted autoPlay loop playsInline className="w-full aspect-video object-cover" /><button onClick={() => copyDetailPrompt(selectedProject.prompt)} className="liquid-glass-btn mt-6 px-4 py-2 rounded">{copied ? '✓ COPIED TO CLIPBOARD' : '复制完整 PROMPT 架构'}</button><button onClick={() => copyWeChatID('aigc_director_wechat')} className="liquid-glass-btn mt-3 px-4 py-2 rounded">{wxCopied ? '✓ WX COPIED' : 'WECHAT ↗'}</button></div></div>}
    </div>
  );
}
