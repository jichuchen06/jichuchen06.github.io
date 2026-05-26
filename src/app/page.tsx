'use client';

import React, { useState, useEffect } from 'react';

// 项目数据模型
interface Project {
  id: string;
  category: 'shorts' | 'commercials' | 'prompts';
  title: string;
  subtitle: string;
  coverSrc: string;
  fullVideoUrl: string;
  aspectRatio: 'horizontal' | 'vertical';
  engine: string;
  prompt: string;
  workflow: string;
  concept: string;
  role: string;
  pipeline: string;
  seed: string;
  grading: string;
}

const projectsData: Record<string, Project> = {
  // 4个横屏电影作品 (16:9 / 2.39:1)
  'cyber-noir': {
    id: 'cyber-noir',
    category: 'shorts',
    title: '《新潮汐 / NEOTIDE》',
    subtitle: 'AIGC 电影质感科幻短片 - AI电影节最佳叙事大奖作品',
    coverSrc: '/works/work-01-preview.mp4',
    fullVideoUrl: '/works/work-01-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS',
    prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '《新潮汐》是一部探索AI幻觉、后数字文明末日的实验短片。整个短片的生成过程避开了传统的镜头，完全依赖Midjourney生成的高保真帧图，并结合Runway的深度运动控制引擎来进行动态渲染。整部影片在微弱的冷色调与刺眼的霓虹光污染之间保持微妙的张力。',
    role: 'AI Video Director / Editor / Sound Design',
    pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci',
    seed: '33092817293',
    grading: 'Neo-noir Cyan and Decaying Amber'
  },
  'matrix-dream': {
    id: 'matrix-dream',
    category: 'prompts',
    title: '《母体纠缠 / MATRIX ENTANGLEMENT》',
    subtitle: '基于超级变量与负向调度的多维视觉框架体系',
    coverSrc: '/works/work-03-preview.mp4',
    fullVideoUrl: '/works/work-03-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW',
    prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '本系统展示了 AIGC 的控图边界。我们建立了一套“结构化母体提示词（Structured Matrix Prompting）”系统。通过精确控制噪点比例（Denoising Strength）和语义解析分级，实现在长镜头序列中保持物体 and 光影的一致性。',
    role: 'Lead Prompt Architect',
    pipeline: 'Midjourney Matrix Blueprinting',
    seed: '998412039',
    grading: 'Terminal Green & Monochromatic Shadows'
  },
  'dust-odyssey': {
    id: 'dust-odyssey',
    category: 'shorts',
    title: '《尘埃奥德赛 / DUST ODYSSEY》',
    subtitle: '写实废土风格叙事镜头 - 探索微观尘埃粒子动力学',
    coverSrc: '/works/work-01-preview.mp4',
    fullVideoUrl: '/works/work-01-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: SORA-PARTICLE_SIMULATION_V2',
    prompt: 'Earthy dramatic anamorphic medium shot of a solo astronaut walking slowly through a giant rusty metallic desert, atmospheric dust particles floating in back-light, golden hour sunset glow, highly detailed, photorealistic, cinematic movie grade --ar 2.39:1 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '《尘埃奥德赛》重点在于对重力物理学和微观悬浮物质的AI算法控制。我们利用了高强度的粒度调节，使得环境中的沙尘在斜阳的林布兰光影下呈现出极具感官实感的分离运动。',
    role: 'Director / Visual Lead',
    pipeline: 'Midjourney + Sora + Stable Diffusion Lora',
    seed: '10928374921',
    grading: 'Muted Earthy Ochre & Deep Amber'
  },
  'synthetic-dawn': {
    id: 'synthetic-dawn',
    category: 'prompts',
    title: '《合成黎明 / SYNTHETIC DAWN》',
    subtitle: '多模态时序融合框架 - 模拟极端自然气候与工业共生',
    coverSrc: '/works/work-03-preview.mp4',
    fullVideoUrl: '/works/work-03-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: COGNITIVE-FLOW_WEATHER_EMULATOR',
    prompt: 'Extreme cinematic wide shot of an automated lithium refinery during an electric blizzard, crackling turquoise lightning bolts striking the towering silver exhaust stacks, dramatic high-contrast atmospheric grading, 35mm cinematic lens --ar 2.39:1',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '此框架深入探讨了在时序生成模型中对气象学剧烈运动的干预。通过结合局部动态遮罩与闪电瞬间的高光曝光反差，使得冰川暴雪与数字火花产生的物理交互感达到影院级品质。',
    role: 'Technical Prompt Director',
    pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci Resolve',
    seed: '44820193872',
    grading: 'Electric Turquoise & Liquid Silver'
  },

  // 3个竖屏广告/创意短片 (9:16)
  'gold-liquid': {
    id: 'gold-liquid',
    category: 'commercials',
    title: '《液态重力 / LIQUID GRAVITY》',
    subtitle: 'X-LUXURY 品牌 AI 概念广告特辑',
    coverSrc: '/works/work-02-preview.mp4',
    fullVideoUrl: '/works/work-02-preview.mp4',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING',
    prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 9:16 --stylize 750',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '此项目是为知名奢侈品牌定制的 9:16 竖屏全案概念广告。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的转换流动。竖屏构图能够极好地在移动端传递视觉流的张力。',
    role: 'AIGC Art Director / Keyframe Designer',
    pipeline: 'Stable Diffusion + MJ V6 + Kling AI',
    seed: '5561029418',
    grading: 'Warm Champagne Gold & Pitch Black'
  },
  'analog-rust': {
    id: 'analog-rust',
    category: 'shorts',
    title: '《旧磁铁与荒野 / ANALOG RUST》',
    subtitle: '35mm 模拟怀旧电影短片先导视觉',
    coverSrc: '/works/work-04-preview.mp4',
    fullVideoUrl: '/works/work-04-preview.mp4',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE',
    prompt: 'Earthy cinematic portrait shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 9:16 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '《旧磁铁与荒野》通过 AIGC 的生成，逆向探索上世纪70年代胶片的杂质感和光学缺陷。为了适应现代短视频的分发场景，本片实验性地使用了 9:16 构图。',
    role: 'Director / Editor',
    pipeline: 'Sora Beta + Luma Dream Machine',
    seed: '197410293',
    grading: 'Faded Kodachrome Film emulation'
  },
  'neon-pulse': {
    id: 'neon-pulse',
    category: 'commercials',
    title: '《霓虹脉冲 / NEON PULSE》',
    subtitle: '时尚先锋垂直视感广告 - 情感算法流动视觉',
    coverSrc: '/works/work-02-preview.mp4',
    fullVideoUrl: '/works/work-02-preview.mp4',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: COGNITIVE-FLOW_PORTRAIT_STREAM',
    prompt: 'A fast-paced vertical portrait of a model wrapped in liquid neon light-wires, cyberpunk wet skin aesthetic, high speed camera pans, dynamic volumetric lighting, hyper-real textures --ar 9:16',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '本作品深入探讨时尚媒介的移动化。9:16 的物理视框被视为一个流动发光体，我们将模特的脸庞与无序交织的液态光轨作为核心语言。',
    role: 'Visual Director / Stylist',
    pipeline: 'SDXL ControlNet + Runway Gen-3',
    seed: '88390129381',
    grading: 'Vibrant Acid Magenta & Deep Onyx'
  }
};

// 软件堆栈
const softwareStack = [
  { name: "Premiere Pro / After Effects", desc: "剪辑节奏 / 动态包装 / 字幕设计 / 视觉合成" },
  { name: "DaVinci Resolve", desc: "影像调色 / 颗粒质感 / 色彩管理 / 最终输出" },
  { name: "TapNow / AI Platform", desc: "AI 视频流程 / 模板化生产 / 内容提效" },
  { name: "Codex / AI Coding", desc: "网站搭建 / 交互原型 / 工作流自动化 / 代码协作" }
];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [wxCopied, setWxCopied] = useState<boolean>(false);

  // 滚动进入可视区域动效控制 (Intersection Observer)
  useEffect(() => {
    let observer: IntersectionObserver;
    
    const timer = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -60px 0px"
      });

      const animatedElements = document.querySelectorAll('.scroll-animate');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeCategory]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  const horizontalProjects = Object.values(projectsData).filter(
    p => p.aspectRatio === 'horizontal' && (activeCategory === 'all' || p.category === activeCategory)
  );

  const verticalProjects = Object.values(projectsData).filter(
    p => p.aspectRatio === 'vertical' && (activeCategory === 'all' || p.category === activeCategory)
  );

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen antialiased relative selection:bg-[#E5A93B]/30 select-none overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* 胶片噪点背景层 */
        .film-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 99;
        }

        /* 呼吸灯效果 */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .rec-dot {
          animation: pulse 1.5s infinite;
        }

        /* iOS 液态玻璃按钮样式 */
        .liquid-glass-btn {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1.5px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.5);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease;
        }
        .liquid-glass-btn::before {
          content: '';
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(229, 169, 59, 0.28) 0%, rgba(229, 169, 59, 0.03) 55%, transparent 75%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .liquid-glass-btn:hover::before {
          transform: translate(-50%, -50%) scale(1.4);
        }
        .liquid-glass-btn:hover {
          transform: scale(1.03) translateY(-1px);
          border-color: rgba(229, 169, 59, 0.25);
          box-shadow: 0 15px 35px rgba(229, 169, 59, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.35);
        }
        .liquid-glass-btn:active {
          transform: scale(0.97) translateY(0);
          transition: transform 0.1s ease;
        }

        /* 潜空间流体光晕无序漂浮与旋转动效 */
        @keyframes driftOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(12%, -15%) scale(1.15) rotate(120deg); }
          66% { transform: translate(-8%, 18%) scale(0.9) rotate(240deg); }
        }
        @keyframes driftOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          40% { transform: translate(-15%, 10%) scale(0.85) rotate(-90deg); }
          70% { transform: translate(10%, -20%) scale(1.2) rotate(180deg); }
        }
        .latent-orb-1 {
          animation: driftOrb1 28s infinite ease-in-out;
        }
        .latent-orb-2 {
          animation: driftOrb2 34s infinite ease-in-out;
        }

        /* 原生滚动动画 */
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-animate.scroll-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 视频卡片高光全息扫描 */
        @keyframes sweep {
          0% { transform: translate(-100%, -100%) rotate(45deg); }
          100% { transform: translate(100%, 100%) rotate(45deg); }
        }
        .scan-overlay::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 200%; height: 200%;
          background: linear-gradient(to bottom right, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0) 58%);
          transform: translate(-100%, -100%) rotate(45deg);
          pointer-events: none;
        }
        .group:hover .scan-overlay::after {
          animation: sweep 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* 弹窗元素级联延迟 */
        @keyframes cascadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-cascade-video { animation: cascadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-cascade-left { animation: cascadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
        .anim-cascade-right { animation: cascadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
      `}} />

      <div className="film-grain" />

      {/* 潜空间流体光晕背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="latent-orb-1 absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-screen filter blur-[150px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(229, 169, 59, 0.15) 0%, transparent 70%)' }} />
        <div className="latent-orb-2 absolute bottom-[20%] right-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, rgba(255, 59, 48, 0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <nav className="fixed w-full z-50 bg-[#050505]/75 backdrop-blur-[25px] border-b border-white/5 transition-all duration-1000 ease-out translate-y-0 opacity-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="w-2.5 h-2.5 bg-[#FF3B30] rounded-full rec-dot"></span>
            <span className="text-sm tracking-[0.2em] font-bold text-white uppercase group-hover:text-[#E5A93B] transition duration-300">AIGC.STUDIO</span>
          </div>
          <div className="space-x-6 text-xs tracking-widest font-mono text-gray-400 flex items-center">
            <a href="#work-section" className="hover:text-white transition duration-300">01 // WORK</a>
            <a href="#about-section" className="hover:text-white transition duration-300">02 // ABOUT</a>
            <a 
              href="mailto:director@aigc.studio" 
              className="liquid-glass-btn text-white px-4 py-2 text-xs font-mono tracking-wider rounded-lg"
              onMouseMove={handleMouseMove}
            >
              DIRECT CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* 首页第一屏 (Hero Area) */}
      <header className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden">
        {/* 电影流视频背景 */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70 filter brightness-[0.8] contrast-[1.1]"
          >
            <source src="/backgrounds/hero-bg.mp4" type="video/mp4" /> 
          </video>
          {/* 大银幕渐变阴影蒙版 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]"></div>
        </div>

        {/* 核心叙事标题与动作指令 (首屏即刻加载淡入) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center transition-all duration-1000">
          <p className="text-xs font-mono tracking-[0.3em] text-[#E5A93B] mb-6 uppercase animate-pulse">// I am turning imagination into reality</p>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-8">
          VISUAL WORKS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700">IN THE AI ERA.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-10">
            这里收录我的影像作品、广告视觉、AIGC设计。我关注故事、风格、分镜、AI技术与后期剪辑之间的完整创作流程。
          </p>

          {/* iOS 悬液玻璃按钮组 */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="#work-section" 
              className="liquid-glass-btn text-white px-8 py-3.5 text-sm font-bold tracking-wider rounded-xl cursor-pointer"
              onMouseMove={handleMouseMove}
            >
              浏览最新作品 (SHORTS)
            </a>
            <a 
              href="#about-section" 
              className="liquid-glass-btn text-gray-300 px-8 py-3.5 text-sm font-mono tracking-wider rounded-xl cursor-pointer"
              onMouseMove={handleMouseMove}
            >
              关于与联系 (ABOUT)
            </a>
          </div>
        </div>

        {/* 底部仪表盘元数据信息 */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/5 text-xs font-mono text-gray-500">
          <div>
            <p className="text-gray-300">// CORE ENGINE</p>
            <p className="mt-1">Midjourney V6 / Runway Gen-3 / Sora</p>
          </div>
          <div>
            <p className="text-gray-300">// RECENT ACCOLADES</p>
            <p className="mt-1">AI Film Fest Gold Winner '25</p>
          </div>
          <div>
            <p className="text-gray-300">// ACTIVE REGION</p>
            <p className="mt-1">Tokyo / Las Vegas / Decentered</p>
          </div>
          <div>
            <p className="text-gray-300">// STATUS</p>
            <p className="mt-1 text-[#E5A93B] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93B]"></span> GENERATING NEXT
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid Section */}
      <section id="work-section" className="pt-32 pb-32 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* 顶部标题与筛选菜单 (滚动淡入动画) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 scroll-animate">
          <div>
            <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 01 / CINEMATIC ARCHIVES</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight uppercase">作品目录</h1>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0 font-mono text-xs">
            <button 
              onClick={() => setActiveCategory('all')} 
              onMouseMove={handleMouseMove}
              className={`liquid-glass-btn px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all duration-300 ${activeCategory === 'all' ? 'text-white border-[#E5A93B]/40' : 'text-gray-400 border-transparent'}`}
            >
              ALL PROJECTS
            </button>
            <button 
              onClick={() => setActiveCategory('shorts')} 
              onMouseMove={handleMouseMove}
              className={`liquid-glass-btn px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all duration-300 ${activeCategory === 'shorts' ? 'text-white border-[#E5A93B]/40' : 'text-gray-400 border-transparent'}`}
            >
              AI FILMS
            </button>
            <button 
              onClick={() => setActiveCategory('commercials')} 
              onMouseMove={handleMouseMove}
              className={`liquid-glass-btn px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all duration-300 ${activeCategory === 'commercials' ? 'text-white border-[#E5A93B]/40' : 'text-gray-400 border-transparent'}`}
            >
              COMMERCIALS
            </button>
            <button 
              onClick={() => setActiveCategory('prompts')} 
              onMouseMove={handleMouseMove}
              className={`liquid-glass-btn px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all duration-300 ${activeCategory === 'prompts' ? 'text-white border-[#E5A93B]/40' : 'text-gray-400 border-transparent'}`}
            >
              SYSTEM / PROMPTS
            </button>
          </div>
        </div>

        {/* 横屏作品 (Horizontal Grid) */}
        {horizontalProjects.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-2 scroll-animate">
              <span className="w-1.5 h-1.5 bg-[#E5A93B] rounded-full"></span>
              <h2 className="text-sm font-mono text-[#E5A93B] tracking-[0.25em] uppercase">横屏电影院线 // CINEMATIC REELS (16:9 / 2.39:1)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {horizontalProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group cursor-pointer w-full transition-transform duration-500 hover:-translate-y-1 scroll-animate"
                  style={{ transitionDelay: `${index * 150}ms` } as React.CSSProperties} // 递增卡片级联动效
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <div className="relative aspect-video w-full overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500 rounded bg-gradient-to-br from-neutral-900 to-[#0c0c0c] scan-overlay">
                    <img
                      src={project.coverSrc}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="text-[#E5A93B] uppercase">// COMPILING LATENT MATRIX</p>
                        <p>RATIO: 2.39:1 // ANAMORPHIC</p>
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
          </div>
        )}

        {/* 竖屏作品 (Vertical Grid) */}
        {verticalProjects.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-2 scroll-animate">
              <span className="w-1.5 h-1.5 bg-[#E5A93B] rounded-full"></span>
              <h2 className="text-sm font-mono text-[#E5A93B] tracking-[0.25em] uppercase">竖屏先锋视觉 // VERTICAL MONITORS (9:16)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
              {verticalProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group cursor-pointer w-full transition-transform duration-500 hover:-translate-y-1 scroll-animate"
                  style={{ transitionDelay: `${index * 150}ms` } as React.CSSProperties} // 递增卡片级联动效
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <div className="relative aspect-[9/16] max-w-[360px] mx-auto overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500 rounded bg-gradient-to-br from-neutral-900 to-[#0c0c0c] scan-overlay">
                    <img
                      src={project.coverSrc}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="text-[#E5A93B] uppercase">// VERTICAL PORTRAIT</p>
                        <p>RATIO: 9:16 // VERTICAL</p>
                      </div>
                      <span className="liquid-glass-btn px-3 py-1.5 text-white rounded-lg text-xs font-mono tracking-wide" onMouseMove={handleMouseMove}>VIEW BLUEPRINT</span>
                    </div>
                  </div>
                  <div className="mt-4 max-w-[360px] mx-auto flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#E5A93B] transition duration-300">{project.title}</h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">{project.subtitle}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-500">// 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about-section" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10 scroll-animate">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 左半区：导演简介 (滚动淡入动画) */}
          <div className="lg:col-span-5 flex flex-col justify-between scroll-animate">
            <div>
              <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 02 / VISIONARY INTEL</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-2">关于导演。</h2>
              <div className="mt-8 space-y-6 text-gray-400 font-light leading-relaxed">
                <p>在传统实拍电影向潜空间叙事让步的拐点，作为 “Prompt Director”，我认为文字不仅是表达的媒介，更是雕刻视觉光影的“参数剪刀”。</p>
                <p>我专注于 AIGC 视觉体系的一致性开发。通过深度整合 Midjourney、Stable Diffusion 控图技巧以及 Runway/Sora 等多模态时序工具，将创意极速转换为好莱坞质感的艺术表达。</p>
              </div>
            </div>

            {/* 期待开展联合 */}
            <div className="mt-12 pt-8 border-t border-white/5 hidden lg:block">
              <p className="text-xs text-gray-500">期待开展品牌联合、短片创作与商业顾问</p>
              <p className="text-lg text-white font-bold mt-1">collaboration@aigc.studio</p>
            </div>
          </div>

          {/* 右半区：精美极简 AIGC 专业核心技能与工具展示 (滚动淡入动画) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 p-8 rounded-2xl border border-white/5 font-mono relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A93B]/5 rounded-full filter blur-[80px] pointer-events-none" />
            
            <div className="space-y-10">
              {/* 工具软件链展示 */}
              <div className="scroll-animate" style={{ transitionDelay: '120ms' } as React.CSSProperties}>
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93B]"></span>
                  // SYSTEM WORKFLOW (工具软件链)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                  {softwareStack.map((tool, index) => (
                    <div
                      key={index}
                      onMouseMove={handleMouseMove}
                      className="liquid-glass-btn h-full p-4 rounded-xl text-left border-white/5 bg-transparent hover:border-white/10 transition-all duration-300 transform hover:scale-[1.02] scroll-animate"
                      style={{ transitionDelay: `${260 + index * 220}ms` } as React.CSSProperties}
                    >
                      <h4 className="text-xs font-bold text-white tracking-wide">{tool.name}</h4>
                      <p className="text-[11px] text-gray-400 font-light mt-1.5">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 社交媒体矩阵 */}
            <div className="mt-12 scroll-animate" style={{ transitionDelay: '260ms' } as React.CSSProperties}>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">// CONNECT CHANNELS (社交与媒体连接)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a href="https://space.bilibili.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '520ms' } as React.CSSProperties}>BILIBILI ↗</a>
                <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '700ms' } as React.CSSProperties}>小红书 ↗</a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '880ms' } as React.CSSProperties}>YOUTUBE ↗</a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '1060ms' } as React.CSSProperties}>INSTAGRAM ↗</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '1240ms' } as React.CSSProperties}>TWITTER / X ↗</a>
                <button onClick={() => copyWeChatID('aigc_director_wechat')} onMouseMove={handleMouseMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center scroll-animate" style={{ transitionDelay: '1420ms' } as React.CSSProperties}>{wxCopied ? '✓ WX COPIED' : 'WECHAT ↗'}</button>
              </div>
            </div>

            {/* 移动端期待合作提示 */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:hidden">
              <div>
                <p className="text-xs text-gray-500">期待开展品牌联合、短片创作与商业顾问</p>
                <p className="text-lg text-white font-bold mt-1">jichuchen06@gmail.com</p>
              </div>
              <a href="jichuchen06@gmail.com" onMouseMove={handleMouseMove} className="liquid-glass-btn text-white px-6 py-3 text-xs font-bold uppercase rounded-lg">发送提案</a>
            </div>
          </div>

        </div>
      </section>

      {/* Pop-up Detail Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-center transition-all duration-500 ease-out">
          <div className="min-h-screen px-6 py-20 flex flex-col justify-center">
            <div className="max-w-5xl mx-auto w-full relative">
              <button onClick={() => setSelectedProjectId(null)} onMouseMove={handleMouseMove} className="liquid-glass-btn absolute -top-14 right-0 px-4 py-2 rounded-full text-gray-400 hover:text-white font-mono text-xs tracking-widest flex items-center space-x-2">
                <span>CLOSE / EXIT ✕</span>
              </button>
              
              {/* 弹窗元素级联动效部分 */}
              <div className="anim-cascade-video relative w-full bg-neutral-900 rounded overflow-hidden border border-white/10 mb-8 shadow-2xl transition-all duration-700 ease-out p-0.5" style={{ transform: 'translateY(0)' }}>
                <div className={`relative w-full overflow-hidden rounded ${selectedProject.aspectRatio === 'vertical' ? 'aspect-[9/16] max-w-[360px] mx-auto' : 'aspect-video'}`}>
                  <a
                    href={selectedProject.fullVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full h-full cursor-pointer"
                  >
                    <img
                      src={selectedProject.coverSrc}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="rounded-full border border-white/20 bg-black/40 px-6 py-3 text-xs font-mono tracking-[0.25em] text-white uppercase">
                        CLICK TO WATCH
                      </span>
                    </div>
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 font-mono text-xs text-[#E5A93B] pointer-events-none">
                    <p>{selectedProject.engine}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                {/* 详情左半区 */}
                <div className="lg:col-span-2 space-y-8 anim-cascade-left">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white">{selectedProject.title}</h2>
                    <p className="text-lg text-gray-400 font-light mt-2">{selectedProject.subtitle}</p>
                  </div>
                  <div className="bg-neutral-950 p-6 rounded border border-white/5 font-mono relative">
                    <p className="text-xs text-[#E5A93B] mb-3 uppercase tracking-widest">// CREATIVE WORKFLOW (创作工作流)</p>
                    <div className="text-sm text-gray-300 leading-relaxed bg-[#0d0d0d] p-4 rounded border border-white/5 select-all overflow-x-auto whitespace-pre-wrap">{selectedProject.workflow}</div>
                    <span className="text-[10px] text-gray-500 mt-2 block">项目流程概览</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 mb-2">// DIRECTING CONCEPT (导演阐述)</h3>
                    <p className="text-gray-300 leading-relaxed font-light">{selectedProject.concept}</p>
                  </div>
                </div>

                {/* 详情右半区 */}
                <div className="bg-neutral-950 p-6 rounded border border-white/5 font-mono text-xs flex flex-col justify-between anim-cascade-right">
                  <div className="space-y-6">
                    <h3 className="text-white border-b border-white/10 pb-2 uppercase tracking-wider">// PROJECT METADATA（项目元信息）</h3>
                    <div>
                      <p className="text-gray-500">CREATIVE ROLE（创作角色）</p>
                      <p className="text-gray-200 mt-1">创作职责：{selectedProject.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">AIGC TOOLS PIPELINE（工具流程）</p>
                      <p className="text-gray-200 mt-1">制作流程：{selectedProject.pipeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-20 border-t border-white/5 text-gray-600 text-xs font-mono tracking-widest uppercase relative z-10">
        <p>© 2026 CRAFTED IN LATENT SPACE. ALL GENERATIONS PRESERVED.</p>
        <p className="mt-2 text-gray-700">POWERED BY PROMPT ENGINE V6 // DIRECTED VIA NEURAL NETWORKS</p>
      </footer>
    </div>
  );
}
