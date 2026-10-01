import React from 'react';

const CELLS = [1, 1, 0, 1, 0, 1, 0, 1, 1];

export default function LogoMark() {
  return (
    <span className="grid h-6 w-6 grid-cols-3 gap-[2px]" aria-hidden="true">
      {CELLS.map((on, i) => (
        <span key={i} className={on ? (i === 4 ? 'bg-volt' : 'bg-ink') : i === 4 ? 'bg-volt' : 'bg-transparent'} />
      ))}
    </span>
  );
}