import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
// import CustomCursor from "./components/ui-tools/CustomCursor";
// import SmoothScroll from "./components/ui-tools/SmoothScroll";
import ContactModal from "./components/ui-tools/ContactModal";
import PageLoader from "./components/ui-tools/PageLoader";
import { useMobile } from "./hooks/useMobile";
import Home from "./layout/Home";
import { useNavigateTo } from "./hooks/useNavigateTo";
import ScrollToTop from "./components/ui-tools/ScrollToTop";

const States = lazy(() => import("./components/pages/States"));
const ProjectPage = lazy(() => import("./components/pages/ProjectItem"));

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const { pageLoading, navigateTo } = useNavigateTo();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <ScrollToTop />
      {!isMobile && (
        <>
          {/* <SmoothScroll /> */}
          {/* <CustomCursor /> */}
        </>
      )}
      <Header
        currentPath={location.pathname}
        onContactOpen={() => setIsContactOpen(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentPath={location.pathname}
              navigateTo={navigateTo}
              onContactOpen={() => setIsContactOpen(true)}
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
              onContactOpen={() => setIsContactOpen(true)}
            />
          }
        />
      </Routes>
      <Footer />
      <PageLoader isVisible={pageLoading} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
};

export default App;
