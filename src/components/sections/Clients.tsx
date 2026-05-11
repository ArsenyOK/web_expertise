import { useCallback, useRef } from "react";
import { clients } from "../../data/clients";
import { useMobile } from "../../hooks/useMobile";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { useLazyGsap } from "../../hooks/useLazyGsap";

const Clients = () => {
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLazyGsap(
    performanceTier === "high",
    sectionRef,
    useCallback(({ gsap, scheduleScrollTriggerRefresh }, root) => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".client-card");

        const statement = root.querySelector(".clients-statement") as
          | HTMLElement
          | null;

        gsap.set(cards, {
          y: isMobile ? 32 : 60,
          opacity: 0,
        });

        if (statement) {
          gsap.set(statement, {
            y: isMobile ? 28 : 40,
            opacity: 0,
          });
        }

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.55 : 0.9,
          stagger: isMobile ? 0.08 : 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: isMobile ? "top 85%" : "top 75%",
            once: true,
          },
        });

        if (statement) {
          gsap.to(statement, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.65 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement,
              start: isMobile ? "top 90%" : "top 80%",
              once: true,
            },
          });
        }

        scheduleScrollTriggerRefresh();
      }, root);

      return () => ctx.revert();
    }, [isMobile]),
  );

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-20 sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_45%)] md:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
              Clients / Experience
            </p>

            <h2 className="mt-5 max-w-3xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-tight md:tracking-tight">
              Trusted experience across complex digital products.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/50">
            From enterprise security platforms to Web3 infrastructure and
            AI-driven products — I build interfaces that are clean, scalable,
            and production-ready.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {clients.map((client, index) => (
            <article
              key={client.id}
              className="client-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition active:scale-[0.99] md:rounded-2xl md:bg-white/[0.04] md:p-6 md:hover:-translate-y-1 md:hover:bg-white/[0.08]"
            >
              <div className="absolute inset-0 hidden opacity-0 transition duration-500 group-hover:opacity-100 md:block">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-6 md:block">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                    0{index + 1}
                  </p>

                  <h3 className="mt-8 text-xl font-medium tracking-[-0.02em] md:mt-10">
                    {client.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    {client.type}
                  </p>
                </div>

                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/25 md:hidden" />
              </div>
            </article>
          ))}
        </div>

        <div className="clients-statement mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:mt-20 md:rounded-[2rem] md:bg-white/[0.04] md:p-12">
          <p className="max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-[-0.04em] text-white/80 md:text-5xl md:leading-tight md:tracking-tight">
            I don’t just build screens. I create reliable digital systems that
            help products feel faster, clearer, and easier to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
