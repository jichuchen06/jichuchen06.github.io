'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import BlurText from '@/components/BlurText';

const CircularGallery = dynamic(() => import('@/components/CircularGallery'), {
  ssr: false,
}) as React.ComponentType<{
  items: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
}>;
const AnimatedContent = dynamic(() => import('@/components/AnimatedContent'), { ssr: false });
const ColorBends = dynamic(() => import('@/components/ColorBends'), { ssr: false });

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
  duration: string;
  format: string;
  visualStrategy: string;
  seed: string;
  grading: string;
}


const projectsData: Record<string, Project> = {
  // 4个横屏电影作品 (16:9 / 2.39:1)
  'cyber-noir': {
    id: 'cyber-noir',
    category: 'shorts',
    title: '《一路速腾，一生相伴》',
    subtitle: 'AIGC 广告短片 / 大众速腾汽车品牌宣传片',
    coverSrc: '/works/work-01-cover.jpg',
    fullVideoUrl: 'https://www.xinpianchang.com/a1364986?from=share&pcApp=xpc&channel=link&type=URL',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: BANANA + KLING + DAVINCI',
    prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0',
    workflow: '本项目从文本创意出发，前期重点围绕叙事节奏、场景关系与空间调度进行策划，明确画面中的人物动线、镜头视角与情绪推进。制作阶段通过多参全能参考建立统一的角色、场景与镜头关系，增强画面连续性和空间可信度；后期则通过剪辑节奏、颗粒质感与影调处理，强化广告片的情绪氛围与品牌记忆点。',
    concept: '这是一支围绕“大众速腾”展开的 AIGC 汽车广告短片，以陪伴、家庭与出行为核心情绪，结合品牌传播需求完成视觉化表达。',
    role: '编导 / 调色 / AIGCer',
    pipeline: 'BANANA + KLING + DaVinci',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '空间调度 / 实验影像 / 品牌叙事',
    seed: '33092817293',
    grading: 'Neo-noir Cyan and Decaying Amber'
  },
  'matrix-dream': {
    id: 'matrix-dream',
    category: 'prompts',
    title: '《风筝/Kite》',
    subtitle: 'AIGC 短片 ',
    coverSrc: '/works/work-02-cover.jpg',
    fullVideoUrl: 'https://www.xinpianchang.com/a13696432?from=share&xpcApp=xpc&channel=link&type=URL',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW',
    prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw',
    workflow: '从剧情出发，先不急着写音乐术语，而是先说清楚这段戏在讲什么。接着再说这段戏适合什么风格，明确地说：德国表现主义、实验短片、冷灰色极简配乐、心理压迫感和迷幻、眩晕、扭曲、变形的听感。这时候再由 GPT-5.5 来做最关键的一步：把“剧情 + 风格 + 听感”翻译成 Suno 能理解的 prompt，并提供多个方向供选择。简单点说，把自己当甲方，明确自己的需求，然后再交付给AI',
    concept: '在一个冷灰色的极简空间里，两个不同阶层的孩子原本平等地放着风筝。一次分享糖果的举动被精英父亲阻止后，两个父亲将孩子之间单纯的游戏变成一场关于面子的较量。随着风筝越飞越高，父亲们的面孔逐渐清晰，孩子们的五官却慢慢消失。最终，缠绕的风筝线断裂，孩子们摔倒在地，而失去束缚的风筝反而飞向更高的天空。',
    role: 'AIGCer / 配乐',
    pipeline: 'Banana系列 / Kling AI / Suno',
    duration: '05:23',
    format: 'AIGC 短片 / 横屏 16:9',
    visualStrategy: '家庭教育 / 实验影像 / 表现主义',
    seed: '998412039',
    grading: 'Terminal Green & Monochromatic Shadows'
  },
  'dust-odyssey': {
    id: 'dust-odyssey',
    category: 'shorts',
    title: '《家乡的味道》',
    subtitle: 'AI MV / 深圳首届AI幻境电影节-智影佳作奖',
    coverSrc: '/works/work-03-cover.jpg',
    fullVideoUrl: ' https://lingya.qq.com/video/l12568zvfj9',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: SORA-PARTICLE_SIMULATION_V2',
    prompt: 'Earthy dramatic anamorphic medium shot of a solo astronaut walking slowly through a giant rusty metallic desert, atmospheric dust particles floating in back-light, golden hour sunset glow, highly detailed, photorealistic, cinematic movie grade --ar 2.39:1 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '歌曲民谣摇滚风格为基调，讲述家乡的熟悉味道如何唤起童年回忆、人生情感与生活的温度。',
    role: 'AIGCer',
    pipeline: 'Suno + Banana + Kling',
    duration: '03:45',
    format: 'AI MV / 横屏 16:9',
    visualStrategy: '纪实写实 / 民谣摇滚 ',
    seed: '10928374921',
    grading: 'Muted Earthy Ochre & Deep Amber'
  },
  'synthetic-dawn': {
    id: 'synthetic-dawn',
    category: 'prompts',
    title: '《绿灯行》',
    subtitle: '实拍短片 / 湖南省第二届马栏山青年大学视频文创节“百佳作品”',
    coverSrc: '/works/work-04-cover.jpg',
    fullVideoUrl: '/works/work-03-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: COGNITIVE-FLOW_WEATHER_EMULATOR',
    prompt: 'Extreme cinematic wide shot of an automated lithium refinery during an electric blizzard, crackling turquoise lightning bolts striking the towering silver exhaust stacks, dramatic high-contrast atmospheric grading, 35mm cinematic lens --ar 2.39:1',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '此框架深入探讨了在时序生成模型中对气象学剧烈运动的干预。通过结合局部动态遮罩与闪电瞬间的高光曝光反差，使得冰川暴雪与数字火花产生的物理交互感达到影院级品质。',
    role: 'Technical Prompt Director',
    pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci Resolve',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '长镜头 / 家庭氛围 / 学生短片',
    seed: '44820193872',
    grading: 'Electric Turquoise & Liquid Silver'
  },

  // 3个竖屏广告/创意短片 (9:16)
  'gold-liquid': {
    id: 'gold-liquid',
    category: 'commercials',
    title: '《Strinova》',
    subtitle: '新游戏角色宣发 - 9:16 竖屏社媒官号短视频',
    coverSrc: '/works/work-01-vertical-cover.jpg',
    fullVideoUrl: 'https://youtube.com/shorts/uiXhISX3lLs?si=3QgtVGFXegDtCS5B',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING',
    prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 9:16 --stylize 750',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '此项目是为知名奢侈品牌定制的 9:16 竖屏全案概念广告。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的转换流动。竖屏构图能够极好地在移动端传递视觉流的张力。',
    role: 'AIGC Art Director / Keyframe Designer',
    pipeline: 'Stable Diffusion + MJ V6 + Kling AI',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '空间调度 / 家庭氛围 / 品牌叙事',
    seed: '5561029418',
    grading: 'Warm Champagne Gold & Pitch Black'
  },
  'analog-rust': {
    id: 'analog-rust',
    category: 'shorts',
    title: '《Wondershare Recoverit》',
    subtitle: '工具类教程视频 - 9:16 竖屏社媒矩阵号短视频',
    coverSrc: '/works/work-02-vertical-cover.jpg',
    fullVideoUrl: 'https://www.tiktok.com/@techhilfe_de',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE',
    prompt: 'Earthy cinematic portrait shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 9:16 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '《旧磁铁与荒野》通过 AIGC 的生成，逆向探索上世纪70年代胶片的杂质感和光学缺陷。为了适应现代短视频的分发场景，本片实验性地使用了 9:16 构图。',
    role: 'Director / Editor',
    pipeline: 'Sora Beta + Luma Dream Machine',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '空间调度 / 家庭氛围 / 品牌叙事',
    seed: '197410293',
    grading: 'Faded Kodachrome Film emulation'
  },
  'neon-pulse': {
    id: 'neon-pulse',
    category: 'commercials',
    title: '《Filmora》',
    subtitle: 'AI工作流教程视频 - 9:16 竖屏社媒矩阵号短视频',
    coverSrc: '/works/work-03-vertical-cover.jpg',
    fullVideoUrl: 'https://www.tiktok.com/@drama.de.frutas22/video/7633628390578244884',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: COGNITIVE-FLOW_PORTRAIT_STREAM',
    prompt: 'A fast-paced vertical portrait of a model wrapped in liquid neon light-wires, cyberpunk wet skin aesthetic, high speed camera pans, dynamic volumetric lighting, hyper-real textures --ar 9:16',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '本作品深入探讨时尚媒介的移动化。9:16 的物理视框被视为一个流动发光体，我们将模特的脸庞与无序交织的液态光轨作为核心语言。',
    role: 'Visual Director / Stylist',
    pipeline: 'SDXL ControlNet + Runway Gen-3',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '空间调度 / 家庭氛围 / 品牌叙事',
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

const connectChannels = [
  { label: 'BILIBILI ↗', href: 'https://space.bilibili.com' },
  { label: '小红书 ↗', href: 'https://www.xiaohongshu.com' },
  { label: 'YOUTUBE ↗', href: 'https://www.youtube.com' },
  { label: 'INSTAGRAM ↗', href: 'https://www.instagram.com' },
  { label: 'TWITTER / X ↗', href: 'https://x.com' },
];

export default function Page() {
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
  }, []);


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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const horizontalProjects = Object.values(projectsData).filter(
    p => p.aspectRatio === 'horizontal'
  );

  const verticalProjects = Object.values(projectsData).filter(
    p => p.aspectRatio === 'vertical'
  );
  const galleryItems = Object.values(projectsData)
    .filter((project) => project.aspectRatio === 'horizontal')
    .map((project) => ({
      image: project.coverSrc,
      text: '',
    }));

  const getProjectBadge = (project: Project) => {
    if (project.format) return project.format.split('/')[0].trim();
    if (project.category === 'shorts') return 'SHORT FILM';
    if (project.category === 'commercials') return 'COMMERCIAL';
    if (project.category === 'prompts') return 'SYSTEM / PROMPTS';
    return 'PROJECT';
  };

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

        @keyframes blurTextIn {
          from {
            opacity: 0;
            filter: blur(10px);
            transform: translate3d(0, var(--blur-from-y, 0.7em), 0);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, 0, 0);
          }
        }
        .blur-text-unit {
          display: inline-block;
          opacity: 0;
          will-change: transform, filter, opacity;
          animation: blurTextIn 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <div className="film-grain" />

      {/* 潜空间流体光晕背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="latent-orb-1 absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-screen filter blur-[150px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(229, 169, 59, 0.15) 0%, transparent 70%)' }} />
        <div className="latent-orb-2 absolute bottom-[20%] right-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, rgba(255, 59, 48, 0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <nav className="fixed w-full max-w-full overflow-hidden z-50 bg-[#050505]/75 backdrop-blur-[25px] border-b border-white/5 transition-all duration-1000 ease-out translate-y-0 opacity-100">
        <div className="max-w-7xl mx-auto w-full px-2 md:px-6 py-3 md:py-4 flex justify-between items-center gap-2 md:gap-3">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="w-2.5 h-2.5 bg-[#FF3B30] rounded-full rec-dot"></span>
            <span className="text-[11px] md:text-sm tracking-[0.12em] md:tracking-[0.2em] font-bold text-white uppercase group-hover:text-[#E5A93B] transition duration-300">AIGC.STUDIO</span>
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-[0.12em] md:tracking-[0.25em] text-gray-400 flex items-center gap-2 md:gap-6 whitespace-nowrap min-w-0">
            <a href="#work-section" className="hover:text-white transition duration-300">01 // WORK</a>
            <a href="#about-section" className="hover:text-white transition duration-300">02 // ABOUT</a>
            <a 
              href="mailto:director@aigc.studio" 
              className="liquid-glass-btn text-white px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-mono tracking-[0.05em] md:tracking-wider rounded-lg shrink-0"
              onMouseMove={handleMouseMove}
            >
              <span className="md:hidden">CONTACT</span>
              <span className="hidden md:inline">DIRECT CONTACT</span>
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
          
          <div className="mb-8 text-5xl leading-[0.9] font-black tracking-tight uppercase md:text-8xl">
            <BlurText
              text="VISUAL WORKS"
              delay={55}
              animateBy="letters"
              direction="top"
              className="block whitespace-nowrap text-white"
            />
            <BlurText
              text="IN THE AI ERA."
              delay={45}
              animateBy="letters"
              direction="bottom"
              className="block whitespace-nowrap"
              segmentClassName="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
            />
          </div>

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

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-6 md:mt-8 mb-0">
          <div className="relative h-[220px] md:h-[280px] w-full overflow-hidden">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          </div>
        </div>
      </header>

      {/* Main Grid Section */}
      <section id="work-section" className="pt-20 md:pt-24 pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <ColorBends
            colors={['#E5A93B', '#1F3A34', '#6B7280']}
            rotation={90}
            speed={0.12}
            scale={1.15}
            frequency={0.75}
            warpStrength={0.6}
            mouseInfluence={0.25}
            noise={0.08}
            parallax={0.25}
            iterations={1}
            intensity={0.7}
            bandWidth={5}
            transparent
          />
        </div>
        <div className="relative z-10">
        {/* 顶部标题 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 scroll-animate">
          <div>
            <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 01 / CINEMATIC ARCHIVES</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight uppercase">作品目录</h1>
          </div>
        </div>

        {/* 横屏作品 (Horizontal Grid) */}
        {horizontalProjects.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-2 scroll-animate">
              <span className="w-1.5 h-1.5 bg-[#E5A93B] rounded-full"></span>
              <h2 className="text-sm font-mono text-[#E5A93B] tracking-[0.25em] uppercase">横屏电影院线 // CINEMATIC REELS (16:9 / 2.39:1)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
                        <p className="text-[#E5A93B] uppercase">{getProjectBadge(project)}</p>
                        <p>RATIO: 16:9 // ANAMORPHIC</p>
                      </div>
                      <span className="liquid-glass-btn px-3 py-1.5 text-white rounded-lg text-xs font-mono tracking-wide" onMouseMove={handleMouseMove}>VIEW BLUEPRINT</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E5A93B] transition duration-300">{project.title}</h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">{project.subtitle}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-500">2026</span>
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
                        <p className="text-[#E5A93B] uppercase">{getProjectBadge(project)}</p>
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
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10 scroll-animate">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] mix-blend-screen">
          <ColorBends
            colors={['#E5A93B', '#243B35', '#0F172A']}
            rotation={45}
            speed={0.08}
            scale={1.25}
            frequency={0.6}
            warpStrength={0.45}
            mouseInfluence={0.2}
            noise={0.06}
            parallax={0.2}
            iterations={1}
            intensity={0.55}
            bandWidth={6}
            transparent
          />
        </div>
        <div className="relative z-10">
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
              <p className="text-lg text-white font-bold mt-1">jichuchen06@gmail.com</p>
            </div>
          </div>

          {/* 右半区：精美极简 AIGC 专业核心技能与工具展示 (滚动淡入动画) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 p-8 rounded-2xl border border-white/5 font-mono relative overflow-hidden scroll-animate">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A93B]/5 rounded-full filter blur-[80px] pointer-events-none" />
            
            <div className="flex-1 flex flex-col justify-center gap-14">
              {/* 工具软件链展示 */}
              <div>
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93B]"></span>
                  // SYSTEM WORKFLOW (工具软件链)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                  {softwareStack.map((tool, index) => (
                    <AnimatedContent key={tool.name} distance={40} direction="vertical" reverse={false} duration={0.75} ease="power3.out" initialOpacity={0} animateOpacity scale={0.98} threshold={0.2} delay={index * 0.12}>
                      <div onMouseMove={handleMouseMove} className="liquid-glass-btn h-full p-4 rounded-xl text-left border-white/5 bg-transparent hover:border-white/10 transition-all duration-500 ease-out hover:scale-[1.02]">
                        <h4 className="text-xs font-bold text-white tracking-wide">{tool.name}</h4>
                        <p className="text-[11px] text-gray-400 font-light mt-1.5">{tool.desc}</p>
                      </div>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            </div>

            {/* 社交媒体矩阵 */}
            <div className="mt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">// CONNECT CHANNELS (社交与媒体连接)</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {connectChannels.map((channel, index) => (
                  <div key={channel.label} className="w-full">
                    <AnimatedContent distance={28} direction="vertical" duration={0.65} ease="power3.out" initialOpacity={0} animateOpacity scale={0.98} threshold={0.25} delay={index * 0.1}>
                      <a href={channel.href} target="_blank" rel="noreferrer" onMouseMove={handleMouseMove} className="liquid-glass-btn flex h-11 w-full items-center justify-center rounded-xl border border-white/10 px-4 text-center text-xs font-mono uppercase tracking-[0.18em] text-gray-200 transition-all duration-300 hover:border-[#E5A93B]/50 hover:text-white">{channel.label}</a>
                    </AnimatedContent>
                  </div>
                ))}
                <div className="w-full">
                  <AnimatedContent distance={28} direction="vertical" duration={0.65} ease="power3.out" initialOpacity={0} animateOpacity scale={0.98} threshold={0.25} delay={connectChannels.length * 0.1}>
                    <button onClick={() => copyWeChatID('aigc_director_wechat')} onMouseMove={handleMouseMove} className="liquid-glass-btn flex h-11 w-full items-center justify-center rounded-xl border border-white/10 px-4 text-center text-xs font-mono uppercase tracking-[0.18em] text-gray-200 transition-all duration-300 hover:border-[#E5A93B]/50 hover:text-white">{wxCopied ? '✓ WX COPIED' : 'WECHAT ↗'}</button>
                  </AnimatedContent>
                </div>
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
        </div>
      </section>

      {/* Pop-up Detail Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overscroll-y-contain bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-out"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="min-h-[100dvh]">
            <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10 md:py-16 relative">
              <button
                onClick={() => setSelectedProjectId(null)}
                onMouseMove={handleMouseMove}
                className="group liquid-glass-btn sticky top-6 z-50 mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/50 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-[#E5A93B]/60 hover:text-white hover:shadow-[0_0_24px_rgba(229,169,59,0.18)]"
              >
                <span className="text-[#E5A93B] transition-transform duration-300 group-hover:-translate-x-1">←</span>
                <span className="hidden sm:inline">BACK TO WORKS</span>
                <span className="sm:hidden">BACK</span>
                <span className="ml-1 text-gray-500 group-hover:text-[#E5A93B]">×</span>
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
                     <div>
                      <p className="text-gray-500">DURATION（作品时长）</p>
                      <p className="text-gray-200 mt-1">{selectedProject.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">FORMAT（作品格式）</p>
                      <p className="text-gray-200 mt-1">{selectedProject.format}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">VISUAL STRATEGY（视觉策略）</p>
                      <p className="text-gray-200 mt-1">{selectedProject.visualStrategy}</p>
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
