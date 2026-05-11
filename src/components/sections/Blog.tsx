import { useCallback, useRef, type MouseEvent } from "react";
import { blogPosts } from "../../data/blog";
import { useMobile } from "../../hooks/useMobile";
import { Link } from "react-router-dom";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { useLazyGsap } from "../../hooks/useLazyGsap";

type BlogProps = {
  onNavigate: (path: string, hash?: string) => void;
  currentPath: string;
};

const Blog = ({ onNavigate, currentPath }: BlogProps) => {
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleRouteClick = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string,
    hash?: string,
  ) => {
    event.preventDefault();
    onNavigate(path, hash);
  };

  useLazyGsap(
    performanceTier === "high",
    sectionRef,
    useCallback(({ gsap, scheduleScrollTriggerRefresh }, root) => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".blog-card");

        gsap.set(cards, {
          y: isMobile ? 32 : 70,
          opacity: 0,
        });

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.55 : 0.9,
          stagger: isMobile ? 0.08 : 0.15,
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
    }, [isMobile]),
  );

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-20 sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.07),transparent_38%)] md:hidden" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl md:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
            Insights
          </p>

          <h2 className="mt-5 text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-tight md:tracking-tight">
            Ideas on AI, frontend, and product engineering.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/50 md:hidden">
            Short notes and practical thinking about building modern digital
            products.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-6">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              to="/states"
              onClick={(event) => handleRouteClick(event, "/states")}
              className={
                currentPath === "/states" ? "text-white" : "hover:text-white"
              }
            >
              <article className="blog-card group relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition active:scale-[0.99] md:min-h-[360px] md:rounded-[2rem] md:bg-white/[0.04] md:p-7 md:hover:-translate-y-2 md:hover:bg-white/[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_44%)] opacity-70 transition duration-500 md:bg-none md:opacity-0 md:group-hover:opacity-100">
                  <div className="absolute -right-16 -top-16 hidden h-52 w-52 rounded-full bg-blue-500/18 blur-3xl md:block" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/35 md:tracking-[0.25em]">
                        {post.category}
                      </p>

                      <span className="text-xs text-white/25 md:hidden">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-medium leading-tight tracking-[-0.03em] md:mt-8 md:tracking-normal">
                      {post.title}
                    </h3>
                  </div>

                  <div>
                    <p className="mt-8 text-sm leading-6 text-white/55 md:mt-10">
                      {post.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 md:hidden">
                      <span className="text-xs text-white/35">
                        Insight placeholder
                      </span>
                      <span className="text-xs text-white">Read →</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
