"use client";

import { useState, type MouseEvent } from "react";

function onLiquidMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

const heroVideoSrc =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3dc26d36e2f69421df65f72439&profile_id=139&oauth2_token_id=57447761";

const workVideos = [
  "/works/work-01-preview.mp4",
  "/works/work-02-preview.mp4",
  "/works/work-03-preview.mp4",
  "/works/work-04-preview.mp4",
];

export default function Home() {
  const [videoUnavailable, setVideoUnavailable] = useState<Record<string, boolean>>({});
  const [wxCopied, setWxCopied] = useState(false);

  function copyWeChatID(id: string) {
    void navigator.clipboard.writeText(id);
    setWxCopied(true);
    setTimeout(() => setWxCopied(false), 1800);
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
      <div className="film-grain" />

      <nav className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#FF3B30]" />
            <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">AIGC.STUDIO</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono tracking-[0.2em] text-gray-300 uppercase">
            <a href="#work" className="transition hover:text-white">01 // WORK</a>
            <a href="#about" className="transition hover:text-white">02 // ABOUT</a>
            <a href="#contact" className="transition hover:text-white">DIRECT CONTACT</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-4 pb-10 pt-28 md:px-8">
        <section className="relative mx-auto min-h-[calc(100vh-8rem)] w-full max-w-7xl overflow-hidden rounded-[38px] border border-white/8 bg-[#0d0d0d]">
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-25 brightness-[0.4] contrast-[1.1]">
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
          </div>

          <header className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-between px-6 pb-12 pt-14 md:px-10 md:pt-20">
            <div className="max-w-4xl">
              <p className="mb-6 text-xs tracking-[0.3em] text-[#E5A93B] uppercase font-mono">// I am turning imagination into reality.</p>
              <h1 className="mb-8 text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase md:text-8xl">
                JICHU CHEN <br />
                <span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent">VISUAL WORKS.</span>
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-gray-400 md:text-xl">
                我是影像创作者。拥有丰富的视频制作经验，熟悉拍摄、剪辑、调色及AIGC视频创作流程，了解短片、广告及 微电影等全流程；具备甲方工作思维，能够理解业务需求、统筹项目并协调多部门高效落地内容 , 关注作品传播效果与商业价值。
              </p>
              <div className="flex flex-wrap gap-4">
                <a onMouseMove={onLiquidMove} href="#work" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wider text-white">浏览最新作品 (SHORTS)</a>
                <a onMouseMove={onLiquidMove} href="#about" className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm tracking-wider text-gray-300 font-mono">关于与联络 (ABOUT)</a>
              </div>
            </div>
          </header>
        </section>

        <section id="work" className="mx-auto mt-12 w-full max-w-7xl rounded-[38px] border border-white/10 bg-[#090909] px-6 py-12 md:px-10">
          <p className="text-xs font-mono tracking-[0.3em] text-[#E5A93B] uppercase">AIGC STUDIO</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white uppercase md:text-5xl">作品目录</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "SHORT FILM",
              "COMMERCIAL",
              "VISUAL EXPERIMENT",
              "AIGC WORKFLOW",
            ].map((tag) => (
              <button key={tag} type="button" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-gray-200 uppercase">
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {workVideos.map((src, index) => {
              const unavailable = videoUnavailable[src];
              return (
                <article key={src} className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                  <div className="relative aspect-video bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#050505]">
                    {!unavailable && (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() => setVideoUnavailable((prev) => ({ ...prev, [src]: true }))}
                        className="h-full w-full object-cover opacity-80"
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                    <p className="absolute left-4 top-4 text-xs font-mono tracking-[0.2em] text-gray-300 uppercase">work-{String(index + 1).padStart(2, "0")}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 02 关于我 与 社交连接 (About & Contact) */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono text-[#E5A93B] tracking-[0.2em]">// 02 / VISIONARY INTEL</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-2">关于导演。</h2>
              <div className="mt-8 space-y-6 text-gray-400 font-light leading-relaxed">
                <p>
                  在传统实拍电影向潜空间叙事让步的拐点，作为 “Prompt Director”，我认为文字不仅是表达的媒介，更是雕刻视觉光影的“参数剪刀”。
                </p>
                <p>
                  我专注于 AIGC 视觉体系的一致性开发（Consistency Engineering）。通过深度整合 Midjourney、Stable Diffusion 控图技巧以及 Runway/Sora 等多模态时序工具，将创意极速转换为好莱坞质感的艺术表达。
                </p>
              </div>
            </div>

            <section id="contact" className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 p-8 rounded-xl border border-white/5 font-mono">
              <div>
                <h3 className="text-sm font-bold text-white mb-6 uppercase">// COGNITIVE TECH STACK (技术堆栈)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
                  <div>
                    <p className="text-[#E5A93B] mb-2">01 // DIFFUSION CONTROL</p>
                    <p className="mb-1">ControlNet / IP-Adapter / LoRA</p>
                  </div>
                  <div>
                    <p className="text-[#E5A93B] mb-2">02 // TEMPORAL ENGINES</p>
                    <p className="mb-1">Runway Gen-3 / Sora / Kling</p>
                  </div>
                </div>
              </div>

              {/* 社交媒体矩阵 */}
              <div className="mt-12">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">// CONNECT CHANNELS (社交与媒体连接)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <a href="https://space.bilibili.com" target="_blank" rel="noreferrer" onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>BILIBILI ↗</span>
                  </a>
                  <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer" onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>小红书 ↗</span>
                  </a>
                  <a href="https://www.youtube.com" target="_blank" rel="noreferrer" onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>YOUTUBE ↗</span>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>INSTAGRAM ↗</span>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>TWITTER / X ↗</span>
                  </a>
                  <button type="button" onClick={() => copyWeChatID('aigc_director_wechat')} onMouseMove={onLiquidMove} className="liquid-glass-btn py-3 px-4 rounded-xl text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
                    <span>{wxCopied ? '✓ WX COPIED' : 'WECHAT ↗'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500">期待开展品牌联合、短片创作与商业顾问</p>
                  <p className="text-lg text-white font-bold mt-1">collaboration@aigc.studio</p>
                </div>
                <a href="mailto:collaboration@aigc.studio" onMouseMove={onLiquidMove} className="liquid-glass-btn text-white px-6 py-3 text-xs font-bold uppercase rounded-lg">
                  发送提案
                </a>
              </div>
            </section>
          </div>
        </section>

      </main>
    </div>
  );
}
