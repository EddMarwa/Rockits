"use client";
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "particles_disabled";

export default function ParticleToggle() {
  const [disabled, setDisabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Keep state in sync if other tabs change it
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setDisabled(e.newValue === "1");
    }
    window.addEventListener("storage", onStorage);
    try { console.debug('[ParticleToggle] mounted, disabled=', disabled); } catch {}
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
      <span className="text-xs">
        {disabled ? "Particles Off" : "Particles On"}
      </span>
    </button>
  );
}
