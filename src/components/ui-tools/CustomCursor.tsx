import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const cursorX = gsap.quickTo(cursor, "x", {
      duration: 0.08,
      ease: "power2.out",
    });
    const cursorY = gsap.quickTo(cursor, "y", {
      duration: 0.08,
      ease: "power2.out",
    });
    const followerX = gsap.quickTo(follower, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const followerY = gsap.quickTo(follower, "y", {
      duration: 0.35,
      ease: "power3.out",
    });
    const followerScale = gsap.quickTo(follower, "scale", {
      duration: 0.25,
      ease: "power3.out",
    });

    const getInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;

      return target.closest("a, button");
    };

    const moveCursor = (event: MouseEvent) => {
      cursorX(event.clientX);
      cursorY(event.clientY);
      followerX(event.clientX);
      followerY(event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      if (!getInteractiveElement(event.target)) return;

      followerScale(1.8);
    };

    const handleMouseOut = (event: MouseEvent) => {
      const currentElement = getInteractiveElement(event.target);
      const nextElement = getInteractiveElement(event.relatedTarget);

      if (!currentElement || currentElement === nextElement) return;

      followerScale(1);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.killTweensOf([cursor, follower]);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />

      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference md:block"
      />
    </>
  );
};

export default CustomCursor;
