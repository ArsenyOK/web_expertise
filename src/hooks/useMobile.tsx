import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

let mediaQuery: MediaQueryList | undefined;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const getMediaQuery = () => {
  if (typeof window === "undefined") return undefined;

  mediaQuery ??= window.matchMedia(MOBILE_QUERY);

  return mediaQuery;
};

const subscribe = (listener: () => void) => {
  const query = getMediaQuery();

  if (!query) return () => undefined;

  listeners.add(listener);

  if (listeners.size === 1) {
    query.addEventListener("change", notifyListeners);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      query.removeEventListener("change", notifyListeners);
    }
  };
};

const getSnapshot = () => {
  return getMediaQuery()?.matches ?? false;
};

export const useMobile = () => {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
