import { useCallback, useRef } from "react";
import { expertise } from "../../data/expertise";
import { useMobile } from "../../hooks/useMobile";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { useLazyGsap } from "../../hooks/useLazyGsap";

const Expertise = () => {
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLazyGsap(
    performanceTier === "high",
    sectionRef,
    useCallback(
      ({ gsap, scheduleScrollTriggerRefresh }, root) => {
        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".expertise-card");

          gsap.set(cards, {
            y: isMobile ? 32 : 80,
            opacity: 0,
          });

          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.55 : 1,
            ease: "power3.out",
            stagger: isMobile ? 0.08 : 0.15,
            scrollTrigger: {
              trigger: root,
              start: isMobile ? "top 85%" : "top 75%",
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
      id="expertise"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-20 sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_35%)] md:hidden" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl md:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
            Expertise
          </p>

          <h2 className="mt-5 text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-5xl md:leading-tight md:tracking-tight">
            What I build and optimize
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/50 md:hidden">
            Focused services for founders and teams who need polished,
            production-ready digital products.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {expertise.map((item, index) => (
            <article
              key={item.id}
              className="expertise-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition md:rounded-2xl md:bg-white/5 md:p-6 md:hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_46%)] opacity-70 transition md:bg-none md:opacity-0 md:group-hover:opacity-100">
                <div className="absolute -left-8 -top-8 hidden h-36 w-36 rounded-full bg-blue-500/18 blur-2xl md:block" />
              </div>

              <div className="relative z-10 mb-8 flex items-center justify-between md:mb-0 md:block">
                <span className="text-xs text-white/30 md:hidden">
                  0{index + 1}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-white/30 md:hidden" />
              </div>

              <h3 className="relative z-10 text-lg font-medium tracking-[-0.02em] md:tracking-normal">
                {item.title}
              </h3>

              <p className="relative z-10 mt-3 text-sm leading-6 text-white/58 md:text-white/60">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
