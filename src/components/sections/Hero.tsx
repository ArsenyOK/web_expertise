import { /*useLayoutEffect,*/ useRef } from "react";
// import gsap from "gsap";
import Magnetic from "../ui-tools/Magnetic";
import { useMobile } from "../../hooks/useMobile";

type HeroProps = {
  onContactOpen: () => void;
};

const Hero = ({ onContactOpen }: HeroProps) => {
  const isMobile = useMobile();
  const heroRef = useRef<HTMLElement | null>(null);

  // useLayoutEffect(() => {
  //   if (!heroRef.current) return;

  //   const isMobileAnimation = window.matchMedia("(max-width: 767px)").matches;

  //   const ctx = gsap.context(() => {
  //     const label = ".hero-label";
  //     const titleLines = ".hero-title span";
  //     const content = ".hero-text, .hero-actions";

  //     gsap.set([label, titleLines, content], {
  //       autoAlpha: 0,
  //       force3D: true,
  //       willChange: "transform, opacity",
  //     });

  //     const tl = gsap.timeline({
  //       defaults: {
  //         ease: "power3.out",
  //       },
  //       onComplete: () => {
  //         gsap.set([label, titleLines, content], {
  //           clearProps: "willChange",
  //         });
  //       },
  //     });

  //     tl.fromTo(
  //       label,
  //       {
  //         y: isMobileAnimation ? 10 : 24,
  //         autoAlpha: 0,
  //       },
  //       {
  //         y: 0,
  //         autoAlpha: 1,
  //         duration: isMobileAnimation ? 0.45 : 0.8,
  //       },
  //     );

  //     tl.fromTo(
  //       titleLines,
  //       {
  //         yPercent: isMobileAnimation ? 28 : 100,
  //         autoAlpha: 0,
  //       },
  //       {
  //         yPercent: 0,
  //         autoAlpha: 1,
  //         duration: isMobileAnimation ? 0.65 : 1,
  //         stagger: isMobileAnimation ? 0.05 : 0.12,
  //         ease: isMobileAnimation ? "power3.out" : "power4.out",
  //       },
  //       isMobileAnimation ? "-=0.1" : "-=0.3",
  //     );

  //     tl.fromTo(
  //       content,
  //       {
  //         y: isMobileAnimation ? 12 : 32,
  //         autoAlpha: 0,
  //       },
  //       {
  //         y: 0,
  //         autoAlpha: 1,
  //         duration: isMobileAnimation ? 0.55 : 0.9,
  //         stagger: 0.1,
  //       },
  //       isMobileAnimation ? "-=0.2" : "-=0.3",
  //     );

  //     if (!isMobileAnimation) {
  //       gsap.to(".hero-glow", {
  //         scale: 1.15,
  //         opacity: 0.9,
  //         duration: 3,
  //         repeat: -1,
  //         yoyo: true,
  //         ease: "sine.inOut",
  //       });
  //     }
  //   }, heroRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:min-h-screen md:pb-0"
    >
      <div className="hero-glow absolute left-1/2 top-[42%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/12 blur-[60px] md:top-1/2 md:h-[520px] md:w-[520px] md:bg-blue-500/20 md:blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_40%)] md:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="hero-label mb-5 max-w-[280px] text-xs uppercase leading-5 tracking-[0.25em] text-white/50 sm:max-w-none md:mb-6 md:text-sm md:tracking-[0.35em]">
          Software Engineer / Premium Digital Products
        </p>

        <h1 className="hero-title max-w-6xl overflow-hidden text-[clamp(3.25rem,15vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] md:text-8xl lg:text-9xl">
          <span className="block will-change-transform">I build</span>
          <span className="block will-change-transform">web, mobile</span>
          <span className="block will-change-transform">and AI products.</span>
        </h1>

        <p className="hero-text mt-7 max-w-xl text-base leading-7 text-white/60 md:mt-8 md:max-w-2xl md:text-xl md:leading-8">
          I help companies and founders design, build, optimize, and launch
          high-performance SaaS platforms, AI tools, MVPs, and scalable frontend
          systems using React, Angular, and modern engineering practices.
        </p>

        <div className="hero-actions mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-10 md:gap-4">
          {isMobile ? (
            <>
              <button
                type="button"
                onClick={onContactOpen}
                className="w-full rounded-full bg-white px-7 py-4 text-sm font-medium text-black active:scale-[0.98]"
              >
                Discuss a project
              </button>

              <a
                href="#work"
                className="w-full rounded-full border border-white/20 px-7 py-4 text-center text-sm font-medium text-white active:scale-[0.98]"
              >
                View selected work
              </a>
            </>
          ) : (
            <>
              <Magnetic>
                <button
                  type="button"
                  onClick={onContactOpen}
                  className="block rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:scale-105"
                >
                  Discuss a project
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  className="block rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View selected work
                </a>
              </Magnetic>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
