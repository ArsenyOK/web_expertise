import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let refreshFrame: number | undefined;

export const scheduleScrollTriggerRefresh = () => {
  if (refreshFrame !== undefined) return;

  refreshFrame = window.requestAnimationFrame(() => {
    refreshFrame = undefined;
    ScrollTrigger.refresh();
  });
};

export { gsap, ScrollTrigger };
