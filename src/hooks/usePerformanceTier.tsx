import { useSyncExternalStore } from "react";

export type PerformanceTier = "high" | "medium" | "low";

const listeners = new Set<() => void>();
let motionQuery: MediaQueryList | undefined;

const getConnection = () => {
  return (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    }
  ).connection;
};

const getMotionQuery = () => {
  if (typeof window === "undefined") return undefined;

  motionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");

  return motionQuery;
};

const getDeviceMemory = () => {
  return (
    navigator as Navigator & {
      deviceMemory?: number;
    }
  ).deviceMemory;
};

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  const query = getMotionQuery();

  listeners.add(listener);
  query?.addEventListener("change", notifyListeners);
  window.addEventListener("resize", notifyListeners);

  return () => {
    listeners.delete(listener);
    query?.removeEventListener("change", notifyListeners);
    window.removeEventListener("resize", notifyListeners);
  };
};

export const getPerformanceTier = (): PerformanceTier => {
  if (typeof window === "undefined") return "medium";

  const prefersReducedMotion = getMotionQuery()?.matches ?? false;
  const connection = getConnection();
  const saveData = connection?.saveData ?? false;
  const effectiveType = connection?.effectiveType ?? "";
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = getDeviceMemory();
  const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
  const lowMemory = typeof memory === "number" && memory <= 4;
  const strongMemory = typeof memory !== "number" || memory >= 8;

  if (
    prefersReducedMotion ||
    saveData ||
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    cores <= 4 ||
    (isMobileViewport && lowMemory)
  ) {
    return "low";
  }

  if (!isMobileViewport && cores >= 8 && strongMemory) {
    return "high";
  }

  return "medium";
};

export const usePerformanceTier = () => {
  return useSyncExternalStore(subscribe, getPerformanceTier, () => "medium");
};
