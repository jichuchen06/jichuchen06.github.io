import { softwareStack } from '@/data/projects';

export default function AboutV2() {
  return (
    <section id="about" className="border-y border-white/10 bg-[#070707] px-5 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#E5A93B]">{'// 02 About the Director'}</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">关于导演。</h2>
          <div className="mt-7 space-y-5 text-sm leading-8 text-zinc-300 sm:text-base">
            <p>我拥有从前期策划、现场拍摄到剪辑、调色与 AIGC 视频生成的完整制作经验，能够完成短片、广告、微电影等不同类型影像内容的全流程创作。</p>
            <p>在传统影像训练的基础上，我更关注文字、镜头、空间调度与视觉风格之间的关系。AIGC 对我来说不是单点生成工具，而是一套从文本概念到可传播视觉内容的生产流程。</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur sm:p-7">
          <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">Production Workflow</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {softwareStack.map((tool) => (
              <div key={tool.name} className="rounded-3xl border border-white/10 bg-black/35 p-5">
                <h4 className="text-sm font-bold text-white">{tool.name}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{tool.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {['Concept', 'AIGC', 'Editing', 'Color'].map((step, index) => (
              <div key={step} className="rounded-2xl border border-[#E5A93B]/20 bg-[#E5A93B]/[0.06] p-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
                <span className="mb-3 block text-[#E5A93B]">0{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
