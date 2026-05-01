import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clients } from "../../data/clients";

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".client-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".clients-statement", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Clients / Experience
            </p>

            <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Trusted experience across complex digital products.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/50">
            From enterprise security platforms to Web3 infrastructure and
            AI-driven products — I build interfaces that are clean, scalable,
            and production-ready.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="client-card group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                0{index + 1}
              </p>

              <h3 className="mt-10 text-xl font-medium">{client.name}</h3>

              <p className="mt-3 text-sm text-white/50">{client.type}</p>
            </div>
          ))}
        </div>

        <div className="clients-statement mt-20 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-12">
          <p className="max-w-5xl text-3xl font-medium leading-tight tracking-tight text-white/80 md:text-5xl">
            I don’t just build screens. I create reliable digital systems that
            help products feel faster, clearer, and easier to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
