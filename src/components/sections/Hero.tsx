import { useRef } from "react";
import Magnetic from "../ui-tools/Magnetic";
import { useMobile } from "../../hooks/useMobile";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";

type HeroProps = {
  onContactOpen: () => void;
};

const Hero = ({ onContactOpen }: HeroProps) => {
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const useMagnetic = !isMobile && performanceTier === "high";
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:min-h-screen md:pb-0"
    >
      <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(59,130,246,0.12),transparent_42%)] md:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.16),transparent_38%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_40%)] md:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="hero-label mb-5 max-w-[280px] text-xs uppercase leading-5 tracking-[0.25em] text-white/50 sm:max-w-none md:mb-6 md:text-sm md:tracking-[0.35em]">
          Software Engineer / Premium Digital Products
        </p>

        <h1 className="hero-title max-w-6xl text-[clamp(3.6rem,14vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] md:text-8xl lg:text-9xl">
          <span className="block">I build</span>
          <span className="block md:hidden">scalable</span>
          <span className="block md:hidden">products</span>
          <span className="hidden md:block">scalable products</span>
          <span className="block">and AI systems.</span>
        </h1>

        <p className="hero-text mt-7 max-w-xl text-base leading-7 text-white/60 md:mt-8 md:max-w-2xl md:text-xl md:leading-8">
          I help companies and founders design, build, optimize, and launch
          high-performance SaaS platforms, AI tools, MVPs, and scalable frontend
          systems using React, Angular, and modern engineering practices.
        </p>

        <div className="hero-actions mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-10 md:gap-4">
          {!useMagnetic ? (
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
