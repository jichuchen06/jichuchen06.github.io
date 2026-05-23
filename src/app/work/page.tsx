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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen antialiased relative selection:bg-[#E5A93B]/30 select-none">
      <div className="film-grain" />

      <nav className="fixed w-full z-50 bg-[#050505]/75 backdrop-blur-[25px] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#FF3B30] rounded-full rec-dot"></span>
            <span className="text-sm tracking-[0.2em] font-bold text-white uppercase">AIGC.STUDIO</span>
          </div>
          <div className="space-x-6 text-xs tracking-widest font-mono text-gray-400 flex items-center">
            <a href="#work-section" className="hover:text-white transition">01 // WORK</a>
            <a href="#about-section" className="hover:text-white transition">02 // ABOUT</a>
            <a href="mailto:director@aigc.studio" className="liquid-glass-btn text-white px-4 py-2 text-xs font-mono tracking-wider rounded-lg" onMouseMove={handleMouseMove}>DIRECT CONTACT</a>
          </div>
        </div>
      </nav>

      <section id="work-section" className="pt-32 pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 01 / CINEMATIC ARCHIVES</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight uppercase">作品目录</h1>
          </div>
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0 font-mono text-xs">
            {['all', 'shorts', 'commercials', 'prompts'].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} onMouseMove={handleMouseMove} className={`liquid-glass-btn px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition ${activeCategory === cat ? 'text-white border-[#E5A93B]/40' : 'text-gray-400 border-transparent'}`}>
                {cat === 'all' ? 'ALL PROJECTS' : cat === 'shorts' ? 'AI FILMS' : cat === 'commercials' ? 'COMMERCIALS' : 'SYSTEM / PROMPTS'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.values(projectsData)
            .filter((project) => activeCategory === 'all' || project.category === activeCategory)
            .map((project) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProjectId(project.id)}>
                <div className="relative aspect-video w-full overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500 rounded bg-gradient-to-br from-neutral-900 to-[#0c0c0c]">
                  <video src={project.videoSrc} muted autoPlay loop playsInline className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 bg-neutral-900" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <p className="text-[#E5A93B] uppercase">{project.id === 'cyber-noir' ? 'SYSTEM_ACTIVE // RUNWAY_G3' : 'ENGINE_STABLE'}</p>
                      <p>RATIO: 2.39:1 // FEED_OK</p>
                    </div>
                    <span className="liquid-glass-btn px-3 py-1.5 text-white rounded-lg text-xs font-mono tracking-wide" onMouseMove={handleMouseMove}>VIEW BLUEPRINT</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E5A93B] transition duration-300">{project.title}</h3>
                    <p className="text-xs font-mono text-gray-500 mt-1">{project.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500">// 2026</span>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section id="about-section" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 02 / VISIONARY INTEL</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-2">关于导演。</h2>
            <div className="mt-8 space-y-6 text-gray-400 font-light leading-relaxed">
              <p>在传统实拍电影向潜空间叙事让步的拐点，作为 “Prompt Director”，我认为文字不仅是表达的媒介，更是雕刻视觉光影的“参数剪刀”。</p>
              <p>我专注于 AIGC 视觉体系的一致性开发（Consistency Engineering）。通过深度整合 Midjourney、Stable Diffusion 控图技巧以及 Runway/Sora 等多模态时序工具，将创意极速转换为好莱坞质感的艺术表达。</p>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 p-8 rounded-xl border border-white/5 font-mono">
            <div>
              <h3 className="text-sm font-bold text-white mb-6 uppercase">// COGNITIVE TECH STACK (技术堆栈)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
                <div><p className="text-[#E5A93B] mb-2">01 // DIFFUSION CONTROL</p><p className="mb-1">ControlNet / IP-Adapter / LoRA</p></div>
                <div><p className="text-[#E5A93B] mb-2">02 // TEMPORAL ENGINES</p><p className="mb-1">Runway Gen-3 / Sora / Kling</p></div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">// CONNECT CHANNELS (社交与媒体连接)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a href="https://space.bilibili.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>BILIBILI ↗</span></a>
                <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>小红书 ↗</span></a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>YOUTUBE ↗</span></a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>INSTAGRAM ↗</span></a>
                <a href="https://x.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>TWITTER / X ↗</span></a>
                <button onClick={() => copyWeChatID('aigc_director_wechat')} onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2"><span>{wxCopied ? '✓ WX COPIED' : 'WECHAT ↗'}</span></button>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div><p className="text-xs text-gray-500">期待开展品牌联合、短片创作与商业顾问</p><p className="text-lg text-white font-bold mt-1">collaboration@aigc.studio</p></div>
              <a href="mailto:collaboration@aigc.studio" onMouseMove={handleMouseMove} className="liquid-glass-btn text-white px-6 py-3 text-xs font-bold uppercase rounded-lg">发送提案</a>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-center">
          <div className="min-h-screen px-6 py-20 flex flex-col justify-center">
            <div className="max-w-5xl mx-auto w-full relative">
              <button onClick={() => setSelectedProjectId(null)} onMouseMove={handleMouseMove} className="liquid-glass-btn absolute -top-14 right-0 px-4 py-2 rounded-full text-gray-400 hover:text-white font-mono text-xs tracking-widest flex items-center space-x-2"><span>CLOSE / EXIT ✕</span></button>
              <div className="relative aspect-video w-full bg-neutral-900 rounded overflow-hidden border border-white/10 mb-8 shadow-2xl">
                <video src={selectedProject.videoSrc} muted autoPlay loop playsInline className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 font-mono text-xs text-[#E5A93B]"><p>{selectedProject.engine}</p></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                <div className="lg:col-span-2 space-y-8">
                  <div><h2 className="text-3xl md:text-5xl font-black text-white">{selectedProject.title}</h2><p className="text-lg text-gray-400 font-light mt-2">{selectedProject.subtitle}</p></div>
                  <div className="bg-neutral-950 p-6 rounded border border-white/5 font-mono">
                    <p className="text-xs text-[#E5A93B] mb-3 uppercase tracking-widest">// PROMPT BLUEPRINT (提示词蓝图)</p>
                    <div className="text-sm text-gray-300 leading-relaxed bg-[#0d0d0d] p-4 rounded border border-white/5 select-all overflow-x-auto whitespace-pre-wrap">{selectedProject.prompt}</div>
                    <span className="text-[10px] text-gray-500 mt-2 block">点击上方框内代码可直接复制</span>
                  </div>
                  <div><h3 className="text-sm font-mono text-gray-500 mb-2">// DIRECTING CONCEPT (导演阐述)</h3><p className="text-gray-300 leading-relaxed font-light">{selectedProject.concept}</p></div>
                </div>
                <div className="bg-neutral-950 p-6 rounded border border-white/5 font-mono text-xs flex flex-col justify-between">
                  <div className="space-y-6">
                    <h3 className="text-white border-b border-white/10 pb-2 uppercase tracking-wider">// PROJECT METADATA</h3>
                    <div><p className="text-gray-500">CREATIVE ROLE</p><p className="text-gray-200 mt-1">{selectedProject.role}</p></div>
                    <div><p className="text-gray-500">AIGC TOOLS PIPELINE</p><p className="text-gray-200 mt-1">{selectedProject.pipeline}</p></div>
                    <div><p className="text-gray-500">SEED CONSTANT</p><p className="text-[#E5A93B] mt-1">{selectedProject.seed}</p></div>
                    <div><p className="text-gray-500">COLOR GRADING</p><p className="text-gray-200 mt-1">{selectedProject.grading}</p></div>
                  </div>
                  <div className="mt-8"><button onClick={() => copyDetailPrompt(selectedProject.prompt)} onMouseMove={handleMouseMove} className="liquid-glass-btn w-full py-4 text-white font-bold uppercase text-center rounded-xl block">{copied ? '✓ COPIED TO CLIPBOARD' : '复制完整 PROMPT 架构'}</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-20 border-t border-white/5 text-gray-600 text-xs font-mono tracking-widest uppercase relative z-10">
        <p>© 2026 CRAFTED IN LATENT SPACE. ALL GENERATIONS PRESERVED.</p>
        <p className="mt-2 text-gray-700">POWERED BY PROMPT ENGINE V6 // DIRECTED VIA NEURAL NETWORKS</p>
      </footer>
    </div>
  );
}
