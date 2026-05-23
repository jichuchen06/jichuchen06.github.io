export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
        <p className="font-mono text-xs tracking-[0.25em] text-[#E5A93B]">// ABOUT</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-white uppercase">ABOUT JICHU</h2>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-300">
          我是影像创作者，拥有丰富的视频制作经验，熟悉拍摄、剪辑、调色及 AIGC 视频创作流程。我的作品横跨短片、广告、视觉实验、Prompt 系统与后期剪辑，关注作品传播效果与商业价值。
        </p>
      </div>
    </section>
  );
}
