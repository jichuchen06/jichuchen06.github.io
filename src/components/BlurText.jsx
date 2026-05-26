'use client';

import React from 'react';

function BlurText({
  text = '',
  delay = 70,
  animateBy = 'letters',
  direction = 'bottom',
  className = '',
}) {
  const units = animateBy === 'words' ? text.split(' ') : Array.from(text);
  const fromY = direction === 'top' ? '-0.7em' : '0.7em';

  return (
    <span className={className} aria-label={text}>
      {units.map((unit, index) => {
        const content = animateBy === 'words' ? `${unit}${index < units.length - 1 ? ' ' : ''}` : unit;
        return (
          <span
            key={`${unit}-${index}`}
            className="blur-text-unit"
            style={{
              animationDelay: `${index * delay}ms`,
              '--blur-from-y': fromY,
            }}
          >
            {content === ' ' ? '\u00A0' : content}
          </span>
        );
      })}
    </span>
  );
}

export default BlurText;
