"use client";
import ParticleBackground from "./ParticleBackground";

export default function ParticleBackgroundClient() {
  // This wrapper is a Client Component so we can safely import and render
  // the client-only `ParticleBackground` from a Server Component.
  return <ParticleBackground />;
}
