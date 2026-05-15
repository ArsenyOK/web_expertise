import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "../components/sections/Hero";
import { usePerformanceTier } from "../hooks/usePerformanceTier";

const Blog = lazy(() => import("../components/sections/Blog"));
const Clients = lazy(() => import("../components/sections/Clients"));
const Expertise = lazy(() => import("../components/sections/Expertise"));
const Process = lazy(() => import("../components/sections/Process"));
const Projects = lazy(() => import("../components/sections/Projects"));

type HomeProps = {
  onContactOpen: () => void;
  navigateTo: (path: string, hash?: string) => void;
  currentPath: string;
};

const Home = ({ onContactOpen, navigateTo, currentPath }: HomeProps) => {
  const performanceTier = usePerformanceTier();
  const [showDeferredSections, setShowDeferredSections] = useState(
    performanceTier === "high",
  );

  useEffect(() => {
    if (showDeferredSections) return;

    const idleCallback = window.requestIdleCallback?.(
      () => setShowDeferredSections(true),
      {
        timeout:
          performanceTier === "high"
            ? 1
            : performanceTier === "medium"
              ? 600
              : 1000,
      },
    );
    const fallbackTimer = window.setTimeout(
      () => setShowDeferredSections(true),
      performanceTier === "high" ? 0 : performanceTier === "medium" ? 200 : 450,
    );

    return () => {
      if (idleCallback) {
        window.cancelIdleCallback(idleCallback);
      }

      window.clearTimeout(fallbackTimer);
    };
  }, [performanceTier, showDeferredSections]);

  return (
    <>
      <Hero onContactOpen={onContactOpen} />
      {showDeferredSections && (
        <Suspense fallback={null}>
          <Expertise />
          <Projects onNavigate={navigateTo} />
          <Clients />
          <Process />
          <Blog onNavigate={navigateTo} currentPath={currentPath} />
        </Suspense>
      )}
    </>
  );
};

export default Home;
