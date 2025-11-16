"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "particles_disabled";

export default function ParticleToggle() {
  // Start with a safe default to avoid touching `localStorage` during any
  // server-side evaluation or before hydration. We'll read the persisted
  // value on mount.
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    // On mount, read the persisted state and keep it in sync across tabs.
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      setDisabled(val === "1");
    } catch {}

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setDisabled(e.newValue === "1");
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Log disabled state for debugging when it changes (separate effect)
  useEffect(() => {
    try { console.debug('[ParticleToggle] mounted, disabled=', disabled); } catch {}
  }, [disabled]);

  function toggle() {
    const next = !disabled;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {}
    setDisabled(next);
    // Notify listeners in this window
    window.dispatchEvent(
      new CustomEvent("particles:toggle", { detail: { disabled: next } })
    );
  }
  /*
  return (
    <button
      type="button"
    role="switch"
    aria-checked={disabled}
      aria-label={disabled ? "Enable background animation" : "Disable background animation"}
      title={disabled ? "Enable background animation" : "Disable background animation"}
      onClick={toggle}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 px-3 py-2 rounded bg-black/40 border border-white/60 text-sm text-slate-100 backdrop-blur-sm hover:bg-black/50 transition-colors"
    >
      <span className="text-xs">{disabled ? "Particles Off" : "Particles On"}</span>
    </button>
  );
 */
}

