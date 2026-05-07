import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      gsap.set(cards, {
        y: 80,
        opacity: 0,
        scale: 0.96,
      });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] px-6 py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Selected Work
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Products built for speed, clarity, and business impact.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/50">
            A selection of product templates and case-study placeholders. Each
            project is designed to show product thinking, clean engineering, and
            measurable value.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.075]"
            >
              <div className="absolute inset-0 opacity-70 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    {project.type}
                  </span>

                  <span className="text-sm text-white/30">0{index + 1}</span>
                </div>

                <div className="mt-24">
                  <p className="mb-4 text-sm text-white/40">{project.status}</p>

                  <h3 className="max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
                    {project.description}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-sm text-white/40">
                    Case study placeholder
                  </span>

                  <span className="text-sm text-white transition group-hover:translate-x-1">
                    View details →
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
