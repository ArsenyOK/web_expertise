const stats = [
  {
    value: "6+",
    label: "Years building production interfaces",
  },
  {
    value: "20+",
    label: "Product flows shipped across web and mobile",
  },
  {
    value: "3",
    label: "Core directions: SaaS, AI, frontend systems",
  },
  {
    value: "100%",
    label: "Focus on clarity, speed, and maintainability",
  },
];

const principles = [
  "Architecture that stays readable as the product grows.",
  "Interfaces tuned for speed, accessibility, and daily use.",
  "AI features designed around real workflows, not novelty.",
];

const States = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
            States
          </p>

          <h1 className="mt-5 text-[3rem] font-semibold leading-[0.95] tracking-[-0.055em] md:mt-6 md:text-8xl">
            Engineering measured by product momentum.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 md:mt-8 md:text-xl md:leading-8">
            A compact view of how I think about frontend work: fewer moving
            parts, stronger systems, and interfaces that feel fast before users
            notice why.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:rounded-2xl md:p-6"
            >
              <p className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl">
                {item.value}
              </p>
              <p className="mt-5 text-sm leading-6 text-white/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:rounded-[2rem] md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              Current Focus
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Frontend platform, product full-stack, and practical AI.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55">
              The strongest products are not built from isolated screens. They
              come from clear contracts between UI, data, performance, and user
              intent.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:rounded-[2rem] md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              Principles
            </p>

            <div className="mt-6 space-y-5">
              {principles.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <span className="mt-1 text-xs text-white/30">
                    0{index + 1}
                  </span>
                  <p className="text-base leading-7 text-white/65">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default States;
