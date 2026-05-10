import { useLayoutEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Logo from "../assets/images";

gsap.registerPlugin(ScrollTrigger);

type HeaderProps = {
  currentPath: string;
  onContactOpen: () => void;
};

const Header = ({ currentPath, onContactOpen }: HeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      const progress = progressRef.current;
      if (!progress) return;

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(progress, {
            scaleX: self.progress,
          });
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        trigger.kill();
      };
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-sm font-semibold tracking-wide">
          <Logo className="h-15 w-15 text-white" />
        </Link>

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

        <button
          type="button"
          onClick={onContactOpen}
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Get in touch
        </button>
      </div>

      {currentPath === "/" && (
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-white"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
