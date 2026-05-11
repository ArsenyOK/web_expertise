import { useEffect, type RefObject } from "react";

type GsapModule = typeof import("../lib/gsap");
type GsapCleanup = void | (() => void);

export const useLazyGsap = <TElement extends Element>(
  enabled: boolean,
  rootRef: RefObject<TElement | null>,
  setup: (module: GsapModule, root: TElement) => GsapCleanup,
  resetKey?: unknown,
) => {
  useEffect(() => {
    const root = rootRef.current;

    if (!enabled || !root) return;

    let isActive = true;
    let cleanup: GsapCleanup;

    void import("../lib/gsap")
      .then((module) => {
        if (!isActive || !rootRef.current) return;

        cleanup = setup(module, root);
      })
      .catch(() => undefined);

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, [enabled, rootRef, setup, resetKey]);
};
