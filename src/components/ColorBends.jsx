'use client';

import React, { useEffect, useRef } from 'react';
import './ColorBends.css';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const normalized = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export default function ColorBends({
  colors = ['#E5A93B', '#1F3A34', '#6B7280'],
  rotation = 90,
  speed = 0.12,
  scale = 1.15,
  frequency = 0.75,
  warpStrength = 0.6,
  mouseInfluence = 0.25,
  noise = 0.08,
  parallax = 0.25,
  iterations = 1,
  intensity = 0.7,
  bandWidth = 5,
  transparent = true,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: transparent });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0.5, y: 0.5 };
    const palette = colors.map(hexToRgb);
    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const draw = (now) => {
      const t = ((now - start) / 1000) * speed;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w * (0.5 + (pointer.x - 0.5) * parallax * mouseInfluence);
      const cy = h * (0.5 + (pointer.y - 0.5) * parallax * mouseInfluence);

      ctx.clearRect(0, 0, w, h);
      const angle = (rotation * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let pass = 0; pass < Math.max(1, iterations); pass += 1) {
        for (let i = 0; i < palette.length; i += 1) {
          const rgb = palette[i];
          const phase = t * (0.7 + i * 0.2) + pass * 0.5;
          const offset = Math.sin(phase + i * 1.3) * (h * 0.08 * warpStrength);
          const dx = cos * (w * scale) + Math.sin(phase * 0.7) * noise * w;
          const dy = sin * (h * scale) + Math.cos(phase * 0.9) * noise * h;

          const grad = ctx.createLinearGradient(
            cx - dx,
            cy - dy + offset,
            cx + dx,
            cy + dy - offset,
          );

          const band = Math.max(0.08, Math.min(0.3, 1 / Math.max(2, bandWidth * frequency)));
          grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
          grad.addColorStop(0.5 - band, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * intensity})`);
          grad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.18 * intensity})`);
          grad.addColorStop(0.5 + band, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * intensity})`);
          grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    root.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener('pointermove', onMove);
    };
  }, [bandWidth, colors, frequency, intensity, iterations, mouseInfluence, noise, parallax, rotation, scale, speed, transparent, warpStrength]);

  return (
    <div ref={rootRef} className="color-bends-root" aria-hidden="true">
      <canvas ref={canvasRef} className="color-bends-canvas" />
    </div>
  );
}
