import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 48);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-24"
    >
      <div className="px-6">
        <div className="mx-auto mb-16 max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Selected Work
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Products built for speed, clarity, and business impact.
          </h2>
        </div>

        <div ref={trackRef} className="flex w-max gap-6 pr-24">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="group relative flex h-[520px] w-[82vw] max-w-[760px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:w-[680px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_35%)] opacity-60 transition group-hover:opacity-100" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  {project.type}
                </span>

                <span className="text-sm text-white/30">0{i + 1}</span>
              </div>

              <div className="relative z-10">
                <p className="mb-4 text-sm text-white/40">{project.status}</p>

                <h3 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">
                  {project.title}
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
