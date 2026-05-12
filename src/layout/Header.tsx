import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images";
import { usePerformanceTier } from "../hooks/usePerformanceTier";

type HeaderProps = {
  currentPath: string;
  onContactOpen: () => void;
};

const Header = ({ currentPath, onContactOpen }: HeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const performanceTier = usePerformanceTier();

  useEffect(() => {
    if (
      !progressRef.current ||
      currentPath !== "/" ||
      performanceTier === "low"
    ) {
      return;
    }

    const progress = progressRef.current;
    let frame: number | undefined;

    const updateProgress = () => {
      frame = undefined;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      progress.style.transform = `scaleX(${Math.min(progressValue, 1)})`;
    };

    const scheduleUpdate = () => {
      if (frame !== undefined) return;

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [currentPath, performanceTier]);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          aria-label="Arseniy Pilipenko homepage"
          className="text-sm font-semibold tracking-wide"
        >
          <Logo className="h-15 w-15 text-white" />
        </Link>

        {currentPath === "/" && (
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#expertise" className="hover:text-white">
              Expertise
            </a>
            <a href="#work" className="hover:text-white">
              Work
            </a>
            <a href="#clients" className="hover:text-white">
              Clients
            </a>
            <a href="#blog" className="hover:text-white">
              Insights
            </a>
          </nav>
        )}

        <button
          type="button"
          onClick={onContactOpen}
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Get in touch
        </button>
      </div>

      {currentPath === "/" && performanceTier !== "low" && (
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
