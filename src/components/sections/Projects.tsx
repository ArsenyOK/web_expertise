import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMobile } from "../hooks/useMobile";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const isMobile = useMobile();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      gsap.set(cards, {
        y: isMobile ? 36 : 80,
        opacity: 0,
        scale: isMobile ? 1 : 0.96,
      });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.6 : 1,
        stagger: isMobile ? 0.08 : 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 85%" : "top 70%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] px-5 py-20 sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.09),transparent_42%)] md:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
              Selected Work
            </p>

            <h2 className="mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-tight md:tracking-tight">
              Products built for speed, clarity, and business impact.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/50 md:text-base">
            A selection of product templates and case-study placeholders. Each
            project is designed to show product thinking, clean engineering, and
            measurable value.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card group relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition active:scale-[0.99] md:min-h-[440px] md:rounded-[2rem] md:bg-white/[0.04] md:p-8 md:hover:-translate-y-2 md:hover:bg-white/[0.075]"
            >
              <div className="absolute inset-0 opacity-70 transition duration-500 md:group-hover:opacity-100">
                <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl md:-right-24 md:-top-24 md:h-72 md:w-72 md:bg-blue-500/20" />
                <div className="absolute -bottom-36 left-0 h-64 w-64 rounded-full bg-purple-500/8 blur-3xl md:-bottom-32 md:left-10 md:h-72 md:w-72 md:bg-purple-500/10" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/50 md:px-4 md:text-xs md:tracking-[0.2em]">
                    {project.type}
                  </span>

                  <span className="shrink-0 text-sm text-white/30">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-14 md:mt-24">
                  <p className="mb-3 text-sm text-white/40 md:mb-4">
                    {project.status}
                  </p>

                  <h3 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl md:tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 md:mt-6 md:text-base md:leading-7">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5 md:mt-10 md:pt-6">
                  <span className="text-xs text-white/40 md:text-sm">
                    Case study placeholder
                  </span>

                  <span className="shrink-0 text-xs text-white transition md:text-sm md:group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
