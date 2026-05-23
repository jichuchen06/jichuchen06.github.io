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
  'cyber-noir': { id: 'cyber-noir', category: 'shorts', title: '《新潮汐 / NEOTIDE》', subtitle: 'AIGC 电影质感科幻短片 - AI电影节最佳叙事大奖作品', videoSrc: '/works/work-01-preview.mp4', engine: '// SYSTEM: RUNWAY-GEN-3_ANAMORPHIC_LENS', prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0', concept: '《新潮汐》是一部探索AI幻觉、后数字文明末日的实验短片。整个短片的生成过程避开了传统的镜头，完全依赖Midjourney生成的高保真帧图，并结合Runway的深度运动控制引擎来进行动态渲染。整部影片在微弱的冷色调与刺眼的霓虹光污染之间保持微妙的张力。', role: 'AI Video Director / Editor / Sound Design', pipeline: 'Midjourney V6 + Runway Gen-3 + DaVinci', seed: '33092817293', grading: 'Neo-noir Cyan and Decaying Amber' },
  'gold-liquid': { id: 'gold-liquid', category: 'commercials', title: '《液态重力 / LIQUID GRAVITY》', subtitle: 'X-LUXURY 品牌 AI 概念广告特辑', videoSrc: '/works/work-02-preview.mp4', engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING', prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 16:9 --stylize 750', concept: '此项目是为知名奢侈品牌定制的AI概念先导片。主视觉旨在通过无重力环境，模拟顶级机械表配件与高粘度液态黄金的缠绕流动。该作核心挑战在于流体的微距光影控制，我们使用了复杂的材质修饰词（pristine obsidian, polished platinum）来诱导引擎生成近乎实体质感的物理折射。', role: 'AIGC Art Director / Keyframe Designer', pipeline: 'Stable Diffusion + MJ V6 + Kling AI', seed: '5561029418', grading: 'Warm Champagne Gold & Pitch Black' },
  'matrix-dream': { id: 'matrix-dream', category: 'prompts', title: '《母体纠缠 / MATRIX ENTANGLEMENT》', subtitle: '基于超级变量与负向调度的多维视觉框架体系', videoSrc: '/works/work-03-preview.mp4', engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW', prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw', concept: '本系统展示了 AIGC 的控图边界。我们并不单方面依靠AI的随机创造力，而是建立了一套“结构化母体提示词（Structured Matrix Prompting）”系统。通过精确控制噪点比例（Denoising Strength）和语义解析分级，实实现在长镜头序列中保持物体和光影的一致性。', role: 'Lead Prompt Architect', pipeline: 'Midjourney Matrix Blueprinting', seed: '998412039', grading: 'Terminal Green & Monochromatic Shadows' },
  'analog-rust': { id: 'analog-rust', category: 'shorts', title: '《旧磁铁与荒野 / ANALOG RUST》', subtitle: '35mm 模拟怀旧电影短片先导视觉', videoSrc: '/works/work-04-preview.mp4', engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE', prompt: 'Earthy cinematic medium shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 16:9 --style raw', concept: '《旧磁铁与荒野》通过 AIGC 的生成，逆向探索上世纪70年代胶片的杂质感和光学缺陷（如镜头眩光、暗角 and 感光乳剂不均）。提示词中特意去除了常规“超清/4k”等现代描述，转而堆叠了“damp, rusted, film grain, analog style”等带有粗糙现实属性的自然语素。', role: 'Director / Editor', pipeline: 'Sora Beta + Luma Dream Machine', seed: '197410293', grading: 'Faded Kodachrome Film emulation' }
};

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = selectedProjectId ? projectsData[selectedProjectId] : null;

  return (
    <section id="work" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-10 flex flex-wrap gap-3 text-xs font-mono">
        <button onClick={() => setActiveCategory('all')} className="liquid-glass-btn rounded-lg px-4 py-2 text-gray-200">ALL PROJECTS</button>
        <button onClick={() => setActiveCategory('shorts')} className="liquid-glass-btn rounded-lg px-4 py-2 text-gray-200">AI FILMS</button>
        <button onClick={() => setActiveCategory('commercials')} className="liquid-glass-btn rounded-lg px-4 py-2 text-gray-200">COMMERCIALS</button>
        <button onClick={() => setActiveCategory('prompts')} className="liquid-glass-btn rounded-lg px-4 py-2 text-gray-200">SYSTEM / PROMPTS</button>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {Object.values(projectsData).filter((p) => activeCategory === 'all' || p.category === activeCategory).map((project) => (
          <article key={project.id} className="group cursor-pointer" onClick={() => setSelectedProjectId(project.id)}>
            <div className="relative aspect-video overflow-hidden rounded border border-white/10 bg-neutral-900">
              <video src={project.videoSrc} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 font-mono text-xs text-gray-500">{project.subtitle}</p>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 p-6">
          <button className="liquid-glass-btn rounded-full px-4 py-2 text-xs" onClick={() => setSelectedProjectId(null)}>CLOSE</button>
          <div className="mx-auto mt-6 max-w-5xl">
            <video src={selectedProject.videoSrc} autoPlay muted loop playsInline className="aspect-video w-full rounded border border-white/10 object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
