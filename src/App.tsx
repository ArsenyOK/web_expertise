import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PageLoader from "./components/ui-tools/PageLoader";
import { useMobile } from "./hooks/useMobile";
import Home from "./layout/Home";
import { useNavigateTo } from "./hooks/useNavigateTo";
import ScrollToTop from "./components/ui-tools/ScrollToTop";
import { usePerformanceTier } from "./hooks/usePerformanceTier";

const States = lazy(() => import("./components/pages/States"));
const ProjectPage = lazy(() => import("./components/pages/ProjectItem"));
const loadContactModal = () => import("./components/ui-tools/ContactModal");
const ContactModal = lazy(loadContactModal);
const CustomCursor = lazy(() => import("./components/ui-tools/CustomCursor"));

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasOpenedContact, setHasOpenedContact] = useState(false);
  const [showPremiumTools, setShowPremiumTools] = useState(false);
  const isMobile = useMobile();
  const performanceTier = usePerformanceTier();
  const canShowPremiumTools = !isMobile && performanceTier === "high";
  const location = useLocation();
  const { pageLoading, navigateTo } = useNavigateTo();

  useEffect(() => {
    document.documentElement.dataset.performanceTier = performanceTier;
  }, [performanceTier]);

  useEffect(() => {
    const idleCallback = window.requestIdleCallback?.(
      () => {
        void loadContactModal();
      },
      { timeout: 2000 },
    );
    const fallbackTimer = window.setTimeout(() => {
      void loadContactModal();
    }, 1200);

    return () => {
      if (idleCallback) {
        window.cancelIdleCallback(idleCallback);
      }

      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!canShowPremiumTools) return;

    const idleCallback = window.requestIdleCallback?.(
      () => setShowPremiumTools(true),
      { timeout: 1200 },
    );
    const fallbackTimer = window.setTimeout(
      () => setShowPremiumTools(true),
      800,
    );

    return () => {
      if (idleCallback) {
        window.cancelIdleCallback(idleCallback);
      }

      window.clearTimeout(fallbackTimer);
    };
  }, [canShowPremiumTools]);

  const openContact = () => {
    setHasOpenedContact(true);
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <ScrollToTop />
      {canShowPremiumTools && showPremiumTools && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <Header
        currentPath={location.pathname}
        onContactOpen={openContact}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentPath={location.pathname}
              navigateTo={navigateTo}
              onContactOpen={openContact}
            />
          }
        />
        <Route
          path="/states"
          element={
            <Suspense fallback={<PageLoader isVisible />}>
              <States />
            </Suspense>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <Suspense fallback={<PageLoader isVisible />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Home
              currentPath={location.pathname}
              navigateTo={navigateTo}
              onContactOpen={openContact}
            />
          }
        />
      </Routes>
      <Footer />
      <PageLoader isVisible={pageLoading} />
      {hasOpenedContact && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </Suspense>
      )}
    </main>
  );
};

export default App;
