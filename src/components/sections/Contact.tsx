import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.to(".contact-glow", {
        scale: 1.2,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32"
    >
      <div className="contact-glow absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="contact-content relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
          Let’s build
        </p>

        <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
          Have a serious product idea?
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/55">
          I help founders and teams turn complex ideas into polished, scalable,
          and production-ready digital products.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="mailto:arsen.pilipenko2014@gmail.com"
            className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-105"
          >
            Start a project
          </a>

          <a
            href="https://www.linkedin.com/in/arsenii-pylypenko-071094176/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
