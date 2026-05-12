import { useCallback, useRef } from "react";
import { processSteps } from "../../data/process";
import { useMobile } from "../../hooks/useMobile";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { useLazyGsap } from "../../hooks/useLazyGsap";

const Process = () => {
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLazyGsap(
    performanceTier === "high",
    sectionRef,
    useCallback(
      ({ gsap, scheduleScrollTriggerRefresh }, root) => {
        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".process-card");

          gsap.set(cards, {
            y: isMobile ? 32 : 80,
            opacity: 0,
            scale: isMobile ? 1 : 0.96,
          });

          gsap.to(cards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.6 : 1,
            stagger: isMobile ? 0.08 : 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: isMobile ? "top 85%" : "top 55%",
              once: true,
            },
          });

          gsap.from(".process-heading", {
            y: isMobile ? 28 : 50,
            opacity: 0,
            duration: isMobile ? 0.65 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: isMobile ? "top 85%" : "top 70%",
              once: true,
            },
          });

          scheduleScrollTriggerRefresh();
        }, root);

        return () => ctx.revert();
      },
      [isMobile],
    ),
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.08),transparent_38%)] md:bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="process-heading relative lg:sticky lg:top-32 lg:h-fit">
          <div className="pointer-events-none absolute -left-4 top-14 text-[120px] font-semibold leading-none tracking-[-0.08em] text-white/[0.018] md:-left-6 md:top-20 md:text-[220px] md:text-white/[0.025]">
            05
          </div>

          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_68%)] blur-2xl md:-left-8 md:-top-8 md:h-64 md:w-64 md:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_68%)] md:blur-3xl" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
              Process
            </p>

            <h2 className="relative z-10 mt-5 max-w-xl text-[2.55rem] font-semibold leading-[1.02] tracking-[-0.05em] md:mt-6 md:text-7xl md:leading-[1.05]">
              A clear path from idea to launch.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-white/50 md:mt-8">
              I turn vague ideas into structured, scalable products — with a
              focus on clarity, performance, and business value from day one.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:mt-12 md:rounded-2xl md:bg-white/[0.03] md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Approach
              </p>

              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg md:leading-8 md:text-white/75">
                Product thinking, scalable architecture, premium UX, and fast
                execution without sacrificing maintainability.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          {processSteps.map((item) => (
            <article
              key={item.id}
              className="process-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:rounded-[2rem] md:bg-white/[0.04] md:p-10"
            >
              <div className="absolute inset-0 hidden opacity-0 transition duration-500 md:block md:group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_68%)] blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
                <div>
                  <span className="rounded-full border border-white/10 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/40 md:px-4 md:text-xs md:tracking-[0.2em]">
                    Step {item.step}
                  </span>

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] md:mt-8 md:text-4xl md:tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 md:mt-5 md:text-base md:leading-7">
                    {item.description}
                  </p>
                </div>

                <span className="absolute right-5 top-5 text-5xl font-semibold tracking-[-0.08em] text-white/[0.045] md:static md:text-8xl md:text-white/[0.06]">
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
