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
      gsap.from(".process-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".process-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          once: true,
        },
      });

      gsap.from(".process-step", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="process-title mb-20 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Process
          </p>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            From raw idea to production-ready product.
          </h2>
        </div>
        <div className="relative">
          <div className="process-line absolute left-4 top-0 hidden h-[95%] mt-5 w-px bg-white/15 md:block" />
          <div className="space-y-6">
            {processSteps.map((item) => (
              <div
                key={item.id}
                className="process-step grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:grid-cols-[120px_1fr] md:p-8 md:pl-16"
              >
                <div className="text-sm text-white/35">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-medium">{item.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-white/55">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
