"use client";
import dynamic from 'next/dynamic';

// Dynamically import the heavy `ParticleBackground` inside a Client Component
// so the module and its large dependencies (react-tsparticles / tsparticles)
// are only fetched after hydration. This keeps the initial bundle smaller.
const ParticleBackgroundDyn = dynamic(
  () => import('./ParticleBackground'),
  { ssr: false, loading: () => null }
);

export default function ParticleBackgroundClient() {
  return <ParticleBackgroundDyn />;
}
