"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RecursivePartial, IOptions } from "tsparticles-engine";
import getParticleSettings from "@/lib/particleConfig";

// We lazy-load react-tsparticles and tsparticles to keep the initial bundle smaller.
// The component will import them on mount and render when ready.
type ParticlesCompType = any;

// Particle background component (client-side)
// Renders a subtle network of glowing particles connected by thin golden lines.
// Comments: tune `options` below to change color, density, speed and interactivity.

export default function ParticleBackground() {
  const [ParticlesComp, setParticlesComp] = useState<ParticlesCompType | null>(null);
  const loadFullRef = useRef<any>(null);

  const particlesInit = useCallback(async (main: any) => {
    // loadFull brings all tsparticles features - for smaller bundles you can load only required features
    if (loadFullRef.current) await loadFullRef.current(main);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax & dynamic import of particles
  const [enabled, setEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem('particles_disabled') !== '1'; } catch { return true; }
  });

  const [settings, setSettings] = useState(() => ({ intensity: 12, count: 70 }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // load component & engine lazily
    let mounted = true;
    (async () => {
      try {
        const [{ default: Particles }, tsp] = await Promise.all([import('react-tsparticles'), import('tsparticles')]);
        if (!mounted) return;
        setParticlesComp(() => Particles);
        loadFullRef.current = tsp.loadFull || tsp.loadFull as any; // best-effort
      } catch {
        // swallow import errors - component will simply not render
      }
    })();

    // determine per-route settings
    const s = getParticleSettings(window.location.pathname || '/');
    setSettings(s as any);

    // enabled state from localStorage
    try { setEnabled(localStorage.getItem('particles_disabled') !== '1'); } catch {}

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // disable animations and parallax; still allow particles if desired
      setEnabled(false);
    }

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const intensity = s.intensity ?? 12; // px
    const smooth = 0.08;

    const el = containerRef.current;
    if (!el) return;
    const node = el;

    function onMove(e: MouseEvent) {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const py = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      targetX = px * intensity;
      targetY = py * intensity;
    }

    function onLeave() { targetX = 0; targetY = 0; }

    function tick() {
      currentX += (targetX - currentX) * smooth;
      currentY += (targetY - currentY) * smooth;
      node.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('pointerleave', onLeave as any);

    // listen for toggle events from ParticleToggle
    function onToggle(e: Event) {
      try { const d = (e as CustomEvent).detail; setEnabled(!d?.disabled ? true : false); } catch { setEnabled(true); }
    }
    window.addEventListener('particles:toggle', onToggle as EventListener);

    raf = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('pointerleave', onLeave as any);
      window.removeEventListener('particles:toggle', onToggle as EventListener);
    };
  }, []);

  const options: RecursivePartial<IOptions> = {
    fullScreen: { enable: false }, // we render into a positioned container
    background: { color: { value: "#0f0f0f" } },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: true,
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.35 } },
        // small parallax-like attraction handled via container transform
      },
    },
    particles: {
      color: { value: "#d4af37" }, // soft gold
      shadow: { enable: true, color: "#d4af37", blur: 8 },
      links: {
        color: "#b8860b",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 0.6,
      },
      move: {
        enable: true,
        speed: 0.9, // slow
        outModes: { default: "bounce" },
        attract: { enable: false },
      },
    number: { value: settings.count ?? 70, density: { enable: true, area: 800 } },
      opacity: { value: 0.8, random: { enable: true, minimumValue: 0.4 }, animation: { enable: true, speed: 0.6, minimumValue: 0.4 } },
      shape: { type: "circle" },
      size: { value: { min: 1.4, max: 3 }, random: { enable: true, minimumValue: 1.4 }, animation: { enable: true, speed: 2, minimumValue: 1 } },
    },
    // reduce motion for users who prefer reduced motion
    motion: {
      disable: false,
    },
    responsive: [
      {
        maxWidth: 640,
        options: {
          particles: { number: { value: 30 } },
        },
      },
    ],
  };

  if (!enabled) return <div ref={containerRef} id="particles-container" />;

  return (
    <div id="particles-container" ref={containerRef}>
      {/* #tsparticles is targeted by global CSS to sit behind content */}
      {ParticlesComp ? (
        // render dynamically-loaded Particles component
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ParticlesComp id="tsparticles" init={particlesInit} options={options} />
      ) : null}
    </div>
  );
}
