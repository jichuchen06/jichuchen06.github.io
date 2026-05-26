'use client';

import React from 'react';
import './CircularGallery.css';

export default function CircularGallery({
  items = [],
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollEase = 0.02,
}) {
  const repeated = items.length > 0 ? [...items, ...items] : [];

  return (
    <div className="circular-gallery" style={{ '--cg-text': textColor }}>
      <div
        className="circular-gallery-track"
        style={{
          '--cg-bend': bend,
          '--cg-radius': `${Math.max(0, borderRadius) * 100}%`,
          '--cg-ease': scrollEase,
        }}
      >
        {repeated.map((item, index) => (
          <div className="circular-gallery-item" key={`${item.text}-${index}`}>
            <img src={item.image} alt={item.text} loading="lazy" />
            <div className="circular-gallery-label">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
