'use client';

import { useEffect, useState } from 'react';

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-cut" aria-hidden="true">
      <div className="intro-cut__black" />

      <div className="intro-cut__loader">
        <div className="intro-cut__line" />
        <div className="intro-cut__glow" />
      </div>

      <div className="intro-cut__aperture intro-cut__aperture--top" />
      <div className="intro-cut__aperture intro-cut__aperture--bottom" />

      <div className="intro-cut__text">
        <span>VISUAL ARCHIVE</span>
        <strong>INITIALIZING</strong>
      </div>

      <div className="intro-cut__grain" />
    </div>
  );
}
