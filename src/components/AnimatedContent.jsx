'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedContent({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  duration = 0.75,
  ease = 'cubic-bezier(0.22, 1, 0.36, 1)',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 0.98,
  threshold = 0.2,
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  const offset = reverse ? -distance : distance;
  const transformAxis = direction === 'horizontal' ? `translateX(${offset}px)` : `translateY(${offset}px)`;

  return (
    <div
      ref={ref}
      style={{
        opacity: animateOpacity ? (visible ? 1 : initialOpacity) : 1,
        transform: visible ? 'translate3d(0,0,0) scale(1)' : `${transformAxis} scale(${scale})`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: ease,
        transitionDelay: `${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
