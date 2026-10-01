import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const h = Boolean(e.target.closest?.('a,button,[data-cursor],input,label,select,textarea,[role="button"]'));
      if (h !== hoverRef.current) { hoverRef.current = h; setHover(h); }
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference" style={{ x: sx, y: sy }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{ width: hover ? 54 : 30, height: hover ? 54 : 30, backgroundColor: hover ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        />
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x, y }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-volt" />
      </motion.div>
    </>
  );
}