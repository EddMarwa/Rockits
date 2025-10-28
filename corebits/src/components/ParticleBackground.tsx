"use client";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

// Particle background component (client-side)
// Renders a subtle network of glowing particles connected by thin golden lines.
// Comments: tune `options` below to change color, density, speed and interactivity.

export default function ParticleBackground() {
  const particlesInit = useCallback(async (main: any) => {
    // loadFull brings all tsparticles features - for smaller bundles you can load only required features
    await loadFull(main);
  }, []);

  const options = {
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
        grab: { distance: 150, links: { opacity: 0.3 } },
      },
    },
    particles: {
      color: { value: "#d4af37" }, // soft gold
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
      },
      number: { value: 70, density: { enable: true, area: 800 } },
      opacity: { value: 0.75 },
      shape: { type: "circle" },
      size: { value: { min: 1.5, max: 2.5 } },
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
  } as const;

  return (
    <div id="particles-container">
      {/* #tsparticles is targeted by global CSS to sit behind content */}
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
}
