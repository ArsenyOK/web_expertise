import { useLayoutEffect } from "react";
import Lenis from "lenis";
import {
  gsap,
  ScrollTrigger,
  scheduleScrollTriggerRefresh,
} from "../../lib/gsap";

const SmoothScroll = () => {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    scheduleScrollTriggerRefresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
