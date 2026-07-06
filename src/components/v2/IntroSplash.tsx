'use client';

import { useEffect, useState } from 'react';

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-splash" aria-hidden="true">
      <div className="intro-splash__base" />

      <div className="intro-splash__panel intro-splash__panel--gold" />
      <div className="intro-splash__panel intro-splash__panel--dark" />
      <div className="intro-splash__slash" />

      <div className="intro-splash__content">
        <p className="intro-splash__eyebrow">VISUAL ARCHIVE INITIALIZING</p>
        <h1 className="intro-splash__title">AIGC.STUDIO</h1>
      </div>

      <div className="intro-splash__grain" />
    </div>
  );
}
