// Simple per-route particle configuration
export type ParticleSettings = {
  intensity: number; // parallax intensity (px)
  count: number; // particle count default
  mobileCount?: number; // particle count under mobile breakpoint
};

const defaultSettings: ParticleSettings = {
  intensity: 12,
  count: 70,
  mobileCount: 30,
};

// Map specific paths to tuned settings. Use prefix matching for routes.
const routeMap: Array<{ prefix: string; settings: ParticleSettings }> = [
  { prefix: '/contact', settings: { intensity: 18, count: 90, mobileCount: 40 } },
  { prefix: '/legal', settings: { intensity: 6, count: 40, mobileCount: 20 } },
  { prefix: '/plans', settings: { intensity: 10, count: 60, mobileCount: 30 } },
];

export function getParticleSettings(pathname?: string): ParticleSettings {
  if (!pathname) return defaultSettings;
  const found = routeMap.find((r) => pathname.startsWith(r.prefix));
  return found ? { ...defaultSettings, ...found.settings } : defaultSettings;
}

export default getParticleSettings;
