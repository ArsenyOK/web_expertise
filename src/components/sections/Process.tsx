import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "../../data/process";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");

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
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      });

      gsap.from(".process-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
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
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-6 py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="process-heading relative lg:sticky lg:top-32 lg:h-fit">
          <div className="pointer-events-none absolute -left-6 top-20 text-[180px] font-semibold leading-none tracking-[-0.08em] text-white/[0.025] md:text-[220px]">
            05
          </div>

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Process
            </p>

            <h2 className="relative z-10 mt-6 max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-7xl">
              A clear path from idea to launch.
            </h2>

            <p className="mt-8 max-w-md text-base leading-7 text-white/50">
              I turn vague ideas into structured, scalable products — with a
              focus on clarity, performance, and business value from day one.
            </p>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Approach
              </p>

              <p className="mt-4 text-lg leading-8 text-white/75">
                Product thinking, scalable architecture, premium UX, and fast
                execution without sacrificing maintainability.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {processSteps.map((item, index) => (
            <article
              key={item.id}
              className={`process-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.075] md:p-10 
                ${index % 2 === 0 ? "md:translate-y-10" : ""}`}
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    Step {item.step}
                  </span>

                  <h3 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                    {item.description}
                  </p>
                </div>

                <span className="text-6xl font-semibold tracking-[-0.08em] text-white/[0.06] md:text-8xl">
                  {item.step}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
