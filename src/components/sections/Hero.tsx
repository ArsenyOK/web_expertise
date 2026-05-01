import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "../ui-tools/Magnetic";

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title span", {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-text, .hero-actions", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28"
    >
      <div className="hero-glow absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="hero-label mb-6 text-sm uppercase tracking-[0.35em] text-white/50">
          Software Engineer / Premium Digital Products
        </p>
        <h1 className="hero-title max-w-6xl overflow-hidden text-6xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl lg:text-9xl">
          <span className="block">I build</span>
          <span className="block">web, mobile</span>
          <span className="block">and AI products.</span>
        </h1>
        <p className="hero-text mt-8 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
          I help companies and founders design, build, optimize, and launch
          high-performance SaaS platforms, AI tools, MVPs, and scalable frontend
          systems using React, Angular, and modern engineering practices.
        </p>
        <div className="hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
          <Magnetic>
            <a
              href="#contact"
              className="block rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:scale-105"
            >
              Start a project
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="#work"
              className="block rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
            >
              View selected work
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Hero;
