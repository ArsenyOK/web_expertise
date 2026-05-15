import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { projectDetails } from "../../data/projectDetails";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { useLazyGsap } from "../../hooks/useLazyGsap";

type ProjectTransitionStage =
  | "entering-start"
  | "entering"
  | "covered"
  | "exiting";

type ProjectTransition = {
  path: string;
  stage: ProjectTransitionStage;
};

const ProjectDetailPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const [projectTransition, setProjectTransition] =
    useState<ProjectTransition | null>(null);
  const performanceTier = usePerformanceTier();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectData = projectDetails.find((el) => el.id === projectId);

  const handleBackToProjects = () => {
    navigate("/");
  };

  const handleNextProject = (
    event: MouseEvent<HTMLAnchorElement>,
    nextProjectId: string,
  ) => {
    event.preventDefault();

    const path = `/project/${nextProjectId}`;

    if (projectTransition?.path === path) return;

    if (performanceTier === "low") {
      navigate(path);
      return;
    }

    setProjectTransition({
      path,
      stage: "entering-start",
    });
  };

  const transitionDuration = performanceTier === "high" ? 340 : 220;

  useLazyGsap(
    performanceTier !== "low",
    pageRef,
    useCallback(
      ({ gsap, scheduleScrollTriggerRefresh }, root) => {
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
            duration: performanceTier === "high" ? 0.8 : 0.45,
            stagger: performanceTier === "high" ? 0.12 : 0.06,
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
              duration: performanceTier === "high" ? 0.85 : 0.5,
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

          scheduleScrollTriggerRefresh();
        }, root);

        return () => ctx.revert();
      },
      [performanceTier],
    ),
    projectId,
  );

  useEffect(() => {
    if (projectTransition?.stage !== "entering-start") return;

    const frame = window.requestAnimationFrame(() => {
      setProjectTransition((currentTransition) =>
        currentTransition?.stage === "entering-start"
          ? { ...currentTransition, stage: "entering" }
          : currentTransition,
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [projectTransition?.stage]);

  useEffect(() => {
    if (projectTransition?.stage !== "entering") return;

    const timer = window.setTimeout(() => {
      navigate(projectTransition.path);
      setProjectTransition((currentTransition) =>
        currentTransition?.stage === "entering"
          ? { ...currentTransition, stage: "covered" }
          : currentTransition,
      );
    }, transitionDuration);

    return () => window.clearTimeout(timer);
  }, [
    navigate,
    projectTransition?.path,
    projectTransition?.stage,
    transitionDuration,
  ]);

  useLayoutEffect(() => {
    if (
      projectTransition?.stage !== "covered" ||
      !projectId ||
      projectTransition.path !== `/project/${projectId}`
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setProjectTransition((currentTransition) =>
        currentTransition?.stage === "covered"
          ? { ...currentTransition, stage: "exiting" }
          : currentTransition,
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [projectId, projectTransition?.path, projectTransition?.stage]);

  useEffect(() => {
    if (projectTransition?.stage !== "exiting") return;

    const timer = window.setTimeout(() => {
      setProjectTransition(null);
    }, transitionDuration);

    return () => window.clearTimeout(timer);
  }, [projectTransition?.stage, transitionDuration]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [projectId]);

  if (!projectData) {
    return <Navigate to="/" replace />;
  }

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

              </div>

              <div className="project-reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_42%)] md:bg-none" />
                <div className="absolute -right-20 -top-20 hidden h-64 w-64 rounded-full bg-blue-500/18 blur-3xl md:block" />

                <div className="relative grid gap-4 md:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-xs text-white/35">
                      {projectData.preview.eyebrow}
                    </p>

                    <h2 className="mt-4 text-xl font-medium">
                      {projectData.preview.title}
                    </h2>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {projectData.preview.stats.map((item) => (
                        <div
                          key={item.label}
                          className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="truncate text-lg font-semibold leading-6">
                            {item.value}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-white/35">
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

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <p className="text-xs text-white/35">
                      {projectData.preview.detailsTitle}
                    </p>

                    <div className="mt-6 space-y-4">
                      {projectData.preview.details.map((item, index) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[0.65rem] text-white/40">
                            {index + 1}
                          </span>

                          <p className="text-sm leading-6 text-white/55">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
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

            <section className="project-section mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] px-8 py-14 md:px-14 md:py-20">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                  {projectData.nextProject.label}
                </p>

                <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                  {projectData.nextProject.title}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
                  {projectData.nextProject.description}
                </p>

                <Link
                  to={`/project/${projectData.nextProject.nextProjectId}`}
                  onClick={(event) =>
                    handleNextProject(
                      event,
                      projectData.nextProject.nextProjectId,
                    )
                  }
                  className="group mt-10 inline-flex items-center gap-3 text-sm font-medium text-white/70 transition hover:text-white"
                >
                  <span>{projectData.nextProject.action}</span>

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </section>
          </div>
          {projectTransition && performanceTier !== "low" && (
            <div
              className={`pointer-events-none fixed inset-0 z-[90] bg-[#050505] transition-opacity ease-out ${
                projectTransition.stage === "entering" ||
                projectTransition.stage === "covered"
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              style={{ transitionDuration: `${transitionDuration}ms` }}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ProjectDetailPage;
