'use client';

import { useEffect } from 'react';

/**
 * One delegated pointer handler for every cursor-reactive effect on the page.
 *
 * Rather than a listener per card, this attaches two listeners to the document
 * and writes CSS custom properties on whichever element is under the cursor.
 * All the visual work then happens in CSS, on the compositor.
 *
 * It does nothing at all on touch devices or when reduced motion is set, so
 * phones — most of the ad traffic — pay none of the cost.
 */
export function Interactive() {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;
    let activeTilt: HTMLElement | null = null;
    let activeMagnet: HTMLElement | null = null;

    const MAX_TILT = 7; // degrees — subtle enough to read as depth, not a gimmick
    const MAGNET_PULL = 0.28;

    function apply() {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;

      // Spotlight: position the glow inside whichever card is hovered
      const spot = (document.elementFromPoint(x, y) as HTMLElement | null)?.closest<HTMLElement>(
        '.spotlight',
      );
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${x - r.left}px`);
        spot.style.setProperty('--my', `${y - r.top}px`);
      }

      // Tilt
      const tilt = (document.elementFromPoint(x, y) as HTMLElement | null)?.closest<HTMLElement>(
        '.tilt',
      );
      if (tilt !== activeTilt) {
        if (activeTilt) {
          activeTilt.dataset.active = 'false';
          activeTilt.style.setProperty('--rx', '0deg');
          activeTilt.style.setProperty('--ry', '0deg');
          activeTilt.style.setProperty('--tz', '0px');
        }
        activeTilt = tilt ?? null;
        if (activeTilt) activeTilt.dataset.active = 'true';
      }
      if (activeTilt) {
        const r = activeTilt.getBoundingClientRect();
        const px = (x - r.left) / r.width - 0.5;
        const py = (y - r.top) / r.height - 0.5;
        activeTilt.style.setProperty('--ry', `${px * MAX_TILT * 2}deg`);
        activeTilt.style.setProperty('--rx', `${-py * MAX_TILT * 2}deg`);
        activeTilt.style.setProperty('--tz', '10px');
      }

      // Magnetic buttons
      const magnet = (document.elementFromPoint(x, y) as HTMLElement | null)?.closest<HTMLElement>(
        '.magnetic',
      );
      if (magnet !== activeMagnet) {
        if (activeMagnet) {
          activeMagnet.dataset.active = 'false';
          activeMagnet.style.setProperty('--mx-off', '0px');
          activeMagnet.style.setProperty('--my-off', '0px');
        }
        activeMagnet = magnet ?? null;
        if (activeMagnet) activeMagnet.dataset.active = 'true';
      }
      if (activeMagnet) {
        const r = activeMagnet.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * MAGNET_PULL;
        const dy = (y - (r.top + r.height / 2)) * MAGNET_PULL;
        activeMagnet.style.setProperty('--mx-off', `${dx}px`);
        activeMagnet.style.setProperty('--my-off', `${dy}px`);
      }
    }

    function onMove(e: PointerEvent) {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    }

    function onLeave() {
      for (const el of [activeTilt, activeMagnet]) {
        if (!el) continue;
        el.dataset.active = 'false';
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--tz', '0px');
        el.style.setProperty('--mx-off', '0px');
        el.style.setProperty('--my-off', '0px');
      }
      activeTilt = null;
      activeMagnet = null;
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
