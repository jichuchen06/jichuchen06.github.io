"use client";

import type { CSSProperties, MouseEvent } from "react";

function onLiquidMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

const videoSrc =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e3dc26d36e2f69421df65f72439&profile_id=139&oauth2_token_id=57447761";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
      <div className="film-grain" />

      <nav className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#FF3B30]" />
            <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">AIGC.STUDIO</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-4 pb-10 pt-28 md:px-8">
        <section className="relative mx-auto min-h-[calc(100vh-8rem)] w-full max-w-7xl overflow-hidden rounded-[38px] border border-white/8 bg-[#0d0d0d]">
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-25 brightness-[0.4] contrast-[1.1]">
              <source src={videoSrc} type="video/mp4" />
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
                <a onMouseMove={onLiquidMove} className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wider text-white">浏览最新作品 (SHORTS)</a>
                <a onMouseMove={onLiquidMove} className="liquid-glass-btn rounded-xl px-8 py-3.5 text-sm tracking-wider text-gray-300 font-mono">关于与联络 (ABOUT)</a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-16 text-xs text-gray-500 md:grid-cols-4 font-mono">
              <div><p className="text-gray-300">// CORE ENGINE</p><p className="mt-1">Midjourney V6 / Runway Gen-3 / Sora</p></div>
              <div><p className="text-gray-300">// RECENT ACCOLADES</p><p className="mt-1">AI Film Fest Gold Winner &apos;25</p></div>
              <div><p className="text-gray-300">// ACTIVE REGION</p><p className="mt-1">Tokyo / Las Vegas / Decentered</p></div>
              <div><p className="text-gray-300">// STATUS</p><p className="mt-1 flex items-center gap-1 text-[#E5A93B]"><span className="h-1.5 w-1.5 rounded-full bg-[#E5A93B]" /> GENERATING NEXT</p></div>
            </div>
          </header>
        </section>
      </main>
    </div>
  );
}
