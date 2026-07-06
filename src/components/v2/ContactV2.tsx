'use client';

import { useState } from 'react';
import { connectChannels } from '@/data/projects';

export default function ContactV2() {
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    await navigator.clipboard.writeText('aigc_director_wechat');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="bg-[#050505] px-5 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(229,169,59,0.14),transparent_34%),rgba(255,255,255,0.03)] p-6 backdrop-blur sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#E5A93B]">{'// 03 Contact'}</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">Let&apos;s build the next visual.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">期待开展品牌联合、短片创作、AIGC 影像流程与商业视觉内容合作。</p>
            <a href="mailto:jichuchen06@gmail.com" className="mt-8 inline-flex rounded-full border border-[#E5A93B]/50 bg-[#E5A93B]/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-white transition hover:bg-[#E5A93B]/20">jichuchen06@gmail.com</a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {connectChannels.map((channel) => (
              <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-[#E5A93B]/45 hover:text-white">
                {channel.label}
              </a>
            ))}
            <button onClick={copyWechat} className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-[#E5A93B]/45 hover:text-white">
              {copied ? '✓ WX Copied' : 'WeChat ↗'}
            </button>
          </div>
        </div>
      </div>
      <footer className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-8 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
        © 2026 Crafted in latent space. Stable static V2.
      </footer>
    </section>
  );
}
