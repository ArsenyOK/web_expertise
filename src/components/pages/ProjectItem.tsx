import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projectDetails } from "../../data/projectDetails";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectData = projectDetails.find((el) => el.id === projectId);

  const handleBackToProjects = () => {
    navigate("/");
  };

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const heroBlocks = gsap.utils.toArray<HTMLElement>(".project-reveal");
      const sections = gsap.utils.toArray<HTMLElement>(".project-section");

      gsap.set(heroBlocks, {
        y: 48,
        autoAlpha: 0,
        force3D: true,
        willChange: "transform, opacity",
      });

      gsap.to(heroBlocks, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(heroBlocks, { clearProps: "willChange" });
        },
      });

      sections.forEach((section) => {
        gsap.set(section, {
          y: 44,
          autoAlpha: 0,
          force3D: true,
          willChange: "transform, opacity",
        });

        gsap.to(section, {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
          onComplete: () => {
            gsap.set(section, { clearProps: "willChange" });
          },
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, pageRef);

    return () => ctx.revert();
  }, [projectId]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  return (
    <section
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#050505] px-5 py-35 text-white sm:px-6"
    >
      {projectData && (
        <>
          {" "}
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <button
              onClick={handleBackToProjects}
              className="project-reveal mb-16 flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              {projectData.backLabel}
            </button>

            <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="project-reveal">
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
                  {projectData.hero.type}
                </span>

                <h1 className="mt-8 max-w-2xl text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
                  {projectData.hero.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
                  {projectData.hero.description}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="rounded-full bg-white px-7 py-4 text-center text-sm font-medium text-black transition hover:scale-105"
                  >
                    {projectData.hero.primaryAction}
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    {projectData.hero.secondaryAction}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="project-reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative grid gap-4 md:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-xs text-white/35">
                      {projectData.preview.eyebrow}
                    </p>

                    <h3 className="mt-4 text-xl font-medium">
                      {projectData.preview.title}
                    </h3>

                    <div className="mt-6 grid grid-cols-4 gap-3">
                      {projectData.preview.stats.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                        >
                          <p className="text-lg font-semibold">{item.value}</p>

                          <p className="mt-1 text-[0.65rem] text-white/35">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3">
                      {projectData.preview.feedback.map((item) => (
                        <div
                          key={item.text}
                          className={`rounded-xl p-3 text-sm ${
                            item.type === "success"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                              : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-200"
                          }`}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs leading-6 text-white/50">
                    <p className="text-white/30">
                      {projectData.preview.codeTitle}
                    </p>

                    <pre className="mt-5 whitespace-pre-wrap">
                      {projectData.preview.code}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section className="project-section mt-28 grid gap-10 border-t border-white/10 pt-16 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-2xl font-semibold">
                  {projectData.overview.title}
                </h2>

                {projectData.overview.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 max-w-xl text-base leading-7 text-white/55"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  {projectData.results.title}
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {projectData.results.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                      >
                        <Icon className="text-blue-300" size={22} />

                        <p className="mt-8 text-3xl font-semibold">
                          {item.value}
                        </p>

                        <p className="mt-2 text-sm text-white/45">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="project-section mt-24 grid gap-8 lg:grid-cols-3">
              <div>
                <h2 className="text-2xl font-semibold">
                  {projectData.features.title}
                </h2>

                <ul className="mt-6 space-y-4 text-sm leading-6 text-white/55">
                  {projectData.features.items.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  {projectData.techStack.title}
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {projectData.techStack.items.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/65"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-2xl font-semibold">
                  {projectData.architecture.title}
                </h2>

                <div className="mt-8 grid gap-3 text-sm text-white/55">
                  {projectData.architecture.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4"
                      >
                        <Icon size={18} className="text-blue-300" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="project-section mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
              <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                <div>
                  <p className="text-sm text-white/40">
                    {projectData.nextProject.label}
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                    {projectData.nextProject.title}
                  </h2>

                  <p className="mt-5 max-w-md text-base leading-7 text-white/55">
                    {projectData.nextProject.description}
                  </p>

                  <Link
                    to={`/project/${projectData.nextProject.nextProjectId}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    {projectData.nextProject.action}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="min-h-[260px] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.28),transparent_40%),rgba(255,255,255,0.04)]" />
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectDetailPage;
